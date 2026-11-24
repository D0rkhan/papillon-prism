/**
 * What the app shows as averages, in one place, so every screen agrees.
 *
 * Pronote rules reproduced (see core/bac/normalize for the per-grade maths):
 * - subject average: the one Pronote publishes when the school shows it (it
 *   already includes the teacher's settings: sub-services, "ramener sur 20",
 *   optional and bonus grades). Otherwise it is recomputed from the grades.
 * - overall average: the one Pronote publishes; otherwise the mean of the
 *   subject averages above. Pronote weighs subjects by the coefficient set on
 *   each service of the report card — 1 everywhere unless the school changed
 *   it, and it is not exposed to the app, so 1 is used.
 */
import { overallAverage, subjectAverage, subjectAverageDetailed } from "@/core/bac/normalize";
import type { GradeScore, Subject } from "@/services/shared/grade";

import { toAverageable } from "./algorithms/helpers";

export const isUsableScore = (score?: GradeScore | null): score is GradeScore =>
  !!score && !score.disabled && typeof score.value === "number" && Number.isFinite(score.value);

export interface SubjectAverageInfo {
  /** Average /20, or null when nothing counts yet. */
  value: number | null;
  /** "pronote": published by the school; "computed": recomputed from the grades. */
  source: "pronote" | "computed" | null;
  /** Recomputed value, even when Pronote published one (for transparency). */
  computed: number | null;
  keptOptional: number;
  bonusPoints: number;
}

export function subjectAverageInfo(subject: Subject): SubjectAverageInfo {
  const detail = subjectAverageDetailed(toAverageable(subject.grades ?? []));
  const outOf = subject.outOf?.value && subject.outOf.value > 0 ? subject.outOf.value : 20;
  const official = isUsableScore(subject.studentAverage) ? (subject.studentAverage.value / outOf) * 20 : null;
  const value = official ?? detail.average;
  return {
    value,
    source: official !== null ? "pronote" : detail.average !== null ? "computed" : null,
    computed: detail.average,
    keptOptional: detail.keptOptional,
    bonusPoints: detail.bonusPoints,
  };
}

export interface OverallAverageInfo {
  value: number | null;
  source: "pronote" | "computed" | null;
}

export function periodOverallAverage(subjects: readonly Subject[], published?: GradeScore | null): OverallAverageInfo {
  if (isUsableScore(published)) {
    return { value: published.value, source: "pronote" };
  }
  const value = overallAverage(subjects.map(s => ({ average: subjectAverageInfo(s).value })));
  return { value, source: value === null ? null : "computed" };
}

/** Running subject average after each grade, oldest first (for trend lines). */
export function subjectTrend(subject: Subject): number[] {
  const sorted = [...(subject.grades ?? [])]
    .filter(g => isUsableScore(g.studentScore))
    .sort((a, b) => (a.givenAt?.getTime() ?? 0) - (b.givenAt?.getTime() ?? 0));
  const out: number[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const avg = subjectAverage(toAverageable(sorted.slice(0, i + 1)));
    if (avg !== null) { out.push(avg); }
  }
  return out;
}

/** Grade value brought back to /20 (NaN when it does not count). */
export function gradeOn20(score: GradeScore | undefined, outOf: GradeScore | undefined): number {
  if (!isUsableScore(score)) { return NaN; }
  const scale = outOf?.value && outOf.value > 0 ? outOf.value : 20;
  return (score.value / scale) * 20;
}
