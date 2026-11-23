import {
  DarkTheme as NativeDarkTheme,
  DefaultTheme as NativeDefaultTheme,
} from "expo-router/react-navigation";
import { Platform } from "react-native";
import { getDynamicColorScheme } from "react-native-dynamic-theme";

const FALLBACK_COLORS = {
  // Papillon Prism palette (see ui/glass/tokens.ts): deep ink background, violet accent.
  light: {
    primary: "#A855F7",
    tint: "#A855F7",
    background: "#F3F4FB",
    overground: "#EBEDF7",
    text: "#0B0B14",
    card: "#FFFFFF",
    item: "#FFFFFF",
  },
  dark: {
    primary: "#A855F7",
    tint: "#A855F7",
    background: "#07070C",
    overground: "#07070C",
    text: "#F5F5FA",
    card: "#12121B",
    item: "#151521",
  },
};

const isMaterialYouAvailable =
  Platform.OS === "android" && typeof Platform.Version === "number" && Platform.Version >= 31;

function getThemeColors(useMaterialYou: boolean) {
  if (useMaterialYou && isMaterialYouAvailable) {
    const scheme = getDynamicColorScheme('#A855F7');
    return {
      light: {
        primary: scheme.light.primary,
        tint: scheme.light.primary,
        background: scheme.light.surfaceContainer,
        overground: scheme.light.surfaceContainer,
        text: scheme.light.onBackground,
        card: scheme.light.surfaceDim,
        item: scheme.light.surfaceContainerLowest,
      },
      dark: {
        primary: scheme.dark.primaryContainer,
        tint: scheme.dark.primary,
        background: scheme.dark.background,
        overground: scheme.dark.background,
        text: scheme.dark.onBackground,
        card: scheme.dark.surfaceContainer,
        item: scheme.dark.surfaceContainer,
      },
    };
  }

  return FALLBACK_COLORS;
}

export function createDefaultTheme(useMaterialYou: boolean, primaryColor: string) {
  const colors = getThemeColors(useMaterialYou);

  return {
    ...NativeDefaultTheme,
    colors: {
      ...NativeDefaultTheme.colors,
      primary: useMaterialYou ? colors.light.primary : (primaryColor || colors.light.primary),
      tint: useMaterialYou ? colors.light.tint : (primaryColor || colors.light.tint),
      background: colors.light.background,
      overground: colors.light.overground,
      text: colors.light.text,
      card: colors.light.card,
      item: colors.light.item,
    },
  };
}

export function createDarkTheme(useMaterialYou: boolean, primaryColor: string) {
  const colors = getThemeColors(useMaterialYou);

  return {
    ...NativeDarkTheme,
    colors: {
      ...NativeDarkTheme.colors,
      primary: useMaterialYou ? colors.dark.primary : (primaryColor || colors.dark.primary),
      tint: useMaterialYou ? colors.dark.tint : (primaryColor || colors.dark.tint),
      background: colors.dark.background,
      overground: colors.dark.overground,
      text: colors.dark.text,
      card: colors.dark.card,
      item: colors.dark.item,
    },
  };
}
