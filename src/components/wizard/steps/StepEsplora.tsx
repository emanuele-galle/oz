'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fragranceResults, comparisonData, type FragranceId } from '@/data/fragrance-wizard';

interface StepEsploraProps {
  recommendedId: FragranceId | null;
  onRestart: () => void;
}

const allFragrances: FragranceId[] = ['cristallo', 'scintilla', 'potion-damour'];

export function StepEsplora({ recommendedId, onRestart }: StepEsploraProps) {
  return (
    <div className="bg-[#FBF8F3] min-h-[80vh] py-16 md:py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h2 className="font-cinzel text-3xl md:text-4xl text-stone-900">
            Esplora Tutte le Fragranze
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/40" />
            <div className="w-1.5 h-1.5 bg-gold-500/40 rotate-45" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/40" />
          </div>
          <p className="font-playfair text-lg text-stone-500 italic max-w-xl mx-auto">
            Tre fragranze, tre anime. Scoprile tutte.
          </p>
        </motion.div>

        {/* Fragrance Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {allFragrances.map((id, i) => {
            const frag = fragranceResults[id];
            const isRecommended = id === recommendedId;

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.15 }}
              >
                <Link
                  href={frag.slug}
                  className="group block bg-white border border-stone-200/60 overflow-hidden hover:border-gold-500/30 hover:shadow-lg transition-all duration-500 relative"
                >
                  {isRecommended && (
                    <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-gold-500 text-stone-950 font-inter text-[10px] uppercase tracking-widest font-bold">
                      Per Te
                    </div>
                  )}

                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={frag.image}
                      alt={frag.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-cinzel text-2xl text-white">{frag.name}</p>
                      <p className="font-inter text-xs text-white/70 uppercase tracking-wider">{frag.family}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="font-playfair text-base text-stone-700 italic">{frag.tagline}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-inter text-stone-400">{frag.season}</span>
                      <span className="font-cinzel text-gold-600 font-medium">{frag.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gold-600 font-inter text-sm font-medium uppercase tracking-wide group-hover:gap-3 transition-all duration-300 pt-1">
                      <span>Scopri</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <h3 className="font-cinzel text-2xl text-stone-900 text-center">
            Confronto Rapido
          </h3>

          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <p className="text-center text-xs text-stone-400 mb-3 md:hidden">Scorri per vedere tutte le fragranze &rarr;</p>
            <table className="w-full border-collapse min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-gold-500/40">
                  <th className="font-cinzel text-left p-2 md:p-4 text-stone-900 text-sm md:text-base" />
                  <th className="font-cinzel text-center p-2 md:p-4 text-gold-600 text-sm md:text-base">Cristallo</th>
                  <th className="font-cinzel text-center p-2 md:p-4 text-gold-600 text-sm md:text-base">Scintilla</th>
                  <th className="font-cinzel text-center p-2 md:p-4 text-gold-600 text-sm md:text-base whitespace-nowrap">Potion d&apos;Amour</th>
                </tr>
              </thead>
              <tbody className="font-inter text-xs md:text-sm">
                {comparisonData.map((row) => (
                  <tr key={row.label} className="border-b border-stone-200/60">
                    <td className="p-2 md:p-4 font-medium text-stone-700">{row.label}</td>
                    {row.values.map((val, i) => (
                      <td key={i} className="p-2 md:p-4 text-center text-stone-600">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Tester CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-5 bg-white border border-stone-200 p-8 md:p-12"
        >
          <p className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70">
            Non riesci a scegliere?
          </p>
          <h3 className="font-cinzel text-2xl md:text-3xl text-stone-900">
            Prova i Tester da 10ml
          </h3>
          <p className="font-inter text-sm text-stone-500 max-w-lg mx-auto">
            Ogni fragranza è disponibile in formato tester da 10ml.
            Provale sulla tua pelle prima di scegliere il formato completo da 50ml.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/fragranze"
              className="px-8 py-3 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500"
            >
              Scopri le Fragranze
            </Link>
            <button
              onClick={onRestart}
              className="px-8 py-3 border border-stone-300 text-stone-600 font-inter text-sm font-medium uppercase tracking-[0.15em] hover:border-gold-500 hover:text-gold-600 transition-all duration-300"
            >
              Rifai il Quiz
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
