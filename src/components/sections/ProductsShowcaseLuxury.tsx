'use client';

/**
 * PRODUCTS SHOWCASE LUXURY — OZ Extrait
 * Design: Light Luxury — cream background, gold accents
 * Animated with TextReveal, stagger cards, HoverCard3D
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ProductCardLuxury } from '@/components/products/ProductCardLuxury';
import { TextReveal } from '@/components/effects/TextReveal';
import { HoverCard3D } from '@/components/effects/HoverCard3D';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

interface ProductData {
  slug: string;
  name: string;
  tagline: string | null;
  price: number;
  imageUrl: string;
  imageUrlHover?: string;
  concentration: string;
  size: string;
}

interface ProductsShowcaseLuxuryProps {
  products: ProductData[];
}

export function ProductsShowcaseLuxury({ products }: ProductsShowcaseLuxuryProps) {
  return (
    <section id="products" className="py-24 md:py-32 bg-[#FEFDFB]">
      <div className="container-luxury">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/80 font-light">
              Le Nostre Creazioni
            </span>
          </motion.div>

          <TextReveal className="font-cinzel text-5xl md:text-6xl lg:text-7xl text-stone-900 mb-8 tracking-tight justify-center">
            Tre Fragranze. Infinite Emozioni.
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-playfair text-xl md:text-2xl text-stone-500 leading-relaxed italic"
          >
            Ogni extrait racconta una storia. Ogni nota è un capitolo.
            Ogni spray è un viaggio nell&apos;anima.
          </motion.p>
        </div>

        {/* Products Grid — staggered entrance with HoverCard3D */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-12 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <HoverCard3D intensity={10}>
                <ProductCardLuxury {...product} />
              </HoverCard3D>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-20"
        >
          <p className="font-inter text-sm uppercase tracking-[0.2em] text-stone-400">
            Spedizione gratuita sopra i &euro;{FREE_SHIPPING_THRESHOLD}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
