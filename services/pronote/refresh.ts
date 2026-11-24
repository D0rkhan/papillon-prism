import {
  AccountKind,
  BadCredentialsError,
  BusyPageError,
  createSessionHandle,
  loginCredentials,
  loginToken,
  PageUnavailableError,
  RefreshInformation,
  SecurityError,
  SessionHandle,
  TokenAuthenticationParams,
  UnreachableError,
} from "@blockshub/pawnote-lts";

import { runAuthRefresh } from "@/services/auth/coordinator";
import { CredentialsMissingError } from "@/services/auth/errors";
import { AuthTracker } from "@/services/auth/types";
import { SecurityChallengeError } from "@/services/errors/SecurityChallengeError";
import { classifyPronoteError } from "@/services/pronote/errors";
import { Auth } from "@/stores/account/types";
import { customFetcher } from "@/utils/pronote/fetcher";
import { warn } from "@/utils/logger/logger";

import { readSavedLogin } from "./savedLogin";

const MAX_ATTEMPTS = 2;
const RETRY_BASE_DELAY_MS = 2000;

type PronoteRefresh = { auth: Auth, session: SessionHandle };

const isSafeToRetry = (e: unknown): boolean =>
  e instanceof UnreachableError ||
  e instanceof BusyPageError ||
  e instanceof PageUnavailableError;

const buildTokenParams = (stored: Auth, deviceUUID: string): TokenAuthenticationParams => {
  const url = String(
    stored.additionals?.["url"] || stored.additionals?.["instanceURL"] || ""
  );
  const token = String(stored.additionals?.["token"] || stored.accessToken || "");
  const username = String(stored.additionals?.["username"] || "");

  if (!url || !token || !username) {
    throw new CredentialsMissingError(
      "Stored PRONOTE credentials are incomplete, the account has to be linked again."
    );
  }

  return {
    ...stored.additionals,
    url,
    token,
    username,
    kind: (stored.additionals?.["kind"] as AccountKind) || AccountKind.STUDENT,
    deviceUUID,
  } as TokenAuthenticationParams;
};

const toAuth = (refresh: RefreshInformation, deviceUUID: string): Auth => ({
  accessToken: refresh.token,
  refreshToken: refresh.token,
  additionals: {
    ...refresh,
    instanceURL: refresh.url,
    deviceUUID,
  },
});

// PRONOTE tokens are single-use: the coordinator makes every caller share one login.
export function refreshPronoteAccount(
  accountId: string,
  credentials: Auth
): Promise<PronoteRefresh> {
  return runAuthRefresh(
    accountId,
    credentials,
    { rotatesCredential: true, classifyError: classifyPronoteError },
    async tracker => {
      let lastError: unknown;

      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        try {
          return await loginWithStoredToken(tracker);
        } catch (e) {
          lastError = e;
          // The token is spent or refused: a saved password gets a new one at
          // once, instead of leaving the account disconnected. One try only —
          // repeated refusals are what gets the IP rate-limited.
          if (e instanceof BadCredentialsError) {
            const saved = await readSavedLogin(accountId);
            if (saved) {
              warn("PRONOTE refused the stored token, logging in again with the saved password.", "refreshPronoteAccount");
              return await loginWithSavedPassword(tracker, saved);
            }
          }
          if (!isSafeToRetry(e)) {
            throw e;
          }
          if (attempt < MAX_ATTEMPTS - 1) {
            await new Promise(r => setTimeout(r, RETRY_BASE_DELAY_MS * 4 ** attempt));
          }
        }
      }

      throw lastError;
    }
  );
}

async function loginWithStoredToken(tracker: AuthTracker): Promise<PronoteRefresh> {
  const handle = createSessionHandle(customFetcher);
  const stored = tracker.readCredentials();
  const deviceUUID = String(stored.additionals?.["deviceUUID"] || "");
  const loginParams = buildTokenParams(stored, deviceUUID);

  try {
    const refresh = await loginToken(handle, loginParams, {
      onCredentialSent: () => tracker.credentialSent(stored),
      onAuthenticationSent: () => tracker.awaitingNewCredential(),
      // Saved before ParametresUtilisateur: if that request fails, the next
      // login still has a valid token.
      onTokenIssued: information => {
        if (information.token) {
          tracker.credentialReceived(toAuth(information, deviceUUID));
        }
      },
    });

    const auth = toAuth(refresh, deviceUUID);
    tracker.credentialReceived(auth);
    return { auth, session: handle };
  } catch (e) {
    if (e instanceof SecurityError) {
      throw new SecurityChallengeError(e, handle, deviceUUID);
    }
    throw e;
  }
}

/** Direct PRONOTE login (not ENT) with the saved username and password. */
async function loginWithSavedPassword(
  tracker: AuthTracker,
  saved: { username: string; password: string }
): Promise<PronoteRefresh> {
  const handle = createSessionHandle(customFetcher);
  const stored = tracker.readCredentials();
  const deviceUUID = String(stored.additionals?.["deviceUUID"] || "");
  const url = String(stored.additionals?.["url"] || stored.additionals?.["instanceURL"] || "");
  if (!url || !deviceUUID) {
    throw new CredentialsMissingError("No PRONOTE address stored, the account has to be linked again.");
  }
  try {
    const refresh = await loginCredentials(handle, {
      url,
      kind: (stored.additionals?.["kind"] as AccountKind) || AccountKind.STUDENT,
      username: saved.username,
      password: saved.password,
      deviceUUID,
    });
    const auth = toAuth(refresh, deviceUUID);
    tracker.credentialReceived(auth);
    return { auth, session: handle };
  } catch (e) {
    if (e instanceof SecurityError) {
      throw new SecurityChallengeError(e, handle, deviceUUID);
    }
    throw e;
  }
}

/**
 * Logs in from the settings screen with a username and password (direct
 * PRONOTE account), returning the auth to store. Used to relink without the
 * web page, and to check a password before saving it.
 */
export async function loginPronoteWithPassword(
  url: string,
  username: string,
  password: string,
  deviceUUID: string
): Promise<{ auth: Auth; session: SessionHandle }> {
  const handle = createSessionHandle(customFetcher);
  try {
    const refresh = await loginCredentials(handle, { url, kind: AccountKind.STUDENT, username, password, deviceUUID });
    return { auth: toAuth(refresh, deviceUUID), session: handle };
  } catch (e) {
    if (e instanceof SecurityError) {
      throw new SecurityChallengeError(e, handle, deviceUUID);
    }
    throw e;
  }
}

