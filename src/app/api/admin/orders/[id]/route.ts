import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, trackingNumber, carrier, adminNotes } = body;

    // Fetch current order to preserve existing timestamps
    const currentOrder = await prisma.order.findUnique({ where: { id } });
    if (!currentOrder) {
      return NextResponse.json({ error: 'Ordine non trovato' }, { status: 404 });
    }

    const updateData: any = {};

    if (status) updateData.status = status;
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;
    if (carrier !== undefined) updateData.carrier = carrier;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    // Set timestamps based on status — only if not already set on the existing order
    if (status === 'SHIPPED' && !currentOrder.shippedAt) {
      updateData.shippedAt = new Date();
    }
    if (status === 'DELIVERED' && !currentOrder.deliveredAt) {
      updateData.deliveredAt = new Date();
    }

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Order update error:', error);
    return NextResponse.json({ error: 'Errore nell\'aggiornamento' }, { status: 500 });
  }
}
