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
        <div className="mb-8 animate-fade-in">
          <h1 className="font-cinzel text-hero font-bold text-gold tracking-wider mb-4 text-shadow-luxury">
            OZ EXTRAIT
          </h1>
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        {/* Tagline */}
        <p className="font-playfair text-2xl md:text-4xl text-white/90 mb-8 max-w-3xl animate-slide-up animation-delay-200">
          L'Arte della Profumeria
          <br />
          <span className="text-gold-light">Extrait de Parfum</span>
        </p>

        {/* Description */}
        <p className="font-inter text-base md:text-lg text-white/70 mb-12 max-w-2xl leading-relaxed animate-slide-up animation-delay-400">
          Fragranze artigianali di lusso con concentrazione 40%. Creato con passione da Zoe Cristofoli.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-600">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Scopri le Fragranze
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              window.location.href = '/about';
            }}
          >
            La Nostra Storia
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gold/60"
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
