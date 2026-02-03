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
    await prisma.review.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Review delete error:', error);
    return NextResponse.json({ error: 'Errore nell\'eliminazione' }, { status: 500 });
  }
}
