/**
 * Exact averaging rules (replaces the approximations of utils/grades/algorithms).
 *
 * - Every grade is brought back to /20, so a 5/10 weighs exactly as much as a 10/20
 *   (Pronote's "Ramener sur 20", ticked per assessment by the teacher).
 *   A grade whose teacher left it unticked (`outOf20: false`) weighs by its scale
 *   instead, exactly like Pronote: Σ(coef × note) / Σ(coef × barème) × 20.
 *   The "points" mode applies that to every grade.
 * - Optional grades ("facultatives") only count if they raise the average. The subset
 *   kept is the optimal one: greedily add them from best to worst while each one is
 *   above the running average (a weighted mean only grows when you add a value above it).
 * - Bonus grades only bring the points above 10/20, without adding to the denominator.
 * - Grades with no value (absent, exempted…) or a zero coefficient are ignored.
 * - The result is capped at 20 (a bulletin average never exceeds it), explicitly.
 */

export type AveragingMode = "normalized" | "points";

export interface AverageableGrade {
  value: number | null | undefined;
  outOf: number;
  coefficient: number;
  bonus?: boolean;
  optional?: boolean;
  /** Pronote's "Ramener sur 20". `false` = counted with its own scale; default true. */
  outOf20?: boolean;
}

export const toTwenty = (value: number, outOf: number): number => (value / outOf) * 20;

const isCountable = (g: AverageableGrade): g is AverageableGrade & { value: number } =>
  typeof g.value === "number" &&
  Number.isFinite(g.value) &&
  g.value >= 0 &&
  g.outOf > 0 &&
  g.coefficient > 0;

const weightOf = (g: AverageableGrade, mode: AveragingMode): number =>
  mode === "points" || g.outOf20 === false ? (g.coefficient * g.outOf) / 20 : g.coefficient;

export interface AverageBreakdown {
  /** Average /20, capped at 20. `null` when nothing counts. */
  average: number | null;
  /** Weighted mean before bonus and cap. */
  base: number | null;
  totalWeight: number;
  keptOptional: number;
  bonusPoints: number;
}

export function subjectAverageDetailed(
  grades: readonly AverageableGrade[],
  mode: AveragingMode = "normalized"
): AverageBreakdown {
  let num = 0;
  let den = 0;
  const optional: { n: number; w: number }[] = [];
  const bonus: { n: number; w: number }[] = [];

  for (const g of grades) {
    if (!isCountable(g)) { continue; }
    const n = toTwenty(g.value, g.outOf);
    const w = weightOf(g, mode);
    if (g.bonus) { bonus.push({ n, w }); continue; }
    if (g.optional) { optional.push({ n, w }); continue; }
    num += n * w;
    den += w;
  }

  optional.sort((a, b) => b.n - a.n);
  let keptOptional = 0;
  for (const o of optional) {
    if (den === 0 || o.n > num / den) {
      num += o.n * o.w;
      den += o.w;
      keptOptional++;
    } else {
      break;
    }
  }

  if (den === 0) {
    return { average: null, base: null, totalWeight: 0, keptOptional, bonusPoints: 0 };
  }

  let bonusNum = 0;
  for (const b of bonus) { bonusNum += Math.max(0, b.n - 10) * b.w; }

  const base = num / den;
  const bonusPoints = bonusNum / den;
  return {
    average: Math.min(20, base + bonusPoints),
    base,
    totalWeight: den,
    keptOptional,
    bonusPoints,
  };
}

export const subjectAverage = (
  grades: readonly AverageableGrade[],
  mode: AveragingMode = "normalized"
): number | null => subjectAverageDetailed(grades, mode).average;

/** Weighted mean of subject averages (subject coefficients from the report card). */
export function overallAverage(
  subjects: readonly { average: number | null; coefficient?: number }[]
): number | null {
  let num = 0;
  let den = 0;
  for (const s of subjects) {
    if (s.average === null || !Number.isFinite(s.average)) { continue; }
    const c = s.coefficient ?? 1;
    if (c <= 0) { continue; }
    num += s.average * c;
    den += c;
  }
  return den > 0 ? num / den : null;
}

/** Plain median of normalized grades (bonus grades excluded). */
export function medianOn20(grades: readonly AverageableGrade[]): number | null {
  const values = grades
    .filter(g => isCountable(g) && !g.bonus)
    .map(g => toTwenty(g.value as number, g.outOf))
    .sort((a, b) => a - b);
  if (values.length === 0) { return null; }
  const mid = Math.floor(values.length / 2);
  return values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
}
