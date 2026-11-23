import { subjectAverage } from "@/core/bac/normalize";
import { Grade } from "@/services/shared/grade";

import { ScoreProperty, toAverageable } from "./helpers";

/** Every grade weighted by its coefficient, subjects ignored. −1 when nothing counts. */
const PapillonWeightedAvg = (grades: Grade[], key: ScoreProperty = "studentScore"): number =>
  subjectAverage(toAverageable(grades, key)) ?? -1;

export default PapillonWeightedAvg;
