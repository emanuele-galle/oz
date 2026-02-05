import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';
import { sendOrderShippedEmail, sendOrderDeliveredEmail } from '@/lib/email';
import { logActivity } from '@/lib/admin/log-activity';

const VALID_STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];

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

    // Validate status
    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Stato non valido. Valori accettati: ${VALID_STATUSES.join(', ')}` }, { status: 400 });
    }

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

    if (status && status !== currentOrder.status) {
      await logActivity(user.id, 'order.status_changed', { type: 'order', id }, {
        name: order.orderNumber,
        from: currentOrder.status,
        to: status,
      });
    }

    // Send notification emails (non-blocking)
    if (status === 'SHIPPED' && status !== currentOrder.status) {
      try {
        await sendOrderShippedEmail({
          orderNumber: order.orderNumber,
          email: order.email,
          customerName: order.shippingName,
          trackingNumber: order.trackingNumber || trackingNumber || '',
          carrier: order.carrier || carrier || '',
        });
      } catch (emailError) {
        console.error('Failed to send shipped email:', emailError);
      }
    }

    if (status === 'DELIVERED' && status !== currentOrder.status) {
      try {
        await sendOrderDeliveredEmail({
          orderNumber: order.orderNumber,
          email: order.email,
          customerName: order.shippingName,
        });
      } catch (emailError) {
        console.error('Failed to send delivered email:', emailError);
      }
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Order update error:', error);
    return NextResponse.json({ error: 'Errore nell\'aggiornamento' }, { status: 500 });
  }
}
