import { Stack } from "expo-router";
import React from "react";

/** Revision mode: its screens draw their own header (back button included). */
export default function RevisionLayout() {
  return <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }} />;
}
