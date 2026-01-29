// POST /api/webhooks/stripe
// Webhook handler per eventi Stripe
// https://stripe.com/docs/webhooks

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { verifyStripeSignature } from '@/lib/stripe';
import { sendOrderConfirmationEmail } from '@/lib/email';

// Disable body parsing (Stripe requires raw body)
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('Missing stripe-signature header');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = verifyStripeSignature(body, signature);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log(`Received Stripe event: ${event.type} (${event.id})`);

    // Handle event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Handle checkout.session.completed
 * - Update order status to PROCESSING
 * - Decrement stock
 * - Send order confirmation email
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    console.error('Missing orderId in session metadata');
    return;
  }

  console.log(`Processing checkout session for order ${orderId}`);

  // Fetch order with items
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          size: true,
        },
      },
    },
  });

  if (!order) {
    console.error(`Order ${orderId} not found`);
    return;
  }

  // Update order status and payment info
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'PROCESSING',
      paymentIntentId: session.payment_intent as string,
      paymentStatus: 'succeeded',
      paymentMethod: 'card',
    },
  });

  // Decrement stock for each item
  for (const item of order.items) {
    await prisma.productSize.update({
      where: { id: item.sizeId },
      data: {
        stockQuantity: {
          decrement: item.quantity,
        },
      },
    });

    console.log(
      `Decremented stock for ${item.productName} ${item.sizeVolume}ml: -${item.quantity}`
    );
  }

  // Send order confirmation email
  try {
    await sendOrderConfirmationEmail({
      orderId: order.id,
      orderNumber: order.orderNumber,
      email: order.email,
      customerName: order.shippingName,
      items: order.items.map((item) => ({
        name: `${item.productName} - ${item.sizeVolume}ml`,
        quantity: item.quantity,
        price: Number(item.unitPrice),
      })),
      subtotal: Number(order.subtotal),
      shipping: Number(order.shippingCost),
      total: Number(order.total),
    });

    console.log(`Order confirmation email sent to ${order.email}`);
  } catch (emailError) {
    console.error('Failed to send order confirmation email:', emailError);
    // Don't fail webhook if email fails
  }

  console.log(`Order ${order.orderNumber} processed successfully`);
}

/**
 * Handle payment_intent.succeeded
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log(`Payment succeeded: ${paymentIntent.id}`);

  // Update order payment status
  const order = await prisma.order.findFirst({
    where: { paymentIntentId: paymentIntent.id },
  });

  if (order) {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: 'succeeded',
      },
    });
  }
}

/**
 * Handle payment_intent.payment_failed
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.error(`Payment failed: ${paymentIntent.id}`);

  // Update order payment status
  const order = await prisma.order.findFirst({
    where: { paymentIntentId: paymentIntent.id },
  });

  if (order) {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'CANCELLED',
        paymentStatus: 'failed',
      },
    });

    console.log(`Order ${order.orderNumber} marked as cancelled due to payment failure`);
  }
}
