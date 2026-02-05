import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';
import { logActivity } from '@/lib/admin/log-activity';

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

    const existing = await prisma.review.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Recensione non trovata' }, { status: 404 });
    }

    const { action, adminReply } = await request.json();

    const updateData: any = {};

    if (action === 'approve') updateData.approved = true;
    if (action === 'reject') updateData.approved = false;
    if (adminReply !== undefined) {
      updateData.adminReply = adminReply;
      updateData.repliedAt = new Date();
    }

    const review = await prisma.review.update({
      where: { id },
      data: updateData,
    });

    if (action === 'approve') {
      await logActivity(user.id, 'review.approved', { type: 'review', id });
    } else if (action === 'reject') {
      await logActivity(user.id, 'review.rejected', { type: 'review', id });
    }
    if (adminReply !== undefined) {
      await logActivity(user.id, 'review.replied', { type: 'review', id });
    }

    return NextResponse.json({ success: true, review });
  } catch (error: any) {
    console.error('Review update error:', error);
    return NextResponse.json({ error: 'Errore nell\'aggiornamento' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.review.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Recensione non trovata' }, { status: 404 });
    }

    await prisma.review.delete({ where: { id } });
    await logActivity(user.id, 'review.deleted', { type: 'review', id });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Review delete error:', error);
    return NextResponse.json({ error: 'Errore nell\'eliminazione' }, { status: 500 });
  }
}
