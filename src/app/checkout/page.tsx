'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loadStripe } from '@stripe/stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { shippingAddressSchema, type ShippingAddress } from '@/lib/validations/checkout';
import { calculateShippingCost, getShippingLabel } from '@/lib/shipping';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { Input } from '@/components/ui/forms/Input';
import { Textarea } from '@/components/ui/forms/Textarea';
import { Select } from '@/components/ui/forms/Select';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Trust badges component
function TrustBadges() {
  return (
    <div className="flex items-center justify-center gap-6 py-4">
      <div className="flex items-center gap-1.5 text-white/50">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <span className="font-inter text-[10px] uppercase tracking-wide">SSL Sicuro</span>
      </div>
      <div className="flex items-center gap-1.5 text-white/50">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        <span className="font-inter text-[10px] uppercase tracking-wide">Stripe</span>
      </div>
      <div className="flex items-center gap-1.5 text-white/50">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
        <span className="font-inter text-[10px] uppercase tracking-wide">Spedizione Tracciata</span>
      </div>
    </div>
  );
}

// Order summary sidebar
function OrderSummary({
  items,
  subtotal,
  shippingCost,
  orderTotal,
  selectedCountry,
  compact = false,
  hideItems = false,
}: {
  items: Array<{ product: { id: string; name: string; images?: Array<{ url: string; isPrimary?: boolean }> }; size: { volume: string; price: number; isTester?: boolean }; quantity: number }>;
  subtotal: number;
  shippingCost: number;
  orderTotal: number;
  selectedCountry: string;
  compact?: boolean;
  hideItems?: boolean;
}) {
  return (
    <div className={compact ? 'space-y-4' : 'space-y-5'}>
      {!compact && (
        <h3 className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">
          Il tuo ordine
        </h3>
      )}

      {/* Items */}
      {!hideItems && (
        <div className="space-y-3">
          {items.map((item) => {
            const primaryImage =
              item.product.images?.find((img: { isPrimary?: boolean }) => img.isPrimary) || item.product.images?.[0];
            return (
              <div key={`${item.product.id}-${item.size.volume}`} className="flex gap-3">
                {primaryImage && (
                  <div className="relative w-14 h-14 flex-shrink-0 bg-white/[0.04] overflow-hidden">
                    <Image
                      src={primaryImage.url}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    {item.quantity > 1 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-stone-950 rounded-full flex items-center justify-center text-[10px] font-bold">
                        {item.quantity}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-sm font-inter truncate">{item.product.name}</p>
                  <p className="text-white/40 text-xs font-inter">{item.size.volume}</p>
                </div>
                <p className="text-white/70 text-sm font-inter tabular-nums whitespace-nowrap">
                  €{(item.size.price * item.quantity).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Divider */}
      {!hideItems && <div className="h-px bg-white/[0.06]" />}

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/50 font-inter">Subtotale</span>
          <span className="text-white/70 font-inter tabular-nums">€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/50 font-inter">{getShippingLabel(subtotal, selectedCountry)}</span>
          <span className="text-white/70 font-inter tabular-nums">
            {shippingCost === 0 ? 'Gratuita' : `€${shippingCost.toFixed(2)}`}
          </span>
        </div>
        {subtotal < FREE_SHIPPING_THRESHOLD && (
          <p className="text-[11px] text-white/30 font-inter">
            Spedizione gratuita da €{FREE_SHIPPING_THRESHOLD}
          </p>
        )}
      </div>

      {/* Total */}
      <div className="h-px bg-white/[0.06]" />
      <div className="flex justify-between items-baseline">
        <span className="text-white/60 font-inter text-sm">Totale</span>
        <span className="font-cinzel text-2xl text-gold-400">€{orderTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total } = useCartStore();
  const { currentStep, setStep, setShippingAddress, customerNotes, setCustomerNotes } =
    useCheckoutStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: { country: 'IT' },
  });

  const selectedCountry = watch('country') || 'IT';
  const subtotal = total();
  const shippingCost = calculateShippingCost(subtotal, selectedCountry);
  const orderTotal = subtotal + shippingCost;

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <img src="/uploads/images/logo.png" alt="OZ" className="h-10 w-auto mx-auto opacity-20 animate-pulse" />
        </div>
      </div>
    );
  }

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="font-cinzel text-2xl text-white mb-3">Il tuo carrello è vuoto</h1>
          <p className="font-inter text-sm text-white/50 mb-8">Aggiungi una fragranza per procedere al checkout.</p>
          <a
            href="/fragranze"
            className="inline-block px-8 py-3 bg-gold-500 text-stone-950 font-inter text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 transition-colors"
          >
            Scopri le Fragranze
          </a>
        </div>
      </div>
    );
  }

  // Steps config
  const steps = [
    { id: 'cart', label: 'Carrello', num: '1' },
    { id: 'shipping', label: 'Spedizione', num: '2' },
    { id: 'payment', label: 'Pagamento', num: '3' },
  ];
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  // --- STEP: Cart Review ---
  const renderCartStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-cinzel text-2xl text-white mb-1">Riepilogo Carrello</h2>
        <p className="font-inter text-sm text-white/40">{items.length} {items.length === 1 ? 'articolo' : 'articoli'}</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const primaryImage =
            item.product.images?.find((img: { isPrimary?: boolean }) => img.isPrimary) || item.product.images?.[0];
          return (
            <div key={`${item.product.id}-${item.size.volume}`} className="glass-card-dark p-4 flex gap-4">
              {primaryImage && (
                <div className="relative w-20 h-20 flex-shrink-0 bg-white/[0.04] overflow-hidden">
                  <Image
                    src={primaryImage.url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-inter font-medium truncate">{item.product.name}</h3>
                <p className="text-white/40 text-sm font-inter mt-0.5">
                  {item.size.volume} × {item.quantity}
                </p>
              </div>
              <p className="text-gold-500 font-inter font-medium tabular-nums whitespace-nowrap self-center">
                €{(item.size.price * item.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile order totals (hidden on desktop where sidebar shows) */}
      <div className="lg:hidden glass-card-dark p-5">
        <OrderSummary
          items={items}
          subtotal={subtotal}
          shippingCost={shippingCost}
          orderTotal={orderTotal}
          selectedCountry={selectedCountry}
          compact
          hideItems
        />
      </div>

      <Button onClick={() => setStep('shipping')} size="lg" className="w-full">
        Procedi alla Spedizione
      </Button>

      <TrustBadges />
    </div>
  );

  // --- STEP: Shipping ---
  const onShippingSubmit = (data: ShippingAddress) => {
    setShippingAddress(data);
    setStep('payment');
  };

  const renderShippingStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-cinzel text-2xl text-white mb-1">Spedizione</h2>
        <p className="font-inter text-sm text-white/40">Inserisci i dati per la consegna</p>
      </div>

      <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-4">
        <Input
          label="Nome Completo"
          placeholder="Mario Rossi"
          error={errors.fullName?.message}
          required
          {...register('fullName')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="mario@example.com"
            error={errors.email?.message}
            required
            {...register('email')}
          />
          <Input
            label="Telefono"
            type="tel"
            placeholder="+39 123 456 7890"
            error={errors.phone?.message}
            required
            {...register('phone')}
          />
        </div>

        <Input
          label="Indirizzo"
          placeholder="Via Roma 123"
          error={errors.addressLine1?.message}
          required
          {...register('addressLine1')}
        />

        <Input
          label="Appartamento, scala, ecc. (opzionale)"
          placeholder="Interno 5"
          error={errors.addressLine2?.message}
          {...register('addressLine2')}
        />

        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Città"
            placeholder="Roma"
            error={errors.city?.message}
            required
            {...register('city')}
          />
          <Input
            label="Provincia"
            placeholder="RM"
            error={errors.state?.message}
            {...register('state')}
          />
          <Input
            label="CAP"
            placeholder="00100"
            error={errors.postalCode?.message}
            required
            {...register('postalCode')}
          />
        </div>

        <Select
          label="Paese"
          options={[
            { value: 'IT', label: 'Italia' },
            { value: 'FR', label: 'Francia' },
            { value: 'DE', label: 'Germania' },
            { value: 'ES', label: 'Spagna' },
            { value: 'AT', label: 'Austria' },
            { value: 'BE', label: 'Belgio' },
            { value: 'NL', label: 'Paesi Bassi' },
            { value: 'PT', label: 'Portogallo' },
            { value: 'CH', label: 'Svizzera' },
            { value: 'GB', label: 'Regno Unito' },
          ]}
          error={errors.country?.message}
          required
          {...register('country')}
        />

        <Textarea
          label="Note (opzionale)"
          placeholder="Istruzioni di consegna, preferenze, ecc."
          value={customerNotes}
          onChange={(e) => setCustomerNotes(e.target.value)}
          maxLength={500}
          helperText={`${customerNotes.length}/500`}
        />

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => setStep('cart')}>
            Indietro
          </Button>
          <Button type="submit" className="flex-1">
            Continua
          </Button>
        </div>
      </form>
    </div>
  );

  // --- STEP: Payment ---
  const handlePayment = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            sizeId: item.size.id,
            quantity: item.quantity,
          })),
          shippingAddress: useCheckoutStore.getState().shippingAddress,
          customerNotes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Errore durante la creazione della sessione');
      }

      const { url } = await response.json();

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe non inizializzato');

      window.location.href = url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
      setIsSubmitting(false);
    }
  };

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-cinzel text-2xl text-white mb-1">Pagamento</h2>
        <p className="font-inter text-sm text-white/40">Conferma e paga in sicurezza</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-inter">
          {error}
        </div>
      )}

      {/* Mobile order summary */}
      <div className="lg:hidden glass-card-dark p-5">
        <OrderSummary
          items={items}
          subtotal={subtotal}
          shippingCost={shippingCost}
          orderTotal={orderTotal}
          selectedCountry={selectedCountry}
          compact
        />
      </div>

      {/* Security info */}
      <div className="glass-card-dark p-5 space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 flex items-center justify-center bg-gold-500/10 rounded-full">
            <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div>
            <p className="text-white/80 font-inter text-sm font-medium">Pagamento Sicuro</p>
            <p className="text-white/40 font-inter text-xs">Powered by Stripe</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-white/50 font-inter">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-green-500/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Crittografia SSL 256-bit</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-green-500/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Visa, Mastercard, Amex, Apple Pay, Google Pay</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-green-500/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Nessun dato carta salvato</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep('shipping')}
          disabled={isSubmitting}
        >
          Indietro
        </Button>
        <Button
          onClick={handlePayment}
          disabled={isSubmitting}
          loading={isSubmitting}
          className="flex-1"
          size="lg"
        >
          {isSubmitting ? 'Reindirizzamento...' : `Paga €${orderTotal.toFixed(2)}`}
        </Button>
      </div>

      <TrustBadges />
    </div>
  );

  // Fade variants
  const fadeVariants = shouldReduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
      };

  return (
    <div className="min-h-screen bg-stone-950 pt-28 pb-16">
      <div className="container-luxury">
        {/* Progress Steps */}
        <div className="max-w-lg mx-auto lg:max-w-none mb-10">
          <div className="flex items-center justify-center gap-0">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = index < currentStepIndex;
              return (
                <React.Fragment key={step.id}>
                  {index > 0 && (
                    <div className="w-12 md:w-20 h-px mx-2 relative">
                      <div className="absolute inset-0 bg-white/[0.06]" />
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gold-500/60"
                        initial={{ width: '0%' }}
                        animate={{ width: isCompleted || isActive ? '100%' : '0%' }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-xs font-inter font-medium transition-all duration-300
                      ${isActive
                        ? 'bg-gold-500 text-stone-950 shadow-[0_0_16px_rgba(212,175,55,0.4)]'
                        : isCompleted
                          ? 'bg-gold-500/20 text-gold-500'
                          : 'bg-white/[0.06] text-white/30'
                      }
                    `}>
                      {isCompleted ? (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.num
                      )}
                    </div>
                    <span className={`
                      font-inter text-xs uppercase tracking-wide hidden sm:block
                      ${isActive ? 'text-gold-500' : isCompleted ? 'text-gold-500/50' : 'text-white/25'}
                    `}>
                      {step.label}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Two-column layout on desktop */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 max-w-5xl mx-auto">
          {/* Main content */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {currentStep === 'cart' && (
                <motion.div key="cart" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                  {renderCartStep()}
                </motion.div>
              )}
              {currentStep === 'shipping' && (
                <motion.div key="shipping" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                  {renderShippingStep()}
                </motion.div>
              )}
              {currentStep === 'payment' && (
                <motion.div key="payment" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                  {renderPaymentStep()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Order Summary Sidebar */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28">
              <div className="glass-card-dark p-6">
                <OrderSummary
                  items={items}
                  subtotal={subtotal}
                  shippingCost={shippingCost}
                  orderTotal={orderTotal}
                  selectedCountry={selectedCountry}
                />
              </div>

              {/* Guarantee */}
              <div className="mt-4 p-4 border border-white/[0.04] text-center">
                <p className="font-inter text-[11px] text-white/50 leading-relaxed">
                  Spedizione assicurata · Reso entro 14 giorni · Packaging di lusso
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
