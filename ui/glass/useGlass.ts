import { useTheme } from "expo-router/react-navigation";

import { GlassPalette, palettes } from "./tokens";

/** Current Liquid Glass palette, following the app's light/dark theme. */
export function useGlass(): GlassPalette & { tint: string } {
  const theme = useTheme();
  const palette = theme.dark ? palettes.dark : palettes.light;
  return { ...palette, tint: String(theme.colors.primary) };
}
