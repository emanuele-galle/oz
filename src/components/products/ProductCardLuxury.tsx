'use client';

/**
 * PRODUCT CARD LUXURY — OZ Extrait
 * Design: Minimal card con hover 3D subtle + image swap
 * Inspired by: Elite Plan Card (21st.dev) + Byredo product grid
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardLuxuryProps {
  slug: string;
  name: string;
  tagline: string;
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
      <motion.div
        className="group relative bg-white border border-stone-200 overflow-hidden cursor-pointer"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Swap Effect */}
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
          {/* Primary Image */}
          <Image
            src={imageUrl}
            alt={name}
            fill
            className={`object-cover transition-opacity duration-700 ${isHovered && imageUrlHover ? 'opacity-0' : 'opacity-100'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover Image (if provided) */}
          {imageUrlHover && (
            <Image
              src={imageUrlHover}
              alt={`${name} - Detail`}
              fill
              className={`object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Badge Concentration - Top Right */}
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-stone-200">
            <span className="font-inter text-[10px] uppercase tracking-[0.15em] text-stone-700 font-medium">
              Extrait {concentration}
            </span>
          </div>

          {/* Hover Overlay con CTA */}
          <motion.div
            className="absolute inset-0 bg-stone-900/20 flex items-end justify-center pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-8 py-3 bg-white border border-stone-300 backdrop-blur-sm">
              <span className="font-inter text-xs uppercase tracking-[0.15em] text-stone-900 font-semibold">
                Scopri
              </span>
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-6 md:p-8 space-y-4">
          {/* Name & Tagline */}
          <div>
            <h3 className="font-cinzel text-2xl md:text-3xl text-stone-900 mb-2 tracking-tight">
              {name}
            </h3>
            <p className="font-playfair text-base text-stone-600 italic leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-stone-200" />

          {/* Price & Size */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-cinzel text-stone-900 tracking-tight">
                €{price}
              </div>
              <div className="text-xs font-inter text-stone-500 uppercase tracking-wide mt-1">
                {size}
              </div>
            </div>

            {/* Quick Add Icon */}
            <motion.div
              className="w-10 h-10 border border-stone-300 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-stone-600 group-hover:text-white font-light text-xl transition-colors duration-300">
                +
              </span>
            </motion.div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-500/30 transition-colors duration-500 pointer-events-none" />
      </motion.div>
    </Link>
  );
}
