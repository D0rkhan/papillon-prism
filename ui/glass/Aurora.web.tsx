import React from "react";

import { aurora, motion } from "./tokens";
import { useGlass } from "./useGlass";

const KEYFRAMES = `
@keyframes prism-drift-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(12vw,6vh) scale(1.12); } }
@keyframes prism-drift-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-10vw,8vh) scale(1.1); } }
@keyframes prism-drift-c { 0%,100% { transform: translate(0,0) scale(1.05); } 50% { transform: translate(10vw,-7vh) scale(0.95); } }
@media (prefers-reduced-motion: reduce) { .prism-blob { animation: none !important; } }
`;

const blob = (color: string, left: string, top: string, size: string, anim: string, ms: number, opacity: number): React.CSSProperties => ({
  position: "absolute",
  left,
  top,
  width: size,
  height: size,
  borderRadius: "50%",
  background: `radial-gradient(circle at center, ${color}E6 0%, ${color}59 45%, ${color}00 70%)`,
  filter: "blur(20px)",
  opacity,
  animation: `${anim} ${ms}ms ease-in-out infinite`,
  willChange: "transform",
});

/** Web / Linux desktop aurora: pure CSS, GPU-composited, honours reduced motion. */
export default function Aurora() {
  const g = useGlass();
  const o = g.auroraOpacity;
  const p = motion.auroraPeriodMs;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: g.background, pointerEvents: "none" }}>
      <style>{KEYFRAMES}</style>
      <div className="prism-blob" style={blob(aurora.indigo, "-30vw", "-35vh", "120vmax", "prism-drift-a", p, o)} />
      <div className="prism-blob" style={blob(aurora.violet, "45vw", "-20vh", "100vmax", "prism-drift-b", p + 2300, o)} />
      <div className="prism-blob" style={blob(aurora.cyan, "-20vw", "35vh", "95vmax", "prism-drift-c", p + 4600, o)} />
      <div className="prism-blob" style={blob(aurora.pink, "50vw", "55vh", "85vmax", "prism-drift-a", p + 6900, o)} />
    </div>
  );
}
