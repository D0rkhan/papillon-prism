import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { aurora, GlassSurface, GText, space } from "@/ui/glass";

/** Entry point to the "Objectif EPFL" screen, shown above the grades. */
export default function EpflEntryCard() {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push("/(tabs)/grades/objectif")} accessibilityRole="button" accessibilityLabel="Ouvrir l'objectif EPFL">
      {({ pressed }) => (
        <GlassSurface radius={22} style={{ transform: [{ scale: pressed ? 0.98 : 1 }] }}>
          <LinearGradient
            colors={[aurora.indigo, aurora.violet, aurora.cyan]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 22, opacity: 0.28 }]}
          />
          <View style={{ padding: space.lg, flexDirection: "row", alignItems: "center", gap: space.md }}>
            <View style={{ flex: 1 }}>
              <GText variant="overline" tone="secondary">Objectif</GText>
              <GText variant="title3">EPFL Lausanne</GText>
              <GText variant="caption" tone="secondary">Probabilités, priorités et notes à viser</GText>
            </View>
            <GText variant="title2">→</GText>
          </View>
        </GlassSurface>
      )}
    </Pressable>
  );
}
