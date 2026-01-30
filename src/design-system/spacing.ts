/**
 * OZ EXTRAIT — SPACING SYSTEM
 *
 * Sistema di spaziatura rigoroso per consistency luxury.
 * Base 4px (0.25rem) per snap-to-grid preciso.
 *
 * @version 2.0
 * @date 2026-01-30
 */

// ============================================================================
// BASE UNIT
// ============================================================================

const BASE_UNIT = 4; // 4px

// ============================================================================
// SPACING SCALE — Da XS a 6XL
// ============================================================================

export const spacing = {
  /**
   * XS — Micro spacing
   * Uso: Gaps minimi, icon padding, borders
   */
  xs: `${BASE_UNIT}px`,        // 4px / 0.25rem

  /**
   * SM — Small spacing
   * Uso: Tight spacing, small gaps, inline elements
   */
  sm: `${BASE_UNIT * 2}px`,    // 8px / 0.5rem

  /**
   * MD — Medium spacing
   * Uso: Default spacing tra elementi simili
   */
  md: `${BASE_UNIT * 3}px`,    // 12px / 0.75rem

  /**
   * LG — Large spacing
   * Uso: Standard gap tra componenti
   */
  lg: `${BASE_UNIT * 4}px`,    // 16px / 1rem

  /**
   * XL — Extra large spacing
   * Uso: Section internal spacing, card padding
   */
  xl: `${BASE_UNIT * 6}px`,    // 24px / 1.5rem

  /**
   * 2XL — Double XL
   * Uso: Large component spacing, container padding
   */
  '2xl': `${BASE_UNIT * 8}px`,  // 32px / 2rem

  /**
   * 3XL — Triple XL
   * Uso: Section spacing interno (mobile)
   */
  '3xl': `${BASE_UNIT * 12}px`, // 48px / 3rem

  /**
   * 4XL — Quad XL
   * Uso: Section spacing interno (desktop)
   */
  '4xl': `${BASE_UNIT * 16}px`, // 64px / 4rem

  /**
   * 5XL — Penta XL
   * Uso: Section vertical spacing (mobile)
   */
  '5xl': `${BASE_UNIT * 24}px`, // 96px / 6rem

  /**
   * 6XL — Hexa XL
   * Uso: Section vertical spacing (desktop)
   */
  '6xl': `${BASE_UNIT * 32}px`, // 128px / 8rem
} as const;

// ============================================================================
// SEMANTIC SPACING — Named per use case
// ============================================================================

export const semanticSpacing = {
  /**
   * SECTION SPACING — Vertical rhythm tra sezioni
   */
  section: {
    mobile: spacing['5xl'],    // 96px
    desktop: spacing['6xl'],   // 128px
  },

  /**
   * COMPONENT SPACING — Internal component padding/gaps
   */
  component: {
    mobile: spacing['3xl'],    // 48px
    desktop: spacing['4xl'],   // 64px
  },

  /**
   * ELEMENT SPACING — Tra elementi correlati
   */
  element: {
    tight: spacing.md,         // 12px — Elementi molto vicini
    normal: spacing.lg,        // 16px — Standard
    relaxed: spacing.xl,       // 24px — Più respiro
  },

  /**
   * CONTAINER PADDING — Lateral padding dei container
   */
  container: {
    mobile: spacing.lg,        // 16px — Mobile edges
    tablet: spacing.xl,        // 24px — Tablet edges
    desktop: spacing['2xl'],   // 32px — Desktop edges
    wide: spacing['3xl'],      // 48px — Ultra-wide screens
  },

  /**
   * CARD PADDING — Internal card spacing
   */
  card: {
    sm: spacing.lg,            // 16px — Compact cards
    md: spacing.xl,            // 24px — Standard cards
    lg: spacing['2xl'],        // 32px — Spacious cards
    xl: spacing['3xl'],        // 48px — Hero cards
  },

  /**
   * GRID GAPS — Per CSS Grid layouts
   */
  grid: {
    sm: spacing.md,            // 12px — Tight grids
    md: spacing.lg,            // 16px — Standard grids
    lg: spacing.xl,            // 24px — Spacious grids
    xl: spacing['2xl'],        // 32px — Editorial grids
  },

  /**
   * STACK GAPS — Per vertical stacks
   */
  stack: {
    xs: spacing.sm,            // 8px — Molto tight
    sm: spacing.md,            // 12px — Tight
    md: spacing.lg,            // 16px — Normal
    lg: spacing.xl,            // 24px — Relaxed
    xl: spacing['2xl'],        // 32px — Spacious
  },
} as const;

// ============================================================================
// CONTAINER WIDTHS — Max-width per layouts
// ============================================================================

export const containerWidths = {
  /**
   * SM — Content stretti (articles, forms)
   */
  sm: '640px',    // 40rem

  /**
   * MD — Content standard (most pages)
   */
  md: '768px',    // 48rem

  /**
   * LG — Content wide (shop grids)
   */
  lg: '1024px',   // 64rem

  /**
   * XL — Content full (homepage sections)
   */
  xl: '1280px',   // 80rem

  /**
   * 2XL — Maximum width (hero sections, galleries)
   */
  '2xl': '1536px', // 96rem

  /**
   * FULL — No constraint (rare, solo per full-bleed)
   */
  full: '100%',
} as const;

// ============================================================================
// Z-INDEX SCALE — Layering rigoroso
// ============================================================================

export const zIndex = {
  /**
   * Layering gerarchico per evitare conflitti
   */
  base: 0,              // Default layer
  dropdown: 10,         // Dropdown menus
  sticky: 20,           // Sticky headers, sidebars
  overlay: 30,          // Overlays (semi-transparent)
  modal: 40,            // Modals, dialogs
  popover: 50,          // Popovers, tooltips
  toast: 60,            // Toasts, notifications
  tooltip: 70,          // Tooltips (sopra modals se necessario)
} as const;

// ============================================================================
// BORDER RADIUS — Rounded corners scale
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '4px',           // Subtle rounding (buttons, inputs)
  md: '8px',           // Standard cards
  lg: '12px',          // Large cards, images
  xl: '16px',          // Hero images, modals
  '2xl': '24px',       // Extra large (rare)
  full: '9999px',      // Pills, circular avatars
} as const;

// ============================================================================
// USAGE GUIDELINES
// ============================================================================

/**
 * SPACING USAGE RULES:
 *
 * SECTIONS (vertical rhythm):
 * - Mobile: py-24 (96px / spacing.5xl)
 * - Desktop: py-32 (128px / spacing.6xl)
 * - Usa sempre section spacing tra blocchi principali
 *
 * COMPONENTS (internal spacing):
 * - Padding interno: p-12 mobile, p-16 desktop (spacing.3xl/4xl)
 * - Gap tra elementi: gap-4 to gap-6 (16-24px)
 *
 * CONTAINERS (horizontal constraints):
 * - Homepage sections: max-w-7xl (1280px)
 * - Product grids: max-w-6xl (1024px)
 * - Article content: max-w-3xl (768px)
 * - Forms: max-w-md (640px)
 *
 * GRID GAPS:
 * - Mobile: gap-4 (16px)
 * - Tablet: gap-6 (24px)
 * - Desktop: gap-8 (32px)
 *
 * CARD PADDING:
 * - Small cards: p-4 (16px)
 * - Standard cards: p-6 (24px)
 * - Large cards: p-8 to p-12 (32-48px)
 *
 * Z-INDEX:
 * - MAI usare valori random tipo z-50, z-999
 * - Usa SOLO valori del scale (z-10, z-20, z-30...)
 * - Se serve layer custom, aggiungi a questo file
 */

// ============================================================================
// BREAKPOINTS — Responsive design
// ============================================================================

export const breakpoints = {
  sm: '640px',     // Mobile large
  md: '768px',     // Tablet
  lg: '1024px',    // Desktop
  xl: '1280px',    // Desktop large
  '2xl': '1536px', // Desktop XL
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export const spacingSystem = {
  scale: spacing,
  semantic: semanticSpacing,
  containers: containerWidths,
  zIndex,
  borderRadius,
  breakpoints,
} as const;

export type SpacingToken = keyof typeof spacing;
export type SemanticSpacingToken = keyof typeof semanticSpacing;
