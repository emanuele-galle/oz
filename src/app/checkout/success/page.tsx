'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';

interface OrderData {
  orderNumber: string;
  email: string;
  items: {
    productName: string;
    sizeVolume: number;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  subtotal: number;
  shippingCost: number;
  total: number;
}

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCartStore();
  const { orderNumber: storeOrderNumber, resetCheckout } = useCheckoutStore();
  const [isCleared, setIsCleared] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clear cart and reset checkout state on success
    if (sessionId && !isCleared) {
      clearCart();
      resetCheckout();
      setIsCleared(true);

      // Fetch order details
      fetch(`/api/checkout/order/${sessionId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setOrderData(data);
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [sessionId, clearCart, resetCheckout, isCleared]);

  const displayOrderNumber = orderData?.orderNumber || storeOrderNumber;

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

        {displayOrderNumber && (
          <div className="glass-card-dark p-6 mb-8">
            <p className="text-white/80 text-sm mb-2">Numero Ordine</p>
            <p className="text-2xl font-mono text-gold font-bold">{displayOrderNumber}</p>
          </div>
        )}

        {/* Order details */}
        {isLoading ? (
          <div className="glass-card-dark p-6 mb-8 space-y-3 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-1/3 mx-auto" />
            <div className="h-3 bg-white/5 rounded w-2/3 mx-auto" />
            <div className="h-3 bg-white/5 rounded w-1/2 mx-auto" />
            <div className="h-5 bg-white/10 rounded w-1/3 mx-auto mt-4" />
          </div>
        ) : orderData ? (
          <div className="glass-card-dark p-6 mb-8 text-left space-y-3">
            <h3 className="text-sm uppercase tracking-wider text-white/80 mb-3 text-center">
              Dettagli Ordine
            </h3>
            {orderData.items.map((item, i) => (
              <div key={i} className="flex justify-between text-white/70 text-sm">
                <span>{item.productName} {item.sizeVolume}ml × {item.quantity}</span>
                <span>€{item.subtotal.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-3 space-y-2">
              <div className="flex justify-between text-white/70 text-sm">
                <span>Subtotale</span>
                <span>€{orderData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/70 text-sm">
                <span>Spedizione</span>
                <span>{orderData.shippingCost === 0 ? 'Gratuita' : `€${orderData.shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gold font-bold text-lg pt-1">
                <span>Totale</span>
                <span>€{orderData.total.toFixed(2)}</span>
              </div>
            </div>
            {orderData.email && (
              <p className="text-xs text-white/80 text-center pt-2">
                Conferma inviata a {orderData.email}
              </p>
            )}
          </div>
        ) : null}

        {/* Info Box */}
        <div className="glass-card-dark p-6 text-left space-y-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-gold text-2xl">📦</div>
            <div>
              <h3 className="text-white font-medium mb-1">Spedizione</h3>
              <p className="text-white/80 text-sm">
                Il tuo ordine sarà spedito entro 1-2 giorni lavorativi. Riceverai una email
                con il tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-gold text-2xl">✉️</div>
            <div>
              <h3 className="text-white font-medium mb-1">Email di Conferma</h3>
              <p className="text-white/80 text-sm">
                Controlla la tua inbox per tutti i dettagli dell&apos;ordine.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-gold text-2xl">💬</div>
            <div>
              <h3 className="text-white font-medium mb-1">Assistenza</h3>
              <p className="text-white/80 text-sm">
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
