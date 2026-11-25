import { describe, expect, it } from "@jest/globals";

import { forgettingCurve, intervalDays, previewIntervals, retrievability, review } from "../fsrs";
import { familyOf, protocolFor, totalMinutes } from "../methods";
import { examPlan, planToday, rankChapters, startOfDay, subjectWeight, testUrgency } from "../planner";

const DAY = 24 * 3600 * 1000;
const NOW = new Date(2026, 10, 25, 17, 0).getTime();

describe("fsrs", () => {
  it("defines stability as the 90 % recall point", () => {
    expect(forgettingCurve(0, 5)).toBeCloseTo(1, 6);
    expect(forgettingCurve(5, 5)).toBeCloseTo(0.9, 6);
    expect(intervalDays(10)).toBe(10);
  });

  it("orders first intervals by rating", () => {
    const iv = previewIntervals(undefined, NOW);
    expect(iv[1]).toBe(1);
    expect(iv[2]).toBeLessThanOrEqual(iv[3]);
    expect(iv[3]).toBeLessThan(iv[4]);
  });

  it("grows stability on success and shrinks it on a lapse", () => {
    let s = review(undefined, 3, NOW);
    const first = s.stability;
    s = review(s, 3, s.due);
    expect(s.stability).toBeGreaterThan(first);
    const lapsed = review(s, 1, s.due);
    expect(lapsed.stability).toBeLessThan(s.stability);
    expect(lapsed.lapses).toBe(1);
    expect(lapsed.due - lapsed.lastReview).toBe(DAY);
  });

  it("keeps difficulty in range", () => {
    let s = review(undefined, 1, NOW);
    for (let i = 0; i < 20; i++) { s = review(s, 1, s.due); }
    expect(s.difficulty).toBeLessThanOrEqual(10);
    for (let i = 0; i < 20; i++) { s = review(s, 4, s.due); }
    expect(s.difficulty).toBeGreaterThanOrEqual(1);
  });

  it("forgets over time", () => {
    const s = review(undefined, 3, NOW);
    expect(retrievability(s, NOW + DAY)).toBeGreaterThan(retrievability(s, NOW + 20 * DAY));
  });
});

describe("methods", () => {
  it("maps subjects to families and builds sessions of sane length", () => {
    expect(familyOf("maths")).toBe("sciences");
    expect(familyOf("anglais")).toBe("langues");
    expect(familyOf(undefined)).toBe("autre");
    for (const mode of ["decouverte", "rappel", "controle", "express"] as const) {
      const p = protocolFor("sciences", mode);
      expect(totalMinutes(p)).toBeGreaterThanOrEqual(10);
      expect(totalMinutes(p)).toBeLessThanOrEqual(45);
    }
  });
});

describe("planner", () => {
  const subjects = [
    { id: "m", name: "Maths", canonical: "maths", weight: 1.3 },
    { id: "pc", name: "Physique", canonical: "physique_chimie", weight: 1.2 },
    { id: "hg", name: "Histoire", canonical: "histoire_geo", weight: 0.9 },
  ];
  const fresh = (id: string, subjectId: string, createdDaysAgo: number) => ({ id, subjectId, title: id, createdAt: NOW - createdDaysAgo * DAY });

  it("puts a chapter with a test tomorrow first", () => {
    const chapters = [fresh("m1", "m", 30), fresh("hg1", "hg", 30)];
    chapters[0] = { ...chapters[0], memory: review(undefined, 4, NOW - 2 * DAY) } as typeof chapters[0];
    const ranked = rankChapters(subjects, chapters, [{ id: "e", subjectId: "hg", title: "DS", date: NOW + DAY, chapterIds: [] }], NOW);
    expect(ranked[0].chapter.id).toBe("hg1");
    expect(ranked[0].mode).toBe("controle");
    expect(ranked[0].reasons[0]).toBe("Contrôle demain");
  });

  it("interleaves subjects in today's plan", () => {
    const chapters = [fresh("m1", "m", 1), fresh("m2", "m", 1), fresh("pc1", "pc", 1)];
    const plan = planToday(rankChapters(subjects, chapters, [], NOW), 120);
    expect(plan[0].subject.id).not.toBe(plan[1].subject.id);
  });

  it("compresses the test plan when the test is close", () => {
    const steps = examPlan(NOW + 3 * DAY, NOW);
    expect(steps.map(s => s.mode)).toEqual(["controle", "express"]);
    expect(examPlan(NOW + 10 * DAY, NOW)).toHaveLength(4);
    expect(examPlan(NOW, NOW)[0].date).toBe(startOfDay(NOW));
  });

  it("bounds urgency and weights", () => {
    expect(testUrgency(0)).toBe(1);
    expect(testUrgency(30)).toBeLessThan(0.2);
    expect(subjectWeight(0.22, 3)).toBeLessThanOrEqual(1.4);
    expect(subjectWeight(0, -10)).toBeGreaterThanOrEqual(0.6);
  });
});
