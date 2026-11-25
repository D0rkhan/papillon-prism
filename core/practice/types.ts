/**
 * Practice engine: exercises generated on the device, checked automatically,
 * each with a worked solution. Plain TypeScript, deterministic from a seed.
 */

export type Difficulty = 1 | 2 | 3;

export interface ExerciseBody {
  prompt: string;
  kind: "numeric" | "choice";
  /** Numeric value, or index of the right choice. */
  answer: number;
  choices?: string[];
  /** Accepted error: relative (0.01 = 1 %) and/or absolute. */
  tolerance?: { rel?: number; abs?: number };
  /** Shown after the input ("mol", "m/s"…). */
  unit?: string;
  /** Answer as it should be written, e.g. "0,35" or "1/2". */
  display: string;
  hint: string;
  /** Worked solution, one step per line. */
  solution: string[];
}

export interface Exercise extends ExerciseBody {
  id: string;
  skillId: string;
  difficulty: Difficulty;
}

export interface Skill {
  id: string;
  title: string;
  generate: (rng: Rng, difficulty: Difficulty) => ExerciseBody;
}

export interface Rng {
  next: () => number;
  int: (min: number, max: number) => number;
  pick: <T>(items: readonly T[]) => T;
  /** Non-zero integer in [min, max]. */
  nonZero: (min: number, max: number) => number;
}

/** Mulberry32: tiny, fast, good enough for exercise numbers. */
export function createRng(seed: number): Rng {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (min: number, max: number) => min + Math.floor(next() * (max - min + 1));
  return {
    next,
    int,
    pick: items => items[Math.floor(next() * items.length)],
    nonZero: (min, max) => {
      for (let i = 0; i < 50; i++) {
        const v = int(min, max);
        if (v !== 0) { return v; }
      }
      return 1;
    },
  };
}

/** French number: comma decimal, no trailing zeros, at most `digits` decimals. */
export function fr(value: number, digits = 3): string {
  if (!Number.isFinite(value)) { return "—"; }
  const rounded = Math.round(value * 10 ** digits) / 10 ** digits;
  const s = (Object.is(rounded, -0) ? 0 : rounded).toString();
  if (/e/i.test(s)) { return sci(value); }
  return s.replace("-", "−").replace(".", ",");
}

/** Scientific notation in French: 3,2 × 10⁻⁵. */
export function sci(value: number, digits = 3): string {
  if (value === 0) { return "0"; }
  const exp = Math.floor(Math.log10(Math.abs(value)));
  const mant = value / 10 ** exp;
  const sup = String(exp).replace(/-/g, "⁻").replace(/\d/g, d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]);
  return `${fr(Number(mant.toPrecision(digits)), digits)} × 10${sup}`;
}

/** `digits` significant figures; scientific notation only for very small or large values. */
export function num(value: number, digits = 3): string {
  if (value === 0 || !Number.isFinite(value)) { return fr(value); }
  const abs = Math.abs(value);
  if (abs < 1e-3 || abs >= 1e6) { return sci(value, digits); }
  const decimals = Math.max(0, digits - 1 - Math.floor(Math.log10(abs)));
  return fr(Number(value.toPrecision(digits)), decimals);
}

/** Signed term for a polynomial: "+ 3x", "− 2". */
export const term = (coef: number, x = "", first = false): string => {
  if (coef === 0) { return ""; }
  const abs = Math.abs(coef);
  const body = x && abs === 1 ? x : `${fr(abs)}${x}`;
  if (first) { return coef < 0 ? `−${body}` : body; }
  return coef < 0 ? ` − ${body}` : ` + ${body}`;
};

/** a x² + b x + c written cleanly. */
export function poly(coefs: { c: number; p: number }[], v = "x"): string {
  const pow = (p: number) => (p === 0 ? "" : p === 1 ? v : `${v}${p === 2 ? "²" : p === 3 ? "³" : `^${p}`}`);
  const parts = coefs.filter(t => t.c !== 0).sort((a, b) => b.p - a.p);
  if (!parts.length) { return "0"; }
  return parts.map((t, i) => term(t.c, pow(t.p), i === 0)).join("");
}

/** Shuffles choices and returns the index of the right one (first item = right). */
export function withChoices(rng: Rng, right: string, wrong: string[]): { choices: string[]; answer: number } {
  const unique = [right, ...wrong.filter((w, i) => w !== right && wrong.indexOf(w) === i)].slice(0, 4);
  const order = unique.map((c, i) => ({ c, k: rng.next(), right: i === 0 }));
  order.sort((a, b) => a.k - b.k);
  return { choices: order.map(o => o.c), answer: order.findIndex(o => o.right) };
}
