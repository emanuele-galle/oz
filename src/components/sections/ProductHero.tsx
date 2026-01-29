'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { Button } from '@/components/ui';

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const currentSize = product.sizes[selectedSize];

  return (
    <section className="pt-32 pb-16 bg-black">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-midnight">
              <Image
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].alt}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              {product.images.slice(0, 5).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-gold scale-105'
                      : 'border-white/10 hover:border-gold/50'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

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

            {/* Add to Cart */}
            <div className="pt-6">
              <Button variant="primary" size="xl" className="w-full">
                Aggiungi al Carrello - €{currentSize.price}
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
