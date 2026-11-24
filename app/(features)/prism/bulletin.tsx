import React, { useEffect, useMemo, useState } from "react";
import { Linking, useWindowDimensions, View } from "react-native";
import Reanimated from "react-native-reanimated";

import { getPronoteClient, usePronoteExtra } from "@/hooks/usePronoteExtra";
import { bulletinPeriods, getBulletin, getBulletinPDF, type BulletinSubject } from "@/services/pronote/extras";
import { useAlert } from "@/ui/components/AlertProvider";
import {
  ActionButton,
  Card,
  EmptyState,
  enter,
  gradeColor,
  Grid,
  GText,
  PrismScreen,
  RangeBar,
  Segmented,
  SkeletonCards,
  space,
  Stat,
  StatusNote,
  useGlass,
} from "@/ui/glass";
import { getSubjectColor } from "@/utils/subjects/colors";
import { getSubjectName } from "@/utils/subjects/name";

const fmt = (v: number | null, d = 2) => (v === null ? "—" : v.toFixed(d).replace(".", ","));
const ago = (at?: number) => (at ? new Date(at).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "");

function SubjectBulletin({ s }: { s: BulletinSubject }) {
  const g = useGlass();
  const color = getSubjectColor(s.name);
  return (
    <Card padding={space.lg}>
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: space.md }}>
        <View style={{ width: 3, alignSelf: "stretch", borderRadius: 2, backgroundColor: color }} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <GText variant="title3" numberOfLines={1}>{getSubjectName(s.name)}</GText>
          <GText variant="caption" tone="tertiary" numberOfLines={1}>
            {[s.teachers.join(", "), s.coefficient && s.coefficient !== 1 ? `coef ${String(s.coefficient).replace(".", ",")}` : null].filter(Boolean).join(" · ") || "—"}
          </GText>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <GText variant="title2" tabular color={s.student !== null ? gradeColor(s.student) : g.textTertiary}>{fmt(s.student)}</GText>
          {s.classAverage !== null && <GText variant="caption" tone="tertiary" tabular>classe {fmt(s.classAverage)}</GText>}
        </View>
      </View>
      {(s.min !== null || s.max !== null) && (
        <View style={{ marginTop: space.md, marginLeft: 3 + space.md }}>
          <RangeBar value={s.student ?? undefined} min={s.min ?? undefined} max={s.max ?? undefined} classAverage={s.classAverage ?? undefined} color={s.student !== null ? gradeColor(s.student) : color} />
        </View>
      )}
      {s.appreciations.length > 0 && (
        <View style={{ marginTop: space.md, marginLeft: 3 + space.md, gap: space.xs }}>
          {s.appreciations.map((a, i) => (
            <GText key={i} variant="callout" tone="secondary" style={{ fontStyle: "italic" }}>« {a.trim()} »</GText>
          ))}
        </View>
      )}
    </Card>
  );
}

export default function BulletinScreen() {
  const alert = useAlert();
  const { width } = useWindowDimensions();
  const columns = width >= 1000 ? 2 : 1;

  const periods = usePronoteExtra("bulletin-periods", async session => bulletinPeriods(session));
  const list = useMemo(() => periods.data ?? [], [periods.data]);
  const [selected, setSelected] = useState<string | undefined>();

  // Default: the last period already over (its report card exists), else the first.
  useEffect(() => {
    if (selected || list.length === 0) { return; }
    const now = Date.now();
    const over = list.filter(p => p.end < now);
    setSelected((over[over.length - 1] ?? list[0]).name);
  }, [list, selected]);

  const bulletin = usePronoteExtra(selected ? `bulletin:${selected}` : null, session => getBulletin(session, selected as string));
  const data = bulletin.data;
  const [opening, setOpening] = useState(false);

  const openPdf = async () => {
    const client = getPronoteClient();
    if (!client || !selected) {
      alert.showAlert({ title: "Connexion nécessaire", description: "Le PDF se télécharge depuis PRONOTE : reconnecte-toi puis réessaie.", icon: "GlobeCross", color: "#FF8C00" });
      return;
    }
    setOpening(true);
    try {
      const url = await client.run(session => getBulletinPDF(session, selected));
      await Linking.openURL(url);
    } catch (e) {
      alert.showAlert({ title: "PDF indisponible", description: "PRONOTE n'a pas fourni le bulletin de cette période (il n'est peut-être pas encore publié).", icon: "AlertTriangle", color: "#D60046", technical: String(e) });
    } finally {
      setOpening(false);
    }
  };

  const averaged = (data?.subjects ?? []).filter(s => s.student !== null);
  const sum = averaged.reduce((acc, s) => acc + (s.student as number) * (s.coefficient || 1), 0);
  const weight = averaged.reduce((acc, s) => acc + (s.coefficient || 1), 0);
  const overall = weight > 0 ? sum / weight : null;

  return (
    <PrismScreen
      back
      title="Bulletins"
      overline="Pronote"
      onRefresh={() => { periods.refresh(); bulletin.refresh(); }}
      refreshing={periods.loading || bulletin.loading}
      actions={selected ? <ActionButton icon="ArrowDown" label="Ouvrir le bulletin PDF" onPress={openPdf} busy={opening} /> : null}
    >
      {list.length > 0 && (
        <Segmented scroll options={list.map(p => ({ value: p.name, label: p.name }))} value={selected} onChange={setSelected} />
      )}

      {bulletin.stale && data && <StatusNote text={`Copie hors ligne du ${ago(bulletin.fetchedAt)}`} />}
      {bulletin.error && <StatusNote tone="warning" text="Impossible d'actualiser ce bulletin pour l'instant." />}

      {!data && (bulletin.loading || periods.loading || (!periods.data && !periods.error)) ? (
        <SkeletonCards count={3} />
      ) : !data ? (
        <EmptyState icon="Paper" title="Pas de bulletin" message={list.length === 0 ? "Connecte-toi à PRONOTE pour récupérer tes bulletins." : "Ce bulletin n'est pas encore publié par l'établissement."} />
      ) : (
        <>
          <Card>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.xxl, alignItems: "flex-end" }}>
              <Stat label="Moyenne du bulletin" value={fmt(overall)} unit="/20" color={overall !== null ? gradeColor(overall) : undefined} footnote="Moyenne des matières, coefficients du bulletin" />
              <Stat label="Matières" value={String(data.subjects.length)} />
            </View>
            {data.overall.length > 0 && (
              <View style={{ marginTop: space.lg, gap: space.md }}>
                {data.overall.map((a, i) => (
                  <View key={i} style={{ gap: 2 }}>
                    <GText variant="overline" tone="tertiary">{a.name}</GText>
                    <GText variant="body">{a.value}</GText>
                  </View>
                ))}
              </View>
            )}
            {data.message ? <GText variant="callout" tone="tertiary" style={{ marginTop: space.md }}>{data.message}</GText> : null}
          </Card>

          <Grid columns={columns}>
            {data.subjects.map((s, i) => (
              <Reanimated.View key={`${s.name}-${i}`} entering={enter(i)}>
                <SubjectBulletin s={s} />
              </Reanimated.View>
            ))}
          </Grid>
        </>
      )}
    </PrismScreen>
  );
}
