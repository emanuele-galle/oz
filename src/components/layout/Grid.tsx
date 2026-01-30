import React from 'react';
import { cn } from '@/lib/utils';

/**
 * GRID Component — CSS Grid wrapper con spacing control
 *
 * Semplifica creazione di grid layouts con spacing consistente.
 *
 * @example
 * <Grid cols={3} gap="lg">
 *   <ProductCard />
 *   <ProductCard />
 *   <ProductCard />
 * </Grid>
 */

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 'auto';

type GridGap =
  | 'sm'  // 12px
  | 'md'  // 16px
  | 'lg'  // 24px
  | 'xl'; // 32px

interface GridProps {
  cols?: GridCols;           // Desktop columns
  colsMd?: GridCols;         // Tablet columns (optional override)
  colsSm?: GridCols;         // Mobile columns (optional override)
  gap?: GridGap;
  className?: string;
  children: React.ReactNode;
  as?: 'div' | 'ul' | 'section';
}

export function Grid({
  cols = 3,
  colsMd,
  colsSm,
  gap = 'md',
  className,
  children,
  as = 'div',
}: GridProps) {
  const Tag = as;

  // Columns classes (responsive)
  const colsClass = cols === 'auto' ? 'grid-cols-auto-fit' : `grid-cols-${cols}`;
  const colsMdClass = colsMd ? `md:grid-cols-${colsMd}` : '';
  const colsSmClass = colsSm ? `grid-cols-${colsSm}` : 'grid-cols-1';  // Mobile sempre 1 col default

  // Gap classes
  const gapClasses = {
    sm: 'gap-3',   // 12px
    md: 'gap-4',   // 16px
    lg: 'gap-6',   // 24px
    xl: 'gap-8',   // 32px
  };

  return (
    <Tag
      className={cn(
        'grid',
        colsSmClass,
        colsMdClass,
        colsClass,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </Tag>
  );
}
