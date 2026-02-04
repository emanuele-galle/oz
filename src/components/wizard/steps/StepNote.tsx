'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { stepNote } from '@/data/fragrance-wizard';
import { WizardProgress } from '../WizardProgress';
import { WizardNavigation } from '../WizardNavigation';
import { WizardParticles } from '../effects/WizardParticles';

interface StepNoteProps {
  selected: string | undefined;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepNote({ selected, onSelect, onNext, onBack }: StepNoteProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 py-12">
      <WizardParticles color="rgba(212, 175, 55, 0.2)" count={12} speed={0.15} />

      <div className="relative z-10 w-full max-w-2xl space-y-8">
        <div className="text-center space-y-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-inter text-xs uppercase tracking-[0.3em] text-gold-500/60"
          >
            Domanda 3 di 3
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-cinzel text-3xl md:text-4xl text-white"
          >
            {stepNote.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-lg text-white/50 italic"
          >
            {stepNote.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stepNote.options.map((option, i) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => onSelect(option.id)}
              className={cn(
                'group relative p-6 md:p-8 border text-center transition-all duration-500',
                'hover:border-gold-500/50 hover:bg-white/[0.03]',
                selected === option.id
                  ? 'border-gold-500 bg-gold-500/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                  : 'border-white/10 bg-white/[0.02]'
              )}
            >
              <span className="text-4xl mb-4 block">{option.icon}</span>
              <h3 className={cn(
                'font-cinzel text-xl md:text-2xl mb-2 transition-colors duration-300',
                selected === option.id ? 'text-gold-400' : 'text-white/90 group-hover:text-gold-400'
              )}>
                {option.label}
              </h3>
              <p className="font-inter text-sm text-white/40 leading-relaxed">
                {option.description}
              </p>

              {selected === option.id && (
                <motion.div
                  layoutId="note-selected"
                  className="absolute inset-0 border-2 border-gold-500 pointer-events-none"
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="space-y-4 pt-4">
          <WizardProgress currentStep={3} totalSteps={6} />
          <WizardNavigation
            onBack={onBack}
            onNext={onNext}
            nextLabel="Scopri il Risultato"
            nextDisabled={!selected}
          />
        </div>
      </div>
    </div>
  );
}
