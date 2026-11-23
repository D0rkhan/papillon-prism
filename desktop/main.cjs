// Papillon Prism — Linux desktop shell.
//
// Serves the Expo web build from a private `prism://app` origin and gives the web app
// what a browser cannot: school-service requests without CORS, with full control over
// cookies and redirects (through Node's fetch in this main process).
const { app, BrowserWindow, ipcMain, protocol, session, shell } = require("electron");
const fs = require("node:fs");
const path = require("node:path");

const APP_DIR = path.join(__dirname, "app");
const ORIGIN = "prism://app";

protocol.registerSchemesAsPrivileged([
  { scheme: "prism", privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
]);

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ttf": "font/ttf", ".otf": "font/otf",
  ".woff2": "font/woff2", ".ico": "image/x-icon", ".wasm": "application/wasm", ".lottie": "application/zip",
  ".mp4": "video/mp4", ".gif": "image/gif", ".webp": "image/webp",
};

/** prism://app/<path> → file in APP_DIR, with single-page-app fallback to index.html. */
function serveApp(request) {
  const url = new URL(request.url);
  const rel = path.normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, "");
  let file = path.join(APP_DIR, rel);
  if (!file.startsWith(APP_DIR) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(APP_DIR, "index.html");
  }
  const type = MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  return new Response(fs.readFileSync(file), { headers: { "Content-Type": type } });
}

/**
 * Network proxy for school services. Only http(s) to the outside world; a hard timeout
 * so a dead server never freezes a session; Set-Cookie values all preserved.
 */
async function proxyFetch(_event, req) {
  const target = new URL(req.url);
  if (target.protocol !== "https:" && target.protocol !== "http:") {
    throw new Error(`Protocole refusé : ${target.protocol}`);
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Math.min(req.timeoutMs ?? 60000, 120000));
  try {
    const res = await fetch(target, {
      method: req.method ?? "GET",
      headers: req.headers ?? {},
      body: req.method && req.method !== "GET" && req.method !== "HEAD"
        ? (req.bodyBase64 ? Buffer.from(req.bodyBase64, "base64") : req.body)
        : undefined,
      redirect: req.redirect ?? "follow",
      signal: controller.signal,
    });
    const headers = {};
    res.headers.forEach((value, key) => { headers[key.toLowerCase()] = value; });
    const cookies = typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie() : [];
    if (cookies.length) { headers["set-cookie"] = cookies.join(", "); }
    // Base64 so binary bodies (images, PDFs) survive the trip to the renderer.
    const bodyBase64 = Buffer.from(await res.arrayBuffer()).toString("base64");
    return { status: res.status, bodyBase64, headers, url: res.url };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Opens a separate, isolated window for a school login page (ENT / CAS). Resolves with
 * the final URL and its cookies once the URL matches `doneUrlPattern`, or null if the
 * user closes the window.
 */
function loginWindow(event, { url, userAgent, doneUrlPattern }) {
  return new Promise(resolve => {
    const partition = `login-${Date.now()}`;
    const win = new BrowserWindow({
      width: 480,
      height: 760,
      parent: BrowserWindow.fromWebContents(event.sender) ?? undefined,
      modal: true,
      autoHideMenuBar: true,
      title: "Connexion",
      webPreferences: { partition, sandbox: true, contextIsolation: true, nodeIntegration: false },
    });
    if (userAgent) { win.webContents.setUserAgent(userAgent); }
    const pattern = doneUrlPattern ? new RegExp(doneUrlPattern) : null;
    let settled = false;
    const finish = async target => {
      if (settled) { return; }
      settled = true;
      const cookies = (await session.fromPartition(partition).cookies.get({ url: target })).map(c => `${c.name}=${c.value}`);
      resolve({ url: target, cookies });
      win.close();
    };
    const check = (_e, target) => { if (pattern && pattern.test(target)) { finish(target); } };
    win.webContents.on("did-navigate", check);
    win.webContents.on("did-redirect-navigation", check);
    win.webContents.on("will-redirect", check);
    win.on("closed", () => { if (!settled) { settled = true; resolve(null); } });
    win.loadURL(url);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 380,
    minHeight: 600,
    backgroundColor: "#07070C",
    title: "Papillon Prism",
    autoHideMenuBar: true,
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      spellcheck: false,
      // Login pages (ENT / CAS / PRONOTE) are shown in <webview> tags, see
      // stubs/web/react-native-webview.tsx. Locked down in will-attach-webview below.
      webviewTag: true,
    },
  });

  // Every <webview>: our message-bridge preload only, no Node, web pages only.
  win.webContents.on("will-attach-webview", (event, webPreferences, params) => {
    if (!/^(https?:|about:blank)/.test(params.src ?? "")) { event.preventDefault(); return; }
    delete webPreferences.preloadURL;
    webPreferences.preload = path.join(__dirname, "webview-preload.cjs");
    webPreferences.nodeIntegration = false;
    webPreferences.contextIsolation = true;
    webPreferences.sandbox = true;
  });
  // Pop-ups opened by a login page are loaded in that same view (what the mobile app does).
  win.webContents.on("did-attach-webview", (_event, contents) => {
    contents.setWindowOpenHandler(({ url }) => {
      if (/^https?:/.test(url)) { contents.loadURL(url); }
      return { action: "deny" };
    });
  });

  // Links to the outside world open in the user's browser, never inside the app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) { shell.openExternal(url); }
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith(ORIGIN)) { e.preventDefault(); if (/^https?:/.test(url)) { shell.openExternal(url); } }
  });

  win.loadURL(`${ORIGIN}/`);
}

app.whenReady().then(() => {
  protocol.handle("prism", serveApp);
  ipcMain.handle("prism:fetch", proxyFetch);
  ipcMain.handle("prism:login-window", loginWindow);
  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) { createWindow(); } });
});

app.on("window-all-closed", () => { if (process.platform !== "darwin") { app.quit(); } });

