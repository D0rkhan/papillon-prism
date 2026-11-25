import { useEffect, useMemo } from "react";

import { useHomeworkData } from "@/app/(tabs)/tasks/hooks/useHomeworkData";
import { prepare } from "@/core/bac/engine";
import { classifySubject } from "@/core/bac/subjects";
import { bacLevers } from "@/core/targets/bac";
import { PlanSubject, rankChapters, subjectWeight, Suggestion } from "@/core/revision/planner";
import { getWeekNumberFromDate } from "@/database/useHomework";
import { useBacAnalysis } from "@/hooks/useBacAnalysis";
import { usePronoteExtra } from "@/hooks/usePronoteExtra";
import { getLessonContents, LessonContent } from "@/services/pronote/extras";
import type { Homework } from "@/services/shared/homework";
import { useBacStore } from "@/stores/bac";
import { RevExam, RevSubject, useRevisionStore } from "@/stores/revision";
import { useAlert } from "@/ui/components/AlertProvider";
import { getSubjectName } from "@/utils/subjects/name";

/** One id per subject whatever its spelling: the canonical subject when known. */
export const subjectKey = (name: string) => {
  const canonical = classifySubject(name);
  return canonical !== "other" ? canonical : getSubjectName(name).trim().toLowerCase();
};

const TEST_WORDS = /\b(contr[oô]le|ds|devoir surveill[ée]|interro(gation)?|[ée]valuation|bac blanc|test|examen|partiel|oral)\b/i;

const stripHtml = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

/** A homework that announces a test. */
export const isTest = (h: Homework) => h.evaluation || TEST_WORDS.test(stripHtml(h.content));

const DAY = 24 * 3600 * 1000;

/**
 * Everything the revision space needs, from the student's own data:
 * - subjects: every subject met in grades, homework and the cahier de textes;
 * - tests: homework flagged as an evaluation or announcing a test (next 3 weeks),
 *   turned into contrôles automatically (deletable);
 * - chapter ideas: titles of the lessons of the last 4 weeks;
 * - subject weights: bac coefficients still open + gap to the target average.
 */
export function useRevisionData() {
  const store = useRevisionStore();
  const alert = useAlert();
  const now = Date.now();
  const week = getWeekNumberFromDate(new Date());
  const weeks = useMemo(() => [week, week + 1, week + 2], [week]);
  const { homeworkByWeek } = useHomeworkData(weeks, alert);

  const from = useMemo(() => { const d = new Date(); d.setDate(d.getDate() - 28); d.setHours(0, 0, 0, 0); return d; }, []);
  const to = useMemo(() => { const d = new Date(); d.setHours(23, 59, 59, 0); return d; }, []);
  const lessons = usePronoteExtra<LessonContent[]>(`revision-lessons:${from.toDateString()}`, session => getLessonContents(session, from, to));

  const { input } = useBacAnalysis({ lite: true });
  const bacGoal = useBacStore(s => s.targetPrefs.bacGoal);

  const homework = useMemo(() => Object.values(homeworkByWeek).flat() as Homework[], [homeworkByWeek]);

  // Subjects met anywhere.
  useEffect(() => {
    const names = new Set<string>();
    for (const h of homework) { if (h.subject) { names.add(h.subject); } }
    for (const l of lessons.data ?? []) { if (l.subject) { names.add(l.subject); } }
    const list: RevSubject[] = [];
    for (const raw of names) {
      const canonical = classifySubject(raw);
      const name = getSubjectName(raw);
      list.push({ id: subjectKey(raw), name, canonical: canonical === "other" ? undefined : canonical });
    }
    if (list.length) { store.upsertSubjects(list); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homework, lessons.data]);

  // Tests announced in PRONOTE homework.
  useEffect(() => {
    for (const h of homework) {
      if (!isTest(h)) { continue; }
      const id = `pronote:${h.id}`;
      if (store.dismissed.includes(`exam:${id}`) || store.exams[id]) { continue; }
      const date = new Date(h.dueDate).getTime();
      if (date < now - DAY) { continue; }
      const exam: RevExam = {
        id,
        subjectId: subjectKey(h.subject),
        title: stripHtml(h.content).slice(0, 80) || "Contrôle",
        date,
        chapterIds: [],
        source: "pronote",
      };
      store.upsertExam(exam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homework]);

  // Importance of each subject for the bac objective.
  const weights = useMemo(() => {
    const out = new Map<string, number>();
    if (!input) { return out; }
    try {
      for (const l of bacLevers(prepare({ ...input, settings: { simulations: 1 } }))) {
        out.set(l.key, subjectWeight(l.impact, bacGoal - l.level));
      }
    } catch {
      // No grades yet: every subject weighs the same.
    }
    return out;
  }, [input, bacGoal]);

  const subjects: PlanSubject[] = useMemo(
    () => Object.values(store.subjects)
      .filter(s => !s.hidden)
      .map(s => ({ ...s, weight: s.canonical ? weights.get(s.canonical) : undefined }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    [store.subjects, weights]
  );

  const chapters = useMemo(() => Object.values(store.chapters), [store.chapters]);
  const exams = useMemo(() => Object.values(store.exams).sort((a, b) => a.date - b.date), [store.exams]);

  const ranked: Suggestion[] = useMemo(
    () => rankChapters(subjects, chapters, exams, now),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subjects, chapters, exams, Math.floor(now / (5 * 60 * 1000))]
  );

  /** Lesson titles not yet turned into chapters, per subject id. */
  const ideas = useMemo(() => {
    const known = new Set(chapters.map(c => `${c.subjectId}|${c.title.toLowerCase()}`));
    const out = new Map<string, string[]>();
    for (const l of lessons.data ?? []) {
      const sid = subjectKey(l.subject);
      for (const c of l.contents) {
        const title = (c.title ?? "").trim();
        if (title.length < 3 || known.has(`${sid}|${title.toLowerCase()}`) || store.dismissed.includes(`idea:${sid}|${title}`)) { continue; }
        const list = out.get(sid) ?? [];
        if (!list.includes(title)) { list.push(title); }
        out.set(sid, list);
      }
    }
    return out;
  }, [lessons.data, chapters, store.dismissed]);

  const dueCards = useMemo(
    () => Object.values(store.cards).filter(c => !c.memory || c.memory.due <= now),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store.cards, Math.floor(now / 60000)]
  );

  return { subjects, chapters, exams, ranked, ideas, dueCards, lessonsLoading: lessons.loading, weights };
}
