/**
 * Monte-Carlo projection of the final bac grade and of the EPFL criteria.
 *
 * For every simulation:
 *  1. each subject's (level, trend) is drawn from its posterior (parameter uncertainty);
 *  2. each contrôle continu component = mean of the period averages of its school year
 *     (that is what the livret scolaire holds). A period average mixes the grades already
 *     known (fixed) with the grades still to come (level at mid-remaining-period + noise
 *     shrinking with the expected number of grades). Official report-card averages, when
 *     present, replace the computation. No report card is needed: the grades are enough.
 *  3. each exam = level at exam date + exam bias (calibrated on mock exams) + a shock
 *     shared by every exam of the same session (a good or bad June) + individual noise;
 *  4. the final grade = Σ coef × grade / Σ coef.
 * The same seed is reused across scenarios (common random numbers), so differences
 * between scenarios are not drowned in simulation noise.
 */
import { clamp, createNormal, createRng, quantileSorted } from "./math";
import {
  DEFAULT_MODEL_SETTINGS,
  examBiasFromMocks,
  featureAt,
  fitSubject,
  ModelSettings,
  pooledLevel,
  predictLevel,
  SubjectFit,
  toDataPoints,
} from "./model";
import { AveragingMode, subjectAverageDetailed } from "./normalize";
import { buildBacComponents, epflCriteria, RULES_VERSION, schoolYearBounds } from "./rules";
import type {
  BacComponent,
  BacGrade,
  BacPeriod,
  BacProfile,
  CanonicalSubject,
  EpflCriteria,
  OfficialAverage,
  SchoolYear,
} from "./types";

export interface EngineSettings {
  simulations: number;
  seed: number;
  examNoiseSd: number;
  examDayShockSd: number;
  examBiasPriorSd: number;
  grandOralNoiseSd: number;
  philoOffset: number;
  philoExtraSd: number;
  defaultGradesPerPeriod: number;
  averaging: AveragingMode;
  model: ModelSettings;
}

export const DEFAULT_ENGINE_SETTINGS: EngineSettings = {
  simulations: 20000,
  seed: 20280617,
  examNoiseSd: 1.8,
  examDayShockSd: 0.7,
  examBiasPriorSd: 1.0,
  grandOralNoiseSd: 2.2,
  philoOffset: -1.0,
  philoExtraSd: 1.5,
  defaultGradesPerPeriod: 4,
  averaging: "normalized",
  model: DEFAULT_MODEL_SETTINGS,
};

export interface EngineInput {
  profile: BacProfile;
  grades: readonly BacGrade[];
  periods: readonly BacPeriod[];
  officialAverages?: readonly OfficialAverage[];
  /** Results already known (e.g. French written exam), by component id. */
  examResults?: Readonly<Record<string, number>>;
  now: Date;
  criteria?: EpflCriteria;
  settings?: Partial<EngineSettings>;
}

interface PeriodPart {
  fixed: number | null;
  obsAvg: number | null;
  obsWeight: number;
  futureCount: number;
  futureWeight: number;
  futureDate: Date;
}

interface PreparedComponent {
  component: BacComponent;
  fixed: number | null;
  parts: PeriodPart[];
  fallbackDate: Date;
  examBias: { mean: number; sd: number; n: number } | null;
  finalized: boolean;
}

export interface Prepared {
  input: EngineInput;
  settings: EngineSettings;
  criteria: EpflCriteria;
  components: PreparedComponent[];
  fits: Map<CanonicalSubject, SubjectFit>;
  totalCoefficient: number;
  pooled: number;
}

const DAY = 24 * 3600 * 1000;

function synthesizePeriods(profile: BacProfile, year: SchoolYear): BacPeriod[] {
  const { start } = schoolYearBounds(profile, year);
  const end = new Date(Date.UTC(start.getUTCFullYear() + 1, 5, 30));
  const span = (end.getTime() - start.getTime()) / 3;
  return [0, 1, 2].map(i => ({
    id: `synthetic:${year}:${i + 1}`,
    name: `Trimestre ${i + 1}`,
    start: new Date(start.getTime() + i * span),
    end: new Date(start.getTime() + (i + 1) * span),
    year,
  }));
}

const median = (values: number[]): number | null => {
  if (!values.length) { return null; }
  const s = [...values].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const countable = (g: BacGrade) =>
  typeof g.value === "number" && g.value >= 0 && g.outOf > 0 && g.coefficient > 0 && !g.bonus;

export function prepare(input: EngineInput): Prepared {
  const settings: EngineSettings = {
    ...DEFAULT_ENGINE_SETTINGS,
    ...input.settings,
    model: { ...DEFAULT_MODEL_SETTINGS, ...input.settings?.model },
  };
  const { profile, now } = input;
  const criteria = input.criteria ?? epflCriteria(profile);
  const components = buildBacComponents(profile);
  const pooled = pooledLevel(input.grades);

  // Fit every subject that drives a component, plus the proxies used by composites.
  const needed = new Set<CanonicalSubject>(["francais", "histoire_geo", ...profile.keptSpecialties]);
  for (const c of components) { if (c.subject) { needed.add(c.subject); } }
  const fits = new Map<CanonicalSubject, SubjectFit>();
  for (const subject of needed) {
    const points = toDataPoints(input.grades.filter(g => g.subject === subject), now, settings.model);
    fits.set(subject, fitSubject(subject, points, pooled, now, settings.model));
  }

  const knownPeriodIds = new Set(input.periods.map(p => p.id));
  const periodsOf = (year: SchoolYear): BacPeriod[] => {
    const real = input.periods.filter(p => p.year === year).sort((a, b) => a.start.getTime() - b.start.getTime());
    return real.length ? real : synthesizePeriods(profile, year);
  };
  const gradesIn = (subject: CanonicalSubject, p: BacPeriod) =>
    input.grades.filter(
      g =>
        g.subject === subject &&
        (g.periodId === p.id ||
          (!knownPeriodIds.has(g.periodId) && g.date >= p.start && g.date <= p.end))
    );

  // Expected number of grades in a full period, per subject.
  const expectedCount = (subject: CanonicalSubject): number => {
    const closed: number[] = [];
    let current: number | null = null;
    for (const p of input.periods) {
      const n = gradesIn(subject, p).filter(countable).length;
      if (p.end < now) {
        if (n > 0) { closed.push(n); }
      } else if (p.start <= now) {
        const elapsed = (now.getTime() - p.start.getTime()) / (p.end.getTime() - p.start.getTime());
        if (elapsed >= 0.2 && n > 0) { current = n / elapsed; }
      }
    }
    const est = median(closed) ?? current ?? settings.defaultGradesPerPeriod;
    return clamp(est, 1, 15);
  };

  const meanCoefficient = (subject: CanonicalSubject): number => {
    const cs = input.grades.filter(g => g.subject === subject && countable(g)).map(g => g.coefficient);
    return cs.length ? cs.reduce((s, c) => s + c, 0) / cs.length : 1;
  };

  const prepared: PreparedComponent[] = components.map(component => {
    const known = input.examResults?.[component.id];
    if (typeof known === "number") {
      return { component, fixed: known, parts: [], fallbackDate: new Date(component.date), examBias: null, finalized: true };
    }

    if (component.block === "exam") {
      const fit = component.subject ? fits.get(component.subject) : undefined;
      const examBias = fit
        ? examBiasFromMocks(fit, input.grades.filter(g => g.subject === component.subject), settings.examNoiseSd, settings.examBiasPriorSd)
        : null;
      return { component, fixed: null, parts: [], fallbackDate: new Date(component.date), examBias, finalized: false };
    }

    const subject = component.subject as CanonicalSubject;
    const perPeriod = expectedCount(subject);
    const coef = meanCoefficient(subject);
    const parts: PeriodPart[] = periodsOf(component.year).map(p => {
      const official = input.officialAverages?.find(o => o.periodId === p.id && o.subject === subject);
      if (official) {
        return { fixed: official.value, obsAvg: null, obsWeight: 0, futureCount: 0, futureWeight: 0, futureDate: p.end };
      }
      const detail = subjectAverageDetailed(gradesIn(subject, p), settings.averaging);
      const span = p.end.getTime() - p.start.getTime();
      const from = Math.max(now.getTime(), p.start.getTime());
      const remaining = clamp((p.end.getTime() - from) / span, 0, 1);
      const futureCount = perPeriod * remaining;
      return {
        fixed: null,
        obsAvg: detail.average,
        obsWeight: detail.average === null ? 0 : detail.totalWeight,
        futureCount,
        futureWeight: futureCount * coef,
        futureDate: new Date((from + p.end.getTime()) / 2),
      };
    });
    const finalized = parts.every(p => p.fixed !== null || p.futureCount < 0.25) &&
      parts.some(p => p.fixed !== null || p.obsWeight > 0);
    const { end } = schoolYearBounds(profile, component.year);
    return { component, fixed: null, parts, fallbackDate: new Date(end.getTime() - 60 * DAY), examBias: null, finalized };
  });

  return {
    input,
    settings,
    criteria,
    components: prepared,
    fits,
    totalCoefficient: components.reduce((s, c) => s + c.coefficient, 0),
    pooled,
  };
}

export interface RunOptions {
  simulations?: number;
  /** Ability shift (points /20) applied from now on, per subject. */
  shifts?: Partial<Record<CanonicalSubject, number>>;
}

export interface RunOutput {
  n: number;
  overall: Float64Array;
  values: Float64Array[];
  threshold: Float64Array;
}

export function run(p: Prepared, opts: RunOptions = {}): RunOutput {
  const n = opts.simulations ?? p.settings.simulations;
  const z = createNormal(createRng(p.settings.seed));
  const s = p.settings;

  // ---- Everything that does not change between draws is computed once. ----
  const subjects = [...p.fits.keys()];
  const S = subjects.length;
  const idx = new Map(subjects.map((sub, i) => [sub, i]));
  const m0 = new Float64Array(S), m1 = new Float64Array(S);
  const l00 = new Float64Array(S), l10 = new Float64Array(S), l11 = new Float64Array(S);
  const shift = new Float64Array(S);
  subjects.forEach((sub, i) => {
    const f = p.fits.get(sub) as SubjectFit;
    m0[i] = f.mean[0];
    m1[i] = f.mean[1];
    l00[i] = Math.sqrt(Math.max(f.cov[0][0], 0));
    l10[i] = l00[i] > 0 ? f.cov[0][1] / l00[i] : 0;
    l11[i] = Math.sqrt(Math.max(f.cov[1][1] - l10[i] * l10[i], 0));
    shift[i] = opts.shifts?.[sub] ?? 0;
  });
  const xAt = (date: Date): number => {
    const f = p.fits.values().next().value as SubjectFit;
    return featureAt(f, (date.getTime() - f.refDate.getTime()) / (365.25 * DAY))[1];
  };
  const sigmaOf = (sub: CanonicalSubject) => p.fits.get(sub)?.sigma ?? s.model.noisePriorSd;
  const [spe1, spe2] = p.input.profile.keptSpecialties;
  const philoHasGrades = (p.fits.get("philosophie")?.n ?? 0) > 0;

  type Plan =
    | { kind: "fixed"; value: number }
    | { kind: "cc"; sub: number; parts: { fixed: number | null; obs: number; obsW: number; futW: number; futSd: number; x: number }[]; fbX: number; fbSd: number }
    | { kind: "exam"; mode: "single" | "grandOral" | "philoProxy"; sub: number; x: number; shock: 0 | 1; noise: number; biasMean: number; biasSd: number; extraShift: number };

  const plans: Plan[] = p.components.map(pc => {
    const comp = pc.component;
    if (pc.fixed !== null) { return { kind: "fixed", value: pc.fixed }; }
    if (comp.block === "cc") {
      const sub = comp.subject as CanonicalSubject;
      const sigma = sigmaOf(sub);
      return {
        kind: "cc",
        sub: idx.get(sub) ?? -1,
        parts: pc.parts
          .filter(pt => pt.fixed !== null || (pt.obsAvg !== null && pt.obsWeight > 0) || pt.futureCount >= 0.25)
          .map(pt => ({
            fixed: pt.fixed,
            obs: pt.obsAvg ?? 0,
            obsW: pt.obsAvg !== null ? pt.obsWeight : 0,
            futW: pt.futureCount >= 0.25 ? pt.futureWeight : 0,
            futSd: sigma / Math.sqrt(Math.max(1, pt.futureCount)),
            x: xAt(pt.futureDate),
          })),
        fbX: xAt(pc.fallbackDate),
        fbSd: sigma / Math.sqrt(6),
      };
    }
    const date = new Date(comp.date);
    const bias = pc.examBias ?? { mean: 0, sd: s.examBiasPriorSd };
    const base = { kind: "exam" as const, x: xAt(date), shock: (comp.year === "premiere" ? 0 : 1) as 0 | 1, biasMean: bias.mean, biasSd: bias.sd };
    if (comp.id === "exam:grand_oral") {
      return { ...base, mode: "grandOral", sub: -1, noise: s.grandOralNoiseSd, extraShift: 0 };
    }
    if (comp.subject === "philosophie" && !philoHasGrades) {
      return {
        ...base,
        mode: "philoProxy",
        sub: -1,
        noise: Math.sqrt(s.examNoiseSd ** 2 + s.philoExtraSd ** 2),
        extraShift: s.philoOffset + (opts.shifts?.philosophie ?? 0),
      };
    }
    return { ...base, mode: "single", sub: idx.get(comp.subject as CanonicalSubject) ?? -1, noise: s.examNoiseSd, extraShift: 0 };
  });

  const iSpe1 = idx.get(spe1) ?? -1, iSpe2 = idx.get(spe2) ?? -1;
  const iFr = idx.get("francais") ?? -1, iHg = idx.get("histoire_geo") ?? -1;
  const coefs = p.components.map(pc => pc.component.coefficient);
  const ct = p.criteria.competitiveThreshold;

  const b0 = new Float64Array(S), b1 = new Float64Array(S);
  const level = (i: number, x: number) => (i < 0 ? p.pooled : b0[i] + b1[i] * x + shift[i]);

  const values = p.components.map(() => new Float64Array(n));
  const overall = new Float64Array(n);
  const threshold = new Float64Array(n);
  const shocks = [0, 0];

  // ---- Draws. ----
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < S; i++) {
      const z0 = z();
      const z1 = z();
      b0[i] = m0[i] + l00[i] * z0;
      b1[i] = m1[i] + l10[i] * z0 + l11[i] * z1;
    }
    shocks[0] = s.examDayShockSd * z();
    shocks[1] = s.examDayShockSd * z();

    let total = 0;
    for (let c = 0; c < plans.length; c++) {
      const plan = plans[c];
      let v: number;
      if (plan.kind === "fixed") {
        v = plan.value;
      } else if (plan.kind === "cc") {
        if (plan.parts.length === 0) {
          v = level(plan.sub, plan.fbX) + plan.fbSd * z();
        } else {
          let sum = 0;
          for (const pt of plan.parts) {
            if (pt.fixed !== null) { sum += pt.fixed; continue; }
            let num = pt.obs * pt.obsW;
            let den = pt.obsW;
            if (pt.futW > 0) {
              num += (level(plan.sub, pt.x) + pt.futSd * z()) * pt.futW;
              den += pt.futW;
            }
            sum += clamp(num / den, 0, 20);
          }
          v = sum / plan.parts.length;
        }
      } else {
        let base: number;
        if (plan.mode === "grandOral") { base = (level(iSpe1, plan.x) + level(iSpe2, plan.x)) / 2; }
        else if (plan.mode === "philoProxy") { base = (level(iFr, plan.x) + level(iHg, plan.x)) / 2; }
        else { base = level(plan.sub, plan.x); }
        v = base + plan.extraShift + plan.biasMean + plan.biasSd * z() + shocks[plan.shock] + plan.noise * z();
      }
      v = clamp(v, 0, 20);
      values[c][k] = v;
      total += v * coefs[c];
    }
    overall[k] = total / p.totalCoefficient;

    // Competitive bar: truncated normal above the legal minimum.
    let t = ct.mean + ct.sd * z();
    for (let tries = 0; t < p.criteria.minOverall && tries < 8; tries++) { t = ct.mean + ct.sd * z(); }
    threshold[k] = Math.max(t, p.criteria.minOverall);
  }

  return { n, overall, values, threshold };
}

export interface Distribution {
  mean: number;
  sd: number;
  q05: number;
  q10: number;
  q25: number;
  q50: number;
  q75: number;
  q90: number;
  q95: number;
}

export function describe(values: Float64Array): Distribution {
  const sorted = Float64Array.from(values).sort();
  let sum = 0;
  for (const v of sorted) { sum += v; }
  const mean = sum / sorted.length;
  let ss = 0;
  for (const v of sorted) { ss += (v - mean) ** 2; }
  return {
    mean,
    sd: Math.sqrt(ss / Math.max(1, sorted.length - 1)),
    q05: quantileSorted(sorted, 0.05),
    q10: quantileSorted(sorted, 0.1),
    q25: quantileSorted(sorted, 0.25),
    q50: quantileSorted(sorted, 0.5),
    q75: quantileSorted(sorted, 0.75),
    q90: quantileSorted(sorted, 0.9),
    q95: quantileSorted(sorted, 0.95),
  };
}

export interface Probabilities {
  overallAtLeastMin: number;
  subjectMinimums: { componentId: string; label: string; min: number; probability: number }[];
  /** Every legal EPFL criterion met. */
  admissible: number;
  /** Admissible and above the (uncertain) competitive bar. */
  competitive: number;
  mentions: { assezBien: number; bien: number; tresBien: number; felicitations: number };
}

export function probabilities(p: Prepared, out: RunOutput): Probabilities {
  const idx = p.criteria.subjectMinimums.map(sm => p.components.findIndex(c => c.component.id === sm.componentId));
  const counts = new Array(idx.length).fill(0);
  let overallOk = 0;
  let admissible = 0;
  let competitive = 0;
  const m = { assezBien: 0, bien: 0, tresBien: 0, felicitations: 0 };

  for (let k = 0; k < out.n; k++) {
    const o = out.overall[k];
    const okOverall = o >= p.criteria.minOverall;
    if (okOverall) { overallOk++; }
    let okSubjects = true;
    for (let j = 0; j < idx.length; j++) {
      const ok = idx[j] >= 0 && out.values[idx[j]][k] >= p.criteria.subjectMinimums[j].min;
      if (ok) { counts[j]++; } else { okSubjects = false; }
    }
    if (okOverall && okSubjects) {
      admissible++;
      if (o >= out.threshold[k]) { competitive++; }
    }
    if (o >= 12) { m.assezBien++; }
    if (o >= 14) { m.bien++; }
    if (o >= 16) { m.tresBien++; }
    if (o >= 18) { m.felicitations++; }
  }

  const n = out.n;
  return {
    overallAtLeastMin: overallOk / n,
    subjectMinimums: p.criteria.subjectMinimums.map((sm, j) => ({ ...sm, probability: counts[j] / n })),
    admissible: admissible / n,
    competitive: competitive / n,
    mentions: {
      assezBien: m.assezBien / n,
      bien: m.bien / n,
      tresBien: m.tresBien / n,
      felicitations: m.felicitations / n,
    },
  };
}

export interface ComponentResult extends Distribution {
  id: string;
  label: string;
  block: BacComponent["block"];
  year: SchoolYear;
  coefficient: number;
  finalized: boolean;
  /** Share of the final grade (coefficient / total). */
  weight: number;
}

export interface SubjectSummary {
  subject: CanonicalSubject;
  grades: number;
  levelNow: number;
  levelNowSd: number;
  /** Trend, points /20 per year (posterior mean). */
  trendPerYear: number;
  /** Typical spread of one grade around the level. */
  spread: number;
}

export interface EngineResult {
  overall: Distribution;
  probabilities: Probabilities;
  components: ComponentResult[];
  subjects: SubjectSummary[];
  meta: { simulations: number; seed: number; rulesVersion: string; generatedAt: string };
}

export function analyze(input: EngineInput): { prepared: Prepared; result: EngineResult; output: RunOutput } {
  const prepared = prepare(input);
  const output = run(prepared);
  const result: EngineResult = {
    overall: describe(output.overall),
    probabilities: probabilities(prepared, output),
    components: prepared.components.map((pc, i) => ({
      ...describe(output.values[i]),
      id: pc.component.id,
      label: pc.component.label,
      block: pc.component.block,
      year: pc.component.year,
      coefficient: pc.component.coefficient,
      finalized: pc.finalized || pc.fixed !== null,
      weight: pc.component.coefficient / prepared.totalCoefficient,
    })),
    subjects: [...prepared.fits.values()].map(f => {
      const lvl = predictLevel(f, input.now);
      return {
        subject: f.subject,
        grades: f.n,
        levelNow: lvl.mean,
        levelNowSd: lvl.sd,
        trendPerYear: f.mean[1],
        spread: f.sigma,
      };
    }),
    meta: {
      simulations: output.n,
      seed: prepared.settings.seed,
      rulesVersion: RULES_VERSION,
      generatedAt: input.now.toISOString(),
    },
  };
  return { prepared, result, output };
}
