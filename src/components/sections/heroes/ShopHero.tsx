'use client';

/**
 * SHOP HERO — Fragranze Page
 *
 * Design: Minimal header + Search prominente
 * Style: E-commerce luxury (non editorial)
 * Focus: Discovery tool, filter access, search
 *
 * @version 2.0 - Luxury redesign
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ShopHeroProps {
  /**
   * Numero totale prodotti (per display)
   */
  totalProducts?: number;
}

export function ShopHero({ totalProducts = 3 }: ShopHeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/fragranze?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-cream-50 border-b border-stone-200">
      <div className="container-luxury">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title + Count */}
          <div className="text-center space-y-4">
            <h1 className="
              font-cinzel
              text-4xl md:text-5xl lg:text-6xl
              text-ink-950
              tracking-tight
            ">
              Le Nostre Fragranze
            </h1>

            <p className="
              font-inter
              text-sm
              text-stone-500
              uppercase
              tracking-wider
            ">
              {totalProducts} Extrait de Parfum Artigianali
            </p>
          </div>

          {/* Search Bar — Prominente */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Search icon */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-stone-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca per nome, nota, o famiglia olfattiva..."
                className="
                  w-full
                  pl-12 pr-4
                  py-4
                  bg-white
                  border-2 border-stone-200
                  rounded-sm
                  font-inter
                  text-base
                  text-ink-950
                  placeholder:text-stone-400
                  focus:outline-none
                  focus:border-gold-500
                  focus:ring-4
                  focus:ring-gold-500/10
                  transition-all
                  duration-300
                "
              />

              {/* Clear button (se query presente) */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-stone-400
                    hover:text-stone-600
                    transition-colors
                  "
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Search suggestions (opzionale, mostra se empty) */}
            {!searchQuery && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <span className="font-inter text-xs text-stone-500">
                  Ricerche popolari:
                </span>
                {['Agrumato', 'Vaniglia', 'Primavera', 'Sera'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="
                      px-3 py-1
                      bg-stone-100
                      text-stone-600
                      font-inter
                      text-xs
                      rounded-full
                      hover:bg-gold-100
                      hover:text-gold-700
                      transition-colors
                      duration-200
                    "
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* Quick filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="
              px-4 py-2
              border border-stone-300
              text-stone-700
              font-inter
              text-sm
              rounded-sm
              hover:border-gold-500
              hover:text-gold-600
              transition-all
              duration-300
            ">
              Tutte
            </button>
            <button className="
              px-4 py-2
              border border-stone-300
              text-stone-700
              font-inter
              text-sm
              rounded-sm
              hover:border-gold-500
              hover:text-gold-600
              transition-all
              duration-300
            ">
              Primavera/Estate
            </button>
            <button className="
              px-4 py-2
              border border-stone-300
              text-stone-700
              font-inter
              text-sm
              rounded-sm
              hover:border-gold-500
              hover:text-gold-600
              transition-all
              duration-300
            ">
              Autunno/Inverno
            </button>
            <button className="
              px-4 py-2
              border border-stone-300
              text-stone-700
              font-inter
              text-sm
              rounded-sm
              hover:border-gold-500
              hover:text-gold-600
              transition-all
              duration-300
            ">
              Tester 10ml
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
