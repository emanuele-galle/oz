import React from 'react';
import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <section className="py-16 md:py-24 bg-midnight">
      <div className="container-luxury max-w-4xl">
        <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold mb-8 text-center">
          La Storia
        </h2>
        <div className="h-1 w-24 bg-gold mx-auto mb-12" />

        <p className="font-playfair text-2xl text-white/80 leading-relaxed text-center">
          {product.story}
        </p>
      </div>
    </section>
  );
}
