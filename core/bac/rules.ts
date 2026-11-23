/**
 * Bac général rules (sessions 2027 and later) and EPFL admission criteria.
 *
 * Sources (to re-check against the Bulletin officiel before each session):
 * - 100 coefficients = 40 contrôle continu + 60 épreuves; options add on top.
 * - Épreuve anticipée de mathématiques (end of Première, coef 2); Grand oral 10 → 8.
 * - Contrôle continu = annual averages of the livret scolaire, Première and Terminale.
 * - EPFL (swissuniversities, academic year 2026/27): spécialités Maths + Physique-chimie
 *   in Première and Terminale, final grades ≥ 16 in both, overall average ≥ 16.
 *   Since 2025 places are capped (3 000) and foreign applicants ranked by overall average.
 */
import { SUBJECT_LABELS } from "./subjects";
import type { BacComponent, BacProfile, EpflCriteria, SchoolYear } from "./types";

export const RULES_VERSION = "bac-general-2027+ / EPFL 2026-27";

const label = SUBJECT_LABELS;

/** School years: Première ends in June (session − 1), Terminale in June (session). */
export function schoolYearBounds(profile: BacProfile, year: SchoolYear): { start: Date; end: Date } {
  const endYear = year === "terminale" ? profile.session : profile.session - 1;
  return {
    start: new Date(Date.UTC(endYear - 1, 8, 1)), // 1 September
    end: new Date(Date.UTC(endYear, 6, 4)),       // early July
  };
}

export function buildBacComponents(profile: BacProfile): BacComponent[] {
  const premiereEnd = `${profile.session - 1}-06-30`;
  const terminaleEnd = `${profile.session}-06-30`;
  const premiereJune = `${profile.session - 1}-06-15`;
  const terminaleJune = `${profile.session}-06-17`;

  const dropped = profile.premiereSpecialties.find(s => !profile.keptSpecialties.includes(s));
  if (!dropped) {
    throw new Error("Le profil doit avoir exactement une spécialité abandonnée en fin de Première.");
  }

  const cc = (year: SchoolYear, subject: BacComponent["subject"], coefficient: number, lbl: string): BacComponent => ({
    id: `cc:${year}:${subject}`,
    label: `${lbl} (${year === "premiere" ? "1re" : "Tle"})`,
    block: "cc",
    year,
    coefficient,
    subject,
    date: year === "premiere" ? premiereEnd : terminaleEnd,
  });

  const components: BacComponent[] = [
    // Contrôle continu — Première (21)
    cc("premiere", "histoire_geo", 3, label.histoire_geo),
    cc("premiere", profile.lva, 3, `LVA ${label[profile.lva]}`),
    cc("premiere", profile.lvb, 3, `LVB ${label[profile.lvb]}`),
    cc("premiere", "ens_scientifique", 3, label.ens_scientifique),
    cc("premiere", "emc", 1, label.emc),
    cc("premiere", dropped, 8, `Spécialité abandonnée : ${label[dropped]}`),
    // Contrôle continu — Terminale (19)
    cc("terminale", "histoire_geo", 3, label.histoire_geo),
    cc("terminale", profile.lva, 3, `LVA ${label[profile.lva]}`),
    cc("terminale", profile.lvb, 3, `LVB ${label[profile.lvb]}`),
    cc("terminale", "ens_scientifique", 3, label.ens_scientifique),
    cc("terminale", "emc", 1, label.emc),
    cc("terminale", "eps", 6, label.eps),
    // Épreuves anticipées — fin de Première (12)
    { id: "exam:francais_ecrit", label: "Français écrit", block: "exam", year: "premiere", coefficient: 5, subject: "francais", date: premiereJune },
    { id: "exam:francais_oral", label: "Français oral", block: "exam", year: "premiere", coefficient: 5, subject: "francais", date: `${profile.session - 1}-06-25` },
    { id: "exam:eam", label: "Épreuve anticipée de maths", block: "exam", year: "premiere", coefficient: 2, subject: "maths", date: premiereJune },
    // Épreuves terminales (48)
    { id: `exam:spe:${profile.keptSpecialties[0]}`, label: `Spécialité ${label[profile.keptSpecialties[0]]}`, block: "exam", year: "terminale", coefficient: 16, subject: profile.keptSpecialties[0], date: terminaleJune },
    { id: `exam:spe:${profile.keptSpecialties[1]}`, label: `Spécialité ${label[profile.keptSpecialties[1]]}`, block: "exam", year: "terminale", coefficient: 16, subject: profile.keptSpecialties[1], date: terminaleJune },
    { id: "exam:philosophie", label: "Philosophie", block: "exam", year: "terminale", coefficient: 8, subject: "philosophie", date: `${profile.session}-06-15` },
    { id: "exam:grand_oral", label: "Grand oral", block: "exam", year: "terminale", coefficient: 8, subject: null, date: `${profile.session}-06-25` },
  ];

  for (const option of profile.options ?? []) {
    for (const year of option.years) {
      components.push(cc(year, option.subject, 2, `Option ${label[option.subject]}`));
    }
  }

  return components;
}

export function epflCriteria(profile: BacProfile): EpflCriteria {
  const has = (s: string) => profile.keptSpecialties.includes(s as never);
  if (!has("maths") || !has("physique_chimie")) {
    // Not eligible at all without both spécialités: surfaced by the UI.
    return { minOverall: 16, subjectMinimums: [], competitiveThreshold: { mean: 16.5, sd: 0.5 } };
  }
  return {
    minOverall: 16,
    subjectMinimums: [
      { componentId: "exam:spe:maths", label: "Spécialité Mathématiques", min: 16 },
      { componentId: "exam:spe:physique_chimie", label: "Spécialité Physique-chimie", min: 16 },
    ],
    // Hypothesis, editable in the app: no public figure exists yet for the cap.
    competitiveThreshold: { mean: 16.5, sd: 0.5 },
  };
}

export const isEpflEligibleProfile = (profile: BacProfile): boolean =>
  profile.premiereSpecialties.includes("maths") &&
  profile.premiereSpecialties.includes("physique_chimie") &&
  profile.keptSpecialties.includes("maths") &&
  profile.keptSpecialties.includes("physique_chimie");

/** Profile of the student this fork is built for (editable in the app). */
export const DEFAULT_PROFILE: BacProfile = {
  session: 2028,
  currentYear: "premiere",
  premiereSpecialties: ["maths", "physique_chimie", "svt"],
  keptSpecialties: ["maths", "physique_chimie"],
  lva: "anglais",
  lvb: "espagnol",
};
