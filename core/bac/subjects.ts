import type { CanonicalSubject } from "./types";

/** Uppercase, accents removed, punctuation turned into spaces. */
export const normalizeSubjectName = (name: string): string =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/&/g, " ET ")
    .replace(/[^A-Z0-9]+/g, " ")
    .trim();

/** Order matters: the most specific patterns come first. */
const RULES: [RegExp, CanonicalSubject][] = [
  [/\bLLCER\b|LANGUES? LITT/, "llcer"],
  [/EXPERT/, "maths_expertes"],
  [/MATH.*COMPLEMENT|COMPLEMENT.*MATH/, "maths_complementaires"],
  [/ENS(EIGN(EMENT)?)? ?SCI|\bES\b SCIENTIFIQUE/, "ens_scientifique"],
  [/\bEPS\b|ED(UCATION|UC)? PHYS(IQUE)?( ET)? SPORT|EDUCATION PHYSIQUE/, "eps"],
  [/PHYS.*CHIM|\bPC\b|SCIENCES? PHYSIQUES?/, "physique_chimie"],
  [/\bSVT\b|\bS V T\b|VIE ET (DE LA )?TERRE|SC(IENCES?)? (DE LA )?VIE/, "svt"],
  [/\bNSI\b|NUMERIQUE ET SC/, "nsi"],
  [/INGENIEUR|\bSI\b/, "si"],
  [/\bSES\b|ECONOMIQUES? ET SOCIAL/, "ses"],
  [/HGGSP|GEOPOL/, "hggsp"],
  [/HUMANITES|\bHLP\b/, "hlp"],
  [/\bEMC\b|MORAL(E)? ET CIVIQUE|ENS(EIGN)? MORAL/, "emc"],
  [/HIST.*GEO|\bHG\b|HISTOIRE/, "histoire_geo"],
  [/PHILO/, "philosophie"],
  [/FRANC/, "francais"],
  [/MATH/, "maths"],
  [/ANGLAIS|ENGLISH/, "anglais"],
  [/ESPAGNOL|SPANISH/, "espagnol"],
  [/ALLEMAND|GERMAN/, "allemand"],
  [/ITALIEN/, "italien"],
];

export function classifySubject(name: string): CanonicalSubject {
  const n = normalizeSubjectName(name);
  for (const [re, subject] of RULES) {
    if (re.test(n)) { return subject; }
  }
  return "other";
}

export const SUBJECT_LABELS: Record<CanonicalSubject, string> = {
  maths: "Mathématiques",
  maths_expertes: "Maths expertes",
  maths_complementaires: "Maths complémentaires",
  physique_chimie: "Physique-chimie",
  svt: "SVT",
  nsi: "NSI",
  si: "Sciences de l'ingénieur",
  ses: "SES",
  hggsp: "HGGSP",
  hlp: "HLP",
  llcer: "LLCER",
  francais: "Français",
  philosophie: "Philosophie",
  histoire_geo: "Histoire-géographie",
  ens_scientifique: "Enseignement scientifique",
  eps: "EPS",
  emc: "EMC",
  anglais: "Anglais",
  espagnol: "Espagnol",
  allemand: "Allemand",
  italien: "Italien",
  other: "Autre",
};
