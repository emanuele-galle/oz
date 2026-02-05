'use client';

import { useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useWizardStore } from '@/hooks/useWizardStore';
import { WizardStep } from './WizardStep';
import { StepIntro } from './steps/StepIntro';
import { StepMomento } from './steps/StepMomento';
import { StepEnergia } from './steps/StepEnergia';
import { StepNote } from './steps/StepNote';
import { StepRisultato } from './steps/StepRisultato';

// Lazy load the heaviest step (images, table, multiple cards)
const StepEsplora = dynamic(
  () => import('./steps/StepEsplora').then(mod => ({ default: mod.StepEsplora })),
  {
    ssr: false,
    loading: () => <div className="min-h-[80vh] bg-[#FBF8F3]" />,
  }
);

// Step indices: 0=Intro, 1=Momento, 2=Energia, 3=Note, 4=Risultato, 5=Esplora
const SWIPE_THRESHOLD = 50;
const STEP_ANSWER_KEYS = ['', 'momento', 'energia', 'note'] as const;

export function FragranceWizard() {
  const {
    currentStep,
    answers,
    result,
    direction,
    setAnswer,
    nextStep,
    prevStep,
    goToStep,
    reset,
    computeResult,
  } = useWizardStore();

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // --- Touch swipe navigation ---
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchRef.current) return;

    const deltaX = e.changedTouches[0].clientX - touchRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchRef.current.y;
    touchRef.current = null;

    // Only horizontal swipes that exceed threshold
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;

    // Read fresh state to avoid stale closures
    const state = useWizardStore.getState();
    const { currentStep: step, answers: ans } = state;

    if (deltaX > 0 && step > 0) {
      // Swipe right → go back
      state.prevStep();
    } else if (deltaX < 0) {
      // Swipe left → go forward (with validation)
      if (step === 0) {
        state.nextStep();
      } else if (step >= 1 && step <= 2 && ans[STEP_ANSWER_KEYS[step]]) {
        state.nextStep();
      } else if (step === 3 && ans.note) {
        state.computeResult();
        state.nextStep();
      } else if (step === 4) {
        state.goToStep(5);
      }
    }
  }, []);

  const handleStart = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const handleMomentoSelect = useCallback((id: string) => {
    setAnswer('momento', id);
  }, [setAnswer]);

  const handleEnergiaSelect = useCallback((id: string) => {
    setAnswer('energia', id);
  }, [setAnswer]);

  const handleNoteSelect = useCallback((id: string) => {
    setAnswer('note', id);
  }, [setAnswer]);

  const handleNoteNext = useCallback(() => {
    computeResult();
    nextStep();
  }, [computeResult, nextStep]);

  const handleExploreAll = useCallback(() => {
    goToStep(5);
  }, [goToStep]);

  const handleRestart = useCallback(() => {
    reset();
  }, [reset]);

  // Dark background for wizard steps 0-4, light for step 5
  const isDark = currentStep < 5;

  return (
    <div
      className={isDark ? 'relative bg-gradient-to-b from-[#0a0908] via-stone-950 to-[#0a0908] min-h-screen overflow-hidden' : 'min-h-0'}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <WizardStep stepKey={`step-${currentStep}`} direction={direction}>
        {currentStep === 0 && (
          <StepIntro onStart={handleStart} />
        )}

        {currentStep === 1 && (
          <StepMomento
            selected={answers.momento}
            onSelect={handleMomentoSelect}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 2 && (
          <StepEnergia
            selected={answers.energia}
            onSelect={handleEnergiaSelect}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 3 && (
          <StepNote
            selected={answers.note}
            onSelect={handleNoteSelect}
            onNext={handleNoteNext}
            onBack={prevStep}
          />
        )}

        {currentStep === 4 && result && (
          <StepRisultato
            fragranceId={result}
            onExploreAll={handleExploreAll}
            onRestart={handleRestart}
          />
        )}

        {currentStep === 5 && (
          <StepEsplora
            recommendedId={result}
            onRestart={handleRestart}
          />
        )}
      </WizardStep>
    </div>
  );
}
