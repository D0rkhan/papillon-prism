// Runs inside login pages shown in a <webview>: gives them the same message channel
// as react-native-webview (window.ReactNativeWebView.postMessage) — and nothing else.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ReactNativeWebView", {
  postMessage: data => ipcRenderer.sendToHost("rnwv-message", String(data)),
});
