import { describe, expect, it } from "@jest/globals";

import { medianOn20, overallAverage, subjectAverage, subjectAverageDetailed } from "../normalize";

const g = (value: number | null, outOf = 20, coefficient = 1, extra: object = {}) => ({ value, outOf, coefficient, ...extra });

describe("subjectAverage", () => {
  it("brings every grade back to /20 with the same weight (bug G1)", () => {
    // 5/10 and 10/20 are both 10/20; plus 16/20 → (10 + 10 + 16) / 3 = 12
    expect(subjectAverage([g(5, 10), g(10, 20), g(16, 20)])).toBeCloseTo(12, 10);
  });

  it("weights by coefficient", () => {
    expect(subjectAverage([g(10, 20, 1), g(16, 20, 2)])).toBeCloseTo(14, 10);
  });

  it("supports the 'points' mode (Σ points / Σ barèmes)", () => {
    // (5 + 16) / (10 + 20) * 20 = 14
    expect(subjectAverage([g(5, 10), g(16, 20)], "points")).toBeCloseTo(14, 10);
  });

  it("ignores grades without value or with a zero coefficient", () => {
    expect(subjectAverage([g(null), g(12), g(4, 20, 0)])).toBeCloseTo(12, 10);
    expect(subjectAverage([g(null)])).toBeNull();
  });

  it("counts an 'absent zero' (value 0) as a real zero", () => {
    expect(subjectAverage([g(0), g(16)])).toBeCloseTo(8, 10);
  });

  it("keeps an optional grade only if it raises the average", () => {
    expect(subjectAverage([g(12), g(8, 20, 1, { optional: true })])).toBeCloseTo(12, 10);
    expect(subjectAverage([g(12), g(18, 20, 1, { optional: true })])).toBeCloseTo(15, 10);
  });

  it("picks the optimal subset of several optional grades (bug G3)", () => {
    // base 10; optional 16, 13, 11 → keep 16 (avg 13), 13 is not > 13, stop → 13
    const detail = subjectAverageDetailed([
      g(10),
      g(13, 20, 1, { optional: true }),
      g(16, 20, 1, { optional: true }),
      g(11, 20, 1, { optional: true }),
    ]);
    expect(detail.average).toBeCloseTo(13, 10);
    expect(detail.keptOptional).toBe(1);
  });

  it("adds only the points above 10 of a bonus grade, without touching the denominator (bug G2)", () => {
    // 12 avg + (15 − 10)·1 / 1 = 17
    expect(subjectAverage([g(12), g(15, 20, 1, { bonus: true })])).toBeCloseTo(17, 10);
    // a bonus below 10 changes nothing
    expect(subjectAverage([g(12), g(6, 20, 1, { bonus: true })])).toBeCloseTo(12, 10);
  });

  it("caps the result at 20, explicitly", () => {
    const d = subjectAverageDetailed([g(19), g(20, 20, 1, { bonus: true })]);
    expect(d.average).toBe(20);
    expect(d.base).toBeCloseTo(19, 10);
  });
});

describe("overallAverage / median", () => {
  it("weights subjects by their report-card coefficient (bug G4)", () => {
    expect(overallAverage([{ average: 10, coefficient: 1 }, { average: 16, coefficient: 2 }])).toBeCloseTo(14, 10);
    expect(overallAverage([{ average: null }, { average: 12 }])).toBeCloseTo(12, 10);
  });

  it("computes the median of normalized grades", () => {
    expect(medianOn20([g(5, 10), g(18), g(14)])).toBeCloseTo(14, 10);
    expect(medianOn20([g(8), g(12)])).toBeCloseTo(10, 10);
  });
});

describe("Pronote « Ramener sur 20 » par devoir", () => {
  const n = (value: number, outOf: number, coefficient = 1, outOf20 = true) => ({ value, outOf, coefficient, outOf20 });

  it("ramène sur 20 par défaut (8/10 pèse comme 16/20)", () => {
    expect(subjectAverage([n(8, 10), n(12, 20)])).toBeCloseTo(14, 10);
  });

  it("compte en points un devoir non ramené : Σ notes / Σ barèmes × 20", () => {
    // (8 + 12) / (10 + 20) × 20 = 13,33
    expect(subjectAverage([n(8, 10, 1, false), n(12, 20, 1, false)])).toBeCloseTo(40 / 3, 10);
  });

  it("mélange les deux comme Pronote (le ramené vaut barème 20)", () => {
    // 8/10 non ramené (coef 2) + 15/20 ramené (coef 1) → (2×8 + 15) / (2×10 + 20) × 20 = 15,5
    expect(subjectAverage([n(8, 10, 2, false), n(15, 20, 1, true)])).toBeCloseTo(15.5, 10);
  });

  it("bonus non ramené : seuls les points au-dessus de la moitié du barème comptent", () => {
    // base 12/20 ; bonus 8/10 non ramené coef 1 → +3 points sur un poids de 1 → 15
    const avg = subjectAverage([n(12, 20), { ...n(8, 10, 1, false), bonus: true }]);
    expect(avg).toBeCloseTo(12 + (8 - 5) / 1, 10);
  });
});

