'use client';

/**
 * INGREDIENT EXPLORER — Interactive Ingredient Cards
 *
 * Showcases ingredienti chiave con sourcing stories.
 * Design: Grid 2x2 con modal expansion per full story.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Section, Container, Grid } from '@/components/layout';
import { Heading, Body, Caption } from '@/components/typography';

interface Ingredient {
  name: string;
  image: string;
  origin: string;
  story: string;
  funFact?: string;
}

interface IngredientExplorerProps {
  ingredients: Ingredient[];
  fragranceName: string;
  className?: string;
}

export function IngredientExplorer({
  ingredients,
  fragranceName,
  className,
}: IngredientExplorerProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  return (
    <Section bg="cream" spacing="default" className={className}>
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Heading level={2} size="h2" color="black" className="mb-4">
            Gli Ingredienti di {fragranceName}
          </Heading>
          <Body size="lg" className="text-stone-600 max-w-2xl mx-auto">
            Ogni essenza racconta una storia. Scopri l'origine dei materiali più preziosi.
          </Body>
        </div>

        {/* Ingredients Grid */}
        <Grid cols={2} gap="lg">
          {ingredients.map((ingredient, index) => (
            <button
              key={index}
              onClick={() => setSelectedIngredient(ingredient)}
              className="group text-left bg-white border border-stone-200 rounded-lg overflow-hidden hover:border-gold-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                {ingredient.image ? (
                  <Image
                    src={ingredient.image}
                    alt={ingredient.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold-100 to-cream-200">
                    <span className="text-6xl">🌿</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <Heading level={3} size="h4" color="black" className="group-hover:text-gold-600 transition-colors">
                  {ingredient.name}
                </Heading>

                <Caption color="muted" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {ingredient.origin}
                </Caption>

                <div className="pt-4 flex items-center gap-2 text-gold-600 font-inter text-sm font-medium">
                  <span>Scopri la storia</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </Grid>
      </Container>

      {/* Modal */}
      {selectedIngredient && (
        <div
          className="fixed inset-0 z-modal bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedIngredient(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="sticky top-0 bg-white border-b border-stone-200 p-4 flex justify-between items-center z-10">
              <Heading level={3} size="h3" color="black">
                {selectedIngredient.name}
              </Heading>
              <button
                onClick={() => setSelectedIngredient(null)}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* Image */}
              {selectedIngredient.image && (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={selectedIngredient.image}
                    alt={selectedIngredient.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              )}

              {/* Origin */}
              <Caption color="gold" uppercase className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {selectedIngredient.origin}
              </Caption>

              {/* Story */}
              <Body size="lg" variant="narrative" className="text-stone-700">
                {selectedIngredient.story}
              </Body>

              {/* Fun Fact */}
              {selectedIngredient.funFact && (
                <div className="bg-cream-100 border border-gold-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <Caption color="gold" uppercase className="mb-2">Lo Sapevi?</Caption>
                      <Body size="md" className="text-stone-700">
                        {selectedIngredient.funFact}
                      </Body>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
