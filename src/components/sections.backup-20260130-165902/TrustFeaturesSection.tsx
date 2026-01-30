'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollAnimation';
import { ShippingFastIcon } from '@/components/icons/features/ShippingFastIcon';
import { SecurePaymentIcon } from '@/components/icons/features/SecurePaymentIcon';
import { QualitySealIcon } from '@/components/icons/features/QualitySealIcon';
import { NaturalIngredientsIcon } from '@/components/icons/features/NaturalIngredientsIcon';
import { GiftBoxIcon } from '@/components/icons/features/GiftBoxIcon';
import { GuaranteeIcon } from '@/components/icons/features/GuaranteeIcon';

interface Feature {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: ShippingFastIcon,
    title: 'Spedizione Gratuita',
    description: 'Su ordini superiori a €100',
  },
  {
    icon: SecurePaymentIcon,
    title: 'Pagamenti Sicuri',
    description: 'SSL & Stripe certificati',
  },
  {
    icon: QualitySealIcon,
    title: '100% Artigianale',
    description: 'Fatto a mano in Italia',
  },
  {
    icon: NaturalIngredientsIcon,
    title: 'Ingredienti Naturali',
    description: 'Materie prime selezionate',
  },
  {
    icon: GiftBoxIcon,
    title: 'Confezione Luxury',
    description: 'Packaging premium incluso',
  },
  {
    icon: GuaranteeIcon,
    title: 'Garanzia 30 Giorni',
    description: 'Soddisfatti o rimborsati',
  },
];

export function TrustFeaturesSection() {
  const headerRef = useScrollReveal({ delay: 0 });
  const gridRef = useStaggerReveal(0.1);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-midnight">
      <div className="container-luxury">
        {/* Section Header */}
        <div ref={headerRef as any} className="text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl text-gold mb-4">
            Perché OZ Extrait
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto mb-6" />
          <p className="font-playfair text-lg text-white/60 max-w-2xl mx-auto">
            La tua esperienza olfattiva è la nostra priorità
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={gridRef as any}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="glass-card-premium p-8 text-center group relative overflow-hidden"
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ transform: 'translateZ(-10px)' }}
                />

                {/* Icon */}
                <motion.div
                  className="mb-6 inline-flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300 glow-gold">
                    <IconComponent
                      size={40}
                      className="text-gold group-hover:text-gold-light transition-colors duration-300"
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="font-cinzel text-xl text-white mb-3 group-hover:text-gradient-gold transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-inter text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Bottom shine effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
