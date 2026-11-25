import { useCallback, useEffect, useRef, useState } from "react";

import { backtest, CalibrationReport } from "@/core/bac/calibration";
import { EngineInput, EngineResult, analyze } from "@/core/bac/engine";
import { leverage, NextGradeTarget, requiredNextGrade, Scenario, scenarios, SubjectLeverage } from "@/core/bac/optimizer";
import { epflCriteria, isEpflEligibleProfile } from "@/core/bac/rules";
import type { BacGrade, BacPeriod, CanonicalSubject, OfficialAverage } from "@/core/bac/types";
import { useManagerSubscription } from "@/hooks/useManagerSubscription";
import type { AccountManager } from "@/services/shared";
import { getManager } from "@/services/shared";
import { useBacStore } from "@/stores/bac";
import { demoPeriods } from "@/utils/bac/demo";
import { ConvertedPeriod, convertPeriod, fromSnapshot, schoolYearKey, toSnapshot } from "@/utils/bac/fromPapillon";
import { warn } from "@/utils/logger/logger";

export interface BacAnalysis {
  result: EngineResult;
  /** Raw Monte-Carlo draws of the final grade, for the distribution chart. */
  draws: Float64Array;
  leverage: SubjectLeverage[];
  scenarios: Scenario[];
  calibration: CalibrationReport;
  gradesCount: number;
  eligibleProfile: boolean;
}

/** Lets the UI paint between heavy steps (Monte-Carlo runs). */
const nextFrame = () => new Promise<void>(resolve => setTimeout(resolve, 16));

/**
 * Gathers every grade of every period (current school year + archived years), runs the
 * bac / EPFL engine and the decision tools. Heavy work is split in steps with a frame
 * in between, so the screen stays responsive on a phone.
 */
export function useBacAnalysis(options: { demo?: boolean; lite?: boolean; inputOnly?: boolean } = {}) {
  const demo = options.demo ?? false;
  // Lite: projection only (home widget) — no levers, scenarios or backtest.
  const lite = options.lite ?? false;
  // Input only: the grades and periods, no simulation at all (revision weights, targets).
  const inputOnly = options.inputOnly ?? false;
  const profile = useBacStore(s => s.profile);
  const examResults = useBacStore(s => s.examResults);
  const competitive = useBacStore(s => s.competitive);
  const kindOverrides = useBacStore(s => s.kindOverrides);
  const archive = useBacStore(s => s.archive);
  const saveSnapshot = useBacStore(s => s.saveSnapshot);

  const [current, setCurrent] = useState<ConvertedPeriod[] | null>(null);
  const [analysis, setAnalysis] = useState<BacAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [computing, setComputing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [targets, setTargets] = useState<Partial<Record<CanonicalSubject, NextGradeTarget | "computing">>>({});
  const inputRef = useRef<EngineInput | null>(null);
  /** The engine input of the last analysis (for the target planners). */
  const [input, setInput] = useState<EngineInput | null>(null);
  const runId = useRef(0);

  const fetchAll = useCallback(async (manager: AccountManager) => {
    setLoading(true);
    setError(null);
    try {
      const now = new Date();
      const periods = await manager.getGradesPeriods();
      const converted: ConvertedPeriod[] = [];
      for (const period of periods) {
        try {
          const data = period.start > now ? undefined : await manager.getGradesForPeriod(period, period.createdByAccount);
          converted.push(convertPeriod(period, data, profile.currentYear, now, kindOverrides));
        } catch (e) {
          warn(`Bac: period ${period.name} unavailable: ${String(e)}`, "useBacAnalysis");
          converted.push(convertPeriod(period, undefined, profile.currentYear, now, kindOverrides));
        }
      }
      setCurrent(converted);
      const regular = converted.find(c => c.period)?.period;
      if (regular) {
        saveSnapshot(toSnapshot(schoolYearKey(regular.start), profile.currentYear, converted, now));
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, [profile.currentYear, kindOverrides, saveSnapshot]);

  useManagerSubscription(
    useCallback((m: AccountManager) => { if (!demo) { fetchAll(m); } }, [fetchAll, demo]),
    useCallback(() => { if (!demo) { setLoading(false); setError(new Error("Compte indisponible")); } }, [demo])
  );

  // Demo: a synthetic Première student, no account needed.
  useEffect(() => {
    if (!demo) { return; }
    setCurrent(demoPeriods());
    setLoading(false);
  }, [demo]);

  const refresh = useCallback(async () => {
    if (demo) { setCurrent(demoPeriods()); return; }
    const m = getManager();
    if (m) { await fetchAll(m); }
  }, [fetchAll, demo]);

  // Assemble the engine input: archived years (other than the current one) + live data.
  useEffect(() => {
    if (!current) { return; }
    const id = ++runId.current;
    const now = new Date();
    const currentKey = (() => {
      const p = current.find(c => c.period)?.period;
      return p ? schoolYearKey(p.start) : schoolYearKey(now);
    })();

    const periods: BacPeriod[] = [];
    const grades: BacGrade[] = [];
    const official: OfficialAverage[] = [];
    for (const snap of demo ? [] : Object.values(archive)) {
      if (snap.key === currentKey) { continue; }
      const s = fromSnapshot(snap);
      periods.push(...s.periods);
      grades.push(...s.grades);
      official.push(...s.official);
    }
    for (const c of current) {
      if (c.period) { periods.push(c.period); }
      grades.push(...c.grades);
      official.push(...c.official);
    }

    const criteria = { ...epflCriteria(profile), competitiveThreshold: competitive };
    const input: EngineInput = { profile, grades, periods, officialAverages: official, examResults, now, criteria };
    inputRef.current = input;
    setInput(input);
    if (inputOnly) { return; }

    (async () => {
      setComputing(true);
      setTargets({});
      try {
        await nextFrame();
        const { prepared, result, output } = analyze(lite ? { ...input, settings: { simulations: 8000 } } : input);
        if (id !== runId.current) { return; }
        setAnalysis(prev => ({
          result,
          draws: output.overall,
          leverage: prev?.leverage ?? [],
          scenarios: prev?.scenarios ?? [],
          calibration: prev?.calibration ?? backtest([]),
          gradesCount: grades.length,
          eligibleProfile: isEpflEligibleProfile(profile),
        }));
        if (lite) { return; }
        await nextFrame();
        const lev = leverage(prepared, 1, 4000);
        await nextFrame();
        const sc = scenarios(prepared, 4000);
        await nextFrame();
        const cal = backtest(grades);
        if (id !== runId.current) { return; }
        setAnalysis({ result, draws: output.overall, leverage: lev, scenarios: sc, calibration: cal, gradesCount: grades.length, eligibleProfile: isEpflEligibleProfile(profile) });
      } catch (e) {
        warn(String(e), "useBacAnalysis");
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        if (id === runId.current) { setComputing(false); }
      }
    })();
  }, [current, archive, profile, examResults, competitive, demo, lite, inputOnly]);

  const targetDelta = useBacStore(s => s.targetDelta);
  const currentAdmissible = analysis?.result.probabilities.admissible ?? 0;

  /** On demand: minimum grade on the next assessment of a subject. */
  const computeTarget = useCallback(async (subject: CanonicalSubject) => {
    const input = inputRef.current;
    if (!input) { return; }
    setTargets(t => ({ ...t, [subject]: "computing" }));
    await nextFrame();
    const goal = Math.min(0.995, Math.max(0.005, currentAdmissible + targetDelta));
    const target = requiredNextGrade(input, subject, goal, "admissible", 4000);
    setTargets(t => ({ ...t, [subject]: target }));
  }, [targetDelta, currentAdmissible]);

  return { analysis, input, loading, computing, error, refresh, targets, computeTarget };
}
