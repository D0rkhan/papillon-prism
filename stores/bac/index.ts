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
  /** Probability the next-grade targets aim for. */
  targetProbability: number;

  setProfile: (profile: BacProfile) => void;
  setExamResult: (componentId: string, value: number | null) => void;
  setCompetitive: (value: { mean: number; sd: number }) => void;
  setKindOverride: (gradeId: string, kind: EvalKind | null) => void;
  saveSnapshot: (snapshot: YearSnapshot) => void;
  setTargetProbability: (p: number) => void;
}

export const useBacStore = create<BacState>()(
  persist(
    set => ({
      profile: DEFAULT_PROFILE,
      examResults: {},
      competitive: { mean: 16.5, sd: 0.5 },
      kindOverrides: {},
      archive: {},
      targetProbability: 0.5,

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
      setTargetProbability: targetProbability => set({ targetProbability }),
    }),
    {
      name: "bac-storage",
      storage: createMMKVStorage<BacState>("bac-storage"),
      version: 1,
    }
  )
);
