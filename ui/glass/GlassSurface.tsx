import { BlurView, LiquidGlassView } from "@sbaiahmed1/react-native-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";

import { runsIOS26 } from "@/ui/utils/IsLiquidGlass";

import { radius as R } from "./tokens";
import { useGlass } from "./useGlass";

export interface GlassSurfaceProps extends ViewProps {
  radius?: number;
  /** "regular" for cards, "strong" for small controls over busy content. */
  intensity?: "regular" | "strong";
  /** Coloured tint mixed into the glass (e.g. a probability colour). */
  tint?: string;
  padding?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * The building block of the Liquid Glass UI.
 * - iOS 26: the system's real Liquid Glass material.
 * - Android: a live native blur (RenderEffect) + translucent fill.
 * Both get the same specular rim (top highlight gradient + hairline border) and a
 * soft drop shadow, so the material reads identically on every platform.
 */
export default function GlassSurface({
  radius = R.lg,
  intensity = "regular",
  tint,
  padding,
  style,
  children,
  ...rest
}: GlassSurfaceProps) {
  const g = useGlass();
  const fill = intensity === "strong" ? g.glassFillStrong : g.glassFill;
  const shape = { borderRadius: radius, overflow: "hidden" as const };

  const material =
    Platform.OS === "ios" && runsIOS26 ? (
      <LiquidGlassView style={StyleSheet.absoluteFill} glassType="regular" />
    ) : Platform.OS === "android" ? (
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType={g.blurType}
        blurAmount={g.blurAmount}
        blurRounds={6}
        overlayColor="transparent"
      />
    ) : null;

  return (
    <View
      {...rest}
      style={[
        {
          borderRadius: radius,
          shadowColor: g.glassShadow,
          shadowOpacity: 1,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 12 },
          elevation: 0,
        },
        style,
      ]}
    >
      <View style={[StyleSheet.absoluteFill, shape]} pointerEvents="none">
        {material}
        <View style={[StyleSheet.absoluteFill, { backgroundColor: fill }]} />
        {tint ? <View style={[StyleSheet.absoluteFill, { backgroundColor: tint, opacity: 0.08 }]} /> : null}
        <LinearGradient
          colors={[g.glassHighlight, "transparent"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.35 }}
          style={[StyleSheet.absoluteFill, { opacity: g.dark ? 0.35 : 0.6 }]}
        />
        <View style={[StyleSheet.absoluteFill, shape, { borderWidth: StyleSheet.hairlineWidth * 2, borderColor: g.glassBorder }]} />
      </View>
      <View style={{ padding }}>{children}</View>
    </View>
  );
}
