import { describe, expect, it } from "@jest/globals";

import { prepare } from "@/core/bac/engine";
import { DEFAULT_PROFILE } from "@/core/bac/rules";
import type { BacGrade } from "@/core/bac/types";
import { demoPeriods } from "@/utils/bac/demo";

import { allocate, Lever, phi, phiInverse, planGoal, realismOf } from "../allocate";
import { bacLevers, bacTarget } from "../bac";
import { PARCOURSUP_PROFILES, parcoursupTarget, projectDossier } from "../parcoursup";

const LEVERS: Lever[] = [
  { key: "maths", label: "Maths", impact: 0.3, level: 14, scale: 2.5 },
  { key: "pc", label: "PC", impact: 0.3, level: 13, scale: 2 },
  { key: "fr", label: "Français", impact: 0.1, level: 12, scale: 3 },
];

describe("allocate", () => {
  it("meets the required gain with the least effort", () => {
    const r = allocate(LEVERS, 1);
    expect(r.feasible).toBe(true);
    expect(r.delivered).toBeCloseTo(1, 4);
    // Optimality (KKT): z_s / (impact_s · scale_s) is the same for every uncapped lever.
    const ratios = r.levers.map(l => l.z / (l.impact * l.scale));
    for (const x of ratios) { expect(x).toBeCloseTo(ratios[0], 4); }
  });

  it("refuses miracles under the realism cap", () => {
    const r = allocate(LEVERS, 5, 1);
    expect(r.feasible).toBe(false);
    for (const l of r.levers) { expect(l.z).toBeLessThanOrEqual(1 + 1e-9); }
  });

  it("classifies realism", () => {
    expect(realismOf(0)).toBe("acquis");
    expect(realismOf(0.4)).toBe("réaliste");
    expect(realismOf(0.9)).toBe("ambitieux");
    expect(realismOf(1.5)).toBe("hors de portée");
  });

  it("has a consistent normal CDF", () => {
    expect(phi(0)).toBeCloseTo(0.5, 6);
    expect(phi(1.959964)).toBeCloseTo(0.975, 4);
    expect(phiInverse(0.7)).toBeCloseTo(0.5244, 3);
  });

  it("asks nothing when the goal is already secure", () => {
    const plan = planGoal(LEVERS, 15, 0.5, 12);
    expect(plan.allocation.levers.every(l => l.delta === 0)).toBe(true);
    expect(plan.probabilityNow).toBeGreaterThan(0.99);
  });
});

const NOW = new Date(2026, 10, 25);
const input = () => {
  const periods = demoPeriods(NOW);
  return {
    profile: DEFAULT_PROFILE,
    grades: periods.flatMap(p => p.grades) as BacGrade[],
    periods: periods.flatMap(p => (p.period ? [p.period] : [])),
    now: NOW,
    settings: { simulations: 3000 },
  };
};

describe("bac targets", () => {
  it("weighs the spécialités most and leaves finished components out", () => {
    const p = prepare(input());
    const levers = bacLevers(p);
    const maths = levers.find(l => l.key === "maths");
    const emc = levers.find(l => l.key === "emc");
    expect(maths).toBeDefined();
    // Maths: 16 (exam) + 2 (EAM) + 4 (half of the grand oral) over 100.
    expect(maths!.impact).toBeGreaterThan(0.2);
    expect(maths!.impact).toBeLessThanOrEqual(0.22 + 1e-9);
    expect(emc!.impact).toBeLessThan(0.03);
  });

  it("raises the simulated probability when the plan is followed", () => {
    const p = prepare(input());
    const r = bacTarget(p, 17, { simulations: 3000 });
    expect(r.simulatedWithPlan).toBeGreaterThanOrEqual(r.simulatedNow);
    if (r.allocation.feasible) { expect(r.simulatedWithPlan).toBeGreaterThan(0.55); }
  });

  it("can restrict the plan to chosen subjects", () => {
    const p = prepare(input());
    const r = bacTarget(p, 16, { subjects: ["maths", "physique_chimie"], simulations: 2000 });
    expect(r.allocation.levers.map(l => l.key).sort()).toEqual(["maths", "physique_chimie"]);
  });
});

describe("parcoursup targets", () => {
  it("projects a dossier close to the student's level", () => {
    const p = prepare(input());
    const d = projectDossier(p, PARCOURSUP_PROFILES[0]);
    expect(d.expected).toBeGreaterThan(13);
    expect(d.expected).toBeLessThan(18.5);
    expect(d.subjects[0].weight).toBe(3);
    // Only Première T1 has grades: almost the whole dossier is still open.
    expect(d.levers.length).toBeGreaterThan(3);
    expect(d.openPeriods.length).toBeGreaterThanOrEqual(4);
  });

  it("focuses the effort on the essential subjects of a prépa", () => {
    const p = prepare(input());
    const r = parcoursupTarget(p, PARCOURSUP_PROFILES[0], 17.5);
    const top = r.allocation.levers.slice(0, 2).map(l => l.key);
    expect(top).toEqual(expect.arrayContaining(["maths", "physique_chimie"]));
  });
});
