/**
 * Optional saved PRONOTE username + password, used only to get a new token
 * when PRONOTE refuses the stored one. Never sent anywhere but PRONOTE.
 * Only works for direct PRONOTE accounts (not ENT/CAS logins).
 */
import { getSecret, removeSecret, setSecret } from "@/utils/secureSecret";

export interface SavedLogin {
  username: string;
  password: string;
}

// SecureStore keys: letters, digits, ".", "-" and "_" only.
const keyOf = (serviceId: string) => `prism.pronote.login.${serviceId.replace(/[^A-Za-z0-9._-]/g, "_")}`;

export async function readSavedLogin(serviceId: string): Promise<SavedLogin | null> {
  try {
    const raw = await getSecret(keyOf(serviceId));
    if (!raw) { return null; }
    const parsed = JSON.parse(raw);
    return parsed?.username && parsed?.password ? parsed : null;
  } catch {
    return null;
  }
}

export const saveLogin = (serviceId: string, login: SavedLogin): Promise<boolean> =>
  setSecret(keyOf(serviceId), JSON.stringify(login));

export const forgetLogin = (serviceId: string): Promise<void> => removeSecret(keyOf(serviceId));
