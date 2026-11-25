import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { useWindowDimensions, View } from "react-native";

import { Choice, dayLabel, Field, memoryColor, MUTED, PillButton } from "@/components/revision/parts";
import { matchChapters, programChapter, programFor } from "@/core/practice/curriculum";
import { predictedMark } from "@/core/practice/mastery";
import { retrievability } from "@/core/revision/fsrs";
import { EVIDENCE, FAMILY_LABEL, familyOf, MODE_LABEL } from "@/core/revision/methods";
import { examPlan, planToday, Suggestion } from "@/core/revision/planner";
import { useRevisionData } from "@/hooks/useRevisionData";
import { useRevisionStore } from "@/stores/revision";
import {
  accent,
  ActionButton,
  aurora,
  Card,
  Chip,
  EmptyState,
  Grid,
  GText,
  Icon,
  PrismScreen,
  Row,
  SectionHeader,
  semantic,
  space,
  useGlass,
  withAlpha,
} from "@/ui/glass";
import { getSubjectColor } from "@/utils/subjects/colors";

const DAY = 24 * 3600 * 1000;

/** Programme chapters with exercises train on real exercises; the others get the guided session. */
function startSession(router: ReturnType<typeof useRouter>, s: Suggestion) {
  const programId = useRevisionStore.getState().chapters[s.chapter.id]?.programId;
  if (programChapter(programId)?.skills.length && s.mode !== "decouverte") {
    router.push({ pathname: "/(features)/revision/pratique", params: { chapterId: s.chapter.id, ...(s.mode === "controle" ? { exam: "1" } : {}) } } as never);
    return;
  }
  router.push({ pathname: "/(features)/revision/session", params: { chapterId: s.chapter.id, mode: s.mode } } as never);
}

function NowCard({ s }: { s: Suggestion }) {
  const g = useGlass();
  const router = useRouter();
  const color = getSubjectColor(s.subject.name);
  return (
    <Card tint={color}>
      <GText variant="overline" tone="tertiary">Maintenant</GText>
      <View style={{ flexDirection: "row", alignItems: "center", gap: space.md, marginTop: space.sm }}>
        <View style={{ width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: withAlpha(color.startsWith("#") ? color : accent, 0.2) }}>
          <Icon name="Sparkles" size={20} color={color} />
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <GText variant="caption" tone="secondary" numberOfLines={1}>{s.subject.name}</GText>
          <GText variant="title2" numberOfLines={2}>{s.chapter.title}</GText>
        </View>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.md }}>
        {s.reasons.map(r => <Chip key={r} label={r} color={r.startsWith("Contrôle") ? semantic.warning : aurora.cyan} />)}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.md, marginTop: space.lg, flexWrap: "wrap" }}>
        <GText variant="callout" tone="secondary">{MODE_LABEL[s.mode]} · {s.minutes} min</GText>
        <PillButton label="Commencer" icon="Play" onPress={() => startSession(router, s)} />
      </View>
      <GText variant="caption" tone="tertiary" style={{ marginTop: space.sm, color: g.textTertiary }}>
        Choisi d'après ta mémoire estimée, tes contrôles à venir et le poids de la matière.
      </GText>
    </Card>
  );
}

function AddExam({ subjects, onDone }: { subjects: { id: string; name: string }[]; onDone: () => void }) {
  const upsertExam = useRevisionStore(s => s.upsertExam);
  const [subjectId, setSubjectId] = useState<string | null>(subjects[0]?.id ?? null);
  const [title, setTitle] = useState("");
  const [inDays, setInDays] = useState(7);
  const save = () => {
    if (!subjectId) { return; }
    const d = new Date();
    d.setHours(8, 0, 0, 0);
    upsertExam({ subjectId, title: title.trim() || "Contrôle", date: d.getTime() + inDays * DAY, chapterIds: [], source: "manuel" });
    onDone();
  };
  return (
    <View style={{ gap: space.md, marginTop: space.md }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
        {subjects.map(s => <Choice key={s.id} label={s.name} selected={s.id === subjectId} onPress={() => setSubjectId(s.id)} />)}
      </View>
      <Field value={title} onChangeText={setTitle} placeholder="Sur quoi ? (ex. DS dérivation)" />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
        {[1, 2, 3, 5, 7, 10, 14, 21].map(d => <Choice key={d} label={d === 1 ? "Demain" : `Dans ${d} j`} selected={d === inDays} onPress={() => setInDays(d)} color={semantic.warning} />)}
      </View>
      <View style={{ flexDirection: "row", gap: space.sm }}>
        <PillButton label="Ajouter le contrôle" icon="Check" onPress={save} disabled={!subjectId} />
        <PillButton label="Annuler" tone="secondary" onPress={onDone} />
      </View>
    </View>
  );
}

function WeekBars({ minutesByDay }: { minutesByDay: { label: string; minutes: number; today: boolean }[] }) {
  const g = useGlass();
  const max = Math.max(30, ...minutesByDay.map(d => d.minutes));
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", gap: space.sm, height: 92 }}>
      {minutesByDay.map((d, i) => (
        <View key={i} style={{ flex: 1, alignItems: "center", gap: 4 }}>
          <GText variant="caption" tone="tertiary" style={{ fontSize: 10 }}>{d.minutes ? d.minutes : ""}</GText>
          <View style={{ width: "70%", maxWidth: 26, height: Math.max(4, (d.minutes / max) * 56), borderRadius: 6, backgroundColor: d.minutes ? (d.today ? accent : withAlpha(accent, 0.45)) : g.separator }} />
          <GText variant="caption" color={d.today ? g.text : g.textTertiary} style={{ fontSize: 11 }}>{d.label}</GText>
        </View>
      ))}
    </View>
  );
}

export default function RevisionHome() {
  const g = useGlass();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const columns = width >= 1000 ? 3 : width >= 560 ? 2 : 1;
  const { subjects, chapters, exams, ranked, dueCards, ideas } = useRevisionData();
  const skillStates = useRevisionStore(s => s.skills);
  const activateProgram = useRevisionStore(s => s.activateProgram);
  const dismiss = useRevisionStore(s => s.dismiss);
  const dismissed = useRevisionStore(s => s.dismissed);
  const sessions = useRevisionStore(s => s.sessions);
  const dailyMinutes = useRevisionStore(s => s.dailyMinutes);
  const setDailyMinutes = useRevisionStore(s => s.setDailyMinutes);
  const deleteExam = useRevisionStore(s => s.deleteExam);
  const [addingExam, setAddingExam] = useState(false);
  const [showScience, setShowScience] = useState(false);
  const now = Date.now();

  const today = useMemo(() => planToday(ranked, dailyMinutes), [ranked, dailyMinutes]);
  const top = today[0] ?? ranked[0];
  const upcoming = exams.filter(e => e.date >= now - DAY / 2).slice(0, 6);

  const week = useMemo(() => {
    const days: { label: string; minutes: number; today: boolean }[] = [];
    const start = new Date(); start.setHours(0, 0, 0, 0);
    for (let i = 6; i >= 0; i--) {
      const from = start.getTime() - i * DAY;
      const minutes = sessions.filter(s => s.start >= from && s.start < from + DAY).reduce((sum, s) => sum + s.minutes, 0);
      days.push({ label: new Date(from).toLocaleDateString("fr-FR", { weekday: "narrow" }).toUpperCase(), minutes, today: i === 0 });
    }
    return days;
  }, [sessions]);
  const weekTotal = week.reduce((s, d) => s + d.minutes, 0);
  const streak = useMemo(() => {
    let n = 0;
    const start = new Date(); start.setHours(0, 0, 0, 0);
    for (let i = 0; i < 365; i++) {
      const from = start.getTime() - i * DAY;
      const has = sessions.some(s => s.start >= from && s.start < from + DAY);
      if (has) { n++; } else if (i > 0) { break; }
    }
    return n;
  }, [sessions]);

  const subjectStats = useMemo(() => subjects.map(s => {
    const own = chapters.filter(c => c.subjectId === s.id);
    const reviewed = own.filter(c => c.memory);
    const avg = reviewed.length ? reviewed.reduce((sum, c) => sum + retrievability(c.memory, now), 0) / reviewed.length : null;
    const nextExam = exams.find(e => e.subjectId === s.id && e.date >= now - DAY / 2);
    return { subject: s, chapters: own.length, memory: avg, nextExam };
  }), [subjects, chapters, exams, now]);

  return (
    <PrismScreen
      title="Révision"
      overline="Mode révision"
      subtitle="Ce qu'il faut revoir, quand, et comment, d'après la science de la mémoire."
      back
      actions={<ActionButton icon="Info" label="La méthode" onPress={() => setShowScience(v => !v)} />}
    >
      {showScience && (
        <Card>
          <SectionHeader title="Ce qui marche vraiment" />
          {EVIDENCE.map((e, i) => (
            <Row key={e.title} first={i === 0} title={e.title} subtitle={`${e.detail}\n${e.origin}`} />
          ))}
          <GText variant="caption" tone="tertiary" style={{ marginTop: space.md }}>
            Absent volontairement : relire, surligner, recopier le cours. Ça donne l'impression de travailler, sans effet mesurable sur la note.
          </GText>
        </Card>
      )}

      {(() => {
        // Programme chapters seen in the cahier de textes or announced in a test, not followed yet.
        const followed = new Set(chapters.map(c => c.programId).filter(Boolean));
        const found = new Map<string, { programId: string; subjectId: string; title: string; subject: string }>();
        for (const s of subjects) {
          const texts = [...(ideas.get(s.id) ?? []), ...exams.filter(e => e.subjectId === s.id).map(e => e.title)];
          for (const t of texts) {
            for (const p of matchChapters(s.canonical ?? s.id, t)) {
              if (!followed.has(p.id) && !dismissed.includes(`program:${p.id}`)) { found.set(p.id, { programId: p.id, subjectId: s.id, title: p.title, subject: s.name }); }
            }
          }
        }
        const list = [...found.values()].slice(0, 6);
        if (!list.length) { return null; }
        return (
          <Card>
            <SectionHeader title="Vu en cours, à suivre" />
            <GText variant="caption" tone="tertiary" style={{ marginBottom: space.sm }}>
              Repéré dans ton cahier de textes et tes devoirs PRONOTE. Suivre un chapitre ajoute ses exercices corrigés et ses cartes.
            </GText>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
              {list.map(x => (
                <Chip key={x.programId} label={`+ ${x.title} · ${x.subject}`} color={aurora.violet} onPress={() => activateProgram(x.programId, x.subjectId)} />
              ))}
              <Chip label="Ignorer" color={MUTED} onPress={() => list.forEach(x => dismiss(`program:${x.programId}`))} />
            </View>
          </Card>
        );
      })()}

      {(() => {
        const trainable = chapters.filter(c => programChapter(c.programId)?.skills.length);
        if (!trainable.length) { return null; }
        const bySubject = new Map<string, number>();
        trainable.forEach(c => bySubject.set(c.subjectId, (bySubject.get(c.subjectId) ?? 0) + 1));
        return (
          <Card>
            <SectionHeader title="S'entraîner" />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
              {[...bySubject.keys()].map(sid => {
                const subject = subjects.find(x => x.id === sid);
                const skills = trainable.filter(c => c.subjectId === sid).flatMap(c => programChapter(c.programId)?.skills ?? []);
                const mark = predictedMark(skills.map(k => skillStates[k]));
                return (
                  <PillButton
                    key={sid}
                    label={`${subject?.name ?? sid}${mark !== null ? ` · ≈ ${String(mark).replace(".", ",")}/20` : ""}`}
                    icon="Sparkles"
                    tone="secondary"
                    onPress={() => router.push({ pathname: "/(features)/revision/pratique", params: { subjectId: sid } } as never)}
                  />
                );
              })}
            </View>
            <GText variant="caption" tone="tertiary" style={{ marginTop: space.sm }}>
              10 exercices corrigés, mélangés entre tes chapitres, au niveau qui te fait réussir environ 85 % du temps. « ≈ /20 » : ta note probable à un contrôle aujourd'hui.
            </GText>
          </Card>
        );
      })()}

      {top ? (
        <NowCard s={top} />
      ) : (
        <EmptyState
          icon="Sparkles"
          title="Ton espace de révision"
          message={subjects.length
            ? "Choisis une matière ci-dessous et ajoute les chapitres en cours : l'app te dira chaque jour quoi revoir, et comment."
            : "Les matières arrivent de PRONOTE (devoirs, cahier de textes). Ajoute un contrôle ou un chapitre pour commencer."}
        />
      )}

      <View style={{ flexDirection: width >= 860 ? "row" : "column", gap: space.lg, alignItems: "flex-start" }}>
        <View style={{ flex: 1, gap: space.lg, alignSelf: "stretch" }}>
          {today.length > 1 && (
            <Card>
              <SectionHeader title={`Programme du jour · ${today.reduce((s, x) => s + x.minutes, 0)} min`} />
              {today.map((s, i) => (
                <Row
                  key={s.chapter.id}
                  first={i === 0}
                  leading={<View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: getSubjectColor(s.subject.name) }} />}
                  title={s.chapter.title}
                  subtitle={`${s.subject.name} · ${MODE_LABEL[s.mode]} · ${s.minutes} min${s.reasons[0] ? ` · ${s.reasons[0]}` : ""}`}
                  onPress={() => startSession(router, s)}
                />
              ))}
              <GText variant="caption" tone="tertiary" style={{ marginTop: space.sm }}>
                Les matières alternent exprès : mélanger renforce la mémoire mieux que tout faire d'un bloc.
              </GText>
            </Card>
          )}

          <Card onPress={dueCards.length ? () => router.push("/(features)/revision/cartes" as never) : undefined}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: space.md }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: withAlpha(aurora.violet, 0.18) }}>
                <Icon name="Card" size={19} color={aurora.violet} />
              </View>
              <View style={{ flex: 1 }}>
                <GText variant="title3">{dueCards.length ? `${dueCards.length} carte${dueCards.length > 1 ? "s" : ""} à revoir` : "Aucune carte due"}</GText>
                <GText variant="caption" tone="tertiary">
                  {dueCards.length ? "Cartes express : environ " + Math.max(2, Math.round(dueCards.length * 0.25)) + " min, toutes matières mélangées." : "Les cartes créées pendant tes séances reviennent ici juste avant l'oubli."}
                </GText>
              </View>
              {dueCards.length ? <Icon name="ChevronRight" size={14} color={g.textTertiary} /> : null}
            </View>
          </Card>

          <Card>
            <SectionHeader title="Contrôles à venir" action={addingExam ? undefined : "Ajouter"} onAction={() => setAddingExam(true)} />
            {addingExam && <AddExam subjects={subjects} onDone={() => setAddingExam(false)} />}
            {upcoming.length === 0 && !addingExam ? (
              <GText variant="callout" tone="tertiary">Aucun contrôle prévu. Ceux annoncés dans les devoirs PRONOTE apparaissent tout seuls.</GText>
            ) : (
              upcoming.map((e, i) => {
                const subject = subjects.find(s => s.id === e.subjectId);
                const steps = examPlan(e.date, now);
                return (
                  <View key={e.id} style={{ paddingVertical: space.md, borderTopWidth: i || addingExam ? 1 : 0, borderTopColor: g.separator, gap: space.sm }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: space.md }}>
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <GText variant="callout" numberOfLines={1}>{subject?.name ?? e.subjectId} · {dayLabel(e.date, now)}</GText>
                        <GText variant="caption" tone="tertiary" numberOfLines={2}>{e.title}</GText>
                      </View>
                      <Chip label="Retirer" color={MUTED} onPress={() => deleteExam(e.id)} />
                    </View>
                    {(() => {
                      const matched = matchChapters(subject?.canonical ?? e.subjectId, e.title).filter(p => p.skills.length);
                      const scope = matched.length ? matched : programFor(subject?.canonical ?? e.subjectId).filter(p => chapters.some(c => c.programId === p.id) && p.skills.length);
                      if (!scope.length) { return null; }
                      const mark = predictedMark(scope.flatMap(p => p.skills).map(k => skillStates[k]));
                      const followedIds = scope.map(p => chapters.find(c => c.programId === p.id)?.id).filter(Boolean) as string[];
                      return (
                        <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm, flexWrap: "wrap" }}>
                          <GText variant="caption" tone="secondary">
                            {scope.map(p => p.title).join(", ")}{mark !== null ? ` · note probable ≈ ${String(mark).replace(".", ",")}/20` : ""}
                          </GText>
                          {followedIds.length ? (
                            <Chip
                              label="Contrôle blanc"
                              color={semantic.warning}
                              onPress={() => router.push({ pathname: "/(features)/revision/pratique", params: followedIds.length === 1 ? { chapterId: followedIds[0], exam: "1" } : { subjectId: e.subjectId, exam: "1" } } as never)}
                            />
                          ) : (
                            <Chip label="Suivre ces chapitres" color={aurora.violet} onPress={() => scope.forEach(p => activateProgram(p.id, e.subjectId))} />
                          )}
                        </View>
                      );
                    })()}
                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.xs }}>
                      {steps.map(st => (
                        <Chip key={st.date} label={`${dayLabel(st.date, now)} · ${st.label}`} color={st.date <= now ? semantic.warning : aurora.cyan} />
                      ))}
                    </View>
                  </View>
                );
              })
            )}
          </Card>
        </View>

        <View style={{ flex: 1, gap: space.lg, alignSelf: "stretch" }}>
          <Card>
            <SectionHeader title={`Cette semaine · ${weekTotal} min${streak > 1 ? ` · ${streak} jours d'affilée` : ""}`} />
            <WeekBars minutesByDay={week} />
            <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm, marginTop: space.md, flexWrap: "wrap" }}>
              <GText variant="caption" tone="tertiary">Temps par jour :</GText>
              {[30, 45, 60, 90, 120].map(m => <Choice key={m} label={`${m} min`} selected={dailyMinutes === m} onPress={() => setDailyMinutes(m)} />)}
            </View>
          </Card>
        </View>
      </View>

      <View style={{ gap: space.md }}>
        <GText variant="overline" tone="secondary">Matières</GText>
        {subjectStats.length === 0 ? (
          <GText variant="callout" tone="tertiary">Aucune matière pour l'instant.</GText>
        ) : (
          <Grid columns={columns}>
            {subjectStats.map(({ subject, chapters: count, memory, nextExam }) => (
              <Card key={subject.id} onPress={() => router.push({ pathname: "/(features)/revision/matiere/[id]", params: { id: subject.id } } as never)} padding={space.lg}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm }}>
                  <View style={{ width: 4, height: 30, borderRadius: 2, backgroundColor: getSubjectColor(subject.name) }} />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <GText variant="title3" numberOfLines={1}>{subject.name}</GText>
                    <GText variant="caption" tone="tertiary" numberOfLines={1}>
                      {FAMILY_LABEL[familyOf(subject.canonical)]} · {count} chapitre{count > 1 ? "s" : ""}
                    </GText>
                  </View>
                  <GText variant="title3" tabular color={memoryColor(memory)}>{memory === null ? "—" : `${Math.round(memory * 100)} %`}</GText>
                </View>
                {nextExam ? (
                  <GText variant="caption" color={semantic.warning} style={{ marginTop: space.sm }} numberOfLines={1}>Contrôle {dayLabel(nextExam.date, now)}</GText>
                ) : null}
              </Card>
            ))}
          </Grid>
        )}
      </View>
    </PrismScreen>
  );
}
