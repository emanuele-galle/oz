import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="glass-card overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-gold/30">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Button variant="primary" size="md">
              Scopri
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-cinzel text-2xl text-gold mb-2 group-hover:text-gold-light transition-colors">
            {product.name}
          </h3>
          <p className="font-playfair text-white/60 text-sm mb-4 italic">
            {product.tagline}
          </p>
          <p className="font-inter text-white/70 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-2xl font-cinzel text-white">
              €{product.price}
            </span>
            <span className="text-xs font-inter text-white/50 uppercase tracking-wide">
              {product.concentration}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
