import React from 'react';
import { cn } from '@/lib/utils';

/**
 * CONTAINER Component — Max-width wrapper con padding lateral
 *
 * Usa per content che needs max-width constraint + responsive padding.
 *
 * @example
 * <Container size="lg">
 *   <Heading level={1}>Title</Heading>
 *   <Body>Content...</Body>
 * </Container>
 */

type ContainerSize =
  | 'sm'    // 640px — Forms, narrow content
  | 'md'    // 768px — Articles, guides (reading optimal)
  | 'lg'    // 1024px — Shop grids, standard pages
  | 'xl'    // 1280px — Homepage sections, wide content
  | '2xl'   // 1536px — Maximum (rare)
  | 'full'; // 100% (no constraint)

type ContainerPadding =
  | 'none'     // 0 padding
  | 'default'; // 16px mobile, 24px tablet, 32px desktop

interface ContainerProps {
  size?: ContainerSize;
  padding?: ContainerPadding;
  className?: string;
  children: React.ReactNode;
  as?: 'div' | 'main' | 'article';
}

export function Container({
  size = 'xl',
  padding = 'default',
  className,
  children,
  as = 'div',
}: ContainerProps) {
  const Tag = as;

  // Max-width classes
  const sizeClasses = {
    sm: 'max-w-[640px]',
    md: 'max-w-[768px]',
    lg: 'max-w-[1024px]',
    xl: 'max-w-[1280px]',
    '2xl': 'max-w-[1536px]',
    full: 'max-w-full',
  };

  // Padding classes
  const paddingClasses = {
    none: '',
    default: 'px-4 md:px-6 lg:px-8',  // 16px / 24px / 32px
  };

  return (
    <Tag
      className={cn(
        sizeClasses[size],
        paddingClasses[padding],
        'mx-auto',  // Always centered
        className
      )}
    >
      {children}
    </Tag>
  );
}
