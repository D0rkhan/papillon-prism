import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import Reanimated from "react-native-reanimated";

import { usePronoteExtra } from "@/hooks/usePronoteExtra";
import { getSkills, skillPeriods, type SkillEvaluation, type SkillItem } from "@/services/pronote/extras";
import {
  aurora,
  Card,
  EmptyState,
  enter,
  GText,
  PrismScreen,
  Segmented,
  semantic,
  SkeletonCards,
  space,
  StatusNote,
  useGlass,
  withAlpha,
} from "@/ui/glass";
import { getSubjectColor } from "@/utils/subjects/colors";
import { getSubjectName } from "@/utils/subjects/name";

type Level = "tb" | "s" | "f" | "i" | "other";

/** PRONOTE's four mastery levels, whatever the school's abbreviations. */
function levelOf(skill: Pick<SkillItem, "level" | "abbreviation">): Level {
  const l = skill.level.toLowerCase();
  if (l.includes("très bonne") || l.includes("tres bonne") || l.includes("dépass")) { return "tb"; }
  if (l.includes("satisfaisant")) { return "s"; }
  if (l.includes("fragile")) { return "f"; }
  if (l.includes("insuffisant")) { return "i"; }
  return "other";
}

const LEVELS: Record<Level, { label: string; color: string }> = {
  tb: { label: "Très bonne maîtrise", color: semantic.success },
  s: { label: "Maîtrise satisfaisante", color: aurora.cyan },
  f: { label: "Maîtrise fragile", color: semantic.warning },
  i: { label: "Maîtrise insuffisante", color: semantic.danger },
  other: { label: "Autre (absent, dispensé…)", color: "#8A8A99" },
};

function SkillPill({ skill }: { skill: SkillItem }) {
  const meta = LEVELS[levelOf(skill)];
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: space.sm, paddingVertical: 6 }}>
      <View style={{ minWidth: 30, paddingHorizontal: 6, height: 22, borderRadius: 6, alignItems: "center", justifyContent: "center", backgroundColor: withAlpha(meta.color, 0.18), borderWidth: 1, borderColor: withAlpha(meta.color, 0.45) }}>
        <GText variant="caption" color={meta.color}>{skill.abbreviation || "•"}</GText>
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <GText variant="callout">{skill.item || skill.domain}</GText>
        <GText variant="caption" tone="tertiary">{[skill.item ? skill.domain : null, skill.level].filter(Boolean).join(" · ")}</GText>
      </View>
    </View>
  );
}

function EvaluationCard({ evaluation }: { evaluation: SkillEvaluation }) {
  return (
    <Card padding={space.lg}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm }}>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: getSubjectColor(evaluation.subject) }} />
        <GText variant="caption" tone="secondary" style={{ flex: 1 }} numberOfLines={1}>
          {getSubjectName(evaluation.subject)} · {new Date(evaluation.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
        </GText>
      </View>
      <GText variant="title3" style={{ marginTop: space.xs }}>{evaluation.name || "Évaluation"}</GText>
      {evaluation.description ? <GText variant="caption" tone="tertiary">{evaluation.description}</GText> : null}
      <View style={{ marginTop: space.sm }}>
        {evaluation.skills.map((s, i) => <SkillPill key={i} skill={s} />)}
      </View>
    </Card>
  );
}

export default function CompetencesScreen() {
  const g = useGlass();
  const periods = usePronoteExtra("skill-periods", async session => skillPeriods(session));
  const list = useMemo(() => periods.data ?? [], [periods.data]);
  const [selected, setSelected] = useState<string | undefined>();
  useEffect(() => {
    if (selected || list.length === 0) { return; }
    const now = Date.now();
    setSelected((list.find(p => p.start <= now && p.end >= now) ?? list[list.length - 1]).name);
  }, [list, selected]);

  const skills = usePronoteExtra(selected ? `skills:${selected}` : null, session => getSkills(session, selected as string));
  const evaluations = skills.data ?? [];

  const counts = useMemo(() => {
    const c: Record<Level, number> = { tb: 0, s: 0, f: 0, i: 0, other: 0 };
    for (const e of evaluations) { for (const s of e.skills) { c[levelOf(s)]++; } }
    return c;
  }, [evaluations]);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <PrismScreen back title="Compétences" overline="Pronote" onRefresh={() => { periods.refresh(); skills.refresh(); }} refreshing={periods.loading || skills.loading}>
      {list.length > 0 && <Segmented scroll options={list.map(p => ({ value: p.name, label: p.name }))} value={selected} onChange={setSelected} />}
      {skills.error && <StatusNote tone="warning" text="Impossible d'actualiser les compétences pour l'instant." />}

      {!skills.data && (skills.loading || periods.loading || !periods.data) && !periods.error ? (
        <SkeletonCards count={3} />
      ) : evaluations.length === 0 ? (
        <EmptyState icon="Star" title="Aucune compétence évaluée" message="Tes professeurs n'ont pas encore évalué de compétence sur cette période." />
      ) : (
        <>
          <Card>
            <GText variant="overline" tone="tertiary">{total} compétence{total > 1 ? "s" : ""} évaluée{total > 1 ? "s" : ""}</GText>
            <View style={{ flexDirection: "row", height: 10, borderRadius: 5, overflow: "hidden", marginTop: space.md, backgroundColor: g.separator }}>
              {(Object.keys(LEVELS) as Level[]).map(k => counts[k] > 0 && (
                <View key={k} style={{ flex: counts[k], backgroundColor: LEVELS[k].color }} />
              ))}
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.lg, marginTop: space.md }}>
              {(Object.keys(LEVELS) as Level[]).filter(k => counts[k] > 0).map(k => (
                <View key={k} style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: LEVELS[k].color }} />
                  <GText variant="caption" tone="secondary">{LEVELS[k].label} · {counts[k]}</GText>
                </View>
              ))}
            </View>
          </Card>
          <View style={{ gap: space.md }}>
            {evaluations.map((e, i) => (
              <Reanimated.View key={e.id} entering={enter(i)}>
                <EvaluationCard evaluation={e} />
              </Reanimated.View>
            ))}
          </View>
        </>
      )}
    </PrismScreen>
  );
}
