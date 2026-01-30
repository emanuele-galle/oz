'use client';

/**
 * HOMEPAGE HERO — OZ Extrait
 * Design: Video protagonista + Typography impattante + Minimal overlay
 * @version 2.0 - Luxury-first redesign
 */

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export function HomepageHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-midnight">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src="/uploads/videos/cristallo-background.mp4" type="video/mp4" />
      </video>

      {/* Overlay per leggibilità */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Overline */}
          <div className="animate-fade-in">
            <p className="font-inter text-xs md:text-sm uppercase tracking-[0.2em] text-white/80 mb-6">
              Est. 2024 — Verona, Italia
            </p>
          </div>

          {/* Main Title */}
          <div className="animate-fade-in">
            <h1 className="font-cinzel text-[60px] md:text-[96px] lg:text-[120px] leading-[0.9] tracking-tight text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              OZ EXTRAIT
            </h1>
            <div className="h-[2px] w-24 mx-auto bg-gold-500 shadow-gold-medium" />
          </div>

          {/* Tagline */}
          <div className="animate-fade-in">
            <p className="font-playfair text-2xl md:text-4xl lg:text-5xl text-white leading-[1.3] max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Extrait de Parfum.
              <br />
              <span className="text-gold-400 italic">Extrait d'Âme.</span>
            </p>
          </div>

          {/* Description */}
          <div className="animate-fade-in">
            <p className="font-inter text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Tre fragranze artigianali al 40% di concentrazione.
              <br className="hidden md:block" />
              Heritage veneziano. Visione contemporanea.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-in">
            <button onClick={scrollToProducts} className="group px-8 md:px-12 py-4 md:py-5 bg-gold-500 text-midnight font-inter text-sm md:text-base font-semibold uppercase tracking-wide rounded-sm shadow-[0_0_24px_rgba(212,175,55,0.3)] hover:bg-gold-400 hover:shadow-[0_0_32px_rgba(212,175,55,0.5)] active:scale-[0.98] transition-all duration-300">
              <span className="inline-block group-hover:scale-105 transition-transform duration-300">
                Scopri le Fragranze
              </span>
            </button>

            <button onClick={() => router.push('/il-brand/storia')} className="px-8 md:px-12 py-4 md:py-5 border-2 border-gold-500 text-gold-500 font-inter text-sm md:text-base font-semibold uppercase tracking-wide rounded-sm hover:bg-gold-500/10 hover:border-gold-400 hover:text-gold-400 active:scale-[0.98] transition-all duration-300">
              La Storia di Zoe
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            <span className="font-inter text-xs uppercase tracking-wider text-white/40">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
