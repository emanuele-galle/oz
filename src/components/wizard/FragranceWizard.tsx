'use client';

import { useCallback, useEffect } from 'react';
import { useWizardStore } from '@/hooks/useWizardStore';
import { WizardStep } from './WizardStep';
import { StepIntro } from './steps/StepIntro';
import { StepMomento } from './steps/StepMomento';
import { StepEnergia } from './steps/StepEnergia';
import { StepNote } from './steps/StepNote';
import { StepRisultato } from './steps/StepRisultato';
import { StepEsplora } from './steps/StepEsplora';

// Step indices: 0=Intro, 1=Momento, 2=Energia, 3=Note, 4=Risultato, 5=Esplora

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
    <div className={isDark ? 'bg-stone-950 min-h-screen' : 'min-h-0'}>
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
