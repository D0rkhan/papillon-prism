/**
 * Web / Linux desktop implementation of react-native-webview, built on Electron's
 * <webview> tag. It keeps the API the onboarding screens rely on:
 *   props  source.uri, userAgent, incognito, injectedJavaScript,
 *          injectedJavaScriptBeforeContentLoaded, onMessage, onLoadStart, onLoadEnd,
 *          onLoadProgress, onNavigationStateChange, onError, onOpenWindow, style
 *   ref    injectJavaScript, stopLoading, reload, goBack, goForward
 * Pages talk back with window.ReactNativeWebView.postMessage, provided by
 * desktop/webview-preload.cjs. Pop-ups are reopened in the same view by the shell.
 * In a plain browser (no Electron) it explains that logging in needs the desktop app.
 */
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { Text, View, ViewStyle } from "react-native";

type NativeEvent<T> = { nativeEvent: T };
type NavState = { url: string; title: string; loading: boolean; canGoBack: boolean; canGoForward: boolean };

export interface WebViewProps {
  source?: { uri?: string; html?: string };
  userAgent?: string;
  incognito?: boolean;
  injectedJavaScript?: string;
  injectedJavaScriptBeforeContentLoaded?: string;
  onMessage?: (e: NativeEvent<{ data: string; url: string }>) => void;
  onLoadStart?: (e: NativeEvent<NavState>) => void;
  onLoadEnd?: (e: NativeEvent<NavState>) => void;
  onLoad?: (e: NativeEvent<NavState>) => void;
  onLoadProgress?: (e: NativeEvent<NavState & { progress: number }>) => void;
  onNavigationStateChange?: (e: NavState) => void;
  onError?: (e: NativeEvent<NavState & { code: number; description: string }>) => void;
  onOpenWindow?: (e: NativeEvent<{ targetUrl: string }>) => void;
  style?: ViewStyle | ViewStyle[];
}

export interface WebViewHandle {
  injectJavaScript: (script: string) => void;
  stopLoading: () => void;
  reload: () => void;
  goBack: () => void;
  goForward: () => void;
}

interface ElectronWebviewElement extends HTMLElement {
  executeJavaScript: (code: string) => Promise<unknown>;
  getURL: () => string;
  getTitle: () => string;
  isLoading: () => boolean;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
  stop: () => void;
  reload: () => void;
  goBack: () => void;
  goForward: () => void;
}

const isElectron = () =>
  typeof window !== "undefined" && !!(window as unknown as { prismDesktop?: unknown }).prismDesktop;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WebView = forwardRef<WebViewHandle, WebViewProps & { [key: string]: any }>(function WebView(props, ref) {
  const el = useRef<ElectronWebviewElement | null>(null);
  const latest = useRef(props);
  latest.current = props;
  const partition = useMemo(() => (props.incognito ? `webview-${Date.now()}` : "persist:webview"), [props.incognito]);

  const state = (): NavState => {
    const w = el.current;
    return {
      url: w?.getURL?.() ?? "",
      title: w?.getTitle?.() ?? "",
      loading: w?.isLoading?.() ?? false,
      canGoBack: w?.canGoBack?.() ?? false,
      canGoForward: w?.canGoForward?.() ?? false,
    };
  };

  useImperativeHandle(ref, () => ({
    injectJavaScript: script => { el.current?.executeJavaScript(script).catch(() => undefined); },
    stopLoading: () => el.current?.stop(),
    reload: () => el.current?.reload(),
    goBack: () => el.current?.goBack(),
    goForward: () => el.current?.goForward(),
  }), []);

  useEffect(() => {
    const w = el.current;
    if (!w) { return; }
    const run = (code?: string) => { if (code) { w.executeJavaScript(code).catch(() => undefined); } };
    const handlers: [string, (e: any) => void][] = [
      ["did-start-loading", () => {
        const s = state();
        latest.current.onLoadStart?.({ nativeEvent: s });
        latest.current.onLoadProgress?.({ nativeEvent: { ...s, progress: 0.1 } });
      }],
      ["dom-ready", () => run(latest.current.injectedJavaScriptBeforeContentLoaded)],
      ["did-finish-load", () => {
        run(latest.current.injectedJavaScript);
        const s = { ...state(), loading: false };
        latest.current.onLoadProgress?.({ nativeEvent: { ...s, progress: 1 } });
        latest.current.onLoad?.({ nativeEvent: s });
        latest.current.onLoadEnd?.({ nativeEvent: s });
        latest.current.onNavigationStateChange?.(s);
      }],
      ["did-fail-load", (e: { errorCode: number; errorDescription: string; isMainFrame: boolean }) => {
        if (!e.isMainFrame || e.errorCode === -3) { return; } // -3: aborted by a redirect
        const s = state();
        latest.current.onError?.({ nativeEvent: { ...s, code: e.errorCode, description: e.errorDescription } });
        latest.current.onLoadEnd?.({ nativeEvent: s });
      }],
      ["did-navigate", () => latest.current.onNavigationStateChange?.(state())],
      ["did-navigate-in-page", () => latest.current.onNavigationStateChange?.(state())],
      ["ipc-message", (e: { channel: string; args: unknown[] }) => {
        if (e.channel === "rnwv-message") {
          latest.current.onMessage?.({ nativeEvent: { data: String(e.args[0]), url: w.getURL() } });
        }
      }],
    ];
    for (const [name, fn] of handlers) { w.addEventListener(name, fn); }
    return () => { for (const [name, fn] of handlers) { w.removeEventListener(name, fn); } };
  }, []);

  if (!isElectron()) {
    return (
      <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }, props.style as ViewStyle]}>
        <Text style={{ textAlign: "center", opacity: 0.7 }}>
          La connexion à l'établissement nécessite l'application de bureau Papillon Prism (ou l'app Android).
        </Text>
      </View>
    );
  }

  return (
    <View style={[{ flex: 1 }, props.style as ViewStyle]}>
      {React.createElement("webview", {
        ref: el,
        src: props.source?.uri ?? "about:blank",
        partition,
        useragent: props.userAgent,
        style: { display: "flex", flex: 1, width: "100%", height: "100%", border: 0 },
      })}
    </View>
  );
});

export default WebView;
export { WebView };
