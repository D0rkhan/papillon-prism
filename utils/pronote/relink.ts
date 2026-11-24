import { instance } from "@blockshub/pawnote-lts";
import { router } from "expo-router";

import { useAccountStore } from "@/stores/account";
import { Services } from "@/stores/account/types";

/**
 * Opens the PRONOTE login page to link the current account again (new token),
 * keeping the account, its settings and its device id. Returns false when the
 * account has no PRONOTE service or no known instance URL.
 */
export async function relinkPronote(): Promise<boolean> {
  const state = useAccountStore.getState();
  const account = state.accounts.find(a => a.id === state.lastUsedAccount);
  const service = account?.services.find(s => s.serviceId === Services.PRONOTE);
  const additionals = service?.auth?.additionals ?? {};
  const url = String(additionals["instanceURL"] || additionals["url"] || "");
  if (!account || !service || !url) {
    return false;
  }
  const info = await instance(url).catch(() => null);
  router.navigate({
    pathname: "/(onboarding)/services/pronote/browser",
    params: {
      url,
      school: info?.name ?? account.schoolName ?? "N/A",
      relinkAccountId: account.id,
      relinkServiceId: service.id,
      relinkDeviceUUID: String(additionals["deviceUUID"] ?? ""),
    },
  });
  return true;
}
