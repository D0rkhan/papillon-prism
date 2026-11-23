/**
 * Web / desktop shim: react-native-linear-gradient has no web implementation
 * (it calls requireNativeComponent). expo-linear-gradient has the same props.
 */
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import React from "react";

type Props = React.ComponentProps<typeof ExpoLinearGradient> & { useAngle?: boolean; angle?: number; angleCenter?: { x: number; y: number } };

const LinearGradient = ({ useAngle: _useAngle, angle: _angle, angleCenter: _angleCenter, ...props }: Props) => <ExpoLinearGradient {...props} />;

export default LinearGradient;
export { LinearGradient };
