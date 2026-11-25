#!/usr/bin/env bash
# Renders the Prism logo (assets/brand/*.svg) into the PNGs app.config.ts uses.
# Needs rsvg-convert (librsvg). Run from anywhere: scripts/prism-icons.sh
set -euo pipefail
cd "$(dirname "$0")/.."
for name in icon adaptive-foreground adaptive-background monochrome splash-icon; do
  rsvg-convert -w 1024 -h 1024 "assets/brand/$name.svg" -o "assets/images/prism-$name.png"
done
# Linux desktop: rounded tile with the standard margin (menus, docks, Electron window).
rsvg-convert -w 1024 -h 1024 assets/brand/desktop-icon.svg -o desktop/icon.png
rsvg-convert -w 196 -h 196 assets/brand/desktop-icon.svg -o assets/images/favicon.png
echo "OK: assets/images/prism-*.png, desktop/icon.png"
