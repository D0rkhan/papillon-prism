import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { prepare } from "@/core/bac/engine";
import type { CanonicalSubject } from "@/core/bac/types";
import { GoalPlan, LeverPlan, Realism } from "@/core/targets/allocate";
import { BAC_GOALS, bacTarget, BacTargetResult } from "@/core/targets/bac";
import { IMPORTANCE_LABEL, Importance, PARCOURSUP_PROFILES, parcoursupTarget, ParcoursupTarget } from "@/core/targets/parcoursup";
import { useBacAnalysis } from "@/hooks/useBacAnalysis";
import { useBacStore } from "@/stores/bac";
import {
  aurora,
  Card,
  Chip,
  EmptyState,
  gradeColor,
  GText,
  Icon,
  Meter,
  PrismScreen,
  probabilityColor,
  radius,
  Row,
  SectionHeader,
  Segmented,
  semantic,
  SkeletonCards,
  space,
  StatusNote,
  useGlass,
  webOnly,
  withAlpha,
} from "@/ui/glass";

/** Inactive chip colour (Chip tints from a hex value). */
const MUTED = "#8E8E9A";
const fmt = (v: number, d = 1) => v.toFixed(d).replace(".", ",");
const pct = (p: number) => (p >= 0.995 ? "> 99 %" : p < 0.01 ? "< 1 %" : `${Math.round(p * 100)} %`);

export const REALISM_COLOR: Record<Realism, string> = {
  acquis: semantic.success,
  réaliste: aurora.cyan,
  ambitieux: semantic.warning,
  "hors de portée": semantic.danger,
};

const REALISM_HINT: Record<Realism, string> = {
  acquis: "ton niveau actuel suffit",
  réaliste: "ce que tu fais déjà dans tes bons jours",
  ambitieux: "demande de la régularité dans tes meilleures notes",
  "hors de portée": "au-delà de ce que tes notes montrent possible",
};

type Mode = "bac" | "parcoursup";

/** Lets the screen paint before a heavy computation. */
const nextFrame = () => new Promise<void>(resolve => setTimeout(resolve, 16));

function Stepper({ value, onChange, min = 8, max = 19.5 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  const g = useGlass();
  const btn = (label: string, delta: number) => (
    <Pressable
      onPress={() => onChange(Math.min(max, Math.max(min, Math.round((value + delta) * 2) / 2)))}
      accessibilityRole="button"
      accessibilityLabel={delta > 0 ? "Augmenter" : "Diminuer"}
      style={[{ width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: g.glassFillStrong }, webOnly({ cursor: "pointer" })]}
    >
      <GText variant="title3">{label}</GText>
    </Pressable>
  );
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: space.md }}>
      {btn("−", -0.5)}
      <GText variant="title1" tabular style={{ minWidth: 76, textAlign: "center" }}>{fmt(value)}</GText>
      {btn("+", 0.5)}
    </View>
  );
}

function LeverRow({ l, first, unit }: { l: LeverPlan; first: boolean; unit: string }) {
  const g = useGlass();
  const color = REALISM_COLOR[l.realism];
  return (
    <Row
      first={first}
      leading={<View style={{ width: 4, alignSelf: "stretch", borderRadius: 2, backgroundColor: color }} />}
      title={<GText variant="title3" numberOfLines={1}>{l.label}</GText>}
      subtitle={
        <View style={{ gap: 6 }}>
          <GText variant="caption" tone="tertiary">
            Niveau actuel {fmt(l.level)} · 1 point ici = +{fmt(l.impact, 2)} {unit}
          </GText>
          <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm }}>
            <View style={{ flex: 1 }}><Meter value={Math.min(1, l.z / 1.5)} color={color} marker={1 / 1.5} height={5} /></View>
            <GText variant="caption" color={color}>{l.realism}</GText>
          </View>
          <GText variant="caption" tone="tertiary">{REALISM_HINT[l.realism]}</GText>
        </View>
      }
      trailing={
        <View style={{ alignItems: "flex-end", minWidth: 74 }}>
          <GText variant="overline" tone="tertiary">Vise</GText>
          <GText variant="title2" tabular color={gradeColor(l.target)}>{fmt(l.target)}</GText>
          <GText variant="caption" tone="tertiary" tabular>+{fmt(l.delta)}</GText>
        </View>
      }
    />
  );
}

function PlanView({ plan, unit, goalLabel, onLowerGoal }: { plan: GoalPlan & { simulatedWithPlan?: number; simulatedNow?: number }; unit: string; goalLabel: string; onLowerGoal?: (goal: number) => void }) {
  const g = useGlass();
  const now = plan.simulatedNow ?? plan.probabilityNow;
  const after = plan.simulatedWithPlan ?? plan.probabilityWithPlan;
  const active = plan.allocation.levers.filter(l => l.delta >= 0.05);
  const hold = plan.allocation.levers.filter(l => l.delta < 0.05);
  const feasible = plan.allocation.feasible;
  const already = plan.allocation.required <= 0;
  const reachable = Math.floor(plan.bestRealistic * 2) / 2;

  return (
    <>
      <Card tint={feasible ? undefined : semantic.warning}>
        <View style={{ flexDirection: "row", gap: space.xl, flexWrap: "wrap" }}>
          <View style={{ flex: 1, minWidth: 140 }}>
            <GText variant="overline" tone="tertiary">Aujourd'hui</GText>
            <GText variant="title1" tabular color={probabilityColor(now)}>{pct(now)}</GText>
            <GText variant="caption" tone="tertiary">de chances d'atteindre {goalLabel}</GText>
          </View>
          <View style={{ flex: 1, minWidth: 140 }}>
            <GText variant="overline" tone="tertiary">{already ? "Marge" : feasible ? "Avec le plan" : "Au mieux, réaliste"}</GText>
            <GText variant="title1" tabular color={probabilityColor(after)}>{pct(after)}</GText>
            <GText variant="caption" tone="tertiary">{plan.simulatedWithPlan !== undefined ? "mesuré sur 6 000 simulations" : "en tenant les cibles ci-dessous"}</GText>
          </View>
        </View>
        <View style={{ marginTop: space.lg }}>
          {already ? (
            <StatusNote text="Objectif déjà sécurisé à 70 % : il suffit de garder ton rythme. Monte l'objectif pour voir la suite." />
          ) : feasible ? (
            <StatusNote text={`Plan prévu pour réussir 7 fois sur 10 : la chance du jour J est déjà comptée. Effort réparti là où un point coûte le moins.`} />
          ) : (
            <View style={{ gap: space.sm }}>
              <StatusNote tone="warning" text={`Cet objectif demande plus que ce que tes notes montrent possible. Au mieux, de façon réaliste : ${fmt(plan.bestRealistic, 2)}.`} />
              {onLowerGoal && reachable >= 8 ? (
                <Chip label={`Viser ${fmt(reachable)} à la place`} color={aurora.cyan} onPress={() => onLowerGoal(reachable)} />
              ) : null}
            </View>
          )}
        </View>
      </Card>

      {active.length > 0 && (
        <Card>
          <SectionHeader title={feasible ? "Moyennes à viser sur tes prochains devoirs" : "Le maximum réaliste, matière par matière"} />
          {active.map((l, i) => <LeverRow key={l.key} l={l} first={i === 0} unit={unit} />)}
          {!feasible && (
            <GText variant="caption" tone="tertiary" style={{ marginTop: space.md }}>
              Sans limite de réalisme il faudrait par exemple {plan.unconstrained.levers.slice(0, 2).map(l => `${fmt(Math.min(20, l.target))} en ${l.label.toLowerCase()}`).join(" et ")}.
            </GText>
          )}
        </Card>
      )}

      {hold.length > 0 && (
        <Card>
          <SectionHeader title="À maintenir" />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
            {hold.map(l => <Chip key={l.key} label={`${l.label} · ${fmt(l.level)}`} color={MUTED} />)}
          </View>
          <GText variant="caption" tone="tertiary" style={{ marginTop: space.sm }}>
            Garde ton niveau ici : chaque point y rapporte moins qu'ailleurs.
          </GText>
        </Card>
      )}
    </>
  );
}

function SubjectFilter({ options, value, onChange }: { options: { key: string; label: string }[]; value: string[]; onChange: (v: string[]) => void }) {
  const g = useGlass();
  const all = value.length === 0;
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
      <Chip label="Toutes les matières" color={all ? aurora.cyan : MUTED} onPress={() => onChange([])} />
      {options.map(o => {
        const on = value.includes(o.key);
        return (
          <Chip
            key={o.key}
            label={o.label}
            color={on ? aurora.violet : MUTED}
            onPress={() => onChange(on ? value.filter(k => k !== o.key) : [...value, o.key])}
          />
        );
      })}
    </View>
  );
}

export function TargetsView({ demo = false }: { demo?: boolean }) {
  const g = useGlass();
  const params = useLocalSearchParams<{ mode?: string }>();
  const { input, analysis, loading, error, refresh } = useBacAnalysis({ demo, lite: true });
  const prefs = useBacStore(s => s.targetPrefs);
  const setPrefs = useBacStore(s => s.setTargetPrefs);
  const [mode, setMode] = useState<Mode>(params.mode === "parcoursup" ? "parcoursup" : "bac");
  const [bac, setBac] = useState<BacTargetResult | null>(null);
  const [psup, setPsup] = useState<ParcoursupTarget | null>(null);
  const [busy, setBusy] = useState(false);

  const prepared = useMemo(() => (input ? prepare({ ...input, settings: { simulations: 6000 } }) : null), [input]);
  const profile = PARCOURSUP_PROFILES.find(p => p.key === prefs.psupProfile) ?? PARCOURSUP_PROFILES[0];
  const subjects = prefs.subjects as CanonicalSubject[];

  useEffect(() => {
    if (!prepared) { return; }
    let cancelled = false;
    (async () => {
      setBusy(true);
      await nextFrame();
      try {
        if (mode === "bac") {
          const r = bacTarget(prepared, prefs.bacGoal, { subjects });
          if (!cancelled) { setBac(r); }
        } else {
          const r = parcoursupTarget(prepared, profile, prefs.psupGoal, { subjects });
          if (!cancelled) { setPsup(r); }
        }
      } finally {
        if (!cancelled) { setBusy(false); }
      }
    })();
    return () => { cancelled = true; };
  }, [prepared, mode, prefs.bacGoal, prefs.psupGoal, profile, subjects]);

  const graded = useMemo(
    () => (analysis?.result.subjects ?? []).filter(s => s.grades > 0).map(s => s.subject),
    [analysis]
  );
  const filterOptions = useMemo(() => {
    const plan = mode === "bac" ? bac : psup;
    return (plan?.allocation.levers ?? [])
      .concat(plan?.unconstrained.levers ?? [])
      .filter((l, i, a) => a.findIndex(x => x.key === l.key) === i && graded.includes(l.key as CanonicalSubject))
      .map(l => ({ key: l.key, label: l.label }));
  }, [mode, bac, psup, graded]);

  const bacGoalLabel = BAC_GOALS.find(x => x.value === prefs.bacGoal)?.label ?? fmt(prefs.bacGoal);

  return (
    <PrismScreen
      title="Notes à viser"
      overline={demo ? "Démo" : "Objectifs"}
      subtitle="Ce qu'il faut réellement viser, matière par matière, d'après tes propres notes."
      back
      onRefresh={refresh}
      refreshing={loading}
    >
      <Segmented
        options={[{ value: "bac", label: "Bac" }, { value: "parcoursup", label: "Parcoursup" }]}
        value={mode}
        onChange={v => setMode(v as Mode)}
      />

      {!prepared ? (
        error ? (
          <EmptyState icon="Grades" title="Notes indisponibles" message={`Impossible de charger tes notes : ${error.message}`} action="Réessayer" onAction={refresh} />
        ) : (
          <SkeletonCards count={3} lines={2} />
        )
      ) : mode === "bac" ? (
        <>
          <Card>
            <SectionHeader title="Objectif au bac" />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
              {BAC_GOALS.map(goal => (
                <Pressable
                  key={goal.value}
                  onPress={() => setPrefs({ bacGoal: goal.value })}
                  accessibilityRole="button"
                  accessibilityState={{ selected: prefs.bacGoal === goal.value }}
                  style={[{
                    paddingHorizontal: space.md,
                    paddingVertical: space.sm,
                    borderRadius: radius.md,
                    backgroundColor: prefs.bacGoal === goal.value ? g.inverse : g.glassFillStrong,
                  }, webOnly({ cursor: "pointer" })]}
                >
                  <GText variant="caption" color={prefs.bacGoal === goal.value ? g.onInverse : g.textSecondary}>{goal.label}</GText>
                  <GText variant="title3" tabular color={prefs.bacGoal === goal.value ? g.onInverse : g.text}>{goal.value}</GText>
                </Pressable>
              ))}
            </View>
          </Card>
          {filterOptions.length > 0 && (
            <Card>
              <SectionHeader title="Matières sur lesquelles jouer" />
              <SubjectFilter options={filterOptions} value={prefs.subjects} onChange={v => setPrefs({ subjects: v })} />
            </Card>
          )}
          {bac && !busy ? (
            <PlanView plan={bac} unit="au bac" goalLabel={`${bacGoalLabel} (${prefs.bacGoal})`} onLowerGoal={goal => setPrefs({ bacGoal: goal })} />
          ) : (
            <SkeletonCards count={2} lines={3} />
          )}
          <Method kind="bac" />
        </>
      ) : (
        <>
          <Card>
            <SectionHeader title="Type de formation" />
            <View style={{ gap: space.sm }}>
              {PARCOURSUP_PROFILES.map(p => {
                const on = p.key === profile.key;
                return (
                  <Pressable
                    key={p.key}
                    onPress={() => setPrefs({ psupProfile: p.key, psupGoal: p.suggestedGoal })}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                    style={[{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: space.md,
                      padding: space.md,
                      borderRadius: radius.md,
                      borderWidth: 1,
                      borderColor: on ? withAlpha(aurora.violet, 0.6) : g.separator,
                      backgroundColor: on ? withAlpha(aurora.violet, 0.12) : "transparent",
                    }, webOnly({ cursor: "pointer" })]}
                  >
                    <View style={{ flex: 1 }}>
                      <GText variant="callout">{p.label}</GText>
                      <GText variant="caption" tone="tertiary">{p.description}</GText>
                    </View>
                    {on ? <Icon name="Check" size={16} color={aurora.violet} /> : null}
                  </Pressable>
                );
              })}
            </View>
          </Card>

          <Card>
            <SectionHeader title="Moyenne de dossier visée" />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: space.md }}>
              <Stepper value={prefs.psupGoal} onChange={v => setPrefs({ psupGoal: v })} />
              {psup ? (
                <View style={{ alignItems: "flex-end" }}>
                  <GText variant="overline" tone="tertiary">Dossier projeté</GText>
                  <GText variant="title2" tabular color={gradeColor(psup.projection.expected)}>{fmt(psup.projection.expected, 2)}</GText>
                </View>
              ) : null}
            </View>
            <GText variant="caption" tone="tertiary" style={{ marginTop: space.md }}>
              Repère : {profile.suggestedGoal} pour ce type de formation, à ajuster avec la fiche Parcoursup de chaque formation (taux d'accès, profil des admis).
            </GText>
          </Card>

          {filterOptions.length > 0 && (
            <Card>
              <SectionHeader title="Matières sur lesquelles jouer" />
              <SubjectFilter options={filterOptions} value={prefs.subjects} onChange={v => setPrefs({ subjects: v })} />
            </Card>
          )}

          {psup && !busy ? (
            <>
              <PlanView plan={psup} unit="au dossier" goalLabel={`${fmt(prefs.psupGoal)} de moyenne`} onLowerGoal={goal => setPrefs({ psupGoal: goal })} />
              <Card>
                <SectionHeader title="Ce que la formation regarde" />
                {psup.projection.subjects.map((s, i) => (
                  <Row
                    key={s.subject}
                    first={i === 0}
                    title={s.label}
                    subtitle={`${IMPORTANCE_LABEL[s.weight as Importance] ?? `Poids ${s.weight}`} · ${Math.round(s.open * 100)} % encore à écrire`}
                    trailing={<GText variant="title3" tabular color={gradeColor(s.projected)}>{fmt(s.projected)}</GText>}
                  />
                ))}
                {psup.projection.openPeriods.length > 0 && (
                  <GText variant="caption" tone="tertiary" style={{ marginTop: space.md }}>
                    Bulletins qui comptent encore : {psup.projection.openPeriods.map(p => `${p.name} (${p.year === "premiere" ? "1re" : "Tle"})`).join(", ")}. Après mars de Terminale, le dossier est figé.
                  </GText>
                )}
              </Card>
            </>
          ) : (
            <SkeletonCards count={2} lines={3} />
          )}
          <Method kind="parcoursup" />
        </>
      )}
    </PrismScreen>
  );
}

function Method({ kind }: { kind: Mode }) {
  return (
    <Card>
      <SectionHeader title="Comment c'est calculé" />
      <View style={{ gap: space.sm }}>
        <GText variant="caption" tone="secondary">
          1. Ton niveau dans chaque matière est estimé à partir de toutes tes notes (difficulté du devoir, tendance, coefficients).
        </GText>
        <GText variant="caption" tone="secondary">
          {kind === "bac"
            ? "2. Chaque matière pèse ce qui reste ouvert : contrôle continu à venir, épreuve finale, moitié du grand oral pour une spécialité."
            : "2. Chaque matière pèse son degré d'importance (Essentiel 3, Très important 2, Important 1, Complémentaire 0,5) × la part de ses bulletins pas encore écrite."}
        </GText>
        <GText variant="caption" tone="secondary">
          3. L'effort est réparti au moindre coût : un point est « réaliste » s'il reste dans l'écart habituel de tes notes, jamais au-delà d'un écart complet.
        </GText>
        <GText variant="caption" tone="secondary">
          4. La marge couvre la chance du jour : le plan vise 7 réussites sur 10{kind === "bac" ? ", vérifié par simulation complète du bac" : ""}.
        </GText>
      </View>
    </Card>
  );
}

export default function CiblesScreen() {
  return <TargetsView />;
}
