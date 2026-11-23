// Serves the web build with a single-page-app fallback (any unknown path → index.html).
// Usage: node desktop/serve.mjs [dir=dist-web] [port=8092]
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "dist-web");
const port = Number(process.argv[3] ?? 8092);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ttf": "font/ttf", ".otf": "font/otf", ".woff2": "font/woff2", ".ico": "image/x-icon", ".wasm": "application/wasm", ".lottie": "application/zip" };

createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, path);
  if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) { file = join(root, "index.html"); }
  res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`Papillon Prism web → http://127.0.0.1:${port}`));
