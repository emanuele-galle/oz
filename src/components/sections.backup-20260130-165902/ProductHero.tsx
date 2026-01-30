'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ProductGallery } from '@/components/media';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const { addItem } = useCartStore();

  const currentSize = product.sizes[selectedSize];

  const handleAddToCart = () => {
    addItem(product, currentSize, 1);
    toast.success('Aggiunto al carrello', {
      description: `${product.name} - ${currentSize.volume}`,
    });
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
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="font-cinzel text-5xl md:text-6xl text-gradient-gold mb-3">
                {product.name}
              </h1>
              <p className="font-playfair text-2xl text-white/70 italic">
                {product.tagline}
              </p>
            </motion.div>

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label className="block text-sm font-inter font-medium text-white/80 mb-3 uppercase tracking-wide">
                Seleziona Formato
              </label>
              <div className="flex gap-3">
                {product.sizes.map((size, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedSize(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 border-2 rounded-lg transition-all font-inter text-sm uppercase tracking-wide ${
                      selectedSize === index
                        ? 'border-gold bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.5)]'
                        : 'border-white/20 text-white hover:border-gold hover:bg-gold/10'
                    }`}
                  >
                    {size.volume}
                    {size.isTester && ' Tester'}
                  </motion.button>
                ))}
              </div>
            </motion.div>

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-6"
            >
              <MagneticButton
                onClick={handleAddToCart}
                intensity={0.3}
                className={`w-full py-6 rounded-full font-inter font-bold text-lg uppercase tracking-wider transition-all duration-300 ${
                  currentSize.stockQuantity === 0
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-gold text-black shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] hover:bg-gold-light'
                }`}
              >
                {currentSize.stockQuantity === 0
                  ? 'Non Disponibile'
                  : `Aggiungi al Carrello - €${currentSize.price}`}
              </MagneticButton>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              {[
                { label: 'Concentrazione', value: product.concentration },
                { label: 'Longevità', value: product.longevity },
                { label: 'Sillage', value: product.sillage },
                { label: 'SKU', value: currentSize.sku },
              ].map((detail, index) => (
                <motion.div
                  key={index}
                  className="glass-card-premium p-4 group hover:bg-white/5 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="text-xs text-white/50 font-inter uppercase tracking-wide mb-1 group-hover:text-gold/70 transition-colors">
                    {detail.label}
                  </div>
                  <div className="text-lg font-cinzel text-gold group-hover:text-gold-light transition-colors">
                    {detail.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
