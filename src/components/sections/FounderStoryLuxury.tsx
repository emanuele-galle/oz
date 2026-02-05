'use client';

/**
 * FOUNDER STORY LUXURY — OZ Extrait
 * Design: Light Luxury — cream background, editorial layout, gold accents
 * Rich multimedia: 3 images + video
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TextReveal } from '@/components/effects/TextReveal';
import { ImageReveal } from '@/components/effects/ImageReveal';

export function FounderStoryLuxury() {
  return (
    <section className="py-24 md:py-32 bg-[#FBF8F3] overflow-hidden">
      <div className="container-luxury">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Image Column — 7 col, slide from left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              className="md:col-span-7 space-y-6"
            >
              {/* Primary image with ImageReveal */}
              <div className="relative overflow-hidden">
                <ImageReveal
                  src="/uploads/images/Zoe-Cristofoli.jpeg"
                  alt="Zoe Cristofoli - Founder OZ Extrait"
                  width={800}
                  height={1000}
                  className="aspect-[4/5] w-full"
                />

                {/* Secondary image overlapping */}
                <motion.div
                  initial={{ opacity: 0, y: 30, x: 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="absolute -bottom-8 right-0 md:right-8 w-2/5 z-20 shadow-2xl"
                >
                  <div className="relative aspect-[3/4] overflow-hidden border-2 border-stone-200">
                    <Image
                      src="/uploads/images/Zoe-2.jpeg"
                      alt="Zoe Cristofoli"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 40vw, 25vw"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Caption */}
              <div className="mt-12 flex items-center gap-4">
                <p className="font-inter text-xs uppercase tracking-[0.2em] text-stone-400">
                  Zoe Cristofoli, Verona 2024
                </p>
              </div>

              {/* Inline image between images and video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative aspect-[4/3] overflow-hidden mt-4"
              >
                <Image
                  src="/uploads/images/Zoe-3.jpeg"
                  alt="Zoe Cristofoli - visione creativa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </motion.div>

              {/* Video */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden mt-4"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="w-full aspect-video object-cover"
                >
                  <source src="/uploads/videos/Video Zoe con Schiume capelli.mp4" type="video/mp4" />
                </video>
              </motion.div>
            </motion.div>

            {/* Content — 5 col, slide from right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
              className="md:col-span-5 space-y-8 md:sticky md:top-32"
            >
              {/* Quote with TextReveal */}
              <div className="relative pl-8 border-l-2 border-gold-500">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gold-500 rotate-45" />
                <TextReveal
                  className="font-playfair text-2xl md:text-3xl lg:text-4xl text-stone-800 leading-[1.3] italic mb-6"
                  delay={0.3}
                >
                  Volevo creare fragranze che fossero anime, non solo profumi.
                </TextReveal>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-gold-500" />
                  <span className="font-inter text-sm text-stone-500">Zoe Cristofoli</span>
                </div>
              </div>

              {/* Narrative */}
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-inter text-base text-stone-600 leading-relaxed"
                >
                  Da Verona, citta dell&apos;amore e dell&apos;arte, Zoe Cristofoli porta
                  nel mondo della profumeria la sua visione contemporanea di
                  lusso italiano.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="font-inter text-base text-stone-600 leading-relaxed"
                >
                  Ogni fragranza OZ Extrait nasce da mesi di ricerca, prove
                  olfattive infinite, e un&apos;ossessione per la perfezione che
                  rispecchia l&apos;heritage artigianale veneziano.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="font-inter text-base text-stone-600 leading-relaxed"
                >
                  <span className="text-gold-600 font-semibold">40% di concentrazione.</span>
                  {' '}Non un compromesso, ma una promessa: fragranze che restano,
                  che evolvono, che diventano parte di chi le indossa.
                </motion.p>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 gap-6 pt-8 border-t border-stone-200"
              >
                <div>
                  <div className="text-4xl font-cinzel text-gold-500 mb-1">2024</div>
                  <div className="text-xs font-inter uppercase tracking-wide text-stone-400">
                    Anno di Fondazione
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-cinzel text-gold-500 mb-1">3</div>
                  <div className="text-xs font-inter uppercase tracking-wide text-stone-400">
                    Fragranze Signature
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pt-4"
              >
                <Link
                  href="/zoe-cristofoli"
                  className="inline-flex items-center gap-3 group"
                >
                  <span className="font-inter text-sm uppercase tracking-[0.15em] text-gold-600 font-medium border-b border-gold-500/40 group-hover:border-gold-500 transition-all duration-300">
                    Leggi la Storia Completa
                  </span>
                  <span className="text-gold-600 group-hover:translate-x-1 transition-transform duration-300">
                    &rarr;
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
