import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  source: "manuel" | "pronote";
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
  mode: SessionMode;
  start: number;
  minutes: number;
  rating?: Rating;
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
}

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
    }),
    {
      name: "revision-storage",
      storage: createMMKVStorage<RevisionState>("revision-storage"),
      version: 1,
    }
  )
);
