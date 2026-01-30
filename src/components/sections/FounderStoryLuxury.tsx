'use client';

/**
 * FOUNDER STORY LUXURY — OZ Extrait
 * Design: Editorial layout con immagine dominante + quote poetica
 * Pattern: Diptyque storytelling + Le Labo authenticity
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function FounderStoryLuxury() {
  return (
    <section className="py-24 md:py-32 bg-stone-50">
      <div className="container-luxury">
        <div className="max-w-7xl mx-auto">
          {/* Layout asimmetrico - Editorial */}
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Immagine - 7 col, dominante */}
            <div className="md:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/uploads/about/zoe-portrait.jpg"
                  alt="Zoe Cristofoli - Founder OZ Extrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />

                {/* Decorative Border Frame */}
                <div className="absolute inset-0 border-8 border-white/10 pointer-events-none" />
                <div className="absolute inset-4 border border-white/20 pointer-events-none" />
              </div>

              {/* Caption sotto foto */}
              <div className="mt-6 flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-stone-300" />
                <p className="font-inter text-xs uppercase tracking-[0.2em] text-stone-500">
                  Zoe Cristofoli, Verona 2024
                </p>
                <div className="h-[1px] flex-1 bg-stone-300" />
              </div>
            </div>

            {/* Content - 5 col */}
            <div className="md:col-span-5 space-y-8">
              {/* Quote decorativa */}
              <div className="relative pl-8 border-l-2 border-gold-500">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gold-500 rotate-45" />
                <p className="font-playfair text-2xl md:text-3xl lg:text-4xl text-stone-900 leading-[1.3] italic mb-6">
                  "Volevo creare fragranze che fossero{' '}
                  <span className="text-gold-600 not-italic font-cinzel">anime</span>
                  , non solo profumi."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-gold-500" />
                  <span className="font-inter text-sm text-stone-600">Zoe Cristofoli</span>
                </div>
              </div>

              {/* Narrative */}
              <div className="space-y-6">
                <p className="font-inter text-base text-stone-700 leading-relaxed">
                  Da Verona, città dell'amore e dell'arte, Zoe Cristofoli porta
                  nel mondo della profumeria la sua visione contemporanea di
                  lusso italiano.
                </p>

                <p className="font-inter text-base text-stone-700 leading-relaxed">
                  Ogni fragranza OZ Extrait nasce da mesi di ricerca, prove
                  olfattive infinite, e un'ossessione per la perfezione che
                  rispecchia l'heritage artigianale veneziano.
                </p>

                <p className="font-inter text-base text-stone-700 leading-relaxed">
                  <span className="text-gold-600 font-semibold">40% di concentrazione.</span>
                  {' '}Non un compromesso, ma una promessa: fragranze che restano,
                  che evolvono, che diventano parte di chi le indossa.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-stone-200">
                <div>
                  <div className="text-4xl font-cinzel text-gold-600 mb-1">2024</div>
                  <div className="text-xs font-inter uppercase tracking-wide text-stone-500">
                    Anno di Fondazione
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-cinzel text-gold-600 mb-1">3</div>
                  <div className="text-xs font-inter uppercase tracking-wide text-stone-500">
                    Fragranze Signature
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Link
                  href="/il-brand/storia"
                  className="inline-flex items-center gap-3 group"
                >
                  <span className="font-inter text-sm uppercase tracking-[0.15em] text-stone-900 font-medium border-b-2 border-stone-900 group-hover:border-gold-500 group-hover:text-gold-600 transition-all duration-300">
                    Leggi la Storia Completa
                  </span>
                  <span className="text-stone-900 group-hover:text-gold-600 group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
