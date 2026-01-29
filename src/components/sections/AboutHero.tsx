'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

export function AboutHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/uploads/images/Zoe-Cristofoli.jpeg"
          alt="Zoe Cristofoli - Founder OZ Extrait"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury py-32">
        <div className="max-w-3xl">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 border border-gold/30 text-gold text-sm uppercase tracking-wider font-inter mb-6">
              La Fondatrice
            </span>
            <h1 className="font-cinzel text-6xl md:text-7xl lg:text-8xl text-gold mb-6 animate-slide-up">
              Zoe Cristofoli
            </h1>
            <div className="h-1 w-32 bg-gold mb-8" />
          </div>

          <p className="font-playfair text-2xl md:text-3xl text-white/90 leading-relaxed mb-8 animate-slide-up animation-delay-200">
            Dalla passione per l'arte del tatuaggio all'universo della profumeria di lusso.
          </p>

          <p className="font-inter text-lg text-white/70 leading-relaxed mb-8 animate-slide-up animation-delay-400">
            Influencer, modella, e ora creatrice di fragranze. Con oltre 1 milione di follower su Instagram,
            Zoe Cristofoli porta la sua visione audace e autentica nel mondo della profumeria d'autore.
          </p>

          <div className="flex flex-wrap gap-6 animate-slide-up animation-delay-600">
            <div className="glass-card px-6 py-4">
              <div className="text-3xl font-cinzel text-gold mb-1">1M+</div>
              <div className="text-sm text-white/60 font-inter uppercase tracking-wide">
                Instagram Followers
              </div>
            </div>
            <div className="glass-card px-6 py-4">
              <div className="text-3xl font-cinzel text-gold mb-1">2024</div>
              <div className="text-sm text-white/60 font-inter uppercase tracking-wide">
                Brand Launch
              </div>
            </div>
            <div className="glass-card px-6 py-4">
              <div className="text-3xl font-cinzel text-gold mb-1">3</div>
              <div className="text-sm text-white/60 font-inter uppercase tracking-wide">
                Signature Fragrances
              </div>
            </div>
          </div>
        </div>
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
    </section>
  );
}
