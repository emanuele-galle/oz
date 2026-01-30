'use client';

/**
 * TRUST FEATURES LUXURY — OZ Extrait
 * Design: Minimal grid con icone gold + spazio generoso
 * Pattern: Byredo trust signals + luxury service promises
 */

import React from 'react';
import { Package, Sparkles, Shield, Gift } from 'lucide-react';

export function TrustFeaturesLuxury() {
  const features = [
    {
      icon: Package,
      title: 'Spedizione Gratuita',
      description: 'Su tutti gli ordini sopra €200',
    },
    {
      icon: Sparkles,
      title: 'Campioni Omaggio',
      description: 'Scopri le altre fragranze',
    },
    {
      icon: Shield,
      title: 'Garanzia Qualità',
      description: 'Soddisfatti o rimborsati',
    },
    {
      icon: Gift,
      title: 'Confezione Regalo',
      description: 'Packaging luxury incluso',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-y border-stone-200">
      <div className="container-luxury">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                {/* Icon Container */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-stone-200 group-hover:border-gold-500 group-hover:bg-gold-500/5 transition-all duration-300">
                  <Icon className="w-7 h-7 text-gold-600 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Text */}
                <h3 className="font-cinzel text-lg text-stone-900 mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="font-inter text-sm text-stone-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
