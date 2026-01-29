'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCartStore();
  const { orderNumber, resetCheckout } = useCheckoutStore();
  const [isCleared, setIsCleared] = useState(false);

  useEffect(() => {
    // Clear cart dopo checkout success (solo una volta)
    if (sessionId && !isCleared) {
      clearCart();
      setIsCleared(true);
    }
  }, [sessionId, clearCart, isCleared]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Content */}
        <h1 className="font-cinzel text-4xl md:text-5xl text-gold mb-4">
          Ordine Confermato!
        </h1>

        <p className="text-xl text-white/80 mb-8">
          Grazie per il tuo acquisto. Riceverai una email di conferma a breve.
        </p>

        {orderNumber && (
          <div className="glass-card p-6 mb-8">
            <p className="text-white/60 text-sm mb-2">Numero Ordine</p>
            <p className="text-2xl font-mono text-gold font-bold">{orderNumber}</p>
          </div>
        )}

        {/* Info Box */}
        <div className="glass-card p-6 text-left space-y-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-gold text-2xl">📦</div>
            <div>
              <h3 className="text-white font-medium mb-1">Spedizione</h3>
              <p className="text-white/60 text-sm">
                Il tuo ordine sarà spedito entro 1-2 giorni lavorativi. Riceverai una email
                con il tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-gold text-2xl">✉️</div>
            <div>
              <h3 className="text-white font-medium mb-1">Email di Conferma</h3>
              <p className="text-white/60 text-sm">
                Controlla la tua inbox per tutti i dettagli dell'ordine.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-gold text-2xl">💬</div>
            <div>
              <h3 className="text-white font-medium mb-1">Assistenza</h3>
              <p className="text-white/60 text-sm">
                Per qualsiasi domanda:{' '}
                <a href="mailto:info@oz.fodivps2.cloud" className="text-gold underline">
                  info@oz.fodivps2.cloud
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => {
              resetCheckout();
              router.push('/');
            }}
          >
            Torna alla Home
          </Button>
          <Button onClick={() => router.push('/products/cristallo')}>
            Continua gli Acquisti
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-gold">Caricamento...</div></div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
