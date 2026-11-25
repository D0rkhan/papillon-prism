/**
 * Parcoursup dossier targets.
 *
 * Parcoursup does not compute one average: each formation reads the report
 * cards of Première (every term) and of Terminale up to the winter council
 * (terms 1–2, or semester 1), plus the épreuves anticipées, and publishes its
 * "critères généraux d'examen des vœux" with a degree of importance for each
 * (Essentiel, Très important, Important, Complémentaire). We turn those degrees
 * into weights (3 / 2 / 1 / 0.5) per subject, which gives a dossier average
 * the formation is likely to look at, and how much each subject still moves it.
 *
 * Unlike the bac, a Parcoursup dossier is frozen in March of Terminale: grades
 * after that do not count, so the remaining weight shrinks term after term.
 */
import { DEFAULT_ENGINE_SETTINGS, EngineSettings, PeriodPart, Prepared, periodTools } from "@/core/bac/engine";
import { predictLevel } from "@/core/bac/model";
import { SUBJECT_LABELS } from "@/core/bac/subjects";
import type { BacPeriod, CanonicalSubject, SchoolYear } from "@/core/bac/types";

import { GoalPlan, Lever, planGoal } from "./allocate";
import { leverScale } from "./bac";

export type Importance = 0 | 0.5 | 1 | 2 | 3;
export const IMPORTANCE_LABEL: Record<Importance, string> = {
  3: "Essentiel",
  2: "Très important",
  1: "Important",
  0.5: "Complémentaire",
  0: "Non pris en compte",
};

export interface ParcoursupProfile {
  key: string;
  label: string;
  description: string;
  /** Default target, an order of magnitude only: every formation differs. */
  suggestedGoal: number;
  /** Importance per subject; "spe" = the spécialités, "other" = every other subject. */
  weights: Partial<Record<CanonicalSubject | "spe" | "other", Importance>>;
}

export const PARCOURSUP_PROFILES: ParcoursupProfile[] = [
  {
    key: "cpge-sci",
    label: "Prépa scientifique",
    description: "MPSI, PCSI, MP2I : maths et physique décident, le reste départage.",
    suggestedGoal: 16,
    weights: { maths: 3, physique_chimie: 3, maths_expertes: 2, nsi: 2, si: 2, anglais: 1, francais: 1, philosophie: 1, other: 0.5 },
  },
  {
    key: "inge",
    label: "École d'ingénieurs post-bac",
    description: "INSA, Polytech, écoles en 5 ans : sciences d'abord, dossier régulier.",
    suggestedGoal: 15,
    weights: { maths: 3, physique_chimie: 2, spe: 2, maths_expertes: 1, anglais: 1, francais: 1, other: 0.5 },
  },
  {
    key: "sante",
    label: "Santé (PASS / L.AS)",
    description: "Sciences, régularité et expression écrite.",
    suggestedGoal: 15,
    weights: { svt: 3, physique_chimie: 3, maths: 2, francais: 1, anglais: 1, other: 0.5 },
  },
  {
    key: "licence-sci",
    label: "Licence scientifique",
    description: "Peu sélective : les spécialités comptent le plus.",
    suggestedGoal: 12,
    weights: { spe: 2, maths: 2, other: 1 },
  },
  {
    key: "iep",
    label: "Sciences Po / IEP",
    description: "Dossier complet : français, histoire, langues, philosophie.",
    suggestedGoal: 16,
    weights: { francais: 3, histoire_geo: 3, philosophie: 2, anglais: 2, hggsp: 2, ses: 2, espagnol: 1, allemand: 1, other: 1 },
  },
  {
    key: "equilibre",
    label: "Dossier équilibré",
    description: "Toutes les matières au même poids, spécialités en double.",
    suggestedGoal: 14,
    weights: { spe: 2, other: 1 },
  },
];

/** Last day of the dossier: Terminale report cards after it are not sent. */
export const dossierCutoff = (session: number) => new Date(Date.UTC(session, 2, 31));

export interface DossierSubject {
  subject: CanonicalSubject;
  label: string;
  weight: number;
  /** Average over the dossier periods, as projected today. */
  projected: number;
  /** Share of this subject's dossier still to be written (0–1). */
  open: number;
  periods: number;
}

export interface DossierProjection {
  expected: number;
  sd: number;
  subjects: DossierSubject[];
  levers: Lever[];
  /** Dossier periods still open, oldest first. */
  openPeriods: { name: string; year: SchoolYear }[];
}

const isSpe = (p: Prepared, s: CanonicalSubject) => p.input.profile.premiereSpecialties.includes(s);

function weightOf(profile: ParcoursupProfile, p: Prepared, s: CanonicalSubject): number {
  const w = profile.weights;
  if (w[s] !== undefined) { return w[s] as number; }
  if (isSpe(p, s) && w.spe !== undefined) { return w.spe; }
  return w.other ?? 0;
}

/** Subjects a dossier holds, with the years they appear in. */
function dossierSubjects(p: Prepared): Map<CanonicalSubject, SchoolYear[]> {
  const pr = p.input.profile;
  const both: SchoolYear[] = ["premiere", "terminale"];
  const out = new Map<CanonicalSubject, SchoolYear[]>();
  for (const s of pr.keptSpecialties) { out.set(s, both); }
  for (const s of pr.premiereSpecialties) { if (!out.has(s)) { out.set(s, ["premiere"]); } }
  for (const s of [pr.lva, pr.lvb, "histoire_geo", "ens_scientifique", "eps", "emc"] as CanonicalSubject[]) { out.set(s, both); }
  out.set("francais", ["premiere"]);
  out.set("philosophie", ["terminale"]);
  for (const o of pr.options ?? []) { out.set(o.subject, o.years); }
  return out;
}

export function projectDossier(p: Prepared, profile: ParcoursupProfile, settings: EngineSettings = DEFAULT_ENGINE_SETTINGS): DossierProjection {
  const { periodsOf, partsFor } = periodTools(p.input, settings);
  const cutoff = dossierCutoff(p.input.profile.session);
  const periodsFor = (year: SchoolYear): BacPeriod[] =>
    // A term ending a few days after the cutoff still reaches the dossier (late councils).
    periodsOf(year).filter(per => year === "premiere" || per.end.getTime() <= cutoff.getTime() + 21 * 864e5);

  const subjects: DossierSubject[] = [];
  const variances: { w: number; v: number }[] = [];
  const openPeriods = new Map<string, { name: string; year: SchoolYear; start: number }>();
  const now = p.input.now;

  for (const [subject, years] of dossierSubjects(p)) {
    const weight = weightOf(profile, p, subject);
    const fit = p.fits.get(subject);
    if (weight <= 0 || !fit) { continue; }
    const all: { part: PeriodPart; period: BacPeriod }[] = [];
    for (const year of years) {
      const periods = periodsFor(year);
      partsFor(subject, periods).forEach((part, i) => all.push({ part, period: periods[i] }));
    }
    const kept = all.filter(({ part }) => part.fixed !== null || part.obsWeight > 0 || part.futureCount >= 0.25);
    if (kept.length === 0) { continue; }

    let sum = 0;
    let open = 0;
    let noise = 0;
    for (const { part, period } of kept) {
      if (part.fixed !== null) { sum += part.fixed; continue; }
      const fut = part.futureCount >= 0.25 ? part.futureWeight : 0;
      const level = Math.min(20, Math.max(0, predictLevel(fit, part.futureDate).mean));
      const avg = fut > 0 ? ((part.obsAvg ?? 0) * part.obsWeight + level * fut) / (part.obsWeight + fut) : (part.obsAvg ?? level);
      sum += avg;
      if (fut > 0) {
        const f = fut / (part.obsWeight + fut);
        open += f;
        noise += (f * fit.sigma / Math.sqrt(Math.max(1, part.futureCount))) ** 2;
        if (period.end > now) { openPeriods.set(period.id, { name: period.name, year: period.year, start: period.start.getTime() }); }
      }
    }
    const n = kept.length;
    const levelSd = predictLevel(fit, now).sd;
    const shareOpen = open / n;
    subjects.push({ subject, label: SUBJECT_LABELS[subject], weight, projected: sum / n, open: shareOpen, periods: n });
    variances.push({ w: weight, v: (shareOpen * levelSd) ** 2 + noise / (n * n) });
  }

  const W = subjects.reduce((s, x) => s + x.weight, 0) || 1;
  const expected = subjects.reduce((s, x) => s + x.weight * x.projected, 0) / W;
  const sd = Math.max(0.15, Math.sqrt(variances.reduce((s, x) => s + (x.w / W) ** 2 * x.v, 0)));
  const levers: Lever[] = subjects
    .filter(x => x.open > 0.01 && (p.fits.get(x.subject)?.n ?? 0) > 0)
    .map(x => {
      const fit = p.fits.get(x.subject);
      return {
        key: x.subject,
        label: x.label,
        impact: (x.weight / W) * x.open,
        level: Math.min(20, Math.max(0, fit ? predictLevel(fit, now).mean : x.projected)),
        scale: leverScale(fit?.sigma),
      };
    })
    .sort((a, b) => b.impact * b.scale - a.impact * a.scale);

  return {
    expected,
    sd,
    subjects: subjects.sort((a, b) => b.weight - a.weight || b.projected - a.projected),
    levers,
    openPeriods: [...openPeriods.values()].sort((a, b) => a.start - b.start).map(({ name, year }) => ({ name, year })),
  };
}

export interface ParcoursupTarget extends GoalPlan {
  projection: DossierProjection;
}

export function parcoursupTarget(
  p: Prepared,
  profile: ParcoursupProfile,
  goal: number,
  options: { subjects?: CanonicalSubject[]; confidence?: number } = {}
): ParcoursupTarget {
  const projection = projectDossier(p, profile, p.settings);
  const levers = options.subjects?.length
    ? projection.levers.filter(l => options.subjects!.includes(l.key as CanonicalSubject))
    : projection.levers;
  return { ...planGoal(levers, projection.expected, projection.sd, goal, options.confidence ?? 0.7), projection };
}
