import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';

export async function GET() {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const header = 'Numero Ordine,Email,Cliente,Stato,Totale,Data,Tracking,Corriere\n';
    const rows = orders.map((o) =>
      `"${o.orderNumber}","${o.email}","${o.shippingName}","${o.status}","${Number(o.total).toFixed(2)}","${new Date(o.createdAt).toLocaleDateString('it-IT')}","${o.trackingNumber || ''}","${o.carrier || ''}"`
    ).join('\n');

    const csv = header + rows;

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="ordini-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error: unknown) {
    console.error('Orders export error:', error);
    return NextResponse.json({ error: 'Errore nell\'esportazione' }, { status: 500 });
  }
}
