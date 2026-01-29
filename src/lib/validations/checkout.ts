// Checkout Validation Schemas (Zod)

import { z } from 'zod';

// Shipping Address Schema
export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, 'Nome completo richiesto (min 2 caratteri)'),
  email: z.string().email('Email non valida'),
  phone: z
    .string()
    .min(10, 'Numero di telefono non valido')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Numero di telefono non valido'),
  addressLine1: z.string().min(5, 'Indirizzo completo richiesto'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'Città richiesta'),
  state: z.string().optional(),
  postalCode: z.string().min(5, 'CAP richiesto'),
  country: z.string().min(2, 'Paese richiesto'),
});

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

// Order Item Schema (per validazione checkout)
export const orderItemSchema = z.object({
  productId: z.string().cuid(),
  sizeId: z.string().cuid(),
  quantity: z.number().int().min(1).max(10),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

// Checkout Session Create Schema
export const createCheckoutSessionSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Carrello vuoto'),
  shippingAddress: shippingAddressSchema,
  customerNotes: z.string().max(500).optional(),
});

export type CreateCheckoutSession = z.infer<typeof createCheckoutSessionSchema>;

// Payment Intent Metadata Schema
export const paymentIntentMetadataSchema = z.object({
  orderId: z.string().cuid(),
  userId: z.string().cuid().optional(),
  email: z.string().email(),
});
