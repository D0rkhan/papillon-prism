import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Platform, Pressable, RefreshControl, ScrollView, TextInput, useWindowDimensions, View, ViewStyle } from "react-native";
import Reanimated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { overallAverage, subjectAverage } from "@/core/bac/normalize";
import { useLoadErrorAlert } from "@/hooks/useLoadErrorAlert";
import { allowAllAuthRetries } from "@/services/auth/coordinator";
import type { Grade, Period, Subject } from "@/services/shared/grade";
import {
  accent,
  Aurora,
  Chip,
  GlassSurface,
  gradeColor,
  GText,
  radius,
  RangeBar,
  SectionHeader,
  semantic,
  space,
  Sparkline,
  Stat,
  useGlass,
} from "@/ui/glass";
import { periodRole } from "@/utils/bac/fromPapillon";
import { toAverageable } from "@/utils/grades/algorithms/helpers";
import { getSubjectColor } from "@/utils/subjects/colors";
import { getSubjectName } from "@/utils/subjects/name";

import { useDisplayPeriod } from "./hooks/useDisplayPeriod";

const fmt = (v: number, d = 2) => v.toFixed(d).replace(".", ",");
const web = (style: object) => (Platform.OS === "web" ? (style as unknown as ViewStyle) : null);
const usable = (s?: { value: number; disabled?: boolean }) => !!s && !s.disabled && Number.isFinite(s.value);

type Sort = "recent" | "average" | "name";

function periodLabel(p: Period): string {
  return p.name.charAt(0).toUpperCase() + p.name.slice(1);
}

function PeriodPills({ periods, current, onSelect }: { periods: Period[]; current?: Period; onSelect: (p: Period) => void }) {
  const g = useGlass();
  const ordered = useMemo(
    () => [...periods].sort((a, b) => {
      const ra = periodRole(a.name) === "regular" ? 0 : 1;
      const rb = periodRole(b.name) === "regular" ? 0 : 1;
      return ra - rb || a.start.getTime() - b.start.getTime();
    }),
    [periods]
  );
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.xs, padding: 3 }}>
      {ordered.map(p => {
        const active = current?.id === p.id && current?.name === p.name;
        return (
          <Pressable
            key={`${p.id}-${p.name}`}
            onPress={() => onSelect(p)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={(state) => [
              {
                paddingHorizontal: space.md,
                height: 32,
                justifyContent: "center",
                borderRadius: radius.pill,
                backgroundColor: active ? g.inverse : (state as { hovered?: boolean }).hovered ? g.glassFillStrong : "transparent",
              },
              web({ cursor: "pointer" }),
            ]}
          >
            <GText variant="caption" color={active ? g.onInverse : g.textSecondary}>{periodLabel(p)}</GText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function GradeLine({ grade }: { grade: Grade }) {
  const g = useGlass();
  const outOf = grade.outOf?.value || 20;
  const ok = usable(grade.studentScore);
  const v = grade.studentScore?.value ?? 0;
  const on20 = (v / outOf) * 20;
  const cls = usable(grade.averageScore) ? ((grade.averageScore?.value ?? 0) / outOf) * 20 : undefined;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: space.sm, borderTopWidth: 1, borderTopColor: g.separator }}>
      <View style={{ flex: 1 }}>
        <GText variant="callout" numberOfLines={1}>{grade.description || "Évaluation"}</GText>
        <GText variant="caption" tone="tertiary">
          {grade.givenAt ? new Date(grade.givenAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) : ""}
          {` · coef ${grade.coefficient ?? 1}`}
          {cls !== undefined ? ` · classe ${fmt(cls, 1)}` : ""}
          {grade.optional ? " · facultative" : ""}
          {grade.bonus ? " · bonus" : ""}
        </GText>
      </View>
      <GText variant="title3" tabular color={ok ? gradeColor(on20) : g.textTertiary}>
        {ok ? fmt(v, v % 1 ? 2 : 0) : grade.studentScore?.status ?? "—"}
        <GText variant="caption" tone="tertiary">/{outOf}</GText>
      </GText>
    </View>
  );
}

function SubjectCard({ subject, expanded, onToggle }: { subject: Subject; expanded: boolean; onToggle: () => void }) {
  const g = useGlass();
  const grades = subject.grades ?? [];
  const official = usable(subject.studentAverage) ? ((subject.studentAverage!.value) / (subject.outOf?.value || 20)) * 20 : undefined;
  const computed = subjectAverage(toAverageable(grades)) ?? undefined;
  const avg = official ?? computed;
  const cls = usable(subject.classAverage) ? subject.classAverage.value : undefined;
  const color = getSubjectColor(subject.name);
  const trend = useMemo(() => {
    const sorted = [...grades].filter(gr => usable(gr.studentScore)).sort((a, b) => (a.givenAt?.getTime() ?? 0) - (b.givenAt?.getTime() ?? 0));
    const out: number[] = [];
    for (let i = 0; i < sorted.length; i++) {
      const a = subjectAverage(toAverageable(sorted.slice(0, i + 1)));
      if (a !== null) { out.push(a); }
    }
    return out;
  }, [grades]);

  return (
    <Reanimated.View layout={LinearTransition.duration(220)}>
      <GlassSurface radius={18}>
        <Pressable onPress={onToggle} accessibilityRole="button" accessibilityState={{ expanded }} style={[{ padding: space.lg }, web({ cursor: "pointer" })]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: space.md }}>
            <View style={{ width: 3, alignSelf: "stretch", borderRadius: 2, backgroundColor: color }} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <GText variant="title3" numberOfLines={1}>{getSubjectName(subject.name)}</GText>
              <GText variant="caption" tone="tertiary">
                {grades.length} note{grades.length > 1 ? "s" : ""}
                {cls !== undefined ? ` · classe ${fmt(cls, 2)}` : ""}
                {official === undefined && computed !== undefined ? " · calculée" : ""}
              </GText>
            </View>
            {trend.length > 1 && <Sparkline values={trend} width={64} height={26} color={avg !== undefined ? gradeColor(avg) : accent} />}
            <GText variant="title2" tabular color={avg !== undefined ? gradeColor(avg) : g.textTertiary} style={{ minWidth: 58, textAlign: "right" }}>
              {avg !== undefined ? fmt(avg) : "—"}
            </GText>
          </View>
          <View style={{ marginTop: space.md, marginLeft: 3 + space.md }}>
            <RangeBar
              value={avg}
              min={usable(subject.minimum) ? subject.minimum!.value : undefined}
              max={usable(subject.maximum) ? subject.maximum!.value : undefined}
              classAverage={cls}
              color={avg !== undefined ? gradeColor(avg) : accent}
            />
          </View>
        </Pressable>
        {expanded && (
          <Reanimated.View entering={FadeIn.duration(180)} style={{ paddingHorizontal: space.lg, paddingBottom: space.md }}>
            {[...grades]
              .sort((a, b) => (b.givenAt?.getTime() ?? 0) - (a.givenAt?.getTime() ?? 0))
              .map(gr => <GradeLine key={gr.id} grade={gr} />)}
          </Reanimated.View>
        )}
      </GlassSurface>
    </Reanimated.View>
  );
}

export default function PrismGrades() {
  const g = useGlass();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const columns = width >= 1100 ? 3 : width >= 720 ? 2 : 1;

  const { periods, currentPeriod, setCurrentPeriod, refresh: refreshPeriods, loading: loadingPeriods, error: periodsError, failures: periodsFailures, grades: gradesData, isFallback } = useDisplayPeriod();
  const { subjects, averages, history, rank, refresh: refreshGrades, loading: loadingGrades, refreshing, error: gradesError, failures: gradesFailures } = gradesData;

  useLoadErrorAlert({
    subject: "tes notes",
    error: gradesError ?? periodsError,
    failures: gradesFailures.length > 0 ? gradesFailures : periodsFailures,
    hasData: subjects.length > 0,
  });

  const [expanded, setExpanded] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("recent");
  const [query, setQuery] = useState("");

  const onRefresh = useCallback(async () => {
    allowAllAuthRetries();
    await refreshPeriods();
    await refreshGrades();
  }, [refreshPeriods, refreshGrades]);

  const computedOverall = useMemo(
    () => overallAverage(subjects.map(s => ({ average: subjectAverage(toAverageable(s.grades ?? [])) }))),
    [subjects]
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = subjects.filter(s => !q || getSubjectName(s.name).toLowerCase().includes(q) || (s.grades ?? []).some(gr => gr.description?.toLowerCase().includes(q)));
    const avgOf = (s: Subject) => (usable(s.studentAverage) ? s.studentAverage!.value : subjectAverage(toAverageable(s.grades ?? [])) ?? -1);
    return [...list].sort((a, b) =>
      sort === "name" ? getSubjectName(a.name).localeCompare(getSubjectName(b.name))
        : sort === "average" ? avgOf(b) - avgOf(a)
          : (b.grades?.[0]?.givenAt?.getTime() ?? 0) - (a.grades?.[0]?.givenAt?.getTime() ?? 0)
    );
  }, [subjects, sort, query]);

  const official = averages.student?.value;
  const loading = loadingPeriods || loadingGrades;
  const rows: Subject[][] = [];
  for (let i = 0; i < shown.length; i += columns) { rows.push(shown.slice(i, i + columns)); }

  return (
    <View style={{ flex: 1, backgroundColor: g.background }}>
      <Aurora />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={g.textSecondary} />}
        contentContainerStyle={{ paddingTop: insets.top + (Platform.OS === "web" ? 84 : space.xl), paddingBottom: insets.bottom + 110, paddingHorizontal: space.xl }}
      >
        <View style={{ width: "100%", maxWidth: 1120, alignSelf: "center", gap: space.xl }}>
          <View style={{ gap: space.md }}>
            <GText variant="title1">Notes</GText>
            <GlassSurface radius={radius.pill} style={{ alignSelf: "flex-start", maxWidth: "100%" }}>
              <PeriodPills periods={periods} current={currentPeriod} onSelect={p => { setExpanded(null); setCurrentPeriod(p); }} />
            </GlassSurface>
          </View>

          <View style={{ flexDirection: width >= 720 ? "row" : "column", gap: space.lg }}>
            <GlassSurface padding={space.xl} radius={18} style={{ flex: 1.4 }}>
              <SectionHeader title={currentPeriod ? `${periodLabel(currentPeriod)}${isFallback ? " · le nouveau trimestre est encore vide" : ""}` : "Période"} />
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.xxl, alignItems: "flex-end" }}>
                <Stat
                  label="Moyenne générale"
                  value={official !== undefined ? fmt(official) : computedOverall !== null ? fmt(computedOverall) : "—"}
                  unit="/20"
                  footnote={official !== undefined ? "Pronote" : computedOverall !== null ? "Calculée par Prism" : undefined}
                />
                {averages.class && <Stat label="Classe" value={fmt(averages.class.value)} unit="/20" />}
                {rank && <Stat label="Rang" value={String(rank.value)} />}
                <View style={{ flex: 1, minWidth: 120, alignItems: "flex-end" }}>
                  <Sparkline values={(history.subject ?? []).map(h => h.average)} width={160} height={52} />
                </View>
              </View>
            </GlassSurface>

            <Pressable onPress={() => router.push("/(tabs)/grades/objectif")} style={[{ flex: 1 }, web({ cursor: "pointer" })]}>
              {({ pressed }) => (
                <GlassSurface padding={space.xl} radius={18} style={{ flex: 1, opacity: pressed ? 0.85 : 1 }}>
                  <SectionHeader title="Objectif EPFL" />
                  <GText variant="title2">Probabilités et notes à viser</GText>
                  <GText variant="callout" tone="tertiary" style={{ marginTop: space.xs }}>
                    20 000 simulations du bac à partir de toutes tes notes.
                  </GText>
                  <GText variant="caption" color={accent} style={{ marginTop: space.md }}>Ouvrir l'analyse →</GText>
                </GlassSurface>
              )}
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: space.md, flexWrap: "wrap" }}>
            <GlassSurface radius={radius.pill} style={{ flex: 1, minWidth: 220 }}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Rechercher une matière ou un devoir"
                placeholderTextColor={g.textTertiary}
                style={[{ height: 38, paddingHorizontal: space.lg, color: g.text, fontFamily: "fixeltext-regular", fontSize: 14 }, web({ outlineStyle: "none" })]}
              />
            </GlassSurface>
            <View style={{ flexDirection: "row", gap: space.xs }}>
              {([["recent", "Récentes"], ["average", "Moyenne"], ["name", "A–Z"]] as [Sort, string][]).map(([k, label]) => (
                <Chip key={k} label={label} color={sort === k ? g.text : g.textTertiary} onPress={() => setSort(k)} />
              ))}
            </View>
          </View>

          {loading && subjects.length === 0 ? (
            <GText variant="callout" tone="tertiary">Chargement des notes…</GText>
          ) : shown.length === 0 ? (
            <GlassSurface padding={space.xxl} radius={18} style={{ alignItems: "center" }}>
              <GText variant="title3">Aucune note</GText>
              <GText variant="callout" tone="tertiary">Rien sur cette période pour l'instant.</GText>
            </GlassSurface>
          ) : (
            <View style={{ gap: space.md }}>
              {rows.map((row, i) => (
                <View key={i} style={{ flexDirection: "row", gap: space.md, alignItems: "flex-start" }}>
                  {row.map(s => (
                    <View key={s.id} style={{ flex: 1, minWidth: 0 }}>
                      <SubjectCard subject={s} expanded={expanded === s.id} onToggle={() => setExpanded(e => (e === s.id ? null : s.id))} />
                    </View>
                  ))}
                  {row.length < columns && Array.from({ length: columns - row.length }).map((_, k) => <View key={`pad-${k}`} style={{ flex: 1 }} />)}
                </View>
              ))}
            </View>
          )}

          {gradesFailures.length > 0 && (
            <GText variant="caption" color={semantic.warning}>Certaines données n'ont pas pu être mises à jour.</GText>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
