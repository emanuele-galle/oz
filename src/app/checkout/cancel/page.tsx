'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function CheckoutCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Cancel Icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Content */}
        <h1 className="font-cinzel text-4xl md:text-5xl text-white mb-4">
          Pagamento Annullato
        </h1>

        <p className="text-xl text-white/70 mb-8">
          Il pagamento è stato annullato. Il tuo carrello è ancora attivo.
        </p>

        {/* Info */}
        <div className="glass-card p-6 text-left mb-8">
          <p className="text-white/80 mb-4">Cosa è successo?</p>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>• Hai chiuso la finestra di pagamento</li>
            <li>• Hai cliccato su "Indietro"</li>
            <li>• La sessione di pagamento è scaduta</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => router.push('/')}>
            Torna alla Home
          </Button>
          <Button onClick={() => router.push('/checkout')}>Riprova il Checkout</Button>
        </div>

        {/* Help */}
        <p className="mt-8 text-sm text-white/50">
          Hai bisogno di aiuto?{' '}
          <a href="mailto:info@oz.fodivps2.cloud" className="text-gold underline">
            Contattaci
          </a>
        </p>
      </div>
    </div>
  );
}
