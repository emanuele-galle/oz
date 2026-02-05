'use client';

/**
 * HOMEPAGE HERO — Scroll-Driven Frame Animation (v6)
 * Apple-style sticky canvas that plays 81 frames on scroll.
 * Trust badges embedded in sticky viewport for seamless transition.
 *
 * Key design decisions:
 *  - Section bg is cream (#FBF8F3) to match next section — NO black gaps
 *  - Static first frame loads instantly (no JS wait)
 *  - Canvas activates on first frame load, progressive frame loading
 *  - Fade-to-cream at end of scroll with trust badges appearing inside
 *  - Uses 100dvh for sticky viewport (handles mobile browser chrome)
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

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

  /* ── scroll tracking ─────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Frame animation uses first 88% of scroll, last 12% is fade-out + trust badges
  const frameProgress = useTransform(scrollYProgress, [0, 0.88], [0, 1], { clamp: true });

  /* ── text layers ─────────────────────────────────────── */
  const logoOpacity    = useTransform(scrollYProgress, [0, 0.05, 0.30, 0.38], [1, 1, 1, 0]);
  const logoY          = useTransform(scrollYProgress, [0.30, 0.38], [0, -50]);
  const subtitleOpacity= useTransform(scrollYProgress, [0, 0.01, 0.30, 0.38], [1, 1, 1, 0]);
  const taglineOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.78, 0.88], [0, 1, 1, 0]);
  const arrowOpacity   = useTransform(scrollYProgress, [0, 0.04, 0.78, 0.86], [1, 1, 1, 0]);

  // Fade to cream at end
  const fadeToCreem    = useTransform(scrollYProgress, [0.88, 1], [0, 1]);

  // Trust badges appear during cream fade (slightly delayed)
  const trustOpacity   = useTransform(scrollYProgress, [0.91, 0.98], [0, 1]);
  const trustY         = useTransform(scrollYProgress, [0.91, 0.98], [30, 0]);

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
      style={{ height: '200vh', backgroundColor: CREAM, zIndex: 0 }}
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

            {/* Mobile CTA — visible immediately, no scroll needed */}
            <motion.div
              style={{ opacity: subtitleOpacity }}
              className="mt-6 flex lg:hidden flex-col items-center justify-center gap-3"
            >
              <button
                onClick={scrollToProducts}
                className="px-8 py-3 bg-gold-500 text-stone-950 font-inter text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 transition-all duration-500"
              >
                Scopri le Fragranze
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

        {/* Trust badges — appear inside sticky viewport during cream fade */}
        <motion.div
          style={{ opacity: trustOpacity, y: trustY }}
          className="absolute inset-x-0 bottom-0 z-40 pb-8 md:pb-12"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  ),
                  title: 'Spedizione Gratuita',
                  desc: `Ordini sopra €${FREE_SHIPPING_THRESHOLD}`,
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  ),
                  title: 'Campioni Omaggio',
                  desc: 'Scopri le altre fragranze',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: 'Garanzia Qualità',
                  desc: 'Soddisfatti o rimborsati',
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  ),
                  title: 'Confezione Regalo',
                  desc: 'Packaging luxury incluso',
                },
              ].map((f, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-3 border border-stone-200 text-gold-500">
                    {f.icon}
                  </div>
                  <h3 className="font-cinzel text-base text-stone-800 mb-1 tracking-tight">{f.title}</h3>
                  <p className="font-inter text-xs text-stone-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
