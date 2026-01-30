import React from 'react';
import { cn } from '@/lib/utils';

/**
 * BODY Component — Body text con size/variant control
 *
 * Usa per tutto il body text invece di <p> raw.
 * Garantisce consistency e correct font-family per context.
 *
 * @example
 * <Body size="lg" variant="narrative">
 *   Cristallo nasce dall'ispirazione delle vetrate di Murano...
 * </Body>
 */

type BodySize =
  | 'xl'  // 20px — Intros, taglines
  | 'lg'  // 18px — Narrative lunga
  | 'md'  // 16px — Standard UI
  | 'sm'; // 14px — Captions, metadata

type BodyVariant =
  | 'narrative'  // Playfair (storytelling, long-form)
  | 'ui'         // Inter (standard UI text)
  | 'default';   // Inter (alias for ui)

type BodyColor =
  | 'primary'    // Full opacity (1.0)
  | 'secondary'  // 80% opacity
  | 'tertiary'   // 60% opacity
  | 'disabled';  // 40% opacity

interface BodyProps {
  size?: BodySize;
  variant?: BodyVariant;
  color?: BodyColor;
  className?: string;
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div'; // Override semantic tag
}

export function Body({
  size = 'md',
  variant = 'default',
  color = 'primary',
  className,
  children,
  as = 'p',
}: BodyProps) {
  const Tag = as;

  // Size classes
  const sizeClasses = {
    xl: 'text-xl leading-relaxed',      // 20px, 1.7
    lg: 'text-lg leading-relaxed',      // 18px, 1.7
    md: 'text-base leading-normal',     // 16px, 1.6
    sm: 'text-sm leading-normal',       // 14px, 1.6
  };

  // Font family per variant
  const fontFamily = variant === 'narrative' ? 'font-playfair' : 'font-inter';

  // Color opacity (adapts based on parent background)
  const colorClasses = {
    primary: 'opacity-100',
    secondary: 'opacity-80',
    tertiary: 'opacity-60',
    disabled: 'opacity-40',
  };

  return (
    <Tag
      className={cn(
        fontFamily,
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Tag>
  );
}
