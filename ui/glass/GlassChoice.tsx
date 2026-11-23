import React from "react";
import { Platform, Pressable, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import GlassSurface from "./GlassSurface";
import { GText } from "./primitives";
import { aurora, motion, radius, space, withAlpha } from "./tokens";
import { useGlass } from "./useGlass";

export interface GlassChoiceProps {
  label: string;
  description?: string;
  leading?: React.ReactNode;
  /** Right-hand illustration; receives whether the choice is selected. */
  trailing?: (selected: boolean) => React.ReactNode;
  selected: boolean;
  onPress: () => void;
  accent?: string;
}

/** A selectable glass card (radio-style). Touch, mouse and keyboard friendly. */
export default function GlassChoice({ label, description, leading, trailing, selected, onPress, accent = aurora.cyan }: GlassChoiceProps) {
  const g = useGlass();
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={animated}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        accessibilityLabel={label}
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.98, motion.spring); }}
        onPressOut={() => { scale.value = withSpring(1, motion.spring); }}
        style={Platform.OS === "web" ? ({ cursor: "pointer", outlineStyle: "none" } as unknown as ViewStyle) : undefined}
      >
        <GlassSurface
          radius={radius.lg}
          tint={selected ? accent : undefined}
          style={selected ? { borderColor: accent, borderWidth: 1.5 } : undefined}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: space.md, minHeight: 72, paddingHorizontal: space.lg, paddingVertical: space.md }}>
            {leading}
            <View style={{ flex: 1 }}>
              <GText variant="title3" color={selected ? g.text : g.textSecondary}>{label}</GText>
              {description ? <GText variant="caption" tone="tertiary">{description}</GText> : null}
            </View>
            {trailing ? trailing(selected) : null}
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 2,
                borderColor: selected ? accent : g.glassBorder,
                backgroundColor: selected ? accent : "transparent",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: accent,
                shadowOpacity: selected ? 0.8 : 0,
                shadowRadius: 8,
              }}
            >
              {selected ? <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: withAlpha("#FFFFFF", 0.95) }} /> : null}
            </View>
          </View>
        </GlassSurface>
      </Pressable>
    </Animated.View>
  );
}
