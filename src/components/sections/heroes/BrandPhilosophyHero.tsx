'use client';

/**
 * BRAND PHILOSOPHY HERO — Manifesto Typography-First
 * Design: Typography protagonista + Minimal background
 * @version 2.0 - Luxury redesign
 */

import React from 'react';

export function BrandPhilosophyHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.15) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury py-24 md:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Overline */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-700">
              La Nostra Filosofia
            </span>
          </div>

          {/* Main Statement */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <h1 className="font-cinzel text-[48px] md:text-[72px] lg:text-[96px] leading-[1] tracking-tight text-stone-900 mb-8">
              Extrait de Parfum.
              <br />
              <span className="text-gold-500">Extrait d&apos;Âme.</span>
            </h1>

            <p className="font-playfair text-xl md:text-2xl lg:text-3xl text-stone-600 leading-[1.5] italic max-w-3xl mx-auto">
              Estratto di Profumo. Estratto d&apos;Anima.
            </p>
          </div>

          {/* Divider */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
          </div>

          {/* Body text */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
            <p className="font-inter text-base md:text-lg text-stone-700 leading-relaxed max-w-3xl mx-auto">
              Non creiamo profumi. Creiamo <strong className="text-gold-600 font-semibold">esperienze sensoriali</strong> che
              trascendono il tempo, <strong className="text-gold-600 font-semibold">opere d&apos;arte liquide</strong> che vivono
              sulla pelle e nell&apos;anima.
            </p>
          </div>

          {/* Stats Row */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '1600ms', animationFillMode: 'forwards' }}>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-8">
              <div className="space-y-2">
                <div className="font-cinzel text-4xl md:text-5xl text-gold-500">40%</div>
                <div className="font-inter text-xs uppercase tracking-wider text-stone-600">Concentrazione</div>
              </div>
              <div className="space-y-2 border-x border-stone-200">
                <div className="font-cinzel text-4xl md:text-5xl text-gold-500">12+</div>
                <div className="font-inter text-xs uppercase tracking-wider text-stone-600">Ore Durata</div>
              </div>
              <div className="space-y-2">
                <div className="font-cinzel text-4xl md:text-5xl text-gold-500">100%</div>
                <div className="font-inter text-xs uppercase tracking-wider text-stone-600">Artigianale</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '2000ms', animationFillMode: 'forwards' }}>
            <a href="#valori" className="inline-flex items-center gap-2 px-8 py-4 border border-gold-500/50 text-gold-600 font-inter text-sm uppercase tracking-wide rounded-sm hover:bg-gold-500/10 hover:border-gold-500 transition-all duration-300">
              <span>Scopri i Nostri Valori</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
