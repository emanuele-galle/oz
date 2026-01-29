'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Product } from '@/types/product';
import { Button } from './Button';
import { useReducedMotion } from '@/hooks';
import { tiltVariants, springConfigs } from '@/lib/animations/microInteractions';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring following
  const smoothMouseX = useSpring(mouseX, springConfigs.luxury);
  const smoothMouseY = useSpring(mouseY, springConfigs.luxury);

  // Transform to rotation (-8° to +8°)
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);

  // Parallax transform for layers
  const parallaxImageY = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);
  const parallaxContentY = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize to -0.5 to 0.5 range
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <motion.div
        ref={cardRef}
        className="glass-card overflow-hidden relative"
        variants={shouldReduceMotion ? undefined : tiltVariants}
        initial="rest"
        whileHover="hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={shouldReduceMotion ? undefined : {
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Shimmer overlay (sweep effect on hover) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10"
          initial={{ x: '-100%' }}
          animate={isHovered && !shouldReduceMotion ? { x: '200%' } : { x: '-100%' }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
          }}
        />

        {/* Image layer (parallax background) */}
        <motion.div
          className="relative aspect-[3/4] overflow-hidden bg-black/20"
          style={shouldReduceMotion ? undefined : {
            y: parallaxImageY,
            z: -20,
          }}
        >
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Button variant="primary" size="md" disableMagnetic>
              Scopri
            </Button>
          </div>
        </motion.div>

        {/* Content layer (parallax foreground) */}
        <motion.div
          className="p-6 bg-inherit"
          style={shouldReduceMotion ? undefined : {
            y: parallaxContentY,
            z: 20,
          }}
        >
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
        </motion.div>
      </motion.div>
    </Link>
  );
}
