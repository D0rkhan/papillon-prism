/**
 * Papillon Prism — Liquid Glass design tokens.
 * One source of truth for colours, glass materials, radii, spacing, type and motion.
 */

export const aurora = {
  indigo: "#5B5BF7",
  violet: "#A855F7",
  cyan: "#22D3EE",
  pink: "#F472B6",
  mint: "#34D399",
  amber: "#FBBF24",
} as const;

export const semantic = {
  success: "#34D399",
  warning: "#FBBF24",
  danger: "#FB7185",
  info: "#60A5FA",
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
}

export const palettes: { dark: GlassPalette; light: GlassPalette } = {
  dark: {
    dark: true,
    background: "#07070C",
    backgroundDeep: "#030306",
    text: "#F5F5FA",
    textSecondary: "rgba(235,235,245,0.64)",
    textTertiary: "rgba(235,235,245,0.38)",
    glassFill: "rgba(255,255,255,0.06)",
    glassFillStrong: "rgba(255,255,255,0.11)",
    glassBorder: "rgba(255,255,255,0.14)",
    glassHighlight: "rgba(255,255,255,0.32)",
    glassShadow: "rgba(0,0,0,0.45)",
    separator: "rgba(255,255,255,0.08)",
    blurType: "dark",
    blurAmount: 28,
    auroraOpacity: 0.55,
  },
  light: {
    dark: false,
    background: "#F3F4FB",
    backgroundDeep: "#E9EBF7",
    text: "#0B0B14",
    textSecondary: "rgba(20,20,40,0.62)",
    textTertiary: "rgba(20,20,40,0.4)",
    glassFill: "rgba(255,255,255,0.52)",
    glassFillStrong: "rgba(255,255,255,0.72)",
    glassBorder: "rgba(255,255,255,0.75)",
    glassHighlight: "rgba(255,255,255,0.95)",
    glassShadow: "rgba(40,40,90,0.14)",
    separator: "rgba(20,20,40,0.08)",
    blurType: "light",
    blurAmount: 24,
    auroraOpacity: 0.42,
  },
};

export const radius = { xs: 8, sm: 12, md: 18, lg: 24, xl: 32, pill: 999 } as const;
export const space = { xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 } as const;

export const type = {
  display: { size: 56, line: 60, weight: "bold" },
  title1: { size: 30, line: 36, weight: "bold" },
  title2: { size: 22, line: 28, weight: "bold" },
  title3: { size: 18, line: 24, weight: "semibold" },
  body: { size: 15, line: 21, weight: "medium" },
  callout: { size: 14, line: 19, weight: "medium" },
  caption: { size: 12, line: 16, weight: "semibold" },
  overline: { size: 11, line: 14, weight: "bold" },
} as const;
export type TypeVariant = keyof typeof type;

export const motion = {
  spring: { damping: 18, stiffness: 180, mass: 0.9 },
  springSoft: { damping: 22, stiffness: 120, mass: 1 },
  auroraPeriodMs: 18000,
} as const;

/** Grade /20 → colour, continuous from danger (≤ 8) through warning to success (≥ 16). */
export function gradeColor(value: number): string {
  if (!Number.isFinite(value)) { return semantic.info; }
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
