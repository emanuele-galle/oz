/**
 * OZ EXTRAIT — TYPOGRAPHY SYSTEM
 *
 * Type scale completo per luxury brand experience.
 * Basato su 3 font families: Cinzel (display), Playfair (narrative), Inter (UI).
 *
 * @version 2.0
 * @date 2026-01-30
 */

// ============================================================================
// FONT FAMILIES
// ============================================================================

export const fontFamilies = {
  /**
   * Cinzel — Display serif per headings luxury
   * Uso: H1, H2, display titles, brand statements
   * Carattere: Elegante, classico, romano-inspired
   */
  cinzel: 'var(--font-cinzel), serif',

  /**
   * Playfair Display — Narrative serif per storytelling
   * Uso: Taglines, quotes, intros, long-form content
   * Carattere: Editoriale, raffinato, leggibile
   */
  playfair: 'var(--font-playfair), serif',

  /**
   * Inter — Sans-serif per UI e body text
   * Uso: Body text, buttons, forms, navigation
   * Carattere: Moderno, pulito, versatile
   */
  inter: 'var(--font-inter), sans-serif',
} as const;

// ============================================================================
// TYPE SCALE — Font Sizes + Line Heights
// ============================================================================

export const typeScale = {
  /**
   * DISPLAY SIZES — Per hero statements luxury
   */
  'display-1': {
    fontSize: '96px',      // 6rem
    lineHeight: '1',       // Tight per impatto
    letterSpacing: '-0.02em', // Leggermente condensed
    fontWeight: '600',     // Semibold
    fontFamily: fontFamilies.cinzel,
  },
  'display-2': {
    fontSize: '72px',      // 4.5rem
    lineHeight: '1.1',
    letterSpacing: '-0.01em',
    fontWeight: '600',
    fontFamily: fontFamilies.cinzel,
  },

  /**
   * HEADINGS — Hierarchy standard
   */
  h1: {
    fontSize: '48px',      // 3rem
    lineHeight: '1.2',
    letterSpacing: '-0.01em',
    fontWeight: '600',
    fontFamily: fontFamilies.cinzel,
  },
  h2: {
    fontSize: '36px',      // 2.25rem
    lineHeight: '1.3',
    letterSpacing: '0',
    fontWeight: '600',
    fontFamily: fontFamilies.cinzel,
  },
  h3: {
    fontSize: '24px',      // 1.5rem
    lineHeight: '1.4',
    letterSpacing: '0',
    fontWeight: '600',
    fontFamily: fontFamilies.cinzel,
  },
  h4: {
    fontSize: '20px',      // 1.25rem
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '600',
    fontFamily: fontFamilies.cinzel,
  },
  h5: {
    fontSize: '18px',      // 1.125rem
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '600',
    fontFamily: fontFamilies.inter, // Inter per headings piccoli (più UI-friendly)
  },
  h6: {
    fontSize: '16px',      // 1rem
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '600',
    fontFamily: fontFamilies.inter,
  },

  /**
   * BODY SIZES — Content text
   */
  'body-xl': {
    fontSize: '20px',      // 1.25rem - Per intros, taglines
    lineHeight: '1.7',     // Generoso per leggibilità
    letterSpacing: '0',
    fontWeight: '400',
    fontFamily: fontFamilies.playfair, // Playfair per testi narrativi
  },
  'body-lg': {
    fontSize: '18px',      // 1.125rem - Per narrativa lunga
    lineHeight: '1.7',
    letterSpacing: '0',
    fontWeight: '400',
    fontFamily: fontFamilies.playfair,
  },
  body: {
    fontSize: '16px',      // 1rem - Standard UI text
    lineHeight: '1.6',
    letterSpacing: '0',
    fontWeight: '400',
    fontFamily: fontFamilies.inter,
  },
  'body-sm': {
    fontSize: '14px',      // 0.875rem - Captions, metadata
    lineHeight: '1.6',
    letterSpacing: '0',
    fontWeight: '400',
    fontFamily: fontFamilies.inter,
  },

  /**
   * SMALL SIZES — Labels, captions, UI details
   */
  caption: {
    fontSize: '12px',      // 0.75rem
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
    fontFamily: fontFamilies.inter,
  },
  overline: {
    fontSize: '10px',      // 0.625rem - Eyebrows, labels
    lineHeight: '1.5',
    letterSpacing: '0.1em', // Più spaziato per leggibilità
    fontWeight: '600',     // Semibold
    textTransform: 'uppercase',
    fontFamily: fontFamilies.inter,
  },

  /**
   * SPECIAL — Quote, testimonials, pull quotes
   */
  quote: {
    fontSize: '28px',      // 1.75rem
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
    fontStyle: 'italic',
    fontFamily: fontFamilies.playfair,
  },
  'quote-large': {
    fontSize: '36px',      // 2.25rem
    lineHeight: '1.4',
    letterSpacing: '-0.01em',
    fontWeight: '400',
    fontStyle: 'italic',
    fontFamily: fontFamilies.playfair,
  },
} as const;

// ============================================================================
// FONT WEIGHTS — Semantic naming
// ============================================================================

export const fontWeights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

// ============================================================================
// LETTER SPACING — For specific use cases
// ============================================================================

export const letterSpacing = {
  tighter: '-0.02em',  // Display sizes
  tight: '-0.01em',    // Large headings
  normal: '0',         // Default
  wide: '0.05em',      // Buttons, labels
  wider: '0.1em',      // Overlines, small caps
  widest: '0.15em',    // Extreme spacing (rare)
} as const;

// ============================================================================
// LINE HEIGHTS — Semantic naming
// ============================================================================

export const lineHeights = {
  none: '1',           // Display tight
  tight: '1.1',        // Display 2
  snug: '1.2',         // H1
  normal: '1.5',       // Headings standard
  relaxed: '1.6',      // Body text
  loose: '1.7',        // Narrative, long-form
  veryLoose: '2',      // Extra spacing (rare)
} as const;

// ============================================================================
// RESPONSIVE SCALE — Mobile vs Desktop
// ============================================================================

export const responsiveScale = {
  /**
   * Mobile adjustments (< 768px)
   * Regola generale: -20% to -30% delle dimensioni desktop
   */
  mobile: {
    'display-1': '60px',   // -37.5% (vs 96px desktop)
    'display-2': '48px',   // -33% (vs 72px desktop)
    h1: '36px',            // -25% (vs 48px desktop)
    h2: '28px',            // -22% (vs 36px desktop)
    h3: '20px',            // -16% (vs 24px desktop)
    h4: '18px',            // -10% (vs 20px desktop)
    'body-xl': '18px',     // -10%
    'body-lg': '16px',     // -11%
    body: '16px',          // Unchanged
    'body-sm': '14px',     // Unchanged
    caption: '12px',       // Unchanged
    overline: '10px',      // Unchanged
    quote: '22px',         // -21%
    'quote-large': '28px', // -22%
  },

  /**
   * Tablet adjustments (768px - 1024px)
   * Regola generale: -10% to -15% delle dimensioni desktop
   */
  tablet: {
    'display-1': '72px',
    'display-2': '60px',
    h1: '40px',
    h2: '32px',
    h3: '22px',
    // Rest unchanged from desktop
  },
} as const;

// ============================================================================
// UTILITY CLASSES MAPPING (per Tailwind)
// ============================================================================

/**
 * Questi sono i nomi delle classi Tailwind che useremo.
 * Da configurare in tailwind.config.ts
 */
export const tailwindTypographyClasses = {
  'display-1': 'text-display-1',
  'display-2': 'text-display-2',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  h5: 'text-h5',
  h6: 'text-h6',
  'body-xl': 'text-body-xl',
  'body-lg': 'text-body-lg',
  body: 'text-body',
  'body-sm': 'text-body-sm',
  caption: 'text-caption',
  overline: 'text-overline',
  quote: 'text-quote',
  'quote-large': 'text-quote-lg',
} as const;

// ============================================================================
// EXAMPLES — Come usare in componenti
// ============================================================================

/**
 * ESEMPIO 1: Heading Component
 *
 * <Heading level={1} className="text-gold-500">
 *   L'Essenza del Lusso
 * </Heading>
 *
 * → Renderizza: <h1 className="text-h1 font-cinzel text-gold-500">
 */

/**
 * ESEMPIO 2: Body Text Component
 *
 * <Body size="lg" className="text-stone-700">
 *   Narrazione lunga e coinvolgente...
 * </Body>
 *
 * → Renderizza: <p className="text-body-lg font-playfair text-stone-700">
 */

/**
 * ESEMPIO 3: Quote Block
 *
 * <Quote size="large" author="Zoe Cristofoli">
 *   Ogni fragranza è un pezzo di me.
 * </Quote>
 *
 * → Renderizza:
 * <blockquote className="text-quote-lg font-playfair italic text-gold-500">
 *   ...
 *   <footer className="text-overline text-gold-600">— Zoe Cristofoli</footer>
 * </blockquote>
 */

// ============================================================================
// EXPORTS
// ============================================================================

export const typography = {
  families: fontFamilies,
  scale: typeScale,
  weights: fontWeights,
  letterSpacing,
  lineHeights,
  responsive: responsiveScale,
} as const;

export type TypographyToken = keyof typeof typeScale;
