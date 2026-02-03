'use client';

/**
 * TESTIMONIALS LUXURY — OZ Extrait
 * Design: Dark & Bold — multiple testimonials visible, auto-advance
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialsLuxury() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section
      className="py-24 md:py-32 bg-black bg-noise"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-luxury">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-500/70 font-light">
              Testimonianze
            </span>
            <h2 className="font-cinzel text-4xl md:text-5xl text-white mt-4 tracking-tight">
              Le Voci dei Nostri Clienti
            </h2>
          </div>

          {/* Testimonials — show current prominently */}
          <div className="relative">
            <div className="glass-card p-10 md:p-16 text-center min-h-[320px] flex flex-col justify-center">
              {/* Quote mark */}
              <div className="mb-6">
                <div className="inline-flex w-12 h-12 border border-gold-500/30 items-center justify-center">
                  <span className="font-playfair text-3xl text-gold-500 leading-none">&ldquo;</span>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="font-playfair text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed italic mb-10 max-w-3xl mx-auto">
                {testimonials[currentIndex].quote}
              </blockquote>

              {/* Author */}
              <div className="space-y-2">
                <div className="h-px w-12 bg-gold-500/40 mx-auto" />
                <p className="font-cinzel text-base text-gold-400">
                  {testimonials[currentIndex].author}
                </p>
                <p className="font-inter text-sm text-white/40">
                  {testimonials[currentIndex].city} · {testimonials[currentIndex].fragrance}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={prev}
                className="w-11 h-11 border border-gold-500/30 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 group transition-all duration-300"
                aria-label="Testimonianza precedente"
              >
                <ChevronLeft className="w-5 h-5 text-gold-500 group-hover:text-stone-950 transition-colors" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-gold-500'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Vai alla testimonianza ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-11 h-11 border border-gold-500/30 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 group transition-all duration-300"
                aria-label="Testimonianza successiva"
              >
                <ChevronRight className="w-5 h-5 text-gold-500 group-hover:text-stone-950 transition-colors" />
              </button>
            </div>
          </div>

          {/* Bottom note */}
          <div className="text-center mt-14">
            <p className="font-inter text-sm text-white/30">
              Oltre <span className="text-gold-500/70 font-semibold">500+</span> clienti
              soddisfatti in tutta Italia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
