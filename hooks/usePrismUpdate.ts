import Constants from "expo-constants";
import { useCallback, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

import { PRISM_UPDATE_REPO } from "@/constants/PrismUpdate";
import { warn } from "@/utils/logger/logger";
import { isNewer } from "@/utils/version";

export interface PrismRelease {
  version: string;
  apkUrl: string;
  pageUrl: string;
  notes: string;
  publishedAt: string;
}

export const currentVersion = (): string => Constants.expoConfig?.version ?? "0.0.0";

let cached: { at: number; release: PrismRelease | null } | null = null;
const CHECK_TTL_MS = 30 * 60 * 1000;

async function fetchLatest(): Promise<PrismRelease | null> {
  const res = await fetch(`https://api.github.com/repos/${PRISM_UPDATE_REPO}/releases/latest`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) { throw new Error(`GitHub ${res.status}`); }
  const json = await res.json();
  const apk = (json.assets ?? []).find((a: { name: string }) => a.name.endsWith(".apk"));
  if (!apk) { return null; }
  return {
    version: String(json.tag_name ?? "").replace(/^prism-v/, ""),
    apkUrl: apk.browser_download_url,
    pageUrl: json.html_url,
    notes: String(json.body ?? ""),
    publishedAt: json.published_at,
  };
}

/**
 * Android only: tells whether a newer APK is published, and opens it. Android
 * never installs an app silently: the download ends on the system installer,
 * where one tap on « Installer » updates Prism in place (data kept).
 */
export function usePrismUpdate() {
  const supported = Platform.OS === "android";
  const [release, setRelease] = useState<PrismRelease | null>(cached?.release ?? null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkedAt, setCheckedAt] = useState<number | null>(cached?.at ?? null);

  const check = useCallback(async (force = false) => {
    if (!supported) { return; }
    if (!force && cached && Date.now() - cached.at < CHECK_TTL_MS) {
      setRelease(cached.release);
      setCheckedAt(cached.at);
      return;
    }
    setChecking(true);
    setError(null);
    try {
      const latest = await fetchLatest();
      cached = { at: Date.now(), release: latest };
      setRelease(latest);
      setCheckedAt(cached.at);
    } catch (e) {
      warn(String(e), "usePrismUpdate");
      setError("Impossible de vérifier les mises à jour (pas de connexion ?)");
    } finally {
      setChecking(false);
    }
  }, [supported]);

  useEffect(() => { check(); }, [check]);

  const available = !!release && isNewer(release.version, currentVersion());
  const install = useCallback(() => {
    if (release) { Linking.openURL(release.apkUrl); }
  }, [release]);

  return { supported, available, release, checking, error, checkedAt, check, install, current: currentVersion() };
}
