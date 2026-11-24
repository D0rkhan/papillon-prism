import React, { useEffect, useMemo, useState } from "react";
import { useWindowDimensions, View } from "react-native";

import { usePronoteExtra } from "@/hooks/usePronoteExtra";
import { fetchPronoteAttendance, fetchPronoteAttendancePeriods } from "@/services/pronote/attendance";
import type { Attendance } from "@/services/shared/attendance";
import { ObservationType } from "@/services/shared/attendance";
import {
  aurora,
  Card,
  Chip,
  EmptyState,
  Grid,
  GText,
  PrismScreen,
  Row,
  Segmented,
  semantic,
  SkeletonCards,
  space,
  Stat,
  StatusNote,
} from "@/ui/glass";
import { getPronoteClient } from "@/hooks/usePronoteExtra";

const date = (d: Date | string) => new Date(d).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
const hours = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h ? `${h} h${m ? ` ${String(m).padStart(2, "0")}` : ""}` : `${m} min`;
};

const OBSERVATION_LABEL: Record<number, { label: string; color: string }> = {
  [ObservationType.LogBookIssue]: { label: "Carnet", color: semantic.warning },
  [ObservationType.Observation]: { label: "Observation", color: aurora.cyan },
  [ObservationType.Encouragement]: { label: "Encouragement", color: semantic.success },
  [ObservationType.Other]: { label: "Autre", color: "#8A8A99" },
};

export default function VieScolaireScreen() {
  const { width } = useWindowDimensions();
  const accountId = getPronoteClient()?.accountId ?? "pronote";

  const periods = usePronoteExtra("notebook-periods", session => fetchPronoteAttendancePeriods(session, accountId));
  const list = useMemo(() => periods.data ?? [], [periods.data]);
  const [selected, setSelected] = useState<string | undefined>();
  useEffect(() => {
    if (selected || list.length === 0) { return; }
    const now = Date.now();
    // "Année" style periods give the full picture; else the current one.
    const year = list.find(p => /ann[ée]e/i.test(p.name));
    const current = list.find(p => new Date(p.start).getTime() <= now && new Date(p.end).getTime() >= now);
    setSelected((year ?? current ?? list[list.length - 1]).name);
  }, [list, selected]);

  const notebook = usePronoteExtra<Attendance>(selected ? `notebook:${selected}` : null, session => fetchPronoteAttendance(session, accountId, selected as string));
  const a = notebook.data;

  const stats = useMemo(() => {
    const absences = a?.absences ?? [];
    const delays = a?.delays ?? [];
    return {
      absences: absences.length,
      unjustified: absences.filter(x => !x.justified).length,
      missed: absences.reduce((acc, x) => acc + (x.timeMissed || 0), 0),
      delays: delays.length,
      delayMinutes: delays.reduce((acc, x) => acc + (x.duration || 0), 0),
      punishments: a?.punishments?.length ?? 0,
    };
  }, [a]);

  const columns = width >= 900 ? 2 : 1;

  return (
    <PrismScreen back title="Vie scolaire" overline="Pronote" onRefresh={() => { periods.refresh(); notebook.refresh(); }} refreshing={periods.loading || notebook.loading}>
      {list.length > 0 && <Segmented scroll options={list.map(p => ({ value: p.name, label: p.name }))} value={selected} onChange={setSelected} />}
      {notebook.error && <StatusNote tone="warning" text="Impossible d'actualiser la vie scolaire pour l'instant." />}

      {!a && (notebook.loading || periods.loading || !periods.data) && !periods.error ? (
        <SkeletonCards count={2} />
      ) : !a ? (
        <EmptyState icon="Clock" title="Rien à afficher" message="Connecte-toi à PRONOTE pour récupérer ta vie scolaire." />
      ) : (
        <>
          <Card>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.xxl }}>
              <Stat label="Absences" value={String(stats.absences)} footnote={stats.unjustified ? `${stats.unjustified} non justifiée${stats.unjustified > 1 ? "s" : ""}` : "toutes justifiées"} color={stats.unjustified ? semantic.danger : undefined} />
              <Stat label="Heures manquées" value={hours(stats.missed)} />
              <Stat label="Retards" value={String(stats.delays)} footnote={stats.delays ? hours(stats.delayMinutes) : undefined} />
              <Stat label="Punitions" value={String(stats.punishments)} color={stats.punishments ? semantic.warning : undefined} />
            </View>
          </Card>

          <Grid columns={columns}>
            {[
              <Card key="abs">
                <GText variant="overline" tone="secondary">Absences</GText>
                {(a.absences ?? []).length === 0 ? <GText variant="callout" tone="tertiary" style={{ marginTop: space.sm }}>Aucune absence. 👏</GText> : [...a.absences].reverse().map((x, i) => (
                  <Row key={x.id} first={i === 0} title={date(x.from)} subtitle={[x.reason, x.timeMissed ? hours(x.timeMissed) : null].filter(Boolean).join(" · ") || "Motif non précisé"} trailing={<Chip label={x.justified ? "Justifiée" : "À justifier"} color={x.justified ? semantic.success : semantic.danger} />} />
                ))}
              </Card>,
              <Card key="delay">
                <GText variant="overline" tone="secondary">Retards</GText>
                {(a.delays ?? []).length === 0 ? <GText variant="callout" tone="tertiary" style={{ marginTop: space.sm }}>Aucun retard.</GText> : [...a.delays].reverse().map((x, i) => (
                  <Row key={x.id} first={i === 0} title={date(x.givenAt)} subtitle={[x.reason, `${x.duration} min`].filter(Boolean).join(" · ")} trailing={<Chip label={x.justified ? "Justifié" : "Non justifié"} color={x.justified ? semantic.success : semantic.warning} />} />
                ))}
              </Card>,
              <Card key="pun">
                <GText variant="overline" tone="secondary">Punitions</GText>
                {(a.punishments ?? []).length === 0 ? <GText variant="callout" tone="tertiary" style={{ marginTop: space.sm }}>Aucune punition.</GText> : [...a.punishments].reverse().map((x, i) => (
                  <Row key={x.id} first={i === 0} title={x.nature || "Punition"} subtitle={[date(x.givenAt), x.givenBy, x.reason?.text, x.homework?.text ? `Travail : ${x.homework.text}` : null].filter(Boolean).join(" · ")} trailing={x.exclusion ? <Chip label="Exclusion" color={semantic.danger} /> : undefined} />
                ))}
              </Card>,
              <Card key="obs">
                <GText variant="overline" tone="secondary">Observations</GText>
                {(a.observations ?? []).length === 0 ? <GText variant="callout" tone="tertiary" style={{ marginTop: space.sm }}>Aucune observation.</GText> : [...a.observations].reverse().map((x, i) => {
                  const meta = OBSERVATION_LABEL[x.sectionType] ?? OBSERVATION_LABEL[ObservationType.Other];
                  return (
                    <Row key={x.id} first={i === 0} title={x.sectionName || meta.label} subtitle={[date(x.givenAt), x.subjectName, x.reason].filter(Boolean).join(" · ")} trailing={<Chip label={meta.label} color={meta.color} />} />
                  );
                })}
              </Card>,
            ]}
          </Grid>
        </>
      )}
    </PrismScreen>
  );
}
