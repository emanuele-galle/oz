import React from 'react';
import { cn } from '@/lib/utils';
import { Heading } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

/**
 * PRODUCT STORY BLOCK — Long-form Narrative Display
 *
 * Displays product origin stories, ingredient journeys in elegant format.
 * Optimized per long-form reading (600+ parole).
 *
 * @example
 * <ProductStoryBlock
 *   title="La Storia di Cristallo"
 *   story="Cristallo nasce dall'ispirazione..."
 *   variant="light"
 * />
 */

interface ProductStoryBlockProps {
  title: string;
  story: string;              // Plain text OR HTML (sanitized)
  pullQuote?: {
    text: string;
    author?: string;
  };
  variant?: 'light' | 'dark';
  className?: string;
}

export function ProductStoryBlock({
  title,
  story,
  pullQuote,
  variant = 'light',
  className,
}: ProductStoryBlockProps) {
  const isDark = variant === 'dark';

  return (
    <Section
      bg={isDark ? 'midnight' : 'cream'}
      spacing="default"
      className={className}
    >
      <Container size="md">
        {/* Title */}
        <Heading
          level={2}
          size="h2"
          color={isDark ? 'gold' : 'black'}
          className="text-center mb-12"
        >
          {title}
        </Heading>

        {/* Divider decorativo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className={cn(
            'h-[1px] w-12',
            isDark ? 'bg-gold-500/30' : 'bg-gold-500/50'
          )} />
          <div className={cn(
            'w-1 h-1 rounded-full',
            isDark ? 'bg-gold-500' : 'bg-gold-600'
          )} />
          <div className={cn(
            'h-[1px] w-12',
            isDark ? 'bg-gold-500/30' : 'bg-gold-500/50'
          )} />
        </div>

        {/* Story Content */}
        <div className="prose prose-lg max-w-none">
          {/* Split story in paragraphs */}
          {story.split('\n\n').map((paragraph, index) => {
            // Check se è un heading (inizia con ##)
            if (paragraph.startsWith('##')) {
              const headingText = paragraph.replace('##', '').trim();
              return (
                <Heading
                  key={index}
                  level={3}
                  size="h3"
                  color={isDark ? 'gold' : 'black'}
                  className="mt-12 mb-6"
                >
                  {headingText}
                </Heading>
              );
            }

            // Regular paragraph
            return (
              <Body
                key={index}
                size="lg"
                variant="narrative"
                className={cn(
                  'mb-6',
                  isDark ? 'text-white/80' : 'text-stone-700'
                )}
              >
                {paragraph}
              </Body>
            );
          })}
        </div>

        {/* Pull Quote (se presente) */}
        {pullQuote && (
          <figure className="relative my-16 py-12 border-y border-gold-500/20">
            {/* Quotation mark decorative */}
            <div className={cn(
              'absolute -top-8 left-0 text-[120px] font-cinzel leading-none select-none',
              isDark ? 'text-gold-500/10' : 'text-gold-500/20'
            )}>
              &ldquo;
            </div>

            {/* Quote text */}
            <blockquote className="relative z-10 text-center">
              <p className={cn(
                'font-playfair text-2xl md:text-3xl italic leading-relaxed max-w-3xl mx-auto mb-6',
                isDark ? 'text-white/90' : 'text-ink-950'
              )}>
                {pullQuote.text}
              </p>

              {pullQuote.author && (
                <footer>
                  <div className="flex items-center justify-center gap-3">
                    <div className={cn(
                      'h-[1px] w-8',
                      isDark ? 'bg-gold-500/30' : 'bg-gold-500/50'
                    )} />
                    <cite className={cn(
                      'not-italic font-inter text-sm uppercase tracking-wide',
                      isDark ? 'text-gold-400' : 'text-gold-600'
                    )}>
                      {pullQuote.author}
                    </cite>
                    <div className={cn(
                      'h-[1px] w-8',
                      isDark ? 'bg-gold-500/30' : 'bg-gold-500/50'
                    )} />
                  </div>
                </footer>
              )}
            </blockquote>
          </figure>
        )}
      </Container>
    </Section>
  );
}
