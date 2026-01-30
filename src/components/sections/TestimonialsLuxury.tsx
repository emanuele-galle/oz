'use client';

/**
 * TESTIMONIALS LUXURY — OZ Extrait
 * Design: Carousel minimale con quotes poetiche
 * Pattern: Editorial magazine layout + generous spacing
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialsLuxury() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Un'esperienza olfattiva che trascende il concetto di profumo. Cristallo è diventato parte della mia identità.",
      author: 'Elena M.',
      role: 'Milano',
      fragrance: 'Cristallo',
    },
    {
      quote: 'La concentrazione 40% fa la differenza. Una fragranza che evolve sulla pelle per ore, raccontando sempre una storia diversa.',
      author: 'Marco R.',
      role: 'Roma',
      fragrance: 'Scintilla',
    },
    {
      quote: "Potion d'Amour è pura magia. Ogni volta che lo indosso, mi sento avvolta da un'aura di mistero e sensualità.",
      author: 'Giulia T.',
      role: 'Venezia',
      fragrance: "Potion d'Amour",
    },
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 md:py-32 bg-stone-50">
      <div className="container-luxury">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-stone-500 font-light">
              Voci
            </span>
          </div>

          {/* Testimonial Card */}
          <div className="relative">
            {/* Quote Content */}
            <div className="bg-white border border-stone-200 p-12 md:p-16 lg:p-20 text-center min-h-[400px] flex flex-col justify-center">
              {/* Decorative Quote Mark */}
              <div className="mb-8">
                <div className="inline-block w-12 h-12 border border-gold-500 flex items-center justify-center">
                  <span className="font-playfair text-4xl text-gold-600 leading-none">"</span>
                </div>
              </div>

              {/* Quote Text */}
              <blockquote className="font-playfair text-2xl md:text-3xl lg:text-4xl text-stone-900 leading-[1.4] italic mb-12 max-w-3xl mx-auto">
                {current.quote}
              </blockquote>

              {/* Author Info */}
              <div className="space-y-3">
                <div className="h-[1px] w-16 bg-gold-500 mx-auto" />
                <div>
                  <p className="font-cinzel text-lg text-stone-900">
                    {current.author}
                  </p>
                  <p className="font-inter text-sm text-stone-600 mt-1">
                    {current.role} · {current.fragrance}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-center gap-8 mt-12">
              <button
                onClick={prev}
                className="w-12 h-12 border border-stone-300 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 group transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors duration-300" />
              </button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-gold-500'
                        : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 border border-stone-300 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 group transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-16">
            <p className="font-inter text-sm text-stone-500">
              Oltre <span className="text-gold-600 font-semibold">500+</span> clienti
              soddisfatti in tutta Italia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
