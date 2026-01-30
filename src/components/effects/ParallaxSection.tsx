'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxSectionProps {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
  speed?: number;
  children?: React.ReactNode;
}

export function ParallaxSection({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  speed = 0.5,
  children,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover scale-110"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {title && (
          <h2 className="font-cinzel text-5xl md:text-7xl text-gold mb-6 text-shadow-glow-gold">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="font-playfair text-2xl md:text-3xl text-white/90 max-w-3xl">
            {subtitle}
          </p>
        )}
        {children}
      </motion.div>
    </section>
  );
}
