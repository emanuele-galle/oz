import React from 'react';
import { cn } from '@/lib/utils';

/**
 * QUOTE Component — Blockquotes styled luxury
 *
 * Per testimonials, pull quotes, statement importanti.
 * Include optional author attribution.
 *
 * @example
 * <Quote
 *   size="large"
 *   author="Zoe Cristofoli"
 *   role="Founder"
 * >
 *   Ogni fragranza è un pezzo di me.
 * </Quote>
 */

type QuoteSize =
  | 'default' // 28px — Standard quotes
  | 'large';  // 36px — Hero quotes

interface QuoteProps {
  size?: QuoteSize;
  author?: string;
  role?: string;       // es. "Founder", "Cliente", ecc.
  className?: string;
  children: React.ReactNode;
  showQuotationMarks?: boolean; // Se mostrare "" visual
}

export function Quote({
  size = 'default',
  author,
  role,
  className,
  children,
  showQuotationMarks = true,
}: QuoteProps) {
  // Size classes
  const sizeClasses = {
    default: 'text-[28px] leading-[1.5]',
    large: 'text-[36px] leading-[1.4]',
  };

  return (
    <figure className={cn('relative', className)}>
      {/* Quotation mark decorative (large gold) */}
      {showQuotationMarks && (
        <div className="absolute -top-6 -left-4 text-[80px] text-gold-500/20 font-cinzel leading-none select-none" aria-hidden="true">
          &ldquo;
        </div>
      )}

      {/* Quote text */}
      <blockquote className="relative z-10">
        <p
          className={cn(
            'font-playfair',
            'italic',
            'text-white/90', // Default (can override con className)
            sizeClasses[size],
            className
          )}
        >
          {children}
        </p>
      </blockquote>

      {/* Author attribution (se presente) */}
      {author && (
        <figcaption className="mt-6">
          <div className="flex items-center justify-center md:justify-start gap-3">
            {/* Decorative line */}
            <div className="h-[1px] w-8 bg-gold-500/30" />

            {/* Author info */}
            <div className="font-inter text-sm uppercase tracking-wide text-gold-500">
              {author}
              {role && (
                <span className="text-gold-500/60 ml-2">— {role}</span>
              )}
            </div>
          </div>
        </figcaption>
      )}
    </figure>
  );
}
