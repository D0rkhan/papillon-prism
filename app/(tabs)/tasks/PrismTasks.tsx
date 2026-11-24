import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Platform, Pressable, RefreshControl, ScrollView, View, ViewStyle } from "react-native";
import Reanimated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getHomeworkRouteId, getWeekNumberFromDate } from "@/database/useHomework";
import type { Homework } from "@/services/shared/homework";
import { useAlert } from "@/ui/components/AlertProvider";
import { accent, Aurora, Chip, GlassSurface, GText, IconButton, radius, semantic, space, useGlass } from "@/ui/glass";
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
        </Pressable>
      </View>
    </Reanimated.View>
  );
}

export default function PrismTasks() {
  const g = useGlass();
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
  const { homeworkByWeek, refreshingWeek, handleRefresh, setAsDone } = useHomeworkData(weeks, alert);

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

  return (
    <View style={{ flex: 1, backgroundColor: g.background }}>
      <Aurora />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshingWeek !== null} onRefresh={() => handleRefresh(week)} tintColor={g.textSecondary} />}
        contentContainerStyle={{ paddingTop: insets.top + (Platform.OS === "web" ? 84 : space.xl), paddingBottom: insets.bottom + 110, paddingHorizontal: space.xl }}
      >
        <View style={{ width: "100%", maxWidth: 860, alignSelf: "center", gap: space.xl }}>
          <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: space.md }}>
            <View style={{ flex: 1 }}>
              <GText variant="overline" tone="tertiary">{range}</GText>
              <GText variant="title1">{weekLabel}</GText>
            </View>
            <View style={{ flexDirection: "row", gap: space.sm }}>
              <IconButton label="Semaine précédente" onPress={() => setWeekOffset(o => o - 1)}><GText variant="title3" tone="secondary">‹</GText></IconButton>
              {weekOffset !== 0 && (
                <Pressable onPress={() => setWeekOffset(0)} style={[{ height: 36, paddingHorizontal: space.md, borderRadius: radius.pill, justifyContent: "center", borderWidth: 1, borderColor: g.glassBorder, backgroundColor: g.glassFill }, web({ cursor: "pointer" })]}>
                  <GText variant="caption" tone="secondary">Aujourd'hui</GText>
                </Pressable>
              )}
              <IconButton label="Semaine suivante" onPress={() => setWeekOffset(o => o + 1)}><GText variant="title3" tone="secondary">›</GText></IconButton>
              <IconButton label="Nouvelle tâche" onPress={() => router.push("/(modals)/tasks/custom")}><GText variant="title3" tone="secondary">+</GText></IconButton>
            </View>
          </View>

          <GlassSurface padding={space.xl} radius={18}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.lg, flexWrap: "wrap" }}>
              <View>
                <GText variant="overline" tone="tertiary">Progression</GText>
                <GText variant="title2">{items.length ? `${done} sur ${items.length} terminé${done > 1 ? "s" : ""}` : "Rien de prévu"}</GText>
              </View>
              <View style={{ flexDirection: "row", gap: space.xs }}>
                {([["todo", "À faire"], ["evaluations", "Évaluations"], ["all", "Tout"]] as [Filter, string][]).map(([k, label]) => (
                  <Chip key={k} label={label} color={filter === k ? g.text : g.textTertiary} onPress={() => setFilter(k)} />
                ))}
              </View>
            </View>
            <View style={{ height: 4, borderRadius: 2, backgroundColor: g.separator, marginTop: space.lg }}>
              <View style={{ width: `${items.length ? (done / items.length) * 100 : 0}%`, height: 4, borderRadius: 2, backgroundColor: semantic.success }} />
            </View>
          </GlassSurface>

          {groups.length === 0 ? (
            <GlassSurface padding={space.xxl} radius={18} style={{ alignItems: "center" }}>
              <GText variant="title3">{filter === "todo" && items.length ? "Tout est fait" : "Aucun devoir"}</GText>
              <GText variant="callout" tone="tertiary" align="center">
                {filter === "todo" && items.length ? "Rien d'autre à rendre cette semaine." : "Aucun devoir enregistré pour cette semaine. Tire vers le bas pour actualiser."}
              </GText>
            </GlassSurface>
          ) : (
            groups.map(([ts, list]) => (
              <GlassSurface key={ts} padding={space.xl} radius={18}>
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
              </GlassSurface>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
