import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import { clearAuthState, getAuthState } from "@/services/auth/coordinator";
import { SecurityChallengeError } from "@/services/errors/SecurityChallengeError";
import { loginPronoteWithPassword } from "@/services/pronote/refresh";
import { forgetLogin, readSavedLogin, saveLogin } from "@/services/pronote/savedLogin";
import { initializeAccountManager } from "@/services/shared";
import { useAccountStore } from "@/stores/account";
import { Services } from "@/stores/account/types";
import { Card, GText, Icon, radius, semantic, space, useGlass, webOnly } from "@/ui/glass";
import { setPendingPronoteChallenge } from "@/utils/pronote/challenge";
import { relinkPronote } from "@/utils/pronote/relink";
import { secretsSupported } from "@/utils/secureSecret";

/** When PRONOTE's IP block lifts, if one is running. */
export function pronoteBlockedUntil(serviceId?: string): number | null {
  if (!serviceId) { return null; }
  const state = getAuthState(serviceId);
  const until = state?.failure?.reason === "suspended" ? state.nextRetryAt : undefined;
  return until && until > Date.now() ? until : null;
}

export const hhmm = (ms: number) => new Date(ms).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

/** Message for a failed PRONOTE login or sync, in plain French. */
export function describePronoteFailure(e: unknown, serviceId?: string): { text: string; relink: boolean } {
  const raw = e instanceof Error ? `${e.name} ${e.message}` : String(e);
  if (/RateLimited|SuspendedIP|suspend|AuthOnHold/i.test(raw)) {
    const until = pronoteBlockedUntil(serviceId);
    return {
      text: `PRONOTE bloque temporairement les connexions depuis ton adresse (trop d'essais). Attends${until ? ` jusqu'à ${hhmm(until)}` : " une dizaine de minutes"} sans réessayer : chaque essai prolonge le blocage.`,
      relink: false,
    };
  }
  if (/BadCredentials|credential_rejected|credential_lost|AuthenticationError/i.test(raw)) {
    return { text: "PRONOTE a refusé la connexion enregistrée : reconnecte-toi une fois ci-dessous.", relink: true };
  }
  return { text: `Échec : ${raw.replace(/^Error:?\s*/, "").slice(0, 160)}`, relink: false };
}

/**
 * Two ways back in: the PRONOTE web page (works with an ENT), or the PRONOTE
 * username + password typed here (direct accounts), optionally remembered so a
 * refused token is replaced automatically, without ever showing a login again.
 */
export default function PronoteLoginCard({ highlight, onConnected }: { highlight?: boolean; onConnected?: (message: string) => void }) {
  const g = useGlass();
  const account = useAccountStore(state => state.accounts.find(a => a.id === state.lastUsedAccount));
  const service = account?.services.find(s => s.serviceId === Services.PRONOTE);
  const additionals = service?.auth?.additionals ?? {};

  const [saved, setSaved] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(String(additionals["username"] ?? ""));
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const canRemember = secretsSupported();

  useEffect(() => {
    if (!service) { return; }
    readSavedLogin(service.id).then(login => setSaved(login?.username ?? null));
  }, [service]);

  const submit = useCallback(async () => {
    if (!account || !service || !username.trim() || !password) { return; }
    const blocked = pronoteBlockedUntil(service.id);
    if (blocked) {
      setMessage({ text: `PRONOTE bloque encore les connexions jusqu'à ${hhmm(blocked)}. Réessaie après, sinon le blocage repart à zéro.`, error: true });
      return;
    }
    const url = String(additionals["instanceURL"] || additionals["url"] || "");
    const deviceUUID = String(additionals["deviceUUID"] || service.id);
    if (!url) {
      setMessage({ text: "Adresse PRONOTE inconnue : utilise la connexion par la page web.", error: true });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const { auth } = await loginPronoteWithPassword(url, username.trim(), password, deviceUUID);
      useAccountStore.getState().updateServiceAuthData(service.id, auth);
      clearAuthState(service.id);
      if (remember && canRemember) {
        await saveLogin(service.id, { username: username.trim(), password });
        setSaved(username.trim());
      }
      setPassword("");
      setOpen(false);
      await initializeAccountManager(account.id, { force: true }).catch(() => undefined);
      const text = remember && canRemember
        ? "Connecté. Tes identifiants sont mémorisés : si PRONOTE refuse un jour la connexion, Prism se reconnectera tout seul."
        : "Connecté.";
      setMessage({ text, error: false });
      onConnected?.(text);
    } catch (e) {
      if (e instanceof SecurityChallengeError) {
        setPendingPronoteChallenge({
          session: e.session,
          error: e.securityError,
          deviceUUID,
          relinkAccountId: account.id,
          relinkServiceId: service.id,
        });
        router.navigate("/(onboarding)/services/pronote/challenge");
        return;
      }
      const raw = e instanceof Error ? `${e.name} ${e.message}` : String(e);
      setMessage({
        text: /BadCredentials/i.test(raw)
          ? "Identifiant ou mot de passe refusé. Si tu te connectes d'habitude via l'ENT de ton lycée (et pas directement sur PRONOTE), utilise plutôt « Page de connexion PRONOTE »."
          : describePronoteFailure(e, service.id).text,
        error: true,
      });
    } finally {
      setBusy(false);
    }
  }, [account, service, username, password, remember, canRemember, additionals, onConnected]);

  if (!service) { return null; }

  const openWebLogin = async () => {
    const blocked = pronoteBlockedUntil(service.id);
    if (blocked) {
      setMessage({ text: `PRONOTE bloque encore les connexions jusqu'à ${hhmm(blocked)} : la page te renverrait « déconnecté » en boucle. Réessaie après.`, error: true });
      return;
    }
    if (!(await relinkPronote())) {
      setMessage({ text: "Adresse PRONOTE inconnue : déconnecte-toi puis reconnecte-toi.", error: true });
    }
  };

  const input = [{ height: 42, paddingHorizontal: space.md, borderRadius: radius.md, borderWidth: 1, borderColor: g.glassBorder, backgroundColor: g.glassFill, color: g.text, fontFamily: "fixeltext-regular", fontSize: 14 }, webOnly({ outlineStyle: "none" })];
  const button = (primary: boolean) => [{ flex: 1, minWidth: 180, height: 40, borderRadius: radius.pill, alignItems: "center" as const, justifyContent: "center" as const, flexDirection: "row" as const, gap: space.sm, backgroundColor: primary ? g.inverse : g.glassFill, borderWidth: 1, borderColor: g.glassBorder }, webOnly({ cursor: "pointer" })];

  return (
    <Card tint={highlight ? semantic.danger : undefined}>
      <GText variant="overline" tone="secondary">Connexion PRONOTE</GText>
      <GText variant="caption" tone="tertiary" style={{ marginTop: 2 }}>
        {saved ? `Identifiants mémorisés pour « ${saved} » : reconnexion automatique si besoin.` : "Reconnecte-toi ici si PRONOTE refuse la connexion enregistrée."}
      </GText>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.md }}>
        <Pressable onPress={openWebLogin} style={button(!!highlight && !open)}>
          <Icon name="Globe" size={15} color={highlight && !open ? g.onInverse : g.text} />
          <GText variant="callout" color={highlight && !open ? g.onInverse : g.text}>Page de connexion PRONOTE</GText>
        </Pressable>
        <Pressable onPress={() => setOpen(o => !o)} style={button(false)}>
          <Icon name="Password" size={15} color={g.text} />
          <GText variant="callout">Identifiant et mot de passe</GText>
        </Pressable>
      </View>

      {open && (
        <View style={{ gap: space.sm, marginTop: space.md }}>
          <GText variant="caption" tone="tertiary">
            Uniquement si tu te connectes directement sur PRONOTE (pas via l'ENT). Ton mot de passe n'est envoyé qu'à PRONOTE{canRemember ? " et, si tu le mémorises, il est chiffré par le trousseau de l'appareil." : "."}
          </GText>
          <TextInput value={username} onChangeText={setUsername} placeholder="Identifiant PRONOTE" placeholderTextColor={g.textTertiary} autoCapitalize="none" autoCorrect={false} autoComplete="username" style={input} />
          <TextInput value={password} onChangeText={setPassword} placeholder="Mot de passe" placeholderTextColor={g.textTertiary} secureTextEntry autoComplete="password" onSubmitEditing={submit} style={input} />
          {canRemember && (
            <Pressable onPress={() => setRemember(r => !r)} style={[{ flexDirection: "row", alignItems: "center", gap: space.sm, paddingVertical: 4 }, webOnly({ cursor: "pointer" })]}>
              <View style={{ width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: remember ? semantic.success : g.textTertiary, backgroundColor: remember ? semantic.success : "transparent", alignItems: "center", justifyContent: "center" }}>
                {remember ? <GText variant="caption" color={g.background}>✓</GText> : null}
              </View>
              <GText variant="callout">Mémoriser pour ne plus jamais être déconnecté</GText>
            </Pressable>
          )}
          <Pressable onPress={submit} disabled={busy || !username.trim() || !password} style={[{ height: 42, borderRadius: radius.pill, alignItems: "center", justifyContent: "center", backgroundColor: g.inverse, opacity: busy || !username.trim() || !password ? 0.5 : 1 }, webOnly({ cursor: busy ? "progress" : "pointer" })]}>
            <GText variant="callout" color={g.onInverse}>{busy ? "Connexion…" : "Se connecter"}</GText>
          </Pressable>
        </View>
      )}

      {saved && !open && (
        <Pressable onPress={async () => { await forgetLogin(service.id); setSaved(null); }} style={[{ marginTop: space.sm, alignSelf: "flex-start" }, webOnly({ cursor: "pointer" })]}>
          <GText variant="caption" tone="tertiary">Oublier les identifiants mémorisés</GText>
        </Pressable>
      )}

      {message && (
        <GText variant="caption" color={message.error ? semantic.danger : semantic.success} style={{ marginTop: space.sm }}>
          {message.text}
        </GText>
      )}
    </Card>
  );
}
