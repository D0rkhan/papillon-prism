/**
 * Honest self-assessment of the model: walk-forward backtest on his own grades.
 * For each grade (after the first few of a subject), the model is fitted only on the
 * grades given before it, then scored on the real result:
 *  - coverage of the 80 % predictive interval (well calibrated ≈ 0.80),
 *  - CRPS (continuous ranked probability score, lower is better, in points /20),
 *  - mean absolute error of the predictive mean.
 */
import { normalCdf, normalPdf } from "./math";
import { DEFAULT_MODEL_SETTINGS, fitSubject, informationWeight, ModelSettings, pooledLevel, predictLevel, toDataPoints } from "./model";
import { toTwenty } from "./normalize";
import type { BacGrade, CanonicalSubject } from "./types";

export interface CalibrationReport {
  predictions: number;
  coverage80: number | null;
  crps: number | null;
  mae: number | null;
  /** Same scores for the naive "running average" predictor, as a baseline. */
  baselineMae: number | null;
  perSubject: { subject: CanonicalSubject; predictions: number; mae: number }[];
}

const gaussianCrps = (y: number, mu: number, sd: number): number => {
  const z = (y - mu) / sd;
  return sd * (z * (2 * normalCdf(z) - 1) + 2 * normalPdf(z) - 1 / Math.sqrt(Math.PI));
};

export function backtest(
  grades: readonly BacGrade[],
  minHistory = 3,
  settings: ModelSettings = DEFAULT_MODEL_SETTINGS
): CalibrationReport {
  const usable = grades
    .filter(g => typeof g.value === "number" && g.value >= 0 && g.outOf > 0 && g.coefficient > 0 && !g.bonus && g.kind !== "bac_blanc")
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  let n = 0;
  let inside = 0;
  let crps = 0;
  let ae = 0;
  let baseAe = 0;
  const per = new Map<CanonicalSubject, { n: number; ae: number }>();

  for (let i = 0; i < usable.length; i++) {
    const target = usable[i];
    const history = usable.slice(0, i).filter(g => g.date < target.date);
    const own = history.filter(g => g.subject === target.subject);
    if (own.length < minHistory) { continue; }

    const ref = target.date;
    const fit = fitSubject(target.subject, toDataPoints(own, ref, settings), pooledLevel(history), ref, settings);
    const lvl = predictLevel(fit, ref);
    const sd = Math.sqrt(lvl.sd ** 2 + fit.sigma ** 2 / Math.max(0.25, informationWeight(target) / meanWeight(own)));
    const y = toTwenty(target.value as number, target.outOf);

    const naive = own.reduce((s, g) => s + toTwenty(g.value as number, g.outOf), 0) / own.length;

    n++;
    if (Math.abs(y - lvl.mean) <= 1.2816 * sd) { inside++; }
    crps += gaussianCrps(y, lvl.mean, sd);
    ae += Math.abs(y - lvl.mean);
    baseAe += Math.abs(y - naive);
    const s = per.get(target.subject) ?? { n: 0, ae: 0 };
    s.n++;
    s.ae += Math.abs(y - lvl.mean);
    per.set(target.subject, s);
  }

  return {
    predictions: n,
    coverage80: n ? inside / n : null,
    crps: n ? crps / n : null,
    mae: n ? ae / n : null,
    baselineMae: n ? baseAe / n : null,
    perSubject: [...per.entries()].map(([subject, s]) => ({ subject, predictions: s.n, mae: s.ae / s.n })),
  };
}

const meanWeight = (gs: readonly BacGrade[]) =>
  gs.reduce((s, g) => s + informationWeight(g), 0) / Math.max(1, gs.length);
