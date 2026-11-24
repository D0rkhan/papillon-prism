/** "8.6.10" > "8.6.9" (numeric, segment by segment; any "prism-v" prefix ignored). */
export function isNewer(candidate: string, current: string): boolean {
  const a = candidate.replace(/^[^\d]*/, "").split(".").map(n => parseInt(n, 10) || 0);
  const b = current.replace(/^[^\d]*/, "").split(".").map(n => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if ((a[i] ?? 0) !== (b[i] ?? 0)) { return (a[i] ?? 0) > (b[i] ?? 0); }
  }
  return false;
}
