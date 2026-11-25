import { create } from "zustand";
import { persist } from "zustand/middleware";

import { parseCardText } from "@/core/practice/cards";
import { deckCards, programChapter } from "@/core/practice/curriculum";
import { Attempt, recordAttempt, SkillState } from "@/core/practice/mastery";
import { MemoryState, Rating, review } from "@/core/revision/fsrs";
import type { SessionMode } from "@/core/revision/methods";

import { createMMKVStorage } from "../global";

export interface RevSubject {
  /** Normalised subject name: one entry per subject, whatever the source. */
  id: string;
  name: string;
  canonical?: string;
  hidden?: boolean;
}

export interface RevChapter {
  id: string;
  subjectId: string;
  title: string;
  createdAt: number;
  source: "manuel" | "pronote" | "programme";
  /** Chapter of the official programme it follows ("maths:derivation"). */
  programId?: string;
  memory?: MemoryState;
}

export interface RevCard {
  id: string;
  chapterId: string;
  front: string;
  back: string;
  createdAt: number;
  memory?: MemoryState;
}

export interface RevExam {
  id: string;
  subjectId: string;
  title: string;
  date: number;
  chapterIds: string[];
  source: "manuel" | "pronote";
}

export interface RevSession {
  id: string;
  subjectId: string;
  chapterId?: string;
  mode: SessionMode | "pratique" | "blanc";
  start: number;
  minutes: number;
  rating?: Rating;
  /** Practice and mock tests: right answers out of total. */
  score?: { right: number; total: number };
}

export interface MockResult {
  id: string;
  subjectId: string;
  at: number;
  right: number;
  total: number;
  mark: number;
  /** Mark predicted from mastery just before, to show the model is honest. */
  predicted: number | null;
  chapterIds: string[];
}

interface RevisionState {
  subjects: Record<string, RevSubject>;
  chapters: Record<string, RevChapter>;
  cards: Record<string, RevCard>;
  exams: Record<string, RevExam>;
  sessions: RevSession[];
  /** Daily study budget, minutes. */
  dailyMinutes: number;
  /** PRONOTE suggestions the student dismissed (lesson titles, homework ids). */
  dismissed: string[];
  /** Mastery of each generated skill (Bayesian Knowledge Tracing + FSRS). */
  skills: Record<string, SkillState>;
  mocks: MockResult[];

  upsertSubjects: (subjects: RevSubject[]) => void;
  setSubjectHidden: (id: string, hidden: boolean) => void;
  addChapter: (subjectId: string, title: string, source?: RevChapter["source"]) => string;
  renameChapter: (id: string, title: string) => void;
  deleteChapter: (id: string) => void;
  rateChapter: (id: string, rating: Rating, now?: number) => void;
  addCard: (chapterId: string, front: string, back: string) => void;
  deleteCard: (id: string) => void;
  rateCard: (id: string, rating: Rating, now?: number) => void;
  upsertExam: (exam: Omit<RevExam, "id"> & { id?: string }) => void;
  deleteExam: (id: string) => void;
  logSession: (session: Omit<RevSession, "id">) => void;
  setDailyMinutes: (minutes: number) => void;
  dismiss: (key: string) => void;
  /** Follows a programme chapter: creates it with its ready-made cards. Returns its id. */
  activateProgram: (programId: string, subjectId: string) => string;
  recordSkill: (skillId: string, attempt: Attempt, now?: number) => void;
  /** "question ; réponse" or tab-separated lines (Anki, Quizlet exports). Returns the count. */
  importCards: (chapterId: string, text: string) => number;
  addMock: (mock: Omit<MockResult, "id">) => void;
}

export { parseCardText };

const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export const useRevisionStore = create<RevisionState>()(
  persist(
    (set, get) => ({
      subjects: {},
      chapters: {},
      cards: {},
      exams: {},
      sessions: [],
      dailyMinutes: 60,
      dismissed: [],
      skills: {},
      mocks: [],

      upsertSubjects: subjects => {
        const current = get().subjects;
        let changed = false;
        const next = { ...current };
        for (const s of subjects) {
          const prev = current[s.id];
          if (!prev || prev.name !== s.name || prev.canonical !== s.canonical) {
            next[s.id] = { ...prev, ...s, hidden: prev?.hidden };
            changed = true;
          }
        }
        if (changed) { set({ subjects: next }); }
      },
      setSubjectHidden: (id, hidden) => set(state => ({ subjects: { ...state.subjects, [id]: { ...state.subjects[id], hidden } } })),
      addChapter: (subjectId, title, source = "manuel") => {
        const id = newId();
        set(state => ({ chapters: { ...state.chapters, [id]: { id, subjectId, title: title.trim(), createdAt: Date.now(), source } } }));
        return id;
      },
      renameChapter: (id, title) => set(state => ({ chapters: { ...state.chapters, [id]: { ...state.chapters[id], title } } })),
      deleteChapter: id => set(state => {
        const { [id]: _removed, ...chapters } = state.chapters;
        const cards = Object.fromEntries(Object.entries(state.cards).filter(([, c]) => c.chapterId !== id));
        return { chapters, cards };
      }),
      rateChapter: (id, rating, now = Date.now()) => set(state => {
        const chapter = state.chapters[id];
        if (!chapter) { return state; }
        return { chapters: { ...state.chapters, [id]: { ...chapter, memory: review(chapter.memory, rating, now) } } };
      }),
      addCard: (chapterId, front, back) => {
        const id = newId();
        set(state => ({ cards: { ...state.cards, [id]: { id, chapterId, front: front.trim(), back: back.trim(), createdAt: Date.now() } } }));
      },
      deleteCard: id => set(state => {
        const { [id]: _removed, ...cards } = state.cards;
        return { cards };
      }),
      rateCard: (id, rating, now = Date.now()) => set(state => {
        const card = state.cards[id];
        if (!card) { return state; }
        return { cards: { ...state.cards, [id]: { ...card, memory: review(card.memory, rating, now) } } };
      }),
      upsertExam: exam => set(state => {
        const id = exam.id ?? newId();
        return { exams: { ...state.exams, [id]: { ...state.exams[id], ...exam, id } } };
      }),
      deleteExam: id => set(state => {
        const { [id]: _removed, ...exams } = state.exams;
        return { exams, dismissed: [...state.dismissed, `exam:${id}`] };
      }),
      // Keep a year of history at most.
      logSession: session => set(state => ({ sessions: [...state.sessions, { ...session, id: newId() }].slice(-1500) })),
      setDailyMinutes: dailyMinutes => set({ dailyMinutes }),
      dismiss: key => set(state => ({ dismissed: state.dismissed.includes(key) ? state.dismissed : [...state.dismissed, key] })),
      activateProgram: (programId, subjectId) => {
        const existing = Object.values(get().chapters).find(c => c.programId === programId);
        if (existing) { return existing.id; }
        const program = programChapter(programId);
        const id = newId();
        const now = Date.now();
        set(state => {
          const cards = { ...state.cards };
          deckCards(program?.deck).forEach((c, i) => {
            const cid = `${id}-${i}`;
            cards[cid] = { id: cid, chapterId: id, front: c.front, back: c.back, createdAt: now };
          });
          return {
            chapters: { ...state.chapters, [id]: { id, subjectId, title: program?.title ?? programId, createdAt: now, source: "programme", programId } },
            cards,
          };
        });
        return id;
      },
      recordSkill: (skillId, attempt, now = Date.now()) => set(state => ({
        skills: { ...state.skills, [skillId]: recordAttempt(state.skills[skillId], attempt, now) },
      })),
      importCards: (chapterId, text) => {
        const parsed = parseCardText(text);
        if (!parsed.length) { return 0; }
        const now = Date.now();
        set(state => {
          const cards = { ...state.cards };
          parsed.forEach((c, i) => {
            const id = `${newId()}${i}`;
            cards[id] = { id, chapterId, front: c.front, back: c.back, createdAt: now };
          });
          return { cards };
        });
        return parsed.length;
      },
      addMock: mock => set(state => ({ mocks: [...state.mocks, { ...mock, id: newId() }].slice(-200) })),
    }),
    {
      name: "revision-storage",
      storage: createMMKVStorage<RevisionState>("revision-storage"),
      version: 2,
      // v1 → v2: skill mastery and mock tests (empty at first).
      migrate: persisted => ({ skills: {}, mocks: [], ...(persisted as object) }) as unknown as RevisionState,
    }
  )
);
