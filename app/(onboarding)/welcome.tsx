import { type ParamListBase, useIsFocused } from "expo-router/react-navigation";
import { type NativeStackNavigationProp, useNavigation, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, useWindowDimensions, View } from "react-native";
import Reanimated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { consumeSecurityLogoutNotice } from "@/stores/global/encryption";
import { aurora, Aurora, GlassSurface, GText, radius, semantic, space, useGlass } from "@/ui/glass";
import GlassButton from "@/ui/glass/GlassButton";
import PapillonLogo from "@/ui/new/symbols/PapillonLogo";

const FEATURES = [
  { title: "Moyennes exactes", body: "Chaque note, chaque coefficient, recalculés au centième.", color: aurora.cyan },
  { title: "Objectif EPFL", body: "Tes chances réelles et la note à viser au prochain devoir.", color: aurora.pink },
  { title: "Tout ton lycée", body: "Pronote, ENT, emploi du temps, devoirs, cantine.", color: aurora.violet },
];

const SERVICES = [
  require("@/assets/images/service_pronote.png"),
  require("@/assets/images/service_ed.png"),
  require("@/assets/images/service_skolengo.png"),
];

export default function Welcome() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isFocused = useIsFocused();
  const g = useGlass();
  const wide = width >= 720;

  // Without an account, the splash stays up until the redirect from home ends.
  React.useLayoutEffect(() => {
    const onboardingNavigation = navigation.getParent<NativeStackNavigationProp<ParamListBase>>();
    return onboardingNavigation?.addListener("transitionEnd", event => {
      if (!event.data.closing) { SplashScreen.hideAsync(); }
    });
  }, [navigation]);

  React.useEffect(() => {
    if (!consumeSecurityLogoutNotice()) { return; }
    router.navigate({
      pathname: "/alert",
      params: {
        data: JSON.stringify({
          title: t("SecurityLogout_Title"),
          description: t("SecurityLogout_Description"),
          icon: "Lock",
          color: "#0E7CCB",
          customButton: { label: t("SecurityLogout_Button") },
        }),
      },
    });
  }, []);

  const openWeb = (url: string) =>
    WebBrowser.openBrowserAsync(url, { presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET });

  const enter = (i: number) => FadeInDown.duration(520).delay(80 + i * 90).springify().damping(18);

  return (
    <View style={{ flex: 1, backgroundColor: g.background }}>
      {isFocused && <StatusBar barStyle={g.dark ? "light-content" : "dark-content"} animated />}
      <Aurora />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingTop: insets.top + space.xxl,
          paddingBottom: insets.bottom + space.xxl,
          paddingHorizontal: space.xl,
        }}
      >
        <View style={{ width: "100%", maxWidth: 560, alignSelf: "center", gap: space.xl }}>
          <Reanimated.View entering={enter(0)} style={{ alignItems: wide ? "flex-start" : "center", gap: space.sm }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm }}>
              <PapillonLogo fill={g.text} />
              <View style={[styles.prismTag, { borderColor: g.glassBorder }]}>
                <GText variant="overline" color={aurora.cyan}>Prism</GText>
              </View>
            </View>
          </Reanimated.View>

          <Reanimated.View entering={enter(1)} style={{ gap: space.md }}>
            <GText variant="display" align={wide ? "left" : "center"} style={{ fontSize: wide ? 52 : 40, lineHeight: wide ? 56 : 44 }}>
              Ta scolarité,{"\n"}en pleine lumière.
            </GText>
            <GText variant="body" tone="secondary" align={wide ? "left" : "center"}>
              {t("ONBOARDING_WELCOME_DESCRIPTION")}
            </GText>
          </Reanimated.View>

          <Reanimated.View entering={enter(2)} style={{ flexDirection: wide ? "row" : "column", gap: space.md }}>
            {FEATURES.map(f => (
              <GlassSurface key={f.title} padding={space.lg} radius={radius.lg} style={{ flex: wide ? 1 : undefined }}>
                <View style={[styles.dot, { backgroundColor: f.color, shadowColor: f.color }]} />
                <GText variant="title3" style={{ marginTop: space.sm }}>{f.title}</GText>
                <GText variant="callout" tone="secondary" style={{ marginTop: 2 }}>{f.body}</GText>
              </GlassSurface>
            ))}
          </Reanimated.View>

          <Reanimated.View entering={enter(3)} style={{ gap: space.md }}>
            <GlassButton
              label="Se connecter"
              onPress={() => router.push("./ageSelection")}
              accessibilityHint="Choisir son profil puis son service scolaire"
              trailing={
                <View style={{ flexDirection: "row", marginLeft: space.xs }}>
                  {SERVICES.map((src, i) => (
                    <Image key={i} source={src} style={[styles.service, { marginLeft: i ? -10 : 0, zIndex: 3 - i }]} />
                  ))}
                </View>
              }
            />
            <GlassButton label="Voir la démo de l'objectif EPFL" variant="glass" onPress={() => router.push("/objectif-demo")} />
            <GlassButton label={t("ONBOARDING_HELP_BTN")} variant="ghost" size="md" onPress={() => openWeb("https://docs.papillon.bzh/support")} />
          </Reanimated.View>

          <Reanimated.View entering={enter(4)}>
            <Pressable
              onPress={() => openWeb("https://docs.papillon.bzh/terms")}
              onLongPress={() => router.push("/devmode")}
              accessibilityRole="link"
            >
              <GText variant="caption" tone="tertiary" align="center">
                {t("ONBOARDING_WELCOME_LEGAL")}
              </GText>
            </Pressable>
            <GText variant="caption" tone="tertiary" align="center" style={{ marginTop: space.xs, color: semantic.info, opacity: 0.6 }}>
              Fork libre de Papillon · GPL-3.0
            </GText>
          </Reanimated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  prismTag: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: space.sm,
    paddingVertical: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  service: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.85)",
  },
});
