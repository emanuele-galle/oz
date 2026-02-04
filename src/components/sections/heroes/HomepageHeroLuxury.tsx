'use client';

/**
 * HOMEPAGE HERO — Scroll-Driven Frame Animation
 * Design: Apple-style sticky canvas that plays video frames on scroll
 * 81 frames from Scintilla video — golden bottle reveal with splash
 * @version 3.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 81;
const FRAME_PATH = '/uploads/frames/scintilla/frame-';

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(3, '0');
  return `${FRAME_PATH}${num}.jpg`;
}

export function HomepageHeroLuxury() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const router = useRouter();

  // Scroll progress across the tall section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Text opacity transforms based on scroll
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.08], [0.7, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.35, 0.45], [1, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.05, 0.35, 0.45], [0, 0, 0, -60]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.08, 0.15, 0.35, 0.45], [0, 1, 1, 0]);
  const taglineOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.78], [0, 1, 1, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.92, 1], [0, 1, 1]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [1, 1, 1, 0]);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === TOTAL_FRAMES) setIsReady(true);
      };
      images[i - 1] = img;
    }

    imagesRef.current = images;
  }, []);

  // Draw frame on canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img || !img.complete) return;

    // Set canvas to match display size
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    // Draw with cover behavior
    const cw = rect.width;
    const ch = rect.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Update frame on scroll
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const frameIndex = Math.min(
      Math.floor(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    }
  });

  // Draw first frame when ready & handle resize
  useEffect(() => {
    if (isReady) {
      drawFrame(0);

      const handleResize = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          // Reset canvas dimensions on resize
          canvas.width = 0;
          canvas.height = 0;
        }
        drawFrame(currentFrameRef.current);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isReady, drawFrame]);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const loadProgress = Math.round((imagesLoaded / TOTAL_FRAMES) * 100);

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-stone-950">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: isReady ? 'block' : 'none' }}
        />

        {/* Loading state — first frame as fallback */}
        {!isReady && (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-amber-700/60 to-amber-900/80 flex items-center justify-center">
            <div className="text-center">
              <img
                src="/uploads/images/logo.png"
                alt="OZ Extrait"
                className="h-20 md:h-28 lg:h-36 w-auto mx-auto drop-shadow-[0_0_40px_rgba(212,175,55,0.3)]"
              />
              <div className="mt-8 w-48 h-[2px] bg-white/10 mx-auto rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-500 transition-all duration-300 rounded-full"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Gradient — only at bottom for text area, keeps video clean */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none" />

        {/* Logo — centered, visible at start, fades before bottle */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/uploads/images/logo.png"
            alt="OZ Extrait"
            className="h-24 md:h-36 lg:h-44 w-auto drop-shadow-[0_0_60px_rgba(212,175,55,0.4)]"
          />
        </motion.div>

        {/* Bottom text area — all content pinned to bottom, doesn't cover the bottle */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8">
          <div className="max-w-4xl mx-auto text-center">

            {/* Extrait subtitle — appears as video starts */}
            <motion.p
              style={{ opacity: subtitleOpacity }}
              className="font-playfair text-2xl md:text-3xl text-white/90 italic font-light tracking-wider mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              Extrait de Parfum
            </motion.p>

            {/* Tagline — appears during full reveal */}
            <motion.div style={{ opacity: taglineOpacity }} className="mb-4">
              <p className="font-playfair text-xl md:text-2xl lg:text-3xl text-white/95 italic font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Extrait de Parfum. Extrait d&apos;Âme.
              </p>
              <p className="font-inter text-xs md:text-sm text-white/50 mt-2 tracking-wide font-light">
                Estratto di Profumo. Estratto d&apos;Anima.
              </p>
            </motion.div>

            {/* Description — appears at the end */}
            <motion.p
              style={{ opacity: descOpacity }}
              className="font-inter text-sm md:text-base text-white/60 max-w-xl mx-auto leading-relaxed font-light mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            >
              Tre fragranze artigianali al 40% di concentrazione.
              <span className="hidden md:inline"> Heritage veronese. Visione contemporanea.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              style={{ opacity: ctaOpacity }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={scrollToProducts}
                className="px-8 py-3 bg-gold-500 text-stone-950 font-inter text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 hover:shadow-gold-medium transition-all duration-500"
              >
                Scopri le Fragranze
              </button>

              <button
                onClick={() => router.push('/il-brand/storia')}
                className="px-8 py-3 bg-white/15 backdrop-blur-sm border border-white/50 text-white font-inter text-xs font-medium uppercase tracking-[0.15em] hover:bg-white/25 hover:border-white/70 transition-all duration-300"
              >
                La Storia
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator — top of bottom area */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pb-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-gold-500/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
