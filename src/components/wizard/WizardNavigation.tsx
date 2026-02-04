'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface WizardNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  showBack?: boolean;
  showNext?: boolean;
  nextLabel?: string;
  isDark?: boolean;
  nextDisabled?: boolean;
}

export function WizardNavigation({
  onBack,
  onNext,
  showBack = true,
  showNext = true,
  nextLabel = 'Continua',
  isDark = true,
  nextDisabled = false,
}: WizardNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full max-w-lg mx-auto">
      {showBack && onBack ? (
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2.5 font-inter text-sm transition-colors duration-300',
            isDark
              ? 'text-white/50 hover:text-white/80'
              : 'text-stone-400 hover:text-stone-600'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Indietro
        </motion.button>
      ) : (
        <div />
      )}

      {showNext && onNext && (
        <motion.button
          onClick={onNext}
          disabled={nextDisabled}
          whileHover={nextDisabled ? undefined : { scale: 1.02 }}
          whileTap={nextDisabled ? undefined : { scale: 0.98 }}
          className={cn(
            'px-8 py-3 font-inter text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-500',
            nextDisabled
              ? 'bg-white/10 text-white/20 cursor-not-allowed'
              : 'bg-gold-500 text-stone-950 hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
          )}
        >
          {nextLabel}
        </motion.button>
      )}
    </div>
  );
}
