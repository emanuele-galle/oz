import type { Config } from "tailwindcss";

/**
 * TAILWIND CONFIG — OZ Extrait
 * Integrato con Design System 2.0 (design-system/tokens.ts)
 * @version 2.0 - Luxury redesign
 */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ============================================================================
      // COLORS — From design-system/colors.ts
      // ============================================================================
      colors: {
        // Primary
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D4AF37',  // BRAND COLOR
          600: '#B8941F',
          700: '#8B6914',
          800: '#5C4709',
          900: '#2E2305',
        },

        // Dark backgrounds
        midnight: {
          DEFAULT: '#0A0A0A',
          lighter: '#1A1A1A',
        },

        // Secondary
        cream: {
          50: '#FEFDFB',
          100: '#FBF8F3',
          200: '#F5F5DC',
          300: '#EDE8D8',
          400: '#E0D9C3',
          500: '#D3CBAE',
        },
        'rose-gold': {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#B76E79',
          600: '#9F5763',
          700: '#7F4551',
          800: '#5F333C',
        },

        // Neutrals
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
        ink: {
          900: '#18181B',
          950: '#09090B',
        },

        // Semantic
        success: {
          50: '#F0FDF4',
          500: '#2D5016',
          700: '#1C3F0D',
        },
        error: {
          50: '#FEF2F2',
          500: '#8B0000',
          700: '#5C0000',
        },
        warning: {
          50: '#FFFBEB',
          500: '#B8860B',
          700: '#6B4808',
        },
      },

      // ============================================================================
      // TYPOGRAPHY — From design-system/typography.ts
      // ============================================================================
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },

      fontSize: {
        // Custom sizes from design system
        'display-1': ['96px', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-2': ['72px', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'h1': ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['36px', { lineHeight: '1.3' }],
        'h3': ['24px', { lineHeight: '1.4' }],
        'h4': ['20px', { lineHeight: '1.5' }],
        'body-xl': ['20px', { lineHeight: '1.7' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
        'quote': ['28px', { lineHeight: '1.5' }],
        'quote-lg': ['36px', { lineHeight: '1.4' }],
      },

      // ============================================================================
      // SPACING — From design-system/spacing.ts
      // ============================================================================
      spacing: {
        // Extended scale (existing + new)
        '128': '32rem',   // 512px
        '144': '36rem',   // 576px
        '160': '40rem',   // 640px
        '192': '48rem',   // 768px
      },

      // Max-width containers
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1536px',
      },

      // ============================================================================
      // SHADOWS — From design-system/shadows.ts
      // ============================================================================
      boxShadow: {
        // Elevation
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 2px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        'md': '0 4px 16px 0 rgba(0, 0, 0, 0.12), 0 2px 6px 0 rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 24px 0 rgba(0, 0, 0, 0.15), 0 4px 12px 0 rgba(0, 0, 0, 0.1)',
        'xl': '0 16px 48px 0 rgba(0, 0, 0, 0.18), 0 8px 20px 0 rgba(0, 0, 0, 0.12)',
        '2xl': '0 24px 64px 0 rgba(0, 0, 0, 0.22), 0 12px 28px 0 rgba(0, 0, 0, 0.15)',

        // Gold glow (signature)
        'gold-subtle': '0 0 16px 0 rgba(212, 175, 55, 0.15)',
        'gold-medium': '0 0 24px 0 rgba(212, 175, 55, 0.25), 0 0 12px 0 rgba(212, 175, 55, 0.2)',
        'gold-strong': '0 0 32px 0 rgba(212, 175, 55, 0.35), 0 0 16px 0 rgba(212, 175, 55, 0.25)',

        // Product cards
        'product-card': '0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 0 1px 0 rgba(212, 175, 55, 0.1)',
        'product-card-hover': '0 8px 32px 0 rgba(0, 0, 0, 0.12), 0 0 24px 0 rgba(212, 175, 55, 0.15)',
      },

      // ============================================================================
      // BORDER RADIUS
      // ============================================================================
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },

      // ============================================================================
      // Z-INDEX — From design-system/spacing.ts
      // ============================================================================
      zIndex: {
        'dropdown': '10',
        'sticky': '20',
        'overlay': '30',
        'modal': '40',
        'popover': '50',
        'toast': '60',
        'tooltip': '70',
      },

      // ============================================================================
      // ANIMATIONS
      // ============================================================================
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },

      // ============================================================================
      // TRANSITIONS
      // ============================================================================
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'luxury': 'cubic-bezier(0.19, 1.0, 0.22, 1.0)',
      },

      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
      },

      // ============================================================================
      // BACKDROP BLUR
      // ============================================================================
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
};

export default config;
