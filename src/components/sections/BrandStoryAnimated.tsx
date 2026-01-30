'use client';

import React from 'react';
import { ImageReveal } from '@/components/effects/ImageReveal';
import { TextReveal } from '@/components/effects/TextReveal';
import { useScrollReveal, useCountUp } from '@/hooks/useScrollAnimation';

export function BrandStoryAnimated() {
  const titleRef = useScrollReveal({ delay: 0 });
  const textRef = useScrollReveal({ delay: 0.2 });
  const imageRef = useScrollReveal({ delay: 0.3 });

  const counter1Ref = useCountUp(40, 2);
  const counter2Ref = useCountUp(12, 2);
  const counter3Ref = useCountUp(100, 2);

  return (
    <section className="section-padding bg-midnight">
      <div className="container-luxury">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div ref={titleRef as any}>
              <h2 className="font-cinzel text-display text-gold">
                L'Essenza del Lusso
              </h2>
              <div className="h-1 w-24 bg-gold mt-4" />
            </div>

            <div ref={textRef as any}>
              <p className="font-playfair text-xl text-white/80 leading-relaxed">
                OZ Extrait nasce dalla passione di <span className="text-gold">Zoe Cristofoli</span> per la
                profumeria di nicchia e l'arte della creazione olfattiva.
              </p>

              <p className="font-inter text-white/70 leading-relaxed mt-4">
                Ogni fragranza è un'opera d'arte artigianale, realizzata con ingredienti selezionati dalle
                migliori coltivazioni del mondo. Con una concentrazione di <strong className="text-gold">Extrait de Parfum al 40%</strong>,
                le nostre creazioni offrono una longevità e un sillage incomparabili.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div ref={counter1Ref as any} className="text-4xl font-cinzel text-gold mb-2">40</div>
                <div className="text-sm text-white/60 font-inter uppercase tracking-wide">
                  % Concentrazione
                </div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="flex items-baseline justify-center gap-1">
                  <div ref={counter2Ref as any} className="text-4xl font-cinzel text-gold mb-2">12</div>
                  <span className="text-2xl font-cinzel text-gold">+</span>
                </div>
                <div className="text-sm text-white/60 font-inter uppercase tracking-wide">
                  Ore di Durata
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <div ref={counter3Ref as any} className="text-4xl font-cinzel text-gold mb-2">100</div>
                  <span className="text-2xl font-cinzel text-gold">%</span>
                </div>
                <div className="text-sm text-white/60 font-inter uppercase tracking-wide">
                  Artigianale
                </div>
              </div>
            </div>
          </div>

          {/* Image with Reveal Effect */}
          <div ref={imageRef as any} className="relative">
            <ImageReveal
              src="/uploads/images/Zoe-Cristofoli.jpeg"
              alt="Zoe Cristofoli - Founder OZ Extrait"
              className="relative aspect-[3/4] rounded-lg"
              fill
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg pointer-events-none" />

            {/* Decorative Elements with animation */}
            <div className="absolute -top-8 -left-8 w-32 h-32 border-2 border-gold/30 -z-10 animate-float" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-gold/30 -z-10 animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
