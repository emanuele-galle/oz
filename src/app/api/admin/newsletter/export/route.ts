import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';

export async function GET() {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const header = 'Email,Stato,Fonte,Data Iscrizione\n';
    const rows = subscribers.map((s) =>
      `"${s.email}","${s.active ? 'Attivo' : 'Disattivato'}","${s.source}","${new Date(s.createdAt).toLocaleDateString('it-IT')}"`
    ).join('\n');

    const csv = header + rows;

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="newsletter-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error: unknown) {
    console.error('Newsletter export error:', error);
    return NextResponse.json({ error: 'Errore nell\'esportazione' }, { status: 500 });
  }
}
