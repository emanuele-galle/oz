'use client';

export const dynamic = 'force-dynamic';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'confirm' | 'loading' | 'success' | 'error'>('confirm');
  const [message, setMessage] = useState('');

  const handleUnsubscribe = async () => {
    if (!token) {
      setStatus('error');
      setMessage('Link non valido. Token mancante.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.error || 'Si è verificato un errore.');
      }
    } catch {
      setStatus('error');
      setMessage('Errore di connessione. Riprova più tardi.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="font-cinzel text-3xl text-gold mb-4">Link Non Valido</h1>
          <p className="text-white/60">
            Questo link di disiscrizione non è valido o è scaduto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <h2 className="font-cinzel text-2xl text-gold/60 mb-12">OZ</h2>

        {status === 'confirm' && (
          <>
            <h1 className="font-cinzel text-3xl text-white mb-4">Disiscrizione Newsletter</h1>
            <p className="text-white/60 mb-8">
              Sei sicuro di voler annullare l&apos;iscrizione alla newsletter di OZ Extrait?
              Non riceverai più aggiornamenti su nuove fragranze e offerte esclusive.
            </p>
            <button
              onClick={handleUnsubscribe}
              className="px-8 py-3 bg-white/10 border border-white/20 text-white font-inter text-sm uppercase tracking-wider hover:bg-white/20 transition-all duration-300"
            >
              Conferma Disiscrizione
            </button>
          </>
        )}

        {status === 'loading' && (
          <>
            <h1 className="font-cinzel text-3xl text-white mb-4">Elaborazione...</h1>
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto" />
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-cinzel text-3xl text-white mb-4">Disiscrizione Completata</h1>
            <p className="text-white/60 mb-8">{message}</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-gold text-black font-inter text-sm uppercase tracking-wider hover:bg-gold/90 transition-all duration-300"
            >
              Torna alla Home
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="font-cinzel text-3xl text-white mb-4">Errore</h1>
            <p className="text-white/60 mb-8">{message}</p>
            <button
              onClick={() => setStatus('confirm')}
              className="px-8 py-3 bg-white/10 border border-white/20 text-white font-inter text-sm uppercase tracking-wider hover:bg-white/20 transition-all duration-300"
            >
              Riprova
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold font-cinzel">Caricamento...</div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
