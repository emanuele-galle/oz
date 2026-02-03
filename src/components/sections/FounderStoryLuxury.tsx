'use client';

/**
 * FOUNDER STORY LUXURY — OZ Extrait
 * Design: Dark & Bold — editorial layout, gold accents
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function FounderStoryLuxury() {
  return (
    <section className="py-24 md:py-32 bg-stone-950">
      <div className="container-luxury">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Image — 7 col */}
            <div className="md:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/uploads/images/Zoe-Cristofoli.jpeg"
                  alt="Zoe Cristofoli - Founder OZ Extrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />

                {/* Frame overlay */}
                <div className="absolute inset-0 border border-gold-500/20 pointer-events-none" />
                <div className="absolute inset-4 border border-gold-500/10 pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="mt-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gold-500/20" />
                <p className="font-inter text-xs uppercase tracking-[0.2em] text-white/40">
                  Zoe Cristofoli, Verona 2024
                </p>
                <div className="h-px flex-1 bg-gold-500/20" />
              </div>
            </div>

            {/* Content — 5 col */}
            <div className="md:col-span-5 space-y-8">
              {/* Quote */}
              <div className="relative pl-8 border-l-2 border-gold-500">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gold-500 rotate-45" />
                <p className="font-playfair text-2xl md:text-3xl lg:text-4xl text-white leading-[1.3] italic mb-6">
                  "Volevo creare fragranze che fossero{' '}
                  <span className="text-gold-500 not-italic font-cinzel">anime</span>
                  , non solo profumi."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-gold-500" />
                  <span className="font-inter text-sm text-white/60">Zoe Cristofoli</span>
                </div>
              </div>

              {/* Narrative */}
              <div className="space-y-6">
                <p className="font-inter text-base text-white/70 leading-relaxed">
                  Da Verona, città dell'amore e dell'arte, Zoe Cristofoli porta
                  nel mondo della profumeria la sua visione contemporanea di
                  lusso italiano.
                </p>

                <p className="font-inter text-base text-white/70 leading-relaxed">
                  Ogni fragranza OZ Extrait nasce da mesi di ricerca, prove
                  olfattive infinite, e un'ossessione per la perfezione che
                  rispecchia l'heritage artigianale veneziano.
                </p>

                <p className="font-inter text-base text-white/70 leading-relaxed">
                  <span className="text-gold-500 font-semibold">40% di concentrazione.</span>
                  {' '}Non un compromesso, ma una promessa: fragranze che restano,
                  che evolvono, che diventano parte di chi le indossa.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gold-500/15">
                <div>
                  <div className="text-4xl font-cinzel text-gold-500 mb-1">2024</div>
                  <div className="text-xs font-inter uppercase tracking-wide text-white/40">
                    Anno di Fondazione
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-cinzel text-gold-500 mb-1">3</div>
                  <div className="text-xs font-inter uppercase tracking-wide text-white/40">
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
                  <span className="font-inter text-sm uppercase tracking-[0.15em] text-gold-400 font-medium border-b border-gold-500/40 group-hover:border-gold-500 transition-all duration-300">
                    Leggi la Storia Completa
                  </span>
                  <span className="text-gold-400 group-hover:translate-x-1 transition-transform duration-300">
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
