'use client';

import React from 'react';
import { useScrollReveal, useStaggerReveal, useParallax } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  type?: 'reveal' | 'stagger' | 'parallax';
  className?: string;
  delay?: number;
  staggerDelay?: number;
  parallaxSpeed?: number;
}

export function AnimatedSection({
  children,
  type = 'reveal',
  className = '',
  delay = 0,
  staggerDelay = 0.1,
  parallaxSpeed = 0.5,
}: AnimatedSectionProps) {
  const revealRef = useScrollReveal({ delay });
  const staggerRef = useStaggerReveal(staggerDelay);
  const parallaxRef = useParallax(parallaxSpeed);

  const ref = type === 'reveal' ? revealRef : type === 'stagger' ? staggerRef : parallaxRef;

  return (
    <div ref={ref as any} className={className}>
      {children}
    </div>
  );
}
