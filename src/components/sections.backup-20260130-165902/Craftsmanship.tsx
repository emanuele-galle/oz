import React from 'react';
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
    <section className="py-16 md:py-24 bg-stone-50">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-4">
            Il Processo Artigianale
          </h2>
          <div className="h-1 w-24 bg-gold-500 mx-auto mb-6" />
          <p className="font-playfair text-xl text-stone-600 max-w-3xl mx-auto">
            Dalla visione alla boccetta: il viaggio di ogni fragranza OZ Extrait
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white border border-stone-200 rounded-lg p-8 md:p-12 hover:border-gold-500/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full border-2 border-gold-500 flex items-center justify-center group-hover:bg-gold-500 transition-colors duration-300">
                      <span className="font-cinzel text-2xl text-gold-600 group-hover:text-white transition-colors duration-300">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-cinzel text-3xl text-stone-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="font-inter text-stone-700 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="bg-white border border-stone-200 rounded-lg p-12 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-cinzel text-gold-600 mb-2">6-12</div>
              <div className="text-sm text-stone-600 font-inter uppercase tracking-wide mb-2">
                Mesi di Sviluppo
              </div>
              <div className="text-stone-500 text-sm">per ogni fragranza</div>
            </div>
            <div className="border-x border-stone-200">
              <div className="text-5xl font-cinzel text-gold-600 mb-2">200+</div>
              <div className="text-sm text-stone-600 font-inter uppercase tracking-wide mb-2">
                Prove Olfattive
              </div>
              <div className="text-stone-500 text-sm">prima della formula finale</div>
            </div>
            <div>
              <div className="text-5xl font-cinzel text-gold-600 mb-2">40%+</div>
              <div className="text-sm text-stone-600 font-inter uppercase tracking-wide mb-2">
                Concentrazione
              </div>
              <div className="text-stone-500 text-sm">Extrait de Parfum puro</div>
            </div>
          </div>
        </div>

        {/* CTA to Products */}
        <div className="text-center">
          <p className="font-playfair text-2xl text-stone-700 mb-8">
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
