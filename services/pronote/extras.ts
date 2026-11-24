/**
 * PRONOTE features beyond the shared service model: report cards (bulletins),
 * skills (compétences), lesson contents (cahier de textes) and the timetable
 * school-wide info. Everything is mapped to plain JSON so it can be cached and
 * shown offline.
 */
import {
  evaluations as fetchEvaluations,
  gradebook as fetchGradebook,
  gradebookPDF as fetchGradebookPDF,
  resourcesFromIntervals,
  SessionHandle,
  TabLocation,
} from "@blockshub/pawnote-lts";

export interface ExtraPeriod {
  id: string;
  name: string;
  start: number;
  end: number;
}

export interface BulletinSubject {
  name: string;
  group?: string;
  coefficient: number;
  student: number | null;
  classAverage: number | null;
  min: number | null;
  max: number | null;
  appreciations: string[];
  teachers: string[];
}

export interface Bulletin {
  periodName: string;
  message?: string;
  /** "Appréciation générale", "Mention", "Avis du conseil"… */
  overall: { name: string; value: string }[];
  subjects: BulletinSubject[];
  fetchedAt: number;
}

export interface SkillItem {
  domain: string;
  item?: string;
  pillar: string;
  level: string;
  abbreviation: string;
  coefficient: number;
}

export interface SkillEvaluation {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  date: number;
  coefficient: number;
  description: string;
  skills: SkillItem[];
}

export interface LessonContent {
  id: string;
  subject: string;
  color: string;
  start: number;
  end: number;
  teachers: string[];
  hasAssignment: boolean;
  contents: {
    title?: string;
    /** HTML from the teacher. */
    description?: string;
    category?: string;
    files: { name: string; url: string }[];
  }[];
}

const finite = (n: number | undefined | null): number | null =>
  typeof n === "number" && Number.isFinite(n) && n >= 0 ? n : null;

function tabPeriods(session: SessionHandle, location: TabLocation) {
  return session.user.resources[0]?.tabs.get(location)?.periods ?? [];
}

const toExtraPeriod = (p: { id: string; name: string; startDate: Date; endDate: Date }): ExtraPeriod => ({
  id: p.id,
  name: p.name,
  start: p.startDate.getTime(),
  end: p.endDate.getTime(),
});

export const bulletinPeriods = (session: SessionHandle): ExtraPeriod[] =>
  tabPeriods(session, TabLocation.Gradebook).map(toExtraPeriod);

export const skillPeriods = (session: SessionHandle): ExtraPeriod[] =>
  tabPeriods(session, TabLocation.Evaluations).map(toExtraPeriod);

function findPeriod(session: SessionHandle, location: TabLocation, name: string) {
  const period = tabPeriods(session, location).find(p => p.name === name);
  if (!period) {
    throw new Error(`Période « ${name} » introuvable dans PRONOTE`);
  }
  return period;
}

export async function getBulletin(session: SessionHandle, periodName: string): Promise<Bulletin> {
  const book = await fetchGradebook(session, findPeriod(session, TabLocation.Gradebook, periodName));
  return {
    periodName,
    message: book.message,
    overall: (book.overallAssessments ?? []).filter(a => a.value?.trim()),
    subjects: (book.subjects ?? []).map(s => ({
      name: s.subject.name,
      group: s.subjectGroup || undefined,
      coefficient: s.coef,
      student: finite(s.averages?.student),
      classAverage: finite(s.averages?.classOverall),
      min: finite(s.averages?.min),
      max: finite(s.averages?.max),
      appreciations: (s.assessments ?? []).filter(a => a?.trim()),
      teachers: s.teachers ?? [],
    })),
    fetchedAt: Date.now(),
  };
}

export async function getBulletinPDF(session: SessionHandle, periodName: string): Promise<string> {
  return fetchGradebookPDF(session, findPeriod(session, TabLocation.Gradebook, periodName));
}

export async function getSkills(session: SessionHandle, periodName: string): Promise<SkillEvaluation[]> {
  const list = await fetchEvaluations(session, findPeriod(session, TabLocation.Evaluations, periodName));
  return list
    .map(e => ({
      id: e.id,
      name: e.name,
      subject: e.subject.name,
      teacher: e.teacher,
      date: e.date.getTime(),
      coefficient: e.coefficient,
      description: e.description,
      skills: [...e.skills]
        .sort((a, b) => a.order - b.order)
        .map(s => ({
          domain: s.domainName,
          item: s.itemName,
          pillar: s.pillarName,
          level: s.level,
          abbreviation: s.abbreviation,
          coefficient: s.coefficient,
        })),
    }))
    .sort((a, b) => b.date - a.date);
}

export async function getLessonContents(session: SessionHandle, from: Date, to: Date): Promise<LessonContent[]> {
  const resources = await resourcesFromIntervals(session, from, to);
  return resources
    .map(r => ({
      id: r.id,
      subject: r.subject.name,
      color: r.backgroundColor,
      start: r.startDate.getTime(),
      end: r.endDate.getTime(),
      teachers: r.teachers,
      hasAssignment: r.haveAssignment,
      contents: r.contents.map(c => ({
        title: c.title,
        description: c.description,
        category: c.categoryText,
        files: c.files.map(f => ({ name: f.name, url: f.url })),
      })),
    }))
    .filter(r => r.contents.some(c => c.title || c.description || c.files.length))
    .sort((a, b) => a.start - b.start);
}
