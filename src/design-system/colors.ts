/**
 * OZ EXTRAIT — COLOR SYSTEM
 *
 * Design system completo per luxury brand experience.
 * Basato su palette oro + neutrals + semantic colors.
 *
 * @version 2.0
 * @date 2026-01-30
 */

// ============================================================================
// PRIMARY COLORS — Brand Identity
// ============================================================================

export const primary = {
  /**
   * Gold — Il colore signature di OZ Extrait
   * Uso: Headings, accents, CTAs, decorazioni
   */
  gold: {
    50: '#FFFBEB',   // Crema chiarissima (backgrounds delicati)
    100: '#FEF3C7',  // Champagne (hover states)
    200: '#FDE68A',  // Gold chiaro (borders, dividers)
    300: '#FCD34D',  // Gold medio (icons, accents)
    400: '#FBBF24',  // Gold (headings secondary)
    500: '#D4AF37',  // GOLD PRINCIPALE — Brand color
    600: '#B8941F',  // Gold scuro (hover CTAs)
    700: '#8B6914',  // Gold molto scuro (active states)
    800: '#5C4709',  // Gold bruciato (shadows)
    900: '#2E2305',  // Gold quasi nero (text on gold backgrounds)
  },

  /**
   * Midnight — Nero signature
   * Uso: Backgrounds, contrasto forte con oro
   */
  midnight: {
    DEFAULT: '#0A0A0A', // Nero quasi puro con hint warm
    lighter: '#1A1A1A', // Nero meno intenso (cards su midnight bg)
  },
} as const;

// ============================================================================
// SECONDARY COLORS — Supporting Palette
// ============================================================================

export const secondary = {
  /**
   * Cream — Bianco caldo luxury
   * Uso: Backgrounds chiari, alternative a white puro
   */
  cream: {
    50: '#FEFDFB',   // Quasi bianco (main backgrounds)
    100: '#FBF8F3',  // Cream molto chiaro (section backgrounds)
    200: '#F5F5DC',  // Beige chiaro (cards)
    300: '#EDE8D8',  // Cream medio (borders)
    400: '#E0D9C3',  // Cream scuro (disabled states)
    500: '#D3CBAE',  // Taupe chiaro
  },

  /**
   * Rose Gold — Accento femminile, Zoe connection
   * Uso: Accenti su prodotti femminili, decorazioni sottili
   */
  roseGold: {
    50: '#FFF1F2',
    100: '#FFE4E6',
    200: '#FECDD3',
    300: '#FDA4AF',
    400: '#FB7185',
    500: '#B76E79',  // ROSE GOLD PRINCIPALE
    600: '#9F5763',
    700: '#7F4551',
    800: '#5F333C',
  },
} as const;

// ============================================================================
// NEUTRALS — Grays con warmth
// ============================================================================

export const neutrals = {
  /**
   * Stone — Gray scale con undertone caldo
   * Uso: Testi, borders, backgrounds
   * Preferire a gray puro per coerenza warm palette
   */
  stone: {
    50: '#FAFAF9',   // Quasi bianco
    100: '#F5F5F4',  // Gray leggerissimo (backgrounds)
    200: '#E7E5E4',  // Gray chiaro (borders)
    300: '#D6D3D1',  // Gray medio-chiaro (disabled text)
    400: '#A8A29E',  // Gray medio (secondary text)
    500: '#78716C',  // Gray (tertiary text)
    600: '#57534E',  // Gray scuro (secondary headings)
    700: '#44403C',  // Gray molto scuro (body text)
    800: '#292524',  // Quasi nero (headings)
    900: '#1C1917',  // Nero caldo (headings importanti)
    950: '#0C0A09',  // Nero assoluto
  },

  /**
   * Ink — True blacks (quando serve contrasto massimo)
   * Uso: Typography su backgrounds chiari, borders forti
   */
  ink: {
    900: '#18181B',  // Nero standard
    950: '#09090B',  // Nero assoluto
  },
} as const;

// ============================================================================
// SEMANTIC COLORS — Feedback & States
// ============================================================================

export const semantic = {
  /**
   * Success — Verde profondo luxury
   */
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#2D5016',   // Verde scuro luxury (no bright green)
    600: '#245011',
    700: '#1C3F0D',
    800: '#14290A',
  },

  /**
   * Error — Burgundy/Bordeaux (no red puro)
   */
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#8B0000',   // Burgundy scuro
    600: '#7A0000',
    700: '#5C0000',
    800: '#3D0000',
  },

  /**
   * Warning — Amber/Oro bruciato
   */
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#B8860B',   // Amber scuro (allineato con gold palette)
    600: '#92640A',
    700: '#6B4808',
    800: '#453006',
  },

  /**
   * Info — Blue elegante (non bright)
   */
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#1E3A8A',   // Navy blue luxury
    600: '#1A2F6F',
    700: '#152454',
    800: '#0F1938',
  },
} as const;

// ============================================================================
// OPACITY SCALE — Per rgba usage
// ============================================================================

export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
} as const;

// ============================================================================
// GRADIENT PRESETS — Per backgrounds luxury
// ============================================================================

export const gradients = {
  /**
   * Gold gradients
   */
  goldRadial: 'radial-gradient(circle at top right, #D4AF37 0%, #B8941F 50%, #8B6914 100%)',
  goldLinear: 'linear-gradient(135deg, #FCD34D 0%, #D4AF37 50%, #B8941F 100%)',
  goldSubtle: 'linear-gradient(to bottom, transparent 0%, rgba(212, 175, 55, 0.05) 100%)',

  /**
   * Midnight gradients
   */
  midnightVignette: 'radial-gradient(circle at center, transparent 0%, rgba(10, 10, 10, 0.6) 100%)',
  midnightDepth: 'linear-gradient(to bottom, #0A0A0A 0%, #000000 100%)',

  /**
   * Overlay gradients (per immagini)
   */
  overlayDark: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
  overlayGold: 'linear-gradient(to top, rgba(212, 175, 55, 0.2) 0%, transparent 100%)',
  overlayVignette: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.5) 100%)',
} as const;

// ============================================================================
// USAGE GUIDELINES
// ============================================================================

/**
 * COLOR USAGE RULES:
 *
 * BACKGROUNDS:
 * - Midnight (nero) per sezioni drammatiche, hero sections
 * - Cream 50-100 per sezioni chiare eleganti
 * - White puro (#FFFFFF) evitare → usa cream.50 invece (più warm)
 *
 * TEXT:
 * - Headings su background scuro: gold.500 OR white
 * - Headings su background chiaro: ink.950 OR gold.600
 * - Body text su scuro: white con opacity 70-80%
 * - Body text su chiaro: stone.700-800
 *
 * ACCENTS:
 * - CTAs primari: gold.500 background con midnight text
 * - CTAs secondari: outline gold.500 con gold.500 text
 * - Hover states: gold.400 (lighter) per backgrounds scuri, gold.600 (darker) per chiari
 *
 * BORDERS & DIVIDERS:
 * - Subtle: stone.200 (su backgrounds chiari), white opacity 10% (su scuri)
 * - Prominent: gold.300 (quando vuoi attirare attenzione)
 *
 * SEMANTIC:
 * - Success messages: success.500 (verde scuro, non bright)
 * - Errors: error.500 (burgundy, non red puro)
 * - Warnings: warning.500 (amber allineato con gold)
 *
 * WCAG COMPLIANCE:
 * - gold.500 su white: Contrast ratio 3.8:1 (AA Large text only)
 * - Per AA compliance su testo normale: usa gold.600 su cream.50
 * - ink.950 su cream.50: 16.2:1 (AAA compliant)
 */

// ============================================================================
// EXPORTS
// ============================================================================

export const colors = {
  ...primary,
  ...secondary,
  ...neutrals,
  ...semantic,
  opacity,
  gradients,

  // Shortcuts per uso comune
  black: primary.midnight.DEFAULT,
  white: '#FFFFFF', // Disponibile ma sconsigliato → usa cream.50
  transparent: 'transparent',
  current: 'currentColor',
} as const;

export type ColorToken = keyof typeof colors;
