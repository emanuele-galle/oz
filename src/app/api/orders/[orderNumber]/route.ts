import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;

    if (!orderNumber) {
      return NextResponse.json({ error: 'Numero ordine mancante' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Ordine non trovato' }, { status: 404 });
    }

    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: order.status,
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
      trackingNumber: order.trackingNumber,
      carrier: order.carrier,
      createdAt: order.createdAt,
      shippedAt: order.shippedAt,
      deliveredAt: order.deliveredAt,
    });
  } catch (error) {
    console.error('Order tracking fetch error:', error);
    return NextResponse.json({ error: 'Errore nel recupero dell\'ordine' }, { status: 500 });
  }
}
