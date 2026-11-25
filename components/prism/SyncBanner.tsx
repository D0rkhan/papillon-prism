import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

import { SyncProblem } from "@/hooks/useSyncHealth";
import { Card, GText, Icon, radius, semantic, space, useGlass, webOnly } from "@/ui/glass";
import { relinkPronote } from "@/utils/pronote/relink";

/** Says why a screen is empty or stale, with the one action that fixes it. */
export default function SyncBanner({ problem, onRetry }: { problem: SyncProblem; onRetry?: () => void }) {
  const g = useGlass();
  const color = problem.kind === "relink" ? semantic.danger : semantic.warning;

  const act = async () => {
    if (problem.kind === "relink") {
      const opened = await relinkPronote();
      if (!opened) { router.push("/(features)/prism/reglages"); }
      return;
    }
    onRetry?.();
  };

  const label = problem.kind === "relink" ? "Se reconnecter" : problem.kind === "retry" ? "Réessayer" : null;

  return (
    <Card tint={color} padding={space.lg}>
      <View style={{ flexDirection: "row", gap: space.md, alignItems: "flex-start" }}>
        <Icon name={problem.kind === "relink" ? "Lock" : "AlertTriangle"} size={20} color={color} />
        <View style={{ flex: 1, gap: 2 }}>
          <GText variant="title3">{problem.title}</GText>
          <GText variant="callout" tone="secondary">{problem.message}</GText>
        </View>
      </View>
      {label ? (
        <Pressable
          onPress={act}
          accessibilityRole="button"
          style={[{ alignSelf: "flex-start", marginTop: space.md, marginLeft: 20 + space.md, paddingHorizontal: space.lg, height: 34, borderRadius: radius.pill, justifyContent: "center", backgroundColor: g.inverse }, webOnly({ cursor: "pointer" })]}
        >
          <GText variant="caption" color={g.onInverse}>{label}</GText>
        </Pressable>
      ) : null}
    </Card>
  );
}
