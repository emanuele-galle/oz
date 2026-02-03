'use client';

/**
 * PROCESS HERO — Craftsmanship Journey
 * Design: Video loop + Typography overlay
 * @version 2.0 - Luxury redesign
 */

import React, { useEffect, useRef, useState } from 'react';

export function ProcessHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-50">
      {/* Video Background */}
      <video ref={videoRef} autoPlay loop muted playsInline onLoadedData={() => setIsVideoLoaded(true)} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <source src="/uploads/videos/cristallo-background.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <span className="font-inter text-xs md:text-sm uppercase tracking-[0.25em] text-gold-400/70">Dietro le Quinte</span>
          </div>

          <div className="animate-fade-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <h1 className="font-cinzel text-[48px] md:text-[72px] lg:text-[84px] leading-[1.1] tracking-tight text-white mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              Il Nostro
              <br />
              <span className="text-gold-400">Processo</span>
            </h1>
            <div className="h-[2px] w-20 mx-auto bg-gold-500" />
          </div>

          <div className="animate-fade-in opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <p className="font-playfair text-xl md:text-2xl lg:text-3xl text-white/90 leading-[1.5] italic max-w-2xl mx-auto">
              Dalle essenze più pure alla bottiglia:
              <br />
              un viaggio di <span className="text-gold-400 not-italic font-semibold">12 settimane</span>
            </p>
          </div>

          <div className="animate-fade-in opacity-0" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
            <p className="font-inter text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              Ogni fragranza OZ Extrait attraversa 5 fasi di creazione artigianale,
              dalla selezione degli ingredienti al controllo qualità finale.
              <br className="hidden md:block" />
              Un processo che non accetta compromessi.
            </p>
          </div>

          <div className="animate-fade-in opacity-0" style={{ animationDelay: '1600ms', animationFillMode: 'forwards' }}>
            <div className="grid grid-cols-5 gap-2 md:gap-4 max-w-3xl mx-auto pt-8">
              {['Selezione', 'Blending', 'Macerazione', 'Imbottigliamento', 'QA'].map((step, index) => (
                <div key={index} className="p-3 md:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm hover:bg-white/10 hover:border-gold-500/30 transition-all duration-300">
                  <div className="font-cinzel text-xl md:text-2xl text-gold-500 mb-1">{index + 1}</div>
                  <div className="font-inter text-[10px] md:text-xs text-white/70 uppercase tracking-wide">{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in opacity-0" style={{ animationDelay: '2000ms', animationFillMode: 'forwards' }}>
            <a href="#step-1" className="inline-flex items-center gap-2 font-inter text-sm uppercase tracking-wide text-gold-400 hover:text-gold-300 transition-colors duration-300 group">
              <span>Esplora il processo</span>
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

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
