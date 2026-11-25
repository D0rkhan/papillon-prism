/**
 * Prism screen kit: the pieces every Prism screen is built from, so they all
 * share one header, one rhythm and the same hover / press behaviour on the
 * desktop as on the phone.
 */
import { Papicons } from "@getpapillon/papicons";
import { useRouter } from "expo-router";
import { RefreshCw } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  PressableStateCallbackType,
  RefreshControl,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import Reanimated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Aurora from "./Aurora";
import GlassSurface from "./GlassSurface";
import { GText } from "./primitives";
import { accent, radius, space, withAlpha } from "./tokens";
import { useGlass } from "./useGlass";

export const webOnly = (style: object) => (Platform.OS === "web" ? (style as unknown as ViewStyle) : null);
const hovered = (state: PressableStateCallbackType) => Boolean((state as { hovered?: boolean }).hovered);

export type IconName = React.ComponentProps<typeof Papicons>["name"] | "Refresh";

export function Icon({ name, size = 18, color }: { name: IconName; size?: number; color?: string }) {
  const g = useGlass();
  const c = color ?? g.textSecondary;
  if (name === "Refresh") { return <RefreshCw size={size - 2} color={c} strokeWidth={2.2} />; }
  return <Papicons name={name} width={size} height={size} fill={c} color={c} />;
}

/** Round glass button holding an icon; spins its icon while `busy`. */
export function ActionButton({
  icon,
  label,
  onPress,
  busy,
  tint,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
  busy?: boolean;
  tint?: string;
}) {
  const g = useGlass();
  const spin = useSharedValue(0);
  useEffect(() => {
    if (busy) {
      spin.value = 0;
      spin.value = withRepeat(withTiming(1, { duration: 900, easing: Easing.linear }), -1);
    } else {
      spin.value = withTiming(0, { duration: 150 });
    }
  }, [busy, spin]);
  const spinStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value * 360}deg` }] }));

  return (
    <Pressable
      onPress={busy ? undefined : onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      // Browser tooltip on the desktop.
      {...(Platform.OS === "web" ? ({ title: label } as object) : {})}
      style={state => [
        {
          width: 38,
          height: 38,
          borderRadius: radius.pill,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: state.pressed ? g.glassFillStrong : hovered(state) ? g.glassFillStrong : g.glassFill,
          borderWidth: 1,
          borderColor: hovered(state) ? withAlpha(g.dark ? "#FFFFFF" : "#000000", 0.16) : g.glassBorder,
          transform: [{ scale: state.pressed ? 0.94 : 1 }],
        },
        webOnly({ cursor: busy ? "progress" : "pointer", transition: "background-color 160ms, border-color 160ms, transform 120ms" }),
      ]}
    >
      <Reanimated.View style={spinStyle}>
        <Icon name={icon} size={18} color={tint ?? g.text} />
      </Reanimated.View>
    </Pressable>
  );
}

export interface PrismScreenProps {
  title: string;
  /** Small caps line above the title (date, context…). */
  overline?: string;
  /** Line under the title. */
  subtitle?: React.ReactNode;
  /** Shows a back button (stack screens). */
  back?: boolean;
  actions?: React.ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  maxWidth?: number;
  children: React.ReactNode;
}

/**
 * Background, header (back · title · actions · refresh) and a centred column.
 * Pull-to-refresh on phones, a refresh button everywhere (a mouse cannot pull).
 */
export function PrismScreen({ title, overline, subtitle, back, actions, onRefresh, refreshing = false, maxWidth = 1120, children }: PrismScreenProps) {
  const g = useGlass();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // Tab screens leave room for the floating tab bar of the desktop build.
  const topPad = insets.top + (Platform.OS === "web" ? (back ? space.lg : 84) : space.lg);
  const [scrolled, setScrolled] = useState(false);

  const header = (
    <View style={{ flexDirection: "row", alignItems: "flex-end", gap: space.md }}>
      {back && (
        <View style={{ alignSelf: "center" }}>
          <ActionButton icon="ArrowLeft" label="Retour" onPress={() => (router.canGoBack() ? router.back() : router.replace("/" as never))} />
        </View>
      )}
      <View style={{ flex: 1, minWidth: 0 }}>
        {overline ? <GText variant="overline" tone="tertiary" numberOfLines={1}>{overline}</GText> : null}
        <GText variant={back && scrolled ? "title2" : "title1"} numberOfLines={1}>{title}</GText>
        {!(back && scrolled) && (typeof subtitle === "string" ? <GText variant="caption" tone="tertiary">{subtitle}</GText> : subtitle)}
      </View>
      <View style={{ flexDirection: "row", gap: space.sm, alignItems: "center" }}>
        {actions}
        {onRefresh && <ActionButton icon="Refresh" label="Actualiser" onPress={onRefresh} busy={refreshing} />}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: g.background }}>
      <Aurora />
      <ScrollView
        // Secondary screens keep their header (and back button) pinned while scrolling.
        stickyHeaderIndices={back ? [0] : undefined}
        onScroll={back ? e => setScrolled(e.nativeEvent.contentOffset.y > 12) : undefined}
        scrollEventThrottle={32}
        refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={g.textSecondary} /> : undefined}
        contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}
      >
        <View
          style={[
            { paddingTop: topPad, paddingBottom: back ? space.md : 0, paddingHorizontal: space.xl, zIndex: 5 },
            back && scrolled
              ? [
                { backgroundColor: g.dark ? "rgba(5,5,7,0.72)" : "rgba(244,244,246,0.78)", borderBottomWidth: 1, borderBottomColor: g.separator },
                webOnly({ backdropFilter: "blur(24px) saturate(160%)", WebkitBackdropFilter: "blur(24px) saturate(160%)" }),
              ]
              : null,
            webOnly({ transition: "background-color 200ms" }),
          ]}
        >
          <View style={{ width: "100%", maxWidth, alignSelf: "center" }}>{header}</View>
        </View>
        <View style={{ paddingHorizontal: space.xl, paddingTop: back ? space.md : space.xl }}>
          <View style={{ width: "100%", maxWidth, alignSelf: "center", gap: space.xl }}>{children}</View>
        </View>
      </ScrollView>
    </View>
  );
}

/** A glass card; with `onPress` it lifts on hover and dips on press. */
export function Card({
  children,
  onPress,
  padding = space.xl,
  style,
  tint,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  padding?: number;
  style?: StyleProp<ViewStyle>;
  tint?: string;
}) {
  const g = useGlass();
  if (!onPress) {
    return <GlassSurface padding={padding} radius={radius.lg} tint={tint} style={style}>{children}</GlassSurface>;
  }
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={state => [
        { borderRadius: radius.lg, transform: [{ scale: state.pressed ? 0.985 : 1 }] },
        webOnly({ cursor: "pointer", transition: "transform 140ms ease, filter 160ms" }),
        hovered(state) ? webOnly({ filter: g.dark ? "brightness(1.18)" : "brightness(1.03)" }) : null,
        style,
      ]}
    >
      <GlassSurface padding={padding} radius={radius.lg} tint={tint} style={{ flex: 1 }}>{children}</GlassSurface>
    </Pressable>
  );
}

/** Pill segmented control. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  scroll,
}: {
  options: { value: T; label: string; badge?: number }[];
  value: T | undefined;
  onChange: (value: T) => void;
  scroll?: boolean;
}) {
  const g = useGlass();
  const items = options.map(o => {
    const active = o.value === value;
    return (
      <Pressable
        key={o.value}
        onPress={() => onChange(o.value)}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        style={state => [
          {
            paddingHorizontal: space.md,
            height: 30,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            borderRadius: radius.pill,
            backgroundColor: active ? g.inverse : hovered(state) ? g.glassFillStrong : "transparent",
          },
          webOnly({ cursor: "pointer", transition: "background-color 160ms" }),
        ]}
      >
        <GText variant="caption" color={active ? g.onInverse : g.textSecondary}>{o.label}</GText>
        {o.badge ? (
          <View style={{ minWidth: 16, height: 16, paddingHorizontal: 4, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: active ? withAlpha(g.dark ? "#000000" : "#FFFFFF", 0.18) : withAlpha(accent, 0.25) }}>
            <GText variant="overline" color={active ? g.onInverse : g.text} style={{ fontSize: 10, letterSpacing: 0 }}>{o.badge}</GText>
          </View>
        ) : null}
      </Pressable>
    );
  });
  return (
    <GlassSurface radius={radius.pill} blur={false} style={{ alignSelf: "flex-start", maxWidth: "100%" }}>
      {scroll ? (
        // flexGrow 0: RN gives horizontal scroll views flexGrow 1, which on Android let
        // the pill bar grow to the screen height and push the whole page out of sight.
        <ScrollView horizontal style={{ flexGrow: 0 }} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 2, padding: 3 }}>{items}</ScrollView>
      ) : (
        <View style={{ flexDirection: "row", gap: 2, padding: 3, flexWrap: "wrap" }}>{items}</View>
      )}
    </GlassSurface>
  );
}

/** Shimmering placeholder block. */
export function Skeleton({ width = "100%", height = 14, radius: r = 7, style }: { width?: number | `${number}%`; height?: number; radius?: number; style?: StyleProp<ViewStyle> }) {
  const g = useGlass();
  const pulse = useSharedValue(0.5);
  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 900, easing: Easing.inOut(Easing.quad) }), -1, true);
  }, [pulse]);
  const animated = useAnimatedStyle(() => ({ opacity: pulse.value }));
  return <Reanimated.View style={[{ width, height, borderRadius: r, backgroundColor: g.glassFillStrong }, animated, style]} />;
}

/** A few skeleton cards while the first answer is on its way. */
export function SkeletonCards({ count = 3, lines = 3 }: { count?: number; lines?: number }) {
  return (
    <View style={{ gap: space.md }}>
      {Array.from({ length: count }).map((_, i) => (
        <GlassSurface key={i} padding={space.xl} radius={radius.lg} style={{ gap: space.md }}>
          <Skeleton width="40%" height={16} />
          {Array.from({ length: lines }).map((__, j) => <Skeleton key={j} width={j === lines - 1 ? "65%" : "100%"} height={11} />)}
        </GlassSurface>
      ))}
    </View>
  );
}

export function EmptyState({ icon, title, message, action, onAction }: { icon: IconName; title: string; message?: string; action?: string; onAction?: () => void }) {
  const g = useGlass();
  return (
    <GlassSurface padding={space.xxxl} radius={radius.lg} style={{ alignItems: "center", gap: space.sm }}>
      <View style={{ width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", backgroundColor: g.glassFillStrong, marginBottom: space.xs }}>
        <Icon name={icon} size={24} color={g.textSecondary} />
      </View>
      <GText variant="title3" align="center">{title}</GText>
      {message ? <GText variant="callout" tone="tertiary" align="center" style={{ maxWidth: 420 }}>{message}</GText> : null}
      {action && onAction ? (
        <Pressable onPress={onAction} style={[{ marginTop: space.sm, paddingHorizontal: space.lg, height: 34, borderRadius: radius.pill, justifyContent: "center", backgroundColor: g.inverse }, webOnly({ cursor: "pointer" })]}>
          <GText variant="caption" color={g.onInverse}>{action}</GText>
        </Pressable>
      ) : null}
    </GlassSurface>
  );
}

/** Banner for data shown from the offline copy, or a failed refresh. */
export function StatusNote({ tone = "info", text }: { tone?: "info" | "warning"; text: string }) {
  const g = useGlass();
  const color = tone === "warning" ? "#F5B841" : g.textTertiary;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm }}>
      <Icon name={tone === "warning" ? "AlertTriangle" : "Clock"} size={14} color={color} />
      <GText variant="caption" color={color} style={{ flex: 1 }}>{text}</GText>
    </View>
  );
}

/** Row inside a card: leading icon/dot, texts, trailing content, optional press. */
export function Row({
  leading,
  title,
  subtitle,
  trailing,
  onPress,
  first,
}: {
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  onPress?: () => void;
  first?: boolean;
}) {
  const g = useGlass();
  const body = (state?: PressableStateCallbackType) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: space.md,
        paddingVertical: space.md,
        paddingHorizontal: space.sm,
        marginHorizontal: -space.sm,
        borderRadius: radius.sm,
        borderTopWidth: first ? 0 : 1,
        borderTopColor: g.separator,
        backgroundColor: state && hovered(state) ? g.glassFill : "transparent",
      }}
    >
      {leading}
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        {typeof title === "string" ? <GText variant="callout" numberOfLines={2}>{title}</GText> : title}
        {typeof subtitle === "string" ? <GText variant="caption" tone="tertiary" numberOfLines={3}>{subtitle}</GText> : subtitle}
      </View>
      {trailing}
      {onPress ? <Icon name="ChevronRight" size={14} color={g.textTertiary} /> : null}
    </View>
  );
  if (!onPress) { return body(); }
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={webOnly({ cursor: "pointer" })}>
      {state => body(state)}
    </Pressable>
  );
}

/** Square-ish tile for hubs: icon in a tinted well, title, one line. */
export function Tile({ icon, title, subtitle, color, onPress, badge }: { icon: IconName; title: string; subtitle?: string; color: string; onPress: () => void; badge?: string }) {
  return (
    <Card onPress={onPress} padding={space.lg} style={{ flex: 1, minWidth: 0 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: withAlpha(color, 0.16), borderWidth: 1, borderColor: withAlpha(color, 0.28) }}>
          <Icon name={icon} size={19} color={color} />
        </View>
        {badge ? <GText variant="caption" color={color}>{badge}</GText> : null}
      </View>
      <GText variant="title3" style={{ marginTop: space.md }} numberOfLines={1}>{title}</GText>
      {subtitle ? <GText variant="caption" tone="tertiary" numberOfLines={2}>{subtitle}</GText> : null}
    </Card>
  );
}

/** Lays children out in `columns` equal columns (rows of cards). */
export function Grid({ columns, gap = space.md, children }: { columns: number; gap?: number; children: React.ReactNode[] }) {
  const list = React.Children.toArray(children);
  const rows: React.ReactNode[][] = [];
  for (let i = 0; i < list.length; i += columns) { rows.push(list.slice(i, i + columns)); }
  return (
    <View style={{ gap }}>
      {rows.map((row, i) => (
        <View key={i} style={{ flexDirection: "row", gap, alignItems: "stretch" }}>
          {row.map((child, j) => <View key={j} style={{ flex: 1, minWidth: 0 }}>{child}</View>)}
          {row.length < columns && Array.from({ length: columns - row.length }).map((_, k) => <View key={`pad-${k}`} style={{ flex: 1 }} />)}
        </View>
      ))}
    </View>
  );
}

/** Staggered fade-in for lists of cards. */
// Web: Reanimated's delayed entering can stall half-way inside nested views, so cards appear at once.
export const enter = (index: number) => (Platform.OS === "web" ? undefined : FadeInDown.duration(260).delay(Math.min(index, 8) * 35));

export function Spinner() {
  const g = useGlass();
  return <ActivityIndicator color={g.textSecondary} />;
}
