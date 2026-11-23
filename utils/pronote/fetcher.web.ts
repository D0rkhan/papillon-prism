import type { Fetcher } from "@literate.ink/utilities";

import { desktopFetch, isDesktop } from "@/utils/desktop/bridge";

import { customFetcher as browserFetcher } from "./fetcher.shared";

/**
 * Web / Linux desktop. PRONOTE needs things a browser forbids (custom Cookie and
 * User-Agent headers, manual redirects, reading Set-Cookie, no CORS), so on the
 * desktop app every request goes through Electron's main process (Node's fetch).
 * In a plain browser it falls back to fetch, which only works behind a CORS proxy.
 */
export const customFetcher: Fetcher = async options => {
  if (!isDesktop()) {
    return browserFetcher(options);
  }
  const res = await desktopFetch({
    url: typeof options.url === "string" ? options.url : options.url.href,
    method: options.method ?? "GET",
    headers: {
      ...(options.headers as Record<string, string> | undefined),
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 19_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 PRONOTE Mobile APP Version/2.0.11",
    },
    body: options.method && options.method !== "GET" ? (options.content as string | undefined) : undefined,
    redirect: options.redirect ?? "follow",
    timeoutMs: 60_000,
  });
  return { content: res.content, status: res.status, headers: res.headers };
};
