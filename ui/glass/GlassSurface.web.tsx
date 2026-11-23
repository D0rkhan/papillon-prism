import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import type { GlassSurfaceProps } from "./GlassSurface";
import { radius as R } from "./tokens";
import { useGlass } from "./useGlass";

/** Web / Linux desktop: real-time CSS backdrop blur with saturation boost. */
export default function GlassSurface({ radius = R.lg, intensity = "regular", tint, padding, style, children, ...rest }: GlassSurfaceProps) {
  const g = useGlass();
  const fill = intensity === "strong" ? g.glassFillStrong : g.glassFill;
  const web = {
    backdropFilter: `blur(${g.blurAmount}px) saturate(180%)`,
    WebkitBackdropFilter: `blur(${g.blurAmount}px) saturate(180%)`,
    backgroundImage: `linear-gradient(180deg, ${g.glassHighlight} 0%, transparent 35%)${tint ? `, linear-gradient(0deg, ${tint}1F, ${tint}1F)` : ""}`,
    boxShadow: `0 12px 32px ${g.glassShadow}, inset 0 1px 0 ${g.glassHighlight}`,
  } as unknown as ViewStyle;

  return (
    <View
      {...rest}
      style={[
        {
          borderRadius: radius,
          backgroundColor: fill,
          borderWidth: StyleSheet.hairlineWidth * 2,
          borderColor: g.glassBorder,
          overflow: "hidden",
          padding,
        },
        web,
        style,
      ]}
    >
      {children}
    </View>
  );
}
