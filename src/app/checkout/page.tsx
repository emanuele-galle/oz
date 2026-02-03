'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { CartIcon, CheckIcon } from '@/components/icons';
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/animations/microInteractions';
import { useReducedMotion } from '@/hooks';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { currentStep, setStep, setShippingAddress, customerNotes, setCustomerNotes } =
    useCheckoutStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      country: 'IT',
    },
  });

  const selectedCountry = watch('country') || 'IT';
  const subtotal = total();
  const shippingCost = calculateShippingCost(subtotal, selectedCountry);
  const orderTotal = subtotal + shippingCost;

  // Wait for persist rehydration before checking cart
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cinzel text-4xl text-gold-500/20 animate-pulse">OZ</h1>
        </div>
      </div>
    );
  }

  // Redirect se carrello vuoto (only after mount/rehydration)
  if (items.length === 0 && currentStep !== 'confirmation') {
    router.push('/');
    return null;
  }

  // Step 1: Cart Review
  const renderCartStep = () => (
    <div className="space-y-6">
      <h2 className="font-cinzel text-3xl text-gold">Riepilogo Carrello</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size.volume}`} className="glass-card-dark p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white">{item.product.name}</h3>
                <p className="text-sm text-white/60">
                  {item.size.volume} × {item.quantity}
                </p>
              </div>
              <p className="text-lg text-gold font-medium">
                €{(item.size.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="glass-card-dark p-6 space-y-3">
        <div className="flex justify-between text-white/70">
          <span>Subtotale</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-white/70">
          <span>{getShippingLabel(subtotal, selectedCountry)}</span>
          <span>{shippingCost === 0 ? 'Gratuita' : `€${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="border-t border-white/10 pt-3 flex justify-between text-xl text-gold font-bold">
          <span>Totale</span>
          <span>€{orderTotal.toFixed(2)}</span>
        </div>
        {subtotal < FREE_SHIPPING_THRESHOLD && (
          <p className="text-xs text-white/60 text-center pt-1">
            Spedizione gratuita per ordini superiori a €{FREE_SHIPPING_THRESHOLD}
          </p>
        )}
      </div>

      <Button onClick={() => setStep('shipping')} size="lg" className="w-full">
        Procedi al Checkout
      </Button>
    </div>
  );

  // Step 2: Shipping Form
  const onShippingSubmit = (data: ShippingAddress) => {
    setShippingAddress(data);
    setStep('payment');
  };

  const renderShippingStep = () => (
    <div className="space-y-6">
      <h2 className="font-cinzel text-3xl text-gold">Indirizzo di Spedizione</h2>

      <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-4">
        <Input
          label="Nome Completo"
          placeholder="Mario Rossi"
          error={errors.fullName?.message}
          required
          {...register('fullName')}
        />

        <div className="grid md:grid-cols-2 gap-4">
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

        <div className="grid md:grid-cols-3 gap-4">
          <Input
            label="Città"
            placeholder="Roma"
            error={errors.city?.message}
            required
            {...register('city')}
          />

          <Input
            label="Provincia (opzionale)"
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
          helperText={`${customerNotes.length}/500 caratteri`}
        />

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => setStep('cart')}>
            Indietro
          </Button>
          <Button type="submit" className="flex-1">
            Procedi al Pagamento
          </Button>
        </div>
      </form>
    </div>
  );

  // Step 3: Payment (Stripe)
  const handlePayment = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create checkout session
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

      const { sessionId, url } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe non inizializzato');
      }

      // Redirect to Stripe hosted checkout
      window.location.href = url;
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h2 className="font-cinzel text-3xl text-gold">Pagamento</h2>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-md text-red-500">
          {error}
        </div>
      )}

      {/* Order summary */}
      <div className="glass-card-dark p-6 space-y-3">
        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-3">Riepilogo Ordine</h3>
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size.volume}`} className="flex justify-between text-white/70 text-sm">
            <span>{item.product.name} {item.size.volume} × {item.quantity}</span>
            <span>€{(item.size.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t border-white/10 pt-3 space-y-2">
          <div className="flex justify-between text-white/70 text-sm">
            <span>Subtotale</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white/70 text-sm">
            <span>{getShippingLabel(subtotal, selectedCountry)}</span>
            <span>{shippingCost === 0 ? 'Gratuita' : `€${shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-gold font-bold text-lg pt-1">
            <span>Totale</span>
            <span>€{orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="glass-card-dark p-6 space-y-4">
        <p className="text-white/80">
          Cliccando su &quot;Paga Ora&quot; sarai reindirizzato alla pagina sicura di Stripe per
          completare il pagamento.
        </p>

        <div className="space-y-2 text-sm text-white/60">
          <p>✓ Pagamento sicuro con SSL</p>
          <p>✓ Carte di credito/debito accettate</p>
          <p>✓ Nessun dato salvato sui nostri server</p>
        </div>
      </div>

      <div className="flex gap-4">
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
          className="flex-1"
          size="lg"
        >
          {isSubmitting ? 'Reindirizzamento...' : `Paga €${orderTotal.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );

  // Step configuration with icons
  const steps = [
    { id: 'cart', label: 'Carrello', icon: CartIcon },
    { id: 'shipping', label: 'Spedizione', icon: () => (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    )},
    { id: 'payment', label: 'Pagamento', icon: () => (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    )},
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-black py-16">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Enhanced Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            {/* Background progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10 -z-10" style={{
              left: '5%',
              right: '5%',
            }} />

            {/* Animated progress line */}
            <motion.div
              className="absolute top-5 left-0 h-0.5 bg-gold -z-10"
              initial={{ width: '0%' }}
              animate={{
                width: currentStepIndex === 0 ? '0%' : currentStepIndex === 1 ? '50%' : '100%',
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                ease: 'easeInOut',
              }}
              style={{
                left: '5%',
              }}
            />

            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = index < currentStepIndex;

              return (
                <React.Fragment key={step.id}>
                  <motion.div
                    className="flex flex-col items-center relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: shouldReduceMotion ? 0 : 0.3,
                    }}
                  >
                    {/* Step circle con icon */}
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive
                          ? 'border-gold bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.5)]'
                          : isCompleted
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-white/30 bg-black/50 text-white/50'
                      }`}
                      animate={isActive && !shouldReduceMotion ? {
                        scale: [1, 1.1, 1],
                      } : undefined}
                      transition={isActive ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      } : undefined}
                    >
                      <AnimatePresence mode="wait">
                        {isCompleted ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckIcon size={24} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="icon"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                          >
                            <StepIcon />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Step label */}
                    <motion.span
                      className={`text-xs mt-2 font-inter uppercase tracking-wide transition-colors ${
                        isActive
                          ? 'text-gold font-medium'
                          : isCompleted
                          ? 'text-green-500'
                          : 'text-white/40'
                      }`}
                    >
                      {step.label}
                    </motion.span>
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Content with smooth transitions */}
        <AnimatePresence mode="wait">
          {currentStep === 'cart' && (
            <motion.div
              key="cart"
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {renderCartStep()}
            </motion.div>
          )}
          {currentStep === 'shipping' && (
            <motion.div
              key="shipping"
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {renderShippingStep()}
            </motion.div>
          )}
          {currentStep === 'payment' && (
            <motion.div
              key="payment"
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {renderPaymentStep()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
