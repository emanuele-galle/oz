import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';

const VALID_ROLES = ['CUSTOMER', 'STAFF', 'ADMIN'] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getAdminUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Solo gli admin possono modificare i ruoli' }, { status: 403 });
    }

    const { id } = await params;
    const { role } = await request.json();

    if (!role || !VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: `Ruolo non valido. Valori accettati: ${VALID_ROLES.join(', ')}` }, { status: 400 });
    }

    // Prevent self-demotion
    if (id === currentUser.id && role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non puoi cambiare il tuo stesso ruolo' }, { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (!targetUser) {
      return NextResponse.json({ error: 'Utente non trovato' }, { status: 404 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json({ success: true, user: { id: updated.id, role: updated.role } });
  } catch (error: unknown) {
    console.error('Customer role update error:', error);
    return NextResponse.json({ error: 'Errore nell\'aggiornamento' }, { status: 500 });
  }
}
