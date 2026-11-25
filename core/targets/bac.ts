/**
 * Bac target grades: which average to aim for, subject by subject, to reach a
 * final grade (a mention), and whether that is realistic.
 *
 * The bac projection (core/bac/engine) says where the student is heading. Each
 * subject is a lever: raising its level by one point from now on moves the
 * final grade by the coefficients still open in that subject (remaining
 * contrôle continu, the exam itself, half of the grand oral for a spécialité),
 * divided by the 100 coefficients. Finished components weigh nothing anymore.
 * The plan is then checked against the full Monte-Carlo projection.
 */
import { Prepared, run } from "@/core/bac/engine";
import { predictLevel } from "@/core/bac/model";
import { SUBJECT_LABELS } from "@/core/bac/subjects";
import type { CanonicalSubject } from "@/core/bac/types";

import { GoalPlan, Lever, planGoal } from "./allocate";

export interface BacGoal {
  value: number;
  label: string;
}

export const BAC_GOALS: BacGoal[] = [
  { value: 10, label: "Admis" },
  { value: 12, label: "Assez bien" },
  { value: 14, label: "Bien" },
  { value: 16, label: "Très bien" },
  { value: 18, label: "Félicitations" },
];

/** Typical spread of a student's grades is 2–3 points; bounds keep a tiny sample sane. */
export const leverScale = (sigma: number | undefined) => Math.min(4, Math.max(1.2, sigma ?? 2.5));

/** How much each subject still weighs on the final bac grade, per point of level. */
export function bacLevers(p: Prepared): Lever[] {
  const impact = new Map<CanonicalSubject, number>();
  const add = (s: CanonicalSubject, v: number) => impact.set(s, (impact.get(s) ?? 0) + v);
  const [spe1, spe2] = p.input.profile.keptSpecialties;

  for (const pc of p.components) {
    if (pc.finalized || pc.fixed !== null) { continue; }
    const c = pc.component;
    const w = c.coefficient / p.totalCoefficient;
    if (c.block === "cc") {
      const parts = pc.parts.filter(pt => pt.fixed !== null || pt.obsWeight > 0 || pt.futureCount >= 0.25);
      if (parts.length === 0) { add(c.subject as CanonicalSubject, w); continue; }
      let open = 0;
      for (const pt of parts) {
        if (pt.fixed !== null || pt.futureCount < 0.25) { continue; }
        open += pt.futureWeight / (pt.obsWeight + pt.futureWeight);
      }
      if (open > 0) { add(c.subject as CanonicalSubject, (w * open) / parts.length); }
    } else if (c.id === "exam:grand_oral") {
      add(spe1, w / 2);
      add(spe2, w / 2);
    } else if (c.subject && (c.subject !== "philosophie" || (p.fits.get("philosophie")?.n ?? 0) > 0)) {
      add(c.subject, w);
    }
  }

  const levers: Lever[] = [];
  for (const [subject, value] of impact) {
    const fit = p.fits.get(subject);
    // No grade yet (a subject that starts next year): nothing to act on today.
    if (!fit || fit.n === 0 || value <= 0) { continue; }
    const level = Math.min(20, Math.max(0, predictLevel(fit, p.input.now).mean));
    levers.push({ key: subject, label: SUBJECT_LABELS[subject], impact: value, level, scale: leverScale(fit.sigma) });
  }
  return levers.sort((a, b) => b.impact * b.scale - a.impact * a.scale);
}

export interface BacTargetResult extends GoalPlan {
  /** Probability measured by the full simulation with the plan applied. */
  simulatedWithPlan: number;
  simulatedNow: number;
}

/**
 * Plan to reach `goal` (final bac average) using only `subjects` (all levers
 * when empty). `expected` / `sd`: the projection of the final grade.
 */
export function bacTarget(
  p: Prepared,
  goal: number,
  options: { subjects?: CanonicalSubject[]; confidence?: number; simulations?: number } = {}
): BacTargetResult {
  const all = bacLevers(p);
  const chosen = options.subjects?.length ? all.filter(l => options.subjects!.includes(l.key as CanonicalSubject)) : all;
  const simulations = options.simulations ?? 6000;

  const base = run(p, { simulations });
  const mean = average(base.overall);
  const sd = stdev(base.overall, mean);
  const plan = planGoal(chosen, mean, sd, goal, options.confidence ?? 0.7);

  const shifts: Partial<Record<CanonicalSubject, number>> = {};
  for (const l of plan.allocation.levers) { shifts[l.key as CanonicalSubject] = l.delta; }
  const withPlan = run(p, { simulations, shifts });

  return {
    ...plan,
    simulatedNow: share(base.overall, goal),
    simulatedWithPlan: share(withPlan.overall, goal),
  };
}

const average = (a: Float64Array) => { let s = 0; for (const v of a) { s += v; } return s / a.length; };
const stdev = (a: Float64Array, m: number) => { let s = 0; for (const v of a) { s += (v - m) ** 2; } return Math.sqrt(s / Math.max(1, a.length - 1)); };
const share = (a: Float64Array, goal: number) => { let n = 0; for (const v of a) { if (v >= goal) { n++; } } return n / a.length; };
