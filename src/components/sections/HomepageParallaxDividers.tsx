'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface DividerProps {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
  overlayOpacity?: string;
}

function ParallaxDivider({ imageSrc, imageAlt, title, subtitle, overlayOpacity: overlayClass = 'bg-stone-900/40' }: DividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={ref} className="relative h-[35vh] md:h-[60vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover scale-110"
          quality={85}
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </motion.div>

      {(title || subtitle) && (
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          {title && (
            <h2 className="font-cinzel text-4xl md:text-6xl lg:text-7xl text-gold-500 mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="font-playfair text-xl md:text-2xl text-white/90 max-w-3xl italic">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}
    </section>
  );
}

/**
 * CREAM DIVIDER — Elegant text-only divider for light theme
 * Replaces heavy parallax images with refined typography
 */
interface CreamDividerProps {
  overline: string;
  title: string;
  subtitle: string;
}

function CreamDivider({ overline, title, subtitle }: CreamDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-14 md:py-20 bg-[#FBF8F3] overflow-hidden">
      {/* Subtle gold dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 container-luxury text-center"
      >
        <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70 font-light">
          {overline}
        </span>
        <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-stone-900 mt-4 mb-6 tracking-tight">
          {title}
        </h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/40" />
          <div className="w-2 h-2 bg-gold-500/40 rotate-45" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/40" />
        </div>
        <p className="font-playfair text-xl md:text-2xl text-stone-500 max-w-3xl mx-auto italic leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}

export function ParallaxDividerFirst() {
  return (
    <CreamDivider
      overline="L'Eccellenza"
      title="L'Essenza del Lusso"
      subtitle="Ogni goccia racconta una storia di eccellenza artigianale e passione italiana"
    />
  );
}

export function ParallaxDividerSecond() {
  return (
    <ParallaxDivider
      imageSrc="/uploads/images/Box vetrina.jpeg"
      imageAlt="Confezionato a mano - OZ Extrait"
      overlayOpacity="bg-stone-900/20"
    />
  );
}

export function ParallaxDividerThird() {
  return (
    <CreamDivider
      overline="L'Arte Olfattiva"
      title="Ogni Nota Racconta"
      subtitle="Fragranze che evolvono sulla pelle, capitolo dopo capitolo, in un viaggio sensoriale unico"
    />
  );
}
