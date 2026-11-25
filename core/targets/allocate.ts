/**
 * Realistic effort allocation.
 *
 * A goal (an average to reach) needs a gain G on a score that is a weighted sum
 * of subject levels. Each subject s can rise by δ_s from now on; one point of
 * δ_s moves the score by `impact_s`. What is realistic is measured against the
 * student's own record: `scale_s` is the usual spread of his grades in that
 * subject, so z_s = δ_s / scale_s says how far above his current level the new
 * average sits ("z = 0.5": his good days, half of the time).
 *
 * We look for the plan that asks the least effort overall:
 *
 *   minimise Σ z_s²   subject to   Σ impact_s · δ_s ≥ G,  0 ≤ δ_s ≤ cap_s
 *
 * The Lagrangian gives δ_s = λ · impact_s · scale_s² (clamped), so the effort
 * goes where a point is cheap (high spread) and pays (high impact). λ is found
 * by bisection. Spreading effort this way is what makes the targets realistic:
 * no subject is asked for a miracle while another one is left untouched.
 */

export type Realism = "acquis" | "réaliste" | "ambitieux" | "hors de portée";

export interface Lever {
  key: string;
  label: string;
  /** Points of score gained per point of level gained in this subject. */
  impact: number;
  /** Predicted level /20 if nothing changes. */
  level: number;
  /** Usual spread of the student's grades in this subject (points /20). */
  scale: number;
}

export interface LeverPlan extends Lever {
  /** Gain to aim for (points /20) on the average of the coming grades. */
  delta: number;
  /** Average /20 to aim for on the coming grades of this subject. */
  target: number;
  z: number;
  realism: Realism;
  /** Share of the total gain this subject brings. */
  share: number;
}

export interface AllocationResult {
  /** The gain asked for. */
  required: number;
  /** The gain the plan delivers (≤ required when out of reach). */
  delivered: number;
  feasible: boolean;
  levers: LeverPlan[];
}

/** Above this many spreads a sustained average is no longer a realistic plan. */
export const REALISTIC_Z = 1;
/** Nobody plans on averaging more than this. */
export const MAX_TARGET = 19.5;

export function realismOf(z: number): Realism {
  if (z <= 0.05) { return "acquis"; }
  if (z <= 0.5) { return "réaliste"; }
  if (z <= REALISTIC_Z) { return "ambitieux"; }
  return "hors de portée";
}

const capOf = (l: Lever, zMax: number) => Math.max(0, Math.min(zMax * l.scale, MAX_TARGET - l.level));

function planFor(levers: readonly Lever[], lambda: number, zMax: number): number[] {
  return levers.map(l => Math.min(capOf(l, zMax), Math.max(0, lambda * l.impact * l.scale * l.scale)));
}

const gainOf = (levers: readonly Lever[], deltas: number[]) =>
  deltas.reduce((sum, d, i) => sum + d * levers[i].impact, 0);

/**
 * Least-effort plan for a gain `required` (score points). With `zMax` set, no
 * subject is pushed beyond that many spreads: the result says whether the goal
 * fits inside what is realistic.
 */
export function allocate(levers: readonly Lever[], required: number, zMax = Infinity): AllocationResult {
  const usable = levers.filter(l => l.impact > 0 && l.scale > 0);
  const toPlan = (deltas: number[]): LeverPlan[] => {
    const total = gainOf(usable, deltas) || 1;
    return usable
      .map((l, i) => {
        const delta = deltas[i];
        const z = delta / l.scale;
        return { ...l, delta, target: l.level + delta, z, realism: realismOf(z), share: (delta * l.impact) / total };
      })
      .sort((a, b) => b.share - a.share);
  };

  if (required <= 0 || usable.length === 0) {
    const zeros = usable.map(() => 0);
    return { required, delivered: 0, feasible: required <= 0, levers: toPlan(zeros) };
  }

  const maxDeltas = usable.map(l => capOf(l, zMax));
  const maxGain = gainOf(usable, maxDeltas);
  if (maxGain < required) {
    return { required, delivered: maxGain, feasible: false, levers: toPlan(maxDeltas) };
  }

  let lo = 0;
  let hi = 1;
  while (gainOf(usable, planFor(usable, hi, zMax)) < required && hi < 1e9) { hi *= 2; }
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (gainOf(usable, planFor(usable, mid, zMax)) >= required) { hi = mid; } else { lo = mid; }
  }
  const deltas = planFor(usable, hi, zMax);
  return { required, delivered: gainOf(usable, deltas), feasible: true, levers: toPlan(deltas) };
}

/** Standard normal CDF (Abramowitz–Stegun 7.1.26, |ε| < 1.5e-7). */
export function phi(z: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(z * z) / 2);
  return z >= 0 ? 0.5 * (1 + y) : 0.5 * (1 - y);
}

/** z such that phi(z) = p. */
export function phiInverse(p: number): number {
  let lo = -8;
  let hi = 8;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (phi(mid) < p) { lo = mid; } else { hi = mid; }
  }
  return (lo + hi) / 2;
}

export interface GoalPlan {
  goal: number;
  /** Probability to reach the goal if nothing changes. */
  probabilityNow: number;
  /** Probability once the plan is followed (or the realistic maximum when out of reach). */
  probabilityWithPlan: number;
  /** Confidence the plan is built for. */
  confidence: number;
  allocation: AllocationResult;
  /** Same goal without the realism cap: what it would really take. */
  unconstrained: AllocationResult;
  /** Highest score reachable at `confidence` with every subject at its realistic maximum. */
  bestRealistic: number;
}

/**
 * Plans for `goal` with a safety margin: the expected score is pushed to
 * goal + z(confidence)·sd, so luck on the day (exams, a bad term) is priced in.
 */
export function planGoal(
  levers: readonly Lever[],
  expected: number,
  sd: number,
  goal: number,
  confidence = 0.7
): GoalPlan {
  const margin = phiInverse(confidence) * Math.max(sd, 0.05);
  const required = goal + margin - expected;
  const allocation = allocate(levers, required, REALISTIC_Z);
  const unconstrained = allocate(levers, required);
  const best = allocate(levers, Infinity, REALISTIC_Z).delivered;
  const probability = (gain: number) => phi((expected + gain - goal) / Math.max(sd, 0.05));
  return {
    goal,
    probabilityNow: probability(0),
    probabilityWithPlan: probability(allocation.delivered),
    confidence,
    allocation,
    unconstrained,
    bestRealistic: expected + best - margin,
  };
}
