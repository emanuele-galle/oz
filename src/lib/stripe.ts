// Stripe Configuration
// https://stripe.com/docs/api

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-01-28.clover',
  typescript: true,
});

// Stripe webhook signature verification
export function verifyStripeSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set');
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }
}

// Format amount for Stripe (cents)
export function formatAmountForStripe(amount: number, currency: string = 'eur'): number {
  // Stripe expects amounts in cents
  return Math.round(amount * 100);
}

// Format amount from Stripe (cents to euros)
export function formatAmountFromStripe(amount: number, currency: string = 'eur'): number {
  return amount / 100;
}
