import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Platform, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import GlassSurface from "./GlassSurface";
import { GText } from "./primitives";
import { aurora, motion, radius, space } from "./tokens";
import { useGlass } from "./useGlass";

export interface GlassButtonProps {
  label: string;
  onPress?: () => void;
  /** primary: aurora gradient · glass: frosted · ghost: text only. */
  variant?: "primary" | "glass" | "ghost";
  size?: "md" | "lg";
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
}

/**
 * The Liquid Glass button. A plain Pressable underneath, so it reacts to touch, mouse
 * clicks and the keyboard everywhere (Android, iOS, web, Linux desktop), with a spring
 * press-scale, haptics on phones and a pointer cursor + focus ring on desktop.
 */
export default function GlassButton({
  label,
  onPress,
  variant = "primary",
  size = "lg",
  leading,
  trailing,
  disabled,
  loading,
  fullWidth = true,
  style,
  accessibilityHint,
}: GlassButtonProps) {
  const g = useGlass();
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const height = size === "lg" ? 56 : 46;
  const inactive = disabled || loading;

  const content = (
    <View style={[styles.row, { height, paddingHorizontal: space.xl }]}>
      {loading ? <ActivityIndicator color={variant === "primary" ? "#fff" : g.text} /> : leading}
      <GText variant={size === "lg" ? "title3" : "body"} color={variant === "primary" ? "#FFFFFF" : g.text} numberOfLines={1}>
        {label}
      </GText>
      {trailing}
    </View>
  );

  return (
    <Animated.View style={[fullWidth ? { alignSelf: "stretch" } : { alignSelf: "flex-start" }, animated, style, { opacity: inactive ? 0.5 : 1 }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: !!inactive, busy: !!loading }}
        disabled={inactive}
        onPressIn={() => { scale.value = withSpring(0.97, motion.spring); }}
        onPressOut={() => { scale.value = withSpring(1, motion.spring); }}
        onPress={() => {
          if (Platform.OS !== "web") { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined); }
          onPress?.();
        }}
        style={state => [
          { borderRadius: radius.pill },
          Platform.OS === "web" ? ({ cursor: inactive ? "default" : "pointer", outlineStyle: "none" } as unknown as ViewStyle) : null,
          (state as { focused?: boolean }).focused ? { boxShadow: `0 0 0 3px ${aurora.cyan}` } as unknown as ViewStyle : null,
          (state as { hovered?: boolean }).hovered && !inactive ? { opacity: 0.92 } : null,
        ]}
      >
        {variant === "primary" ? (
          <View style={[styles.pill, { shadowColor: aurora.violet }]}>
            <LinearGradient
              colors={[aurora.indigo, aurora.violet, aurora.pink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <LinearGradient
              colors={["rgba(255,255,255,0.35)", "rgba(255,255,255,0)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 0.6 }}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />
            {content}
          </View>
        ) : variant === "glass" ? (
          <GlassSurface radius={radius.pill} intensity="strong">{content}</GlassSurface>
        ) : (
          content
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: space.sm },
  pill: {
    borderRadius: radius.pill,
    overflow: "hidden",
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
});
