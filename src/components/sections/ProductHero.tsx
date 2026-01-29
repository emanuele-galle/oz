'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui';
import { ProductGallery } from '@/components/media';
import { useCartStore } from '@/store/cartStore';

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const { addItem } = useCartStore();

  const currentSize = product.sizes[selectedSize];

  const handleAddToCart = () => {
    addItem(product, currentSize, 1);
  };

  return (
    <section className="pt-32 pb-16 bg-black">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Enhanced Product Gallery */}
          <ProductGallery
            images={product.images}
            videoUrl={product.videoUrl}
            productName={product.name}
          />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="font-cinzel text-5xl md:text-6xl text-gold mb-3">
                {product.name}
              </h1>
              <p className="font-playfair text-2xl text-white/70 italic">
                {product.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="py-6 border-y border-white/10">
              <span className="font-cinzel text-4xl text-white">
                €{currentSize.price}
              </span>
              <span className="ml-3 text-white/50 font-inter text-sm uppercase">
                {currentSize.volume}
                {currentSize.isTester && ' (Tester)'}
              </span>
            </div>

            {/* Description */}
            <p className="font-inter text-white/80 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div>
              <label className="block text-sm font-inter font-medium text-white/80 mb-3 uppercase tracking-wide">
                Seleziona Formato
              </label>
              <div className="flex gap-3">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(index)}
                    className={`px-6 py-3 border-2 transition-all font-inter text-sm uppercase tracking-wide ${
                      selectedSize === index
                        ? 'border-gold bg-gold text-black'
                        : 'border-white/20 text-white hover:border-gold hover:bg-gold/10'
                    }`}
                  >
                    {size.volume}
                    {size.isTester && ' Tester'}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Status Badge */}
            {currentSize.stockQuantity !== undefined && (
              <div className="pt-4">
                {currentSize.stockQuantity > 5 ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-inter text-green-500 font-medium">
                      Disponibile
                    </span>
                  </div>
                ) : currentSize.stockQuantity > 0 ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-inter text-orange-500 font-medium">
                      Solo {currentSize.stockQuantity} disponibili
                    </span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-inter text-red-500 font-medium">
                      Esaurito
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart */}
            <div className="pt-6">
              <Button
                variant="primary"
                size="xl"
                className="w-full"
                onClick={handleAddToCart}
                disabled={currentSize.stockQuantity === 0}
              >
                {currentSize.stockQuantity === 0
                  ? 'Non Disponibile'
                  : `Aggiungi al Carrello - €${currentSize.price}`}
              </Button>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="glass-card p-4">
                <div className="text-xs text-white/50 font-inter uppercase tracking-wide mb-1">
                  Concentrazione
                </div>
                <div className="text-lg font-cinzel text-gold">
                  {product.concentration}
                </div>
              </div>
              <div className="glass-card p-4">
                <div className="text-xs text-white/50 font-inter uppercase tracking-wide mb-1">
                  Longevità
                </div>
                <div className="text-lg font-cinzel text-gold">
                  {product.longevity}
                </div>
              </div>
              <div className="glass-card p-4">
                <div className="text-xs text-white/50 font-inter uppercase tracking-wide mb-1">
                  Sillage
                </div>
                <div className="text-lg font-cinzel text-gold">
                  {product.sillage}
                </div>
              </div>
              <div className="glass-card p-4">
                <div className="text-xs text-white/50 font-inter uppercase tracking-wide mb-1">
                  SKU
                </div>
                <div className="text-sm font-inter text-white">
                  {currentSize.sku}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
