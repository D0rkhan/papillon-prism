import { useCallback, useEffect, useState } from "react";

import { getManager } from "@/services/shared";
import type { Period } from "@/services/shared/grade";
import { Capabilities } from "@/services/shared/types";
import { periodRole } from "@/utils/bac/fromPapillon";

import { useGradesData } from "./useGradesData";
import { usePeriodsData } from "./usePeriodsData";

/**
 * The period worth showing. Right after a new trimester starts it has no grade yet:
 * until the user picks a period themselves, show the previous trimester instead of an
 * empty screen. Returns the periods data plus the grades of the displayed period.
 */
export function useDisplayPeriod() {
  const periodsData = usePeriodsData();
  const [override, setOverride] = useState<Period | undefined>(undefined);
  const [handled, setHandled] = useState<string | null>(null);

  const period = override ?? periodsData.currentPeriod;
  const grades = useGradesData(period);
  const isFallback = !!override;

  useEffect(() => {
    const current = periodsData.currentPeriod;
    if (!current || override || grades.loading || grades.grades.length > 0 || handled === current.name) { return; }
    // An empty answer from the cache (app just opened, not synced yet) proves
    // nothing: only a live answer may send the screen back a trimester.
    if (!getManager(true)?.isLive(Capabilities.GRADES)) { return; }
    const regular = periodsData.periods
      .filter(p => periodRole(p.name) === "regular")
      .sort((a, b) => a.start.getTime() - b.start.getTime());
    const index = regular.findIndex(p => p.name === current.name);
    setHandled(current.name);
    if (index > 0) { setOverride(regular[index - 1]); }
  }, [periodsData.currentPeriod, periodsData.periods, override, grades.loading, grades.grades.length, handled]);

  const setCurrentPeriod = useCallback((p: Period) => {
    setOverride(undefined);
    setHandled(p.name);
    periodsData.setCurrentPeriod(p);
  }, [periodsData]);

  return { ...periodsData, currentPeriod: period, setCurrentPeriod, grades, isFallback };
}
