# Audit Papillon — Refonte design + module « Objectif EPFL »

_Audit du 23/11/2026 — commit `3d983b33` (v8.6.2)_

---

## 1. État des lieux technique

| Élément | Constat |
|---|---|
| Stack | Expo SDK 58, React Native 0.88, React 19.3, TypeScript 6, expo-router (NativeTabs), Reanimated 4, Skia 2.11 |
| Données | WatermelonDB (schéma v37) + MMKV + Zustand |
| Services | Pronote (pawnote-lts), ÉcoleDirecte, Skolengo, Multi, AppScho… via `services/shared` (interface commune) |
| Taille | 433 fichiers TS/TSX (hors natif) |
| Installation | `npm install` OK : 1 309 paquets, 2 patches appliqués (pawnote, watermelondb) |
| TypeScript | `tsc --noEmit` : **672 erreurs déjà présentes dans le dépôt** (285 dans `app/`, 66 dans `ui/new/List.tsx`…), surtout des incompatibilités de types RN 0.88 / Reanimated. Le bundler Babel les ignore, mais aucun typage strict n'est possible en l'état. |
| Tests | 7/7 tests passent ; 1 suite (`manager.test.ts`) ne se lance pas (config Jest / ESM). 3 fichiers de test seulement (`services/mock/*.test.ts`), **aucun test sur les calculs de moyenne** |
| Gestionnaire de paquets | Le CI utilise **bun** (`bun install --frozen-lockfile`) mais **aucun lockfile n'est versionné** → builds non reproductibles. Installé ici avec npm. |
| Build local | Modules natifs (WatermelonDB, MMKV, Skia, Nitro) → **Expo Go impossible**, il faut un dev-client. Machine : Linux, Java 17 OK, **pas de SDK Android**, 26 Go libres sur le disque (un build Android en demande ~15). iOS impossible sous Linux. |

### Dette de code relevée
- **Deux bibliothèques UI parallèles** : `ui/components` (utilisée par 109 fichiers) et `ui/new` (57 fichiers), plus `@getpapillon/papillonkit`. Pas de source unique de vérité.
- **194 couleurs hex en dur** dans `app/`, `components/`, `ui/`. Le thème (`utils/theme/Theme.ts`) ne définit que 7 couleurs (primary, tint, background, overground, text, card, item) : pas d'échelle de surfaces, pas de couleurs sémantiques (succès/danger/avertissement), pas d'échelle typographique ni d'espacements.
- 13 fichiers `@ts-nocheck` (dont tous les modèles WatermelonDB) et 75 annotations `: any`.

---

## 2. Audit du moteur de notes — bugs et limites

Fichiers : `utils/grades/algorithms/{helpers,subject,weighted,median,time}.ts`, `services/pronote/grades.ts`, `app/(tabs)/grades/hooks/useGradesData.ts`.

| # | Problème | Gravité | Effet |
|---|---|---|---|
| G1 | **Normalisation incohérente** : une note /10 coef 1 pèse 10 points de dénominateur alors qu'une note /20 en pèse 20, sauf si la note dépasse 20 ou si le coef est inférieur à 1 (`outOf - 20 >= -5`). Règle arbitraire. | 🔴 | Moyennes fausses dès qu'un prof note sur 10, 40 ou 5. |
| G2 | **Notes bonus** : ajoute `(note − barème/2)` au numérateur et `+1` au dénominateur, ce qui mélange des points bruts et des points /20. | 🔴 | Moyenne faussée dans les matières qui ont un bonus. |
| G3 | **Notes optionnelles** : chaque note optionnelle est testée isolément (retirée ou non), alors que le choix optimal porte sur l'ensemble des notes optionnelles. Coût O(n²). | 🟠 | Sous-optimal si plusieurs notes optionnelles. |
| G4 | **Moyenne générale = moyenne simple des matières**, sans coefficients de matière. `gradesOverview` ne fournit pas ces coefficients, **mais pawnote expose `gradebook(session, period)`** (bulletin officiel : `coef` par matière, moyennes élève, classe, min et max, appréciations), que Papillon n'utilise pas. | 🔴 pour le bac | À brancher : c'est la source officielle des moyennes de bulletin utilisées pour le contrôle continu. |
| G5 | `helpers.ts` et `subject.ts` sont deux copies presque identiques du même algorithme (l'une renvoie 0, l'autre −1 quand il n'y a pas de note). | 🟠 | Divergences futures, comportement incohérent. |
| G6 | `median.ts` : les deux branches du `if` font le même calcul (code mort). | 🟢 | — |
| G7 | `time.ts` trie le tableau reçu **en place** (le hook compense avec une copie). Historique recalculé en O(n²). | 🟢 | Fragile. |
| G8 | `services/pronote/grades.ts` : `average.student ? -1 : …` teste un objet, toujours vrai, même quand la moyenne est « Non noté ». | 🟠 | Une moyenne cachée par l'établissement n'est jamais recalculée. |
| G9 | `Math.min(…, 20)` écrase les moyennes supérieures à 20 (bonus) sans le signaler. | 🟢 | — |
| G10 | `getCurrentPeriod` exclut une liste figée de noms (« Bac blanc »…) : les bacs blancs, qui sont **les meilleurs prédicteurs des épreuves finales**, sont ignorés. | 🟠 pour EPFL | Perte du signal le plus utile. |
| G11 | **Une seule année scolaire** : Pronote n'expose que l'année en cours. Les bulletins de **Première** (la moitié du contrôle continu) ne sont pas récupérables automatiquement. | 🔴 pour le bac | Il faut un import manuel ou la reprise du cache local de l'an dernier. |
| G12 | Aucune métadonnée sur le **type d'évaluation** (DS, DM, interro, bac blanc) : tout est mis au même niveau. | 🟠 | Le modèle prédictif ne peut pas distinguer les conditions « examen ». |

**Conclusion :** aujourd'hui, Papillon affiche la moyenne fournie par le service quand elle existe. Ses propres recalculs sont approximatifs et rien ne modélise le bac. Il faut un moteur de calcul neuf, testé, indépendant de l'UI.

---

## 3. Règles du bac et de l'EPFL (à vérifier sur les textes officiels)

### Bac général, session 2027 (élève de Terminale en 2026-27)
**Total : 100 coefficients = 40 de contrôle continu + 60 d'épreuves.**

| Bloc | Matière | Coef |
|---|---|---|
| Épreuves (60) | Français écrit / oral (anticipées) | 5 + 5 |
| | Épreuve anticipée de mathématiques (fin de Première) | 2 |
| | Philosophie | 8 |
| | Grand oral (passé de 10 à 8) | 8 |
| | Spécialité 1 (ex. Maths) | 16 |
| | Spécialité 2 (ex. Physique-chimie) | 16 |
| Contrôle continu (40) | Histoire-géo | 6 (3 + 3) |
| | LVA / LVB | 6 / 6 |
| | Enseignement scientifique | 6 |
| | EPS | 6 |
| | EMC | 2 |
| | Spécialité abandonnée en fin de Première | 8 |

La note de chaque matière du contrôle continu est la **moyenne annuelle du bulletin**, en Première puis en Terminale. Ces coefficients viennent de sites spécialisés : je n'ai pas encore trouvé le texte du Bulletin officiel, il faut les confirmer avant de les figer dans le code.

### EPFL (année 2026/27, d'après swissuniversities)
- Bac général avec les spécialités **Mathématiques et Physique-chimie en Première et en Terminale**.
- **Note finale ≥ 16 en Maths, ≥ 16 en Physique-chimie, et moyenne générale ≥ 16.**
- ⚠️ Depuis 2025 (pour au moins 4 ans), l'EPFL **plafonne à 3 000 places en première année** et **classe les candidats à diplôme étranger selon leur moyenne générale**. 16 est donc un **minimum, pas une garantie** : le seuil réel dépend de la concurrence.
- Il reste à clarifier : est-ce que la « note finale » en maths inclut l'épreuve anticipée ? Quel est le seuil effectif de la dernière année ? Quelle est la date limite de candidature pour 2027 ?

---

## 4. Architecture proposée — module « Objectif EPFL »

```
core/bac/                      ← pur TypeScript, sans React, 100 % testé
  rules/session2027.ts         ← coefficients versionnés par session
  rules/epfl.ts                ← critères d'admission versionnés
  normalize.ts                 ← notes → /20 (corrige G1, G2, G3, G9)
  aggregate.ts                 ← moyennes matière, annuelles, contrôle continu
  model/                       ← moteur probabiliste (voir §5)
  optimizer.ts                 ← notes cibles réalistes et priorités
database/models/BacProfile.ts  ← spécialités, LV, notes de Première importées, bacs blancs
app/(tabs)/goal/               ← nouvel onglet « Objectif »
```

Ordre des chantiers :
1. **Moteur de calcul fiable** (`core/bac`) avec tests unitaires, branché sur les écrans existants. Corrige G1 à G9.
2. **Profil bac** : saisie des spécialités, import des bulletins de Première (manuel ou OCR du PDF), étiquetage des types d'évaluation (bacs blancs inclus).
3. **Moteur probabiliste et optimiseur.**
4. **Refonte design** : système de tokens, puis composants, puis écrans.

---

## 5. Moteur probabiliste (spécification)

**Objectif :** estimer `P(admissible EPFL) = P(moyenne bac ≥ 16 ∧ note finale maths ≥ 16 ∧ note finale PC ≥ 16)`, puis `P(admis)` en intégrant un seuil compétitif incertain.

1. **Modèle de niveau par matière (bayésien hiérarchique)**
   `note_ij ~ Normal(θ_j + β_j·t + δ_type + γ·(moy_classe_ij − 10), σ_j²)`
   - θ_j : niveau réel dans la matière j ; β_j : tendance dans le temps ; δ_type : effet du type d'évaluation (DS, interro, bac blanc).
   - γ : correction de la difficulté du devoir grâce à la moyenne de classe fournie par Pronote.
   - L'a priori partagé entre matières (shrinkage) stabilise les matières qui ont peu de notes.
   - Une erreur de mesure est propre à chaque note : une note sur 5 est moins informative qu'un DS sur 20.
2. **Projection des moyennes annuelles** : distribution prédictive des notes restantes, puis de la moyenne de bulletin (pondération exacte des coefficients restants).
3. **Projection des épreuves finales** : note d'examen ≈ f(θ, résultats aux bacs blancs) avec une variance « jour J » plus forte (de l'ordre de σ ≈ 1,5 à 2 points, à calibrer).
4. **Monte-Carlo** (≥ 20 000 tirages, sur l'appareil) pour obtenir la distribution complète de la note de bac, ses intervalles de crédibilité et les probabilités conjointes. La corrélation entre maths et PC est modélisée, pas supposée nulle.
5. **Seuil compétitif EPFL** : variable aléatoire (a priori centré sur 16 avec une queue à droite), mise à jour si des données publiques apparaissent.
6. **Optimiseur** :
   - **Sensibilité** : ∂P/∂(moyenne de la matière j), pondérée par la marge de progression réaliste, pour dire où investir l'effort.
   - **Note cible par devoir à venir** : la plus petite note qui maintient P ≥ objectif, marquée « réaliste » si elle est sous le 75ᵉ percentile de la distribution prédictive de l'élève.
   - **Scénarios** : « si j'ai X au prochain DS de maths » donne la nouvelle probabilité en temps réel.
7. **Validation** : backtest en walk-forward (prédire le trimestre 2 à partir du trimestre 1), scores de calibration (Brier, CRPS) affichés dans un panneau « fiabilité du modèle ». Pas de promesse : un intervalle et un niveau de confiance.

Le calcul se fait sur l'appareil (aucune donnée envoyée), dans un worklet ou un thread séparé pour ne pas bloquer l'UI.

---

## 6. Refonte design — diagnostic et direction

**Diagnostic :** l'UI actuelle est propre mais générique (vert `#29947A`, cartes blanches, listes iOS). Le thème est trop pauvre pour une identité forte, il y a deux bibliothèques de composants en concurrence et des couleurs en dur partout.

**Base technique commune, quelle que soit la direction choisie :**
- `ui/tokens/` : couleurs (surfaces de 0 à 4, sémantiques, échelle de notes du rouge au vert), typographie (échelle fluide), espacements, rayons, ombres, durées et courbes d'animation. Mode clair et sombre, plus Material You.
- Fusion de `ui/components` et `ui/new` en une seule bibliothèque. Remplacement progressif des 194 hex.
- Graphiques en **Skia** (déjà installé) : courbes de moyenne avec bande d'incertitude, jauge de probabilité EPFL, heatmap des matières.
- Micro-interactions avec Reanimated 4 et des retours haptiques.

Trois directions possibles, à choisir avant de coder :
- **A. « Mission Control »** : sombre, données denses, chiffres en police mono, accents néon. Tableau de bord de pilotage.
- **B. « Liquid Glass premium »** : verre dépoli (iOS 26), dégradés vivants, grosses typographies éditoriales. Le plus spectaculaire.
- **C. « Swiss Precision »** : clin d'œil à l'EPFL, grille stricte, typographie suisse, rouge et blanc, beaucoup de blanc. Le plus élégant et le plus lisible.

---

## 7. Prérequis avant le chantier
- [ ] Choisir la direction design (A, B ou C).
- [ ] Préciser : en Terminale (bac 2027) ou en Première (bac 2028) ? Spécialité abandonnée ? LVA et LVB ?
- [ ] Disposer des bulletins de Première (PDF ou notes) pour le contrôle continu.
- [ ] Pour tester sur téléphone : installer le SDK Android (~15 Go, il reste 26 Go libres) ou utiliser EAS Build dans le cloud.
- [ ] Versionner un lockfile.
- [ ] Faire de ce clone un fork ou une branche Git avant les premières modifications. Le projet est sous licence GPL-3.0 : toute version redistribuée doit rester sous cette licence.
