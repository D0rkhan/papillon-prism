import type { Grade, Subject } from "@/services/shared/grade";

import { periodOverallAverage, subjectAverageInfo } from "../average";

const grade = (value: number, outOf = 20, extra: Partial<Grade> = {}): Grade => ({
  id: Math.random().toString(36),
  subjectId: "s",
  subjectName: "S",
  description: "",
  coefficient: 1,
  studentScore: { value },
  outOf: { value: outOf },
  createdByAccount: "a",
  ...extra,
});

const subject = (grades: Grade[], studentAverage?: number): Subject => ({
  id: Math.random().toString(36),
  name: "S",
  grades,
  classAverage: { value: 0, disabled: true },
  outOf: { value: 20 },
  studentAverage: studentAverage === undefined ? { value: 0, disabled: true } : { value: studentAverage },
});

describe("moyennes affichées", () => {
  it("préfère la moyenne de matière publiée par Pronote", () => {
    const info = subjectAverageInfo(subject([grade(10), grade(14)], 13.5));
    expect(info.value).toBe(13.5);
    expect(info.source).toBe("pronote");
    expect(info.computed).toBeCloseTo(12, 10);
  });

  it("recalcule quand l'établissement masque la moyenne", () => {
    const info = subjectAverageInfo(subject([grade(10), grade(14)]));
    expect(info.value).toBeCloseTo(12, 10);
    expect(info.source).toBe("computed");
  });

  it("une note « Abs. » ne compte pas, « Abs. 0 » compte zéro", () => {
    const abs = grade(0, 20, { studentScore: { value: 0, disabled: true, status: "Abs." } });
    const absZero = grade(0, 20, { studentScore: { value: 0, status: "Abs.*" } });
    expect(subjectAverageInfo(subject([grade(16), abs])).value).toBeCloseTo(16, 10);
    expect(subjectAverageInfo(subject([grade(16), absZero])).value).toBeCloseTo(8, 10);
  });

  it("moyenne générale : celle de Pronote, sinon la moyenne des moyennes de matières", () => {
    const subjects = [subject([grade(10)], 11), subject([grade(16)])];
    expect(periodOverallAverage(subjects, { value: 12.34 }).value).toBe(12.34);
    expect(periodOverallAverage(subjects, { value: 0, disabled: true }).value).toBeCloseTo((11 + 16) / 2, 10);
  });
});
