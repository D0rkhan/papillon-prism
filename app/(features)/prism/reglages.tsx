import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, Pressable, View } from "react-native";

import { ClearDatabaseForAccount } from "@/database/DatabaseProvider";
import { allowAllAuthRetries } from "@/services/auth/coordinator";
import { initializeAccountManager } from "@/services/shared";
import { useAccountStore } from "@/stores/account";
import { Services } from "@/stores/account/types";
import { useSettingsStore } from "@/stores/settings";
import { accent, ActionButton, Card, GText, Icon, PrismScreen, radius, Row, Segmented, semantic, space, useGlass, webOnly, withAlpha } from "@/ui/glass";
import { formatSchoolName } from "@/utils/format/formatSchoolName";
import { relinkPronote } from "@/utils/pronote/relink";

import packagejson from "../../../package.json";

/** Native confirm on phones, window.confirm on the desktop (Alert has no buttons on the web). */
function confirm(title: string, message: string, action: string): Promise<boolean> {
  if (Platform.OS === "web") {
    return Promise.resolve(typeof window !== "undefined" && window.confirm(`${title}\n\n${message}`));
  }
  return new Promise(resolve => {
    Alert.alert(title, message, [
      { text: "Annuler", style: "cancel", onPress: () => resolve(false) },
      { text: action, style: "destructive", onPress: () => resolve(true) },
    ]);
  });
}

export default function ReglagesScreen() {
  const g = useGlass();
  const router = useRouter();
  const account = useAccountStore(state => state.accounts.find(a => a.id === state.lastUsedAccount));
  const theme = useSettingsStore(state => state.personalization.theme ?? "dark");
  const devMode = useSettingsStore(state => state.personalization.showDevMode);
  const mutate = useSettingsStore(state => state.mutateProperty);

  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [needsRelink, setNeedsRelink] = useState(false);
  const [taps, setTaps] = useState(0);

  const sync = async () => {
    if (!account) { return; }
    setSyncing(true);
    setSyncResult(null);
    setNeedsRelink(false);
    allowAllAuthRetries();
    try {
      await initializeAccountManager(account.id, { force: true });
      setSyncResult(`Synchronisé à ${new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`);
    } catch (e) {
      const text = String(e);
      // A spent / refused token cannot be retried: only a new login fixes it.
      const auth = /BadCredentials|credential|AuthenticationError|token/i.test(text) || (e as { name?: string })?.name === "AuthenticationError";
      setNeedsRelink(auth);
      setSyncResult(auth ? "PRONOTE a refusé la connexion enregistrée : reconnecte-toi une fois pour obtenir un nouveau jeton." : `Échec : ${text.replace(/^Error:\s*/, "").slice(0, 140)}`);
    } finally {
      setSyncing(false);
    }
  };

  const clearCache = async () => {
    if (!account) { return; }
    if (!(await confirm("Vider le cache", "Les notes, devoirs et cours enregistrés sur cet appareil seront effacés puis retéléchargés depuis PRONOTE.", "Vider"))) { return; }
    for (const service of account.services) { await ClearDatabaseForAccount(service.id); }
    await sync();
  };

  const logout = async () => {
    if (!(await confirm("Se déconnecter", "Ton compte sera retiré de cet appareil. Il faudra te reconnecter à PRONOTE.", "Se déconnecter"))) { return; }
    for (const a of useAccountStore.getState().accounts) { useAccountStore.getState().removeAccount(a); }
    router.replace("/(onboarding)/welcome");
  };

  const onVersion = () => {
    const next = taps + 1;
    setTaps(next);
    if (next >= 7) {
      setTaps(0);
      mutate("personalization", { showDevMode: !devMode });
    }
  };

  const initials = `${account?.firstName?.[0] ?? ""}${account?.lastName?.[0] ?? ""}`.toUpperCase() || "?";
  const pronote = account?.services.some(s => s.serviceId === Services.PRONOTE);

  return (
    <PrismScreen back title="Réglages" maxWidth={720}>
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center", gap: space.lg }}>
          <View style={{ width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", backgroundColor: withAlpha(accent, 0.22), borderWidth: 1, borderColor: withAlpha(accent, 0.4) }}>
            <GText variant="title2">{initials}</GText>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <GText variant="title2" numberOfLines={1}>{[account?.firstName, account?.lastName].filter(Boolean).join(" ") || "Mon compte"}</GText>
            <GText variant="caption" tone="tertiary" numberOfLines={2}>
              {[account?.className, account?.schoolName ? formatSchoolName(account.schoolName) : undefined].filter(Boolean).join(" · ")}
            </GText>
          </View>
        </View>
        <View style={{ marginTop: space.lg, flexDirection: "row", alignItems: "center", gap: space.md }}>
          <ActionButton icon="Refresh" label="Synchroniser maintenant" onPress={sync} busy={syncing} />
          <View style={{ flex: 1 }}>
            <GText variant="callout">{pronote ? "PRONOTE" : "Compte"}</GText>
            <GText variant="caption" color={syncResult?.startsWith("Échec") || needsRelink ? semantic.danger : g.textTertiary}>
              {syncing ? "Synchronisation…" : syncResult ?? "Synchronisation automatique au retour sur l'app et toutes les 20 min."}
            </GText>
          </View>
        </View>
        {pronote && (
          <Pressable
            onPress={async () => { if (!(await relinkPronote())) { setSyncResult("Adresse PRONOTE inconnue : déconnecte-toi puis reconnecte-toi."); } }}
            style={[{ marginTop: space.lg, height: 40, borderRadius: radius.pill, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: space.sm, backgroundColor: needsRelink ? g.inverse : g.glassFill, borderWidth: 1, borderColor: g.glassBorder }, webOnly({ cursor: "pointer" })]}
          >
            <Icon name="Login" size={16} color={needsRelink ? g.onInverse : g.text} />
            <GText variant="callout" color={needsRelink ? g.onInverse : g.text}>Se reconnecter à PRONOTE</GText>
          </Pressable>
        )}
      </Card>

      <Card>
        <GText variant="overline" tone="secondary" style={{ marginBottom: space.md }}>Apparence</GText>
        <Segmented
          options={[{ value: "dark", label: "Sombre" }, { value: "light", label: "Clair" }, { value: "auto", label: "Système" }]}
          value={theme}
          onChange={value => mutate("personalization", { theme: value as "dark" | "light" | "auto" })}
        />
      </Card>

      <Card padding={space.lg}>
        <Row first leading={<Icon name="GraduationHat" />} title="Objectif EPFL" subtitle="Profil du bac, spécialités, seuils" onPress={() => router.push("/(tabs)/grades/objectif")} />
        <Row leading={<Icon name="Pie" />} title="Moyennes détaillées" subtitle="Vérifier chaque calcul" onPress={() => router.push("/(features)/prism/calculs")} />
        <Row leading={<Icon name="Palette" />} title="Matières" subtitle="Noms et couleurs des matières" onPress={() => router.push("/(settings)/subject_personalization")} />
      </Card>

      <Card padding={space.lg}>
        <Row first leading={<Icon name="Trash" />} title="Vider le cache" subtitle="Efface les données locales et retélécharge tout" onPress={clearCache} />
        <Row leading={<Icon name="Logout" color={semantic.danger} />} title={<GText variant="callout" color={semantic.danger}>Se déconnecter</GText>} onPress={logout} />
        {devMode && <Row leading={<Icon name="Code" />} title="Mode développeur" subtitle="Journaux, réseau, tests" onPress={() => router.push("/devmode")} />}
      </Card>

      <Pressable onPress={onVersion} style={[{ alignSelf: "center", padding: space.sm, borderRadius: radius.sm }, webOnly({ cursor: "default", userSelect: "none" })]}>
        <GText variant="caption" tone="tertiary" align="center">Papillon Prism {packagejson.version} · usage personnel · aucune donnée envoyée</GText>
      </Pressable>
    </PrismScreen>
  );
}
