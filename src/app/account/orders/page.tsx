'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface OrderItem {
  productName: string;
  sizeVolume: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  items: OrderItem[];
  trackingNumber: string | null;
  carrier: string | null;
  createdAt: string;
  shippedAt: string | null;
  deliveredAt: string | null;
}

const statusConfig: Record<string, { label: string; bgClass: string; textClass: string }> = {
  PENDING: { label: 'In Attesa', bgClass: 'bg-amber-50', textClass: 'text-amber-700' },
  PROCESSING: { label: 'In Lavorazione', bgClass: 'bg-blue-50', textClass: 'text-blue-700' },
  SHIPPED: { label: 'Spedito', bgClass: 'bg-purple-50', textClass: 'text-purple-700' },
  DELIVERED: { label: 'Consegnato', bgClass: 'bg-green-50', textClass: 'text-green-700' },
  CANCELLED: { label: 'Annullato', bgClass: 'bg-red-50', textClass: 'text-red-700' },
  REFUNDED: { label: 'Rimborsato', bgClass: 'bg-stone-50', textClass: 'text-stone-600' },
};

export default function AccountOrdersPage() {
  const router = useRouter();
  const { user, isInitialized, fetchUser } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isInitialized) fetchUser();
  }, [isInitialized, fetchUser]);

  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/account/login');
    }
  }, [isInitialized, user, router]);

  useEffect(() => {
    if (user) {
      fetch('/api/account/orders')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setOrders(data);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  if (!isInitialized || !user) {
    return (
      <div className="min-h-screen bg-[#FEFDFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cinzel text-4xl text-gold-500/60 animate-pulse">OZ</h1>
        </div>
      </div>
    );
  }

  const isAdmin = user.role === 'ADMIN' || user.role === 'STAFF';

  return (
    <div className="min-h-screen bg-[#FEFDFB] py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-3xl md:text-4xl text-stone-900 mb-2">I Miei Ordini</h1>
          <p className="font-inter text-sm text-stone-500">
            Storico e stato dei tuoi ordini
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-10 pb-6 border-b border-stone-200/60">
          <Link
            href="/account"
            className="font-inter text-sm text-stone-500 hover:text-stone-700 transition-colors pb-2"
          >
            Profilo
          </Link>
          <Link
            href="/account/orders"
            className="font-inter text-sm font-medium text-gold-600 border-b-2 border-gold-500 pb-2"
          >
            Ordini
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="font-inter text-sm text-stone-500 hover:text-gold-600 transition-colors pb-2"
            >
              Pannello Admin
            </Link>
          )}
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-stone-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <h3 className="font-cinzel text-xl text-stone-700 mb-2">Nessun ordine</h3>
            <p className="font-inter text-sm text-stone-500 mb-6">
              Non hai ancora effettuato nessun ordine.
            </p>
            <Link
              href="/fragranze"
              className="inline-block px-8 py-3 bg-stone-900 text-white font-inter text-sm font-medium uppercase tracking-wider hover:bg-stone-800 transition-colors"
            >
              Scopri le Fragranze
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status] || { label: order.status, bgClass: 'bg-stone-50', textClass: 'text-stone-600' };
              const date = new Date(order.createdAt).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });

              return (
                <Link
                  key={order.id}
                  href={`/orders/${order.orderNumber}`}
                  className="block bg-white border border-stone-200/60 hover:border-gold-500/30 hover:shadow-sm transition-all duration-300 p-5 md:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                      <p className="font-inter text-xs text-stone-400 uppercase tracking-wider">
                        Ordine
                      </p>
                      <p className="font-mono text-sm text-stone-800 font-medium">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-block px-3 py-1 text-xs font-inter font-medium ${status.bgClass} ${status.textClass}`}>
                        {status.label}
                      </span>
                      <span className="font-inter text-xs text-stone-400">{date}</span>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="space-y-1.5 mb-4">
                    {order.items.map((item, i) => (
                      <p key={i} className="font-inter text-sm text-stone-600">
                        {item.productName} {item.sizeVolume}ml x{item.quantity}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <span className="font-cinzel text-lg text-stone-900">
                      &euro;{order.total.toFixed(2)}
                    </span>
                    {order.trackingNumber && (
                      <span className="font-inter text-xs text-stone-400">
                        Tracking: {order.trackingNumber}
                      </span>
                    )}
                    <span className="font-inter text-xs text-gold-600 flex items-center gap-1">
                      Dettagli
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
