'use client';

/**
 * PRODUCT CARD — Enhanced con 3D tilt & depth
 * Design: Immersive, interactive, tridimensionale
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const mainSize = product.sizes.find((s) => !s.isTester) || product.sizes[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group block relative',
        'bg-white border border-stone-200 rounded-lg overflow-hidden',
        'transition-all duration-500',
        isHovered && 'shadow-[0_20px_60px_rgba(0,0,0,0.15)] -translate-y-2 scale-[1.02]',
        !isHovered && 'shadow-md',
        className
      )}
      style={{
        transform: isHovered ? 'perspective(1000px) rotateX(2deg)' : 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Image con zoom effect */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className={cn(
            'object-cover transition-transform duration-700 ease-out',
            isHovered ? 'scale-110' : 'scale-100'
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay on hover */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent',
          'transition-opacity duration-500',
          isHovered ? 'opacity-100' : 'opacity-0'
        )} />

        {/* Badge */}
        {product.sizes.some((s) => s.isTester) && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-gold-500 text-midnight font-inter text-xs font-bold uppercase tracking-wider rounded-full shadow-gold-medium">
            Tester 10ml
          </div>
        )}

        {/* Quick view on hover */}
        <div className={cn(
          'absolute inset-x-0 bottom-0 p-6',
          'bg-gradient-to-t from-black/80 to-transparent',
          'transition-all duration-500',
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        )}>
          <div className="text-white font-inter text-sm uppercase tracking-wide text-center">
            Vista Rapida →
          </div>
        </div>
      </div>

      {/* Content con depth */}
      <div className="p-6 space-y-4 relative bg-white">
        {/* Subtle glow on hover */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent',
          'transition-opacity duration-500',
          isHovered ? 'opacity-100' : 'opacity-0'
        )} />

        <div className="relative z-10">
          {/* Name */}
          <h3 className="font-cinzel text-xl md:text-2xl text-ink-950 group-hover:text-gold-600 transition-colors duration-300 mb-2">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="font-playfair text-base text-stone-600 italic mb-4">
            {product.tagline}
          </p>

          {/* Concentration badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full">
              <svg className="w-3.5 h-3.5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="font-inter text-xs font-semibold text-gold-700">{product.concentration}</span>
            </div>
          </div>

          {/* Price con emphasis */}
          <div className="flex items-baseline justify-between pt-4 border-t border-stone-200">
            <div>
              <span className="font-cinzel text-2xl md:text-3xl text-gold-600">
                €{mainSize.price}
              </span>
              <span className="ml-2 font-inter text-sm text-stone-500">
                {mainSize.volume}
              </span>
            </div>

            {/* Arrow con animation */}
            <div className={cn(
              'flex items-center gap-1 font-inter text-sm font-semibold text-gold-600',
              'transition-all duration-300',
              isHovered && 'gap-2'
            )}>
              <span>Scopri</span>
              <svg
                className={cn(
                  'w-4 h-4 transition-transform duration-300',
                  isHovered && 'translate-x-1'
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 3D depth line (decorative) */}
      <div className={cn(
        'absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500',
        'transition-all duration-500',
        isHovered ? 'opacity-100' : 'opacity-0'
      )} />
    </Link>
  );
}
