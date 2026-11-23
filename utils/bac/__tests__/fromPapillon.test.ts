import { describe, expect, it } from "@jest/globals";

import type { Grade, Period, PeriodGrades } from "@/services/shared/grade";

import { convertPeriod, fromSnapshot, inferKind, periodRole, schoolYearKey, toSnapshot } from "../fromPapillon";

const grade = (id: string, subjectName: string, value: number | null, extra: Partial<Grade> = {}): Grade => ({
  id,
  subjectId: subjectName,
  subjectName,
  description: "",
  givenAt: new Date("2026-10-10"),
  coefficient: 1,
  outOf: { value: 20 },
  studentScore: value === null ? { value: 0, disabled: true, status: "Abs." } : { value },
  averageScore: { value: 11 },
  createdByAccount: "a",
  ...extra,
});

const T1: Period = { id: "T1", name: "Trimestre 1", start: new Date("2026-09-01"), end: new Date("2026-11-30"), createdByAccount: "a" };

const data = (subjects: { name: string; avg?: number; grades: Grade[] }[]): PeriodGrades => ({
  studentOverall: { value: 14 },
  classAverage: { value: 11 },
  createdByAccount: "a",
  subjects: subjects.map(s => ({
    id: s.name,
    name: s.name,
    studentAverage: s.avg === undefined ? { value: 0, disabled: true } : { value: s.avg },
    classAverage: { value: 11 },
    outOf: { value: 20 },
    grades: s.grades,
  })),
});

describe("periodRole / inferKind / schoolYearKey", () => {
  it("classifies periods", () => {
    expect(periodRole("Trimestre 2")).toBe("regular");
    expect(periodRole("Semestre 1")).toBe("regular");
    expect(periodRole("Bac blanc")).toBe("mock");
    expect(periodRole("Année")).toBe("ignored");
    expect(periodRole("MI-SEMESTRE 1")).toBe("ignored");
  });

  it("infers the kind of an assessment from its title", () => {
    expect(inferKind("DS n°3 - Suites")).toBe("ds");
    expect(inferKind("Interro vocabulaire")).toBe("interro");
    expect(inferKind("DM 2")).toBe("dm");
    expect(inferKind("Bac blanc de maths")).toBe("bac_blanc");
    expect(inferKind("Exposé oral")).toBe("oral");
    expect(inferKind("")).toBe("other");
  });

  it("keys school years from August", () => {
    expect(schoolYearKey(new Date("2026-11-23"))).toBe("2026-2027");
    expect(schoolYearKey(new Date("2027-05-02"))).toBe("2026-2027");
    expect(schoolYearKey(new Date("2027-09-02"))).toBe("2027-2028");
  });
});

describe("convertPeriod", () => {
  const d = data([
    { name: "MATHEMATIQUES", avg: 16, grades: [grade("g1", "MATHEMATIQUES", 15), grade("g2", "MATHEMATIQUES", null)] },
    { name: "ANGLAIS LV1", avg: 15, grades: [grade("g3", "ANGLAIS LV1", 15)] },
    { name: "ANGLAIS LV1 ORAL", avg: 12, grades: [grade("g4", "ANGLAIS LV1 ORAL", 12)] },
  ]);

  it("maps grades to canonical subjects and keeps unusable ones as null", () => {
    const c = convertPeriod(T1, d, "premiere", new Date("2026-11-23"));
    expect(c.grades.map(g => g.subject)).toEqual(["maths", "maths", "anglais", "anglais"]);
    expect(c.grades[1].value).toBeNull();
    expect(c.grades[0].classAverage).toBe(11);
    expect(c.period?.year).toBe("premiere");
  });

  it("only fixes averages once the period is over, and never for split subjects", () => {
    expect(convertPeriod(T1, d, "premiere", new Date("2026-11-23")).official).toEqual([]);
    const closed = convertPeriod(T1, d, "premiere", new Date("2026-12-05")).official;
    expect(closed).toEqual([{ periodId: "T1", subject: "maths", value: 16 }]);
  });

  it("tags every grade of a mock-exam period as bac blanc", () => {
    const mock = convertPeriod({ ...T1, id: "BB", name: "Bac blanc" }, d, "premiere", new Date("2026-12-05"));
    expect(mock.period).toBeNull();
    expect(mock.grades.every(g => g.kind === "bac_blanc")).toBe(true);
  });

  it("round-trips through a JSON snapshot", () => {
    const c = convertPeriod(T1, d, "premiere", new Date("2026-12-05"));
    const snap = JSON.parse(JSON.stringify(toSnapshot("2026-2027", "premiere", [c], new Date("2026-12-05"))));
    const back = fromSnapshot(snap);
    expect(back.grades[0].date.getTime()).toBe(c.grades[0].date.getTime());
    expect(back.periods[0].start.getTime()).toBe(T1.start.getTime());
    expect(back.official).toEqual(c.official);
  });
});
