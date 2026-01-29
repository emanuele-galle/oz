'use client';

import { useEffect, useState } from 'react';

/**
 * Hook per detect prefers-reduced-motion accessibility setting
 * Permette di disabilitare animazioni per utenti che preferiscono meno movimento
 *
 * @returns boolean - true se reduced motion è preferito, false altrimenti
 *
 * @example
 * const shouldReduceMotion = useReducedMotion();
 *
 * <motion.div
 *   animate={shouldReduceMotion ? undefined : { opacity: 1 }}
 *   initial={shouldReduceMotion ? undefined : { opacity: 0 }}
 * >
 *   Content
 * </motion.div>
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check se browser supporta matchMedia
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listener per cambiamenti runtime
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    // Add listener (supporta sia addEventListener che addListener per vecchi browser)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}
