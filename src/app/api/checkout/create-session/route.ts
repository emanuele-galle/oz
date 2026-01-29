// POST /api/checkout/create-session
// Crea una Stripe Checkout Session per il pagamento

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { stripe, formatAmountForStripe } from '@/lib/stripe';
import { createCheckoutSessionSchema } from '@/lib/validations/checkout';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = createCheckoutSessionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { items, shippingAddress, customerNotes } = validation.data;

    // 1. Fetch products and validate stock
    const productIds = items.map((item) => item.productId);
    const sizeIds = items.map((item) => item.sizeId);

    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, active: true },
      include: {
        sizes: {
          where: { id: { in: sizeIds } },
        },
        images: {
          where: { isPrimary: true },
          take: 1,
        },
      },
    });

    if (products.length !== items.length) {
      return NextResponse.json(
        { error: 'Alcuni prodotti non sono disponibili' },
        { status: 400 }
      );
    }

    // 2. Calculate totals and validate stock
    let subtotal = 0;
    const lineItems: any[] = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      const size = product?.sizes.find((s) => s.id === item.sizeId);

      if (!product || !size) {
        return NextResponse.json(
          { error: `Prodotto ${item.productId} non trovato` },
          { status: 400 }
        );
      }

      // Check stock
      if (size.stockQuantity < item.quantity) {
        return NextResponse.json(
          {
            error: `Stock insufficiente per ${product.name} ${size.volume}ml`,
            available: size.stockQuantity,
          },
          { status: 400 }
        );
      }

      const itemPrice = Number(size.price);
      const itemTotal = itemPrice * item.quantity;
      subtotal += itemTotal;

      // Stripe line item
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${product.name} - ${size.volume}ml`,
            description: product.tagline || product.description.substring(0, 100),
            images: product.images?.[0]?.url
              ? [`${process.env.NEXT_PUBLIC_APP_URL}${product.images[0].url}`]
              : [],
            metadata: {
              productId: product.id,
              sizeId: size.id,
              sku: size.sku,
            },
          },
          unit_amount: formatAmountForStripe(itemPrice),
        },
        quantity: item.quantity,
      });
    }

    // 3. Calculate shipping (flat rate per ora)
    const shippingCost = 5.0; // €5 flat rate
    const total = subtotal + shippingCost;

    // Add shipping line item
    lineItems.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Spedizione Standard',
          description: 'Consegna in 3-5 giorni lavorativi',
        },
        unit_amount: formatAmountForStripe(shippingCost),
      },
      quantity: 1,
    });

    // 4. Generate unique order number
    const orderNumber = `OZ-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .substring(2, 9)
      .toUpperCase()}`;

    // 5. Create order in database (status: PENDING)
    const order = await prisma.order.create({
      data: {
        orderNumber,
        email: shippingAddress.email,
        shippingName: shippingAddress.fullName,
        shippingAddress: shippingAddress.addressLine1,
        shippingCity: shippingAddress.city,
        shippingState: shippingAddress.state,
        shippingPostal: shippingAddress.postalCode,
        shippingCountry: shippingAddress.country,
        shippingPhone: shippingAddress.phone,
        subtotal,
        shippingCost,
        total,
        status: 'PENDING',
        customerNotes,
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
            const size = product.sizes.find((s) => s.id === item.sizeId)!;
            const unitPrice = Number(size.price);

            return {
              sizeId: size.id,
              productId: product.id,
              productName: product.name,
              productSlug: product.slug,
              sizeVolume: size.volume,
              unitPrice,
              quantity: item.quantity,
              subtotal: unitPrice * item.quantity,
            };
          }),
        },
      },
    });

    // 6. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: shippingAddress.email,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['IT', 'FR', 'DE', 'ES', 'AT', 'BE', 'NL', 'PT', 'CH'],
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    });

    // 7. Update order with payment intent ID
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: session.id },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  } catch (error: any) {
    console.error('Checkout session creation error:', error);

    return NextResponse.json(
      { error: 'Errore durante la creazione della sessione di pagamento', details: error.message },
      { status: 500 }
    );
  }
}
