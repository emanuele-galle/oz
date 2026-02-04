'use client';

import { motion } from 'framer-motion';
import { ShinyText } from '@/components/effects/ShinyText';
import { WizardParticles } from '../effects/WizardParticles';

interface StepIntroProps {
  onStart: () => void;
}

export function StepIntro({ onStart }: StepIntroProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <WizardParticles color="rgba(212, 175, 55, 0.3)" count={25} speed={0.2} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        className="relative z-10 space-y-8 max-w-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img
            src="/uploads/images/logo.png"
            alt="OZ Extrait"
            className="h-16 md:h-20 w-auto mx-auto mb-8 drop-shadow-[0_0_40px_rgba(212,175,55,0.3)]"
          />
        </motion.div>

        <ShinyText
          text="Trova la Tua Fragranza"
          className="font-cinzel text-3xl md:text-5xl lg:text-6xl text-white block"
          color="#b5b5b5"
          shineColor="#D4AF37"
          speed={3}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-playfair text-lg md:text-xl text-white/60 italic"
        >
          Un viaggio sensoriale in 3 domande per scoprire
          <br className="hidden md:block" />
          la fragranza che racconta la tua storia
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="pt-4"
        >
          <button
            onClick={onStart}
            className="px-10 py-4 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500"
          >
            Inizia il Viaggio
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="font-inter text-xs text-white/30 uppercase tracking-widest"
        >
          30 secondi per la fragranza perfetta
        </motion.p>
      </motion.div>
    </div>
  );
}
