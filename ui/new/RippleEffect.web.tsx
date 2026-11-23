import React from "react";
import { Pressable, ViewStyle } from "react-native";

interface RippleProps {
  style?: ViewStyle | ViewStyle[];
  onTap?: () => void;
  rippleColor?: string;
  pressScale?: number;
  scaleDuration?: number;
  children?: React.ReactNode;
}

/**
 * Web / Linux desktop version of the ripple button: real DOM clicks (mouse, keyboard,
 * touchscreen), pointer cursor, hover and press feedback. The native version relies on
 * gesture-handler taps, which do not fire reliably on the web.
 */
const Ripple: React.FC<RippleProps> = ({ style, onTap, rippleColor = "rgba(0,0,0,0.1)", pressScale = 0.96, scaleDuration = 100, children }) => (
  <Pressable
    onPress={onTap}
    style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => [
      style as ViewStyle,
      {
        overflow: "hidden",
        cursor: "pointer",
        transform: [{ scale: pressed ? pressScale : 1 }],
        transitionDuration: `${scaleDuration}ms`,
        transitionProperty: "transform, box-shadow",
        boxShadow: hovered ? `inset 0 0 0 999px ${rippleColor}` : undefined,
      } as unknown as ViewStyle,
    ]}
  >
    {children}
  </Pressable>
);

export default Ripple;
