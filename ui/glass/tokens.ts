/**
 * Papillon Prism — "Obsidian Glass" design tokens.
 * Near-black canvas, barely-there glass, one accent used sparingly, quiet type.
 * One source of truth for colours, materials, radii, spacing, type and motion.
 */

/** Restrained accent family (used for data, focus and highlights — never as wallpaper). */
export const aurora = {
  indigo: "#6E6AF6",
  violet: "#8B7CFF",
  cyan: "#5AB8FF",
  pink: "#F2709C",
  mint: "#3DDC97",
  amber: "#F5B841",
} as const;

export const accent = aurora.violet;

export const semantic = {
  success: "#3DDC97",
  warning: "#F5B841",
  danger: "#FF5C7A",
  info: "#5AB8FF",
} as const;

export interface GlassPalette {
  dark: boolean;
  background: string;
  backgroundDeep: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  glassFill: string;
  glassFillStrong: string;
  glassBorder: string;
  glassHighlight: string;
  glassShadow: string;
  separator: string;
  blurType: "dark" | "light";
  blurAmount: number;
  auroraOpacity: number;
  /** Solid fills for primary actions (white on dark, ink on light). */
  inverse: string;
  onInverse: string;
}

export const palettes: { dark: GlassPalette; light: GlassPalette } = {
  dark: {
    dark: true,
    background: "#050507",
    backgroundDeep: "#000000",
    text: "#EDEDF2",
    textSecondary: "rgba(237,237,242,0.58)",
    textTertiary: "rgba(237,237,242,0.34)",
    glassFill: "rgba(255,255,255,0.035)",
    glassFillStrong: "rgba(255,255,255,0.07)",
    glassBorder: "rgba(255,255,255,0.08)",
    glassHighlight: "rgba(255,255,255,0.09)",
    glassShadow: "rgba(0,0,0,0.55)",
    separator: "rgba(255,255,255,0.06)",
    blurType: "dark",
    blurAmount: 40,
    auroraOpacity: 1,
    inverse: "#F2F2F5",
    onInverse: "#0A0A0C",
  },
  light: {
    dark: false,
    background: "#F4F4F6",
    backgroundDeep: "#EAEAEE",
    text: "#0B0B10",
    textSecondary: "rgba(11,11,16,0.6)",
    textTertiary: "rgba(11,11,16,0.38)",
    glassFill: "rgba(255,255,255,0.6)",
    glassFillStrong: "rgba(255,255,255,0.8)",
    glassBorder: "rgba(11,11,16,0.08)",
    glassHighlight: "rgba(255,255,255,0.9)",
    glassShadow: "rgba(20,20,40,0.08)",
    separator: "rgba(11,11,16,0.07)",
    blurType: "light",
    blurAmount: 30,
    auroraOpacity: 0.6,
    inverse: "#0B0B10",
    onInverse: "#F4F4F6",
  },
};

export const radius = { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, pill: 999 } as const;
export const space = { xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 } as const;

export const type = {
  display: { size: 48, line: 52, weight: "semibold" },
  title1: { size: 28, line: 34, weight: "semibold" },
  title2: { size: 20, line: 26, weight: "semibold" },
  title3: { size: 16, line: 22, weight: "medium" },
  body: { size: 14, line: 20, weight: "regular" },
  callout: { size: 13, line: 18, weight: "regular" },
  caption: { size: 12, line: 16, weight: "medium" },
  overline: { size: 11, line: 14, weight: "semibold" },
} as const;
export type TypeVariant = keyof typeof type;

export const motion = {
  spring: { damping: 20, stiffness: 260, mass: 0.8 },
  springSoft: { damping: 22, stiffness: 120, mass: 1 },
  auroraPeriodMs: 26000,
} as const;

/** Grade /20 → colour: calm blue-violet scale, red only when it matters. */
export function gradeColor(value: number): string {
  if (!Number.isFinite(value)) { return "rgba(237,237,242,0.58)"; }
  if (value >= 16) { return semantic.success; }
  if (value >= 13) { return aurora.cyan; }
  if (value >= 10) { return semantic.warning; }
  return semantic.danger;
}

/** Probability → colour. */
export function probabilityColor(p: number): string {
  if (p >= 0.7) { return semantic.success; }
  if (p >= 0.4) { return aurora.cyan; }
  if (p >= 0.15) { return semantic.warning; }
  return semantic.danger;
}

export const withAlpha = (hex: string, alpha: number): string => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
};
