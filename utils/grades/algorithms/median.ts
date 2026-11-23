import { Grade } from "@/services/shared/grade";

import { getMedianOn20 } from "./helpers";

/** Median of every grade brought back to /20 (bonus grades excluded). −1 when empty. */
const PapillonMedian = (grades: Grade[]): number => getMedianOn20(grades);

export default PapillonMedian;
