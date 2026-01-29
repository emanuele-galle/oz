import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // OZ Extrait luxury palette
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C85A',
          dark: '#B8941F',
        },
        midnight: {
          DEFAULT: '#1a1f3a',
          light: '#2a2f4a',
          dark: '#0f1220',
        },
        black: {
          DEFAULT: '#000000',
          soft: '#0a0a0a',
        },
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
        '256': '64rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.19, 1.0, 0.22, 1.0)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.19, 1.0, 0.22, 1.0)',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.19, 1.0, 0.22, 1.0)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.19, 1.0, 0.22, 1.0)',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
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
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.19, 1.0, 0.22, 1.0)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
