/**
 * Domain types of the bac / EPFL engine.
 *
 * Everything in `core/bac` is plain TypeScript: no React, no React Native, no I/O.
 * It runs the same way on Android, on the web (Linux build) and inside Jest.
 */

export type SchoolYear = "premiere" | "terminale";

/** Canonical subject, whatever the school's own naming ("MATHS", "MATHEMATIQUES"…). */
export type CanonicalSubject =
  | "maths"
  | "maths_expertes"
  | "maths_complementaires"
  | "physique_chimie"
  | "svt"
  | "nsi"
  | "si"
  | "ses"
  | "hggsp"
  | "hlp"
  | "llcer"
  | "francais"
  | "philosophie"
  | "histoire_geo"
  | "ens_scientifique"
  | "eps"
  | "emc"
  | "anglais"
  | "espagnol"
  | "allemand"
  | "italien"
  | "other";

export type EvalKind = "ds" | "interro" | "dm" | "oral" | "bac_blanc" | "other";

export interface BacGrade {
  id: string;
  subject: CanonicalSubject;
  /** Raw score. `null` when the grade does not count (absent, exempted, not graded…). */
  value: number | null;
  outOf: number;
  coefficient: number;
  date: Date;
  periodId: string;
  bonus?: boolean;
  optional?: boolean;
  /** Pronote's "Ramener sur 20" (false: weighted by its scale). */
  outOf20?: boolean;
  /** Class average of this assessment, on the same scale as `value`. */
  classAverage?: number;
  kind?: EvalKind;
}

export interface BacPeriod {
  id: string;
  name: string;
  start: Date;
  end: Date;
  year: SchoolYear;
}

/** Official average printed on a report card, once the period is closed. */
export interface OfficialAverage {
  periodId: string;
  subject: CanonicalSubject;
  value: number;
}

export interface BacProfile {
  /** Bac session (year of the Terminale exams). */
  session: number;
  /** Year the student is currently in. */
  currentYear: SchoolYear;
  /** The 3 spécialités of Première. */
  premiereSpecialties: [CanonicalSubject, CanonicalSubject, CanonicalSubject];
  /** The 2 spécialités kept in Terminale. */
  keptSpecialties: [CanonicalSubject, CanonicalSubject];
  lva: CanonicalSubject;
  lvb: CanonicalSubject;
  /** Optional teachings (maths expertes…), coefficient 2 per year each. */
  options?: { subject: CanonicalSubject; years: SchoolYear[] }[];
}

export type ComponentBlock = "cc" | "exam";

export interface BacComponent {
  id: string;
  label: string;
  block: ComponentBlock;
  year: SchoolYear;
  coefficient: number;
  /** Subject whose ability drives this component. `null` = composite (grand oral). */
  subject: CanonicalSubject | null;
  /** Exam date (ISO) for exams; end of school year for contrôle continu. */
  date: string;
}

export interface EpflCriteria {
  minOverall: number;
  subjectMinimums: { componentId: string; label: string; min: number }[];
  /**
   * Since 2025 EPFL caps first-year places and ranks foreign-diploma applicants
   * by their overall average: the real bar is above the legal minimum and unknown.
   * Modelled as a normal distribution, truncated at `minOverall`.
   */
  competitiveThreshold: { mean: number; sd: number };
}
