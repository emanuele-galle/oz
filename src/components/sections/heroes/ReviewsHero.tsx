'use client';

/**
 * REVIEWS HERO — Social Proof Header
 *
 * Design: Stats-first + Search
 * Style: Trust-building, transparent
 * Focus: Overall rating, review count, filtering
 *
 * @version 2.0 - Luxury redesign
 */

import React from 'react';

interface ReviewsHeroProps {
  /**
   * Overall rating (es. 4.9)
   */
  overallRating: number;

  /**
   * Total review count
   */
  totalReviews: number;

  /**
   * Rating distribution
   */
  ratingDistribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export function ReviewsHero({
  overallRating = 4.9,
  totalReviews = 127,
  ratingDistribution = {
    5: 98,
    4: 22,
    3: 5,
    2: 2,
    1: 0,
  },
}: ReviewsHeroProps) {
  const getPercentage = (count: number) => {
    return Math.round((count / totalReviews) * 100);
  };

  return (
    <section className="relative py-16 md:py-24 bg-cream-50 border-b border-stone-200">
      <div className="container-luxury">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="
              font-cinzel
              text-4xl md:text-5xl
              text-ink-950
              mb-4
            ">
              Recensioni Clienti
            </h1>
            <p className="
              font-inter
              text-base
              text-stone-600
            ">
              Cosa dicono di noi chi ha già scelto OZ Extrait
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12">
            {/* Overall Rating Card */}
            <div className="
              bg-white
              border border-stone-200
              rounded-lg
              p-8
              text-center
              space-y-4
            ">
              {/* Big number */}
              <div className="space-y-2">
                <div className="font-cinzel text-6xl text-gold-600">
                  {overallRating.toFixed(1)}
                </div>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(overallRating)
                          ? 'text-gold-500'
                          : 'text-stone-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="font-inter text-sm text-stone-500">
                  Basato su {totalReviews} recensioni
                </div>
              </div>

              {/* Rating bars */}
              <div className="space-y-2 pt-4">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = ratingDistribution[stars as keyof typeof ratingDistribution];
                  const percentage = getPercentage(count);

                  return (
                    <div key={stars} className="flex items-center gap-3">
                      {/* Stars label */}
                      <div className="flex items-center gap-1 w-12">
                        <span className="font-inter text-xs text-stone-600">{stars}</span>
                        <svg className="w-3 h-3 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>

                      {/* Progress bar */}
                      <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold-500 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      {/* Percentage */}
                      <div className="w-12 text-right">
                        <span className="font-inter text-xs text-stone-600">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Satisfaction Stats */}
            <div className="space-y-6">
              {/* Satisfaction metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white border border-stone-200 rounded-sm">
                  <div className="font-cinzel text-3xl text-gold-600 mb-1">
                    94%
                  </div>
                  <div className="font-inter text-xs text-stone-600 uppercase tracking-wide">
                    Consiglia
                  </div>
                </div>
                <div className="text-center p-4 bg-white border border-stone-200 rounded-sm">
                  <div className="font-cinzel text-3xl text-gold-600 mb-1">
                    4.8
                  </div>
                  <div className="font-inter text-xs text-stone-600 uppercase tracking-wide">
                    Qualità
                  </div>
                </div>
                <div className="text-center p-4 bg-white border border-stone-200 rounded-sm">
                  <div className="font-cinzel text-3xl text-gold-600 mb-1">
                    4.9
                  </div>
                  <div className="font-inter text-xs text-stone-600 uppercase tracking-wide">
                    Longevità
                  </div>
                </div>
              </div>

              {/* Quick filters */}
              <div className="space-y-3">
                <div className="font-inter text-sm font-medium text-stone-700 uppercase tracking-wide">
                  Filtra Recensioni
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Tutte', count: totalReviews },
                    { label: 'Con Foto', count: 34 },
                    { label: 'Verificate', count: totalReviews },
                    { label: 'Cristallo', count: 47 },
                    { label: 'Scintilla', count: 52 },
                    { label: "Potion d'Amour", count: 28 },
                  ].map((filter) => (
                    <button
                      key={filter.label}
                      className="
                        px-4 py-2
                        bg-white
                        border border-stone-300
                        text-stone-700
                        font-inter
                        text-sm
                        rounded-sm
                        hover:border-gold-500
                        hover:text-gold-600
                        hover:bg-gold-50
                        transition-all
                        duration-300
                      "
                    >
                      {filter.label}
                      <span className="ml-1.5 text-xs text-stone-500">
                        ({filter.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA - Write review */}
              <div className="pt-4">
                <button className="
                  w-full
                  py-3
                  border-2 border-gold-500
                  text-gold-600
                  font-inter
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wide
                  rounded-sm
                  hover:bg-gold-500
                  hover:text-midnight
                  transition-all
                  duration-300
                ">
                  Scrivi una Recensione
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
