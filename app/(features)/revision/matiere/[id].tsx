import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { Choice, dayLabel, Field, MemoryMeter, MUTED, nextReviewLabel, PillButton } from "@/components/revision/parts";
import { deckCards, matchChapters, programChapter, programFor } from "@/core/practice/curriculum";
import { MASTERED, predictedMark } from "@/core/practice/mastery";
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
  const [importing, setImporting] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [importDone, setImportDone] = useState<string | null>(null);
  const now = Date.now();

  const own = useMemo(() => ranked.filter(r => r.subject.id === id), [ranked, id]);
  const family = familyOf(subject?.canonical);
  const protocol = protocolFor(family, mode);
  const subjectIdeas = (id ? ideas.get(id) : undefined) ?? [];
  const subjectExams = exams.filter(e => e.subjectId === id && e.date >= now - 12 * 3600 * 1000);
  const cardsCount = Object.values(store.cards).filter(c => store.chapters[c.chapterId]?.subjectId === id).length;
  const program = programFor(subject?.canonical ?? id);
  const followed = useMemo(() => new Map(Object.values(store.chapters).filter(c => c.programId).map(c => [c.programId as string, c])), [store.chapters]);
  const followedSkills = program.filter(p => followed.has(p.id)).flatMap(p => p.skills);
  // Programme chapters the cahier de textes or an announced test mentions, not followed yet.
  const seen = useMemo(() => {
    const texts = [...((id ? ideas.get(id) : undefined) ?? []), ...exams.filter(e => e.subjectId === id).map(e => e.title)];
    return new Set(texts.flatMap(t => matchChapters(subject?.canonical ?? id, t).map(c => c.id)));
  }, [ideas, exams, id, subject?.canonical]);

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

  // Programme chapters with exercises train on real exercises; the others get the guided session.
  const start = (chapterId: string, m: SessionMode) => {
    const practice = programChapter(store.chapters[chapterId]?.programId)?.skills.length;
    if (practice && m !== "decouverte") {
      router.push({ pathname: "/(features)/revision/pratique", params: { chapterId, ...(m === "controle" ? { exam: "1" } : {}) } } as never);
      return;
    }
    router.push({ pathname: "/(features)/revision/session", params: { chapterId, mode: m } } as never);
  };

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

      {program.length > 0 && (
        <Card>
          <SectionHeader title="Programme de Première" />
          <GText variant="caption" tone="tertiary" style={{ marginBottom: space.sm }}>
            Suis les chapitres vus en classe : exercices corrigés générés à l'infini{program.some(p => p.deck) ? " et cartes prêtes" : ""}, niveau ajusté à ta réussite.
          </GText>
          {program.map((p, i) => {
            const chapter = followed.get(p.id);
            const mastery = p.skills.length ? p.skills.reduce((sum, sk) => sum + (store.skills[sk]?.pL ?? 0.15), 0) / p.skills.length : null;
            const mastered = mastery !== null && mastery >= MASTERED;
            return (
              <View key={p.id} style={{ paddingVertical: space.md, borderTopWidth: i ? 1 : 0, borderTopColor: g.separator, gap: 6 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: space.md }}>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <GText variant="callout" numberOfLines={1}>{p.title}</GText>
                    <GText variant="caption" tone="tertiary" numberOfLines={1}>
                      {[p.skills.length ? `${p.skills.length} type${p.skills.length > 1 ? "s" : ""} d'exercice` : null, deckCards(p.deck).length ? `${deckCards(p.deck).length} cartes` : null].filter(Boolean).join(" · ")}
                      {!chapter && seen.has(p.id) ? " · vu en cours" : ""}
                    </GText>
                  </View>
                  {chapter ? (
                    <PillButton
                      label={p.skills.length ? "S'entraîner" : "Réviser"}
                      icon="Play"
                      tone="secondary"
                      onPress={() => router.push({ pathname: "/(features)/revision/pratique", params: { chapterId: chapter.id } } as never)}
                    />
                  ) : (
                    <Chip label={seen.has(p.id) ? "Suivre (vu en cours)" : "Suivre"} color={seen.has(p.id) ? semantic.warning : aurora.violet} onPress={() => store.activateProgram(p.id, id)} />
                  )}
                </View>
                {chapter && mastery !== null && (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm }}>
                    <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: g.separator, overflow: "hidden" }}>
                      <View style={{ width: `${Math.round(mastery * 100)}%`, height: 4, backgroundColor: mastered ? semantic.success : aurora.violet }} />
                    </View>
                    <GText variant="caption" color={mastered ? semantic.success : g.textSecondary} style={{ minWidth: 86, textAlign: "right" }}>
                      {mastered ? "maîtrisé" : `maîtrise ${Math.round(mastery * 100)} %`}
                    </GText>
                  </View>
                )}
                {chapter && mastery === null && <MemoryMeter memory={chapter.memory} now={now} />}
              </View>
            );
          })}
          {followedSkills.length > 0 && (
            <View style={{ marginTop: space.md, padding: space.md, borderRadius: 14, backgroundColor: g.glassFill, gap: space.sm }}>
              <GText variant="callout">
                Note prévue à un contrôle aujourd'hui : <GText variant="callout" color={aurora.cyan}>{String(predictedMark(followedSkills.map(sk => store.skills[sk])) ?? "—").replace(".", ",")}/20</GText>
              </GText>
              <View style={{ flexDirection: "row", gap: space.sm, flexWrap: "wrap" }}>
                <PillButton label="Entraînement mixte" icon="Sparkles" onPress={() => router.push({ pathname: "/(features)/revision/pratique", params: { subjectId: id } } as never)} />
                <PillButton label="Contrôle blanc" icon="Clock" tone="secondary" onPress={() => router.push({ pathname: "/(features)/revision/pratique", params: { subjectId: id, exam: "1" } } as never)} />
              </View>
              <GText variant="caption" tone="tertiary">Mélange des chapitres suivis : c'est ce qui prépare le mieux un contrôle où il faut reconnaître la méthode.</GText>
            </View>
          )}
        </Card>
      )}

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
                  <Chip label="Importer des cartes" color={aurora.violet} onPress={() => { setImporting(s.chapter.id); setImportDone(null); }} />
                  <Chip label="Supprimer" color={semantic.danger} onPress={() => { store.deleteChapter(s.chapter.id); setEditing(null); }} />
                </View>
              )}
              {importing === s.chapter.id && (
                <View style={{ gap: space.sm, marginTop: 4 }}>
                  <GText variant="caption" tone="tertiary">Une carte par ligne : « question ; réponse ». Les exports texte d'Anki et de Quizlet (séparés par des tabulations) marchent aussi.</GText>
                  <Field value={importText} onChangeText={setImportText} placeholder={"Dérivée de ln(x) ; 1/x\nAnnée de la loi de 1905 ; Séparation des Églises et de l'État"} multiline />
                  <View style={{ flexDirection: "row", gap: space.sm, alignItems: "center", flexWrap: "wrap" }}>
                    <PillButton label="Importer" icon="Add" disabled={!importText.trim()} onPress={() => {
                      const n = store.importCards(s.chapter.id, importText);
                      setImportDone(n ? `${n} carte${n > 1 ? "s" : ""} ajoutée${n > 1 ? "s" : ""}` : "Aucune ligne « question ; réponse » reconnue");
                      if (n) { setImportText(""); }
                    }} />
                    <PillButton label="Fermer" tone="secondary" onPress={() => setImporting(null)} />
                    {importDone ? <GText variant="caption" color={aurora.cyan}>{importDone}</GText> : null}
                  </View>
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
