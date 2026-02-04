'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  isDark?: boolean;
}

export function WizardProgress({ currentStep, totalSteps, isDark = true }: WizardProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2.5">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <button
          key={i}
          className="relative p-1"
          aria-label={`Step ${i + 1}`}
          disabled
        >
          <div
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-500',
              i === currentStep
                ? 'bg-gold-500 scale-125'
                : i < currentStep
                  ? isDark ? 'bg-gold-500/50' : 'bg-gold-600/50'
                  : isDark ? 'bg-white/20' : 'bg-stone-300'
            )}
          />
          {i === currentStep && (
            <motion.div
              layoutId="wizard-progress-ring"
              className="absolute inset-0 m-auto w-4 h-4 rounded-full border border-gold-500/50"
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
