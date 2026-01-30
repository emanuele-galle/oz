import React from 'react';
import { cn } from '@/lib/utils';

/**
 * MARKDOWN CONTENT — Renders markdown-style content elegantly
 *
 * Per ora renders plain text con basic formatting.
 * Future: può integrare library markdown (react-markdown)
 */

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  // Split content in paragraphs
  const paragraphs = content.split('\n\n').filter((p) => p.trim());

  return (
    <div className={cn('prose prose-lg max-w-none space-y-6', className)}>
      {paragraphs.map((paragraph, index) => {
        // Check if heading
        if (paragraph.startsWith('## ')) {
          const text = paragraph.replace('## ', '');
          return (
            <h2
              key={index}
              className="font-cinzel text-3xl text-ink-950 mt-12 mb-6"
            >
              {text}
            </h2>
          );
        }

        if (paragraph.startsWith('### ')) {
          const text = paragraph.replace('### ', '');
          return (
            <h3
              key={index}
              className="font-cinzel text-2xl text-gold-600 mt-8 mb-4"
            >
              {text}
            </h3>
          );
        }

        // Regular paragraph
        return (
          <p
            key={index}
            className="font-playfair text-lg text-stone-700 leading-relaxed"
          >
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
