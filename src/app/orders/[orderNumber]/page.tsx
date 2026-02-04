'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface OrderData {
  orderNumber: string;
  status: string;
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
  trackingNumber: string | null;
  carrier: string | null;
  createdAt: string;
  shippedAt: string | null;
  deliveredAt: string | null;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'In Attesa', color: 'text-yellow-500' },
  PROCESSING: { label: 'In Lavorazione', color: 'text-blue-400' },
  SHIPPED: { label: 'Spedito', color: 'text-purple-400' },
  DELIVERED: { label: 'Consegnato', color: 'text-green-400' },
  CANCELLED: { label: 'Annullato', color: 'text-red-400' },
  REFUNDED: { label: 'Rimborsato', color: 'text-stone-400' },
};

export default function OrderTrackingPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderNumber) return;

    fetch(`/api/orders/${orderNumber}`)
      .then((res) => {
        if (!res.ok) throw new Error('Ordine non trovato');
        return res.json();
      })
      .then((data) => setOrder(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [orderNumber]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cinzel text-4xl text-gold-500/60 animate-pulse">OZ</h1>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-cinzel text-3xl text-white mb-4">Ordine Non Trovato</h1>
          <p className="text-white/70 mb-8">
            L&apos;ordine <span className="font-mono text-gold">{orderNumber}</span> non esiste
            o non è stato trovato.
          </p>
          <Link href="/">
            <Button variant="outline">Torna alla Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const status = statusLabels[order.status] || { label: order.status, color: 'text-white' };

  // Order progress steps
  const steps = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
  const currentStepIndex = steps.indexOf(order.status);
  const isCancelled = order.status === 'CANCELLED' || order.status === 'REFUNDED';

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-3xl md:text-4xl text-gold mb-2">Stato Ordine</h1>
          <p className="font-mono text-lg text-white/80">{order.orderNumber}</p>
        </div>

        {/* Status Badge */}
        <div className="glass-card-dark p-6 text-center mb-8">
          <p className="text-sm text-white/80 uppercase tracking-wider mb-2">Stato Attuale</p>
          <p className={`text-2xl font-cinzel font-bold ${status.color}`}>{status.label}</p>
        </div>

        {/* Progress Steps (only for normal flow) */}
        {!isCancelled && (
          <div className="glass-card-dark p-6 mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const stepInfo = statusLabels[step];
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          isCurrent
                            ? 'border-gold bg-gold text-black'
                            : isActive
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-white/30 text-white/50'
                        }`}
                      >
                        {isActive && index < currentStepIndex ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-xs mt-2 hidden sm:block ${isActive ? 'text-white/90' : 'text-white/50'}`}>
                        {stepInfo.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 ${
                          index < currentStepIndex ? 'bg-green-500' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* Tracking Info */}
        {order.trackingNumber && (
          <div className="glass-card-dark p-6 mb-8">
            <h3 className="text-sm uppercase tracking-wider text-white/80 mb-3">Tracking Spedizione</h3>
            <div className="flex items-center justify-between">
              <div>
                {order.carrier && <p className="text-white/80 text-sm mb-1">{order.carrier}</p>}
                <p className="font-mono text-gold text-lg">{order.trackingNumber}</p>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="glass-card-dark p-6 mb-8">
          <h3 className="text-sm uppercase tracking-wider text-white/80 mb-4">Dettagli Ordine</h3>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-white/70 text-sm">
                <span>
                  {item.productName} {item.sizeVolume}ml × {item.quantity}
                </span>
                <span>€{item.subtotal.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-3 space-y-2">
              <div className="flex justify-between text-white/70 text-sm">
                <span>Subtotale</span>
                <span>€{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/70 text-sm">
                <span>Spedizione</span>
                <span>{order.shippingCost === 0 ? 'Gratuita' : `€${order.shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gold font-bold text-lg pt-1">
                <span>Totale</span>
                <span>€{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-card-dark p-6 mb-8">
          <h3 className="text-sm uppercase tracking-wider text-white/80 mb-4">Cronologia</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
              <div>
                <p className="text-white/80 text-sm">Ordine creato</p>
                <p className="text-white/70 text-xs">{new Date(order.createdAt).toLocaleString('it-IT')}</p>
              </div>
            </div>
            {order.shippedAt && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-sm">Ordine spedito</p>
                  <p className="text-white/70 text-xs">{new Date(order.shippedAt).toLocaleString('it-IT')}</p>
                </div>
              </div>
            )}
            {order.deliveredAt && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-sm">Ordine consegnato</p>
                  <p className="text-white/70 text-xs">{new Date(order.deliveredAt).toLocaleString('it-IT')}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <p className="text-white/80 text-sm">
            Hai bisogno di aiuto?{' '}
            <a href="mailto:info@oz.fodivps2.cloud" className="text-gold underline">
              Contattaci
            </a>
          </p>
          <Link href="/">
            <Button variant="outline">Torna alla Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
