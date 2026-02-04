import { create } from 'zustand';
import { calculateResult, type FragranceId } from '@/data/fragrance-wizard';

interface WizardState {
  currentStep: number;
  answers: Record<string, string>;
  result: FragranceId | null;
  direction: 1 | -1;

  setAnswer: (stepId: string, optionId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  computeResult: () => void;
}

export const useWizardStore = create<WizardState>((set, get) => ({
  currentStep: 0,
  answers: {},
  result: null,
  direction: 1,

  setAnswer: (stepId, optionId) =>
    set((state) => ({
      answers: { ...state.answers, [stepId]: optionId },
    })),

  nextStep: () =>
    set((state) => ({
      currentStep: state.currentStep + 1,
      direction: 1,
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(0, state.currentStep - 1),
      direction: -1,
    })),

  goToStep: (step) =>
    set((state) => ({
      currentStep: step,
      direction: step > state.currentStep ? 1 : -1,
    })),

  reset: () =>
    set({
      currentStep: 0,
      answers: {},
      result: null,
      direction: 1,
    }),

  computeResult: () => {
    const { answers } = get();
    const result = calculateResult(answers);
    set({ result });
  },
}));
