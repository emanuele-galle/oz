/**
 * Micro-interactions Animation Library
 * Centralized animation variants per luxury brand consistency
 */

import { Variants } from 'framer-motion';

// ========================
// EASING PRESETS
// ========================

const easings = {
  luxury: [0.19, 1.0, 0.22, 1.0] as const, // cubic-bezier luxury
};

// ========================
// BUTTON ANIMATIONS
// ========================

export const buttonVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
    transition: {
      duration: 0.3,
      ease: easings.luxury,
    },
  },
  tap: {
    scale: 0.97,
    transition: {
      duration: 0.1,
    },
  },
};

// ========================
// RIPPLE EFFECT
// ========================

export const rippleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0.8,
  },
  animate: {
    scale: 2.5,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};
