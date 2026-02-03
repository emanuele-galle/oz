'use client';

/**
 * HOMEPAGE HERO LUXURY — OZ Extrait
 * Design: Dark & Bold — Tom Ford / YSL inspired
 * Deep black, gold shimmer, cinematic atmosphere
 */

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export function HomepageHeroLuxury() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video/Image Background — subtle overlay */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-30' : 'opacity-0'}`}
        >
          <source src="/uploads/videos/cristallo-background.mp4" type="video/mp4" />
        </video>

        {/* Poster fallback */}
        {!isVideoLoaded && (
          <Image
            src="/uploads/images/Cristallo.jpeg"
            alt=""
            fill
            className="object-cover opacity-25"
            priority
          />
        )}

        {/* Intense gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Overline */}
          <p className="font-inter text-xs md:text-sm uppercase tracking-[0.4em] text-gold-500/80 mb-8 font-light animate-fade-in">
            Verona · Italia
          </p>

          {/* Main Title — Prominent OZ with gold glow */}
          <h1 className="font-cinzel text-[80px] md:text-[110px] lg:text-[130px] leading-[0.85] tracking-tight text-white mb-4">
            <span className="text-gold-gradient drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]">
              OZ
            </span>
          </h1>
          <p className="font-playfair text-2xl md:text-3xl text-gold-400 italic font-light tracking-wider mb-10">
            Extrait
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/60" />
            <div className="w-1.5 h-1.5 bg-gold-500 rotate-45" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/60" />
          </div>

          {/* Tagline */}
          <p className="font-playfair text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-4 italic font-light">
            Extrait de Parfum.
            <br />
            <span className="text-gold-400 not-italic font-cinzel text-xl md:text-2xl lg:text-3xl">
              Extrait d'Âme.
            </span>
          </p>

          {/* Description */}
          <p className="font-inter text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-14 font-light">
            Tre fragranze artigianali al 40% di concentrazione.
            <br className="hidden md:block" />
            Heritage veneziano. Visione contemporanea.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={scrollToProducts}
              className="group relative px-10 py-4 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-[0.15em] overflow-hidden hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500"
            >
              Scopri le Fragranze
            </button>

            <button
              onClick={() => router.push('/il-brand/storia')}
              className="px-10 py-4 border border-gold-500/40 text-gold-400 font-inter text-sm font-medium uppercase tracking-[0.15em] hover:bg-gold-500/10 hover:border-gold-500/70 transition-all duration-300"
            >
              La Storia
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <button
            onClick={scrollToProducts}
            className="group flex flex-col items-center gap-2"
          >
            <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/30 font-light">
              Scorri
            </span>
            <ChevronDown className="w-5 h-5 text-gold-500/50 group-hover:text-gold-500 animate-bounce transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
}
