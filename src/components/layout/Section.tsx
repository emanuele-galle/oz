import React from 'react';
import { cn } from '@/lib/utils';

/**
 * SECTION Component — Wrapper con spacing vertical consistente
 *
 * Usa per tutte le sezioni per garantire vertical rhythm uniforme.
 * Default spacing: 96px mobile, 128px desktop (dal design system).
 *
 * @example
 * <Section bg="midnight" spacing="default">
 *   <Container>Content here</Container>
 * </Section>
 */

type SectionBg =
  | 'midnight'   // Nero brand (#0A0A0A)
  | 'cream'      // Cream 50 (#FEFDFB)
  | 'white'      // White puro (sconsigliato, usa cream)
  | 'stone'      // Stone 100 (#F5F5F4)
  | 'transparent'; // No background

type SectionSpacing =
  | 'none'      // 0 padding
  | 'sm'        // 48px mobile, 64px desktop
  | 'default'   // 96px mobile, 128px desktop (STANDARD)
  | 'lg';       // 128px mobile, 160px desktop

interface SectionProps {
  bg?: SectionBg;
  spacing?: SectionSpacing;
  className?: string;
  children: React.ReactNode;
  as?: 'section' | 'div' | 'article';
  id?: string; // Per anchor links
}

export function Section({
  bg = 'transparent',
  spacing = 'default',
  className,
  children,
  as = 'section',
  id,
}: SectionProps) {
  const Tag = as;

  // Background classes
  const bgClasses = {
    midnight: 'bg-midnight',
    cream: 'bg-cream-50',
    white: 'bg-white',
    stone: 'bg-stone-100',
    transparent: '',
  };

  // Spacing classes (vertical padding)
  const spacingClasses = {
    none: '',
    sm: 'py-12 md:py-16',       // 48px / 64px
    default: 'py-24 md:py-32',  // 96px / 128px — STANDARD
    lg: 'py-32 md:py-40',       // 128px / 160px
  };

  return (
    <Tag
      id={id}
      className={cn(
        'relative',
        bgClasses[bg],
        spacingClasses[spacing],
        className
      )}
    >
      {children}
    </Tag>
  );
}
