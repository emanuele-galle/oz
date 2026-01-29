/**
 * Micro-interactions Animation Library
 * Centralized animation variants per luxury brand consistency
 */

import { Variants } from 'framer-motion';

// ========================
// SPRING CONFIGS
// ========================

export const springConfigs = {
  luxury: {
    damping: 15,
    stiffness: 150,
  },
  smooth: {
    damping: 25,
    stiffness: 200,
  },
  snappy: {
    damping: 10,
    stiffness: 300,
  },
  gentle: {
    damping: 30,
    stiffness: 100,
  },
};

// ========================
// EASING PRESETS
// ========================

export const easings = {
  luxury: [0.19, 1.0, 0.22, 1.0] as const, // cubic-bezier luxury
  smooth: [0.25, 0.1, 0.25, 1.0] as const, // ease-in-out
  snappy: [0.4, 0.0, 0.2, 1.0] as const, // material design standard
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
// GLOW ANIMATIONS
// ========================

export const glowVariants: Variants = {
  idle: {
    boxShadow: '0 0 0px rgba(212, 175, 55, 0)',
  },
  hover: {
    boxShadow: [
      '0 0 20px rgba(212, 175, 55, 0.3)',
      '0 0 30px rgba(212, 175, 55, 0.5)',
      '0 0 20px rgba(212, 175, 55, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ========================
// SHIMMER ANIMATIONS
// ========================

export const shimmerVariants: Variants = {
  hidden: {
    x: '-100%',
    opacity: 0,
  },
  visible: {
    x: '200%',
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

// ========================
// 3D TILT ANIMATIONS
// ========================

export const tiltVariants: Variants = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: easings.luxury,
    },
  },
};

// ========================
// PARALLAX LAYERS
// ========================

export const parallaxVariants = {
  background: {
    z: -20,
  },
  foreground: {
    z: 20,
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

// ========================
// LOADING/SPINNER
// ========================

export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// ========================
// STAGGER CONTAINERS
// ========================

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.luxury,
    },
  },
};

// ========================
// FADE TRANSITIONS
// ========================

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.luxury,
    },
  },
  exit: { opacity: 0, y: -20 },
};

// ========================
// MODAL/LIGHTBOX
// ========================

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easings.luxury,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

// ========================
// TAB TRANSITIONS
// ========================

export const tabContentVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: easings.luxury,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
    },
  },
};
