import React from 'react';
import { Product } from '@/types/product';

interface OlfactoryJourneyProps {
  product: Product;
}

export function OlfactoryJourney({ product }: OlfactoryJourneyProps) {
  const notes = [
    { title: 'Note di Testa', items: product.olfactoryNotes.top, color: 'from-gold-light to-gold' },
    { title: 'Note di Cuore', items: product.olfactoryNotes.heart, color: 'from-gold to-gold-dark' },
    { title: 'Note di Fondo', items: product.olfactoryNotes.base, color: 'from-gold-dark to-midnight' },
  ];

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container-luxury">
        <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold mb-8 text-center">
          Viaggio Olfattivo
        </h2>
        <div className="h-1 w-24 bg-gold mx-auto mb-16" />

        <div className="grid md:grid-cols-3 gap-8">
          {notes.map((note, index) => (
            <div key={index} className="glass-card p-8 text-center">
              {/* Icon/Number */}
              <div className="mb-6">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${note.color} flex items-center justify-center`}>
                  <span className="font-cinzel text-2xl text-black">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-cinzel text-2xl text-gold mb-6">
                {note.title}
              </h3>

              {/* Notes List */}
              <ul className="space-y-3">
                {note.items.map((item, i) => (
                  <li key={i} className="font-inter text-white/70">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Timeline Visual */}
        <div className="mt-16 relative">
          <div className="h-2 bg-gradient-to-r from-gold-light via-gold to-gold-dark rounded-full" />
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <div className="text-center">
              <div className="w-4 h-4 bg-gold-light rounded-full mb-2" />
              <span className="text-xs font-inter text-white/50">0-15 min</span>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-gold rounded-full mb-2" />
              <span className="text-xs font-inter text-white/50">15 min - 4 ore</span>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-gold-dark rounded-full mb-2" />
              <span className="text-xs font-inter text-white/50">4 - 12+ ore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
