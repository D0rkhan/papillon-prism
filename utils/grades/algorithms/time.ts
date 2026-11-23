import { Grade } from "@/services/shared/grade";

import { ScoreProperty } from "./helpers";

/** Running average after each grade, in chronological order. Does not mutate its input. */
const PapillonGradesAveragesOverTime = (
  algorithm: (grades: Grade[], key: ScoreProperty) => number,
  grades: Grade[],
  key: ScoreProperty = "studentScore"
) => {
  const time = (g: Grade) => (g.givenAt ? new Date(g.givenAt).getTime() : 0) || 0;
  const sorted = [...grades].sort((a, b) => time(a) - time(b));
  const averages: { date: Date; average: number }[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const average = algorithm(sorted.slice(0, i + 1), key);
    // −1: nothing countable yet (only non-numeric or coefficient 0 grades).
    if (average >= 0) {
      averages.push({ date: sorted[i].givenAt as Date, average });
    }
  }

  return averages;
};

export default PapillonGradesAveragesOverTime;
