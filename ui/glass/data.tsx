import React from "react";
import { Platform, Pressable, View, ViewStyle } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";

import { GText } from "./primitives";
import { accent, radius, space, withAlpha } from "./tokens";
import { useGlass } from "./useGlass";

/** Smooth sparkline with a soft area fill. Values on any scale. */
export function Sparkline({ values, width, height = 44, color = accent }: { values: number[]; width: number; height?: number; color?: string }) {
  if (values.length < 2 || width <= 0) { return <View style={{ width, height }} />; }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pad = 3;
  const pts = values.map((v, i) => [
    pad + (i / (values.length - 1)) * (width - pad * 2),
    pad + (1 - (v - min) / span) * (height - pad * 2),
  ]);
  // Catmull-Rom → cubic Bézier for a calm curve.
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += ` C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6}, ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6}, ${p2[0]} ${p2[1]}`;
  }
  const last = pts[pts.length - 1];
  const id = `spark-${Math.round(width)}-${values.length}`;
  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity={0.22} />
          <Stop offset="1" stopColor={color} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={`${d} L ${last[0]} ${height} L ${pts[0][0]} ${height} Z`} fill={`url(#${id})`} />
      <Path d={d} stroke={color} strokeWidth={1.75} fill="none" strokeLinecap="round" />
      <Circle cx={last[0]} cy={last[1]} r={3} fill={color} />
    </Svg>
  );
}

/**
 * Class range bar: min–max track, class average tick, student marker.
 * All values /20.
 */
export function RangeBar({ value, min, max, classAverage, color }: { value?: number; min?: number; max?: number; classAverage?: number; color: string }) {
  const g = useGlass();
  const pct = (v: number) => `${Math.max(0, Math.min(100, (v / 20) * 100))}%` as const;
  return (
    <View style={{ height: 14, justifyContent: "center" }}>
      <View style={{ height: 4, borderRadius: 2, backgroundColor: g.separator }} />
      {min !== undefined && max !== undefined && max >= min && (
        <View style={{ position: "absolute", left: pct(min), width: `${((max - min) / 20) * 100}%`, height: 4, borderRadius: 2, backgroundColor: withAlpha("#FFFFFF", g.dark ? 0.12 : 0.5) }} />
      )}
      {classAverage !== undefined && (
        <View style={{ position: "absolute", left: pct(classAverage), width: 2, height: 10, marginLeft: -1, borderRadius: 1, backgroundColor: g.textTertiary }} />
      )}
      {value !== undefined && (
        <View style={{ position: "absolute", left: pct(value), width: 10, height: 10, marginLeft: -5, borderRadius: 5, backgroundColor: color, borderWidth: 2, borderColor: g.background }} />
      )}
    </View>
  );
}

/** Label + big number, optional unit and footnote. */
export function Stat({ label, value, unit, color, footnote }: { label: string; value: string; unit?: string; color?: string; footnote?: string }) {
  return (
    <View>
      <GText variant="overline" tone="tertiary">{label}</GText>
      <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4, marginTop: 2 }}>
        <GText variant="title1" tabular color={color}>{value}</GText>
        {unit ? <GText variant="callout" tone="tertiary">{unit}</GText> : null}
      </View>
      {footnote ? <GText variant="caption" tone="tertiary">{footnote}</GText> : null}
    </View>
  );
}

/** Small circular glass button with a glyph (an icon element or text). */
export function IconButton({ onPress, children, label, style }: { onPress: () => void; children: React.ReactNode; label: string; style?: ViewStyle }) {
  const g = useGlass();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        {
          width: 36,
          height: 36,
          borderRadius: radius.pill,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed ? g.glassFillStrong : g.glassFill,
          borderWidth: 1,
          borderColor: g.glassBorder,
        },
        Platform.OS === "web" ? ({ cursor: "pointer" } as unknown as ViewStyle) : null,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

/** Section title row with an optional action on the right. */
export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  const g = useGlass();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: space.md }}>
      <GText variant="overline" tone="secondary">{title}</GText>
      {action && onAction ? (
        <Pressable onPress={onAction} hitSlop={8} style={Platform.OS === "web" ? ({ cursor: "pointer" } as unknown as ViewStyle) : undefined}>
          <GText variant="caption" color={g.textSecondary}>{action} →</GText>
        </Pressable>
      ) : null}
    </View>
  );
}
