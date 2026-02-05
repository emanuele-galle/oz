'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { stepMomento } from '@/data/fragrance-wizard';
import { WizardProgress } from '../WizardProgress';
import { WizardNavigation } from '../WizardNavigation';
import { AuraEffect } from '../effects/AuraEffect';
import { HoverCard3D } from '@/components/effects/HoverCard3D';

interface StepMomentoProps {
  selected: string | undefined;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepMomento({ selected, onSelect, onNext, onBack }: StepMomentoProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16">
      <AuraEffect color="rgba(212, 175, 55, 0.05)" />

      <div className="relative z-10 w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-inter text-[11px] uppercase tracking-[0.3em] text-gold-500/70"
          >
            Domanda 1 di 3
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-cinzel text-3xl md:text-4xl text-white"
          >
            {stepMomento.title}
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
            {stepMomento.subtitle}
          </motion.p>
        </div>

        {/* Option Cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {stepMomento.options.map((option, i) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <HoverCard3D intensity={10}>
                <button
                  onClick={() => onSelect(option.id)}
                  className={cn(
                    'group relative w-full p-5 md:p-6 border backdrop-blur-sm text-left transition-all duration-500 overflow-hidden',
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
                    <span className="text-2xl mb-3 block">{option.icon}</span>
                    <h3 className={cn(
                      'font-cinzel text-lg md:text-xl mb-1.5 transition-colors duration-300',
                      selected === option.id ? 'text-gold-400' : 'text-white/90 group-hover:text-gold-400'
                    )}>
                      {option.label}
                    </h3>
                    <p className="font-inter text-xs md:text-sm text-white/50 leading-relaxed">
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
          <WizardProgress currentStep={1} totalSteps={6} />
          <WizardNavigation
            onBack={onBack}
            onNext={onNext}
            nextDisabled={!selected}
          />
        </div>
      </div>
    </div>
  );
}
