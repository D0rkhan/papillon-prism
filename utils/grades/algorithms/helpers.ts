import { medianOn20, subjectAverage } from "@/core/bac/normalize";
import { Grade } from "@/services/shared/grade";

export type ScoreProperty = "studentScore" | "averageScore" | "minScore" | "maxScore";

/**
 * Adapts app grades to the exact averaging rules of `core/bac/normalize`
 * (every grade brought back to /20, optimal optional grades, bonus above 10 only).
 * Bonus/optional rules only make sense for the student's own score: for class
 * statistics (average, min, max) every grade counts as a regular one.
 */
export const toAverageable = (grades: readonly Grade[], property: ScoreProperty = "studentScore") =>
  grades.map(grade => {
    const score = grade[property];
    const usable = !!score && !score.disabled && typeof score.value === "number" && Number.isFinite(score.value);
    const own = property === "studentScore";
    return {
      value: usable ? (score as { value: number }).value : null,
      outOf: grade.outOf?.value ?? 0,
      coefficient: grade.coefficient ?? 1,
      bonus: own ? grade.bonus : false,
      optional: own ? grade.optional : false,
    };
  });

/** Average /20 of one subject's grades, or −1 when nothing counts. */
export const getSubjectAverageByProperty = (
  grades: readonly Grade[],
  property: ScoreProperty = "studentScore"
): number => subjectAverage(toAverageable(grades, property)) ?? -1;

/** Mean of every subject's average (subjects weighted equally), or −1. */
export const PapillonSubjectAvgByProperty = (
  grades: readonly Grade[],
  property: ScoreProperty = "studentScore"
): number => {
  if (!grades?.length) { return -1; }
  const bySubject = new Map<string, Grade[]>();
  for (const grade of grades) {
    const list = bySubject.get(grade.subjectId) ?? [];
    list.push(grade);
    bySubject.set(grade.subjectId, list);
  }
  let total = 0;
  let counted = 0;
  for (const list of bySubject.values()) {
    const avg = getSubjectAverageByProperty(list, property);
    if (avg >= 0) { total += avg; counted++; }
  }
  return counted > 0 ? total / counted : -1;
};

export const getMedianOn20 = (grades: readonly Grade[]): number => medianOn20(toAverageable(grades)) ?? -1;
