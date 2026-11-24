import { useRouter } from "expo-router";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import Reanimated from "react-native-reanimated";

import { useHasPronote } from "@/hooks/usePronoteExtra";
import { useAccountStore } from "@/stores/account";
import { accent, aurora, Card, enter, Grid, GText, Icon, PrismScreen, semantic, space, Tile, useGlass, withAlpha } from "@/ui/glass";
import { formatSchoolName } from "@/utils/format/formatSchoolName";

type Entry = { icon: Parameters<typeof Tile>[0]["icon"]; title: string; subtitle: string; color: string; route: string; pronote?: boolean };

const SCHOOL: Entry[] = [
  { icon: "Paper", title: "Bulletins", subtitle: "Appréciations, moyennes du conseil, PDF", color: aurora.violet, route: "/(features)/prism/bulletin", pronote: true },
  { icon: "Star", title: "Compétences", subtitle: "Niveaux de maîtrise par évaluation", color: aurora.amber, route: "/(features)/prism/competences", pronote: true },
  { icon: "Bookmark", title: "Cahier de textes", subtitle: "Contenu des cours et documents", color: aurora.cyan, route: "/(features)/prism/cahier", pronote: true },
  { icon: "Clock", title: "Vie scolaire", subtitle: "Absences, retards, punitions, observations", color: aurora.pink, route: "/(features)/prism/vie-scolaire", pronote: true },
  { icon: "Mail", title: "Messagerie", subtitle: "Discussions avec les profs et la vie scolaire", color: aurora.indigo, route: "/(features)/prism/messagerie", pronote: true },
  { icon: "Newspaper", title: "Actualités", subtitle: "Informations et sondages de l'établissement", color: aurora.mint, route: "/(features)/(news)/news" },
  { icon: "Cutlery", title: "Menu de la cantine", subtitle: "Les repas de la semaine", color: semantic.warning, route: "/(features)/prism/cantine", pronote: true },
];

export default function PlusHub() {
  const g = useGlass();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const columns = width >= 1000 ? 3 : width >= 560 ? 2 : 1;
  const hasPronote = useHasPronote();
  const account = useAccountStore(state => state.accounts.find(a => a.id === state.lastUsedAccount));

  const initials = `${account?.firstName?.[0] ?? ""}${account?.lastName?.[0] ?? ""}`.toUpperCase() || "?";
  const entries = SCHOOL.filter(e => !e.pronote || hasPronote);

  return (
    <PrismScreen title="Plus" overline="Toute ta scolarité">
      <Card onPress={() => router.push("/(features)/prism/reglages")}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: space.lg }}>
          <View style={{ width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", backgroundColor: withAlpha(accent, 0.22), borderWidth: 1, borderColor: withAlpha(accent, 0.4) }}>
            <GText variant="title2" color={g.text}>{initials}</GText>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <GText variant="title2" numberOfLines={1}>{[account?.firstName, account?.lastName].filter(Boolean).join(" ") || "Mon compte"}</GText>
            <GText variant="caption" tone="tertiary" numberOfLines={1}>
              {[account?.className, account?.schoolName ? formatSchoolName(account.schoolName) : undefined].filter(Boolean).join(" · ")}
            </GText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: space.xs }}>
            <Icon name="Gears" size={16} color={g.textSecondary} />
            <GText variant="caption" tone="secondary">Réglages</GText>
          </View>
        </View>
      </Card>

      <View style={{ gap: space.md }}>
        <GText variant="overline" tone="secondary">Pronote</GText>
        <Grid columns={columns}>
          {entries.map((e, i) => (
            <Reanimated.View key={e.title} entering={enter(i)} style={{ flex: 1 }}>
              <Tile icon={e.icon} title={e.title} subtitle={e.subtitle} color={e.color} onPress={() => router.push(e.route as never)} />
            </Reanimated.View>
          ))}
        </Grid>
      </View>

      <View style={{ gap: space.md }}>
        <GText variant="overline" tone="secondary">Objectif</GText>
        <Grid columns={columns}>
          {[
            <Tile key="epfl" icon="GraduationHat" title="Objectif EPFL" subtitle="Probabilités d'admission et notes à viser" color={aurora.cyan} onPress={() => router.push("/(tabs)/grades/objectif")} />,
            <Tile key="sim" icon="Pie" title="Moyennes détaillées" subtitle="Comment chaque moyenne est calculée" color={aurora.violet} onPress={() => router.push("/(features)/prism/calculs")} />,
          ]}
        </Grid>
      </View>
    </PrismScreen>
  );
}
