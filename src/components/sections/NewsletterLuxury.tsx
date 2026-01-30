'use client';

/**
 * NEWSLETTER LUXURY — OZ Extrait
 * Design: Bold gold background + inline form elegante
 * Pattern: Strong CTA moment + editorial simplicity
 */

import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export function NewsletterLuxury() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-24 md:py-32 bg-gold-500">
      <div className="container-luxury">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            {/* Icon decorativo */}
            <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-white/40 mb-8">
              <Mail className="w-7 h-7 text-white" />
            </div>

            <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              L'Arte della Fragranza
              <br />
              <span className="text-stone-900 text-[0.6em] font-playfair italic font-light">
                direttamente nella tua inbox
              </span>
            </h2>

            <p className="font-inter text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
              Storie olfattive, lanci esclusivi, e l'universo OZ Extrait.
              Iscriviti alla nostra newsletter mensile.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la.tua@email.it"
                  required
                  className="w-full px-6 py-4 bg-white/95 backdrop-blur-sm border border-white/40 text-stone-900 placeholder:text-stone-400 font-inter text-base focus:outline-none focus:border-white focus:bg-white transition-all duration-300"
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group px-8 py-4 bg-stone-900 text-white font-inter text-sm uppercase tracking-[0.15em] font-medium hover:bg-stone-800 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <span>Invio...</span>
                ) : status === 'success' ? (
                  <span>✓ Iscritto!</span>
                ) : (
                  <>
                    <span>Iscriviti</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>

            {/* Privacy note */}
            <p className="mt-6 text-xs text-white/60 font-inter">
              Rispettiamo la tua privacy. Niente spam, solo contenuti di valore.
              <br className="hidden sm:block" />
              Puoi disiscriverti in qualsiasi momento.
            </p>

            {/* Error message */}
            {status === 'error' && (
              <p className="mt-4 text-sm text-red-200 font-inter">
                Qualcosa è andato storto. Riprova più tardi.
              </p>
            )}
          </form>

          {/* Decorative Elements */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <div className="w-12 h-[1px] bg-white/30" />
            <div className="w-1.5 h-1.5 bg-white/40 rotate-45" />
            <div className="w-12 h-[1px] bg-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
