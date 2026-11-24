import React, { useMemo, useState } from "react";
import { View } from "react-native";

import { useDisplayPeriod } from "@/app/(tabs)/grades/hooks/useDisplayPeriod";
import type { Subject } from "@/services/shared/grade";
import { Card, Chip, EmptyState, gradeColor, GText, PrismScreen, Row, Segmented, SkeletonCards, space, Stat, useGlass } from "@/ui/glass";
import { gradeOn20, isUsableScore, periodOverallAverage, subjectAverageInfo } from "@/utils/grades/average";
import { getSubjectColor } from "@/utils/subjects/colors";
import { getSubjectName } from "@/utils/subjects/name";

const fmt = (v: number | null | undefined, d = 2) => (v === null || v === undefined || !Number.isFinite(v) ? "—" : v.toFixed(d).replace(".", ","));

const RULES: { title: string; text: string }[] = [
  { title: "Note ramenée sur 20", text: "Par défaut, chaque note est ramenée sur 20 avant d'être pondérée par son coefficient : 8/10 compte comme 16/20." },
  { title: "Note non ramenée sur 20", text: "Si le professeur a décoché « Ramener sur 20 », la note pèse selon son barème : Σ(coef × note) ÷ Σ(coef × barème) × 20." },
  { title: "Note facultative", text: "Elle ne compte que si elle fait monter la moyenne. Prism retient la meilleure combinaison, comme PRONOTE." },
  { title: "Note bonus", text: "Seuls les points au-dessus de 10/20 s'ajoutent, sans augmenter le total des coefficients." },
  { title: "Abs., Disp., N.Not., N.Rdu", text: "Non comptées. « Abs. 0 » et « N.Rdu 0 » comptent zéro." },
  { title: "Moyenne de matière", text: "Celle publiée par PRONOTE quand l'établissement l'affiche (elle intègre les sous-matières et réglages du professeur), sinon recalculée." },
  { title: "Moyenne générale", text: "Celle de PRONOTE si elle est affichée, sinon la moyenne des moyennes de matières (coefficient 1 par matière, réglage par défaut de PRONOTE)." },
  { title: "Bac (contrôle continu)", text: "Moyenne annuelle = moyenne des moyennes de trimestres du livret scolaire, en Première et en Terminale (40 % du bac)." },
];

function SubjectDetail({ subject }: { subject: Subject }) {
  const g = useGlass();
  const info = subjectAverageInfo(subject);
  const differs = info.source === "pronote" && info.computed !== null && info.value !== null && Math.abs(info.computed - info.value) >= 0.05;
  const grades = [...(subject.grades ?? [])].sort((a, b) => (a.givenAt ? new Date(a.givenAt).getTime() : 0) - (b.givenAt ? new Date(b.givenAt).getTime() : 0));
  return (
    <Card padding={space.lg}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: space.md }}>
        <View style={{ width: 3, alignSelf: "stretch", borderRadius: 2, backgroundColor: getSubjectColor(subject.name) }} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <GText variant="title3" numberOfLines={1}>{getSubjectName(subject.name)}</GText>
          <GText variant="caption" tone="tertiary">
            {info.source === "pronote" ? "Moyenne PRONOTE" : info.source === "computed" ? "Moyenne recalculée (masquée par l'établissement)" : "Pas encore de moyenne"}
            {info.source === "pronote" && info.computed !== null ? ` · recalcul ${fmt(info.computed)}` : ""}
          </GText>
        </View>
        <GText variant="title2" tabular color={info.value !== null ? gradeColor(info.value) : g.textTertiary}>{fmt(info.value)}</GText>
      </View>
      {differs && (
        <GText variant="caption" tone="tertiary" style={{ marginTop: space.sm }}>
          Écart avec le recalcul : réglage propre au professeur (sous-matières, notes hors période…). La valeur PRONOTE fait foi.
        </GText>
      )}
      <View style={{ marginTop: space.sm }}>
        {grades.map((gr, i) => {
          const on20 = gradeOn20(gr.studentScore, gr.outOf);
          const usable = isUsableScore(gr.studentScore);
          const tags = [
            gr.optional ? "facultative" : null,
            gr.bonus ? "bonus" : null,
            gr.outOf20 === false ? "non ramenée /20" : null,
          ].filter(Boolean) as string[];
          return (
            <Row
              key={gr.id}
              first={i === 0}
              title={gr.description || "Évaluation"}
              subtitle={`${gr.givenAt ? new Date(gr.givenAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) : ""} · coef ${String(gr.coefficient ?? 1).replace(".", ",")}${usable && (gr.outOf?.value ?? 20) !== 20 ? ` · ${fmt(on20)}/20` : ""}`}
              trailing={
                <View style={{ alignItems: "flex-end", gap: 4 }}>
                  <GText variant="callout" tabular color={usable ? gradeColor(on20) : g.textTertiary}>
                    {usable ? `${fmt(gr.studentScore!.value, gr.studentScore!.value % 1 ? 2 : 0)}/${gr.outOf?.value ?? 20}` : gr.studentScore?.status ?? "—"}
                  </GText>
                  {tags.length > 0 && <View style={{ flexDirection: "row", gap: 4 }}>{tags.map(t => <Chip key={t} label={t} color={g.textSecondary} />)}</View>}
                </View>
              }
            />
          );
        })}
      </View>
      {(info.keptOptional > 0 || info.bonusPoints > 0) && (
        <GText variant="caption" tone="tertiary" style={{ marginTop: space.sm }}>
          {info.keptOptional > 0 ? `${info.keptOptional} note${info.keptOptional > 1 ? "s" : ""} facultative${info.keptOptional > 1 ? "s" : ""} retenue${info.keptOptional > 1 ? "s" : ""}. ` : ""}
          {info.bonusPoints > 0 ? `Bonus : +${fmt(info.bonusPoints)} point${info.bonusPoints >= 2 ? "s" : ""}.` : ""}
        </GText>
      )}
    </Card>
  );
}

export default function CalculsScreen() {
  const { periods, currentPeriod, setCurrentPeriod, grades, refresh } = useDisplayPeriod();
  const { subjects, averages, loading, refreshing } = grades;
  const [showRules, setShowRules] = useState(true);
  const overall = useMemo(() => periodOverallAverage(subjects, averages.student), [subjects, averages.student]);
  const recomputed = useMemo(() => periodOverallAverage(subjects, null), [subjects]);

  return (
    <PrismScreen back title="Moyennes détaillées" overline="Transparence des calculs" onRefresh={() => { refresh(); grades.refresh(); }} refreshing={refreshing}>
      {periods.length > 0 && (
        <Segmented scroll options={periods.map(p => ({ value: p.name, label: p.name }))} value={currentPeriod?.name} onChange={name => { const p = periods.find(x => x.name === name); if (p) { setCurrentPeriod(p); } }} />
      )}

      <Card>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.xxl }}>
          <Stat label="Moyenne générale" value={fmt(overall.value)} unit="/20" footnote={overall.source === "pronote" ? "Publiée par PRONOTE" : overall.source === "computed" ? "Calculée par Prism" : undefined} />
          {overall.source === "pronote" && <Stat label="Recalcul Prism" value={fmt(recomputed.value)} unit="/20" footnote="Moyenne des moyennes de matières" />}
          {averages.class && <Stat label="Classe" value={fmt(averages.class.value)} unit="/20" />}
        </View>
      </Card>

      <Card onPress={() => setShowRules(v => !v)}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <GText variant="overline" tone="secondary">Règles appliquées (identiques à PRONOTE)</GText>
          <GText variant="caption" tone="tertiary">{showRules ? "Masquer" : "Afficher"}</GText>
        </View>
        {showRules && RULES.map((r, i) => <Row key={r.title} first={i === 0} title={r.title} subtitle={r.text} />)}
      </Card>

      {loading && subjects.length === 0 ? <SkeletonCards count={3} /> : subjects.length === 0 ? (
        <EmptyState icon="Pie" title="Aucune note" message="Rien sur cette période pour l'instant." />
      ) : (
        <View style={{ gap: space.md }}>{subjects.map(s => <SubjectDetail key={s.id} subject={s} />)}</View>
      )}
    </PrismScreen>
  );
}
