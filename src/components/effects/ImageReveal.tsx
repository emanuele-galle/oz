'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function ImageReveal({ src, alt, className = '', fill, width, height }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Overlay that slides away */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 bg-[#FBF8F3] z-10 origin-right"
      />

      {/* Image */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
      >
        {fill ? (
          <Image src={src} alt={alt} fill className="object-cover" />
        ) : (
          <Image src={src} alt={alt} width={width} height={height} className="object-cover w-full h-full" />
        )}
      </motion.div>
    </div>
  );
}
