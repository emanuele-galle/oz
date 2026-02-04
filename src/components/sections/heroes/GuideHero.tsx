'use client';

/**
 * GUIDE HERO — Article-Style Header
 * Design: Minimal, editorial
 * @version 2.0
 */

import React from 'react';

interface GuideHeroProps {
  category: string;
  title: string;
  description: string;
  meta?: {
    readTime?: string;
    lastUpdated?: string;
    author?: string;
  };
}

export function GuideHero({ category, title, description, meta }: GuideHeroProps) {
  return (
    <section className="relative py-24 md:py-32 bg-cream-50">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold-500/5 to-transparent pointer-events-none" />

      <div className="container-luxury">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div>
            <span className="inline-block px-4 py-1.5 border border-gold-500/30 text-gold-600 font-inter text-xs uppercase tracking-[0.2em] rounded-full">
              {category}
            </span>
          </div>

          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-ink-950 leading-[1.15] tracking-tight">
            {title}
          </h1>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-gold-500/30" />
            <div className="w-1 h-1 rounded-full bg-gold-500" />
            <div className="h-[1px] w-12 bg-gold-500/30" />
          </div>

          <p className="font-playfair text-lg md:text-xl text-stone-700 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          {meta && (
            <div className="flex items-center justify-center gap-6 pt-4">
              {meta.readTime && (
                <div className="flex items-center gap-2 text-sm font-inter text-stone-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{meta.readTime}</span>
                </div>
              )}
              {meta.lastUpdated && (
                <div className="flex items-center gap-2 text-sm font-inter text-stone-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Agg. {meta.lastUpdated}</span>
                </div>
              )}
              {meta.author && (
                <div className="flex items-center gap-2 text-sm font-inter text-stone-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{meta.author}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
