'use client';

import React, { useState } from 'react';
import { testimonials, getAverageRating } from '@/data/testimonials';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const averageRating = getAverageRating();

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="section-padding bg-midnight">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-display text-gold mb-4">
            Cosa Dicono i Clienti
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto mb-6" />

          {/* Average Rating */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-gold fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="font-inter text-white/80 text-lg">
              {averageRating.toFixed(1)} / 5.0
            </span>
          </div>
          <p className="font-inter text-white/60 text-sm">
            Basato su {testimonials.length} recensioni verificate
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 relative">
            {/* Testimonial Content */}
            <div className="mb-8">
              {/* Stars */}
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(current.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative mb-8">
                <div className="absolute -top-6 -left-4 text-7xl text-gold/20 font-cinzel">&ldquo;</div>
                <p className="font-playfair text-2xl text-white/90 leading-relaxed text-center relative z-10">
                  {current.comment}
                </p>
              </blockquote>

              {/* Author Info */}
              <div className="text-center">
                <div className="font-cinzel text-xl text-gold mb-1">
                  {current.name}
                </div>
                <div className="font-inter text-white/60 text-sm mb-2">
                  {current.location}
                </div>
                <div className="flex items-center justify-center gap-2">
                  {current.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-gold border border-gold/30 px-2 py-1 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Acquisto Verificato
                    </span>
                  )}
                  <span className="text-xs text-white/40 font-inter">
                    {current.product}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 flex items-center justify-center border border-gold/30 hover:bg-gold hover:text-black transition-all duration-300 text-gold"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-gold w-8'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 flex items-center justify-center border border-gold/30 hover:bg-gold hover:text-black transition-all duration-300 text-gold"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
