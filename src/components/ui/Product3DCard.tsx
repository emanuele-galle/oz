'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { type Product } from '@/types/product';

interface Product3DCardProps {
  product: Product;
}

export function Product3DCard({ product }: Product3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];
  const basePrice = product.sizes?.[0]?.price || 0;

  return (
    <Link href={`/products/${product.slug}`} className="block" data-cursor data-cursor-text="View">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative group"
      >
        <motion.div
          className="relative bg-gradient-to-br from-zinc-900 to-black rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/40 transition-colors"
          animate={{
            boxShadow: isHovering
              ? '0 25px 50px -12px rgba(212, 175, 55, 0.25)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Image container */}
          <div className="relative aspect-[3/4] overflow-hidden">
            {primaryImage?.url && (
              <motion.div
                animate={{
                  scale: isHovering ? 1.1 : 1,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60" />

            {/* Concentration badge */}
            {product.concentration && (
              <motion.div
                className="absolute top-4 right-4 bg-gold/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-xs font-inter font-semibold"
                style={{
                  transform: 'translateZ(20px)',
                }}
                animate={{
                  y: isHovering ? -5 : 0,
                }}
              >
                {product.concentration}
              </motion.div>
            )}
          </div>

          {/* Content */}
          <motion.div
            className="p-6"
            style={{
              transform: 'translateZ(30px)',
            }}
          >
            <h3 className="font-cinzel text-2xl text-gold mb-2 group-hover:text-gold-light transition-colors">
              {product.name}
            </h3>

            <p className="font-playfair text-white/70 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-white/50 text-xs font-inter uppercase tracking-wider">
                  Da
                </span>
                <span className="font-cinzel text-2xl text-gold ml-2">
                  €{basePrice}
                </span>
              </div>

              <motion.div
                className="text-gold text-sm font-inter font-medium"
                animate={{
                  x: isHovering ? 5 : 0,
                }}
              >
                Scopri →
              </motion.div>
            </div>
          </motion.div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              transform: 'translateX(-100%)',
            }}
            animate={{
              transform: isHovering ? 'translateX(100%)' : 'translateX(-100%)',
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </Link>
  );
}
