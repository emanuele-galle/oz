'use client';

/**
 * BRAND STORY HERO — Photo Essay Style
 * Design: Full-width portrait + Typography overlay minimal
 * @version 2.0 - Luxury redesign
 */

import React from 'react';
import Image from 'next/image';

export function BrandStoryHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/uploads/images/Zoe-Cristofoli.jpeg" alt="Zoe Cristofoli — Founder & Creative Director" fill className="object-cover object-top" priority quality={95} sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-luxury">
          <div className="max-w-2xl space-y-6">
            <div>
              <span className="inline-block px-3 py-1 border border-gold-500/30 text-gold-500 font-inter text-xs uppercase tracking-[0.15em]">
                La Fondatrice
              </span>
            </div>

            <h1 className="font-cinzel text-[56px] md:text-[72px] lg:text-[96px] leading-[0.95] text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              Zoe
              <br />
              <span className="text-gold-500">Cristofoli</span>
            </h1>

            <div className="h-[2px] w-16 bg-gold-500" />

            <p className="font-playfair text-2xl md:text-3xl text-white/90 leading-[1.4] max-w-xl">
              Dalla passione per l'arte
              <br />
              all'universo della profumeria di lusso
            </p>

            <p className="font-inter text-base md:text-lg text-white/70 leading-relaxed max-w-lg">
              Influencer, artista, visionaria. Con OZ Extrait, Zoe porta
              la sua autenticità e audacia nel mondo della profumeria
              artigianale italiana.
            </p>

            <div className="pt-6">
              <a href="#storia" className="inline-flex items-center gap-2 font-inter text-sm uppercase tracking-wide text-gold-400 hover:text-gold-300 transition-colors duration-300 group">
                <span>Leggi la storia</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <span className="font-inter text-xs uppercase tracking-wider text-white/40">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
