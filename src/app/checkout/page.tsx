'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { shippingAddressSchema, type ShippingAddress } from '@/lib/validations/checkout';
import { Input } from '@/components/ui/forms/Input';
import { Textarea } from '@/components/ui/forms/Textarea';
import { Select } from '@/components/ui/forms/Select';
import { Button } from '@/components/ui/Button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { currentStep, setStep, setShippingAddress, customerNotes, setCustomerNotes } =
    useCheckoutStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      country: 'IT',
    },
  });

  // Redirect se carrello vuoto
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
          <div key={`${item.product.id}-${item.size.volume}`} className="glass-card p-6">
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
      <div className="glass-card p-6 space-y-3">
        <div className="flex justify-between text-white/70">
          <span>Subtotale</span>
          <span>€{total().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-white/70">
          <span>Spedizione</span>
          <span>€5.00</span>
        </div>
        <div className="border-t border-white/10 pt-3 flex justify-between text-xl text-gold font-bold">
          <span>Totale</span>
          <span>€{(total() + 5).toFixed(2)}</span>
        </div>
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
            { value: 'CH', label: 'Svizzera' },
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

      <div className="glass-card p-6 space-y-4">
        <p className="text-white/80">
          Cliccando su "Paga Ora" sarai reindirizzato alla pagina sicura di Stripe per
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
          {isSubmitting ? 'Reindirizzamento...' : 'Paga Ora'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black py-16">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {['cart', 'shipping', 'payment'].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep === step || index < ['cart', 'shipping', 'payment'].indexOf(currentStep)
                        ? 'border-gold bg-gold text-black'
                        : 'border-white/30 text-white/50'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs mt-2 text-white/60 capitalize">{step}</span>
                </div>
                {index < 2 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-colors ${
                      index < ['cart', 'shipping', 'payment'].indexOf(currentStep)
                        ? 'bg-gold'
                        : 'bg-white/20'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 'cart' && renderCartStep()}
        {currentStep === 'shipping' && renderShippingStep()}
        {currentStep === 'payment' && renderPaymentStep()}
      </div>
    </div>
  );
}
