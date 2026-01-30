'use client';

/**
 * PRODUCT HERO GALLERY — Luxury E-commerce Style
 *
 * Design: Fullscreen gallery (left 60%) + Sticky product info (right 40%)
 * Inspiration: Le Labo, Byredo product pages
 * Focus: Photography protagonista, info sempre visibile
 *
 * @version 2.0 - Luxury redesign
 */

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, ProductSize } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

interface ProductHeroGalleryProps {
  product: Product;
}

export function ProductHeroGallery({ product }: ProductHeroGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const { addItem } = useCartStore();

  const currentSize = product.sizes[selectedSize];
  const currentImage = product.images[selectedImageIndex];

  const handleAddToCart = () => {
    addItem(product, currentSize, 1);
    toast.success('Aggiunto al carrello', {
      description: `${product.name} - ${currentSize.volume}`,
      duration: 3000,
    });
  };

  return (
    <section className="relative min-h-screen bg-cream-50">
      <div className="grid lg:grid-cols-[60%_40%] min-h-screen">
        {/* LEFT: Gallery — 60% width */}
        <div className="relative bg-stone-100">
          {/* Main Image */}
          <div className="sticky top-0 h-screen flex flex-col">
            {/* Large Image Area */}
            <div className="flex-1 relative">
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                fill
                className="object-cover"
                priority={selectedImageIndex === 0}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Subtle vignette (non pesante) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Image counter */}
              <div className="absolute top-6 right-6 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full">
                <span className="font-inter text-sm text-white">
                  {selectedImageIndex + 1} / {product.images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip — Bottom */}
            <div className="bg-white/95 backdrop-blur-sm border-t border-stone-200 p-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`
                      relative flex-shrink-0
                      w-20 h-20 md:w-24 md:h-24
                      rounded-sm
                      overflow-hidden
                      border-2
                      transition-all
                      duration-300
                      ${
                        selectedImageIndex === index
                          ? 'border-gold-500 scale-105 shadow-md'
                          : 'border-stone-300 hover:border-gold-400 opacity-70 hover:opacity-100'
                      }
                    `}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Product Info — 40% width, sticky */}
        <div className="relative bg-cream-50">
          <div className="sticky top-0 h-screen overflow-y-auto py-12 px-6 md:px-12">
            <div className="max-w-xl space-y-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm font-inter text-stone-500">
                <a href="/" className="hover:text-gold-600 transition-colors">
                  Home
                </a>
                <span>/</span>
                <a href="/fragranze" className="hover:text-gold-600 transition-colors">
                  Fragranze
                </a>
                <span>/</span>
                <span className="text-stone-700">{product.name}</span>
              </nav>

              {/* Product Name */}
              <div className="space-y-3">
                <h1 className="
                  font-cinzel
                  text-4xl md:text-5xl
                  text-ink-950
                  leading-tight
                ">
                  {product.name}
                </h1>
                <p className="
                  font-playfair
                  text-xl md:text-2xl
                  text-stone-600
                  italic
                ">
                  {product.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="py-6 border-y border-stone-200">
                <div className="flex items-baseline gap-3">
                  <span className="font-cinzel text-4xl text-ink-950">
                    €{currentSize.price}
                  </span>
                  <span className="font-inter text-sm text-stone-500 uppercase tracking-wide">
                    {currentSize.volume}
                    {currentSize.isTester && ' Tester'}
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="font-inter text-base text-stone-700 leading-relaxed">
                {product.description}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Concentrazione', value: product.concentration },
                  { label: 'Longevità', value: product.longevity },
                  { label: 'Sillage', value: product.sillage },
                  {
                    label: 'Famiglia',
                    value: product.olfactoryNotes.top[0].includes('Bergamotto')
                      ? 'Agrumato Chyprè'
                      : product.olfactoryNotes.heart[0].includes('Iris')
                      ? 'Orientale Speziato'
                      : 'Gourmand Floreale',
                  },
                ].map((spec, index) => (
                  <div
                    key={index}
                    className="
                      p-4
                      bg-white
                      border border-stone-200
                      rounded-sm
                      hover:border-gold-300
                      transition-colors
                      duration-300
                    "
                  >
                    <div className="font-inter text-xs text-stone-500 uppercase tracking-wide mb-1">
                      {spec.label}
                    </div>
                    <div className="font-cinzel text-sm text-gold-600">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <label className="block font-inter text-sm font-medium text-stone-700 uppercase tracking-wide">
                  Seleziona Formato
                </label>
                <div className="flex gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(index)}
                      className={`
                        flex-1
                        px-4 py-3
                        border-2
                        rounded-sm
                        font-inter
                        text-sm
                        font-medium
                        uppercase
                        tracking-wide
                        transition-all
                        duration-300
                        ${
                          selectedSize === index
                            ? 'border-gold-500 bg-gold-500 text-midnight shadow-sm'
                            : 'border-stone-300 text-stone-700 hover:border-gold-400 hover:bg-gold-50'
                        }
                      `}
                    >
                      <div>{size.volume}</div>
                      {size.isTester && (
                        <div className="text-xs opacity-70">Tester</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart — Primary action */}
              <button
                onClick={handleAddToCart}
                className="
                  w-full
                  py-5
                  bg-gold-500
                  text-midnight
                  font-inter
                  text-base
                  font-bold
                  uppercase
                  tracking-wide
                  rounded-sm
                  shadow-[0_4px_16px_rgba(212,175,55,0.25)]
                  hover:bg-gold-400
                  hover:shadow-[0_6px_24px_rgba(212,175,55,0.35)]
                  hover:-translate-y-0.5
                  active:scale-[0.99]
                  transition-all
                  duration-300
                "
              >
                Aggiungi al Carrello — €{currentSize.price}
              </button>

              {/* Secondary actions */}
              <div className="flex gap-3">
                <button
                  className="
                    flex-1
                    py-3
                    border-2
                    border-stone-300
                    text-stone-700
                    font-inter
                    text-sm
                    font-medium
                    rounded-sm
                    hover:border-gold-500
                    hover:text-gold-600
                    transition-all
                    duration-300
                  "
                >
                  <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button
                  className="
                    flex-1
                    py-3
                    border-2
                    border-stone-300
                    text-stone-700
                    font-inter
                    text-sm
                    font-medium
                    rounded-sm
                    hover:border-gold-500
                    hover:text-gold-600
                    transition-all
                    duration-300
                  "
                >
                  <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>

              {/* Trust signals */}
              <div className="pt-6 space-y-3 border-t border-stone-200">
                <div className="flex items-center gap-2 text-sm font-inter text-stone-600">
                  <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Spedizione gratuita sopra €100</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-inter text-stone-600">
                  <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Consegna 3-5 giorni lavorativi</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-inter text-stone-600">
                  <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Artigianale — Made in Italy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
