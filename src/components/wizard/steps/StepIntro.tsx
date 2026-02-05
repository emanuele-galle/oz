'use client';

import { motion } from 'framer-motion';
import { ShinyText } from '@/components/effects/ShinyText';
import { WizardParticles } from '../effects/WizardParticles';
import { AuraEffect } from '../effects/AuraEffect';

interface StepIntroProps {
  onStart: () => void;
}

export function StepIntro({ onStart }: StepIntroProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Ambient effects */}
      <AuraEffect color="rgba(212, 175, 55, 0.06)" />
      <WizardParticles color="rgba(212, 175, 55, 0.3)" count={25} speed={0.2} />

      {/* Subtle top/bottom border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        className="relative z-10 space-y-8 max-w-xl"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img
            src="/uploads/images/logo.png"
            alt="OZ Extrait"
            className="h-16 md:h-20 w-auto mx-auto mb-6 drop-shadow-[0_0_40px_rgba(212,175,55,0.3)]"
          />
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="flex items-center justify-center gap-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/40" />
          <div className="w-1.5 h-1.5 bg-gold-500/50 rotate-45" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/40" />
        </motion.div>

        {/* Title */}
        <ShinyText
          text="Trova la Tua Fragranza"
          className="font-cinzel text-3xl md:text-5xl lg:text-6xl text-white block"
          color="#b5b5b5"
          shineColor="#D4AF37"
          speed={3}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-playfair text-lg md:text-xl text-white/60 italic leading-relaxed"
        >
          Un viaggio sensoriale in 3 domande per scoprire
          <br className="hidden md:block" />
          la fragranza che racconta la tua storia
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="pt-6"
        >
          <button
            onClick={onStart}
            className="group relative px-12 py-4 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-[0.2em] hover:bg-gold-400 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10">Inizia il Viaggio</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gold-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </motion.div>

        {/* Time indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="font-inter text-[11px] text-white/25 uppercase tracking-[0.3em]"
        >
          30 secondi &middot; 3 domande &middot; 1 fragranza perfetta
        </motion.p>
      </motion.div>
    </div>
  );
}
