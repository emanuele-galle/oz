'use client';

/**
 * HOMEPAGE HERO — Scroll-Driven Frame Animation (v5 rebuild)
 * Apple-style sticky canvas that plays 81 frames on scroll.
 *
 * Key design decisions:
 *  - Section bg is cream (#FBF8F3) to match next section — NO black gaps
 *  - Static first frame loads instantly (no JS wait)
 *  - Canvas activates on first frame load, progressive frame loading
 *  - Fade-to-cream at end of scroll for seamless section transition
 *  - Uses 100dvh for sticky viewport (handles mobile browser chrome)
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 81;
const FRAME_PATH = '/uploads/frames/scintilla/frame-';
const CREAM = '#FBF8F3';

function frameSrc(i: number): string {
  return `${FRAME_PATH}${String(Math.min(Math.max(i, 1), TOTAL_FRAMES)).padStart(3, '0')}.jpg`;
}

export function HomepageHeroLuxury() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [canvasReady, setCanvasReady] = useState(false);
  const frameRef = useRef(0);
  const rafRef = useRef(0);
  const router = useRouter();

  /* ── scroll tracking ─────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Frame animation uses first 90% of scroll, last 10% is fade-out
  const frameProgress = useTransform(scrollYProgress, [0, 0.88], [0, 1], { clamp: true });

  /* ── text layers ─────────────────────────────────────── */
  const logoOpacity    = useTransform(scrollYProgress, [0, 0.05, 0.30, 0.38], [1, 1, 1, 0]);
  const logoY          = useTransform(scrollYProgress, [0.30, 0.38], [0, -50]);
  const subtitleOpacity= useTransform(scrollYProgress, [0, 0.01, 0.30, 0.38], [1, 1, 1, 0]);
  const taglineOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.62, 0.70], [0, 1, 1, 0]);
  const descOpacity    = useTransform(scrollYProgress, [0.62, 0.72, 0.88], [0, 1, 1]);
  const ctaOpacity     = useTransform(scrollYProgress, [0.68, 0.78, 0.88], [0, 1, 1]);
  const arrowOpacity   = useTransform(scrollYProgress, [0, 0.04, 0.82, 0.88], [1, 1, 1, 0]);

  // Fade to cream at end — short and tight, no wasted space
  const fadeToCreem    = useTransform(scrollYProgress, [0.92, 1], [0, 1]);

  /* ── frame preloading ────────────────────────────────── */
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      if (i === 1) img.onload = () => setCanvasReady(true);
      imgs[i - 1] = img;
    }
    imagesRef.current = imgs;
  }, []);

  /* ── canvas drawing ──────────────────────────────────── */
  const draw = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[idx];
    if (!canvas || !ctx || !img?.complete) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const { width: cw, height: ch } = canvas.getBoundingClientRect();

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.scale(dpr, dpr);
    }

    // Cover behavior
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.max(cw / iw, ch / ih);
    const dw = iw * s, dh = ih * s;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  /* ── scroll → frame mapping ──────────────────────────── */
  useMotionValueEvent(frameProgress, 'change', (p) => {
    const target = Math.min(Math.floor(p * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
    if (target === frameRef.current) return;

    // Find closest loaded frame
    let idx = target;
    if (!imagesRef.current[target]?.complete) {
      for (let off = 1; off < 10; off++) {
        if (target - off >= 0 && imagesRef.current[target - off]?.complete) {
          idx = target - off;
          break;
        }
      }
    }

    frameRef.current = idx;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => draw(idx));
  });

  /* ── init & resize ───────────────────────────────────── */
  useEffect(() => {
    if (!canvasReady) return;
    draw(0);
    const onResize = () => {
      const c = canvasRef.current;
      if (c) { c.width = 0; c.height = 0; }
      draw(frameRef.current);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [canvasReady, draw]);

  const scrollToProducts = () =>
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /* ── render ──────────────────────────────────────────── */
  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '180vh', backgroundColor: CREAM, zIndex: 0 }}
    >
      {/* Sticky full-screen viewport — 100dvh handles mobile browser chrome */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100dvh' }}>

        {/* BG 1: Static first frame — instant, no JS */}
        <img
          src={frameSrc(1)}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />

        {/* BG 2: Canvas — crossfades over static image */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full transition-opacity duration-500"
          style={{ opacity: canvasReady ? 1 : 0 }}
        />

        {/* Gradient for text readability */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/15 via-transparent via-50% to-black/60" />

        {/* Logo — centered */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{ opacity: logoOpacity, y: logoY }}
        >
          <img
            src="/uploads/images/logo.png"
            alt="OZ Extrait"
            className="h-24 md:h-36 lg:h-44 w-auto drop-shadow-[0_0_60px_rgba(212,175,55,0.4)]"
          />
        </motion.div>

        {/* Bottom text content */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 md:pb-14">
          <div className="mx-auto max-w-3xl text-center">

            {/* Subtitle — visible immediately at scroll 0 */}
            <motion.p
              style={{ opacity: subtitleOpacity }}
              className="font-playfair text-xl md:text-2xl lg:text-3xl text-white/90 italic font-light tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              Extrait de Parfum
            </motion.p>

            {/* Tagline — appears mid-scroll */}
            <motion.div style={{ opacity: taglineOpacity }} className="mt-3">
              <p className="font-playfair text-lg md:text-2xl lg:text-3xl text-white/95 italic font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Extrait de Parfum. Extrait d&apos;Âme.
              </p>
              <p className="font-inter text-[11px] md:text-sm text-white/45 mt-1.5 tracking-wide font-light">
                Estratto di Profumo. Estratto d&apos;Anima.
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              style={{ opacity: descOpacity }}
              className="mt-4 font-inter text-sm md:text-base text-white/55 max-w-xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            >
              Tre fragranze artigianali al 40% di concentrazione.
              <span className="hidden md:inline"> Heritage veronese. Visione contemporanea.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              style={{ opacity: ctaOpacity }}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={scrollToProducts}
                className="px-8 py-3 bg-gold-500 text-stone-950 font-inter text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 hover:shadow-gold-medium transition-all duration-500"
              >
                Scopri le Fragranze
              </button>
              <button
                onClick={() => router.push('/zoe-cristofoli')}
                className="px-8 py-3 bg-white/15 backdrop-blur-sm border border-white/50 text-white font-inter text-xs font-medium uppercase tracking-[0.15em] hover:bg-white/25 hover:border-white/70 transition-all duration-300"
              >
                La Storia
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: arrowOpacity }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.div>

        {/* Fade-to-cream overlay — covers everything at end of scroll */}
        <motion.div
          style={{ opacity: fadeToCreem }}
          className="absolute inset-0 z-30 pointer-events-none"
          aria-hidden
        >
          <div className="h-full w-full" style={{ backgroundColor: CREAM }} />
        </motion.div>
      </div>
    </section>
  );
}
