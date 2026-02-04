'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Use persisted items only after mount to prevent hydration mismatch
  const cartItems = isMounted ? items : [];
  const totalPrice = isMounted ? getTotalPrice() : 0;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-luxury ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="font-cinzel text-2xl text-stone-900">Carrello</h2>
            <button
              onClick={closeCart}
              className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors rounded-full"
              aria-label="Close cart"
            >
              <svg
                className="w-6 h-6 text-stone-500"
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
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 bg-stone-50/50">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-stone-300 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="font-inter text-stone-500 mb-6">Il tuo carrello è vuoto</p>
                <Link href="/#products">
                  <Button variant="outline" size="md" onClick={closeCart}>
                    Scopri le Fragranze
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const primaryImage =
                    item.product.images.find((img) => img.isPrimary) || item.product.images[0];

                  return (
                    <div
                      key={`${item.product.id}-${item.size.volume}`}
                      className="bg-white p-4 flex gap-4 border border-stone-200 shadow-sm"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-stone-100">
                        <Image
                          src={primaryImage.url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-cinzel text-stone-900 text-lg mb-1 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-stone-500 text-sm font-inter mb-2">
                          {item.size.volume}
                          {item.size.isTester && ' (Tester)'}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-stone-300 rounded">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size.volume,
                                  item.quantity - 1
                                )
                              }
                              className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors text-stone-600"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-10 text-center font-inter text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size.volume,
                                  item.quantity + 1
                                )
                              }
                              className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors text-stone-600"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-cinzel text-gold-600 text-lg">
                            €{(item.size.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.product.id, item.size.volume)}
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-red-50 transition-colors rounded text-red-500"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-stone-200 p-6 space-y-4 bg-white">
              {/* Subtotal */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-inter text-stone-600 uppercase tracking-wide text-sm">
                  Subtotale
                </span>
                <span className="font-cinzel text-3xl text-gold-600">€{totalPrice.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <Button
                variant="primary"
                size="xl"
                className="w-full"
                onClick={() => {
                  closeCart();
                  router.push('/checkout');
                }}
              >
                Procedi al Checkout
              </Button>

              <p className="text-center text-stone-400 text-xs font-inter">
                Spedizione e tasse calcolate al checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
