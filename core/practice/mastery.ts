/**
 * Skill mastery and adaptive difficulty.
 *
 * - Bayesian Knowledge Tracing (Corbett & Anderson, 1995), the model of the
 *   cognitive tutors: P(L) is the probability the skill is mastered. Each
 *   answer updates it by Bayes' rule (a right answer can be a guess, a wrong
 *   one a slip), then learning may happen with probability T.
 * - Difficulty aims at ~85 % success: the "eighty-five percent rule" (Wilson
 *   et al., 2019) — learning is fastest when errors stay around 15 %.
 * - Each skill also keeps an FSRS memory state, rated from the outcome (not a
 *   self-assessment), so mastered skills still come back before they fade.
 */
import { MemoryState, Rating, retrievability, review } from "@/core/revision/fsrs";

import type { Difficulty } from "./types";

export interface SkillState {
  /** P(mastered), Bayesian Knowledge Tracing. */
  pL: number;
  attempts: number;
  correct: number;
  /** Last outcomes, most recent last (max 10). */
  recent: boolean[];
  memory?: MemoryState;
  lastAt?: number;
}

export const NEW_SKILL: SkillState = { pL: 0.15, attempts: 0, correct: 0, recent: [] };

const SLIP = 0.1;
const TRANSIT: Record<Difficulty, number> = { 1: 0.1, 2: 0.15, 3: 0.2 };
export const MASTERED = 0.95;

export interface Attempt {
  correct: boolean;
  difficulty: Difficulty;
  /** 1/number of choices for a multiple choice, ~0 for a typed number. */
  guess: number;
  usedHint: boolean;
  /** Seconds spent. */
  seconds: number;
}

/** BKT update for one answer. A hint counts as half a success. */
export function updateMastery(pL: number, a: Attempt): number {
  const guess = Math.max(0.02, a.guess);
  const evidence = a.correct && !a.usedHint
    ? (pL * (1 - SLIP)) / (pL * (1 - SLIP) + (1 - pL) * guess)
    : !a.correct
      ? (pL * SLIP) / (pL * SLIP + (1 - pL) * (1 - guess))
      : pL; // correct with a hint: no evidence either way
  const learned = evidence + (1 - evidence) * TRANSIT[a.difficulty];
  return Math.min(0.999, Math.max(0.001, learned));
}

/** FSRS rating from what actually happened. */
export function ratingFromAttempt(a: Attempt): Rating {
  if (!a.correct) { return 1; }
  const expected = a.difficulty === 1 ? 60 : a.difficulty === 2 ? 120 : 180;
  if (a.usedHint || a.seconds > expected * 1.5) { return 2; }
  if (a.difficulty >= 2 && a.seconds < expected * 0.5) { return 4; }
  return 3;
}

export function recordAttempt(state: SkillState | undefined, a: Attempt, now: number): SkillState {
  const s = state ?? NEW_SKILL;
  return {
    pL: updateMastery(s.pL, a),
    attempts: s.attempts + 1,
    correct: s.correct + (a.correct ? 1 : 0),
    recent: [...s.recent, a.correct].slice(-10),
    memory: review(s.memory, ratingFromAttempt(a), now),
    lastAt: now,
  };
}

/** Level that should give about 85 % success. */
export function chooseDifficulty(state: SkillState | undefined): Difficulty {
  const s = state ?? NEW_SKILL;
  let d: number = s.pL < 0.4 ? 1 : s.pL < 0.8 ? 2 : 3;
  const last = s.recent.slice(-6);
  if (last.length >= 4) {
    const rate = last.filter(Boolean).length / last.length;
    if (rate > 0.92) { d += 1; }
    else if (rate < 0.6) { d -= 1; }
  }
  return Math.min(3, Math.max(1, d)) as Difficulty;
}

/** Probability of a right answer on a typed exercise. */
export const successProbability = (pL: number) => pL * (1 - SLIP) + (1 - pL) * 0.1;

/** Need for practice in [0, 1]: not mastered, or mastered but fading. */
export function practiceNeed(state: SkillState | undefined, now: number): number {
  const s = state ?? NEW_SKILL;
  const notMastered = 1 - s.pL;
  const fading = s.memory ? 1 - retrievability(s.memory, now) : 0.6;
  return 0.6 * notMastered + 0.4 * fading;
}

/**
 * Expected mark /20 on a test made of these skills today, from the mastery
 * estimates (each question equally weighted).
 */
export function predictedMark(states: (SkillState | undefined)[]): number | null {
  if (states.length === 0) { return null; }
  const p = states.reduce((sum, s) => sum + successProbability((s ?? NEW_SKILL).pL), 0) / states.length;
  return Math.round(p * 20 * 2) / 2;
}
