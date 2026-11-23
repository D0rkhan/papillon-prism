import React from "react";
import { Pressable, StyleProp, Text, TextProps, TextStyle, View, ViewStyle } from "react-native";
import Svg, { Circle, Defs, Line, LinearGradient, Rect, Stop, Text as SvgText } from "react-native-svg";

import { useFont } from "@/utils/theme/fonts";

import { aurora, radius, space, type, TypeVariant, withAlpha } from "./tokens";
import { useGlass } from "./useGlass";

// ───────────────────────────── Text ─────────────────────────────

export interface GTextProps extends TextProps {
  variant?: TypeVariant;
  tone?: "primary" | "secondary" | "tertiary";
  color?: string;
  align?: TextStyle["textAlign"];
  tabular?: boolean;
}

export function GText({ variant = "body", tone = "primary", color, align, tabular, style, ...rest }: GTextProps) {
  const g = useGlass();
  const font = useFont();
  const t = type[variant];
  const c = color ?? (tone === "primary" ? g.text : tone === "secondary" ? g.textSecondary : g.textTertiary);
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: font(t.weight),
          fontSize: t.size,
          lineHeight: t.line,
          color: c,
          textAlign: align,
          letterSpacing: variant === "overline" ? 1.2 : variant === "display" ? -1.5 : undefined,
          textTransform: variant === "overline" ? "uppercase" : undefined,
          fontVariant: tabular ? ["tabular-nums"] : undefined,
        },
        style,
      ]}
    />
  );
}

// ───────────────────────────── Probability ring ─────────────────────────────

export function ProbabilityRing({
  value,
  secondary,
  size = 180,
  stroke = 14,
  color = aurora.cyan,
  children,
}: {
  value: number;
  /** Optional inner ring (e.g. competitive probability). */
  secondary?: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: React.ReactNode;
}) {
  const g = useGlass();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const r2 = r - stroke - 6;
  const c2 = 2 * Math.PI * r2;
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}>
        <Defs>
          <LinearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={aurora.violet} />
            <Stop offset="1" stopColor={color} />
          </LinearGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={g.separator} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ring)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={c * (1 - clamp01(value))}
        />
        {secondary !== undefined && (
          <>
            <Circle cx={size / 2} cy={size / 2} r={r2} stroke={g.separator} strokeWidth={stroke / 2} fill="none" />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={r2}
              stroke={aurora.pink}
              strokeWidth={stroke / 2}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${c2} ${c2}`}
              strokeDashoffset={c2 * (1 - clamp01(secondary))}
            />
          </>
        )}
      </Svg>
      {children}
    </View>
  );
}

// ───────────────────────────── Meter ─────────────────────────────

/** Horizontal bar 0–1 with an optional marker (e.g. the threshold). */
export function Meter({ value, color, marker, height = 8 }: { value: number; color: string; marker?: number; height?: number }) {
  const g = useGlass();
  const pct = `${Math.max(0, Math.min(1, value)) * 100}%` as const;
  return (
    <View style={{ height, borderRadius: height, backgroundColor: g.separator, overflow: "hidden" }}>
      <View style={{ width: pct, height, borderRadius: height, backgroundColor: color }} />
      {marker !== undefined && (
        <View style={{ position: "absolute", left: `${marker * 100}%`, top: 0, bottom: 0, width: 2, backgroundColor: g.text, opacity: 0.6 }} />
      )}
    </View>
  );
}

// ───────────────────────────── Chip ─────────────────────────────

export function Chip({ label, color, onPress, style }: { label: string; color: string; onPress?: () => void; style?: StyleProp<ViewStyle> }) {
  const content = (
    <View
      style={[
        { paddingHorizontal: space.md, paddingVertical: space.xs + 1, borderRadius: radius.pill, backgroundColor: withAlpha(color, 0.16), borderWidth: 1, borderColor: withAlpha(color, 0.4), alignSelf: "flex-start" },
        style,
      ]}
    >
      <GText variant="caption" color={color}>{label}</GText>
    </View>
  );
  return onPress ? <Pressable onPress={onPress} hitSlop={8}>{content}</Pressable> : content;
}

// ───────────────────────────── Distribution chart ─────────────────────────────

/**
 * Histogram of the simulated final grade, with the 80 % band and threshold lines.
 * `values` are the raw Monte-Carlo draws.
 */
export function DistributionChart({
  values,
  thresholds = [],
  width,
  height = 140,
  domain = [8, 20],
}: {
  values: ArrayLike<number>;
  thresholds?: { value: number; label: string; color: string }[];
  width: number;
  height?: number;
  domain?: [number, number];
}) {
  const g = useGlass();
  const bins = 48;
  const [lo, hi] = domain;
  const counts = new Array(bins).fill(0);
  for (let i = 0; i < values.length; i++) {
    const b = Math.floor(((values[i] - lo) / (hi - lo)) * bins);
    counts[Math.max(0, Math.min(bins - 1, b))]++;
  }
  const max = Math.max(1, ...counts);
  const plotH = height - 22;
  const bw = width / bins;
  const x = (v: number) => ((v - lo) / (hi - lo)) * width;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="bars" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={aurora.violet} />
          <Stop offset="1" stopColor={aurora.cyan} />
        </LinearGradient>
      </Defs>
      {counts.map((c, i) => {
        const h = (c / max) * plotH;
        return <Rect key={i} x={i * bw + 1} y={plotH - h} width={Math.max(1, bw - 2)} height={h} rx={Math.min(3, bw / 2)} fill="url(#bars)" opacity={0.9} />;
      })}
      {thresholds.map(t => (
        <React.Fragment key={t.label}>
          <Line x1={x(t.value)} x2={x(t.value)} y1={0} y2={plotH} stroke={t.color} strokeWidth={2} strokeDasharray="4 4" />
          <SvgText x={Math.min(width - 40, x(t.value) + 4)} y={12} fill={t.color} fontSize={11} fontWeight="bold">{t.label}</SvgText>
        </React.Fragment>
      ))}
      {[lo, (lo + hi) / 2, hi].map(v => (
        <SvgText key={v} x={Math.max(0, Math.min(width - 16, x(v) - 6))} y={height - 4} fill={g.textTertiary} fontSize={11}>{String(v)}</SvgText>
      ))}
    </Svg>
  );
}
