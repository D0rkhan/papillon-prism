/** Small numeric toolkit: seeded PRNG, normal draws, Gaussian CDF/PDF, quantiles. */

/** Mulberry32: fast, seedable, good enough for Monte-Carlo. */
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal sampler (Box–Muller with the spare value cached). */
export function createNormal(rng: () => number): () => number {
  let spare: number | null = null;
  return () => {
    if (spare !== null) {
      const s = spare;
      spare = null;
      return s;
    }
    let u = 0;
    while (u <= Number.EPSILON) { u = rng(); }
    const v = rng();
    const r = Math.sqrt(-2 * Math.log(u));
    spare = r * Math.sin(2 * Math.PI * v);
    return r * Math.cos(2 * Math.PI * v);
  };
}

/** erf, Abramowitz–Stegun 7.1.26 (|error| < 1.5e-7). */
export function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}

export const normalCdf = (z: number): number => 0.5 * (1 + erf(z / Math.SQRT2));
export const normalPdf = (z: number): number => Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);

/** Quantile of an already sorted array (linear interpolation). */
export function quantileSorted(sorted: ArrayLike<number>, q: number): number {
  const n = sorted.length;
  if (n === 0) { return NaN; }
  const pos = (n - 1) * Math.min(1, Math.max(0, q));
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

export const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

export const YEAR_MS = 365.25 * 24 * 3600 * 1000;

/** Years between two dates (b - a). */
export const yearsBetween = (a: Date, b: Date): number => (b.getTime() - a.getTime()) / YEAR_MS;

/**
 * Damped time horizon: a trend observed over a few months must not be extrapolated
 * linearly over two years. h·(1 − e^(−t/h)) ≈ t for small t and saturates at h.
 */
export const dampedHorizon = (t: number, h = 0.5): number =>
  t <= 0 ? t : h * (1 - Math.exp(-t / h));
