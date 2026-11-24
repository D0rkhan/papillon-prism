import React, { useMemo, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Reanimated from "react-native-reanimated";

import { usePronoteExtra } from "@/hooks/usePronoteExtra";
import { fetchPronoteCanteenMenu } from "@/services/pronote/canteen";
import type { CanteenMenu, Food, Meal } from "@/services/shared/canteen";
import { ActionButton, Card, EmptyState, enter, Grid, GText, PrismScreen, SkeletonCards, space, StatusNote } from "@/ui/glass";
import { getPronoteClient } from "@/hooks/usePronoteExtra";

const COURSES: { key: keyof Meal; label: string }[] = [
  { key: "entry", label: "Entrée" },
  { key: "main", label: "Plat" },
  { key: "side", label: "Accompagnement" },
  { key: "cheese", label: "Fromage" },
  { key: "dessert", label: "Dessert" },
  { key: "drink", label: "Boisson" },
];

function mondayOf(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

function MealBlock({ title, meal }: { title: string; meal: Meal }) {
  const parts = COURSES.filter(c => (meal[c.key] as Food[] | undefined)?.length);
  if (parts.length === 0) { return null; }
  return (
    <View style={{ gap: space.sm }}>
      <GText variant="overline" tone="tertiary">{title}</GText>
      {parts.map(c => (
        <View key={c.key} style={{ flexDirection: "row", gap: space.md }}>
          <GText variant="caption" tone="tertiary" style={{ width: 104 }}>{c.label}</GText>
          <GText variant="callout" style={{ flex: 1 }}>{(meal[c.key] as Food[]).map(f => f.name).join(", ")}</GText>
        </View>
      ))}
    </View>
  );
}

export default function CantineScreen() {
  const { width } = useWindowDimensions();
  const [offset, setOffset] = useState(0);
  const monday = useMemo(() => {
    const m = mondayOf(new Date());
    m.setDate(m.getDate() + offset * 7);
    return m;
  }, [offset]);
  const accountId = getPronoteClient()?.accountId ?? "pronote";
  const menus = usePronoteExtra<CanteenMenu[]>(`menus:${monday.toDateString()}`, session => fetchPronoteCanteenMenu(session, accountId, monday));
  const days = (menus.data ?? []).filter(d => d.lunch || d.dinner);
  const today = new Date().toDateString();

  return (
    <PrismScreen
      back
      title="Menu de la cantine"
      overline={offset === 0 ? "Cette semaine" : `Semaine du ${monday.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}`}
      onRefresh={menus.refresh}
      refreshing={menus.loading}
      actions={
        <>
          <ActionButton icon="ChevronLeft" label="Semaine précédente" onPress={() => setOffset(o => o - 1)} />
          <ActionButton icon="ChevronRight" label="Semaine suivante" onPress={() => setOffset(o => o + 1)} />
        </>
      }
    >
      {menus.error && <StatusNote tone="warning" text="Impossible d'actualiser le menu pour l'instant." />}
      {!menus.data && menus.loading ? (
        <SkeletonCards count={2} />
      ) : days.length === 0 ? (
        <EmptyState icon="Cutlery" title="Pas de menu" message="L'établissement n'a pas publié de menu pour cette semaine." />
      ) : (
        <Grid columns={width >= 900 ? 2 : 1}>
          {days.map((d, i) => (
            <Reanimated.View key={String(d.date)} entering={enter(i)}>
              <Card tint={new Date(d.date).toDateString() === today ? "#8B7CFF" : undefined}>
                <GText variant="title3" style={{ marginBottom: space.md, textTransform: "capitalize" }}>
                  {new Date(d.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </GText>
                <View style={{ gap: space.lg }}>
                  {d.lunch && <MealBlock title="Déjeuner" meal={d.lunch} />}
                  {d.dinner && <MealBlock title="Dîner" meal={d.dinner} />}
                </View>
              </Card>
            </Reanimated.View>
          ))}
        </Grid>
      )}
    </PrismScreen>
  );
}
