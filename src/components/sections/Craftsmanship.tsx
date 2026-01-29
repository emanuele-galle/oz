import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';

export function Craftsmanship() {
  const steps = [
    {
      number: '01',
      title: 'Selezione Ingredienti',
      description: 'Viaggio alla ricerca delle materie prime più pregiate: dalle piantagioni di Rosa Damascena in Bulgaria ai laboratori di Grasse.',
    },
    {
      number: '02',
      title: 'Creazione Accord',
      description: 'Mesi di lavoro con maestri profumieri per bilanciare note di testa, cuore e fondo in armonie olfattive uniche.',
    },
    {
      number: '03',
      title: 'Macerazione',
      description: 'Ogni extrait macera per settimane in botti di vetro veneziano, permettendo alle note di fondersi perfettamente.',
    },
    {
      number: '04',
      title: 'Imbottigliamento',
      description: 'Confezionamento manuale con controllo qualità su ogni singola boccetta. Edizione limitata, certificata e numerata.',
    },
  ];

  return (
    <section className="section-padding bg-black">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-display text-gold mb-4">
            Il Processo Artigianale
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto mb-6" />
          <p className="font-playfair text-xl text-white/70 max-w-3xl mx-auto">
            Dalla visione alla boccetta: il viaggio di ogni fragranza OZ Extrait
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="glass-card p-8 md:p-12 hover:border-gold/30 transition-all duration-500 group"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
                      <span className="font-cinzel text-2xl text-gold group-hover:text-black transition-colors duration-500">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-cinzel text-3xl text-gold mb-4">
                      {step.title}
                    </h3>
                    <p className="font-inter text-white/80 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="glass-card p-12 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-cinzel text-gold mb-2">6-12</div>
              <div className="text-sm text-white/60 font-inter uppercase tracking-wide mb-2">
                Mesi di Sviluppo
              </div>
              <div className="text-white/50 text-sm">per ogni fragranza</div>
            </div>
            <div className="border-x border-white/10">
              <div className="text-5xl font-cinzel text-gold mb-2">200+</div>
              <div className="text-sm text-white/60 font-inter uppercase tracking-wide mb-2">
                Prove Olfattive
              </div>
              <div className="text-white/50 text-sm">prima della formula finale</div>
            </div>
            <div>
              <div className="text-5xl font-cinzel text-gold mb-2">40%+</div>
              <div className="text-sm text-white/60 font-inter uppercase tracking-wide mb-2">
                Concentrazione
              </div>
              <div className="text-white/50 text-sm">Extrait de Parfum puro</div>
            </div>
          </div>
        </div>

        {/* CTA to Products */}
        <div className="text-center">
          <p className="font-playfair text-2xl text-white/80 mb-8">
            Pronto a scoprire le nostre creazioni?
          </p>
          <Link href="/products/cristallo">
            <Button variant="primary" size="xl">
              Esplora le Fragranze
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
