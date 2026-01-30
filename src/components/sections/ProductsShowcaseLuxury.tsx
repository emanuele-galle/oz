'use client';

/**
 * PRODUCTS SHOWCASE LUXURY — OZ Extrait
 * Design: Grid minimale con cards eleganti
 * Pattern: Byredo product grid + editorial spacing
 */

import React from 'react';
import { ProductCardLuxury } from '@/components/products/ProductCardLuxury';

export function ProductsShowcaseLuxury() {
  const products = [
    {
      slug: 'cristallo',
      name: 'Cristallo',
      tagline: 'Purezza e trasparenza del vetro veneziano',
      price: 180,
      imageUrl: '/uploads/products/cristallo-main.jpg',
      imageUrlHover: '/uploads/products/cristallo-detail.jpg',
      concentration: '40%',
      size: '50ml',
    },
    {
      slug: 'scintilla',
      name: 'Scintilla',
      tagline: 'La luce che danza nelle notti veneziane',
      price: 180,
      imageUrl: '/uploads/products/scintilla-main.jpg',
      imageUrlHover: '/uploads/products/scintilla-detail.jpg',
      concentration: '40%',
      size: '50ml',
    },
    {
      slug: 'potion-damour',
      name: 'Potion d\'Amour',
      tagline: 'Passione e seduzione in una fragranza',
      price: 180,
      imageUrl: '/uploads/products/potion-main.jpg',
      imageUrlHover: '/uploads/products/potion-detail.jpg',
      concentration: '40%',
      size: '50ml',
    },
  ];

  return (
    <section id="products" className="py-24 md:py-32 bg-white">
      <div className="container-luxury">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="mb-6">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-stone-500 font-light">
              Le Nostre Creazioni
            </span>
          </div>

          <h2 className="font-cinzel text-5xl md:text-6xl lg:text-7xl text-stone-900 mb-8 tracking-tight">
            Tre Fragranze.
            <br />
            <span className="text-gold-600">Infinite Emozioni.</span>
          </h2>

          <p className="font-playfair text-xl md:text-2xl text-stone-600 leading-relaxed italic">
            Ogni extrait racconta una storia. Ogni nota è un capitolo.
            Ogni spray è un viaggio nell'anima.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCardLuxury key={product.slug} {...product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4">
            <div className="h-[1px] w-12 bg-stone-300" />
            <p className="font-inter text-sm uppercase tracking-[0.2em] text-stone-500">
              Spedizione gratuita sopra i €200
            </p>
            <div className="h-[1px] w-12 bg-stone-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
