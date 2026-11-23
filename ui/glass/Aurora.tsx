import React, { useEffect } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

import { aurora, motion } from "./tokens";
import { useGlass } from "./useGlass";

interface Blob { color: string; x: number; y: number; r: number; dx: number; dy: number }

const BLOBS: Blob[] = [
  { color: aurora.indigo, x: 0.15, y: 0.08, r: 0.75, dx: 0.12, dy: 0.06 },
  { color: aurora.violet, x: 0.9, y: 0.22, r: 0.7, dx: -0.1, dy: 0.08 },
  { color: aurora.cyan, x: 0.25, y: 0.62, r: 0.65, dx: 0.1, dy: -0.07 },
  { color: aurora.pink, x: 0.85, y: 0.85, r: 0.6, dx: -0.08, dy: -0.06 },
];

function AuroraBlob({ blob, index, width, height, opacity }: { blob: Blob; index: number; width: number; height: number; opacity: number }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration: motion.auroraPeriodMs + index * 2300, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, [t, index]);

  const size = Math.max(width, height) * blob.r * 2;
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: blob.x * width - size / 2 + blob.dx * width * t.value },
      { translateY: blob.y * height - size / 2 + blob.dy * height * t.value },
      { scale: 1 + 0.12 * t.value },
    ],
  }));

  return (
    <Animated.View style={[{ position: "absolute", width: size, height: size, opacity }, style]}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id={`aurora-${index}`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={blob.color} stopOpacity={0.9} />
            <Stop offset="0.45" stopColor={blob.color} stopOpacity={0.35} />
            <Stop offset="1" stopColor={blob.color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={size} height={size} fill={`url(#aurora-${index})`} />
      </Svg>
    </Animated.View>
  );
}

/** Slowly drifting aurora behind the glass: what gives the material something to refract. */
export default function Aurora() {
  const g = useGlass();
  const { width, height } = useWindowDimensions();
  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: g.background, overflow: "hidden" }]} pointerEvents="none">
      {BLOBS.map((b, i) => (
        <AuroraBlob key={i} blob={b} index={i} width={width} height={height} opacity={g.auroraOpacity} />
      ))}
    </View>
  );
}
