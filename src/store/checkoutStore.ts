// Checkout Store (Zustand)
// Gestisce lo stato del checkout flow (4 steps)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ShippingAddress } from '@/lib/validations/checkout';

export type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation';

interface CheckoutState {
  // Current step
  currentStep: CheckoutStep;
  completedSteps: CheckoutStep[];

  // Shipping data
  shippingAddress: Partial<ShippingAddress>;
  customerNotes: string;

  // Payment
  stripeSessionId: string | null;
  orderId: string | null;
  orderNumber: string | null;

  // Actions
  setStep: (step: CheckoutStep) => void;
  markStepCompleted: (step: CheckoutStep) => void;
  setShippingAddress: (address: Partial<ShippingAddress>) => void;
  setCustomerNotes: (notes: string) => void;
  setPaymentData: (data: {
    stripeSessionId: string;
    orderId: string;
    orderNumber: string;
  }) => void;
  resetCheckout: () => void;
}

const initialState = {
  currentStep: 'cart' as CheckoutStep,
  completedSteps: [] as CheckoutStep[],
  shippingAddress: {},
  customerNotes: '',
  stripeSessionId: null,
  orderId: null,
  orderNumber: null,
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) =>
        set({
          currentStep: step,
        }),

      markStepCompleted: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),

      setShippingAddress: (address) =>
        set((state) => ({
          shippingAddress: { ...state.shippingAddress, ...address },
        })),

      setCustomerNotes: (notes) =>
        set({
          customerNotes: notes,
        }),

      setPaymentData: (data) =>
        set({
          stripeSessionId: data.stripeSessionId,
          orderId: data.orderId,
          orderNumber: data.orderNumber,
        }),

      resetCheckout: () =>
        set({
          ...initialState,
        }),
    }),
    {
      name: 'oz-checkout',
      partialize: (state) => ({
        // Persist solo shipping address (non payment data sensibili)
        shippingAddress: state.shippingAddress,
        customerNotes: state.customerNotes,
      }),
    }
  )
);
