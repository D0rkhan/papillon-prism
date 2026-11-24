import { useHeaderHeight, useRoute, useTheme } from "expo-router/react-navigation";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import Reanimated, { FadeInDown } from "react-native-reanimated";

import { aurora, Aurora, GlassButton, GlassChoice, GlassSurface, GText, space, useGlass } from "@/ui/glass";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Stack from "@/ui/components/Stack";
import Divider from "@/ui/new/Divider";
import Typography from "@/ui/new/Typography";
import SafeHorizontalView from "@/ui/components/SafeHorizontalView";

import { GetSupportedServices } from './utils/constants';

export default function ServiceSelection() {
  const headerHeight = useHeaderHeight();
  const theme = useTheme();
  const { colors } = theme;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();

  const { params } = useRoute();
  const { type } = params;

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const g = useGlass();

  const services = GetSupportedServices((path: { pathname: string, options?: UnknownInputParams }) => {
    router.push({
      pathname: path.pathname as unknown as RelativePathString,
      params: path.options ?? {} as unknown as UnknownInputParams
    });
  });

  const filteredServices = useMemo(() => {
    return services.filter((service) => service.type.includes(type));
  }, [services, type]);

  const titleString = useMemo(() => {
    switch (type) {
    case "univ":
      return t("ONBOARDING_SERVICE_SELECTION_TITLE_UNIV");
    default:
      return t("ONBOARDING_SERVICE_SELECTION_TITLE_SCHOOL");
    }
  }, [type, t]);


  const hasServiceRoute = services.find(service => service.name === selectedService)?.route || services.find(service => service.name === selectedService)?.onPress;

  const loginToService = (serviceName: string) => {
    const serviceRoute = services.find(service => service.name === serviceName)?.route;
    if(!serviceRoute) {
      services.find(service => service.name === serviceName)?.onPress();
      return;
    }
    const newRoute = './services/' + serviceRoute;
    router.push(newRoute);
  };

  if (!["school", "univ"].includes(type)) {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 10,
          paddingTop: headerHeight + 32,
          paddingBottom: insets.bottom + 20
        }}
      >
        <SafeHorizontalView base={20} style={{ flexGrow: 1 }}>
          <Stack
            vAlign="center"
            hAlign="center"
            gap={8}
          >
            <Image
              source={require("@/assets/images/prism-icon.png")}
              style={{ width: 86, height: 86, borderRadius: 24 }}
            />
            <Divider height={8} ghost />
            <Typography variant="h3" align="center">{t("ONBOARDING_UNSUPPORTED_TITLE")}</Typography>
            <Typography align="center" variant="body1" color="textSecondary">{t("ONBOARDING_UNSUPPORTED_DESCRIPTION")}</Typography>
            <Divider height={16} ghost />
            <GlassButton label={t("Global_Back")} variant="glass" onPress={() => router.back()} />
          </Stack>
        </SafeHorizontalView>
      </ScrollView>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: g.background }}>
      <Aurora />
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight + space.xl,
          paddingBottom: space.xl,
          paddingHorizontal: space.xl,
        }}
      >
        <View style={{ width: "100%", maxWidth: 560, alignSelf: "center", gap: space.md }}>
          <Reanimated.View entering={FadeInDown.duration(420)} style={{ marginBottom: space.md }}>
            <GText variant="overline" color={aurora.cyan}>Étape 2 sur 2</GText>
            <GText variant="title1">{titleString}</GText>
            <GText variant="body" tone="secondary">{t("ONBOARDING_SERVICE_SELECTION_DESCRIPTION")}</GText>
          </Reanimated.View>

          {filteredServices.map((app, i) => (
            <Reanimated.View key={app.name} entering={FadeInDown.duration(420).delay(60 + i * 45)}>
              <GlassChoice
                label={app.title}
                selected={selectedService === app.name}
                onPress={() => setSelectedService(app.name)}
                leading={<Image source={app.image} style={{ width: 40, height: 40, borderRadius: 12 }} />}
              />
            </Reanimated.View>
          ))}
        </View>
      </ScrollView>

      <GlassSurface radius={0} style={{ borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 }}>
        <View style={{ paddingTop: space.lg, paddingBottom: insets.bottom + space.lg, paddingHorizontal: space.xl }}>
          <View style={{ width: "100%", maxWidth: 560, alignSelf: "center" }}>
            <GlassButton
              label={t("ONBOARDING_CONTINUE")}
              onPress={() => { if (selectedService) { loginToService(selectedService); } }}
              disabled={!selectedService || !hasServiceRoute}
            />
          </View>
        </View>
      </GlassSurface>
    </View>
  );
}
