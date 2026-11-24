// Exposes a minimal, typed bridge to the web app (see utils/desktop/bridge.ts).
// The renderer stays sandboxed: no Node, no direct IPC.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("prismDesktop", {
  platform: process.platform,
  version: process.versions.electron,
  fetch: request => ipcRenderer.invoke("prism:fetch", request),
  openLoginWindow: options => ipcRenderer.invoke("prism:login-window", options),
  secret: {
    get: key => ipcRenderer.invoke("prism:secret-get", key),
    set: (key, value) => ipcRenderer.invoke("prism:secret-set", key, value),
    remove: key => ipcRenderer.invoke("prism:secret-remove", key),
  },
});
