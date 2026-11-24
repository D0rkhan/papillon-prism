import { Stack } from "expo-router";
import React from "react";

/** Prism feature screens draw their own header (back button included). */
export default function PrismFeaturesLayout() {
  return <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }} />;
}
