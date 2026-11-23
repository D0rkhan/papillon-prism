import React from "react";

import { useGlass } from "./useGlass";

const CSS = `
@keyframes prism-breathe { 0%,100% { opacity: .9; transform: translate3d(0,0,0) scale(1); } 50% { opacity: 1; transform: translate3d(2vw,1.5vh,0) scale(1.06); } }
@media (prefers-reduced-motion: reduce) { .prism-glow { animation: none !important; } }
`;

/**
 * Obsidian backdrop (web / Linux desktop): near-black canvas, two faint light leaks,
 * a vignette and a fine grain. Quiet by design — the glass catches the light, not the wall.
 */
export default function Aurora() {
  const g = useGlass();
  const glow = (color: string, x: string, y: string, size: string, delay: number): React.CSSProperties => ({
    position: "absolute",
    left: x,
    top: y,
    width: size,
    height: size,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
    filter: "blur(40px)",
    animation: `prism-breathe 26s ease-in-out ${delay}s infinite`,
    willChange: "transform, opacity",
  });
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: g.background, pointerEvents: "none" }}>
      <style>{CSS}</style>
      <div className="prism-glow" style={glow(g.dark ? "rgba(110,106,246,0.16)" : "rgba(110,106,246,0.10)", "-25vw", "-45vh", "90vmax", 0)} />
      <div className="prism-glow" style={glow(g.dark ? "rgba(90,184,255,0.07)" : "rgba(90,184,255,0.06)", "55vw", "40vh", "80vmax", -9)} />
      <div style={{ position: "absolute", inset: 0, background: g.dark ? "radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(0,0,0,0.55) 100%)" : "none" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: g.dark ? 0.06 : 0.03,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
