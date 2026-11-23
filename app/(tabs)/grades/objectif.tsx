import React, { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { ComponentResult } from "@/core/bac/engine";
import type { NextGradeTarget, Realism } from "@/core/bac/optimizer";
import { SUBJECT_LABELS } from "@/core/bac/subjects";
import type { CanonicalSubject } from "@/core/bac/types";
import { useBacAnalysis } from "@/hooks/useBacAnalysis";
import { useBacStore } from "@/stores/bac";
import {
  aurora,
  Aurora,
  Chip,
  DistributionChart,
  GlassSurface,
  gradeColor,
  GText,
  Meter,
  probabilityColor,
  ProbabilityRing,
  semantic,
  space,
  useGlass,
} from "@/ui/glass";

const pct = (p: number) => (p >= 0.995 ? "> 99 %" : p < 0.005 ? "< 1 %" : `${Math.round(p * 100)} %`);
const fmt = (v: number, d = 1) => v.toFixed(d).replace(".", ",");
const signedPts = (p: number) => `${p >= 0 ? "+" : "−"}${Math.abs(Math.round(p * 1000) / 10).toString().replace(".", ",")} pt`;

const REALISM_COLOR: Record<Realism, string> = {
  acquis: semantic.success,
  réaliste: aurora.cyan,
  ambitieux: semantic.warning,
  "hors de portée": semantic.danger,
};

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <GlassSurface padding={space.xl} style={{ marginBottom: space.lg }}>
      <GText variant="overline" tone="secondary">{title}</GText>
      {subtitle ? <GText variant="callout" tone="tertiary" style={{ marginTop: 2 }}>{subtitle}</GText> : null}
      <View style={{ marginTop: space.lg }}>{children}</View>
    </GlassSurface>
  );
}

function ComponentRow({ c }: { c: ComponentResult }) {
  const g = useGlass();
  return (
    <View style={[styles.row, { borderBottomColor: g.separator }]}>
      <View style={{ flex: 1, paddingRight: space.md }}>
        <GText variant="callout">{c.label}</GText>
        <GText variant="caption" tone="tertiary">
          coef {c.coefficient} · {c.finalized ? "définitif" : `80 % entre ${fmt(c.q10)} et ${fmt(c.q90)}`}
        </GText>
      </View>
      <GText variant="title3" color={gradeColor(c.q50)} tabular>{fmt(c.q50)}</GText>
    </View>
  );
}

function TargetRow({ subject, target, onCompute }: { subject: CanonicalSubject; target: NextGradeTarget | "computing" | undefined; onCompute: () => void }) {
  const g = useGlass();
  return (
    <Pressable onPress={target ? undefined : onCompute} style={[styles.row, { borderBottomColor: g.separator }]}>
      <View style={{ flex: 1 }}>
        <GText variant="callout">{SUBJECT_LABELS[subject]}</GText>
        {target && target !== "computing" ? (
          <GText variant="caption" tone="tertiary">
            Prévu : {fmt(target.predicted.mean)} ± {fmt(target.predicted.sd)}
          </GText>
        ) : (
          <GText variant="caption" tone="tertiary">{target === "computing" ? "Calcul en cours…" : "Toucher pour calculer"}</GText>
        )}
      </View>
      {target === "computing" ? (
        <ActivityIndicator color={aurora.cyan} />
      ) : target ? (
        <View style={{ alignItems: "flex-end", gap: 4 }}>
          <GText variant="title3" tabular color={REALISM_COLOR[target.realism]}>
            {target.required === null ? "> 20" : `${fmt(target.required, 2)}/20`}
          </GText>
          <Chip label={target.realism} color={REALISM_COLOR[target.realism]} />
        </View>
      ) : null}
    </Pressable>
  );
}

export function ObjectifView({ demo = false }: { demo?: boolean }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const g = useGlass();
  const { analysis, loading, computing, error, refresh, targets, computeTarget } = useBacAnalysis({ demo });
  const profile = useBacStore(s => s.profile);
  const targetDelta = useBacStore(s => s.targetDelta);
  const setTargetDelta = useBacStore(s => s.setTargetDelta);
  const [showAll, setShowAll] = useState(false);

  const contentWidth = Math.min(width, 760) - space.lg * 2;
  const chartWidth = contentWidth - space.xl * 2;

  const groups = useMemo(() => {
    const comps = analysis?.result.components ?? [];
    return [
      { title: "Contrôle continu · Première", items: comps.filter(c => c.block === "cc" && c.year === "premiere") },
      { title: "Contrôle continu · Terminale", items: comps.filter(c => c.block === "cc" && c.year === "terminale") },
      { title: "Épreuves", items: comps.filter(c => c.block === "exam") },
    ];
  }, [analysis]);

  const targetSubjects: CanonicalSubject[] = useMemo(() => {
    // Only subjects he is actually graded in (no philosophy in Première, for instance).
    const graded = new Set((analysis?.result.subjects ?? []).filter(x => x.grades > 0).map(x => x.subject));
    const top = (analysis?.leverage ?? []).map(l => l.subject).filter(x => graded.has(x));
    return Array.from(new Set<CanonicalSubject>(["maths", "physique_chimie", ...top])).slice(0, 5);
  }, [analysis]);

  const r = analysis?.result;
  const p = r?.probabilities;

  return (
    <View style={{ flex: 1, backgroundColor: g.background }}>
      <Aurora />
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + space.xxl, paddingBottom: insets.bottom + 120, paddingHorizontal: space.lg, alignSelf: "center", width: Math.min(width, 760) }}
        refreshControl={<RefreshControl refreshing={loading && !!analysis} onRefresh={refresh} tintColor={aurora.cyan} />}
      >
        <GText variant="overline" tone="secondary">Bac {profile.session} · Objectif{demo ? " · démo" : ""}</GText>
        <GText variant="title1" style={{ marginBottom: space.xl }}>EPFL Lausanne</GText>

        {!analysis && (
          <GlassSurface padding={space.xxl} style={{ alignItems: "center" }}>
            {error ? (
              <GText tone="secondary" align="center">Impossible de charger les notes : {error.message}</GText>
            ) : (
              <>
                <ActivityIndicator color={aurora.cyan} size="large" />
                <GText tone="secondary" style={{ marginTop: space.md }} align="center">
                  {loading ? "Récupération de toutes les notes…" : "20 000 simulations du bac en cours…"}
                </GText>
              </>
            )}
          </GlassSurface>
        )}

        {analysis && r && p && (
          <>
            {!analysis.eligibleProfile && (
              <GlassSurface padding={space.lg} tint={semantic.danger} style={{ marginBottom: space.lg }}>
                <GText variant="callout">L'EPFL exige les spécialités Maths et Physique-chimie en Première et en Terminale.</GText>
              </GlassSurface>
            )}

            {/* Hero */}
            <GlassSurface padding={space.xl} style={{ marginBottom: space.lg }} tint={probabilityColor(p.competitive)}>
              <View style={{ flexDirection: width > 520 ? "row" : "column", alignItems: "center", gap: space.xl }}>
                <ProbabilityRing value={p.admissible} secondary={p.competitive} color={probabilityColor(p.admissible)} size={196}>
                  <GText variant="display" tabular>{Math.round(p.admissible * 100)}</GText>
                  <GText variant="caption" tone="secondary">% admissible</GText>
                </ProbabilityRing>
                <View style={{ flex: 1, alignSelf: "stretch", gap: space.md }}>
                  <View>
                    <GText variant="overline" tone="secondary">Note de bac projetée</GText>
                    <GText variant="title1" tabular color={gradeColor(r.overall.q50)}>{fmt(r.overall.q50, 2)}/20</GText>
                    <GText variant="callout" tone="tertiary">
                      80 % de chances entre {fmt(r.overall.q10)} et {fmt(r.overall.q90)}
                    </GText>
                  </View>
                  <View style={{ flexDirection: "row", gap: space.sm, flexWrap: "wrap" }}>
                    <Chip label={`Sélection EPFL ${pct(p.competitive)}`} color={aurora.pink} />
                    <Chip label={`Mention TB ${pct(p.mentions.tresBien)}`} color={aurora.violet} />
                  </View>
                  {computing ? <GText variant="caption" tone="tertiary">Mise à jour…</GText> : null}
                </View>
              </View>
            </GlassSurface>

            <Section title="Conditions d'admission" subtitle="Les trois doivent être remplies (anneau extérieur). L'anneau rose ajoute le seuil sélectif estimé.">
              {[
                { label: "Moyenne générale de 16 ou plus", p: p.overallAtLeastMin },
                ...p.subjectMinimums.map(sm => ({ label: `${sm.label} : ${sm.min} ou plus`, p: sm.probability })),
              ].map(item => (
                <View key={item.label} style={{ marginBottom: space.md }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                    <GText variant="callout">{item.label}</GText>
                    <GText variant="callout" tabular color={probabilityColor(item.p)}>{pct(item.p)}</GText>
                  </View>
                  <Meter value={item.p} color={probabilityColor(item.p)} />
                </View>
              ))}
            </Section>

            <Section title="Distribution de la note finale" subtitle={`${r.meta.simulations.toLocaleString("fr-FR")} scénarios simulés`}>
              <DistributionChart
                values={analysis.draws}
                width={chartWidth}
                thresholds={[{ value: 16, label: "16", color: semantic.success }]}
              />
            </Section>

            {analysis.leverage.length > 0 && (
              <Section title="Où agir en priorité" subtitle="Gain si le niveau monte d'1 point à partir d'aujourd'hui">
                {analysis.leverage.slice(0, 6).map(l => (
                  <View key={l.subject} style={[styles.row, { borderBottomColor: g.separator }]}>
                    <GText variant="callout" style={{ flex: 1 }}>{SUBJECT_LABELS[l.subject]}</GText>
                    <View style={{ alignItems: "flex-end" }}>
                      <GText variant="callout" tabular color={aurora.pink}>{signedPts(l.competitiveGain)} sélection</GText>
                      <GText variant="caption" tone="tertiary" tabular>+{fmt(l.overallGain, 2)} sur la note de bac</GText>
                    </View>
                  </View>
                ))}
              </Section>
            )}

            {analysis.scenarios.length > 0 && (
              <Section title="Trois futurs réalistes" subtitle="Le même niveau relatif tenu dans toutes les matières">
                <View style={{ flexDirection: "row", gap: space.sm }}>
                  {analysis.scenarios.map(s => (
                    <GlassSurface key={s.key} intensity="strong" radius={18} padding={space.md} style={{ flex: 1 }}>
                      <GText variant="caption" tone="secondary">{s.label}</GText>
                      <GText variant="title2" tabular color={gradeColor(s.overallMedian)}>{fmt(s.overallMedian)}</GText>
                      <GText variant="caption" tone="tertiary">Admissible {pct(s.admissible)}</GText>
                      <GText variant="caption" tone="tertiary">Sélection {pct(s.competitive)}</GText>
                    </GlassSurface>
                  ))}
                </View>
              </Section>
            )}

            <Section
              title="Note à viser au prochain devoir"
              subtitle={targetDelta === 0
                ? `Minimum pour ne pas faire baisser ses chances d'admissibilité (${pct(p.admissible)})`
                : `Minimum pour faire monter ses chances d'admissibilité de ${Math.round(targetDelta * 100)} points`}
            >
              <View style={{ flexDirection: "row", gap: space.sm, marginBottom: space.md }}>
                {[[0, "Maintenir"], [0.02, "+2 pts"], [0.05, "+5 pts"]].map(([v, label]) => (
                  <Chip key={String(v)} label={String(label)} color={v === targetDelta ? aurora.cyan : g.textTertiary} onPress={() => setTargetDelta(Number(v))} />
                ))}
              </View>
              {targetSubjects.map(s => (
                <TargetRow key={`${s}-${targetDelta}-${p.admissible}`} subject={s} target={targets[s]} onCompute={() => computeTarget(s)} />
              ))}
            </Section>

            <Section title="Détail des 100 coefficients">
              {groups.map(group => (
                <View key={group.title} style={{ marginBottom: space.lg }}>
                  <GText variant="caption" tone="secondary" style={{ marginBottom: space.xs }}>{group.title}</GText>
                  {(showAll ? group.items : group.items.slice(0, 4)).map(c => <ComponentRow key={c.id} c={c} />)}
                </View>
              ))}
              <Chip label={showAll ? "Réduire" : "Tout afficher"} color={aurora.cyan} onPress={() => setShowAll(v => !v)} />
            </Section>

            <Section title="Fiabilité du modèle" subtitle="Testé sur ses propres notes : chaque note prédite sans la connaître">
              {analysis.calibration.predictions > 0 ? (
                <>
                  <GText variant="callout">
                    Erreur moyenne : {fmt(analysis.calibration.mae ?? 0, 2)} pt (moyenne simple : {fmt(analysis.calibration.baselineMae ?? 0, 2)} pt)
                  </GText>
                  <GText variant="callout" tone="secondary">
                    Intervalle à 80 % respecté dans {pct(analysis.calibration.coverage80 ?? 0)} des cas · {analysis.calibration.predictions} prédictions
                  </GText>
                </>
              ) : (
                <GText variant="callout" tone="secondary">Pas encore assez de notes pour évaluer le modèle.</GText>
              )}
              <GText variant="caption" tone="tertiary" style={{ marginTop: space.md }}>
                {analysis.gradesCount} notes · règles {r.meta.rulesVersion} · le seuil sélectif EPFL est une hypothèse (aucun chiffre public).
              </GText>
            </Section>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default function ObjectifScreen() {
  return <ObjectifView />;
}
