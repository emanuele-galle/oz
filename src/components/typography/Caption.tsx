import React from 'react';
import { cn } from '@/lib/utils';

/**
 * CAPTION Component — Small text per labels, metadata, captions
 *
 * Usa per image captions, form labels, metadata, timestamps, ecc.
 *
 * @example
 * <Caption color="muted">
 *   Foto: Bottiglia Cristallo, Studio shoot 2026
 * </Caption>
 */

type CaptionColor =
  | 'default'   // Stone 600 (su backgrounds chiari)
  | 'muted'     // Stone 500 (più soft)
  | 'gold'      // Gold 600 (accent)
  | 'white';    // White 60% (su backgrounds scuri)

interface CaptionProps {
  color?: CaptionColor;
  uppercase?: boolean;  // Se uppercase + letter-spacing (labels style)
  className?: string;
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div' | 'figcaption';
}

export function Caption({
  color = 'default',
  uppercase = false,
  className,
  children,
  as = 'p',
}: CaptionProps) {
  const Tag = as;

  // Color classes
  const colorClasses = {
    default: 'text-stone-600',
    muted: 'text-stone-500',
    gold: 'text-gold-600',
    white: 'text-white/60',
  };

  return (
    <Tag
      className={cn(
        'font-inter',
        'text-xs',             // 12px
        'leading-normal',      // 1.5
        colorClasses[color],
        uppercase && 'uppercase tracking-wide',
        className
      )}
    >
      {children}
    </Tag>
  );
}
