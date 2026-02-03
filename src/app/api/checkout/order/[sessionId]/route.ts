import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID mancante' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { paymentIntentId: sessionId },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Ordine non trovato' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      orderNumber: order.orderNumber,
      email: order.email,
      items: order.items.map((item) => ({
        productName: item.productName,
        sizeVolume: item.sizeVolume,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        subtotal: Number(item.subtotal),
      })),
      subtotal: Number(order.subtotal),
      shippingCost: Number(order.shippingCost),
      total: Number(order.total),
      status: order.status,
      createdAt: order.createdAt,
    });
  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { error: 'Errore nel recupero dell\'ordine' },
      { status: 500 }
    );
  }
}
