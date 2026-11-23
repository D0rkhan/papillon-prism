/**
 * Per-subject ability model: Bayesian weighted linear regression with a damped trend.
 *
 *   y_i = a + b·d(t_i) + ε_i,   ε_i ~ N(0, σ²/w_i)
 *
 * - y_i: grade brought back to /20 and corrected for the assessment's difficulty using
 *   the class average (y − γ·(classAvg_i − mean classAvg)), γ = 0.5 because a class
 *   average mixes test difficulty with the class' level.
 * - w_i: coefficient × √(min(outOf, 20)/20): a quiz /5 says less than a DS /20.
 * - Priors: a ~ N(student's pooled mean, 3²) (partial pooling across subjects),
 *   b ~ N(0, 2²) points/year. σ² gets a scaled-inverse-χ² prior (ν₀ = 4, s₀ = 2.5)
 *   and is estimated by two plug-in iterations.
 * - d(t) is linear in the past and damped in the future (see `dampedHorizon`).
 * Mock exams ("bac blanc") are kept out of the fit: they calibrate the exam bias.
 */
import { dampedHorizon, yearsBetween } from "./math";
import { toTwenty } from "./normalize";
import type { BacGrade, CanonicalSubject } from "./types";

export interface ModelSettings {
  difficultyShrink: number;
  priorLevelSd: number;
  priorSlopeSd: number;
  noisePriorSd: number;
  noisePriorDof: number;
  trendHorizonYears: number;
}

export const DEFAULT_MODEL_SETTINGS: ModelSettings = {
  difficultyShrink: 0.5,
  priorLevelSd: 3,
  priorSlopeSd: 2,
  noisePriorSd: 2.5,
  noisePriorDof: 4,
  trendHorizonYears: 0.5,
};

export interface DataPoint { t: number; y: number; w: number }

export interface SubjectFit {
  subject: CanonicalSubject;
  n: number;
  /** Posterior mean of (a, b). */
  mean: [number, number];
  /** Posterior covariance of (a, b). */
  cov: [[number, number], [number, number]];
  /** Residual standard deviation of a typical (weight 1) grade. */
  sigma: number;
  refDate: Date;
  horizon: number;
}

export const featureAt = (fit: Pick<SubjectFit, "horizon">, t: number): [number, number] => [
  1,
  dampedHorizon(t, fit.horizon),
];

export function predictLevel(fit: SubjectFit, date: Date): { mean: number; sd: number } {
  const x = featureAt(fit, yearsBetween(fit.refDate, date));
  const mean = x[0] * fit.mean[0] + x[1] * fit.mean[1];
  const v =
    x[0] * x[0] * fit.cov[0][0] + 2 * x[0] * x[1] * fit.cov[0][1] + x[1] * x[1] * fit.cov[1][1];
  return { mean, sd: Math.sqrt(Math.max(0, v)) };
}

/** Grade weight used by the model. */
export const informationWeight = (g: Pick<BacGrade, "coefficient" | "outOf">): number =>
  Math.max(0, g.coefficient) * Math.sqrt(Math.min(g.outOf, 20) / 20);

const usable = (g: BacGrade): g is BacGrade & { value: number } =>
  typeof g.value === "number" && Number.isFinite(g.value) && g.value >= 0 && g.outOf > 0 && g.coefficient > 0 && !g.bonus;

export function toDataPoints(
  grades: readonly BacGrade[],
  refDate: Date,
  settings: ModelSettings = DEFAULT_MODEL_SETTINGS
): DataPoint[] {
  const kept = grades.filter(g => usable(g) && g.kind !== "bac_blanc");
  const classAvgs = kept
    .filter(g => typeof g.classAverage === "number" && Number.isFinite(g.classAverage))
    .map(g => toTwenty(g.classAverage as number, g.outOf));
  const meanClass = classAvgs.length ? classAvgs.reduce((s, v) => s + v, 0) / classAvgs.length : 0;

  const points = kept.map(g => {
    let y = toTwenty(g.value as number, g.outOf);
    if (typeof g.classAverage === "number" && Number.isFinite(g.classAverage) && classAvgs.length >= 3) {
      y -= settings.difficultyShrink * (toTwenty(g.classAverage, g.outOf) - meanClass);
    }
    return { t: yearsBetween(refDate, g.date), y, w: informationWeight(g) };
  });

  const meanW = points.reduce((s, p) => s + p.w, 0) / (points.length || 1);
  return meanW > 0 ? points.map(p => ({ ...p, w: p.w / meanW })) : points;
}

function posterior(
  points: readonly DataPoint[],
  priorMean: [number, number],
  priorSd: [number, number],
  sigma2: number,
  horizon: number
): { mean: [number, number]; cov: [[number, number], [number, number]] } {
  // Precision matrix P and information vector h.
  let p00 = 1 / (priorSd[0] * priorSd[0]);
  let p01 = 0;
  let p11 = 1 / (priorSd[1] * priorSd[1]);
  let h0 = priorMean[0] * p00;
  let h1 = priorMean[1] * p11;

  for (const pt of points) {
    const x1 = dampedHorizon(pt.t, horizon);
    const k = pt.w / sigma2;
    p00 += k;
    p01 += k * x1;
    p11 += k * x1 * x1;
    h0 += k * pt.y;
    h1 += k * x1 * pt.y;
  }

  const det = p00 * p11 - p01 * p01;
  const c00 = p11 / det;
  const c01 = -p01 / det;
  const c11 = p00 / det;
  return {
    mean: [c00 * h0 + c01 * h1, c01 * h0 + c11 * h1],
    cov: [[c00, c01], [c01, c11]],
  };
}

export function fitSubject(
  subject: CanonicalSubject,
  points: readonly DataPoint[],
  priorLevel: number,
  refDate: Date,
  settings: ModelSettings = DEFAULT_MODEL_SETTINGS
): SubjectFit {
  const priorMean: [number, number] = [priorLevel, 0];
  const priorSd: [number, number] = [settings.priorLevelSd, settings.priorSlopeSd];
  const s02 = settings.noisePriorSd ** 2;
  let sigma2 = s02;
  let post = posterior(points, priorMean, priorSd, sigma2, settings.trendHorizonYears);

  for (let iter = 0; iter < 3 && points.length > 0; iter++) {
    let ss = 0;
    for (const pt of points) {
      const r = pt.y - (post.mean[0] + post.mean[1] * dampedHorizon(pt.t, settings.trendHorizonYears));
      ss += pt.w * r * r;
    }
    sigma2 = (settings.noisePriorDof * s02 + ss) / (settings.noisePriorDof + points.length);
    post = posterior(points, priorMean, priorSd, sigma2, settings.trendHorizonYears);
  }

  return {
    subject,
    n: points.length,
    mean: post.mean,
    cov: post.cov,
    sigma: Math.sqrt(sigma2),
    refDate,
    horizon: settings.trendHorizonYears,
  };
}

/** Student's overall level across every subject: the prior centre of each subject. */
export function pooledLevel(grades: readonly BacGrade[]): number {
  let num = 0;
  let den = 0;
  for (const g of grades) {
    if (!usable(g)) { continue; }
    const w = informationWeight(g);
    num += toTwenty(g.value, g.outOf) * w;
    den += w;
  }
  return den > 0 ? num / den : 12;
}

/**
 * Exam bias from mock exams: residual of each bac blanc against the fitted level,
 * combined with a N(0, priorSd²) prior. Returns the posterior of the bias.
 */
export function examBiasFromMocks(
  fit: SubjectFit,
  grades: readonly BacGrade[],
  examNoiseSd: number,
  priorSd: number
): { mean: number; sd: number; n: number } {
  const mocks = grades.filter(g => usable(g) && g.kind === "bac_blanc");
  let precision = 1 / (priorSd * priorSd);
  let h = 0;
  for (const m of mocks) {
    const level = predictLevel(fit, m.date);
    const r = toTwenty(m.value as number, m.outOf) - level.mean;
    const v = examNoiseSd * examNoiseSd + level.sd * level.sd;
    precision += 1 / v;
    h += r / v;
  }
  return { mean: h / precision, sd: Math.sqrt(1 / precision), n: mocks.length };
}
