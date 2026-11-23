// Silence known, non-actionable warnings/errors at the console level (not just
// the in-app LogBox overlay) so they don't spam the Metro terminal output.
const SILENCED_LOG_PATTERNS = [
  "is missing the required default export",
  "Found screens with the same name nested inside one another",
  "Linking found multiple possible URI schemes",
  "You must pass your PostHog project's api key",
  "i18next is made possible by our own product, Locize",
  // expo-router 58 preview bug: native tabs preload, router rejects it. Dev-only.
  "The action 'PRELOAD' with payload",
  // From react-native-gesture-handler's legacy exports, not our code.
  "DrawerLayoutAndroid is deprecated",
  // Fabric perf advice on translucent shadowed views, not actionable per-view.
  "cannot calculate shadow efficiently",
];

const shouldSilence = (args) =>
  typeof args[0] === "string" &&
  SILENCED_LOG_PATTERNS.some((pattern) => args[0].includes(pattern));

const originalWarn = console.warn;
console.warn = (...args) => {
  if (shouldSilence(args)) return;
  originalWarn(...args);
};

const originalError = console.error;
console.error = (...args) => {
  if (shouldSilence(args)) return;
  originalError(...args);
};

const originalLog = console.log;
console.log = (...args) => {
  if (shouldSilence(args)) return;
  originalLog(...args);
};

const originalInfo = console.info;
console.info = (...args) => {
  if (shouldSilence(args)) return;
  originalInfo(...args);
};

// Web / Linux desktop: Skia draws through CanvasKit (WebAssembly), which must be loaded
// before any screen renders. Native platforms start right away.
if (typeof document !== "undefined") {
  // Prism look for native form controls on web/desktop (no default yellow focus ring).
  const style = document.createElement("style");
  style.textContent =
    "input:focus,textarea:focus{outline:2px solid #A855F7!important;outline-offset:-2px;border-radius:10px}" +
    "::selection{background:rgba(168,85,247,.35)}" +
    "*{scrollbar-width:thin;scrollbar-color:rgba(168,85,247,.45) transparent}";
  document.head.appendChild(style);
  // Desktop app: school-service requests go through the Electron shell (no CORS).
  require("./utils/desktop/bridge").installDesktopFetch();
  require("@shopify/react-native-skia/lib/module/web")
    .LoadSkiaWeb({ locateFile: () => "/canvaskit.wasm" })
    .catch((e) => console.error("[skia] CanvasKit failed to load", e))
    .finally(() => require("expo-router/entry"));
} else {
  require("expo-router/entry");
}
