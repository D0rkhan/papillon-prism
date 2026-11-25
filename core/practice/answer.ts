/**
 * Reads what a student types as a number, the way it is written in French
 * classes: "3,5", "−2", "1/2", "3,2e-5", "3,2×10^-5", "3,2·10⁻⁵", "2 400".
 */
import type { Exercise } from "./types";

const SUPERSCRIPT = "⁰¹²³⁴⁵⁶⁷⁸⁹";

export function parseNumber(raw: string): number | null {
  let s = raw.trim().toLowerCase();
  if (!s) { return null; }
  s = s
    .replace(/⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, m => (m.startsWith("⁻") ? "^-" : "^") + [...m.replace("⁻", "")].map(c => String(SUPERSCRIPT.indexOf(c))).join(""))
    .replace(/[−–—]/g, "-")
    .replace(/[\s  ]/g, "")
    .replace(/,/g, ".")
    .replace(/[×x·*]/g, "*")
    .replace(/\^+/g, "^");

  let m = /^([+-]?\d*\.?\d+)\*10\^([+-]?\d+)$/.exec(s);
  if (m) { return Number(m[1]) * 10 ** Number(m[2]); }
  m = /^([+-]?\d*\.?\d+)e([+-]?\d+)$/.exec(s);
  if (m) { return Number(m[1]) * 10 ** Number(m[2]); }
  m = /^10\^([+-]?\d+)$/.exec(s);
  if (m) { return 10 ** Number(m[1]); }
  m = /^([+-]?\d*\.?\d+)\/([+-]?\d*\.?\d+)$/.exec(s);
  if (m) {
    const den = Number(m[2]);
    return den === 0 ? null : Number(m[1]) / den;
  }
  if (/^[+-]?\d*\.?\d+$/.test(s)) { return Number(s); }
  return null;
}

export type Verdict = "correct" | "wrong" | "invalid";

export function checkAnswer(ex: Exercise, input: string | number): Verdict {
  if (ex.kind === "choice") {
    return typeof input === "number" ? (input === ex.answer ? "correct" : "wrong") : "invalid";
  }
  const value = typeof input === "number" ? input : parseNumber(input);
  if (value === null || !Number.isFinite(value)) { return "invalid"; }
  const rel = ex.tolerance?.rel ?? 0;
  const abs = ex.tolerance?.abs ?? 1e-9;
  const err = Math.abs(value - ex.answer);
  return err <= abs || err <= rel * Math.abs(ex.answer) ? "correct" : "wrong";
}
