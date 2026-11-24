import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Platform, Pressable, RefreshControl, ScrollView, useWindowDimensions, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getWeekNumberFromDate } from "@/database/useHomework";
import { getCourseRouteId } from "@/database/useTimetable";
import { Course, CourseStatus, CourseType } from "@/services/shared/timetable";
import { accent, ActionButton, Aurora, Chip, GlassSurface, GText, radius, semantic, space, useGlass, withAlpha } from "@/ui/glass";
import { getSubjectColor } from "@/utils/subjects/colors";
import { getSubjectName } from "@/utils/subjects/name";

import { useTimetableData } from "./hooks/useTimetableData";

const web = (style: object) => (Platform.OS === "web" ? (style as unknown as ViewStyle) : null);
const hhmm = (d: Date) => d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
const dayKey = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
const DAY_MS = 86400000;

function mondayOf(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

function useNow(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function courseColor(c: Course): string {
  return c.backgroundColor || getSubjectColor(c.subject);
}

function statusChip(c: Course) {
  if (c.status === CourseStatus.CANCELED) { return <Chip label={c.customStatus || "Annulé"} color={semantic.danger} />; }
  if (c.status === CourseStatus.EDITED) { return <Chip label={c.customStatus || "Modifié"} color={semantic.warning} />; }
  if (c.status === CourseStatus.ONLINE) { return <Chip label="En ligne" color={accent} />; }
  if (c.status === CourseStatus.EVALUATED) { return <Chip label="Évaluation" color={semantic.warning} />; }
  return null;
}

/** Week grid (desktop / tablet). */
function WeekGrid({ days, courses, now, width, onOpen }: { days: Date[]; courses: Course[]; now: Date; width: number; onOpen: (c: Course) => void }) {
  const g = useGlass();
  const startHour = Math.min(8, ...courses.map(c => c.from.getHours()));
  const endHour = Math.max(18, ...courses.map(c => c.to.getHours() + (c.to.getMinutes() ? 1 : 0)));
  const hourH = 64;
  const gutter = 46;
  const colW = (width - gutter) / days.length;
  const y = (d: Date) => ((d.getHours() + d.getMinutes() / 60) - startHour) * hourH;
  const height = (endHour - startHour) * hourH;

  return (
    <View>
      <View style={{ flexDirection: "row", marginLeft: gutter, marginBottom: space.sm }}>
        {days.map(d => {
          const today = dayKey(d) === dayKey(now);
          return (
            <View key={d.toISOString()} style={{ width: colW, alignItems: "center", gap: 2 }}>
              <GText variant="overline" tone={today ? "primary" : "tertiary"}>{d.toLocaleDateString("fr-FR", { weekday: "short" })}</GText>
              <View style={{ minWidth: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: today ? g.inverse : "transparent" }}>
                <GText variant="title3" color={today ? g.onInverse : g.text}>{d.getDate()}</GText>
              </View>
            </View>
          );
        })}
      </View>
      <View style={{ height, flexDirection: "row" }}>
        <View style={{ width: gutter }}>
          {Array.from({ length: endHour - startHour + 1 }).map((_, i) => (
            <GText key={i} variant="caption" tone="tertiary" style={{ position: "absolute", top: i * hourH - 8 }}>{`${String(startHour + i).padStart(2, "0")}:00`}</GText>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          {Array.from({ length: endHour - startHour + 1 }).map((_, i) => (
            <View key={i} style={{ position: "absolute", top: i * hourH, left: 0, right: 0, height: 1, backgroundColor: g.separator }} />
          ))}
          {days.map((d, di) => (
            <View key={di} style={{ position: "absolute", top: 0, bottom: 0, left: di * colW, width: 1, backgroundColor: g.separator }} />
          ))}
          {days.map((d, di) =>
            courses
              .filter(c => dayKey(c.from) === dayKey(d))
              .map(c => {
                const color = courseColor(c);
                const canceled = c.status === CourseStatus.CANCELED;
                const top = y(c.from);
                const h = Math.max(28, y(c.to) - top - 3);
                return (
                  <Pressable
                    key={getCourseRouteId(c)}
                    onPress={() => onOpen(c)}
                    style={({ pressed }) => [
                      {
                        position: "absolute",
                        top: top + 1,
                        left: di * colW + 3,
                        width: colW - 6,
                        height: h,
                        borderRadius: radius.sm,
                        overflow: "hidden",
                        backgroundColor: withAlpha(color, canceled ? 0.06 : pressed ? 0.24 : 0.14),
                        borderWidth: 1,
                        borderColor: withAlpha(color, canceled ? 0.15 : 0.35),
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        opacity: canceled ? 0.6 : 1,
                      },
                      web({ cursor: "pointer" }),
                    ]}
                  >
                    <View style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, backgroundColor: color }} />
                    <GText variant="caption" numberOfLines={h > 50 ? 2 : 1} style={{ color: g.text, textDecorationLine: canceled ? "line-through" : "none" }}>
                      {getSubjectName(c.subject)}
                    </GText>
                    {h > 44 && (
                      <GText variant="caption" tone="tertiary" numberOfLines={1}>
                        {hhmm(c.from)} · {c.room || "—"}
                      </GText>
                    )}
                    {h > 64 && c.status !== undefined && <View style={{ marginTop: 3 }}>{statusChip(c)}</View>}
                  </Pressable>
                );
              })
          )}
          {days.some(d => dayKey(d) === dayKey(now)) && now.getHours() >= startHour && now.getHours() < endHour && (
            <View
              style={{
                position: "absolute",
                top: y(now),
                left: days.findIndex(d => dayKey(d) === dayKey(now)) * colW,
                width: colW,
                height: 2,
                backgroundColor: accent,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

/** Day list (phone). */
function DayList({ courses, now, onOpen }: { courses: Course[]; now: Date; onOpen: (c: Course) => void }) {
  const g = useGlass();
  if (!courses.length) { return <GText variant="callout" tone="tertiary">Pas de cours ce jour-là.</GText>; }
  return (
    <View>
      {courses.map((c, i) => {
        const color = courseColor(c);
        const canceled = c.status === CourseStatus.CANCELED;
        const ongoing = !canceled && c.from <= now && c.to >= now;
        const prev = courses[i - 1];
        const gap = prev ? (c.from.getTime() - prev.to.getTime()) / 60000 : 0;
        return (
          <View key={getCourseRouteId(c)}>
            {gap >= 30 && (
              <GText variant="caption" tone="tertiary" style={{ marginLeft: 58, paddingVertical: space.xs }}>
                {gap >= 60 ? `${Math.floor(gap / 60)} h${gap % 60 ? String(gap % 60).padStart(2, "0") : ""}` : `${gap} min`} de pause
              </GText>
            )}
            <Pressable onPress={() => onOpen(c)} style={[{ flexDirection: "row", gap: space.md, paddingVertical: space.sm, opacity: canceled ? 0.55 : c.to < now ? 0.5 : 1 }, web({ cursor: "pointer" })]}>
              <View style={{ width: 46 }}>
                <GText variant="callout" tabular>{hhmm(c.from)}</GText>
                <GText variant="caption" tone="tertiary" tabular>{hhmm(c.to)}</GText>
              </View>
              <View style={{ width: 3, borderRadius: 2, backgroundColor: color }} />
              <View style={{ flex: 1, gap: 2 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm, flexWrap: "wrap" }}>
                  <GText variant="title3" style={{ textDecorationLine: canceled ? "line-through" : "none" }}>{getSubjectName(c.subject)}</GText>
                  {ongoing && <Chip label="En cours" color={accent} />}
                  {statusChip(c)}
                </View>
                <GText variant="caption" tone="tertiary">{[c.room, c.teacher, c.group].filter(Boolean).join(" · ") || "—"}</GText>
              </View>
            </Pressable>
            <View style={{ height: 1, backgroundColor: g.separator, marginLeft: 58 }} />
          </View>
        );
      })}
    </View>
  );
}

export default function PrismCalendar() {
  const g = useGlass();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const now = useNow();
  const wide = width >= 820;

  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(() => dayKey(new Date()));

  const monday = useMemo(() => {
    const m = mondayOf(new Date());
    m.setDate(m.getDate() + weekOffset * 7);
    return m;
  }, [weekOffset]);
  const refDate = useMemo(() => new Date(monday.getTime() + 2 * DAY_MS), [monday]);
  const weekNumber = getWeekNumberFromDate(refDate);
  const { timetable, manualRefreshing, handleRefresh } = useTimetableData(weekNumber, refDate);

  const courses = useMemo(
    () => timetable
      .flatMap(d => d.courses)
      .filter(c => c.type !== CourseType.VACATION)
      .map(c => ({ ...c, from: new Date(c.from), to: new Date(c.to) }))
      .filter(c => c.from >= monday && c.from < new Date(monday.getTime() + 7 * DAY_MS))
      .sort((a, b) => a.from.getTime() - b.from.getTime()),
    [timetable, monday]
  );
  const hasWeekend = courses.some(c => c.from.getDay() === 0 || c.from.getDay() === 6);
  const days = useMemo(
    () => Array.from({ length: hasWeekend ? 7 : 5 }, (_, i) => new Date(monday.getTime() + i * DAY_MS)),
    [monday, hasWeekend]
  );
  const contentWidth = Math.min(width, 1200) - space.xl * 2;

  // On a phone, keep the selected day inside the visible week.
  useEffect(() => {
    if (!days.some(d => dayKey(d) === selectedDay)) {
      const today = days.find(d => dayKey(d) === dayKey(new Date()));
      setSelectedDay(dayKey(today ?? days[0]));
    }
  }, [days, selectedDay]);

  const open = (c: Course) => router.push({ pathname: "/(modals)/course/[id]", params: { id: getCourseRouteId(c) } });
  const sunday = new Date(monday.getTime() + 6 * DAY_MS);
  const range = `${monday.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} – ${sunday.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}`;
  const hours = courses.filter(c => c.status !== CourseStatus.CANCELED).reduce((s, c) => s + (c.to.getTime() - c.from.getTime()) / 3600000, 0);
  const canceled = courses.filter(c => c.status === CourseStatus.CANCELED).length;

  return (
    <View style={{ flex: 1, backgroundColor: g.background }}>
      <Aurora />
      <ScrollView
        refreshControl={<RefreshControl refreshing={manualRefreshing} onRefresh={handleRefresh} tintColor={g.textSecondary} />}
        contentContainerStyle={{ paddingTop: insets.top + (Platform.OS === "web" ? 84 : space.xl), paddingBottom: insets.bottom + 110, paddingHorizontal: space.xl }}
      >
        <View style={{ width: "100%", maxWidth: 1200, alignSelf: "center", gap: space.xl }}>
          <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: space.md }}>
            <View style={{ flex: 1 }}>
              <GText variant="overline" tone="tertiary">{range}</GText>
              <GText variant="title1">{weekOffset === 0 ? "Cette semaine" : weekOffset === 1 ? "Semaine prochaine" : weekOffset === -1 ? "Semaine dernière" : `Semaine ${weekNumber}`}</GText>
              <GText variant="caption" tone="tertiary">
                {courses.length ? `${courses.length} cours · ${Math.round(hours)} h${canceled ? ` · ${canceled} annulé${canceled > 1 ? "s" : ""}` : ""}` : "Aucun cours"}
              </GText>
            </View>
            <View style={{ flexDirection: "row", gap: space.sm }}>
              <ActionButton icon="ChevronLeft" label="Semaine précédente" onPress={() => setWeekOffset(o => o - 1)} />
              {weekOffset !== 0 && (
                <Pressable onPress={() => setWeekOffset(0)} style={[{ height: 38, paddingHorizontal: space.md, borderRadius: radius.pill, justifyContent: "center", borderWidth: 1, borderColor: g.glassBorder, backgroundColor: g.glassFill }, web({ cursor: "pointer" })]}>
                  <GText variant="caption" tone="secondary">Aujourd'hui</GText>
                </Pressable>
              )}
              <ActionButton icon="ChevronRight" label="Semaine suivante" onPress={() => setWeekOffset(o => o + 1)} />
              <ActionButton icon="Refresh" label="Actualiser" onPress={handleRefresh} busy={manualRefreshing} />
            </View>
          </View>

          {wide ? (
            <GlassSurface padding={space.lg} radius={18}>
              <WeekGrid days={days} courses={courses} now={now} width={contentWidth - space.lg * 2} onOpen={open} />
            </GlassSurface>
          ) : (
            <>
              <View style={{ flexDirection: "row", gap: space.xs }}>
                {days.map(d => {
                  const active = dayKey(d) === selectedDay;
                  const count = courses.filter(c => dayKey(c.from) === dayKey(d)).length;
                  return (
                    <Pressable key={d.toISOString()} onPress={() => setSelectedDay(dayKey(d))} style={[{ flex: 1, alignItems: "center", paddingVertical: space.sm, borderRadius: radius.md, backgroundColor: active ? g.inverse : g.glassFill, borderWidth: 1, borderColor: active ? g.inverse : g.glassBorder }, web({ cursor: "pointer" })]}>
                      <GText variant="overline" color={active ? g.onInverse : g.textTertiary}>{d.toLocaleDateString("fr-FR", { weekday: "short" })}</GText>
                      <GText variant="title3" color={active ? g.onInverse : g.text}>{d.getDate()}</GText>
                      <View style={{ width: 4, height: 4, borderRadius: 2, marginTop: 2, backgroundColor: count ? (active ? g.onInverse : accent) : "transparent" }} />
                    </Pressable>
                  );
                })}
              </View>
              <GlassSurface padding={space.xl} radius={18}>
                <DayList courses={courses.filter(c => dayKey(c.from) === selectedDay)} now={now} onOpen={open} />
              </GlassSurface>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
