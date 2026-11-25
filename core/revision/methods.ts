/**
 * Revision protocols, per kind of subject and per kind of session.
 *
 * Built on the techniques with the strongest evidence (Dunlosky et al., 2013,
 * "Improving Students' Learning With Effective Learning Techniques"):
 *   - practice testing / retrieval practice — high utility (Roediger & Karpicke, 2006);
 *   - distributed practice / spacing — high utility (Cepeda et al., 2006);
 *   - interleaved practice — moderate to high for maths (Rohrer & Taylor, 2007);
 *   - self-explanation and elaborative interrogation — moderate (Chi et al., 1994);
 * plus dual coding (Paivio), and classroom practices that use them well around
 * the world: the "méthode des J" of French prépas and PASS, Cornell notes,
 * Singapore's concrete → pictorial → abstract progression in maths, the Leitner
 * box, Pomodoro focus blocks. Re-reading, highlighting and copying the lesson out
 * again are deliberately absent: they feel productive and are not (low utility).
 */

export type SubjectFamily = "sciences" | "vivant" | "langues" | "lettres" | "humanites" | "autre";
export type SessionMode = "decouverte" | "rappel" | "controle" | "express";

export interface MethodStep {
  title: string;
  minutes: number;
  /** What to do, as an instruction. */
  how: string;
  /** Why it works, in one sentence. */
  why: string;
  /** Suggest writing flashcards during this step. */
  cards?: boolean;
}

export interface Protocol {
  mode: SessionMode;
  family: SubjectFamily;
  title: string;
  summary: string;
  steps: MethodStep[];
}

export const MODE_LABEL: Record<SessionMode, string> = {
  decouverte: "Premier passage",
  rappel: "Rappel espacé",
  controle: "Préparer un contrôle",
  express: "Cartes express",
};

export const MODE_HINT: Record<SessionMode, string> = {
  decouverte: "Le jour du cours ou le lendemain : comprendre et fabriquer ses questions.",
  rappel: "Se tester avant d'oublier : c'est le cœur de la mémorisation.",
  controle: "Conditions réelles, chronométré, puis analyse des erreurs.",
  express: "10 minutes de cartes dues, n'importe où.",
};

const FAMILY_OF: Record<string, SubjectFamily> = {
  maths: "sciences", maths_expertes: "sciences", maths_complementaires: "sciences", physique_chimie: "sciences", nsi: "sciences", si: "sciences",
  svt: "vivant", ens_scientifique: "vivant",
  anglais: "langues", espagnol: "langues", allemand: "langues", italien: "langues", llcer: "langues",
  francais: "lettres", philosophie: "lettres", hlp: "lettres",
  histoire_geo: "humanites", hggsp: "humanites", ses: "humanites", emc: "humanites",
};

export const familyOf = (canonical: string | undefined): SubjectFamily => (canonical && FAMILY_OF[canonical]) || "autre";

export const FAMILY_LABEL: Record<SubjectFamily, string> = {
  sciences: "Sciences exactes",
  vivant: "Sciences du vivant",
  langues: "Langues",
  lettres: "Lettres et philosophie",
  humanites: "Histoire, géo, SES",
  autre: "Autre matière",
};

const BRAIN_DUMP: MethodStep = {
  title: "Page blanche",
  minutes: 4,
  how: "Sans rien regarder, écris tout ce dont tu te souviens du chapitre : définitions, idées clés, formules, exemples, schémas.",
  why: "Chercher dans sa mémoire renforce bien plus le souvenir que relire (effet de test).",
};

const CHECK: MethodStep = {
  title: "Vérifier et combler",
  minutes: 4,
  how: "Ouvre le cours et complète au stylo d'une autre couleur ce qui manquait ou était faux. Ces trous sont ta liste de travail.",
  why: "Un retour immédiat sur l'erreur évite de consolider une fausse réponse.",
};

const PRACTICE: Record<SubjectFamily, MethodStep> = {
  sciences: {
    title: "Exercices entrelacés",
    minutes: 15,
    how: "Fais 3 exercices de types différents, mélangés, sans le cours : identifie d'abord quelle méthode s'applique, puis résous. Si tu bloques, passe du concret (un exemple chiffré) au schéma, puis à l'abstrait.",
    why: "Mélanger les types d'exercices apprend à choisir la bonne méthode, ce que le contrôle évalue vraiment (entrelacement, approche concret-schéma-abstrait de Singapour).",
  },
  vivant: {
    title: "Schémas de mémoire",
    minutes: 15,
    how: "Redessine de mémoire les schémas clés (légendes comprises), puis explique à voix haute chaque mécanisme étape par étape, en te demandant « pourquoi ? » à chaque étape.",
    why: "Associer image et mots crée deux traces en mémoire (double codage) ; s'expliquer révèle ce qu'on n'a pas compris.",
  },
  langues: {
    title: "Produire sans filet",
    minutes: 15,
    how: "5 min : vocabulaire du thème en cartes, dans les deux sens. 10 min : parle ou écris sur le thème sans dictionnaire, puis corrige-toi avec le cours. Bonus : répète un audio en même temps que lui (shadowing).",
    why: "Produire oblige à rappeler les mots et la grammaire ; reconnaître ne suffit pas pour parler.",
  },
  lettres: {
    title: "Plan éclair",
    minutes: 15,
    how: "Choisis un sujet type et bâtis un plan détaillé en 10 min (problématique, parties, exemples ou citations). Compare ensuite avec un corrigé ou le cours.",
    why: "S'entraîner au geste de l'épreuve vaut mieux que mémoriser des fiches : c'est le transfert qui est noté.",
  },
  humanites: {
    title: "Frise et pourquoi",
    minutes: 15,
    how: "Refais de mémoire la frise ou le croquis du chapitre, puis réponds par écrit à 3 questions « pourquoi ? » / « quelles conséquences ? » sur les notions clés.",
    why: "Relier les faits par des causes (interrogation élaborative) les rend bien plus faciles à retrouver.",
  },
  autre: {
    title: "Se tester",
    minutes: 15,
    how: "Écris 5 questions sur le chapitre comme le ferait le professeur, réponds-y sans le cours, puis corrige.",
    why: "Se poser des questions et y répondre est la technique d'apprentissage la plus efficace mesurée.",
  },
};

const CARDS: MethodStep = {
  title: "Cartes de rappel",
  minutes: 5,
  how: "Transforme chaque trou repéré en carte question → réponse (une idée par carte, formulée en question). L'app les reprogramme au bon moment.",
  why: "La répétition espacée revoit chaque carte juste avant l'oubli (algorithme FSRS, celui d'Anki).",
  cards: true,
};

const RATE: MethodStep = {
  title: "Bilan",
  minutes: 1,
  how: "Note honnêtement comment s'est passée la page blanche : c'est ce qui fixe la date du prochain rappel.",
  why: "Une auto-évaluation juste évite de revoir trop tôt ce qui est su et trop tard ce qui ne l'est pas.",
};

const CONTROL_STEPS = (family: SubjectFamily): MethodStep[] => [
  {
    title: "Épreuve blanche",
    minutes: 25,
    how: family === "sciences" || family === "vivant"
      ? "Un sujet d'annale ou un ancien contrôle, chronométré, sans cours ni calculatrice si elle sera interdite. Rédige comme le jour J."
      : family === "langues"
        ? "Compréhension puis expression en temps limité, sans dictionnaire, comme le jour J."
        : "Un sujet type en temps limité : introduction et plan complets, au moins une partie rédigée.",
    why: "Se tester dans les conditions de l'examen est ce qui prédit le mieux la note (pratique de test).",
  },
  {
    title: "Carnet d'erreurs",
    minutes: 8,
    how: "Corrige, puis pour chaque erreur écris : ce que j'ai fait, la bonne démarche, comment je la reconnaîtrai la prochaine fois.",
    why: "Analyser ses erreurs transforme un échec ponctuel en règle réutilisable.",
    cards: true,
  },
  { ...BRAIN_DUMP, title: "Points faibles", minutes: 5, how: "Reprends de mémoire les deux notions où tu as le plus perdu de points, puis vérifie." },
  RATE,
];

export function protocolFor(family: SubjectFamily, mode: SessionMode): Protocol {
  const base = { family, mode, title: MODE_LABEL[mode] };
  switch (mode) {
    case "decouverte":
      return {
        ...base,
        summary: "Comprendre le cours du jour et préparer ses futures questions (méthode Cornell + J0).",
        steps: [
          {
            title: "Lecture active",
            minutes: 8,
            how: "Relis le cours une seule fois, crayon en main : à gauche de chaque idée, écris la question à laquelle elle répond (colonne Cornell).",
            why: "Formuler les questions prépare tous les rappels suivants et oblige à comprendre plutôt qu'à survoler.",
          },
          {
            title: "Explique-le simplement",
            minutes: 6,
            how: "Explique le chapitre à voix haute comme à un élève de 4e, sans notes. Là où tu hésites, retourne au cours.",
            why: "La technique Feynman et l'auto-explication révèlent immédiatement ce qui n'est pas compris.",
          },
          { ...PRACTICE[family], minutes: 8 },
          CARDS,
          RATE,
        ],
      };
    case "rappel":
      return {
        ...base,
        summary: "Se tester avant d'oublier : page blanche, vérification, pratique, cartes.",
        steps: [BRAIN_DUMP, CHECK, PRACTICE[family], CARDS, RATE],
      };
    case "controle":
      return { ...base, summary: "Répétition générale : sujet chronométré, puis erreurs transformées en règles.", steps: CONTROL_STEPS(family) };
    case "express":
      return {
        ...base,
        summary: "Les cartes dues, dans le désordre, toutes matières mélangées.",
        steps: [{ ...CARDS, title: "Cartes dues", minutes: 10, how: "Réponds à chaque carte à voix haute ou par écrit avant de la retourner, puis note-toi.", cards: false }],
      };
  }
}

export const totalMinutes = (p: Protocol) => p.steps.reduce((s, x) => s + x.minutes, 0);

/** The research behind the space, shown in "La méthode". */
export const EVIDENCE: { title: string; detail: string; origin: string }[] = [
  { title: "Se tester plutôt que relire", detail: "Retrouver une information en mémoire la consolide bien plus que la relire.", origin: "Roediger & Karpicke, 2006 · Dunlosky et al., 2013" },
  { title: "Espacer les révisions", detail: "Revoir à intervalles croissants (J1, J3, J7…) bat le bachotage à temps égal. FSRS calcule ces intervalles pour chaque chapitre.", origin: "Cepeda et al., 2006 · méthode des J (prépas, PASS) · FSRS (Anki)" },
  { title: "Mélanger les exercices", detail: "Alterner des types d'exercices apprend à choisir la méthode, pas seulement à l'appliquer.", origin: "Rohrer & Taylor, 2007" },
  { title: "S'expliquer le pourquoi", detail: "Expliquer à voix haute et se demander « pourquoi ? » révèle et répare les trous de compréhension.", origin: "Chi et al., 1994 · technique Feynman" },
  { title: "Image + mots", detail: "Un schéma redessiné de mémoire laisse deux traces au lieu d'une.", origin: "Paivio, double codage" },
  { title: "Du concret à l'abstrait", detail: "En maths, partir d'un exemple, le schématiser, puis généraliser.", origin: "Méthode de Singapour (CPA)" },
  { title: "Des blocs de concentration", detail: "25 minutes sans téléphone, 5 minutes de pause : la concentration tient, la fatigue se gère.", origin: "Pomodoro (F. Cirillo)" },
];
