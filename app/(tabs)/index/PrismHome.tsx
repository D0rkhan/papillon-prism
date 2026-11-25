import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Platform, Pressable, RefreshControl, ScrollView, StatusBar, useWindowDimensions, View, ViewStyle } from "react-native";
import Reanimated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SyncBanner from "@/components/prism/SyncBanner";
import { getWeekNumberFromDate } from "@/database/useHomework";
import { useBacAnalysis } from "@/hooks/useBacAnalysis";
import { useHasPronote } from "@/hooks/usePronoteExtra";
import { usePrismUpdate } from "@/hooks/usePrismUpdate";
import { useSyncHealth } from "@/hooks/useSyncHealth";
import type { Grade, Subject } from "@/services/shared/grade";
import type { Homework } from "@/services/shared/homework";
import { Course, CourseStatus } from "@/services/shared/timetable";
import { useAlert } from "@/ui/components/AlertProvider";
import {
  accent,
  ActionButton,
  Aurora,
  aurora,
  Chip,
  GlassSurface,
  gradeColor,
  GText,
  Icon,
  probabilityColor,
  ProbabilityRing,
  SectionHeader,
  Segmented,
  semantic,
  space,
  Sparkline,
  type IconName,
  useGlass,
  withAlpha,
} from "@/ui/glass";
import { periodOverallAverage } from "@/utils/grades/average";
import { getSubjectColor } from "@/utils/subjects/colors";
import { getSubjectName } from "@/utils/subjects/name";

import { useHomeworkData } from "../tasks/hooks/useHomeworkData";
import type { UpcomingCourseDay } from "./hooks/useTimetableWidgetData";

const fmt = (v: number, d = 1) => v.toFixed(d).replace(".", ",");
const hhmm = (d: Date) => d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
const stripHtml = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const web = (style: object) => (Platform.OS === "web" ? (style as unknown as ViewStyle) : null);

function dayLabel(date: Date): string {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86400000);
  if (sameDay(date, today)) { return "Aujourd'hui"; }
  if (sameDay(date, tomorrow)) { return "Demain"; }
  return date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

function shortDay(date: Date): string {
  const today = new Date();
  if (sameDay(date, today)) { return "Auj."; }
  if (sameDay(date, new Date(today.getTime() + 86400000))) { return "Demain"; }
  return date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" });
}

function QuickLink({ icon, label, color, onPress }: { icon: IconName; label: string; color: string; onPress: () => void }) {
  const g = useGlass();
  return (
    <Pressable
      onPress={onPress}
      style={state => [
        {
          flex: 1,
          minWidth: 130,
          flexDirection: "row",
          alignItems: "center",
          gap: space.sm,
          paddingVertical: space.md,
          paddingHorizontal: space.md,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: g.glassBorder,
          backgroundColor: (state as { hovered?: boolean }).hovered || state.pressed ? g.glassFillStrong : g.glassFill,
        },
        web({ cursor: "pointer", transition: "background-color 160ms" }),
      ]}
    >
      <View style={{ width: 30, height: 30, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: withAlpha(color, 0.16) }}>
        <Icon name={icon} size={16} color={color} />
      </View>
      <GText variant="callout" numberOfLines={1}>{label}</GText>
    </Pressable>
  );
}

function greeting(): string {
  const h = new Date().getHours();
  return h < 5 ? "Bonne nuit" : h < 18 ? "Bonjour" : "Bonsoir";
}

function Card({ children, style, onPress }: { children: React.ReactNode; style?: ViewStyle; onPress?: () => void }) {
  const body = <GlassSurface padding={space.xl} radius={18} style={style}>{children}</GlassSurface>;
  if (!onPress) { return body; }
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, web({ cursor: "pointer" })]}>
      {body}
    </Pressable>
  );
}

function CourseRow({ course, now }: { course: Course; now: Date }) {
  const g = useGlass();
  const color = course.backgroundColor || getSubjectColor(course.subject);
  const canceled = course.status === CourseStatus.CANCELED;
  const ongoing = !canceled && course.from <= now && course.to >= now;
  const progress = ongoing ? (now.getTime() - course.from.getTime()) / (course.to.getTime() - course.from.getTime()) : 0;
  return (
    <View style={{ flexDirection: "row", gap: space.md, paddingVertical: space.sm, opacity: canceled ? 0.5 : course.to < now ? 0.45 : 1 }}>
      <View style={{ width: 46 }}>
        <GText variant="callout" tabular>{hhmm(course.from)}</GText>
        <GText variant="caption" tone="tertiary" tabular>{hhmm(course.to)}</GText>
      </View>
      <View style={{ width: 3, borderRadius: 2, backgroundColor: color }} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm }}>
          <GText variant="title3" numberOfLines={1} style={{ flexShrink: 1, textDecorationLine: canceled ? "line-through" : "none" }}>
            {getSubjectName(course.subject)}
          </GText>
          {ongoing && <Chip label="En cours" color={accent} />}
          {canceled && <Chip label="Annulé" color={semantic.danger} />}
          {course.status === CourseStatus.EDITED && !canceled && <Chip label={course.customStatus || "Modifié"} color={semantic.warning} />}
        </View>
        <GText variant="caption" tone="tertiary" numberOfLines={1}>
          {[course.room, course.teacher].filter(Boolean).join(" · ") || "—"}
        </GText>
        {ongoing && (
          <View style={{ height: 2, borderRadius: 1, backgroundColor: g.separator, marginTop: 6 }}>
            <View style={{ width: `${progress * 100}%`, height: 2, borderRadius: 1, backgroundColor: accent }} />
          </View>
        )}
      </View>
    </View>
  );
}

function GradeRow({ grade }: { grade: Grade }) {
  const value = grade.studentScore?.value;
  const outOf = grade.outOf?.value || 20;
  const usable = typeof value === "number" && !grade.studentScore?.disabled;
  const on20 = usable ? (value / outOf) * 20 : NaN;
  const classAvg = grade.averageScore && !grade.averageScore.disabled ? (grade.averageScore.value / outOf) * 20 : undefined;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: space.sm }}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: getSubjectColor(grade.subjectName) }} />
      <View style={{ flex: 1 }}>
        <GText variant="callout" numberOfLines={1}>{getSubjectName(grade.subjectName)}</GText>
        <GText variant="caption" tone="tertiary" numberOfLines={1}>
          {grade.description || "Évaluation"}{grade.givenAt ? ` · ${new Date(grade.givenAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}` : ""}
        </GText>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <GText variant="title3" tabular color={usable ? gradeColor(on20) : undefined}>
          {usable ? fmt(value, value % 1 ? 2 : 0) : grade.studentScore?.status ?? "—"}
          <GText variant="caption" tone="tertiary">/{outOf}</GText>
        </GText>
        {classAvg !== undefined && usable && (
          <GText variant="caption" tone="tertiary" tabular>
            {on20 - classAvg >= 0 ? "+" : "−"}{fmt(Math.abs(on20 - classAvg))} vs classe
          </GText>
        )}
      </View>
    </View>
  );
}

export interface PrismHomeProps {
  firstName?: string;
  syncing: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  upcomingDays: UpcomingCourseDay[];
  grades: Grade[];
  subjects: Subject[];
  history: { date: Date; average: number }[];
  studentAverage?: number;
  classAverage?: number;
  periodName?: string;
}

export default function PrismHome(props: PrismHomeProps) {
  const g = useGlass();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const wide = width >= 920;
  const contentWidth = Math.min(width, 1120) - space.xl * 2;
  const now = new Date();

  // Homework for this week and the next one.
  const alert = useAlert();
  const week = getWeekNumberFromDate(now);
  const weeks = useMemo(() => [week, week + 1], [week]);
  const { homeworkByWeek } = useHomeworkData(weeks, alert);
  const homework = useMemo(() => {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    return Object.values(homeworkByWeek)
      .flat()
      .filter((h: Homework) => !h.isDone && new Date(h.dueDate).getTime() >= start)
      .sort((a: Homework, b: Homework) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 6);
  }, [homeworkByWeek]);

  const { analysis } = useBacAnalysis({ lite: true });
  const hasPronote = useHasPronote();
  const update = usePrismUpdate();
  const syncProblem = useSyncHealth();
  const day = props.upcomingDays[0];
  const recent = props.grades.slice(0, 5);
  // Official average when the school publishes it, otherwise Prism's exact computation.
  const overall = useMemo(
    () => periodOverallAverage(props.subjects, props.studentAverage !== undefined ? { value: props.studentAverage } : null),
    [props.subjects, props.studentAverage]
  );
  const average = overall.value ?? undefined;
  const sparkValues = props.history.map(h => h.average);

  const col = (children: React.ReactNode) => <View style={{ flex: 1, gap: space.lg, minWidth: 0 }}>{children}</View>;

  const today = (
    <Card>
      <SectionHeader title={day ? dayLabel(day.date) : "Emploi du temps"} action="Semaine" onAction={() => router.navigate("/(tabs)/calendar")} />
      {day && day.courses.length ? (
        day.courses.map(c => <CourseRow key={c.id + c.from.toISOString()} course={c} now={now} />)
      ) : (
        <GText variant="callout" tone="tertiary">Aucun cours à venir.</GText>
      )}
    </Card>
  );

  const tasks = (
    <Card>
      <SectionHeader title="Devoirs à venir" action="Tout voir" onAction={() => router.navigate("/(tabs)/tasks")} />
      {homework.length ? (
        homework.map((h: Homework) => (
          <View key={h.id ?? h.content} style={{ flexDirection: "row", gap: space.md, paddingVertical: space.sm }}>
            <View style={{ width: 58 }}>
              <GText variant="caption" tone="secondary" numberOfLines={1}>{shortDay(new Date(h.dueDate))}</GText>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm }}>
                <GText variant="callout" numberOfLines={1} style={{ flexShrink: 1 }}>{getSubjectName(h.subject)}</GText>
                {h.evaluation && <Chip label="Évaluation" color={semantic.warning} />}
              </View>
              <GText variant="caption" tone="tertiary" numberOfLines={2}>{stripHtml(h.content)}</GText>
            </View>
          </View>
        ))
      ) : (
        <GText variant="callout" tone="tertiary">Rien à rendre pour l'instant.</GText>
      )}
    </Card>
  );

  const avgCard = (
    <Card onPress={() => router.navigate("/(tabs)/grades")}>
      <SectionHeader title={props.periodName ? `Moyenne · ${props.periodName}` : "Moyenne générale"} />
      <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: space.lg }}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4 }}>
            <GText variant="display" tabular color={average !== undefined ? g.text : g.textTertiary}>
              {average !== undefined ? fmt(average, 2) : "—"}
            </GText>
            <GText variant="body" tone="tertiary">/20</GText>
          </View>
          <GText variant="caption" tone="tertiary">
            {overall.source === "pronote" ? "Pronote" : overall.source === "computed" ? "Calculée par Prism" : ""}
            {props.classAverage !== undefined ? ` · classe ${fmt(props.classAverage, 2)}` : ""}
          </GText>
        </View>
        <Sparkline values={sparkValues} width={wide ? 150 : Math.min(160, contentWidth - 200)} height={48} />
      </View>
    </Card>
  );

  const p = analysis?.result.probabilities;
  const epfl = (
    <Card onPress={() => router.navigate("/(tabs)/grades/objectif")}>
      <SectionHeader title="Objectif EPFL" action="Détails" onAction={() => router.navigate("/(tabs)/grades/objectif")} />
      <View style={{ flexDirection: "row", alignItems: "center", gap: space.xl }}>
        <ProbabilityRing value={p?.admissible ?? 0} size={86} stroke={7} color={p ? probabilityColor(p.admissible) : g.textTertiary}>
          <GText variant="title2" tabular>{p ? Math.round(p.admissible * 100) : "–"}</GText>
          <GText variant="caption" tone="tertiary">%</GText>
        </ProbabilityRing>
        <View style={{ flex: 1, gap: 2 }}>
          <GText variant="callout" tone="secondary">Note de bac projetée</GText>
          <GText variant="title1" tabular>{analysis ? fmt(analysis.result.overall.q50, 2) : "…"}</GText>
          <GText variant="caption" tone="tertiary">
            {analysis ? `80 % entre ${fmt(analysis.result.overall.q10)} et ${fmt(analysis.result.overall.q90)}` : "Calcul en cours"}
          </GText>
        </View>
      </View>
    </Card>
  );

  const grades = (
    <Card>
      <SectionHeader title="Dernières notes" action="Notes" onAction={() => router.navigate("/(tabs)/grades")} />
      {recent.length ? recent.map(gr => <GradeRow key={gr.id} grade={gr} />) : <GText variant="callout" tone="tertiary">Pas encore de note sur cette période.</GText>}
    </Card>
  );

  return (
    <View style={{ flex: 1, backgroundColor: g.background }}>
      <StatusBar barStyle="light-content" />
      <Aurora />
      <ScrollView
        refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} tintColor={g.textSecondary} />}
        contentContainerStyle={{ paddingTop: insets.top + (Platform.OS === "web" ? 84 : space.xl), paddingBottom: insets.bottom + 110, paddingHorizontal: space.xl }}
      >
        <Reanimated.View entering={FadeIn.duration(350)} style={{ width: "100%", maxWidth: 1120, alignSelf: "center", gap: space.xl }}>
          <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: space.lg }}>
            <View style={{ flex: 1 }}>
              <GText variant="overline" tone="tertiary">
                {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
              </GText>
              <GText variant="title1" numberOfLines={1}>
                {greeting()}{props.firstName ? `, ${props.firstName}` : ""}
              </GText>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: props.syncing ? semantic.warning : semantic.success }} />
                <GText variant="caption" tone="tertiary">{props.syncing ? "Synchronisation…" : "À jour"}</GText>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: space.sm }}>
              <ActionButton icon="Refresh" label="Actualiser" onPress={props.onRefresh} busy={props.refreshing || props.syncing} />
              <ActionButton icon="Gears" label="Réglages" onPress={() => router.navigate("/(features)/prism/reglages")} />
            </View>
          </View>

          <Segmented
            options={[{ value: "pronote", label: "PRONOTE" }, { value: "revision", label: "Révision" }]}
            value="pronote"
            onChange={v => { if (v === "revision") { router.push("/(features)/revision" as never); } }}
          />

          {syncProblem && <SyncBanner problem={syncProblem} onRetry={props.onRefresh} />}

          {update.available && update.release && (
            <Card onPress={update.install}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: space.md }}>
                <View style={{ width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: withAlpha(accent, 0.2) }}>
                  <Icon name="ArrowDown" size={18} color={accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <GText variant="title3">Mise à jour {update.release.version} disponible</GText>
                  <GText variant="caption" tone="tertiary">Touche pour télécharger, puis « Installer ». Tes données sont conservées.</GText>
                </View>
                <View style={{ paddingHorizontal: space.md, height: 32, borderRadius: 16, justifyContent: "center", backgroundColor: g.inverse }}>
                  <GText variant="caption" color={g.onInverse}>Mettre à jour</GText>
                </View>
              </View>
            </Card>
          )}

          {hasPronote && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
              <QuickLink icon="Paper" label="Bulletins" color={aurora.violet} onPress={() => router.push("/(features)/prism/bulletin")} />
              <QuickLink icon="Bookmark" label="Cahier de textes" color={aurora.cyan} onPress={() => router.push("/(features)/prism/cahier")} />
              <QuickLink icon="Clock" label="Vie scolaire" color={aurora.pink} onPress={() => router.push("/(features)/prism/vie-scolaire")} />
              <QuickLink icon="Mail" label="Messagerie" color={aurora.indigo} onPress={() => router.push("/(features)/prism/messagerie")} />
            </View>
          )}

          {wide ? (
            <View style={{ flexDirection: "row", gap: space.lg, alignItems: "flex-start" }}>
              {col(<>{today}{tasks}</>)}
              {col(<>{avgCard}{epfl}{grades}</>)}
            </View>
          ) : (
            <View style={{ gap: space.lg }}>
              {avgCard}
              {today}
              {epfl}
              {grades}
              {tasks}
            </View>
          )}
          <GText variant="caption" tone="tertiary" align="center" style={{ color: withAlpha("#FFFFFF", 0.22) }}>
            Papillon Prism
          </GText>
        </Reanimated.View>
      </ScrollView>
    </View>
  );
}
