import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const { ids, action } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Nessuna recensione selezionata' }, { status: 400 });
    }

    if (action !== 'approve' && action !== 'delete') {
      return NextResponse.json({ error: 'Azione non valida' }, { status: 400 });
    }

    if (action === 'approve') {
      await prisma.review.updateMany({
        where: { id: { in: ids } },
        data: { approved: true },
      });
    } else if (action === 'delete') {
      await prisma.review.deleteMany({
        where: { id: { in: ids } },
      });
    }

    return NextResponse.json({ success: true, count: ids.length });
  } catch (error: unknown) {
    console.error('Bulk review action error:', error);
    return NextResponse.json({ error: 'Errore nell\'operazione' }, { status: 500 });
  }
}
