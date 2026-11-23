# Papillon Prism

Fork de [Papillon](https://github.com/PapillonApp/Papillon) (GPL-3.0) : refonte Liquid Glass
et module « Objectif EPFL » (prédiction du bac et des critères d'admission).

## Linux (Arch)

```bash
cd desktop
npm install                 # une fois (Electron + electron-builder)
npm run dist                # build web + AppImage dans desktop/out/
./install-linux.sh          # installe dans ~/.local/bin + menu des applications
```

Développement rapide : `npm run dev` (dans `desktop/`).

L'app de bureau fait passer les requêtes vers Pronote / ENT par Electron (pas de CORS,
cookies et redirections gérés) et affiche les pages de connexion dans une `<webview>`.

## Android (Galaxy S22)

```bash
npx expo prebuild --platform android   # projet natif (déjà testé)
npx expo run:android --variant release # nécessite le SDK Android + le téléphone en USB
```

Identifiant : `app.papillonprism.android` (cohabite avec le Papillon officiel).

## Moteur bac / EPFL

- `core/bac/` : TypeScript pur, testé (`npx jest core utils/bac`).
- Profil par défaut : bac 2028, Maths + Physique-chimie (SVT abandonnée), anglais LVA, espagnol LVB.
- Écran : onglet Notes → carte « Objectif EPFL ». Démo sans compte : route `/objectif-demo`
  (menu développeur).
- Hypothèses à surveiller : seuil sélectif EPFL (16,5 ± 0,5), coefficients bac 2028
  (à confirmer au Bulletin officiel).
