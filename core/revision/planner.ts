/**
 * "What should I revise now?"
 *
 * Every chapter gets a priority from four signals, each in [0, 1]:
 *   - memory: 1 − R, the predicted probability of having forgotten it (FSRS).
 *     A chapter never revised counts as half forgotten, more if it is recent:
 *     the first review should come within a day or two of the lesson (J0/J1);
 *   - test: a contrôle on that chapter (or on the whole subject) is coming;
 *   - due: FSRS scheduled it for today or earlier;
 *   - weight: how much the subject matters (bac coefficients still open,
 *     gap to the target average) — from 0.6 to 1.4.
 * Today's plan is then built greedily with interleaving: the same subject twice
 * in a row costs a penalty, so sessions alternate subjects.
 */
import { MemoryState, retrievability } from "./fsrs";
import { familyOf, SessionMode } from "./methods";

const DAY = 24 * 3600 * 1000;

export interface PlanSubject {
  id: string;
  name: string;
  canonical?: string;
  /** 0.6–1.4: importance (coefficients, target gap). 1 when unknown. */
  weight?: number;
}

export interface PlanChapter {
  id: string;
  subjectId: string;
  title: string;
  createdAt: number;
  memory?: MemoryState;
}

export interface PlanExam {
  id: string;
  subjectId: string;
  title: string;
  date: number;
  /** Empty: the whole subject. */
  chapterIds: string[];
}

export interface Suggestion {
  chapter: PlanChapter;
  subject: PlanSubject;
  score: number;
  mode: SessionMode;
  minutes: number;
  /** Retrievability now (0–1), null for a chapter never revised. */
  memory: number | null;
  exam?: { title: string; inDays: number };
  reasons: string[];
}

/** Urgency of a test `days` away. */
export function testUrgency(days: number): number {
  if (days < 0) { return 0; }
  if (days <= 1) { return 1; }
  if (days <= 3) { return 0.85; }
  if (days <= 7) { return 0.6; }
  if (days <= 14) { return 0.3; }
  return 0.1;
}

const daysBetween = (a: number, b: number) => Math.floor((b - a) / DAY);

export function scoreChapter(chapter: PlanChapter, subject: PlanSubject, exams: readonly PlanExam[], now: number): Suggestion {
  const r = chapter.memory ? retrievability(chapter.memory, now) : null;
  const ageDays = (now - chapter.createdAt) / DAY;
  const memoryNeed = r === null ? (ageDays <= 2 ? 0.8 : 0.55) : 1 - r;

  const relevant = exams
    .filter(e => e.subjectId === chapter.subjectId && e.date >= now - DAY / 2 && (e.chapterIds.length === 0 || e.chapterIds.includes(chapter.id)))
    .sort((a, b) => a.date - b.date)[0];
  const inDays = relevant ? Math.max(0, daysBetween(startOfDay(now), startOfDay(relevant.date))) : null;
  const urgency = inDays === null ? 0 : testUrgency(inDays);
  const due = chapter.memory && chapter.memory.due <= now ? 1 : 0;
  const weight = Math.min(1.4, Math.max(0.6, subject.weight ?? 1));

  const score = (0.45 * memoryNeed + 0.4 * urgency + 0.15 * due) * weight;

  const reasons: string[] = [];
  if (inDays !== null && relevant) { reasons.push(inDays === 0 ? "Contrôle aujourd'hui" : inDays === 1 ? "Contrôle demain" : `Contrôle dans ${inDays} j`); }
  if (r === null) { reasons.push(ageDays <= 2 ? "Cours récent : premier passage" : "Jamais révisé"); }
  else if (r < 0.85) { reasons.push(`Mémoire estimée ${Math.round(r * 100)} %`); }
  else if (due) { reasons.push("Rappel prévu aujourd'hui"); }
  if (weight >= 1.15) { reasons.push("Pèse lourd pour tes objectifs"); }

  const mode: SessionMode = inDays !== null && inDays <= 3 ? "controle" : r === null ? "decouverte" : "rappel";
  const minutes = mode === "controle" ? 40 : mode === "decouverte" ? 32 : 30;

  return {
    chapter,
    subject,
    score,
    mode,
    minutes,
    memory: r,
    exam: relevant && inDays !== null ? { title: relevant.title, inDays } : undefined,
    reasons,
  };
}

export function startOfDay(ms: number): number {
  const d = new Date(ms);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Every chapter ranked, best first. */
export function rankChapters(
  subjects: readonly PlanSubject[],
  chapters: readonly PlanChapter[],
  exams: readonly PlanExam[],
  now: number
): Suggestion[] {
  const byId = new Map(subjects.map(s => [s.id, s]));
  return chapters
    .flatMap(c => {
      const subject = byId.get(c.subjectId);
      return subject ? [scoreChapter(c, subject, exams, now)] : [];
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * Today's sessions: the best chapters within `budgetMinutes`, interleaved
 * (same subject twice in a row × 0.6, same family × 0.85).
 */
export function planToday(ranked: readonly Suggestion[], budgetMinutes = 90, maxSessions = 4): Suggestion[] {
  const pool = ranked.filter(s => s.score > 0.12);
  const plan: Suggestion[] = [];
  let used = 0;
  while (pool.length && plan.length < maxSessions) {
    const last = plan[plan.length - 1];
    let bestIndex = -1;
    let best = -Infinity;
    pool.forEach((s, i) => {
      let v = s.score;
      if (last && last.subject.id === s.subject.id) { v *= 0.6; }
      else if (last && familyOf(last.subject.canonical) === familyOf(s.subject.canonical)) { v *= 0.85; }
      if (v > best) { best = v; bestIndex = i; }
    });
    const next = pool.splice(bestIndex, 1)[0];
    if (used + next.minutes > budgetMinutes && plan.length > 0) { break; }
    plan.push(next);
    used += next.minutes;
  }
  return plan;
}

export interface ExamStep {
  date: number;
  label: string;
  mode: SessionMode;
  done: boolean;
}

/**
 * Spaced preparation for a test (the méthode des J run backwards):
 * J−7 first full pass, J−4 retrieval, J−2 mock test, J−1 light review of the
 * error log. Steps already in the past are dropped, so a test announced late
 * still gets a coherent, compressed plan.
 */
export function examPlan(examDate: number, now: number, doneDays: readonly number[] = []): ExamStep[] {
  const exam = startOfDay(examDate);
  const today = startOfDay(now);
  const steps: { offset: number; label: string; mode: SessionMode }[] = [
    { offset: 7, label: "Premier passage complet", mode: "decouverte" },
    { offset: 4, label: "Rappel : page blanche + exercices", mode: "rappel" },
    { offset: 2, label: "Épreuve blanche chronométrée", mode: "controle" },
    { offset: 1, label: "Carnet d'erreurs et cartes", mode: "express" },
  ];
  const doneSet = new Set(doneDays.map(startOfDay));
  const out = steps
    .map(s => ({ date: exam - s.offset * DAY, label: s.label, mode: s.mode }))
    .filter(s => s.date >= today || doneSet.has(s.date))
    .map(s => ({ ...s, done: doneSet.has(s.date) }));
  if (out.length === 0 && exam >= today) {
    return [{ date: today, label: "Épreuve blanche courte + points faibles", mode: "controle", done: doneSet.has(today) }];
  }
  return out;
}

/** Weight of a subject from its bac impact (0–0.25) and its gap to target (points). */
export function subjectWeight(impact: number | undefined, gapToTarget: number | undefined): number {
  const fromImpact = impact === undefined ? 0 : Math.min(1, impact / 0.2) * 0.3;
  const fromGap = gapToTarget === undefined ? 0 : Math.max(-0.2, Math.min(0.2, gapToTarget / 10));
  return Math.min(1.4, Math.max(0.6, 0.9 + fromImpact + fromGap));
}
