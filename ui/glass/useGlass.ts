import { useTheme } from "expo-router/react-navigation";

import { GlassPalette, palettes } from "./tokens";

/**
 * Current Obsidian Glass palette. Prism is dark-first: the light palette is only used
 * when the user explicitly chose the light theme.
 */
export function useGlass(): GlassPalette & { tint: string } {
  const theme = useTheme();
  const palette = theme.dark ? palettes.dark : palettes.light;
  return { ...palette, tint: String(theme.colors.primary) };
}
