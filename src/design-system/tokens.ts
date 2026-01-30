/**
 * OZ EXTRAIT — DESIGN TOKENS MASTER FILE
 *
 * Sistema di design completo per luxury brand experience.
 * Importa e centralizza tutti i token: colors, typography, spacing, shadows.
 *
 * @version 2.0
 * @date 2026-01-30
 *
 * USAGE:
 * import { tokens } from '@/design-system/tokens';
 *
 * const myColor = tokens.colors.gold[500];
 * const mySpacing = tokens.spacing.section.desktop;
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacingSystem } from './spacing';
import { shadowSystem } from './shadows';

// ============================================================================
// MASTER TOKENS OBJECT
// ============================================================================

export const tokens = {
  /**
   * COLORS — Palette completa
   */
  colors,

  /**
   * TYPOGRAPHY — Type scale, families, weights
   */
  typography,

  /**
   * SPACING — Scale, semantic, containers
   */
  spacing: spacingSystem,

  /**
   * SHADOWS — Elevation, glow, text shadows
   */
  shadows: shadowSystem,
} as const;

// ============================================================================
// ANIMATION EASING — Curves per smooth animations
// ============================================================================

export const easingCurves = {
  /**
   * STANDARD — Default per quasi tutto
   */
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',

  /**
   * ACCELERATE — Easing out (elementi che entrano)
   */
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',

  /**
   * DECELERATE — Easing in (elementi che escono)
   */
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',

  /**
   * SHARP — Instant, no easing (rare, solo UI immediata)
   */
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',

  /**
   * BOUNCE — Elastic effect (usare con cautela)
   */
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  /**
   * SMOOTH — Extra smooth per animations luxury
   */
  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const;

// ============================================================================
// ANIMATION DURATIONS — Timing rigoroso
// ============================================================================

export const durations = {
  /**
   * INSTANT — <100ms (micro-interactions)
   */
  instant: '75ms',

  /**
   * FAST — 100-200ms (hover effects, tooltips)
   */
  fast: '150ms',

  /**
   * NORMAL — 200-300ms (transitions standard)
   */
  normal: '250ms',

  /**
   * SLOW — 300-500ms (animations more elaborate)
   */
  slow: '400ms',

  /**
   * SLOWER — 500-800ms (page transitions, reveals)
   */
  slower: '600ms',

  /**
   * SLOWEST — 800ms+ (dramatic effects, hero animations)
   */
  slowest: '1000ms',
} as const;

// ============================================================================
// MOTION PRESETS — Combined easing + duration
// ============================================================================

export const motionPresets = {
  /**
   * Fade in/out standard
   */
  fade: {
    duration: durations.normal,
    easing: easingCurves.standard,
  },

  /**
   * Slide in (da destra, sinistra, top, bottom)
   */
  slide: {
    duration: durations.slow,
    easing: easingCurves.decelerate,
  },

  /**
   * Scale (zoom in/out)
   */
  scale: {
    duration: durations.normal,
    easing: easingCurves.smooth,
  },

  /**
   * Reveal (wipe effect)
   */
  reveal: {
    duration: durations.slower,
    easing: easingCurves.smooth,
  },

  /**
   * Bounce (elastic)
   */
  bounce: {
    duration: durations.slow,
    easing: easingCurves.bounce,
  },
} as const;

// ============================================================================
// BLUR VALUES — Per glassmorphism effects
// ============================================================================

export const blur = {
  none: '0',
  sm: '4px',      // Subtle blur
  md: '8px',      // Medium blur (glass cards)
  lg: '16px',     // Strong blur (modals, overlays)
  xl: '24px',     // Extra blur (backgrounds)
  '2xl': '40px',  // Maximum blur (dramatic effects)
} as const;

// ============================================================================
// OPACITY PRESETS — Per layering
// ============================================================================

export const opacityPresets = {
  /**
   * Text opacity su backgrounds scuri
   */
  textOnDark: {
    primary: '1',      // 100% (headings)
    secondary: '0.8',  // 80% (body text)
    tertiary: '0.6',   // 60% (captions, metadata)
    disabled: '0.4',   // 40% (disabled states)
  },

  /**
   * Text opacity su backgrounds chiari
   */
  textOnLight: {
    primary: '1',      // 100% (headings)
    secondary: '0.9',  // 90% (body text)
    tertiary: '0.7',   // 70% (captions)
    disabled: '0.5',   // 50% (disabled)
  },

  /**
   * Overlay opacity
   */
  overlay: {
    light: '0.3',      // 30% (subtle darkening)
    medium: '0.5',     // 50% (standard overlay)
    heavy: '0.7',      // 70% (strong darkening)
    solid: '0.95',     // 95% (quasi opaco)
  },
} as const;

// ============================================================================
// BORDER WEIGHTS — Stroke thickness
// ============================================================================

export const borderWeights = {
  hairline: '0.5px',   // Sottilissimo (dividers delicati)
  thin: '1px',         // Standard
  medium: '2px',       // Enfasi
  thick: '3px',        // Strong emphasis
  heavy: '4px',        // Maximum (rare)
} as const;

// ============================================================================
// FILTERS — Per image/video effects
// ============================================================================

export const filters = {
  /**
   * Grayscale luxury — Per hover effects
   */
  grayscale: {
    none: 'grayscale(0)',
    partial: 'grayscale(0.3)',
    full: 'grayscale(1)',
  },

  /**
   * Brightness adjustments
   */
  brightness: {
    darker: 'brightness(0.8)',
    normal: 'brightness(1)',
    lighter: 'brightness(1.1)',
  },

  /**
   * Sepia vintage effect
   */
  sepia: {
    none: 'sepia(0)',
    subtle: 'sepia(0.2)',
    medium: 'sepia(0.4)',
    strong: 'sepia(0.6)',
  },

  /**
   * Combined filters per imagery luxury
   */
  luxuryImage: 'saturate(0.95) brightness(0.98) contrast(1.05)', // Subtle enhancement
  vintageImage: 'sepia(0.15) saturate(0.9) brightness(0.95)',    // Vintage feel
} as const;

// ============================================================================
// USAGE GUIDELINES COMPLETE
// ============================================================================

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DESIGN SYSTEM USAGE — COMPLETE GUIDE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * COLORS:
 * ────────
 * Backgrounds scuri:
 *   - midnight.DEFAULT per hero/drammatic sections
 *   - ink.950 per standard dark sections
 *
 * Backgrounds chiari:
 *   - cream.50 per main backgrounds (NO white puro)
 *   - cream.100 per subtle section variations
 *
 * Text su scuro:
 *   - Headings: gold.500 OR white
 *   - Body: white con opacity.textOnDark.secondary (80%)
 *   - Captions: white con opacity.textOnDark.tertiary (60%)
 *
 * Text su chiaro:
 *   - Headings: ink.950 OR gold.600 (per contrast compliance)
 *   - Body: stone.700
 *   - Captions: stone.500
 *
 * CTAs:
 *   - Primary: bg-gold.500 text-midnight (golden button)
 *   - Secondary: border-gold.500 text-gold.500 (outline)
 *   - Tertiary: text-gold.500 underline (link style)
 *
 * ────────
 * TYPOGRAPHY:
 * ────────
 * Headings:
 *   - H1 page titles: text-h1 font-cinzel
 *   - H2 section titles: text-h2 font-cinzel
 *   - H3 subsections: text-h3 font-cinzel
 *   - H4+ UI headings: text-h4 font-inter
 *
 * Body text:
 *   - Narrative/storytelling: text-body-lg font-playfair (18px)
 *   - Standard UI: text-body font-inter (16px)
 *   - Captions: text-body-sm font-inter (14px)
 *
 * Special:
 *   - Quotes: text-quote font-playfair italic
 *   - Overlines: text-overline font-inter uppercase
 *
 * Mobile:
 *   - Reduce display sizes: text-display-1 → text-[60px] su mobile
 *   - Keep body sizes unchanged (16px è minimum leggibile)
 *
 * ────────
 * SPACING:
 * ────────
 * Section vertical:
 *   - Mobile: py-24 (96px)
 *   - Desktop: py-32 (128px)
 *   - Sempre consistent per visual rhythm
 *
 * Component internal:
 *   - Mobile: p-12 (48px)
 *   - Desktop: p-16 (64px)
 *
 * Grid gaps:
 *   - Mobile: gap-4 (16px)
 *   - Desktop: gap-6 to gap-8 (24-32px)
 *
 * Containers:
 *   - Content pages: max-w-3xl (768px)
 *   - Shop grids: max-w-6xl (1024px)
 *   - Homepage sections: max-w-7xl (1280px)
 *
 * ────────
 * SHADOWS:
 * ────────
 * Cards:
 *   - Resting: shadow-sm
 *   - Hover: shadow-md
 *   - Product cards: shadow-product-card + shadow-product-card-hover
 *
 * Gold elements:
 *   - Subtle glow: shadow-gold-subtle
 *   - Medium glow: shadow-gold-medium (CTAs, icons)
 *   - Strong glow: shadow-gold-strong (hero elements)
 *
 * Modals:
 *   - Sempre shadow-xl OR shadow-modal-depth
 *
 * Text on images:
 *   - Minimum: text-shadow-subtle
 *   - Standard: text-shadow-medium
 *
 * ────────
 * ANIMATIONS:
 * ────────
 * Hover transitions:
 *   - Standard: transition duration-250 ease-standard
 *   - Fast: duration-150
 *   - Smooth: duration-400 ease-smooth
 *
 * Page transitions:
 *   - Fade: duration-600 ease-smooth
 *   - Slide: duration-400 ease-decelerate
 *
 * Reduced motion:
 *   - SEMPRE rispettare prefers-reduced-motion
 *   - Disabilitare parallax, complex animations
 *   - Mantenere solo fade semplici
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ============================================================================
// COMPLETE EXPORT
// ============================================================================

export const designSystem = {
  ...tokens,
  animations: {
    easing: easingCurves,
    durations,
    presets: motionPresets,
  },
  effects: {
    blur,
    opacity: opacityPresets,
    filters,
  },
  borders: {
    radius: spacingSystem.borderRadius,
    weights: borderWeights,
  },
} as const;

// Re-export individual modules per convenience
export { colors } from './colors';
export { typography } from './typography';
export { spacingSystem as spacing } from './spacing';
export { shadowSystem as shadows } from './shadows';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type DesignToken = typeof designSystem;
export type ColorToken = keyof typeof colors;
export type TypographyToken = keyof typeof typography.scale;
export type SpacingToken = keyof typeof spacingSystem.scale;
export type ShadowToken = keyof typeof shadowSystem.elevation;

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default designSystem;
