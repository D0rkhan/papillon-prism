import { useMemo } from "react";

import { AuthStep, RELINK_AUTH_FAILURES } from "@/services/auth/types";
import { useAccountStore } from "@/stores/account";
import { useAuthStateStore } from "@/stores/authState";

export interface SyncProblem {
  /** "relink": only a new login fixes it; "wait": PRONOTE blocks for a while; "retry": transient. */
  kind: "relink" | "wait" | "retry";
  title: string;
  message: string;
  /** When a temporary block lifts (ms epoch), if known. */
  until?: number;
}

const hhmm = (ms: number) => new Date(ms).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

/**
 * Why the current account cannot sync, in plain French, or null when it can.
 * Read from the persisted auth state, so a screen that has nothing to show can
 * say why instead of looking simply empty (grades have no offline copy until a
 * first successful sync on the device).
 */
export function useSyncHealth(): SyncProblem | null {
  const account = useAccountStore(state => state.accounts.find(a => a.id === state.lastUsedAccount));
  const services = useAuthStateStore(state => state.services);

  return useMemo(() => {
    if (!account) { return null; }
    for (const service of account.services) {
      const state = services[service.id];
      if (!state || state.step !== AuthStep.Failed || !state.failure) { continue; }
      const { reason } = state.failure;
      if (RELINK_AUTH_FAILURES.includes(reason) || reason === "security_challenge") {
        return {
          kind: "relink",
          title: "Connexion refusée sur cet appareil",
          message: "PRONOTE n'accepte plus la connexion enregistrée sur cet appareil. Reconnecte-toi une fois : tes notes reviennent aussitôt.",
        };
      }
      if (reason === "suspended") {
        const until = state.nextRetryAt && state.nextRetryAt > Date.now() ? state.nextRetryAt : undefined;
        return {
          kind: "wait",
          title: "PRONOTE fait une pause",
          message: `Trop d'essais de connexion depuis ce réseau. Attends${until ? ` jusqu'à ${hhmm(until)}` : " quelques minutes"} sans réessayer.`,
          until,
        };
      }
      return {
        kind: "retry",
        title: "Synchronisation impossible",
        message: reason === "network"
          ? "Pas de connexion à PRONOTE pour l'instant. Vérifie le réseau puis actualise."
          : "PRONOTE n'a pas répondu correctement. Actualise dans un instant.",
      };
    }
    return null;
  }, [account, services]);
}
