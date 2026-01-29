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
    <section className="section-padding bg-gradient-to-b from-black to-midnight">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="glass-card p-8 text-center group hover:bg-white/5 transition-colors duration-300"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <div className="mb-6 inline-flex items-center justify-center">
                  <div className="p-4 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300">
                    <IconComponent
                      size={40}
                      className="text-gold group-hover:text-gold-light transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-cinzel text-xl text-white mb-3 group-hover:text-gold-light transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-inter text-sm text-white/60">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
