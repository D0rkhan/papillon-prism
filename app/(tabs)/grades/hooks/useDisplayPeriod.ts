import { useCallback, useEffect, useState } from "react";

import type { Period } from "@/services/shared/grade";
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
