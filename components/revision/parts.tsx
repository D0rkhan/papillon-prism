import React from "react";
import { Pressable, TextInput, View } from "react-native";

import { MemoryState, retrievability } from "@/core/revision/fsrs";
import { aurora, GText, Icon, IconName, radius, semantic, space, useGlass, webOnly, withAlpha } from "@/ui/glass";

export const MUTED = "#8E8E9A";
const DAY = 24 * 3600 * 1000;

/** Memory → colour: green when solid, amber when fading, red when mostly gone. */
export const memoryColor = (r: number | null) =>
  r === null ? MUTED : r >= 0.85 ? semantic.success : r >= 0.65 ? aurora.cyan : r >= 0.45 ? semantic.warning : semantic.danger;

export const memoryLabel = (r: number | null) =>
  r === null ? "Jamais révisé" : r >= 0.85 ? "Bien ancré" : r >= 0.65 ? "Ça tient" : r >= 0.45 ? "S'efface" : "À reprendre";

export function nextReviewLabel(memory: MemoryState | undefined, now = Date.now()): string {
  if (!memory) { return "à démarrer"; }
  const days = Math.round((memory.due - now) / DAY);
  if (days <= 0) { return "à revoir aujourd'hui"; }
  if (days === 1) { return "rappel demain"; }
  return `rappel dans ${days} j`;
}

/** Thin memory gauge with its percentage. */
export function MemoryMeter({ memory, now = Date.now(), compact }: { memory: MemoryState | undefined; now?: number; compact?: boolean }) {
  const g = useGlass();
  const r = memory ? retrievability(memory, now) : null;
  const color = memoryColor(r);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm }}>
      <View style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: g.separator, overflow: "hidden" }}>
        <View style={{ width: `${Math.round((r ?? 0) * 100)}%`, height: 4, borderRadius: 2, backgroundColor: color }} />
      </View>
      <GText variant="caption" color={color} style={{ minWidth: compact ? 34 : 86, textAlign: "right" }}>
        {r === null ? (compact ? "—" : "jamais révisé") : `${Math.round(r * 100)} %`}
      </GText>
    </View>
  );
}

/** Solid pill button (primary action). */
export function PillButton({ label, onPress, icon, tone = "primary", disabled }: { label: string; onPress: () => void; icon?: IconName; tone?: "primary" | "secondary"; disabled?: boolean }) {
  const g = useGlass();
  const primary = tone === "primary";
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={state => [
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: space.sm,
          paddingHorizontal: space.lg,
          height: 42,
          borderRadius: radius.pill,
          backgroundColor: primary ? g.inverse : g.glassFillStrong,
          borderWidth: primary ? 0 : 1,
          borderColor: g.glassBorder,
          opacity: disabled ? 0.4 : state.pressed ? 0.8 : 1,
          transform: [{ scale: state.pressed ? 0.98 : 1 }],
        },
        webOnly({ cursor: disabled ? "default" : "pointer" }),
      ]}
    >
      {icon ? <Icon name={icon} size={16} color={primary ? g.onInverse : g.text} /> : null}
      <GText variant="callout" color={primary ? g.onInverse : g.text} style={{ fontFamily: "fixeltext-medium" }}>{label}</GText>
    </Pressable>
  );
}

export function Field({ value, onChangeText, placeholder, multiline, onSubmit, autoFocus }: { value: string; onChangeText: (v: string) => void; placeholder: string; multiline?: boolean; onSubmit?: () => void; autoFocus?: boolean }) {
  const g = useGlass();
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={g.textTertiary}
      multiline={multiline}
      autoFocus={autoFocus}
      onSubmitEditing={onSubmit}
      returnKeyType={multiline ? "default" : "done"}
      blurOnSubmit={!multiline}
      style={[
        {
          minHeight: multiline ? 72 : 42,
          paddingHorizontal: space.md,
          paddingVertical: multiline ? space.sm : 0,
          borderRadius: radius.md,
          backgroundColor: g.glassFillStrong,
          borderWidth: 1,
          borderColor: g.glassBorder,
          color: g.text,
          fontFamily: "fixeltext-regular",
          fontSize: 14,
          textAlignVertical: multiline ? "top" : "center",
        },
        webOnly({ outlineStyle: "none" }),
      ]}
    />
  );
}

/** Selectable pill (filters, choices). */
export function Choice({ label, selected, onPress, color = aurora.violet }: { label: string; selected: boolean; onPress: () => void; color?: string }) {
  const g = useGlass();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[{
        paddingHorizontal: space.md,
        height: 32,
        justifyContent: "center",
        borderRadius: radius.pill,
        backgroundColor: selected ? withAlpha(color, 0.18) : g.glassFill,
        borderWidth: 1,
        borderColor: selected ? withAlpha(color, 0.55) : g.glassBorder,
      }, webOnly({ cursor: "pointer" })]}
    >
      <GText variant="caption" color={selected ? color : g.textSecondary}>{label}</GText>
    </Pressable>
  );
}

export const dayLabel = (ms: number, now = Date.now()): string => {
  const start = (x: number) => { const d = new Date(x); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const days = Math.round((start(ms) - start(now)) / DAY);
  if (days === 0) { return "aujourd'hui"; }
  if (days === 1) { return "demain"; }
  if (days === -1) { return "hier"; }
  if (days > 1 && days < 7) { return new Date(ms).toLocaleDateString("fr-FR", { weekday: "long" }); }
  return new Date(ms).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
};
