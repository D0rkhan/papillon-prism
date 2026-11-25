/** Splits an Anki/Quizlet text export into cards. */
export function parseCardText(text: string): { front: string; back: string }[] {
  return text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"))
    .map(line => {
      const parts = line.includes("\t") ? line.split("\t") : line.split(/\s*;\s*|\s+[-–]\s+|\s*::\s*/);
      return { front: (parts[0] ?? "").trim(), back: parts.slice(1).join(" ; ").trim() };
    })
    .filter(c => c.front && c.back);
}
