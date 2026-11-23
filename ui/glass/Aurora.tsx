import React, { useEffect } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

import { motion } from "./tokens";
import { useGlass } from "./useGlass";

function Glow({ color, opacity, x, y, size, drift, delay }: { color: string; opacity: number; x: number; y: number; size: number; drift: number; delay: number }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(withTiming(1, { duration: motion.auroraPeriodMs + delay, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [t, delay]);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x - size / 2 + drift * t.value }, { translateY: y - size / 2 + drift * 0.6 * t.value }],
  }));
  const id = `glow-${Math.round(x)}-${Math.round(y)}`;
  return (
    <Animated.View style={[{ position: "absolute", width: size, height: size }, style]}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id={id} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={color} stopOpacity={opacity} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width={size} height={size} fill={`url(#${id})`} />
      </Svg>
    </Animated.View>
  );
}

/** Obsidian backdrop (Android / iOS): near-black canvas with two faint light leaks. */
export default function Aurora() {
  const g = useGlass();
  const { width, height } = useWindowDimensions();
  const m = Math.max(width, height);
  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: g.background, overflow: "hidden" }]} pointerEvents="none">
      <Glow color="#6E6AF6" opacity={g.dark ? 0.2 : 0.12} x={width * 0.1} y={-height * 0.05} size={m * 1.3} drift={width * 0.05} delay={0} />
      <Glow color="#5AB8FF" opacity={g.dark ? 0.08 : 0.06} x={width * 0.95} y={height * 0.85} size={m} drift={-width * 0.05} delay={4000} />
    </View>
  );
}
