'use client';

/**
 * Client Effects — Global visual effects
 * SplashCursor: WebGL fluid simulation (React Bits)
 * Aurora: OGL shader aurora (React Bits)
 * ScrollProgress: reading progress bar
 */

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ScrollProgress = dynamic(
  () => import('@/components/ui/ScrollProgress').then((mod) => ({ default: mod.ScrollProgress })),
  { ssr: false }
);

const AnimatedMesh = dynamic(
  () => import('@/components/effects/AnimatedMesh').then((mod) => ({ default: mod.AnimatedMesh })),
  { ssr: false }
);

const SplashCursor = dynamic(
  () => import('@/components/effects/SplashCursor').then((mod) => ({ default: mod.SplashCursor })),
  { ssr: false }
);

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 769);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

export function ClientEffects() {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <>
      <ScrollProgress />
      {!prefersReduced && (
        <>
          {!isMobile && <AnimatedMesh />}
          <SplashCursor
            SIM_RESOLUTION={isMobile ? 32 : 64}
            DYE_RESOLUTION={isMobile ? 256 : 512}
            DENSITY_DISSIPATION={isMobile ? 5 : 4}
            VELOCITY_DISSIPATION={isMobile ? 3.5 : 2.5}
            SPLAT_RADIUS={isMobile ? 0.2 : 0.15}
            SPLAT_FORCE={isMobile ? 3000 : 4000}
            CURL={3}
          />
        </>
      )}
    </>
  );
}
