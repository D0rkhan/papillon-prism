/**
 * Bridges the app's grade model (services/shared/grade) to the bac engine (core/bac).
 * Pure functions: unit-tested, no I/O.
 */
import { classifySubject, normalizeSubjectName } from "@/core/bac/subjects";
import type { BacGrade, BacPeriod, CanonicalSubject, EvalKind, OfficialAverage, SchoolYear } from "@/core/bac/types";
import type { Grade, Period, PeriodGrades } from "@/services/shared/grade";

export type PeriodRole = "regular" | "mock" | "ignored";

/** Trimestres / semestres count; mock exams calibrate the exam model; the rest is noise. */
export function periodRole(name: string): PeriodRole {
  const n = normalizeSubjectName(name);
  if (/BAC BLANC|EXAMEN BLANC|EPREUVES? (COMMUNE|PONCTUELLE)|BREVET BLANC/.test(n)) { return "mock"; }
  if (/MI SEMESTRE|HORS PERIODE|ANNEE/.test(n)) { return "ignored"; }
  if (/TRIMESTRE|SEMESTRE|PERIODE|\bT[123]\b|\bS[12]\b/.test(n)) { return "regular"; }
  return "ignored";
}

export function inferKind(description: string | undefined): EvalKind {
  const n = normalizeSubjectName(description ?? "");
  if (/BAC BLANC|EXAMEN BLANC|EPREUVE COMMUNE|DS COMMUN/.test(n)) { return "bac_blanc"; }
  if (/\bDM\b|DEVOIR (A LA )?MAISON/.test(n)) { return "dm"; }
  if (/INTERRO|\bQCM\b|\bQUIZ|FLASH|\bTEST\b/.test(n)) { return "interro"; }
  if (/\bORAL\b|EXPOSE|PRESENTATION/.test(n)) { return "oral"; }
  if (/\bDS\b|DEVOIR SURVEILLE|CONTROLE|EVALUATION|\bDST\b/.test(n)) { return "ds"; }
  return "other";
}

/** "2026-2027" for any date of that school year (it starts in August). */
export function schoolYearKey(date: Date): string {
  const y = date.getFullYear();
  const start = date.getMonth() >= 7 ? y : y - 1;
  return `${start}-${start + 1}`;
}

const usableScore = (s?: { value: number; disabled?: boolean }) =>
  !!s && !s.disabled && typeof s.value === "number" && Number.isFinite(s.value);

export function convertGrade(
  grade: Grade,
  periodId: string,
  fallbackDate: Date,
  forceKind?: EvalKind,
  kindOverride?: EvalKind
): BacGrade {
  const outOf = grade.outOf?.value && grade.outOf.value > 0 ? grade.outOf.value : 20;
  return {
    id: grade.id,
    subject: classifySubject(grade.subjectName),
    value: usableScore(grade.studentScore) ? (grade.studentScore as { value: number }).value : null,
    outOf,
    coefficient: typeof grade.coefficient === "number" ? grade.coefficient : 1,
    date: grade.givenAt ? new Date(grade.givenAt) : fallbackDate,
    periodId,
    bonus: grade.bonus,
    optional: grade.optional,
    outOf20: grade.outOf20,
    classAverage: usableScore(grade.averageScore) ? (grade.averageScore as { value: number }).value : undefined,
    kind: kindOverride ?? forceKind ?? inferKind(grade.description),
  };
}

export interface ConvertedPeriod {
  role: PeriodRole;
  period: BacPeriod | null;
  grades: BacGrade[];
  official: OfficialAverage[];
}

/**
 * Converts one period. Once a period is over, the service's subject averages are what
 * the report card shows: they become fixed ("official") values. While it is running,
 * only the grades are used — no report card needed.
 */
export function convertPeriod(
  period: Period,
  data: PeriodGrades | undefined,
  year: SchoolYear,
  now: Date,
  kindOverrides: Readonly<Record<string, EvalKind>> = {}
): ConvertedPeriod {
  const role = periodRole(period.name);
  const id = period.id ?? period.name;
  const subjects = data?.subjects ?? [];
  const grades = subjects.flatMap(s =>
    (s.grades ?? []).map(g =>
      convertGrade({ ...g, subjectName: g.subjectName || s.name }, id, period.start, role === "mock" ? "bac_blanc" : undefined, kindOverrides[g.id])
    )
  );

  const official: OfficialAverage[] = [];
  if (role === "regular" && period.end < now) {
    const counts = new Map<CanonicalSubject, number>();
    for (const s of subjects) {
      const c = classifySubject(s.name);
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    for (const s of subjects) {
      const c = classifySubject(s.name);
      const avg = s.studentAverage;
      // A canonical subject split in several lines (written/oral…) is recomputed instead.
      if (c === "other" || counts.get(c) !== 1 || !usableScore(avg)) { continue; }
      const outOf = s.outOf?.value && s.outOf.value > 0 ? s.outOf.value : 20;
      official.push({ periodId: id, subject: c, value: ((avg as { value: number }).value / outOf) * 20 });
    }
  }

  return {
    role,
    period: role === "regular" ? { id, name: period.name, start: period.start, end: period.end, year } : null,
    grades: role === "ignored" ? [] : grades,
    official,
  };
}

/** JSON-safe snapshot of a school year, persisted so Première still counts in Terminale. */
export interface YearSnapshot {
  key: string;
  year: SchoolYear;
  savedAt: number;
  periods: { id: string; name: string; start: number; end: number }[];
  grades: (Omit<BacGrade, "date"> & { date: number })[];
  official: OfficialAverage[];
}

export function toSnapshot(key: string, year: SchoolYear, converted: ConvertedPeriod[], now: Date): YearSnapshot {
  return {
    key,
    year,
    savedAt: now.getTime(),
    periods: converted
      .filter(c => c.period)
      .map(c => ({ id: (c.period as BacPeriod).id, name: (c.period as BacPeriod).name, start: (c.period as BacPeriod).start.getTime(), end: (c.period as BacPeriod).end.getTime() })),
    grades: converted.flatMap(c => c.grades.map(g => ({ ...g, date: g.date.getTime() }))),
    official: converted.flatMap(c => c.official),
  };
}

export function fromSnapshot(s: YearSnapshot): { periods: BacPeriod[]; grades: BacGrade[]; official: OfficialAverage[] } {
  return {
    periods: s.periods.map(p => ({ ...p, start: new Date(p.start), end: new Date(p.end), year: s.year })),
    grades: s.grades.map(g => ({ ...g, date: new Date(g.date) })),
    official: s.official,
  };
}
