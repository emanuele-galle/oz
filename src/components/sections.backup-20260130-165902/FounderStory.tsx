'use client';

import React from 'react';
import Image from 'next/image';

export function FounderStory() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container-luxury">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold mb-4">
              Una Storia di Passione
            </h2>
            <div className="h-1 w-24 bg-gold mx-auto mb-6" />
            <p className="font-playfair text-xl text-white/70 max-w-3xl mx-auto">
              Da Verona al mondo: il viaggio di Zoe Cristofoli nell'universo del lusso
            </p>
          </div>

          {/* Story Content */}
          <div className="space-y-16">
            {/* Chapter 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="font-cinzel text-3xl text-gold mb-6">
                  Le Origini
                </h3>
                <p className="font-inter text-white/80 leading-relaxed mb-4">
                  Nata a Verona, città dell'amore e dell'arte, Zoe Cristofoli ha sempre avuto una
                  personalità forte e distintiva. Il suo percorso nel mondo dell'immagine e della moda
                  l'ha portata a diventare una delle influencer più seguite in Italia.
                </p>
                <p className="font-inter text-white/80 leading-relaxed">
                  Con i suoi tatuaggi iconici e il suo stile inconfondibile, Zoe ha sempre cercato modi
                  per esprimere la propria identità, trovando nell'arte olfattiva la forma di espressione
                  più pura e intima.
                </p>
              </div>
              <div className="order-1 md:order-2 relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src="/uploads/images/Zoe-2.jpeg"
                  alt="Zoe Cristofoli"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src="/uploads/images/Zoe-3.jpeg"
                  alt="Zoe Cristofoli - The Vision"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-cinzel text-3xl text-gold mb-6">
                  La Visione
                </h3>
                <p className="font-inter text-white/80 leading-relaxed mb-4">
                  &quot;Volevo creare qualcosa che andasse oltre l'immagine, qualcosa che rimanesse sulla pelle
                  e nell'anima,&quot; racconta Zoe. &quot;I profumi hanno il potere di evocare ricordi, emozioni,
                  momenti. Volevo che le mie fragranze raccontassero storie.&quot;
                </p>
                <p className="font-inter text-white/80 leading-relaxed">
                  Dopo anni di ricerca e collaborazioni con i migliori nasi della profumeria francese e
                  italiana, nasce OZ Extrait: tre fragranze che incarnano forza, sensualità e autenticità.
                </p>
              </div>
            </div>

            {/* Video Section */}
            <div className="glass-card p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <h3 className="font-cinzel text-3xl text-gold mb-6 text-center">
                  Zoe Racconta OZ Extrait
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-black/50">
                  <video
                    controls
                    className="w-full h-full"
                    poster="/uploads/images/Zoe-Cristofoli.jpeg"
                  >
                    <source src="/uploads/videos/Video Zoe con Schiume capelli.mp4" type="video/mp4" />
                    Il tuo browser non supporta il video.
                  </video>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="text-center max-w-4xl mx-auto">
              <blockquote className="relative">
                <div className="absolute -top-8 -left-4 text-8xl text-gold/20 font-cinzel">&ldquo;</div>
                <p className="font-playfair text-3xl text-white/90 leading-relaxed italic relative z-10 mb-6">
                  Ogni fragranza è un pezzo di me. Cristallo per la purezza che cerco, Scintilla per
                  l'energia che porto, Potion d'Amour per la passione che vivo.
                </p>
                <footer className="font-inter text-gold uppercase tracking-widest text-sm">
                  — Zoe Cristofoli
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
