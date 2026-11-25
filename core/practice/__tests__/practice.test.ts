import { describe, expect, it } from "@jest/globals";

import { checkAnswer, parseNumber } from "../answer";
import { parseCardText } from "../cards";
import { deckCards, matchChapters, PROGRAM, SKILLS } from "../curriculum";
import { chooseDifficulty, NEW_SKILL, predictedMark, ratingFromAttempt, recordAttempt, updateMastery } from "../mastery";
import { buildQueue, makeExercise, markOn20 } from "../session";
import type { Difficulty } from "../types";

describe("answer parsing", () => {
  it.each([
    ["3,5", 3.5], ["−2", -2], ["-0,25", -0.25], ["1/2", 0.5], ["2 400", 2400],
    ["3,2e-5", 3.2e-5], ["3,2×10^-5", 3.2e-5], ["3,2·10⁻⁵", 3.2e-5], ["6,02*10^23", 6.02e23], ["10²", 100],
  ])("reads %s", (raw, value) => {
    expect(parseNumber(raw)).toBeCloseTo(value as number, 12);
  });

  it("rejects garbage", () => {
    expect(parseNumber("abc")).toBeNull();
    expect(parseNumber("")).toBeNull();
    expect(parseNumber("1/0")).toBeNull();
  });
});

describe("generators", () => {
  const ids = Object.keys(SKILLS);

  it("covers every skill the programme references", () => {
    for (const ch of PROGRAM) {
      for (const s of ch.skills) { expect(SKILLS[s]).toBeDefined(); }
      if (ch.deck) { expect(deckCards(ch.deck).length).toBeGreaterThan(3); }
    }
  });

  it.each(ids)("%s: 1 200 exercises are consistent", id => {
    for (const d of [1, 2, 3] as Difficulty[]) {
      for (let seed = 1; seed <= 400; seed++) {
        const ex = makeExercise(id, d, seed * 7919);
        const text = [ex.prompt, ex.display, ex.hint, ...ex.solution, ...(ex.choices ?? [])].join(" ");
        expect(text).not.toMatch(/NaN|undefined|Infinity|\[object/);
        expect(Number.isFinite(ex.answer)).toBe(true);
        if (ex.kind === "choice") {
          expect(ex.choices!.length).toBeGreaterThanOrEqual(2);
          expect(new Set(ex.choices).size).toBe(ex.choices!.length);
          expect(ex.answer).toBeGreaterThanOrEqual(0);
          expect(ex.answer).toBeLessThan(ex.choices!.length);
          expect(ex.choices![ex.answer]).toBe(ex.display);
        } else {
          // What we show as the answer must be accepted as the answer.
          expect(checkAnswer(ex, ex.display.replace(/ × 10/, "×10^").replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+$/, m => m))).toBe("correct");
          expect(checkAnswer(ex, ex.answer)).toBe("correct");
        }
      }
    }
  });

  it("is reproducible from a seed", () => {
    expect(makeExercise("m.derive.point", 2, 42)).toEqual(makeExercise("m.derive.point", 2, 42));
  });
});

describe("mastery", () => {
  const attempt = (correct: boolean, difficulty: Difficulty = 2) => ({ correct, difficulty, guess: 0.15, usedHint: false, seconds: 60 });

  it("needs a run of right answers, not one, to call a skill mastered", () => {
    const once = recordAttempt(NEW_SKILL, attempt(true), Date.now());
    expect(once.pL).toBeLessThan(0.7);
    let s = NEW_SKILL;
    for (let i = 0; i < 4; i++) { s = recordAttempt(s, attempt(true), Date.now()); }
    expect(s.pL).toBeGreaterThan(0.95);
  });

  it("rises with right answers and falls with wrong ones", () => {
    expect(updateMastery(0.5, attempt(true))).toBeGreaterThan(0.5);
    expect(updateMastery(0.5, attempt(false))).toBeLessThan(0.5);
  });

  it("reaches mastery after a run of right answers and adapts difficulty", () => {
    let s = NEW_SKILL;
    for (let i = 0; i < 8; i++) { s = recordAttempt(s, attempt(true), Date.now()); }
    expect(s.pL).toBeGreaterThan(0.95);
    expect(chooseDifficulty(s)).toBe(3);
    let w = NEW_SKILL;
    for (let i = 0; i < 6; i++) { w = recordAttempt(w, attempt(false), Date.now()); }
    expect(chooseDifficulty(w)).toBe(1);
  });

  it("rates from the outcome, not from feelings", () => {
    expect(ratingFromAttempt(attempt(false))).toBe(1);
    expect(ratingFromAttempt({ ...attempt(true), usedHint: true })).toBe(2);
    expect(ratingFromAttempt({ ...attempt(true), seconds: 20 })).toBe(4);
  });

  it("predicts a mark from mastery", () => {
    expect(predictedMark([{ ...NEW_SKILL, pL: 0.99 }])).toBeGreaterThan(17);
    expect(predictedMark([undefined])).toBeLessThan(5);
    expect(markOn20(3, 4)).toBe(15);
  });
});

describe("queue", () => {
  it("interleaves skills and mixes in due cards", () => {
    const q = buildQueue({
      skills: ["m.deg2.delta", "m.derive.point", "m.suite.arith"],
      cards: [{ id: "c1" }, { id: "c2" }, { id: "c3" }],
      states: {},
      length: 10,
      now: 1_800_000_000_000,
      seed: 3,
    });
    expect(q).toHaveLength(10);
    const keys = q.map(x => (x.type === "exercise" ? x.exercise.skillId : "card"));
    let repeats = 0;
    for (let i = 1; i < keys.length; i++) { if (keys[i] === keys[i - 1]) { repeats++; } }
    expect(repeats).toBeLessThanOrEqual(1);
    expect(keys.filter(k => k === "card").length).toBe(3);
    expect(new Set(keys.filter(k => k !== "card")).size).toBe(3);
  });

  it("uses cards only for subjects without exercises, none in a mock test", () => {
    const cards = Array.from({ length: 12 }, (_, i) => ({ id: `c${i}` }));
    expect(buildQueue({ skills: [], cards, states: {}, length: 8, now: 1, seed: 1 }).every(x => x.type === "card")).toBe(true);
    expect(buildQueue({ skills: ["p.ondes"], cards, states: {}, length: 5, now: 1, seed: 1, exam: true }).every(x => x.type === "exercise")).toBe(true);
  });
});

describe("matching lessons to the programme", () => {
  it("recognises chapters in free text", () => {
    expect(matchChapters("maths", "DS dérivation et tangentes").map(c => c.id)).toContain("maths:derivation");
    expect(matchChapters("physique_chimie", "Interro : tableau d'avancement").map(c => c.id)).toContain("physique_chimie:avancement");
    expect(matchChapters("maths", "rien à voir")).toHaveLength(0);
  });
});

describe("card import", () => {
  it("reads semicolons, tabs (Anki, Quizlet) and skips comments", () => {
    const cards = parseCardText("# deck\nDérivée de ln(x) ; 1/x\nthe gap\tl'écart\n\nvide ;\nf'(a) :: nombre dérivé");
    expect(cards).toEqual([
      { front: "Dérivée de ln(x)", back: "1/x" },
      { front: "the gap", back: "l'écart" },
      { front: "f'(a)", back: "nombre dérivé" },
    ]);
  });
});
