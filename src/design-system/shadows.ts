/**
 * OZ EXTRAIT — SHADOW SYSTEM
 *
 * Sistema di ombre per depth e elevation luxury.
 * Basato su ombre sottili (no harsh shadows).
 *
 * @version 2.0
 * @date 2026-01-30
 */

// ============================================================================
// ELEVATION SHADOWS — Standard depth
// ============================================================================

export const shadows = {
  /**
   * NONE — No shadow
   */
  none: 'none',

  /**
   * XS — Subtle hover effect
   * Uso: Leggero lift su hover
   */
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',

  /**
   * SM — Soft card shadow
   * Uso: Cards elevated ma discrete, dropdown menus
   */
  sm: '0 2px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.08)',

  /**
   * MD — Clear elevation
   * Uso: Modals, popovers, prominent cards
   */
  md: '0 4px 16px 0 rgba(0, 0, 0, 0.12), 0 2px 6px 0 rgba(0, 0, 0, 0.08)',

  /**
   * LG — Prominent elevation
   * Uso: Large modals, sticky elements
   */
  lg: '0 8px 24px 0 rgba(0, 0, 0, 0.15), 0 4px 12px 0 rgba(0, 0, 0, 0.1)',

  /**
   * XL — Dramatic depth
   * Uso: Hero images, gallery lightbox
   */
  xl: '0 16px 48px 0 rgba(0, 0, 0, 0.18), 0 8px 20px 0 rgba(0, 0, 0, 0.12)',

  /**
   * 2XL — Maximum depth (rare)
   * Uso: Fullscreen overlays, dramatic effects
   */
  '2xl': '0 24px 64px 0 rgba(0, 0, 0, 0.22), 0 12px 28px 0 rgba(0, 0, 0, 0.15)',
} as const;

// ============================================================================
// GOLD GLOW SHADOWS — Signature OZ Extrait effect
// ============================================================================

export const goldGlow = {
  /**
   * Subtle gold glow — Per accenti delicati
   */
  subtle: '0 0 16px 0 rgba(212, 175, 55, 0.15)',

  /**
   * Medium gold glow — Per CTAs, decorazioni
   */
  medium: '0 0 24px 0 rgba(212, 175, 55, 0.25), 0 0 12px 0 rgba(212, 175, 55, 0.2)',

  /**
   * Strong gold glow — Per elementi hero
   */
  strong: '0 0 32px 0 rgba(212, 175, 55, 0.35), 0 0 16px 0 rgba(212, 175, 55, 0.25)',

  /**
   * Intense gold glow — Per effetti drammatici
   */
  intense: '0 0 48px 0 rgba(212, 175, 55, 0.5), 0 0 24px 0 rgba(212, 175, 55, 0.35)',
} as const;

// ============================================================================
// INNER SHADOWS — Per depth "inset"
// ============================================================================

export const innerShadows = {
  /**
   * Subtle inset — Per inputs, wells
   */
  subtle: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.06)',

  /**
   * Medium inset — Per pressed buttons
   */
  medium: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',

  /**
   * Strong inset — Per deep wells
   */
  strong: 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.15)',
} as const;

// ============================================================================
// COLORED SHADOWS — Context-specific
// ============================================================================

export const coloredShadows = {
  /**
   * Success shadow — Verde
   */
  success: '0 4px 16px 0 rgba(45, 80, 22, 0.15)',

  /**
   * Error shadow — Burgundy
   */
  error: '0 4px 16px 0 rgba(139, 0, 0, 0.15)',

  /**
   * Info shadow — Navy
   */
  info: '0 4px 16px 0 rgba(30, 58, 138, 0.15)',

  /**
   * Cream shadow — Per backgrounds chiari
   */
  cream: '0 4px 16px 0 rgba(237, 232, 216, 0.3)',
} as const;

// ============================================================================
// TEXT SHADOWS — Per typography effects
// ============================================================================

export const textShadows = {
  /**
   * Subtle text shadow — Leggibilità su immagini
   */
  subtle: '0 1px 2px rgba(0, 0, 0, 0.3)',

  /**
   * Medium text shadow — Testo su immagini complesse
   */
  medium: '0 2px 4px rgba(0, 0, 0, 0.5)',

  /**
   * Strong text shadow — Massimo contrasto
   */
  strong: '0 3px 6px rgba(0, 0, 0, 0.7)',

  /**
   * Gold glow text — Effetto luminoso per headings gold
   */
  goldGlow: '0 0 20px rgba(212, 175, 55, 0.5), 0 0 10px rgba(212, 175, 55, 0.3)',
} as const;

// ============================================================================
// COMBINED SHADOWS — Multi-layer per realistic depth
// ============================================================================

export const combinedShadows = {
  /**
   * Card elevated — Simula card sollevata da surface
   */
  cardElevated: `
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 4px 12px 0 rgba(0, 0, 0, 0.08),
    0 8px 24px 0 rgba(0, 0, 0, 0.05)
  `,

  /**
   * Modal depth — Simula modal floating sopra overlay
   */
  modalDepth: `
    0 8px 32px 0 rgba(0, 0, 0, 0.15),
    0 4px 16px 0 rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05)
  `,

  /**
   * Product card luxury — Per product cards con hover
   */
  productCard: `
    0 4px 16px 0 rgba(0, 0, 0, 0.08),
    0 0 1px 0 rgba(212, 175, 55, 0.1)
  `,

  /**
   * Product card hover — Enhanced con gold glow
   */
  productCardHover: `
    0 8px 32px 0 rgba(0, 0, 0, 0.12),
    0 0 24px 0 rgba(212, 175, 55, 0.15),
    0 0 1px 0 rgba(212, 175, 55, 0.3)
  `,
} as const;

// ============================================================================
// ANIMATION PRESETS — Per smooth shadow transitions
// ============================================================================

export const shadowAnimations = {
  /**
   * Transition smooth standard
   */
  smooth: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

  /**
   * Transition fast (per micro-interactions)
   */
  fast: 'box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)',

  /**
   * Transition slow (per effetti drammatici)
   */
  slow: 'box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// ============================================================================
// USAGE GUIDELINES
// ============================================================================

/**
 * SHADOW USAGE RULES:
 *
 * CARDS:
 * - Resting state: shadow.sm OR shadow.md
 * - Hover state: shadow.md OR shadow.lg
 * - Active state: shadow.xs (simula "pressed")
 *
 * PRODUCT CARDS SPECIFICALLY:
 * - Resting: combinedShadows.productCard
 * - Hover: combinedShadows.productCardHover (con gold glow!)
 *
 * MODALS & DIALOGS:
 * - Sempre: shadow.xl OR combinedShadows.modalDepth
 * - Con overlay backdrop (semi-transparent black)
 *
 * BUTTONS:
 * - Resting: shadow.sm (subtle)
 * - Hover: shadow.md (lift effect)
 * - Active: innerShadows.medium (pressed effect)
 *
 * GOLD ELEMENTS:
 * - Headings gold: goldGlow.subtle per "glow" effetto
 * - CTAs gold: goldGlow.medium su hover
 * - Decorative elements: goldGlow.strong per drama
 *
 * TEXT ON IMAGES:
 * - Sempre aggiungere textShadows.medium (minimum)
 * - Su immagini molto complesse: textShadows.strong
 * - Su gold text: textShadows.goldGlow per extra pop
 *
 * PERFORMANCE:
 * - Evitare shadow su elementi che animano frequently (scroll parallax, ecc.)
 * - Usare will-change: transform se shadow anima
 * - Preferire box-shadow a filter: drop-shadow (più performante)
 */

// ============================================================================
// TAILWIND MAPPING
// ============================================================================

/**
 * Da configurare in tailwind.config.ts:
 *
 * theme: {
 *   extend: {
 *     boxShadow: {
 *       ...shadows,
 *       'gold-subtle': goldGlow.subtle,
 *       'gold-medium': goldGlow.medium,
 *       'gold-strong': goldGlow.strong,
 *       'card-elevated': combinedShadows.cardElevated,
 *       'product-card': combinedShadows.productCard,
 *       'product-card-hover': combinedShadows.productCardHover,
 *     }
 *   }
 * }
 */

// ============================================================================
// EXPORTS
// ============================================================================

export const shadowSystem = {
  elevation: shadows,
  glow: goldGlow,
  inner: innerShadows,
  colored: coloredShadows,
  text: textShadows,
  combined: combinedShadows,
  animations: shadowAnimations,
} as const;

export type ShadowToken = keyof typeof shadows;
export type GoldGlowToken = keyof typeof goldGlow;
