/**
 * Small secrets (the saved PRONOTE login) kept outside the app's own storage:
 * Android Keystore / iOS Keychain through expo-secure-store, the OS keyring
 * (libsecret / KWallet) in the desktop app. A plain browser has no safe place:
 * nothing is stored there.
 */
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

import { desktopSecrets } from "@/utils/desktop/bridge";

export const secretsSupported = (): boolean => Platform.OS !== "web" || !!desktopSecrets();

export async function getSecret(key: string): Promise<string | null> {
  if (Platform.OS !== "web") { return SecureStore.getItemAsync(key); }
  return (await desktopSecrets()?.get(key)) ?? null;
}

export async function setSecret(key: string, value: string): Promise<boolean> {
  if (Platform.OS !== "web") {
    await SecureStore.setItemAsync(key, value, { keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK });
    return true;
  }
  return (await desktopSecrets()?.set(key, value)) ?? false;
}

export async function removeSecret(key: string): Promise<void> {
  if (Platform.OS !== "web") { await SecureStore.deleteItemAsync(key); return; }
  await desktopSecrets()?.remove(key);
}
