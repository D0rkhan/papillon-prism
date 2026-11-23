/**
 * Synthetic Première student (maths / physique-chimie / SVT, anglais / espagnol) used by
 * the demo preview, so the EPFL screen can be explored without a school account.
 */
import { createNormal, createRng } from "@/core/bac/math";
import type { BacGrade, CanonicalSubject } from "@/core/bac/types";

import type { ConvertedPeriod } from "./fromPapillon";

const LEVELS: Partial<Record<CanonicalSubject, number>> = {
  maths: 16.4,
  physique_chimie: 15.6,
  svt: 15.2,
  francais: 13.8,
  histoire_geo: 14.6,
  anglais: 16.2,
  espagnol: 14.1,
  ens_scientifique: 15.4,
  emc: 16,
  eps: 15,
};

export function demoPeriods(now = new Date()): ConvertedPeriod[] {
  const y = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
  const T = [
    { id: "demo-T1", name: "Trimestre 1", start: new Date(y, 8, 1), end: new Date(y, 10, 30) },
    { id: "demo-T2", name: "Trimestre 2", start: new Date(y, 11, 1), end: new Date(y + 1, 2, 10) },
    { id: "demo-T3", name: "Trimestre 3", start: new Date(y + 1, 2, 11), end: new Date(y + 1, 5, 30) },
  ];
  const z = createNormal(createRng(42));
  const periods: ConvertedPeriod[] = T.map(p => ({ role: "regular", period: { ...p, year: "premiere" }, grades: [], official: [] }));

  for (const [subject, level] of Object.entries(LEVELS) as [CanonicalSubject, number][]) {
    for (let i = 0; i < 7; i++) {
      const date = new Date(T[0].start.getTime() + (i + 0.5) * 11 * 24 * 3600 * 1000);
      if (date > now) { continue; }
      const p = periods.find(pp => pp.period && date >= pp.period.start && date <= pp.period.end) ?? periods[0];
      const classAverage = 11 + 1.6 * z();
      const outOf = i % 3 === 2 ? 10 : 20;
      const on20 = Math.min(20, Math.max(0, level + 0.15 * i + 0.4 * (classAverage - 11) + 1.9 * z()));
      const g: BacGrade = {
        id: `demo-${subject}-${i}`,
        subject,
        value: Math.round((on20 / 20) * outOf * 4) / 4,
        outOf,
        coefficient: i % 2 ? 2 : 1,
        date,
        periodId: p.period?.id ?? "demo-T1",
        classAverage: (classAverage / 20) * outOf,
        kind: i % 3 === 2 ? "interro" : "ds",
      };
      p.grades.push(g);
    }
  }
  return periods;
}
