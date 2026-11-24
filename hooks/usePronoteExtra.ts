import type { SessionHandle } from "@blockshub/pawnote-lts";
import { useCallback, useEffect, useRef, useState } from "react";
import { createMMKV } from "react-native-mmkv";

import { subscribeManagerUpdate, getManager, type AccountManager } from "@/services/shared";
import type { Pronote } from "@/services/pronote";
import { Capabilities } from "@/services/shared/types";
import { useAccountStore } from "@/stores/account";
import { Services } from "@/stores/account/types";
import { warn } from "@/utils/logger/logger";

const cache = createMMKV({ id: "pronote-extras-cache" });

function readCache<T>(key: string): { value: T; at: number } | null {
  const raw = cache.getString(key);
  if (!raw) { return null; }
  try {
    return JSON.parse(raw);
  } catch {
    cache.remove(key);
    return null;
  }
}

/** The live PRONOTE client of the current account, if it is connected. */
export function getPronoteClient(manager: AccountManager | null = getManager(true)): Pronote | undefined {
  return manager
    ?.getAvailableClients(Capabilities.REFRESH)
    .find(client => client.service === Services.PRONOTE) as Pronote | undefined;
}

/** Whether the current account has a PRONOTE service at all (connected or not). */
export function useHasPronote(): boolean {
  return useAccountStore(state => {
    const account = state.accounts.find(a => a.id === state.lastUsedAccount);
    return !!account?.services.some(s => s.serviceId === Services.PRONOTE);
  });
}

export interface PronoteExtraResult<T> {
  data: T | undefined;
  /** When the shown data was fetched (ms), undefined before the first answer. */
  fetchedAt?: number;
  loading: boolean;
  error: Error | null;
  /** True while the shown data comes from the offline cache. */
  stale: boolean;
  refresh: () => Promise<void>;
}

/**
 * Fetches a PRONOTE-only resource and keeps the last answer per `key` for
 * offline use. Re-fetches whenever the account manager syncs again.
 * `key` null disables the request (e.g. no period chosen yet).
 */
export function usePronoteExtra<T>(
  key: string | null,
  request: (session: SessionHandle) => Promise<T>
): PronoteExtraResult<T> {
  const accountId = useAccountStore(state => state.lastUsedAccount);
  const fullKey = key ? `${accountId}:${key}` : null;
  const cached = fullKey ? readCache<T>(fullKey) : null;

  const [data, setData] = useState<T | undefined>(cached?.value);
  const [fetchedAt, setFetchedAt] = useState<number | undefined>(cached?.at);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(true);

  const requestRef = useRef(request);
  requestRef.current = request;
  const keyRef = useRef(fullKey);
  keyRef.current = fullKey;

  // Switching key shows that key's cache straight away.
  useEffect(() => {
    const entry = fullKey ? readCache<T>(fullKey) : null;
    setData(entry?.value);
    setFetchedAt(entry?.at);
    setStale(true);
    setError(null);
  }, [fullKey]);

  const run = useCallback(async (manager: AccountManager | null) => {
    const target = keyRef.current;
    if (!target) { return; }
    const client = getPronoteClient(manager);
    if (!client) { return; } // Not connected yet: the cache stays on screen.
    setLoading(true);
    try {
      const value = await client.run(requestRef.current);
      if (keyRef.current !== target) { return; }
      const at = Date.now();
      cache.set(target, JSON.stringify({ value, at }));
      setData(value);
      setFetchedAt(at);
      setStale(false);
      setError(null);
    } catch (e) {
      if (keyRef.current !== target) { return; }
      warn(String(e), "usePronoteExtra");
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      if (keyRef.current === target) { setLoading(false); }
    }
  }, []);

  useEffect(() => {
    if (!fullKey) { return; }
    let lastRevision = -1;
    let lastManager: AccountManager | null = null;
    return subscribeManagerUpdate(manager => {
      if (!manager || (manager === lastManager && manager.revision === lastRevision)) { return; }
      lastManager = manager;
      lastRevision = manager.revision;
      run(manager);
    });
  }, [fullKey, run]);

  const refresh = useCallback(() => run(getManager(true)), [run]);

  return { data, fetchedAt, loading, error, stale, refresh };
}
