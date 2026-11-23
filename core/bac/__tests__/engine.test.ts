import { describe, expect, it } from "@jest/globals";

import { backtest } from "../calibration";
import { analyze, prepare } from "../engine";
import { createNormal, createRng } from "../math";
import { leverage, requiredNextGrade, scenarios } from "../optimizer";
import { DEFAULT_PROFILE } from "../rules";
import type { BacGrade, BacPeriod, CanonicalSubject } from "../types";

const NOW = new Date("2026-11-23T12:00:00Z");

const PERIODS: BacPeriod[] = [
  { id: "T1", name: "Trimestre 1", start: new Date("2026-09-01"), end: new Date("2026-11-30"), year: "premiere" },
  { id: "T2", name: "Trimestre 2", start: new Date("2026-12-01"), end: new Date("2027-03-10"), year: "premiere" },
  { id: "T3", name: "Trimestre 3", start: new Date("2027-03-11"), end: new Date("2027-06-30"), year: "premiere" },
];

const SUBJECTS: CanonicalSubject[] = [
  "maths", "physique_chimie", "svt", "francais", "histoire_geo", "anglais", "espagnol", "ens_scientifique", "emc", "eps",
];

/** Synthetic student whose true level per subject is known. */
function student(levels: Partial<Record<CanonicalSubject, number>>, perSubject = 5, seed = 7, until = NOW): BacGrade[] {
  const z = createNormal(createRng(seed));
  const grades: BacGrade[] = [];
  const start = new Date("2026-09-08").getTime();
  const span = until.getTime() - start;
  for (const subject of SUBJECTS) {
    const level = levels[subject] ?? 13;
    for (let i = 0; i < perSubject; i++) {
      const date = new Date(start + (span * (i + 0.5)) / perSubject);
      const classAverage = 11 + 1.5 * z();
      const value = Math.min(20, Math.max(0, level + 0.5 * (classAverage - 11) + 2 * z()));
      grades.push({
        id: `${subject}-${i}`,
        subject,
        value: Math.round(value * 2) / 2,
        outOf: 20,
        coefficient: i % 2 ? 2 : 1,
        date,
        periodId: "T1",
        classAverage,
      });
    }
  }
  return grades;
}

describe("engine", () => {
  it("recovers a student's level and keeps probabilities consistent", () => {
    const grades = student({ maths: 17, physique_chimie: 16.5 }, 6);
    const { result } = analyze({ profile: DEFAULT_PROFILE, grades, periods: PERIODS, now: NOW, settings: { simulations: 6000 } });

    const maths = result.subjects.find(s => s.subject === "maths");
    expect(maths?.levelNow).toBeGreaterThan(15);
    expect(maths?.levelNow).toBeLessThan(19);

    const p = result.probabilities;
    expect(p.admissible).toBeLessThanOrEqual(p.overallAtLeastMin + 1e-9);
    expect(p.competitive).toBeLessThanOrEqual(p.admissible + 1e-9);
    for (const sm of p.subjectMinimums) { expect(p.admissible).toBeLessThanOrEqual(sm.probability + 1e-9); }
    expect(result.overall.q05).toBeLessThan(result.overall.q50);
    expect(result.overall.q50).toBeLessThan(result.overall.q95);
    expect(result.components.reduce((s, c) => s + c.weight, 0)).toBeCloseTo(1, 10);
  });

  it("is deterministic for a given seed", () => {
    const input = { profile: DEFAULT_PROFILE, grades: student({}), periods: PERIODS, now: NOW, settings: { simulations: 2000 } };
    expect(analyze(input).result.overall.mean).toBe(analyze(input).result.overall.mean);
  });

  it("gives a much better outlook to a strong student than to an average one", () => {
    const strong = analyze({ profile: DEFAULT_PROFILE, grades: student({ maths: 18, physique_chimie: 18, francais: 17, histoire_geo: 17, anglais: 17, espagnol: 17, ens_scientifique: 17, svt: 17, emc: 17, eps: 17 }), periods: PERIODS, now: NOW, settings: { simulations: 4000 } });
    const average = analyze({ profile: DEFAULT_PROFILE, grades: student({ maths: 12, physique_chimie: 12, francais: 12, histoire_geo: 12, anglais: 12, espagnol: 12, ens_scientifique: 12, svt: 12, emc: 12, eps: 12 }), periods: PERIODS, now: NOW, settings: { simulations: 4000 } });
    expect(strong.result.probabilities.admissible).toBeGreaterThan(0.5);
    expect(average.result.probabilities.admissible).toBeLessThan(0.05);
    expect(strong.result.overall.mean).toBeGreaterThan(average.result.overall.mean + 3);
  });

  it("uses an official report-card average instead of the computed one", () => {
    const grades = student({ svt: 12 });
    const { result } = analyze({
      profile: DEFAULT_PROFILE,
      grades,
      periods: PERIODS.map(p => ({ ...p, end: p.id === "T3" ? new Date("2026-11-01") : p.end, start: p.id === "T3" ? new Date("2026-10-01") : p.start })),
      officialAverages: [{ periodId: "T1", subject: "svt", value: 19 }],
      now: NOW,
      settings: { simulations: 2000 },
    });
    expect(result.components.find(c => c.id === "cc:premiere:svt")?.mean).toBeGreaterThan(12);
  });

  it("fixes a component once its real result is known", () => {
    const { result } = analyze({ profile: DEFAULT_PROFILE, grades: student({}), periods: PERIODS, now: NOW, examResults: { "exam:francais_ecrit": 15 }, settings: { simulations: 1000 } });
    const fr = result.components.find(c => c.id === "exam:francais_ecrit");
    expect(fr?.finalized).toBe(true);
    expect(fr?.sd).toBe(0);
  });
});

describe("optimizer", () => {
  const input = { profile: DEFAULT_PROFILE, grades: student({ maths: 16, physique_chimie: 15.5, francais: 15, histoire_geo: 15 }), periods: PERIODS, now: NOW, settings: { simulations: 3000 } };

  it("ranks the spécialités among the strongest levers", () => {
    const lev = leverage(prepare(input), 1, 3000);
    const top3 = lev.slice(0, 3).map(l => l.subject);
    expect(top3).toEqual(expect.arrayContaining(["maths", "physique_chimie"]));
    for (const l of lev) { expect(l.overallGain).toBeGreaterThanOrEqual(-0.01); }
  });

  it("orders scenarios from prudent to ambitious", () => {
    const [prudent, trend, ambitious] = scenarios(prepare(input), 3000);
    expect(prudent.overallMedian).toBeLessThan(trend.overallMedian);
    expect(trend.overallMedian).toBeLessThan(ambitious.overallMedian);
    expect(prudent.admissible).toBeLessThanOrEqual(ambitious.admissible);
  });

  it("finds a next-grade target that actually reaches the goal", () => {
    const t = requiredNextGrade(input, "maths", 0.2, "admissible", 2000);
    if (t.required !== null && t.required > 0) {
      expect(t.probabilityWithRequired).toBeGreaterThanOrEqual(0.2);
      expect(t.required).toBeLessThanOrEqual(20);
    }
    expect(["acquis", "réaliste", "ambitieux", "hors de portée"]).toContain(t.realism);
  });
});

describe("calibration", () => {
  it("has roughly 80 % coverage on data drawn from the model's own assumptions", () => {
    const grades = student({ maths: 15, physique_chimie: 12, francais: 10 }, 14, 11);
    const report = backtest(grades);
    expect(report.predictions).toBeGreaterThan(50);
    expect(report.coverage80).toBeGreaterThan(0.65);
    expect(report.coverage80).toBeLessThan(0.95);
    expect(report.mae).toBeLessThan(3.5);
  });
});
