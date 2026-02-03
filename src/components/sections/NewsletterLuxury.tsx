'use client';

/**
 * NEWSLETTER LUXURY — OZ Extrait
 * Design: Dark & Bold — gold accents on deep black
 */

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
        body: JSON.stringify({ email, source: 'homepage' }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="newsletter" className="py-24 md:py-32 bg-stone-950 border-t border-gold-500/10">
      <div className="container-luxury">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 border border-gold-500/30 mb-8">
              <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>

            <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              L'Arte della Fragranza
              <br />
              <span className="text-gold-500 text-[0.6em] font-playfair italic font-light">
                direttamente nella tua inbox
              </span>
            </h2>

            <p className="font-inter text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Storie olfattive, lanci esclusivi, e l'universo OZ Extrait.
              Iscriviti alla nostra newsletter mensile.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la.tua@email.it"
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-gold-500/30 text-white placeholder:text-white/30 font-inter text-base focus:outline-none focus:border-gold-500 focus:bg-white/10 transition-all duration-300"
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group px-8 py-4 bg-gold-500 text-stone-950 font-inter text-sm uppercase tracking-[0.15em] font-semibold hover:bg-gold-400 hover:shadow-gold-medium active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

            <p className="mt-6 text-xs text-white/30 font-inter">
              Rispettiamo la tua privacy. Niente spam, solo contenuti di valore.
              <br className="hidden sm:block" />
              Puoi disiscriverti in qualsiasi momento.
            </p>

            {status === 'error' && (
              <p className="mt-4 text-sm text-red-400 font-inter">
                Qualcosa è andato storto. Riprova più tardi.
              </p>
            )}
          </form>

          {/* Decorative */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gold-500/20" />
            <div className="w-1.5 h-1.5 bg-gold-500/30 rotate-45" />
            <div className="w-12 h-px bg-gold-500/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
