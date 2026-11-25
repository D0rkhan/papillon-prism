import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { Choice, dayLabel, Field, MemoryMeter, MUTED, nextReviewLabel, PillButton } from "@/components/revision/parts";
import { FAMILY_LABEL, familyOf, MODE_HINT, MODE_LABEL, protocolFor, SessionMode, totalMinutes } from "@/core/revision/methods";
import { useRevisionData } from "@/hooks/useRevisionData";
import { useRevisionStore } from "@/stores/revision";
import { aurora, Card, Chip, EmptyState, GText, Icon, PrismScreen, Row, SectionHeader, semantic, space, useGlass, webOnly } from "@/ui/glass";
import { getSubjectColor } from "@/utils/subjects/colors";

export default function RevisionSubject() {
  const g = useGlass();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { subjects, ranked, ideas, exams } = useRevisionData();
  const store = useRevisionStore();
  const subject = subjects.find(s => s.id === id) ?? (id ? store.subjects[id] : undefined);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState<SessionMode>("rappel");
  const [editing, setEditing] = useState<string | null>(null);
  const now = Date.now();

  const own = useMemo(() => ranked.filter(r => r.subject.id === id), [ranked, id]);
  const family = familyOf(subject?.canonical);
  const protocol = protocolFor(family, mode);
  const subjectIdeas = (id ? ideas.get(id) : undefined) ?? [];
  const subjectExams = exams.filter(e => e.subjectId === id && e.date >= now - 12 * 3600 * 1000);
  const cardsCount = Object.values(store.cards).filter(c => store.chapters[c.chapterId]?.subjectId === id).length;

  if (!subject || !id) {
    return (
      <PrismScreen title="Matière" back>
        <EmptyState icon="Search" title="Matière introuvable" />
      </PrismScreen>
    );
  }

  const add = (t = title) => {
    if (!t.trim()) { return; }
    store.addChapter(id, t, t === title ? "manuel" : "pronote");
    setTitle("");
  };

  const start = (chapterId: string, m: SessionMode) =>
    router.push({ pathname: "/(features)/revision/session", params: { chapterId, mode: m } } as never);

  return (
    <PrismScreen title={subject.name} overline={`Révision · ${FAMILY_LABEL[family]}`} back>
      {own[0] ? (
        <Card tint={getSubjectColor(subject.name)}>
          <GText variant="overline" tone="tertiary">À revoir en premier</GText>
          <GText variant="title2" style={{ marginTop: 4 }}>{own[0].chapter.title}</GText>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.sm }}>
            {own[0].reasons.map(r => <Chip key={r} label={r} color={r.startsWith("Contrôle") ? semantic.warning : aurora.cyan} />)}
          </View>
          <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.lg, flexWrap: "wrap" }}>
            <PillButton label={`${MODE_LABEL[own[0].mode]} · ${own[0].minutes} min`} icon="Play" onPress={() => start(own[0].chapter.id, own[0].mode)} />
            {cardsCount > 0 && (
              <PillButton label="Cartes de la matière" tone="secondary" icon="Card" onPress={() => router.push({ pathname: "/(features)/revision/cartes", params: { subjectId: id } } as never)} />
            )}
          </View>
        </Card>
      ) : null}

      {subjectExams.length > 0 && (
        <Card>
          <SectionHeader title="Contrôles" />
          {subjectExams.map((e, i) => (
            <Row key={e.id} first={i === 0} leading={<Icon name="AlertCircle" size={16} color={semantic.warning} />} title={dayLabel(e.date, now)} subtitle={e.title} />
          ))}
        </Card>
      )}

      <Card>
        <SectionHeader title={`Chapitres · ${own.length}`} />
        <View style={{ flexDirection: "row", gap: space.sm, alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Field value={title} onChangeText={setTitle} placeholder="Nouveau chapitre (ex. Suites numériques)" onSubmit={() => add()} />
          </View>
          <PillButton label="Ajouter" icon="Add" onPress={() => add()} disabled={!title.trim()} />
        </View>

        {own.length === 0 ? (
          <GText variant="callout" tone="tertiary" style={{ marginTop: space.md }}>
            Ajoute les chapitres vus en classe. Chaque chapitre a sa propre courbe d'oubli : l'app planifie ses rappels.
          </GText>
        ) : (
          own.map((s, i) => (
            <View key={s.chapter.id} style={{ paddingVertical: space.md, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: g.separator, marginTop: i === 0 ? space.md : 0, gap: 6 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: space.md }}>
                <Pressable onPress={() => start(s.chapter.id, s.mode)} style={[{ flex: 1, minWidth: 0 }, webOnly({ cursor: "pointer" })]}>
                  <GText variant="callout" numberOfLines={2}>{s.chapter.title}</GText>
                  <GText variant="caption" tone="tertiary">
                    {nextReviewLabel(s.chapter.memory, now)}{s.chapter.memory ? ` · ${s.chapter.memory.reps} révision${s.chapter.memory.reps > 1 ? "s" : ""}` : ""}
                  </GText>
                </Pressable>
                <Pressable onPress={() => start(s.chapter.id, s.mode)} accessibilityLabel="Réviser" style={[{ width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: g.glassFillStrong }, webOnly({ cursor: "pointer" })]}>
                  <Icon name="Play" size={14} color={g.text} />
                </Pressable>
                <Pressable onPress={() => setEditing(e => (e === s.chapter.id ? null : s.chapter.id))} accessibilityLabel="Options" style={[{ width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" }, webOnly({ cursor: "pointer" })]}>
                  <Icon name="Dots" size={16} color={g.textTertiary} />
                </Pressable>
              </View>
              <MemoryMeter memory={s.chapter.memory} now={now} />
              {editing === s.chapter.id && (
                <View style={{ flexDirection: "row", gap: space.sm, flexWrap: "wrap", marginTop: 4 }}>
                  {(["decouverte", "rappel", "controle"] as SessionMode[]).map(m => (
                    <Chip key={m} label={MODE_LABEL[m]} color={aurora.cyan} onPress={() => start(s.chapter.id, m)} />
                  ))}
                  <Chip label="Supprimer" color={semantic.danger} onPress={() => { store.deleteChapter(s.chapter.id); setEditing(null); }} />
                </View>
              )}
            </View>
          ))
        )}
      </Card>

      {subjectIdeas.length > 0 && (
        <Card>
          <SectionHeader title="Vu récemment en cours" />
          <GText variant="caption" tone="tertiary" style={{ marginBottom: space.sm }}>D'après le cahier de textes PRONOTE. Un toucher pour en faire un chapitre.</GText>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
            {subjectIdeas.slice(0, 12).map(t => (
              <Choice key={t} label={`+ ${t}`} selected={false} onPress={() => add(t)} />
            ))}
            <Chip label="Masquer" color={MUTED} onPress={() => subjectIdeas.forEach(t => store.dismiss(`idea:${id}|${t}`))} />
          </View>
        </Card>
      )}

      <Card>
        <SectionHeader title="La bonne méthode pour cette matière" />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginBottom: space.md }}>
          {(["decouverte", "rappel", "controle", "express"] as SessionMode[]).map(m => (
            <Choice key={m} label={MODE_LABEL[m]} selected={mode === m} onPress={() => setMode(m)} />
          ))}
        </View>
        <GText variant="callout" tone="secondary">{MODE_HINT[mode]}</GText>
        <GText variant="caption" tone="tertiary" style={{ marginTop: 2 }}>{protocol.summary} · {totalMinutes(protocol)} min</GText>
        {protocol.steps.map((st, i) => (
          <Row
            key={st.title}
            first={i === 0}
            leading={<GText variant="title3" tabular color={aurora.violet} style={{ width: 22 }}>{i + 1}</GText>}
            title={`${st.title} · ${st.minutes} min`}
            subtitle={`${st.how}\n→ ${st.why}`}
          />
        ))}
      </Card>
    </PrismScreen>
  );
}
