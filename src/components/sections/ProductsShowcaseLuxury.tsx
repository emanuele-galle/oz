'use client';

/**
 * PRODUCTS SHOWCASE LUXURY — OZ Extrait
 * Design: Dark & Bold — stone-950 background, gold accents
 */

import React from 'react';
import { ProductCardLuxury } from '@/components/products/ProductCardLuxury';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

interface ProductData {
  slug: string;
  name: string;
  tagline: string | null;
  price: number;
  imageUrl: string;
  imageUrlHover?: string;
  concentration: string;
  size: string;
}

interface ProductsShowcaseLuxuryProps {
  products: ProductData[];
}

export function ProductsShowcaseLuxury({ products }: ProductsShowcaseLuxuryProps) {
  return (
    <section id="products" className="py-24 md:py-32 bg-stone-950 bg-noise">
      <div className="container-luxury">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="mb-6">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-500/70 font-light">
              Le Nostre Creazioni
            </span>
          </div>

          <h2 className="font-cinzel text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight">
            Tre Fragranze.
            <br />
            <span className="text-gold-500">Infinite Emozioni.</span>
          </h2>

          <p className="font-playfair text-xl md:text-2xl text-white/60 leading-relaxed italic">
            Ogni extrait racconta una storia. Ogni nota è un capitolo.
            Ogni spray è un viaggio nell'anima.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCardLuxury key={product.slug} {...product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-12 bg-gold-500/30" />
            <p className="font-inter text-sm uppercase tracking-[0.2em] text-white/40">
              Spedizione gratuita sopra i €{FREE_SHIPPING_THRESHOLD}
            </p>
            <div className="h-px w-12 bg-gold-500/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
