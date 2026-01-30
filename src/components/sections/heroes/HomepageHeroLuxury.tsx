'use client';

/**
 * HOMEPAGE HERO LUXURY — OZ Extrait
 * Design Philosophy: Italian luxury heritage meets contemporary minimalism
 * Inspired by: Byredo minimalism + Venetian glass craftsmanship + editorial storytelling
 * @version 3.0 - Complete redesign
 */

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export function HomepageHeroLuxury() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-900">
      {/* Video Background with Parallax */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/uploads/videos/cristallo-background.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay - Sofisticato */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/60 to-stone-900/80" />

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-stone-900/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Spacer */}
        <div className="flex-1" />

        {/* Main Content - Centro verticale */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12">
          <div className="max-w-6xl mx-auto text-center">
            {/* Overline - Subtitle elegante */}
            <div
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <p className="font-inter text-xs md:text-sm uppercase tracking-[0.3em] text-white/60 mb-8 font-light">
                Verona · Italia
              </p>
            </div>

            {/* Main Title - Enorme, statement piece */}
            <div
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              <h1 className="font-cinzel text-[72px] md:text-[120px] lg:text-[160px] leading-[0.85] tracking-tighter text-white mb-8 [text-shadow:_0_8px_32px_rgb(0_0_0_/_0.9)]">
                OZ
                <br />
                <span className="text-gold-400 italic font-playfair font-normal text-[0.4em] tracking-wide">
                  Extrait
                </span>
              </h1>
            </div>

            {/* Divider decorativo */}
            <div
              className="animate-fade-in opacity-0 flex items-center justify-center gap-6 mb-8"
              style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
            >
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
              <div className="w-2 h-2 bg-gold-500 rotate-45" />
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
            </div>

            {/* Tagline - Poetico */}
            <div
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
            >
              <p className="font-playfair text-2xl md:text-4xl lg:text-5xl text-white/95 leading-[1.4] max-w-4xl mx-auto mb-4 italic font-light [text-shadow:_0_4px_16px_rgb(0_0_0_/_0.7)]">
                Extrait de Parfum.
                <br />
                <span className="text-gold-400 not-italic font-normal">Extrait d'Âme.</span>
              </p>
            </div>

            {/* Description */}
            <div
              className="animate-fade-in opacity-0"
              style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
            >
              <p className="font-inter text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-12 font-light [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.6)]">
                Tre fragranze artigianali al 40% di concentrazione.
                <br className="hidden md:block" />
                Heritage veneziano. Visione contemporanea.
              </p>
            </div>

            {/* CTAs - Eleganti */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in opacity-0"
              style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}
            >
              <button
                onClick={scrollToProducts}
                className="group relative px-12 py-5 bg-white text-stone-900 font-inter text-sm font-medium uppercase tracking-[0.15em] overflow-hidden hover:text-white transition-colors duration-500"
              >
                <span className="relative z-10">Scopri le Fragranze</span>
                <div className="absolute inset-0 bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>

              <button
                onClick={() => router.push('/il-brand/storia')}
                className="px-12 py-5 border border-white/40 text-white font-inter text-sm font-medium uppercase tracking-[0.15em] hover:bg-white/10 hover:border-white/60 backdrop-blur-sm transition-all duration-300"
              >
                La Storia
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Bottom */}
        <div className="flex-1 flex items-end justify-center pb-12">
          <button
            onClick={scrollToProducts}
            className="animate-fade-in opacity-0 group flex flex-col items-center gap-3"
            style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}
          >
            <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/40 font-light">
              Scorri
            </span>
            <ChevronDown className="w-5 h-5 text-white/40 group-hover:text-white/60 animate-bounce transition-colors" />
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-fade-in-up {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
