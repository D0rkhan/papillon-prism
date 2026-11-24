// Web / Linux desktop: Skia draws through CanvasKit (WebAssembly), which must be loaded
// before any screen renders. Kept in a .web.js file so the native bundle never sees it.
if (typeof document !== "undefined") {
  // Prism look for native form controls on web/desktop (no default yellow focus ring).
  const style = document.createElement("style");
  style.textContent =
    "input:focus,textarea:focus{outline:2px solid #A855F7!important;outline-offset:-2px;border-radius:10px}" +
    "::selection{background:rgba(168,85,247,.35)}" +
    "*{scrollbar-width:thin;scrollbar-color:rgba(168,85,247,.45) transparent}";
  document.head.appendChild(style);
  // Desktop app: school-service requests go through the Electron shell (no CORS).
  require("../desktop/bridge").installDesktopFetch();
}
require("@shopify/react-native-skia/lib/module/web")
  .LoadSkiaWeb({ locateFile: () => "/canvaskit.wasm" })
  .catch((e) => console.error("[skia] CanvasKit failed to load", e))
  .finally(() => require("expo-router/entry"));
