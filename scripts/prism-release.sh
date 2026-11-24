#!/usr/bin/env bash
# Publie une nouvelle version de Papillon Prism :
#   1. incrémente la version (8.6.2 → 8.6.3, ou celle passée en argument)
#   2. commite, crée le tag prism-v<version> et pousse sur le dépôt « prism »
#   3. GitHub Actions construit l'APK signé et le publie → bouton « Mettre à jour » sur le téléphone
# Usage : scripts/prism-release.sh [version]
set -euo pipefail
cd "$(dirname "$0")/.."

git remote get-url prism >/dev/null 2>&1 || { echo "Remote « prism » absent (ton dépôt GitHub perso)." >&2; exit 1; }
[[ -z "$(git status --porcelain)" ]] || { echo "Il reste des modifications non commitées." >&2; exit 1; }

CURRENT=$(node -p "require('./package.json').version")
NEXT=${1:-$(node -e "const v='$CURRENT'.split('.').map(Number); v[2]++; console.log(v.join('.'))")}

for f in package.json desktop/package.json; do
  node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('$f'));p.version='$NEXT';fs.writeFileSync('$f',JSON.stringify(p,null,2)+'\n')"
done
npm install --package-lock-only --ignore-scripts --silent >/dev/null 2>&1 || true

git add package.json package-lock.json desktop/package.json
git commit -q -m "chore: Papillon Prism $NEXT"
git tag "prism-v$NEXT"
git push -q prism HEAD:main "prism-v$NEXT"
echo "Version $NEXT envoyée. L'APK sera prêt dans ~20 min : https://github.com/$(git remote get-url prism | sed -E 's#.*github.com[:/]##; s#\.git$##')/actions"
