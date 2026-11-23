import { useHeaderHeight } from "expo-router/react-navigation";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import Reanimated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { aurora, Aurora, GlassButton, GlassChoice, GlassSurface, GText, space, useGlass } from "@/ui/glass";

import HighSchoolIllustration from "./components/ageSelection/illustrations/highSchool";
import MiddleSchoolIllustration from "./components/ageSelection/illustrations/middleSchool";
import ParentsIllustration from "./components/ageSelection/illustrations/parents";
import SupSchoolIllustration from "./components/ageSelection/illustrations/supSchool";
import TeacherIllustration from "./components/ageSelection/illustrations/teacher";

const LEVELS = [
  {
    key: "middle-school",
    labelKey: "ONBOARDING_LEVEL_MIDDLE_SCHOOL",
    color: "#008CFF",
    icon: MiddleSchoolIllustration,
    type: "school"
  },
  {
    key: "high-school",
    labelKey: "ONBOARDING_LEVEL_HIGH_SCHOOL",
    color: "#FFC800",
    icon: HighSchoolIllustration,
    type: "school"
  },
  {
    key: "sup-school",
    labelKey: "ONBOARDING_LEVEL_UNIVERSITY",
    color: "#68F000",
    icon: SupSchoolIllustration,
    type: "univ"
  },
  {
    type: 'separator'
  },
  {
    key: "parents",
    labelKey: "ONBOARDING_LEVEL_PARENT",
    color: "#ff4d4d",
    icon: ParentsIllustration,
    type: "parents"
  },
  {
    key: "teacher",
    labelKey: "ONBOARDING_LEVEL_TEACHER",
    color: "#FF0084",
    icon: TeacherIllustration,
    type: "teacher"
  }
]

export default function AgeSelection() {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const g = useGlass();

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, backgroundColor: g.background }}>
      <StatusBar barStyle={g.dark ? "light-content" : "dark-content"} translucent />
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
            <GText variant="overline" color={aurora.cyan}>Étape 1 sur 2</GText>
            <GText variant="title1">{t("ONBOARDING_AGE_TITLE")}</GText>
            <GText variant="body" tone="secondary">{t("ONBOARDING_AGE_DESCRIPTION")}</GText>
          </Reanimated.View>

          {LEVELS.map((level, i) => {
            if (!("key" in level) || !level.key) {
              return <View key={`sep-${i}`} style={{ height: 1, backgroundColor: g.separator, marginVertical: space.md }} />;
            }
            const Illustration = level.icon as React.ComponentType<{ color: string; dark: string; width?: number; height?: number }>;
            const accent = level.color as string;
            return (
              <Reanimated.View key={level.key} entering={FadeInDown.duration(420).delay(60 + i * 50)}>
                <GlassChoice
                  label={t(level.labelKey as string)}
                  selected={selectedLevel === level.key}
                  accent={accent}
                  onPress={() => setSelectedLevel(selectedLevel === level.key ? null : (level.key as string))}
                  trailing={selected => (
                    <View style={{ width: 70, height: 46, overflow: "hidden", marginBottom: -12 }} pointerEvents="none">
                      <Illustration
                        width={70}
                        height={47}
                        color={selected ? accent : "transparent"}
                        dark={selected ? accent : g.textTertiary}
                      />
                    </View>
                  )}
                />
              </Reanimated.View>
            );
          })}
        </View>
      </ScrollView>

      <GlassSurface radius={0} style={{ borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 }}>
        <View style={{ paddingTop: space.lg, paddingBottom: insets.bottom + space.lg, paddingHorizontal: space.xl }}>
          <View style={{ width: "100%", maxWidth: 560, alignSelf: "center" }}>
            <GlassButton
              label={t("ONBOARDING_CONTINUE")}
              disabled={!selectedLevel}
              onPress={() => {
                navigation.navigate("serviceSelection", {
                  type: LEVELS.find(level => "key" in level && level.key === selectedLevel)?.type,
                });
              }}
            />
          </View>
        </View>
      </GlassSurface>
    </View>
  );
}
