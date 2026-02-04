'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fragranceResults, type FragranceId } from '@/data/fragrance-wizard';
import { ShinyText } from '@/components/effects/ShinyText';
import { AuraEffect } from '../effects/AuraEffect';
import { WizardParticles } from '../effects/WizardParticles';
import { WizardProgress } from '../WizardProgress';

interface StepRisultatoProps {
  fragranceId: FragranceId;
  onExploreAll: () => void;
  onRestart: () => void;
}

export function StepRisultato({ fragranceId, onExploreAll, onRestart }: StepRisultatoProps) {
  const fragrance = fragranceResults[fragranceId];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 py-12">
      <AuraEffect color={`${fragrance.accentColor}22`} />
      <WizardParticles color={`${fragrance.accentColor}66`} count={20} speed={0.15} />

      <div className="relative z-10 w-full max-w-lg space-y-6 text-center">
        {/* Teaser text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ShinyText
            text="La tua fragranza..."
            className="font-playfair text-lg md:text-xl italic block"
            color="#b5b5b5"
            shineColor="#D4AF37"
            speed={2}
          />
        </motion.div>

        {/* Product image reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 1, ease: [0.19, 1.0, 0.22, 1.0] }}
          className="relative mx-auto w-56 h-72 md:w-64 md:h-80"
        >
          <Image
            src={fragrance.image}
            alt={fragrance.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 224px, 256px"
            priority
          />
        </motion.div>

        {/* Name — letter by letter */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-white"
        >
          {fragrance.name}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="font-playfair text-xl md:text-2xl text-white/70 italic"
        >
          {fragrance.tagline}
        </motion.p>

        {/* Details stagger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm"
        >
          <span className="font-inter text-white/40">
            <span className="text-gold-500">{fragrance.family}</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="font-inter text-white/40">
            Concentrazione <span className="text-gold-500">{fragrance.concentration}</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="font-inter text-white/40">
            <span className="text-gold-500">{fragrance.price}</span>
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4"
        >
          <Link
            href={fragrance.slug}
            className="px-8 py-3 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500"
          >
            Scopri {fragrance.name}
          </Link>
          <button
            onClick={onExploreAll}
            className="px-8 py-3 border border-white/20 text-white/70 font-inter text-sm font-medium uppercase tracking-[0.15em] hover:border-gold-500/50 hover:text-gold-400 transition-all duration-300"
          >
            Vedi Tutte
          </button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
          onClick={onRestart}
          className="font-inter text-xs text-white/30 hover:text-white/50 transition-colors uppercase tracking-widest"
        >
          Rifai il Quiz
        </motion.button>

        <div className="pt-4">
          <WizardProgress currentStep={4} totalSteps={6} />
        </div>
      </div>
    </div>
  );
}
