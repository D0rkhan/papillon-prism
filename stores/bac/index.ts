import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_PROFILE } from "@/core/bac/rules";
import type { BacProfile, EvalKind } from "@/core/bac/types";
import type { YearSnapshot } from "@/utils/bac/fromPapillon";

import { createMMKVStorage } from "../global";

export interface BacState {
  profile: BacProfile;
  /** Real exam results once known (component id → /20). */
  examResults: Record<string, number>;
  /** Hypothesis on the competitive EPFL bar (overall average). */
  competitive: { mean: number; sd: number };
  /** Manual corrections of an assessment's kind (grade id → kind), e.g. tagging a bac blanc. */
  kindOverrides: Record<string, EvalKind>;
  /** One snapshot per school year ("2026-2027"), so Première still counts in Terminale. */
  archive: Record<string, YearSnapshot>;
  /** Next-grade targets aim at the current P(admissible) + this delta (0 = hold the line). */
  targetDelta: number;
  /** "Notes à viser" choices, remembered between visits. */
  targetPrefs: TargetPrefs;

  setProfile: (profile: BacProfile) => void;
  setExamResult: (componentId: string, value: number | null) => void;
  setCompetitive: (value: { mean: number; sd: number }) => void;
  setKindOverride: (gradeId: string, kind: EvalKind | null) => void;
  saveSnapshot: (snapshot: YearSnapshot) => void;
  setTargetDelta: (delta: number) => void;
  setTargetPrefs: (prefs: Partial<TargetPrefs>) => void;
}

export interface TargetPrefs {
  bacGoal: number;
  psupProfile: string;
  psupGoal: number;
  /** Subjects the plan may use (empty: every subject). */
  subjects: string[];
}

export const useBacStore = create<BacState>()(
  persist(
    set => ({
      profile: DEFAULT_PROFILE,
      examResults: {},
      competitive: { mean: 16.5, sd: 0.5 },
      kindOverrides: {},
      archive: {},
      targetDelta: 0,
      targetPrefs: { bacGoal: 16, psupProfile: "cpge-sci", psupGoal: 16, subjects: [] },

      setProfile: profile => set({ profile }),
      setExamResult: (componentId, value) =>
        set(state => {
          const examResults = { ...state.examResults };
          if (value === null) { delete examResults[componentId]; } else { examResults[componentId] = value; }
          return { examResults };
        }),
      setCompetitive: competitive => set({ competitive }),
      setKindOverride: (gradeId, kind) =>
        set(state => {
          const kindOverrides = { ...state.kindOverrides };
          if (kind === null) { delete kindOverrides[gradeId]; } else { kindOverrides[gradeId] = kind; }
          return { kindOverrides };
        }),
      saveSnapshot: snapshot =>
        set(state => {
          const previous = state.archive[snapshot.key];
          // Never replace a richer snapshot by an emptier one (e.g. a failed sync).
          if (previous && previous.grades.length > snapshot.grades.length) { return state; }
          return { archive: { ...state.archive, [snapshot.key]: snapshot } };
        }),
      setTargetDelta: targetDelta => set({ targetDelta }),
      setTargetPrefs: prefs => set(state => ({ targetPrefs: { ...state.targetPrefs, ...prefs } })),
    }),
    {
      name: "bac-storage",
      storage: createMMKVStorage<BacState>("bac-storage"),
      version: 2,
      // v1 → v2: absolute target probability replaced by a delta. Keeps the archive.
      migrate: persisted => ({ ...(persisted as object), targetDelta: 0 }) as BacState,
    }
  )
);
