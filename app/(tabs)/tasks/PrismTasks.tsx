import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Platform, Pressable, View, ViewStyle } from "react-native";
import Reanimated, { FadeIn, LinearTransition } from "react-native-reanimated";

import { getHomeworkRouteId, getWeekNumberFromDate } from "@/database/useHomework";
import type { Homework } from "@/services/shared/homework";
import { useAlert } from "@/ui/components/AlertProvider";
import { accent, ActionButton, aurora, Card, Chip, EmptyState, GText, PrismScreen, radius, Segmented, semantic, space, StatusNote, useGlass } from "@/ui/glass";
import { getSubjectColor } from "@/utils/subjects/colors";
import { getSubjectName } from "@/utils/subjects/name";

import { useHomeworkData } from "./hooks/useHomeworkData";

const web = (style: object) => (Platform.OS === "web" ? (style as unknown as ViewStyle) : null);
const stripHtml = (s: string) => s.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/[ \t]+/g, " ").trim();
const dayKey = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

type Filter = "todo" | "all" | "evaluations";

/** Monday of the week containing `date`. */
function mondayOf(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  return d;
}

function dayTitle(ts: number): string {
  const d = new Date(ts);
  const today = dayKey(new Date());
  if (ts === today) { return "Aujourd'hui"; }
  if (ts === today + 86400000) { return "Demain"; }
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

function Check({ done, onPress }: { done: boolean; onPress: () => void }) {
  const g = useGlass();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done }}
      style={[
        {
          width: 22,
          height: 22,
          borderRadius: 7,
          borderWidth: 1.5,
          borderColor: done ? semantic.success : g.textTertiary,
          backgroundColor: done ? semantic.success : "transparent",
          alignItems: "center",
          justifyContent: "center",
        },
        web({ cursor: "pointer" }),
      ]}
    >
      {done ? <GText variant="caption" color={g.background}>✓</GText> : null}
    </Pressable>
  );
}

function TaskRow({ item, onToggle, onOpen }: { item: Homework; onToggle: () => void; onOpen: () => void }) {
  const g = useGlass();
  const content = stripHtml(item.content);
  return (
    <Reanimated.View layout={LinearTransition.duration(200)} entering={FadeIn.duration(180)}>
      <View style={{ flexDirection: "row", gap: space.md, paddingVertical: space.md, borderTopWidth: 1, borderTopColor: g.separator, opacity: item.isDone ? 0.5 : 1 }}>
        <View style={{ paddingTop: 1 }}>
          <Check done={item.isDone} onPress={onToggle} />
        </View>
        <Pressable onPress={onOpen} style={[{ flex: 1, gap: 4 }, web({ cursor: "pointer" })]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm, flexWrap: "wrap" }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: getSubjectColor(item.subject) }} />
            <GText variant="title3" style={{ textDecorationLine: item.isDone ? "line-through" : "none" }}>{getSubjectName(item.subject)}</GText>
            {item.evaluation && <Chip label="Évaluation" color={semantic.warning} />}
            {item.custom && <Chip label="Perso" color={accent} />}
            {item.attachments.length > 0 && <Chip label={`${item.attachments.length} pièce${item.attachments.length > 1 ? "s" : ""} jointe${item.attachments.length > 1 ? "s" : ""}`} color={g.textSecondary} />}
          </View>
          <GText variant="callout" tone="secondary" numberOfLines={4}>{content || "Pas de consigne."}</GText>
          {(item.length || item.difficulty || item.canUpload || item.uploadedFile || item.themes?.length) ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.xs, marginTop: 2 }}>
              {item.length ? <Chip label={`≈ ${item.length >= 60 ? `${Math.floor(item.length / 60)} h ${String(item.length % 60).padStart(2, "0")}` : `${item.length} min`}`} color={g.textSecondary} /> : null}
              {item.difficulty ? <Chip label={["", "Facile", "Moyen", "Difficile"][item.difficulty] ?? "Difficulté"} color={[g.textSecondary, semantic.success, semantic.warning, semantic.danger][item.difficulty] ?? g.textSecondary} /> : null}
              {item.uploadedFile ? <Chip label="Rendu en ligne ✓" color={semantic.success} /> : item.canUpload ? <Chip label="À rendre en ligne" color={aurora.cyan} /> : null}
              {item.themes?.slice(0, 2).map(t => <Chip key={t} label={t} color={g.textTertiary} />)}
            </View>
          ) : null}
        </Pressable>
      </View>
    </Reanimated.View>
  );
}

export default function PrismTasks() {
  const g = useGlass();
  const router = useRouter();
  const alert = useAlert();

  const [weekOffset, setWeekOffset] = useState(0);
  const [filter, setFilter] = useState<Filter>("todo");

  const monday = useMemo(() => {
    const m = mondayOf(new Date());
    m.setDate(m.getDate() + weekOffset * 7);
    return m;
  }, [weekOffset]);
  const week = getWeekNumberFromDate(new Date(monday.getTime() + 2 * 86400000));
  const weeks = useMemo(() => [week - 1, week, week + 1], [week]);
  const { homeworkByWeek, refreshingWeek, handleRefresh, setAsDone, error, failures } = useHomeworkData(weeks, alert);

  const sunday = new Date(monday.getTime() + 6 * 86400000);
  const items = useMemo(() => {
    const from = monday.getTime();
    const to = sunday.getTime() + 86400000;
    const seen = new Set<string>();
    return Object.values(homeworkByWeek)
      .flat()
      .filter((h: Homework) => {
        const t = new Date(h.dueDate).getTime();
        const key = getHomeworkRouteId(h);
        if (t < from || t >= to || seen.has(key)) { return false; }
        seen.add(key);
        return true;
      })
      .sort((a: Homework, b: Homework) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [homeworkByWeek, monday, sunday]);

  const shown = items.filter(h => (filter === "todo" ? !h.isDone : filter === "evaluations" ? h.evaluation : true));
  const done = items.filter(h => h.isDone).length;
  const groups = useMemo(() => {
    const map = new Map<number, Homework[]>();
    for (const h of shown) {
      const k = dayKey(new Date(h.dueDate));
      map.set(k, [...(map.get(k) ?? []), h]);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [shown]);

  const range = `${monday.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} – ${sunday.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`;
  const weekLabel = weekOffset === 0 ? "Cette semaine" : weekOffset === 1 ? "Semaine prochaine" : weekOffset === -1 ? "Semaine dernière" : `Semaine ${week}`;

  const evaluations = items.filter(h => h.evaluation).length;
  const todo = items.length - done;

  return (
    <PrismScreen
      title={weekLabel}
      overline={range}
      maxWidth={860}
      onRefresh={() => handleRefresh(week)}
      refreshing={refreshingWeek !== null}
      actions={
        <>
          <ActionButton icon="ChevronLeft" label="Semaine précédente" onPress={() => setWeekOffset(o => o - 1)} />
          {weekOffset !== 0 && (
            <Pressable onPress={() => setWeekOffset(0)} style={[{ height: 38, paddingHorizontal: space.md, borderRadius: radius.pill, justifyContent: "center", borderWidth: 1, borderColor: g.glassBorder, backgroundColor: g.glassFill }, web({ cursor: "pointer" })]}>
              <GText variant="caption" tone="secondary">Aujourd'hui</GText>
            </Pressable>
          )}
          <ActionButton icon="ChevronRight" label="Semaine suivante" onPress={() => setWeekOffset(o => o + 1)} />
          <ActionButton icon="Plus" label="Nouvelle tâche" onPress={() => router.push("/(modals)/tasks/custom")} />
        </>
      }
    >
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.lg, flexWrap: "wrap" }}>
              <View>
                <GText variant="overline" tone="tertiary">Progression</GText>
                <GText variant="title2">{items.length ? `${done} sur ${items.length} terminé${done > 1 ? "s" : ""}` : "Rien de prévu"}</GText>
              </View>
              <Segmented
                options={[
                  { value: "todo", label: "À faire", badge: todo || undefined },
                  { value: "evaluations", label: "Évaluations", badge: evaluations || undefined },
                  { value: "all", label: "Tout" },
                ]}
                value={filter}
                onChange={v => setFilter(v as Filter)}
              />
            </View>
            <View style={{ height: 4, borderRadius: 2, backgroundColor: g.separator, marginTop: space.lg, overflow: "hidden" }}>
              <View style={[{ width: `${items.length ? (done / items.length) * 100 : 0}%`, height: 4, borderRadius: 2, backgroundColor: semantic.success }, web({ transition: "width 400ms ease" })]} />
            </View>
          </Card>

          {(error || failures.length > 0) && <StatusNote tone="warning" text="Certains devoirs n'ont pas pu être mis à jour : ce qui s'affiche vient du dernier enregistrement." />}

          {groups.length === 0 ? (
            filter === "todo" && items.length ? (
              <EmptyState icon="Check" title="Tout est fait" message="Rien d'autre à rendre cette semaine." />
            ) : (
              <EmptyState icon="Tasks" title="Aucun devoir" message="Aucun devoir enregistré pour cette semaine." action="Actualiser" onAction={() => handleRefresh(week)} />
            )
          ) : (
            groups.map(([ts, list]) => (
              <Card key={ts}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: space.xs }}>
                  <GText variant="overline" tone="secondary">{dayTitle(ts)}</GText>
                  <GText variant="caption" tone="tertiary">{list.length} devoir{list.length > 1 ? "s" : ""}</GText>
                </View>
                {list.map(h => (
                  <TaskRow
                    key={getHomeworkRouteId(h)}
                    item={h}
                    onToggle={() => setAsDone(h, !h.isDone)}
                    onOpen={() => router.push({ pathname: "/(tabs)/tasks/[id]", params: { id: getHomeworkRouteId(h) } })}
                  />
                ))}
              </Card>
            ))
          )}
    </PrismScreen>
  );
}
