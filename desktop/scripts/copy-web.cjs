// Copies the Expo web export (../dist-web) into desktop/app, where Electron serves it.
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const from = path.join(root, "dist-web");
const to = path.join(root, "desktop", "app");

if (!fs.existsSync(path.join(from, "index.html"))) {
  console.error("dist-web/index.html introuvable : lance d'abord `npx expo export --platform web --output-dir dist-web`.");
  process.exit(1);
}
fs.rmSync(to, { recursive: true, force: true });
fs.cpSync(from, to, { recursive: true });

// CanvasKit (Skia on the web) must sit next to index.html.
const wasm = path.join(root, "node_modules", "canvaskit-wasm", "bin", "full", "canvaskit.wasm");
if (fs.existsSync(wasm)) { fs.copyFileSync(wasm, path.join(to, "canvaskit.wasm")); }

// App icon for the Linux package.
const icon = path.join(root, "assets", "images", "icon.png");
if (fs.existsSync(icon)) { fs.copyFileSync(icon, path.join(root, "desktop", "icon.png")); }

console.log(`Web build copied to ${path.relative(root, to)}`);
