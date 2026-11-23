/**
 * Decision support: where effort pays off, which grade to aim for, what is realistic.
 * Every comparison reuses the same random draws (common random numbers).
 */
import { EngineInput, Prepared, prepare, probabilities, run } from "./engine";
import { informationWeight, predictLevel } from "./model";
import type { BacGrade, CanonicalSubject } from "./types";

export interface SubjectLeverage {
  subject: CanonicalSubject;
  /** Gain of P(admissible) if the level rises by `delta` points from now on. */
  admissibleGain: number;
  competitiveGain: number;
  /** Gain on the expected final grade (points /20). */
  overallGain: number;
}

/** Ranks subjects by how much a +delta improvement from today moves the goal. */
export function leverage(p: Prepared, delta = 1, simulations = 8000): SubjectLeverage[] {
  const base = run(p, { simulations });
  const baseProb = probabilities(p, base);
  const baseMean = mean(base.overall);

  const subjects = [...p.fits.keys()].filter(s =>
    p.components.some(c => !c.finalized && c.fixed === null && (c.component.subject === s || isProxy(p, s, c.component.id)))
  );

  return subjects
    .map(subject => {
      const out = run(p, { simulations, shifts: { [subject]: delta } });
      const prob = probabilities(p, out);
      return {
        subject,
        admissibleGain: prob.admissible - baseProb.admissible,
        competitiveGain: prob.competitive - baseProb.competitive,
        overallGain: mean(out.overall) - baseMean,
      };
    })
    .sort((a, b) => b.competitiveGain - a.competitiveGain || b.overallGain - a.overallGain);
}

const isProxy = (p: Prepared, s: CanonicalSubject, componentId: string) =>
  (componentId === "exam:grand_oral" && p.input.profile.keptSpecialties.includes(s)) ||
  (componentId === "exam:philosophie" && (s === "francais" || s === "histoire_geo"));

const mean = (a: Float64Array) => {
  let s = 0;
  for (const v of a) { s += v; }
  return s / a.length;
};

export interface Scenario {
  key: "prudent" | "tendance" | "ambitieux";
  label: string;
  /** Percentile of his own predicted level the scenario assumes in every subject. */
  percentile: number;
  admissible: number;
  competitive: number;
  overallMedian: number;
}

/**
 * Three coherent futures: he performs at the 25th, 50th or 75th percentile of his own
 * predicted level in every subject (not "everyone gets 20": realistic by construction).
 */
export function scenarios(p: Prepared, simulations = 8000): Scenario[] {
  const defs: [Scenario["key"], string, number, number][] = [
    ["prudent", "Prudent", 25, -0.674],
    ["tendance", "Tendance actuelle", 50, 0],
    ["ambitieux", "Ambitieux mais réaliste", 75, 0.674],
  ];
  const examDate = new Date(`${p.input.profile.session}-06-15`);
  return defs.map(([key, label, percentile, zq]) => {
    const shifts: Partial<Record<CanonicalSubject, number>> = {};
    for (const [subject, fit] of p.fits) {
      shifts[subject] = zq * predictLevel(fit, examDate).sd;
    }
    const out = run(p, { simulations, shifts });
    const prob = probabilities(p, out);
    const sorted = Float64Array.from(out.overall).sort();
    return {
      key,
      label,
      percentile,
      admissible: prob.admissible,
      competitive: prob.competitive,
      overallMedian: sorted[Math.floor(sorted.length / 2)],
    };
  });
}

export type Realism = "acquis" | "réaliste" | "ambitieux" | "hors de portée";

export interface NextGradeTarget {
  subject: CanonicalSubject;
  goal: number;
  /** Minimum grade /20 on the next assessment. `null` = even 20 is not enough. */
  required: number | null;
  realism: Realism;
  predicted: { mean: number; sd: number };
  probabilityWithRequired: number | null;
}

/**
 * Smallest grade on the next assessment (coef = his usual one in that subject) that
 * keeps P(objective) ≥ goal. Bisection; each step refits the subject model.
 */
export function requiredNextGrade(
  input: EngineInput,
  subject: CanonicalSubject,
  goal: number,
  objective: "admissible" | "competitive" = "competitive",
  simulations = 4000
): NextGradeTarget {
  const now = input.now;
  const date = new Date(now.getTime() + 7 * 24 * 3600 * 1000);
  const own = input.grades.filter(g => g.subject === subject && typeof g.value === "number" && !g.bonus);
  const coefficient = own.length ? median(own.map(g => g.coefficient)) : 1;
  const period = input.periods.find(pp => pp.start <= date && pp.end >= date);

  const probabilityWith = (value: number): number => {
    const extra: BacGrade = {
      id: "hypothetical",
      subject,
      value,
      outOf: 20,
      coefficient,
      date,
      periodId: period?.id ?? "hypothetical",
    };
    const p = prepare({ ...input, grades: [...input.grades, extra] });
    return probabilities(p, run(p, { simulations }))[objective];
  };

  const base = prepare(input);
  const fit = base.fits.get(subject);
  const lvl = fit ? predictLevel(fit, date) : { mean: base.pooled, sd: 3 };
  const sigma = fit?.sigma ?? 2.5;
  const w = informationWeight({ coefficient, outOf: 20 });
  const predicted = { mean: lvl.mean, sd: Math.sqrt(lvl.sd ** 2 + (sigma * sigma) / Math.max(w, 0.25)) };

  const realismOf = (g: number): Realism => {
    const zq = (g - predicted.mean) / predicted.sd;
    if (zq <= 0) { return "acquis"; }
    if (zq <= 0.674) { return "réaliste"; }
    if (zq <= 1.282) { return "ambitieux"; }
    return "hors de portée";
  };

  const atMax = probabilityWith(20);
  if (atMax < goal) {
    return { subject, goal, required: null, realism: "hors de portée", predicted, probabilityWithRequired: atMax };
  }
  const atMin = probabilityWith(0);
  if (atMin >= goal) {
    return { subject, goal, required: 0, realism: "acquis", predicted, probabilityWithRequired: atMin };
  }

  let lo = 0;
  let hi = 20;
  let pHi = atMax;
  for (let i = 0; i < 9; i++) {
    const mid = (lo + hi) / 2;
    const pm = probabilityWith(mid);
    if (pm >= goal) { hi = mid; pHi = pm; } else { lo = mid; }
  }
  const required = Math.ceil(hi * 4) / 4; // rounded up to the quarter point
  return { subject, goal, required, realism: realismOf(required), predicted, probabilityWithRequired: pHi };
}

const median = (values: number[]): number => {
  const s = [...values].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
