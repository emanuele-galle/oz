'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { stepNote } from '@/data/fragrance-wizard';
import { WizardProgress } from '../WizardProgress';
import { WizardNavigation } from '../WizardNavigation';
import { AuraEffect } from '../effects/AuraEffect';
import { HoverCard3D } from '@/components/effects/HoverCard3D';

interface StepNoteProps {
  selected: string | undefined;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepNote({ selected, onSelect, onNext, onBack }: StepNoteProps) {
  const auraColor = selected === 'agrumato'
    ? 'rgba(135, 206, 235, 0.08)'
    : selected === 'speziato'
      ? 'rgba(212, 175, 55, 0.08)'
      : selected === 'gourmand'
        ? 'rgba(232, 160, 191, 0.08)'
        : 'rgba(212, 175, 55, 0.04)';

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16">
      <AuraEffect color={auraColor} />

      <div className="relative z-10 w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-inter text-[11px] uppercase tracking-[0.3em] text-gold-500/70"
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
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500/30" />
            <div className="w-1 h-1 bg-gold-500/40 rotate-45" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500/30" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-lg text-white/50 italic"
          >
            {stepNote.subtitle}
          </motion.p>
        </div>

        {/* Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stepNote.options.map((option, i) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <HoverCard3D intensity={12}>
                <button
                  onClick={() => onSelect(option.id)}
                  className={cn(
                    'group relative w-full p-6 md:p-8 border backdrop-blur-sm text-center transition-all duration-500 overflow-hidden',
                    'hover:border-gold-500/40 hover:bg-white/[0.06]',
                    selected === option.id
                      ? 'border-gold-500/80 bg-gold-500/10 shadow-[0_0_30px_rgba(212,175,55,0.12)]'
                      : 'border-white/15 bg-white/[0.04]'
                  )}
                >
                  {/* StarBorder animated glow when selected */}
                  {selected === option.id && (
                    <>
                      <div
                        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
                        style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent 10%)', animationDuration: '4s' }}
                      />
                      <div
                        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
                        style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent 10%)', animationDuration: '4s' }}
                      />
                    </>
                  )}

                  <span className="relative z-[1] block">
                    <span className="text-4xl mb-4 block">{option.icon}</span>
                    <h3 className={cn(
                      'font-cinzel text-xl md:text-2xl mb-2 transition-colors duration-300',
                      selected === option.id ? 'text-gold-400' : 'text-white/90 group-hover:text-gold-400'
                    )}>
                      {option.label}
                    </h3>
                    <p className="font-inter text-sm text-white/50 leading-relaxed">
                      {option.description}
                    </p>
                  </span>
                </button>
              </HoverCard3D>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
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
