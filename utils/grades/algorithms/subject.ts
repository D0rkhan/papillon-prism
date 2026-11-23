import { Grade } from "@/services/shared/grade";

import { getSubjectAverageByProperty, PapillonSubjectAvgByProperty, ScoreProperty } from "./helpers";

/** Average /20 of one subject's grades, or −1. (`_loop` kept for API compatibility.) */
export const getSubjectAverage = (
  subject: Grade[],
  _loop: boolean = false,
  key: ScoreProperty = "studentScore"
): number => getSubjectAverageByProperty(subject, key);

const PapillonSubjectAvg = (grades: Grade[], key: ScoreProperty = "studentScore"): number =>
  PapillonSubjectAvgByProperty(grades, key);

export default PapillonSubjectAvg;
