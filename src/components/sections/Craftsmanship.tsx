import React from 'react';
import Link from 'next/link';

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
    <section className="py-20 md:py-28 bg-black bg-noise">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-500/70 font-light">
            L'Arte
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-4">
            Il Processo Artigianale
          </h2>
          <div className="h-px w-24 bg-gold-500/40 mx-auto mb-6" />
          <p className="font-playfair text-xl text-white/60 max-w-3xl mx-auto italic">
            Dalla visione alla boccetta: il viaggio di ogni fragranza OZ Extrait
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto mb-20 space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass-card rounded-sm p-8 md:p-12 hover:border-gold-500/40 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 border border-gold-500/40 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500 transition-all duration-300">
                    <span className="font-cinzel text-xl text-gold-500">
                      {step.number}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-cinzel text-2xl md:text-3xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="font-inter text-white/60 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Metrics */}
        <div className="glass-card rounded-sm p-10 md:p-12 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-cinzel text-gold-500 mb-2">6-12</div>
              <div className="text-sm text-white/60 font-inter uppercase tracking-wide mb-1">
                Mesi di Sviluppo
              </div>
              <div className="text-white/40 text-xs">per ogni fragranza</div>
            </div>
            <div className="md:border-x md:border-gold-500/15">
              <div className="text-5xl font-cinzel text-gold-500 mb-2">200+</div>
              <div className="text-sm text-white/60 font-inter uppercase tracking-wide mb-1">
                Prove Olfattive
              </div>
              <div className="text-white/40 text-xs">prima della formula finale</div>
            </div>
            <div>
              <div className="text-5xl font-cinzel text-gold-500 mb-2">40%+</div>
              <div className="text-sm text-white/60 font-inter uppercase tracking-wide mb-1">
                Concentrazione
              </div>
              <div className="text-white/40 text-xs">Extrait de Parfum puro</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-playfair text-2xl text-white/60 mb-8 italic">
            Pronto a scoprire le nostre creazioni?
          </p>
          <Link
            href="/fragranze"
            className="inline-block px-10 py-4 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 hover:shadow-gold-medium transition-all duration-300"
          >
            Esplora le Fragranze
          </Link>
        </div>
      </div>
    </section>
  );
}
