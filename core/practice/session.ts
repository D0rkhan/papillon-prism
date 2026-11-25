/**
 * Builds a practice queue: exercises (generated) and cards (spaced repetition),
 * chosen by need and interleaved — never the same skill twice in a row, so the
 * student has to recognise which method applies (interleaved practice).
 */
import { retrievability } from "@/core/revision/fsrs";

import { SKILLS } from "./curriculum";
import { chooseDifficulty, practiceNeed, SkillState } from "./mastery";
import { createRng, Difficulty, Exercise } from "./types";

export type QueueItem =
  | { type: "exercise"; exercise: Exercise }
  | { type: "card"; cardId: string };

export interface CardRef {
  id: string;
  due?: number;
  memory?: Parameters<typeof retrievability>[0];
}

export function makeExercise(skillId: string, difficulty: Difficulty, seed: number): Exercise {
  const skill = SKILLS[skillId];
  if (!skill) { throw new Error(`Unknown skill ${skillId}`); }
  const body = skill.generate(createRng(seed), difficulty);
  // Typographic minus everywhere ("-4" → "−4"), as in a textbook.
  const minus = (t: string) => t.replace(/(^|[\s(=;/×,^:+])-(?=\d)/g, "$1−");
  return {
    ...body,
    prompt: minus(body.prompt),
    hint: minus(body.hint),
    solution: body.solution.map(minus),
    choices: body.choices?.map(minus),
    display: minus(body.display),
    id: `${skillId}:${difficulty}:${seed}`,
    skillId,
    difficulty,
  };
}

export interface QueueOptions {
  skills: string[];
  cards: CardRef[];
  states: Record<string, SkillState | undefined>;
  length: number;
  now: number;
  seed?: number;
  /** Test conditions: harder exercises, no cards. */
  exam?: boolean;
}

export function buildQueue(o: QueueOptions): QueueItem[] {
  const seed = o.seed ?? (o.now % 1_000_000_007);
  const rng = createRng(seed);
  const skills = o.skills.filter(id => SKILLS[id]);

  // How many of each: cards only when no exercise exists, or ~30 % otherwise.
  const dueCards = o.exam ? [] : o.cards
    .map(c => ({ c, need: c.memory ? 1 - retrievability(c.memory, o.now) : 0.7, due: !c.memory || (c.due ?? 0) <= o.now }))
    .filter(x => x.due)
    .sort((a, b) => b.need - a.need);
  const cardSlots = skills.length === 0 ? o.length : Math.min(dueCards.length, Math.round(o.length * 0.3));
  const exSlots = skills.length === 0 ? 0 : o.length - cardSlots;

  // Exercises: sample skills with probability ∝ need, at least once each when possible.
  const exercises: Exercise[] = [];
  const weights = skills.map(id => 0.15 + practiceNeed(o.states[id], o.now));
  const counts = new Map<string, number>();
  for (let i = 0; i < exSlots; i++) {
    let id: string;
    if (i < skills.length && exSlots >= skills.length) {
      id = [...skills].sort((a, b) => practiceNeed(o.states[b], o.now) - practiceNeed(o.states[a], o.now))[i];
    } else {
      const total = weights.reduce((s, w) => s + w, 0);
      let x = rng.next() * total;
      id = skills[skills.length - 1];
      for (let k = 0; k < skills.length; k++) { x -= weights[k]; if (x <= 0) { id = skills[k]; break; } }
    }
    const n = counts.get(id) ?? 0;
    counts.set(id, n + 1);
    const base = chooseDifficulty(o.states[id]);
    const difficulty = (o.exam ? Math.max(2, base) : Math.min(3, base + (n >= 2 ? 1 : 0))) as Difficulty;
    exercises.push(makeExercise(id, difficulty, rng.int(1, 2_000_000_000)));
  }

  // Interleave: no two consecutive items from the same skill when avoidable.
  const pool: QueueItem[] = [
    ...exercises.map(exercise => ({ type: "exercise" as const, exercise })),
    ...dueCards.slice(0, cardSlots).map(x => ({ type: "card" as const, cardId: x.c.id })),
  ];
  const keyOf = (q: QueueItem) => (q.type === "exercise" ? q.exercise.skillId : "card");
  const out: QueueItem[] = [];
  while (pool.length) {
    const last = out.length ? keyOf(out[out.length - 1]) : "";
    const candidates = pool.map((q, i) => ({ q, i })).filter(x => keyOf(x.q) !== last);
    const pickFrom = candidates.length ? candidates : pool.map((q, i) => ({ q, i }));
    const chosen = pickFrom[Math.floor(rng.next() * pickFrom.length)];
    out.push(chosen.q);
    pool.splice(chosen.i, 1);
  }
  return out;
}

/** Mark /20 of a mock test. */
export const markOn20 = (right: number, total: number) => (total === 0 ? 0 : Math.round((right / total) * 20 * 2) / 2);
