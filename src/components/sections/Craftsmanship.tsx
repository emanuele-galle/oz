'use client';

/**
 * CRAFTSMANSHIP — OZ Extrait
 * Artisanal process showcase with ImageReveal, TextReveal, and CountUp
 * CountUp: Spring physics animated counters (React Bits)
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TextReveal } from '@/components/effects/TextReveal';
import { ImageReveal } from '@/components/effects/ImageReveal';
import { CountUp } from '@/components/effects/CountUp';
import { ShinyText } from '@/components/effects/ShinyText';

export function Craftsmanship() {
  const steps = [
    {
      number: '01',
      title: 'Selezione Ingredienti',
      description: 'Viaggio alla ricerca delle materie prime piu pregiate: dalle piantagioni di Rosa Damascena in Bulgaria ai laboratori di Grasse.',
      image: '/uploads/images/Cristallo 7.jpeg',
      imageAlt: 'OZ Cristallo Extrait de Parfum — essenze pure selezionate',
    },
    {
      number: '02',
      title: 'Creazione Accord',
      description: 'Mesi di lavoro con maestri profumieri per bilanciare note di testa, cuore e fondo in armonie olfattive uniche.',
      image: '/uploads/images/Scintilla-background-black.jpeg',
      imageAlt: 'OZ Scintilla Extrait de Parfum — la creazione degli accordi olfattivi',
    },
    {
      number: '03',
      title: 'Macerazione',
      description: 'Ogni extrait macera per settimane in botti di vetro veneziano, permettendo alle note di fondersi perfettamente.',
      image: '/uploads/images/Cristallo-4.jpeg',
      imageAlt: 'OZ Cristallo — liquido ambrato dopo settimane di macerazione',
    },
    {
      number: '04',
      title: 'Imbottigliamento',
      description: 'Confezionamento manuale con controllo qualita su ogni singola boccetta. Edizione limitata, certificata e numerata.',
      image: '/uploads/images/set-cristallo-scintilla-2-tester.jpeg',
      imageAlt: 'Imbottigliamento - confezionamento manuale',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <ShinyText
            text="L'Arte"
            color="rgba(212, 175, 55, 0.6)"
            shineColor="#D4AF37"
            speed={4}
            className="font-inter text-xs uppercase tracking-[0.3em] font-light mb-4 block"
          />
          <TextReveal className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-stone-900 mt-4 mb-6 justify-center">
            Il Processo Artigianale
          </TextReveal>
          <p className="font-playfair text-xl text-stone-500 max-w-3xl mx-auto italic">
            Dalla visione alla boccetta: il viaggio di ogni fragranza OZ Extrait
          </p>
        </div>

        {/* Steps — alternating 2-column grid */}
        <div className="max-w-6xl mx-auto mb-20 space-y-16 md:space-y-24">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                {/* Image — alternates left/right */}
                <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
                  <ImageReveal
                    src={step.image}
                    alt={step.imageAlt}
                    width={640}
                    height={480}
                    className="aspect-[4/3] w-full"
                  />
                </div>

                {/* Text content */}
                <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="font-cinzel text-lg text-gold-500">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-cinzel text-2xl md:text-3xl text-stone-800">
                      {step.title}
                    </h3>
                    <p className="font-inter text-stone-600 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quality Metrics — Spring physics CountUp (React Bits) */}
        <div className="glass-card rounded-sm p-10 md:p-12 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-5xl font-cinzel text-gold-500 mb-2">
                6-12
              </div>
              <div className="text-sm text-stone-500 font-inter uppercase tracking-wide mb-1">
                Mesi di Sviluppo
              </div>
              <div className="text-stone-400 text-xs">per ogni fragranza</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="md:border-x md:border-stone-200"
            >
              <div className="text-5xl font-cinzel text-gold-500 mb-2">
                <CountUp to={200} duration={2.5} separator="." />
                <span>+</span>
              </div>
              <div className="text-sm text-stone-500 font-inter uppercase tracking-wide mb-1">
                Prove Olfattive
              </div>
              <div className="text-stone-400 text-xs">prima della formula finale</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-5xl font-cinzel text-gold-500 mb-2">
                <CountUp to={40} duration={2} />
                <span>%+</span>
              </div>
              <div className="text-sm text-stone-500 font-inter uppercase tracking-wide mb-1">
                Concentrazione
              </div>
              <div className="text-stone-400 text-xs">Extrait de Parfum puro</div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-playfair text-2xl text-stone-500 mb-8 italic">
            Pronto a scoprire le nostre creazioni?
          </p>
          <Link
            href="/fragranze"
            className="inline-block px-10 py-4 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 hover:shadow-gold-medium transition-all duration-300"
          >
            Esplora le Fragranze
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
