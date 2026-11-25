import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import { MemoryMeter, PillButton } from "@/components/revision/parts";
import { checkAnswer } from "@/core/practice/answer";
import { programChapter, SKILLS } from "@/core/practice/curriculum";
import { Attempt, MASTERED, predictedMark } from "@/core/practice/mastery";
import { buildQueue, makeExercise, markOn20, QueueItem } from "@/core/practice/session";
import type { Difficulty, Exercise } from "@/core/practice/types";
import { formatInterval, previewIntervals, Rating, RATING_LABEL } from "@/core/revision/fsrs";
import { useRevisionStore } from "@/stores/revision";
import { aurora, Card, EmptyState, gradeColor, GText, Icon, PrismScreen, radius, SectionHeader, semantic, space, useGlass, webOnly, withAlpha } from "@/ui/glass";

const RATING_COLOR: Record<Rating, string> = { 1: semantic.danger, 2: semantic.warning, 3: aurora.cyan, 4: semantic.success };
/** P(right without the skill) on a typed answer: partial method, lucky rounding… (BKT usually 0.15–0.25). */
const TYPED_GUESS = 0.15;
const mmss = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;

interface Outcome { item: QueueItem; correct: boolean; given?: string }

function Dots({ level }: { level: Difficulty }) {
  const g = useGlass();
  return (
    <View style={{ flexDirection: "row", gap: 3 }} accessibilityLabel={`Niveau ${level} sur 3`}>
      {[1, 2, 3].map(i => <View key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: i <= level ? aurora.violet : g.separator }} />)}
    </View>
  );
}

function Solution({ ex }: { ex: Exercise }) {
  const g = useGlass();
  return (
    <View style={{ gap: 6, marginTop: space.md, padding: space.md, borderRadius: radius.md, backgroundColor: g.glassFill }}>
      <GText variant="overline" tone="tertiary">Correction</GText>
      {ex.solution.map((line, i) => <GText key={i} variant="callout" selectable>{line}</GText>)}
    </View>
  );
}

export default function Practice() {
  const g = useGlass();
  const router = useRouter();
  const params = useLocalSearchParams<{ chapterId?: string; subjectId?: string; exam?: string; length?: string }>();
  const exam = params.exam === "1";
  const store = useRevisionStore();
  const startedAt = useRef(Date.now()).current;

  // Scope: one chapter, or every followed chapter of a subject.
  const scope = useMemo(() => {
    const chapters = Object.values(store.chapters).filter(c =>
      params.chapterId ? c.id === params.chapterId : c.subjectId === params.subjectId
    );
    const skills = [...new Set(chapters.flatMap(c => programChapter(c.programId)?.skills ?? []))];
    const ids = new Set(chapters.map(c => c.id));
    const cards = Object.values(store.cards).filter(c => ids.has(c.chapterId)).map(c => ({ id: c.id, due: c.memory?.due, memory: c.memory }));
    const subjectId = chapters[0]?.subjectId ?? params.subjectId;
    return { chapters, skills, cards, subjectId };
    // Frozen when the screen opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialStates = useRef(store.skills).current;
  const [queue, setQueue] = useState<QueueItem[]>(() =>
    buildQueue({ skills: scope.skills, cards: scope.cards, states: store.skills, length: Number(params.length) || (exam ? 6 : 10), now: startedAt, exam })
  );
  const predicted = useMemo(() => (exam ? predictedMark(scope.skills.map(id => initialStates[id])) : null), [exam, scope.skills, initialStates]);

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState<null | "correct" | "wrong">(null);
  const [invalid, setInvalid] = useState(false);
  const [hint, setHint] = useState(false);
  const [shown, setShown] = useState(false);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [retries, setRetries] = useState(0);
  const itemStart = useRef(Date.now());
  const [left, setLeft] = useState(exam ? Math.max(10, queue.length * 3) * 60 : 0);
  const done = index >= queue.length;

  useEffect(() => {
    if (!exam || done) { return; }
    const t = setInterval(() => setLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [exam, done]);

  // Out of time: the remaining questions count as unanswered.
  useEffect(() => {
    if (exam && left <= 0 && !done) {
      setOutcomes(o => [...o, ...queue.slice(index).map(item => ({ item, correct: false }))]);
      setIndex(queue.length);
    }
  }, [exam, left, done, index, queue]);

  const item = queue[index];

  const next = () => {
    setIndex(i => i + 1);
    setInput("");
    setChoice(null);
    setChecked(null);
    setInvalid(false);
    setHint(false);
    setShown(false);
    itemStart.current = Date.now();
  };

  const submit = () => {
    if (!item || item.type !== "exercise") { return; }
    const ex = item.exercise;
    const verdict = checkAnswer(ex, ex.kind === "choice" ? (choice ?? -1) : input);
    if (verdict === "invalid") { setInvalid(true); return; }
    const correct = verdict === "correct";
    const attempt: Attempt = {
      correct,
      difficulty: ex.difficulty,
      guess: ex.kind === "choice" ? Math.max(0.25, 1 / (ex.choices?.length ?? 4)) : TYPED_GUESS,
      usedHint: hint,
      seconds: (Date.now() - itemStart.current) / 1000,
    };
    store.recordSkill(ex.skillId, attempt);
    setOutcomes(o => [...o, { item, correct, given: ex.kind === "choice" ? ex.choices?.[choice ?? -1] : input }]);
    if (exam) { next(); return; }
    setChecked(correct ? "correct" : "wrong");
    // A mistake brings back a fresh variant of the same skill a little later (max 3 per session).
    if (!correct && retries < 3) {
      const variant = makeExercise(ex.skillId, Math.max(1, ex.difficulty - 1) as Difficulty, Math.floor(Math.random() * 2e9));
      setQueue(q => {
        const copy = [...q];
        copy.splice(Math.min(copy.length, index + 3), 0, { type: "exercise", exercise: variant });
        return copy;
      });
      setRetries(n => n + 1);
    }
  };

  const rateCard = (r: Rating) => {
    if (!item || item.type !== "card") { return; }
    store.rateCard(item.cardId, r);
    setOutcomes(o => [...o, { item, correct: r >= 3 }]);
    next();
  };

  // Session end: log it and rate the chapter from what actually happened.
  const logged = useRef(false);
  useEffect(() => {
    if (!done || logged.current || outcomes.length === 0) { return; }
    logged.current = true;
    const right = outcomes.filter(o => o.correct).length;
    const rate = right / outcomes.length;
    const rating: Rating = rate >= 0.9 ? 4 : rate >= 0.75 ? 3 : rate >= 0.5 ? 2 : 1;
    for (const c of scope.chapters) {
      const touched = outcomes.some(o => (o.item.type === "exercise" ? programChapter(c.programId)?.skills.includes(o.item.exercise.skillId) : store.cards[o.item.cardId]?.chapterId === c.id));
      if (touched) { store.rateChapter(c.id, rating); }
    }
    const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60000));
    if (scope.subjectId) {
      store.logSession({ subjectId: scope.subjectId, chapterId: params.chapterId, mode: exam ? "blanc" : "pratique", start: startedAt, minutes, rating, score: { right, total: outcomes.length } });
      if (exam) {
        store.addMock({ subjectId: scope.subjectId, at: Date.now(), right, total: outcomes.length, mark: markOn20(right, outcomes.length), predicted, chapterIds: scope.chapters.map(c => c.id) });
      }
    }
  }, [done, outcomes, scope, exam, params.chapterId, predicted, startedAt, store]);

  if (queue.length === 0) {
    return (
      <PrismScreen title="Entraînement" back>
        <EmptyState
          icon="Sparkles"
          title="Rien à travailler ici"
          message="Suis un chapitre du programme (exercices générés) ou crée des cartes dans tes chapitres, puis reviens."
        />
      </PrismScreen>
    );
  }

  if (done) {
    const right = outcomes.filter(o => o.correct).length;
    const mark = markOn20(right, outcomes.length);
    const touched = [...new Set(outcomes.flatMap(o => (o.item.type === "exercise" ? [o.item.exercise.skillId] : [])))];
    const wrong = outcomes.filter(o => !o.correct && o.item.type === "exercise");
    return (
      <PrismScreen
        title={exam ? "Contrôle blanc terminé" : "Entraînement terminé"}
        overline={params.chapterId ? (programChapter(scope.chapters[0]?.programId)?.title ?? scope.chapters[0]?.title) : store.subjects[scope.subjectId ?? ""]?.name}
        back
      >
        <Card tint={gradeColor(mark)}>
          <View style={{ alignItems: "center", gap: space.xs, paddingVertical: space.md }}>
            <GText variant="overline" tone="tertiary">{exam ? "Ta note" : "Réussite"}</GText>
            <GText variant="display" color={gradeColor(mark)}>{exam ? `${String(mark).replace(".", ",")}/20` : `${right}/${outcomes.length}`}</GText>
            {exam && predicted !== null ? (
              <GText variant="callout" tone="secondary" align="center">
                Le modèle prévoyait {String(predicted).replace(".", ",")}/20 d'après tes entraînements.
              </GText>
            ) : (
              <GText variant="callout" tone="secondary" align="center">
                {right / outcomes.length >= 0.85 ? "Dans la zone idéale : le niveau va monter d'un cran." : "Les erreurs d'aujourd'hui sont ce qui fait progresser : elles reviennent en priorité."}
              </GText>
            )}
          </View>
        </Card>

        {touched.length > 0 && (
          <Card>
            <SectionHeader title="Maîtrise des compétences" />
            {touched.map((id, i) => {
              const before = initialStates[id]?.pL ?? 0.15;
              const after = store.skills[id]?.pL ?? before;
              return (
                <View key={id} style={{ paddingVertical: space.sm, borderTopWidth: i ? 1 : 0, borderTopColor: g.separator, gap: 6 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", gap: space.md }}>
                    <GText variant="callout" style={{ flex: 1 }}>{SKILLS[id]?.title}</GText>
                    <GText variant="caption" color={after >= MASTERED ? semantic.success : after > before ? aurora.cyan : semantic.warning}>
                      {Math.round(before * 100)} → {Math.round(after * 100)} %{after >= MASTERED ? " · maîtrisée" : ""}
                    </GText>
                  </View>
                  <View style={{ height: 5, borderRadius: 3, backgroundColor: g.separator, overflow: "hidden" }}>
                    <View style={{ width: `${Math.round(after * 100)}%`, height: 5, backgroundColor: after >= MASTERED ? semantic.success : aurora.violet }} />
                  </View>
                </View>
              );
            })}
            <GText variant="caption" tone="tertiary" style={{ marginTop: space.sm }}>
              Probabilité de maîtrise estimée par traçage bayésien des connaissances : une réponse juste peut être de la chance, une erreur une étourderie.
            </GText>
          </Card>
        )}

        {exam && wrong.length > 0 && (
          <Card>
            <SectionHeader title="Corrections" />
            {wrong.map((o, i) => o.item.type === "exercise" ? (
              <View key={i} style={{ paddingVertical: space.md, borderTopWidth: i ? 1 : 0, borderTopColor: g.separator }}>
                <GText variant="callout">{o.item.exercise.prompt}</GText>
                <GText variant="caption" color={semantic.danger} style={{ marginTop: 4 }}>
                  Ta réponse : {o.given || "—"} · attendu : {o.item.exercise.display}{o.item.exercise.unit ? ` ${o.item.exercise.unit}` : ""}
                </GText>
                <Solution ex={o.item.exercise} />
              </View>
            ) : null)}
          </Card>
        )}

        <View style={{ flexDirection: "row", gap: space.sm, flexWrap: "wrap" }}>
          <PillButton label="Retour" icon="ArrowLeft" onPress={() => router.back()} />
          <PillButton
            label={exam ? "Un autre contrôle blanc" : "Encore 10 exercices"}
            tone="secondary"
            icon="Refresh"
            onPress={() => router.replace({ pathname: "/(features)/revision/pratique", params: { ...params } } as never)}
          />
        </View>
      </PrismScreen>
    );
  }

  const progress = index / queue.length;

  return (
    <PrismScreen
      title={exam ? "Contrôle blanc" : "Entraînement"}
      overline={`${index + 1} / ${queue.length}${exam ? ` · ${mmss(left)}` : ""}`}
      back
    >
      <View style={{ height: 4, borderRadius: 2, backgroundColor: g.separator, overflow: "hidden" }}>
        <View style={{ width: `${progress * 100}%`, height: 4, backgroundColor: exam && left < 120 ? semantic.warning : aurora.violet }} />
      </View>

      {item.type === "exercise" ? (
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.md }}>
            <GText variant="caption" tone="secondary" style={{ flex: 1 }} numberOfLines={1}>{SKILLS[item.exercise.skillId]?.title}</GText>
            <Dots level={item.exercise.difficulty} />
          </View>
          <GText variant="title3" style={{ marginTop: space.md, lineHeight: 24 }} selectable>{item.exercise.prompt}</GText>

          {item.exercise.kind === "choice" ? (
            <View style={{ gap: space.sm, marginTop: space.lg }}>
              {item.exercise.choices!.map((c, i) => {
                const isRight = checked && i === item.exercise.answer;
                const isPicked = choice === i;
                const color = isRight ? semantic.success : checked && isPicked ? semantic.danger : isPicked ? aurora.violet : undefined;
                return (
                  <Pressable
                    key={c}
                    disabled={!!checked}
                    onPress={() => setChoice(i)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isPicked }}
                    style={[{
                      padding: space.md,
                      borderRadius: radius.md,
                      borderWidth: 1,
                      borderColor: color ? withAlpha(color, 0.6) : g.glassBorder,
                      backgroundColor: color ? withAlpha(color, 0.14) : g.glassFill,
                    }, webOnly({ cursor: checked ? "default" : "pointer" })]}
                  >
                    <GText variant="body" color={color}>{c}</GText>
                  </Pressable>
                );
              })}
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm, marginTop: space.lg }}>
              <TextInput
                value={input}
                onChangeText={t => { setInput(t); setInvalid(false); }}
                editable={!checked}
                placeholder="Ta réponse"
                placeholderTextColor={g.textTertiary}
                keyboardType="numbers-and-punctuation"
                onSubmitEditing={submit}
                returnKeyType="done"
                style={[{
                  flex: 1,
                  height: 48,
                  paddingHorizontal: space.md,
                  borderRadius: radius.md,
                  borderWidth: 1,
                  borderColor: checked === "correct" ? semantic.success : checked === "wrong" || invalid ? semantic.danger : g.glassBorder,
                  backgroundColor: g.glassFillStrong,
                  color: g.text,
                  fontFamily: "fixeltext-medium",
                  fontSize: 18,
                }, webOnly({ outlineStyle: "none" })]}
              />
              {item.exercise.unit ? <GText variant="title3" tone="secondary">{item.exercise.unit}</GText> : null}
            </View>
          )}

          {invalid && <GText variant="caption" color={semantic.danger} style={{ marginTop: space.sm }}>Écris un nombre : 3,5 · −2 · 1/2 · 3,2e-5 ou 3,2×10^-5.</GText>}

          {hint && !checked && (
            <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.md }}>
              <Icon name="Info" size={15} color={aurora.cyan} />
              <GText variant="callout" tone="secondary" style={{ flex: 1 }}>{item.exercise.hint}</GText>
            </View>
          )}

          {checked && (
            <>
              <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm, marginTop: space.lg }}>
                <Icon name={checked === "correct" ? "Check" : "Cross"} size={18} color={checked === "correct" ? semantic.success : semantic.danger} />
                <GText variant="title3" color={checked === "correct" ? semantic.success : semantic.danger}>
                  {checked === "correct" ? "Juste" : `Réponse : ${item.exercise.display}${item.exercise.unit ? ` ${item.exercise.unit}` : ""}`}
                </GText>
              </View>
              {checked === "wrong" && <GText variant="caption" tone="tertiary" style={{ marginTop: 2 }}>Une variante reviendra dans quelques questions.</GText>}
              <Solution ex={item.exercise} />
            </>
          )}
        </Card>
      ) : (
        (() => {
          const card = store.cards[item.cardId];
          if (!card) { return <PillButton label="Carte supprimée · suivante" onPress={next} />; }
          const chapter = store.chapters[card.chapterId];
          const iv = previewIntervals(card.memory, Date.now());
          return (
            <>
              <Pressable onPress={() => setShown(true)} style={webOnly({ cursor: "pointer" })}>
                <Card>
                  <GText variant="caption" tone="tertiary">Carte · {chapter?.title}</GText>
                  <GText variant="title2" style={{ marginTop: space.md }}>{card.front}</GText>
                  <View style={{ height: 1, backgroundColor: g.separator, marginVertical: space.lg }} />
                  {shown ? <GText variant="body" selectable>{card.back}</GText> : <GText variant="callout" tone="tertiary" align="center">Réponds de tête, puis touche pour retourner.</GText>}
                  <View style={{ marginTop: space.md }}><MemoryMeter memory={card.memory} compact /></View>
                </Card>
              </Pressable>
              {shown && (
                <View style={{ flexDirection: "row", gap: space.sm }}>
                  {([1, 2, 3, 4] as Rating[]).map(r => (
                    <Pressable key={r} onPress={() => rateCard(r)} style={[{ flex: 1, alignItems: "center", paddingVertical: space.md, borderRadius: radius.md, borderWidth: 1, borderColor: withAlpha(RATING_COLOR[r], 0.45), backgroundColor: withAlpha(RATING_COLOR[r], 0.12) }, webOnly({ cursor: "pointer" })]}>
                      <GText variant="caption" color={RATING_COLOR[r]}>{RATING_LABEL[r]}</GText>
                      <GText variant="caption" tone="tertiary">{formatInterval(iv[r])}</GText>
                    </Pressable>
                  ))}
                </View>
              )}
            </>
          );
        })()
      )}

      {item.type === "exercise" && (
        <View style={{ flexDirection: "row", gap: space.sm, flexWrap: "wrap" }}>
          {checked ? (
            <PillButton label={index + 1 >= queue.length ? "Voir le bilan" : "Suivant"} icon="ArrowRight" onPress={next} />
          ) : (
            <>
              <PillButton
                label={exam ? (index + 1 >= queue.length ? "Rendre la copie" : "Valider et suivant") : "Vérifier"}
                icon="Check"
                onPress={submit}
                disabled={item.exercise.kind === "choice" ? choice === null : !input.trim()}
              />
              {!exam && !hint && <PillButton label="Indice" tone="secondary" icon="Info" onPress={() => setHint(true)} />}
              {exam && (
                <PillButton label="Passer" tone="secondary" onPress={() => {
                  // In test conditions, a skipped question is evidence too.
                  store.recordSkill(item.exercise.skillId, { correct: false, difficulty: item.exercise.difficulty, guess: TYPED_GUESS, usedHint: false, seconds: (Date.now() - itemStart.current) / 1000 });
                  setOutcomes(o => [...o, { item, correct: false }]);
                  next();
                }} />
              )}
            </>
          )}
        </View>
      )}

      <GText variant="caption" tone="tertiary">
        {exam
          ? "Conditions réelles : pas d'indice, pas de correction avant la fin. Brouillon et calculatrice comme le jour J."
          : "Brouillon à côté : écris la démarche avant de taper le résultat. Un indice réduit l'effet de l'exercice, mais vaut mieux qu'un blocage."}
      </GText>
    </PrismScreen>
  );
}
