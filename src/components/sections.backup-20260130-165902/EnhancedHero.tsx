'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { TextReveal } from '@/components/effects/TextReveal';

export function EnhancedHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToAbout = () => {
    window.location.href = '/about';
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Parallax Video Background */}
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110"
        >
          <source src="/uploads/videos/cristallo-background.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Animated Logo */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-12"
          >
            <motion.h1
              className="font-cinzel text-6xl md:text-8xl lg:text-9xl font-bold text-gold tracking-[0.3em] mb-6"
              style={{
                textShadow:
                  '0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.3), 0 0 90px rgba(212,175,55,0.2)',
              }}
              animate={{
                textShadow: [
                  '0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.3)',
                  '0 0 40px rgba(212,175,55,0.6), 0 0 80px rgba(212,175,55,0.4)',
                  '0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.3)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              OZ EXTRAIT
            </motion.h1>
            <motion.div
              className="h-1 w-80 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              style={{
                boxShadow: '0 0 20px rgba(212,175,55,0.6)',
              }}
            />
          </motion.div>
        )}

        {/* Tagline with Text Reveal */}
        <div className="mb-10 max-w-4xl">
          <TextReveal
            className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white leading-tight"
            delay={0.5}
          >
            L'Arte della Profumeria
          </TextReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <span className="font-playfair text-4xl md:text-6xl lg:text-7xl text-gold font-semibold tracking-wide block mt-2">
              Extrait de Parfum
            </span>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="font-inter text-lg md:text-xl lg:text-2xl text-white/80 mb-16 max-w-3xl leading-relaxed"
        >
          Fragranze artigianali di lusso con concentrazione 40%
          <br />
          <span className="text-gold-light">Creato con passione da Zoe Cristofoli</span>
        </motion.p>

        {/* CTA Buttons with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <MagneticButton
            onClick={scrollToProducts}
            intensity={0.5}
            className="px-16 py-6 bg-gold text-black font-inter font-bold text-lg rounded-full uppercase tracking-wider shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:shadow-[0_0_80px_rgba(212,175,55,0.8)] hover:bg-gold-light transition-all duration-300"
          >
            Esplora i Profumi
          </MagneticButton>

          <MagneticButton
            onClick={navigateToAbout}
            intensity={0.5}
            className="px-16 py-6 bg-transparent border-2 border-gold text-gold font-inter font-bold text-lg rounded-full uppercase tracking-wider hover:border-gold-light hover:text-gold-light hover:bg-gold/10 transition-all duration-300"
          >
            La Nostra Storia
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
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
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
