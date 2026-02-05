import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';

export async function PATCH(request: NextRequest) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const { sizeId, stockQuantity } = await request.json();

    if (!sizeId || stockQuantity === undefined || stockQuantity < 0) {
      return NextResponse.json({ error: 'Parametri non validi' }, { status: 400 });
    }

    const existing = await prisma.productSize.findUnique({ where: { id: sizeId } });
    if (!existing) {
      return NextResponse.json({ error: 'Taglia non trovata' }, { status: 404 });
    }

    const size = await prisma.productSize.update({
      where: { id: sizeId },
      data: { stockQuantity },
    });

    return NextResponse.json({ success: true, size });
  } catch (error: any) {
    console.error('Stock update error:', error);
    return NextResponse.json({ error: 'Errore nell\'aggiornamento stock' }, { status: 500 });
  }
}
