import React from 'react';
import { Product } from '@/data/products';

interface IngredientsProps {
  product: Product;
}

export function Ingredients({ product }: IngredientsProps) {
  return (
    <section className="section-padding bg-midnight">
      <div className="container-luxury">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cinzel text-display text-gold mb-8 text-center">
            Ingredienti d'Eccellenza
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto mb-12" />

          <div className="grid sm:grid-cols-2 gap-6">
            {product.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="glass-card p-6 flex items-start gap-4 group hover:border-gold/30 transition-all"
              >
                {/* Icon */}
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 group-hover:bg-gold/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="font-inter text-white/80 leading-relaxed">
                    {ingredient}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Best For Section */}
          <div className="mt-16 text-center">
            <h3 className="font-cinzel text-2xl text-gold mb-6">
              Ideale Per
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {product.bestFor.map((occasion, index) => (
                <span
                  key={index}
                  className="px-6 py-2 border border-gold/30 text-gold font-inter text-sm uppercase tracking-wide hover:bg-gold/10 transition-colors"
                >
                  {occasion}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
