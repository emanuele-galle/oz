'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for scroll-triggered reveal animations
 * Elements fade in and slide up when scrolling into view
 */
export function useScrollReveal(options: {
  delay?: number;
  duration?: number;
  y?: number;
} = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { delay = 0, duration = 0.8, y = 60 } = options;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y,
    });

    // Create scroll trigger animation
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [options.delay, options.duration, options.y]);

  return ref;
}

/**
 * Hook for stagger animations on children elements
 * Multiple elements animate in sequence
 */
export function useStaggerReveal(staggerDelay: number = 0.1) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const children = Array.from(element.children) as HTMLElement[];

    // Set initial state for all children
    gsap.set(children, {
      opacity: 0,
      y: 40,
    });

    // Create stagger animation
    const animation = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: staggerDelay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [staggerDelay]);

  return ref;
}

/**
 * Hook for parallax scrolling effect
 * Element moves at different speed than scroll
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const animation = gsap.to(element, {
      y: () => -element.offsetHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return ref;
}

/**
 * Hook for number counter animation
 * Counts up from 0 to target value
 */
export function useCountUp(target: number, duration: number = 2) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const obj = { value: 0 };

    const animation = gsap.to(obj, {
      value: target,
      duration,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (element) {
          // Format number with proper separators
          element.textContent = Math.round(obj.value).toLocaleString();
        }
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [target, duration]);

  return ref;
}

/**
 * Hook for scale-in animation
 * Element scales from smaller to normal size
 */
export function useScaleIn(options: { delay?: number; scale?: number } = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { delay = 0, scale = 0.8 } = options;

    gsap.set(element, {
      opacity: 0,
      scale,
    });

    const animation = gsap.to(element, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [options.delay, options.scale]);

  return ref;
}
