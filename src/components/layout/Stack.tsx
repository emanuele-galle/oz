import React from 'react';
import { cn } from '@/lib/utils';

/**
 * STACK Component — Vertical/horizontal spacing wrapper
 *
 * Semplifica creazione di stacked layouts con gap consistente.
 * Alternative più semantic a div con space-y-X.
 *
 * @example
 * <Stack direction="vertical" gap="lg">
 *   <Heading>Title</Heading>
 *   <Body>Paragraph 1</Body>
 *   <Body>Paragraph 2</Body>
 * </Stack>
 */

type StackDirection =
  | 'vertical'    // Flex column (default)
  | 'horizontal'; // Flex row

type StackGap =
  | 'xs'  // 8px
  | 'sm'  // 12px
  | 'md'  // 16px
  | 'lg'  // 24px
  | 'xl'; // 32px

type StackAlign =
  | 'start'
  | 'center'
  | 'end'
  | 'stretch';

type StackJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around';

interface StackProps {
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  className?: string;
  children: React.ReactNode;
  as?: 'div' | 'section' | 'article' | 'ul';
}

export function Stack({
  direction = 'vertical',
  gap = 'md',
  align,
  justify,
  className,
  children,
  as = 'div',
}: StackProps) {
  const Tag = as;

  // Direction classes
  const directionClass = direction === 'vertical' ? 'flex-col' : 'flex-row';

  // Gap classes
  const gapClasses = {
    xs: 'gap-2',   // 8px
    sm: 'gap-3',   // 12px
    md: 'gap-4',   // 16px
    lg: 'gap-6',   // 24px
    xl: 'gap-8',   // 32px
  };

  // Align classes (optional)
  const alignClasses = align
    ? {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      }[align]
    : '';

  // Justify classes (optional)
  const justifyClasses = justify
    ? {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
      }[justify]
    : '';

  return (
    <Tag
      className={cn(
        'flex',
        directionClass,
        gapClasses[gap],
        alignClasses,
        justifyClasses,
        className
      )}
    >
      {children}
    </Tag>
  );
}
