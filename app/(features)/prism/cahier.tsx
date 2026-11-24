import React, { useMemo, useState } from "react";
import { Linking, Pressable, View } from "react-native";
import Reanimated from "react-native-reanimated";

import { usePronoteExtra } from "@/hooks/usePronoteExtra";
import { getLessonContents, type LessonContent } from "@/services/pronote/extras";
import { ActionButton, Card, Chip, EmptyState, enter, GText, Icon, PrismScreen, semantic, SkeletonCards, space, StatusNote, useGlass, webOnly } from "@/ui/glass";
import { formatHTML } from "@/utils/format/html";
import { getSubjectColor } from "@/utils/subjects/colors";
import { getSubjectName } from "@/utils/subjects/name";

function mondayOf(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

const time = (ms: number) => new Date(ms).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

function Lesson({ lesson }: { lesson: LessonContent }) {
  const g = useGlass();
  const color = getSubjectColor(lesson.subject);
  return (
    <Card padding={space.lg}>
      <View style={{ flexDirection: "row", gap: space.md }}>
        <View style={{ width: 3, borderRadius: 2, backgroundColor: color }} />
        <View style={{ flex: 1, minWidth: 0, gap: space.sm }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm, flexWrap: "wrap" }}>
            <GText variant="title3">{getSubjectName(lesson.subject)}</GText>
            <GText variant="caption" tone="tertiary">{time(lesson.start)} – {time(lesson.end)}</GText>
            {lesson.hasAssignment && <Chip label="Travail donné" color={semantic.warning} />}
          </View>
          {lesson.teachers.length > 0 && <GText variant="caption" tone="tertiary">{lesson.teachers.join(", ")}</GText>}
          {lesson.contents.map((c, i) => (
            <View key={i} style={{ gap: 4, paddingTop: i ? space.sm : 0, borderTopWidth: i ? 1 : 0, borderTopColor: g.separator }}>
              {(c.title || c.category) && (
                <GText variant="callout" style={{ fontFamily: "fixeltext-medium" }}>
                  {[c.category, c.title].filter(Boolean).join(" · ")}
                </GText>
              )}
              {c.description ? <GText variant="callout" tone="secondary" selectable>{formatHTML(c.description)}</GText> : null}
              {c.files.map((f, k) => (
                <Pressable key={k} onPress={() => Linking.openURL(f.url)} style={[{ flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 2 }, webOnly({ cursor: "pointer" })]}>
                  <Icon name="Link" size={14} color={g.tint} />
                  <GText variant="caption" color={g.tint} numberOfLines={1}>{f.name || "Document"}</GText>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
}

export default function CahierScreen() {
  const [offset, setOffset] = useState(0);
  const monday = useMemo(() => {
    const m = mondayOf(new Date());
    m.setDate(m.getDate() + offset * 7);
    return m;
  }, [offset]);
  const sunday = new Date(monday.getTime() + 6 * 86400000 + 86399000);

  const lessons = usePronoteExtra(`lessons:${monday.toDateString()}`, session => getLessonContents(session, monday, sunday));
  const list = lessons.data ?? [];

  const byDay = useMemo(() => {
    const map = new Map<string, LessonContent[]>();
    for (const l of list) {
      const key = new Date(l.start).toDateString();
      map.set(key, [...(map.get(key) ?? []), l]);
    }
    return [...map.entries()];
  }, [list]);

  const range = `${monday.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} – ${sunday.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`;
  const label = offset === 0 ? "Cette semaine" : offset === -1 ? "Semaine dernière" : offset === 1 ? "Semaine prochaine" : range;

  return (
    <PrismScreen
      back
      title="Cahier de textes"
      overline={`${label === range ? "" : `${range} · `}${label}`}
      onRefresh={lessons.refresh}
      refreshing={lessons.loading}
      actions={
        <>
          <ActionButton icon="ChevronLeft" label="Semaine précédente" onPress={() => setOffset(o => o - 1)} />
          <ActionButton icon="ChevronRight" label="Semaine suivante" onPress={() => setOffset(o => o + 1)} />
        </>
      }
    >
      {lessons.error && <StatusNote tone="warning" text="Impossible d'actualiser le cahier de textes pour l'instant." />}
      {!lessons.data && lessons.loading ? (
        <SkeletonCards count={3} />
      ) : list.length === 0 ? (
        <EmptyState icon="Bookmark" title="Rien de noté" message={lessons.data ? "Aucun contenu de cours saisi pour cette semaine." : "Connecte-toi à PRONOTE pour afficher le cahier de textes."} />
      ) : (
        byDay.map(([day, items], i) => (
          <Reanimated.View key={day} entering={enter(i)} style={{ gap: space.sm }}>
            <GText variant="overline" tone="secondary">{new Date(day).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</GText>
            {items.map(l => <Lesson key={l.id} lesson={l} />)}
          </Reanimated.View>
        ))
      )}
    </PrismScreen>
  );
}
