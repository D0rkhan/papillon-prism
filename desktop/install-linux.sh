#!/usr/bin/env bash
# Installe Papillon Prism pour l'utilisateur courant (sans sudo) :
#   ~/.local/bin/papillon-prism.AppImage + entrée dans le menu des applications.
set -euo pipefail
cd "$(dirname "$0")"
APPIMAGE=$(ls -t out/*.AppImage 2>/dev/null | head -1 || true)
if [[ -z "${APPIMAGE}" ]]; then
  echo "Aucune AppImage dans desktop/out : lance d'abord « npm run dist » dans desktop/." >&2
  exit 1
fi
install -Dm755 "${APPIMAGE}" "${HOME}/.local/bin/papillon-prism.AppImage"
install -Dm644 icon.png "${HOME}/.local/share/icons/hicolor/512x512/apps/papillon-prism.png"
install -Dm644 /dev/stdin "${HOME}/.local/share/applications/papillon-prism.desktop" <<DESKTOP
[Desktop Entry]
Name=Papillon Prism
Comment=Vie scolaire et objectif EPFL
Exec=${HOME}/.local/bin/papillon-prism.AppImage %U
Icon=papillon-prism
Terminal=false
Type=Application
Categories=Education;
StartupWMClass=Papillon Prism
DESKTOP
update-desktop-database "${HOME}/.local/share/applications" 2>/dev/null || true
echo "Papillon Prism installé. Lance-le depuis le menu ou avec : ~/.local/bin/papillon-prism.AppImage"
if ! compgen -G "/usr/lib/libfuse.so.2*" >/dev/null && ! compgen -G "/usr/lib64/libfuse.so.2*" >/dev/null && ! ldconfig -p 2>/dev/null | grep -q "libfuse.so.2"; then
  echo "Note : les AppImage ont besoin de FUSE 2 → sudo pacman -S fuse2"
fi
