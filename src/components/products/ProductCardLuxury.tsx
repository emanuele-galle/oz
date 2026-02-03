'use client';

/**
 * PRODUCT CARD LUXURY — OZ Extrait
 * Design: Dark & Bold — dark card with gold accents, image-dominant
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardLuxuryProps {
  slug: string;
  name: string;
  tagline: string | null;
  price: number;
  imageUrl: string;
  imageUrlHover?: string;
  concentration?: string;
  size?: string;
}

export function ProductCardLuxury({
  slug,
  name,
  tagline,
  price,
  imageUrl,
  imageUrlHover,
  concentration = '40%',
  size = '50ml',
}: ProductCardLuxuryProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/products/${slug}`}>
      <div
        className="group relative bg-stone-950 border border-gold-500/10 overflow-hidden cursor-pointer hover:border-gold-500/30 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container — tall aspect ratio */}
        <div className="relative aspect-[2/3] overflow-hidden bg-stone-900">
          {/* Primary Image */}
          <Image
            src={imageUrl}
            alt={name}
            fill
            className={`object-cover transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'} ${isHovered && imageUrlHover ? 'opacity-0' : 'opacity-100'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover Image */}
          {imageUrlHover && (
            <Image
              src={imageUrlHover}
              alt={`${name} - Detail`}
              fill
              className={`object-cover transition-all duration-700 ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-gold-500/30">
            <span className="font-inter text-[10px] uppercase tracking-[0.15em] text-gold-400 font-medium">
              Extrait {concentration}
            </span>
          </div>

          {/* Hover CTA */}
          <div
            className={`absolute inset-x-0 bottom-6 flex justify-center transition-all duration-400 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="px-8 py-3 bg-gold-500 text-stone-950">
              <span className="font-inter text-xs uppercase tracking-[0.15em] font-semibold">
                Scopri
              </span>
            </div>
          </div>

          {/* Gold glow on hover */}
          <div
            className={`absolute inset-0 shadow-[inset_0_0_60px_rgba(212,175,55,0.1)] pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Product Info */}
        <div className="p-6 md:p-8 space-y-4 bg-stone-950">
          <div>
            <h3 className="font-cinzel text-2xl md:text-3xl text-white mb-2 tracking-tight group-hover:text-gold-400 transition-colors duration-300">
              {name}
            </h3>
            {tagline && (
              <p className="font-playfair text-base text-white/50 italic leading-relaxed">
                {tagline}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gold-500/20" />

          {/* Price & Size */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-cinzel text-gold-500 tracking-tight">
                €{price}
              </div>
              <div className="text-xs font-inter text-white/40 uppercase tracking-wide mt-1">
                {size}
              </div>
            </div>

            {/* Arrow */}
            <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
              <span className="text-gold-500 group-hover:text-stone-950 font-light text-xl transition-colors duration-300">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
