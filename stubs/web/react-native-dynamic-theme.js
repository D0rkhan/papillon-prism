/** Web / desktop: Material You does not exist; Theme.ts never calls this off Android ≥ 12. */
const scheme = color => ({
  primary: color, primaryContainer: color, surfaceContainer: "#F3F6F7", surfaceDim: "#FFFFFF",
  surfaceContainerLowest: "#FFFFFF", onBackground: "#000000", background: "#FFFFFF",
});
exports.__esModule = true;
exports.getDynamicColorScheme = (seed = "#29947A") => ({ light: scheme(seed), dark: { ...scheme(seed), surfaceContainer: "#121212", onBackground: "#FFFFFF", background: "#000000" } });
