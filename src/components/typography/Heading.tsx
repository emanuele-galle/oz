import React from 'react';
import { cn } from '@/lib/utils';

/**
 * HEADING Component — Semantic headings con design tokens
 *
 * Usa sempre questo component invece di <h1>, <h2>, ecc. raw
 * per garantire consistency tipografica.
 *
 * @example
 * <Heading level={1} size="display-1" color="gold">
 *   OZ Extrait
 * </Heading>
 */

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingSize =
  | 'display-1' // 96px — Hero statements
  | 'display-2' // 72px — Section heroes
  | 'h1'        // 48px — Page titles
  | 'h2'        // 36px — Section titles
  | 'h3'        // 24px — Subsections
  | 'h4'        // 20px — Cards
  | 'h5'        // 18px — Small headings
  | 'h6';       // 16px — Tiny headings

type HeadingColor =
  | 'gold'      // Gold 500 (brand color)
  | 'white'     // White (su backgrounds scuri)
  | 'black'     // Ink 950 (su backgrounds chiari)
  | 'stone';    // Stone 700 (secondary headings)

interface HeadingProps {
  level?: HeadingLevel;
  size?: HeadingSize;
  color?: HeadingColor;
  className?: string;
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div'; // Override semantic tag
}

export function Heading({
  level = 1,
  size,
  color = 'gold',
  className,
  children,
  as,
}: HeadingProps) {
  // Se size non specificato, usa default per level
  const computedSize = size || (`h${level}` as HeadingSize);

  // Semantic tag (can override con 'as' prop)
  const Tag = as || (`h${level}` as React.ElementType);

  // Size classes (from design tokens)
  const sizeClasses = {
    'display-1': 'text-[60px] md:text-[96px] leading-[0.9] tracking-tight',
    'display-2': 'text-[48px] md:text-[72px] leading-[1.1] tracking-tight',
    h1: 'text-[36px] md:text-[48px] leading-[1.2] tracking-tight',
    h2: 'text-[28px] md:text-[36px] leading-[1.3]',
    h3: 'text-[20px] md:text-[24px] leading-[1.4]',
    h4: 'text-[18px] md:text-[20px] leading-[1.5]',
    h5: 'text-[16px] md:text-[18px] leading-[1.5]',
    h6: 'text-[14px] md:text-[16px] leading-[1.5]',
  };

  // Color classes
  const colorClasses = {
    gold: 'text-gold-500',
    white: 'text-white',
    black: 'text-ink-950',
    stone: 'text-stone-700',
  };

  // Font family per size (design system rules)
  const fontFamily =
    computedSize === 'display-1' ||
    computedSize === 'display-2' ||
    computedSize === 'h1' ||
    computedSize === 'h2' ||
    computedSize === 'h3'
      ? 'font-cinzel'  // Cinzel per large headings
      : 'font-inter';  // Inter per small headings (UI-friendly)

  return (
    <Tag
      className={cn(
        fontFamily,
        sizeClasses[computedSize],
        colorClasses[color],
        'font-semibold', // Default weight
        className
      )}
    >
      {children}
    </Tag>
  );
}
