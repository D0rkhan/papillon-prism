import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";

import { PillButton } from "@/components/revision/parts";
import { formatInterval, previewIntervals, Rating, RATING_LABEL } from "@/core/revision/fsrs";
import { RevCard, useRevisionStore } from "@/stores/revision";
import { aurora, Card, EmptyState, GText, Icon, PrismScreen, radius, semantic, space, useGlass, webOnly, withAlpha } from "@/ui/glass";
import { getSubjectColor } from "@/utils/subjects/colors";

const RATING_COLOR: Record<Rating, string> = { 1: semantic.danger, 2: semantic.warning, 3: aurora.cyan, 4: semantic.success };

/** Due cards, interleaved: never two cards of the same chapter in a row when avoidable. */
function interleave(cards: RevCard[]): RevCard[] {
  const groups = new Map<string, RevCard[]>();
  for (const c of [...cards].sort(() => Math.random() - 0.5)) {
    groups.set(c.chapterId, [...(groups.get(c.chapterId) ?? []), c]);
  }
  const out: RevCard[] = [];
  let last = "";
  while (out.length < cards.length) {
    const options = [...groups.entries()].filter(([, list]) => list.length).sort((a, b) => b[1].length - a[1].length);
    const pick = options.find(([id]) => id !== last) ?? options[0];
    out.push(pick[1].shift() as RevCard);
    last = pick[0];
  }
  return out;
}

export default function RevisionCards() {
  const g = useGlass();
  const router = useRouter();
  const params = useLocalSearchParams<{ chapterId?: string; subjectId?: string }>();
  const store = useRevisionStore();
  const now = useRef(Date.now()).current;

  // The queue is frozen when the screen opens; ratings then update the store.
  const queue = useMemo(() => {
    const all = Object.values(store.cards).filter(c => {
      const chapter = store.chapters[c.chapterId];
      if (!chapter) { return false; }
      if (params.chapterId) { return c.chapterId === params.chapterId; }
      if (params.subjectId) { return chapter.subjectId === params.subjectId; }
      return !c.memory || c.memory.due <= now;
    });
    // A chapter/subject review takes every card; the general one only the due ones.
    return interleave(all);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(false);
  const [tally, setTally] = useState<Record<Rating, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const card = queue[index];
  const chapter = card ? store.chapters[card.chapterId] : undefined;
  const subject = chapter ? store.subjects[chapter.subjectId] : undefined;
  const live = card ? store.cards[card.id] : undefined;

  const rate = (r: Rating) => {
    if (!card) { return; }
    store.rateCard(card.id, r);
    setTally(t => ({ ...t, [r]: t[r] + 1 }));
    setShown(false);
    setIndex(i => i + 1);
  };

  if (queue.length === 0) {
    return (
      <PrismScreen title="Cartes" overline="Révision" back>
        <EmptyState icon="Card" title="Rien à revoir" message="Aucune carte n'est due. Les cartes que tu crées pendant les séances reviendront ici juste avant l'oubli." />
      </PrismScreen>
    );
  }

  if (!card) {
    const total = queue.length;
    const known = tally[3] + tally[4];
    return (
      <PrismScreen title="Cartes terminées" overline="Révision" back>
        <Card>
          <View style={{ alignItems: "center", gap: space.sm, paddingVertical: space.lg }}>
            <Icon name="Check" size={32} color={semantic.success} />
            <GText variant="title2">{known} / {total} retrouvées</GText>
            <GText variant="callout" tone="secondary" align="center">
              Les cartes ratées reviennent demain, les autres de plus en plus loin. C'est normal d'en rater : c'est l'effort de rappel qui fait retenir.
            </GText>
          </View>
        </Card>
        <View style={{ flexDirection: "row" }}>
          <PillButton label="Retour" icon="ArrowLeft" onPress={() => router.back()} />
        </View>
      </PrismScreen>
    );
  }

  const intervals = previewIntervals(live?.memory, Date.now());
  const color = subject ? getSubjectColor(subject.name) : aurora.violet;

  return (
    <PrismScreen title="Cartes" overline={`${index + 1} / ${queue.length}`} back>
      <View style={{ height: 4, borderRadius: 2, backgroundColor: g.separator, overflow: "hidden" }}>
        <View style={{ width: `${(index / queue.length) * 100}%`, height: 4, backgroundColor: aurora.violet }} />
      </View>

      <Pressable onPress={() => setShown(true)} accessibilityRole="button" accessibilityHint="Affiche la réponse" style={webOnly({ cursor: shown ? "default" : "pointer" })}>
        <Card tint={color}>
          <GText variant="caption" tone="tertiary">{subject?.name} · {chapter?.title}</GText>
          <GText variant="title2" style={{ marginTop: space.md, minHeight: 60 }}>{card.front}</GText>
          <View style={{ height: 1, backgroundColor: g.separator, marginVertical: space.lg }} />
          {shown ? (
            <GText variant="body" selectable>{card.back}</GText>
          ) : (
            <GText variant="callout" tone="tertiary" align="center">Réponds dans ta tête (ou à voix haute), puis touche pour retourner.</GText>
          )}
        </Card>
      </Pressable>

      {shown ? (
        <View style={{ flexDirection: "row", gap: space.sm }}>
          {([1, 2, 3, 4] as Rating[]).map(r => (
            <Pressable
              key={r}
              onPress={() => rate(r)}
              accessibilityRole="button"
              style={state => [{
                flex: 1,
                alignItems: "center",
                paddingVertical: space.md,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: withAlpha(RATING_COLOR[r], 0.45),
                backgroundColor: withAlpha(RATING_COLOR[r], state.pressed ? 0.26 : 0.12),
              }, webOnly({ cursor: "pointer" })]}
            >
              <GText variant="caption" color={RATING_COLOR[r]}>{RATING_LABEL[r]}</GText>
              <GText variant="caption" tone="tertiary">{formatInterval(intervals[r])}</GText>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <PillButton label="Voir la réponse" onPress={() => setShown(true)} />
        </View>
      )}

      <Pressable onPress={() => { store.deleteCard(card.id); setShown(false); setIndex(i => i + 1); }} style={[{ alignSelf: "flex-start" }, webOnly({ cursor: "pointer" })]}>
        <GText variant="caption" tone="tertiary">Supprimer cette carte</GText>
      </Pressable>
    </PrismScreen>
  );
}
