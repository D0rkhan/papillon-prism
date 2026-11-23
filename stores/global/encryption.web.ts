import { createMMKV, MMKV } from "react-native-mmkv";

/**
 * Web / Linux desktop: MMKV's web backend (localStorage) has no encryption.
 * The desktop shell keeps that storage inside the app's own profile directory
 * (~/.config/Papillon Prism), readable only by the user's account.
 */
export function consumeSecurityLogoutNotice(): boolean {
  return false;
}

export function createEncryptedMMKV(id: string, _legacyKey?: string): MMKV {
  return createMMKV({ id });
}
