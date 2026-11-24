#!/usr/bin/env bash
# Renders the Prism logo (assets/brand/*.svg) into the PNGs app.config.ts uses.
# Needs rsvg-convert (librsvg). Run from anywhere: scripts/prism-icons.sh
set -euo pipefail
cd "$(dirname "$0")/.."
for name in icon adaptive-foreground adaptive-background monochrome splash-icon; do
  rsvg-convert -w 1024 -h 1024 "assets/brand/$name.svg" -o "assets/images/prism-$name.png"
done
echo "OK: assets/images/prism-*.png"
