import React from 'react';
import { cn } from '@/lib/utils';

/**
 * GRID Component — CSS Grid wrapper con spacing control
 *
 * Uses lookup maps for Tailwind class names (required for JIT purging).
 * When responsive props (colsSm/colsMd) are provided, uses mobile-first:
 *   colsSm (base) → colsMd (md:) → cols (lg:)
 *
 * @example
 * <Grid cols={3} colsMd={2} colsSm={1} gap="lg">
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

const baseColsMap: Record<string, string> = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
  '4': 'grid-cols-4',
  '5': 'grid-cols-5',
  '6': 'grid-cols-6',
  'auto': 'grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
};

const mdColsMap: Record<string, string> = {
  '1': 'md:grid-cols-1',
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'md:grid-cols-4',
  '5': 'md:grid-cols-5',
  '6': 'md:grid-cols-6',
  'auto': 'md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
};

const lgColsMap: Record<string, string> = {
  '1': 'lg:grid-cols-1',
  '2': 'lg:grid-cols-2',
  '3': 'lg:grid-cols-3',
  '4': 'lg:grid-cols-4',
  '5': 'lg:grid-cols-5',
  '6': 'lg:grid-cols-6',
  'auto': 'lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
};

const gapClasses: Record<GridGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

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

  // When responsive props are provided, use mobile-first hierarchy:
  //   colsSm (base) → colsMd (md:) → cols (lg:)
  // Otherwise, cols applies at all breakpoints (backward compatible)
  const isResponsive = colsSm !== undefined || colsMd !== undefined;

  const smClass = baseColsMap[String(colsSm ?? 1)] || 'grid-cols-1';
  const mdClass = colsMd ? (mdColsMap[String(colsMd)] || '') : '';
  const lgClass = isResponsive
    ? (lgColsMap[String(cols)] || 'lg:grid-cols-3')
    : (baseColsMap[String(cols)] || 'grid-cols-3');

  return (
    <Tag
      className={cn(
        'grid',
        smClass,
        mdClass,
        lgClass,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </Tag>
  );
}
