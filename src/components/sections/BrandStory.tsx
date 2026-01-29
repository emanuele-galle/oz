import React from 'react';
import Image from 'next/image';

export function BrandStory() {
  return (
    <section className="section-padding bg-midnight">
      <div className="container-luxury">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="font-cinzel text-display text-gold">
              L'Essenza del Lusso
            </h2>
            <div className="h-1 w-24 bg-gold" />

            <p className="font-playfair text-xl text-white/80 leading-relaxed">
              OZ Extrait nasce dalla passione di <span className="text-gold">Zoe Cristofoli</span> per la
              profumeria di nicchia e l'arte della creazione olfattiva.
            </p>

            <p className="font-inter text-white/70 leading-relaxed">
              Ogni fragranza è un'opera d'arte artigianale, realizzata con ingredienti selezionati dalle
              migliori coltivazioni del mondo. Con una concentrazione di <strong className="text-gold">Extrait de Parfum al 40%</strong>,
              le nostre creazioni offrono una longevità e un sillage incomparabili.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-4xl font-cinzel text-gold mb-2">40%</div>
                <div className="text-sm text-white/60 font-inter uppercase tracking-wide">
                  Concentrazione
                </div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-4xl font-cinzel text-gold mb-2">12+</div>
                <div className="text-sm text-white/60 font-inter uppercase tracking-wide">
                  Ore di Durata
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-cinzel text-gold mb-2">100%</div>
                <div className="text-sm text-white/60 font-inter uppercase tracking-wide">
                  Artigianale
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src="/uploads/images/Zoe-Cristofoli.jpeg"
                alt="Zoe Cristofoli - Founder OZ Extrait"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-8 -left-8 w-32 h-32 border-2 border-gold/30 -z-10" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-gold/30 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
