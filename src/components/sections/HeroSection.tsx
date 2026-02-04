'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/uploads/videos/cristallo-background.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Animated logo/brand name */}
        <div className="mb-12 animate-fade-in">
          <h1 className="font-cinzel text-6xl md:text-8xl lg:text-9xl font-bold text-gold-600 tracking-widest mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
            OZ EXTRAIT
          </h1>
          <div className="h-1 w-80 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
        </div>

        {/* Tagline */}
        <p className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white mb-10 max-w-4xl animate-slide-up animation-delay-200 leading-tight">
          L'Arte della Profumeria
          <br />
          <span className="text-gold-600 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-wide">Extrait de Parfum</span>
        </p>

        {/* Description */}
        <p className="font-inter text-lg md:text-xl lg:text-2xl text-stone-700 mb-16 max-w-3xl leading-relaxed animate-slide-up animation-delay-400">
          Fragranze artigianali di lusso con concentrazione 40%
          <br />
          <span className="text-gold-light">Creato con passione da Zoe Cristofoli</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 animate-slide-up animation-delay-600">
          <Button
            variant="primary"
            size="xl"
            className="text-lg px-16 py-6 font-bold shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:shadow-[0_0_80px_rgba(212,175,55,0.8)] hover:scale-105 transition-all"
            onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Esplora i Profumi
          </Button>
          <Button
            variant="outline"
            size="xl"
            className="text-lg px-16 py-6 border-2 hover:border-gold-light hover:text-gold-light transition-all"
            onClick={() => {
              window.location.href = '/zoe-cristofoli';
            }}
          >
            La Nostra Storia
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gold-600/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
