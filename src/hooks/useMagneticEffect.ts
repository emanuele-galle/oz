'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface UseMagneticEffectOptions {
  strength?: number;
  damping?: number;
  stiffness?: number;
}

/**
 * Hook per effetto magnetic hover luxury
 * L'elemento segue il cursor con smooth spring physics
 *
 * @param strength - Intensità magnetic effect (0-1, default 0.3)
 * @param damping - Spring damping (default 25)
 * @param stiffness - Spring stiffness (default 200)
 *
 * @returns { x, y } - MotionValues da applicare a motion.div
 *
 * @example
 * const buttonRef = useRef(null);
 * const { x, y } = useMagneticEffect(buttonRef, { strength: 0.3 });
 *
 * <motion.button ref={buttonRef} style={{ x, y }}>
 *   Magnetic Button
 * </motion.button>
 */
export function useMagneticEffect<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options: UseMagneticEffectOptions = {}
) {
  const { strength = 0.3, damping = 25, stiffness = 200 } = options;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping, stiffness };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calcola distanza dal centro
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Applica magnetic pull (percentage of element size)
      x.set(deltaX * strength);
      y.set(deltaY * strength);
    };

    const handleMouseLeave = () => {
      // Reset position con smooth spring
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength, x, y]);

  return { x: smoothX, y: smoothY };
}
