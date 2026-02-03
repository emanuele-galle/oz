'use client';

/**
 * TESTIMONIALS LUXURY — OZ Extrait
 * Design: Light Luxury — cream background, gold accents
 * AnimatePresence for transitions, TextReveal heading, product thumbnails
 */

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TextReveal } from '@/components/effects/TextReveal';

const fragranceImages: Record<string, string> = {
  'Cristallo': '/uploads/images/Cristallo.jpeg',
  'Scintilla': '/uploads/images/Scintilla.jpeg',
  "Potion d'Amour": '/uploads/images/Potion-damour.jpeg',
};

export function TestimonialsLuxury() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const testimonials = [
    {
      quote: "Un'esperienza olfattiva che trascende il concetto di profumo. Cristallo è diventato parte della mia identità.",
      author: 'Elena M.',
      city: 'Milano',
      fragrance: 'Cristallo',
    },
    {
      quote: 'La concentrazione 40% fa la differenza. Una fragranza che evolve sulla pelle per ore, raccontando sempre una storia diversa.',
      author: 'Marco R.',
      city: 'Roma',
      fragrance: 'Scintilla',
    },
    {
      quote: "Potion d'Amour è pura magia. Ogni volta che lo indosso, mi sento avvolta da un'aura di mistero e sensualità.",
      author: 'Giulia T.',
      city: 'Venezia',
      fragrance: "Potion d'Amour",
    },
    {
      quote: "Ho provato molti extrait de parfum, ma OZ è su un altro livello. La qualità si sente dalla prima nota all'ultima.",
      author: 'Alessandro B.',
      city: 'Torino',
      fragrance: 'Cristallo',
    },
    {
      quote: "Il packaging è un'opera d'arte. Ho regalato Scintilla per un compleanno e la reazione è stata incredibile.",
      author: 'Francesca L.',
      city: 'Firenze',
      fragrance: 'Scintilla',
    },
  ];

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  const current = testimonials[currentIndex];

  return (
    <section
      className="py-24 md:py-32 bg-[#FEFDFB]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-luxury">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/80 font-light">
              Testimonianze
            </span>
            <TextReveal className="font-cinzel text-4xl md:text-5xl text-stone-900 mt-4 tracking-tight justify-center">
              Le Voci dei Nostri Clienti
            </TextReveal>
          </div>

          {/* Testimonials — AnimatePresence */}
          <div className="relative">
            <div className="glass-card p-10 md:p-16 text-center min-h-[320px] flex flex-col justify-center overflow-hidden">
              {/* Quote mark */}
              <div className="mb-6">
                <div className="inline-flex w-12 h-12 border border-stone-200 items-center justify-center">
                  <span className="font-playfair text-3xl text-gold-500 leading-none">&ldquo;</span>
                </div>
              </div>

              {/* Quote with AnimatePresence */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                >
                  <blockquote className="font-playfair text-xl md:text-2xl lg:text-3xl text-stone-700 leading-relaxed italic mb-10 max-w-3xl mx-auto">
                    {current.quote}
                  </blockquote>

                  {/* Author with product thumbnail */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      {fragranceImages[current.fragrance] && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-stone-200 flex-shrink-0">
                          <Image
                            src={fragranceImages[current.fragrance]}
                            alt={current.fragrance}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-cinzel text-base text-gold-600">
                          {current.author}
                        </p>
                        <p className="font-inter text-sm text-stone-400">
                          {current.city} &middot; {current.fragrance}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={goPrev}
                className="w-11 h-11 border border-stone-300 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 group transition-all duration-300"
                aria-label="Testimonianza precedente"
              >
                <ChevronLeft className="w-5 h-5 text-gold-500 group-hover:text-stone-950 transition-colors" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className="p-2"
                    aria-label={`Vai alla testimonianza ${index + 1}`}
                  >
                    <span className={`block h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-gold-500'
                        : 'w-2 bg-stone-400 hover:bg-gold-500/60'
                    }`} />
                  </button>
                ))}
              </div>

              <button
                onClick={goNext}
                className="w-11 h-11 border border-stone-300 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 group transition-all duration-300"
                aria-label="Testimonianza successiva"
              >
                <ChevronRight className="w-5 h-5 text-gold-500 group-hover:text-stone-950 transition-colors" />
              </button>
            </div>
          </div>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-14"
          >
            <p className="font-inter text-sm text-stone-400">
              Oltre <span className="text-gold-500/70 font-semibold">500+</span> clienti
              soddisfatti in tutta Italia
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
