/**
 * FSRS-5 — Free Spaced Repetition Scheduler (open-spaced-repetition, used by Anki
 * since 23.10). Three-component memory model:
 *   - R, retrievability: probability to recall right now;
 *   - S, stability: days for R to fall from 100 % to 90 %;
 *   - D, difficulty: 1–10, how hard the item is to consolidate.
 * The forgetting curve is a power law: R(t) = (1 + F·t/S)^C, F = 19/81, C = −0.5.
 * After each review S and D are updated from the rating; the next review is
 * scheduled when R would reach the desired retention (90 % by default).
 *
 * Plain TypeScript, deterministic, no I/O. Default parameters: FSRS-5 defaults,
 * fitted on hundreds of millions of Anki reviews.
 */

export type Rating = 1 | 2 | 3 | 4;
export const RATING_LABEL: Record<Rating, string> = { 1: "Trou noir", 2: "Difficile", 3: "Bien", 4: "Facile" };

export interface MemoryState {
  stability: number;
  difficulty: number;
  /** Last review, ms epoch. */
  lastReview: number;
  /** Next scheduled review, ms epoch. */
  due: number;
  reps: number;
  lapses: number;
}

export const FSRS5_WEIGHTS = [
  0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192,
  1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621,
] as const;

const DECAY = -0.5;
const FACTOR = 19 / 81;
const DAY = 24 * 3600 * 1000;
const MAX_INTERVAL_DAYS = 180;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export interface FsrsOptions {
  /** Target probability of recall at the next review. */
  retention?: number;
  weights?: readonly number[];
}

/** Probability to recall `elapsedDays` after the last review. */
export const forgettingCurve = (elapsedDays: number, stability: number): number =>
  Math.pow(1 + (FACTOR * Math.max(0, elapsedDays)) / Math.max(stability, 0.01), DECAY);

export function retrievability(state: MemoryState | undefined, now: number): number {
  if (!state) { return 0; }
  return forgettingCurve((now - state.lastReview) / DAY, state.stability);
}

/** Days until R falls to `retention`. */
export function intervalDays(stability: number, retention = 0.9): number {
  const raw = (stability / FACTOR) * (Math.pow(retention, 1 / DECAY) - 1);
  return clamp(Math.round(raw), 1, MAX_INTERVAL_DAYS);
}

const initDifficulty = (w: readonly number[], g: Rating) => clamp(w[4] - Math.exp(w[5] * (g - 1)) + 1, 1, 10);
const initStability = (w: readonly number[], g: Rating) => Math.max(w[g - 1], 0.1);

function nextDifficulty(w: readonly number[], d: number, g: Rating): number {
  const delta = -w[6] * (g - 3);
  const damped = d + (delta * (10 - d)) / 9;
  // Mean reversion towards the difficulty of an "Easy" first answer.
  return clamp(w[7] * initDifficulty(w, 4) + (1 - w[7]) * damped, 1, 10);
}

function recallStability(w: readonly number[], d: number, s: number, r: number, g: Rating): number {
  const hard = g === 2 ? w[15] : 1;
  const easy = g === 4 ? w[16] : 1;
  return s * (1 + Math.exp(w[8]) * (11 - d) * Math.pow(s, -w[9]) * (Math.exp((1 - r) * w[10]) - 1) * hard * easy);
}

function forgetStability(w: readonly number[], d: number, s: number, r: number): number {
  const next = w[11] * Math.pow(d, -w[12]) * (Math.pow(s + 1, w[13]) - 1) * Math.exp((1 - r) * w[14]);
  return Math.min(next, s);
}

const shortTermStability = (w: readonly number[], s: number, g: Rating) => s * Math.exp(w[17] * (g - 3 + w[18]));

/** Memory state after a review rated `g` at `now`. */
export function review(state: MemoryState | undefined, g: Rating, now: number, options: FsrsOptions = {}): MemoryState {
  const w = options.weights ?? FSRS5_WEIGHTS;
  const retention = options.retention ?? 0.9;

  let stability: number;
  let difficulty: number;
  if (!state) {
    stability = initStability(w, g);
    difficulty = initDifficulty(w, g);
  } else {
    const elapsed = (now - state.lastReview) / DAY;
    const r = forgettingCurve(elapsed, state.stability);
    difficulty = nextDifficulty(w, state.difficulty, g);
    if (elapsed < 1) {
      stability = shortTermStability(w, state.stability, g);
    } else if (g === 1) {
      stability = forgetStability(w, state.difficulty, state.stability, r);
    } else {
      stability = recallStability(w, state.difficulty, state.stability, r, g);
    }
  }
  stability = clamp(stability, 0.1, 36500);

  // "Trou noir" comes back the next day whatever the model says: relearning first.
  const days = g === 1 ? 1 : intervalDays(stability, retention);
  return {
    stability,
    difficulty,
    lastReview: now,
    due: now + days * DAY,
    reps: (state?.reps ?? 0) + 1,
    lapses: (state?.lapses ?? 0) + (g === 1 && state ? 1 : 0),
  };
}

/** Interval each rating would give, for the rating buttons ("dans 3 j"). */
export function previewIntervals(state: MemoryState | undefined, now: number, options: FsrsOptions = {}): Record<Rating, number> {
  const out = {} as Record<Rating, number>;
  for (const g of [1, 2, 3, 4] as Rating[]) {
    out[g] = Math.max(1, Math.round((review(state, g, now, options).due - now) / DAY));
  }
  return out;
}

export const formatInterval = (days: number): string =>
  days < 1 ? "aujourd'hui" : days === 1 ? "demain" : days < 30 ? `${days} j` : days < 365 ? `${Math.round(days / 30)} mois` : `${Math.round(days / 365)} an`;
