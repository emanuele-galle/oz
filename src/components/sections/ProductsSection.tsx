import React from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';

export function ProductsSection() {
  return (
    <section id="products" className="section-padding bg-black">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-display text-gold mb-4">
            Le Nostre Creazioni
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto mb-6" />
          <p className="font-playfair text-xl text-white/70 max-w-2xl mx-auto">
            Tre fragranze uniche, tre storie da scoprire.
            <br />
            <span className="text-gold-light">Extrait de Parfum 40%</span>
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
