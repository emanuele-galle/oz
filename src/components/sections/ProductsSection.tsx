'use client';

import React from 'react';
import { type Product } from '@/types/product';
import { Product3DCard } from '@/components/ui/Product3DCard';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollAnimation';

interface ProductsSectionProps {
  products: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const headerRef = useScrollReveal({ delay: 0 });
  const gridRef = useStaggerReveal(0.15);

  return (
    <section id="products" className="py-16 md:py-24 bg-cream-50">
      <div className="container-luxury">
        {/* Section Header */}
        <div ref={headerRef as any} className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold-600 mb-4">
            Le Nostre Creazioni
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto mb-6" />
          <p className="font-playfair text-xl text-stone-700/70 max-w-2xl mx-auto">
            {products.length} fragranze uniche, {products.length} storie da scoprire.
            <br />
            <span className="text-gold-600-light">Extrait de Parfum 40%</span>
          </p>
        </div>

        {/* Product Grid */}
        <div ref={gridRef as any} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Product3DCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
