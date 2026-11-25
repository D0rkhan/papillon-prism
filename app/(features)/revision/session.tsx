import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";

import { Field, PillButton } from "@/components/revision/parts";
import { formatInterval, previewIntervals, Rating, RATING_LABEL } from "@/core/revision/fsrs";
import { familyOf, MODE_LABEL, protocolFor, SessionMode } from "@/core/revision/methods";
import { useRevisionStore } from "@/stores/revision";
import { aurora, Card, EmptyState, GText, Icon, PrismScreen, radius, SectionHeader, semantic, space, useGlass, webOnly, withAlpha } from "@/ui/glass";

const RATING_COLOR: Record<Rating, string> = { 1: semantic.danger, 2: semantic.warning, 3: aurora.cyan, 4: semantic.success };
const RATING_HINT: Record<Rating, string> = {
  1: "Presque rien retrouvé",
  2: "Retrouvé avec effort, des trous",
  3: "L'essentiel est revenu",
  4: "Tout, sans hésiter",
};

const mmss = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;

function Timer({ seconds, running, onToggle, over }: { seconds: number; running: boolean; onToggle: () => void; over: boolean }) {
  const g = useGlass();
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityLabel={running ? "Pause" : "Reprendre"}
      style={[{ flexDirection: "row", alignItems: "center", gap: space.sm, paddingHorizontal: space.lg, height: 44, borderRadius: radius.pill, backgroundColor: over ? withAlpha(semantic.warning, 0.18) : g.glassFillStrong }, webOnly({ cursor: "pointer" })]}
    >
      <Icon name={running ? "Pause" : "Play"} size={14} color={over ? semantic.warning : g.text} />
      <GText variant="title2" tabular color={over ? semantic.warning : g.text}>{over ? `+${mmss(-seconds)}` : mmss(seconds)}</GText>
    </Pressable>
  );
}

export default function RevisionSession() {
  const g = useGlass();
  const router = useRouter();
  const params = useLocalSearchParams<{ chapterId?: string; mode?: string }>();
  const store = useRevisionStore();
  const chapter = params.chapterId ? store.chapters[params.chapterId] : undefined;
  const subject = chapter ? store.subjects[chapter.subjectId] : undefined;
  const mode = (["decouverte", "rappel", "controle", "express"].includes(params.mode ?? "") ? params.mode : "rappel") as SessionMode;
  const protocol = useMemo(() => protocolFor(familyOf(subject?.canonical), mode), [subject?.canonical, mode]);

  const [step, setStep] = useState(0);
  const [remaining, setRemaining] = useState(protocol.steps[0].minutes * 60);
  const [running, setRunning] = useState(true);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [cardsAdded, setCardsAdded] = useState(0);
  const [finished, setFinished] = useState<Rating | null>(null);
  const startedAt = useRef(Date.now());
  const activeMs = useRef(0);
  const lastTick = useRef(Date.now());

  useEffect(() => {
    if (!running || finished) { return; }
    lastTick.current = Date.now();
    const t = setInterval(() => {
      const now = Date.now();
      activeMs.current += now - lastTick.current;
      lastTick.current = now;
      setRemaining(r => r - 1);
    }, 1000);
    return () => clearInterval(t);
  }, [running, finished]);

  // Express sessions are flashcards only.
  useEffect(() => {
    if (mode !== "express") { return; }
    router.replace({ pathname: "/(features)/revision/cartes", params: chapter ? { subjectId: chapter.subjectId } : {} } as never);
  }, [mode, chapter, router]);

  if (mode === "express") { return null; }

  if (!chapter || !subject) {
    return (
      <PrismScreen title="Séance" back>
        <EmptyState icon="Search" title="Chapitre introuvable" message="Il a peut-être été supprimé." />
      </PrismScreen>
    );
  }

  const current = protocol.steps[step];
  const isLast = step === protocol.steps.length - 1;
  const intervals = previewIntervals(chapter.memory, Date.now());

  const goTo = (i: number) => {
    setStep(i);
    setRemaining(protocol.steps[i].minutes * 60);
    setRunning(true);
  };

  const addCard = () => {
    if (!front.trim() || !back.trim()) { return; }
    store.addCard(chapter.id, front, back);
    setFront("");
    setBack("");
    setCardsAdded(n => n + 1);
  };

  const finish = (rating: Rating) => {
    store.rateChapter(chapter.id, rating);
    store.logSession({
      subjectId: chapter.subjectId,
      chapterId: chapter.id,
      mode,
      start: startedAt.current,
      minutes: Math.max(1, Math.round(activeMs.current / 60000)),
      rating,
    });
    setFinished(rating);
    setRunning(false);
  };

  if (finished) {
    const next = store.chapters[chapter.id]?.memory;
    return (
      <PrismScreen title="Séance terminée" overline={`${subject.name} · ${chapter.title}`} back>
        <Card tint={RATING_COLOR[finished]}>
          <View style={{ alignItems: "center", gap: space.sm, paddingVertical: space.lg }}>
            <Icon name="Check" size={32} color={RATING_COLOR[finished]} />
            <GText variant="title2" align="center">Bien joué.</GText>
            <GText variant="callout" tone="secondary" align="center">
              {Math.max(1, Math.round(activeMs.current / 60000))} min de travail actif{cardsAdded ? ` · ${cardsAdded} carte${cardsAdded > 1 ? "s" : ""} créée${cardsAdded > 1 ? "s" : ""}` : ""}.
            </GText>
            {next ? (
              <GText variant="callout" align="center">
                Prochain rappel : <GText variant="callout" color={aurora.cyan}>{formatInterval(Math.round((next.due - Date.now()) / 86400000))}</GText>, juste avant que la mémoire passe sous 90 %.
              </GText>
            ) : null}
          </View>
        </Card>
        <View style={{ flexDirection: "row", gap: space.sm, flexWrap: "wrap" }}>
          <PillButton label="Retour à la révision" icon="ArrowLeft" onPress={() => router.back()} />
          {cardsAdded > 0 && <PillButton label="Tester mes cartes" tone="secondary" icon="Card" onPress={() => router.replace({ pathname: "/(features)/revision/cartes", params: { chapterId: chapter.id } } as never)} />}
        </View>
        <GText variant="caption" tone="tertiary">Une pause de 5 minutes loin de l'écran avant la séance suivante aide à consolider.</GText>
      </PrismScreen>
    );
  }

  return (
    <PrismScreen title={chapter.title} overline={`${subject.name} · ${MODE_LABEL[mode]}`} back>
      {/* Progress */}
      <View style={{ flexDirection: "row", gap: 4 }}>
        {protocol.steps.map((s, i) => (
          <Pressable key={s.title} onPress={() => goTo(i)} style={[{ flex: 1, height: 5, borderRadius: 3, backgroundColor: i < step ? aurora.violet : i === step ? withAlpha(aurora.violet, 0.6) : g.separator }, webOnly({ cursor: "pointer" })]} />
        ))}
      </View>

      <Card>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.md, flexWrap: "wrap" }}>
          <View style={{ flex: 1, minWidth: 180 }}>
            <GText variant="overline" tone="tertiary">Étape {step + 1} / {protocol.steps.length}</GText>
            <GText variant="title1">{current.title}</GText>
          </View>
          {!isLast && <Timer seconds={remaining} running={running} onToggle={() => setRunning(r => !r)} over={remaining < 0} />}
        </View>
        <GText variant="body" style={{ marginTop: space.lg }}>{current.how}</GText>
        <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.lg, padding: space.md, borderRadius: radius.md, backgroundColor: g.glassFill }}>
          <Icon name="Info" size={15} color={aurora.cyan} />
          <GText variant="caption" tone="secondary" style={{ flex: 1 }}>{current.why}</GText>
        </View>
      </Card>

      {current.cards && (
        <Card>
          <SectionHeader title={`Cartes de rappel${cardsAdded ? ` · ${cardsAdded} ajoutée${cardsAdded > 1 ? "s" : ""}` : ""}`} />
          <View style={{ gap: space.sm }}>
            <Field value={front} onChangeText={setFront} placeholder="Question (ex. Dérivée de ln(x) ?)" />
            <Field value={back} onChangeText={setBack} placeholder="Réponse" multiline />
            <View style={{ flexDirection: "row" }}>
              <PillButton label="Ajouter la carte" icon="Add" tone="secondary" onPress={addCard} disabled={!front.trim() || !back.trim()} />
            </View>
            <GText variant="caption" tone="tertiary">Une idée par carte, formulée en question. Les bonnes cartes sont courtes.</GText>
          </View>
        </Card>
      )}

      {isLast ? (
        <Card>
          <SectionHeader title="Comment s'est passée la page blanche ?" />
          <View style={{ gap: space.sm }}>
            {([1, 2, 3, 4] as Rating[]).map(r => (
              <Pressable
                key={r}
                onPress={() => finish(r)}
                accessibilityRole="button"
                style={state => [{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: space.md,
                  padding: space.md,
                  borderRadius: radius.md,
                  borderWidth: 1,
                  borderColor: withAlpha(RATING_COLOR[r], 0.45),
                  backgroundColor: withAlpha(RATING_COLOR[r], state.pressed ? 0.24 : 0.1),
                }, webOnly({ cursor: "pointer" })]}
              >
                <View style={{ flex: 1 }}>
                  <GText variant="title3" color={RATING_COLOR[r]}>{RATING_LABEL[r]}</GText>
                  <GText variant="caption" tone="tertiary">{RATING_HINT[r]}</GText>
                </View>
                <GText variant="caption" tone="secondary">rappel {formatInterval(intervals[r])}</GText>
              </Pressable>
            ))}
          </View>
        </Card>
      ) : (
        <View style={{ flexDirection: "row", gap: space.sm, flexWrap: "wrap" }}>
          <PillButton label="Étape suivante" icon="ArrowRight" onPress={() => goTo(step + 1)} />
          {step > 0 && <PillButton label="Précédente" tone="secondary" onPress={() => goTo(step - 1)} />}
        </View>
      )}

      <GText variant="caption" tone="tertiary">Téléphone retourné, notifications coupées : 25 minutes de vraie concentration valent mieux qu'une heure dispersée.</GText>
    </PrismScreen>
  );
}
