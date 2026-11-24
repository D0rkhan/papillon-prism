/**
 * Bridge to the Electron shell (desktop/preload.cjs). Absent on Android, iOS and in a
 * plain browser: every helper degrades gracefully.
 */
export interface DesktopFetchRequest {
  url: string;
  method: string;
  headers?: Record<string, string>;
  /** Text body, or binary body as base64 in `bodyBase64`. */
  body?: string;
  bodyBase64?: string;
  redirect?: "follow" | "manual" | "error";
  timeoutMs?: number;
}

interface RawDesktopResponse {
  status: number;
  bodyBase64: string;
  /** Lower-case header names; multiple Set-Cookie values joined with ", ". */
  headers: Record<string, string>;
  url: string;
}

export interface DesktopFetchResponse extends Omit<RawDesktopResponse, "bodyBase64"> {
  bytes: Uint8Array;
  content: string;
}

interface PrismDesktop {
  platform: string;
  version: string;
  fetch: (request: DesktopFetchRequest) => Promise<RawDesktopResponse>;
  secret?: {
    get: (key: string) => Promise<string | null>;
    set: (key: string, value: string) => Promise<boolean>;
    remove: (key: string) => Promise<boolean>;
  };
}

const getBridge = (): PrismDesktop | undefined =>
  typeof window !== "undefined" ? (window as unknown as { prismDesktop?: PrismDesktop }).prismDesktop : undefined;

export const isDesktop = (): boolean => !!getBridge();

/** OS-keyring backed secret storage of the desktop shell (undefined elsewhere). */
export const desktopSecrets = () => getBridge()?.secret;

const fromBase64 = (b64: string): Uint8Array => {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) { out[i] = bin.charCodeAt(i); }
  return out;
};

const toBase64 = (bytes: Uint8Array): string => {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) { bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000)); }
  return btoa(bin);
};

export async function desktopFetch(request: DesktopFetchRequest): Promise<DesktopFetchResponse> {
  const bridge = getBridge();
  if (!bridge) { throw new Error("Desktop bridge unavailable"); }
  const raw = await bridge.fetch(request);
  const bytes = fromBase64(raw.bodyBase64);
  return { status: raw.status, headers: raw.headers, url: raw.url, bytes, content: new TextDecoder().decode(bytes) };
}

const NULL_BODY_STATUS = new Set([101, 204, 205, 304]);

/**
 * In the desktop app, routes every cross-origin http(s) `fetch` through the shell, so
 * school services work without CORS. Same-origin requests (the app's own files) are
 * untouched. Call once, before the app starts.
 */
export function installDesktopFetch(): void {
  const bridge = getBridge();
  if (!bridge || (globalThis as { __prismFetch?: boolean }).__prismFetch) { return; }
  (globalThis as { __prismFetch?: boolean }).__prismFetch = true;
  const nativeFetch = globalThis.fetch.bind(globalThis);

  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const request = new Request(input, init);
    const url = new URL(request.url);
    if ((url.protocol !== "http:" && url.protocol !== "https:") || url.origin === location.origin) {
      return nativeFetch(input, init);
    }
    const headers: Record<string, string> = {};
    request.headers.forEach((v, k) => { headers[k] = v; });
    // Headers a browser hides from Request objects but code may have set explicitly.
    if (init?.headers && !(init.headers instanceof Headers) && !Array.isArray(init.headers)) {
      Object.assign(headers, init.headers as Record<string, string>);
    }
    const hasBody = request.method !== "GET" && request.method !== "HEAD";
    const body = hasBody ? new Uint8Array(await request.arrayBuffer()) : undefined;

    const res = await desktopFetch({
      url: url.href,
      method: request.method,
      headers,
      bodyBase64: body && body.length ? toBase64(body) : undefined,
      redirect: (init?.redirect ?? "follow") as DesktopFetchRequest["redirect"],
    });
    const status = res.status < 200 || res.status > 599 ? 200 : res.status;
    const response = new Response(NULL_BODY_STATUS.has(status) ? null : (res.bytes as BodyInit), { status, headers: res.headers });
    Object.defineProperty(response, "url", { value: res.url });
    return response;
  };
}
