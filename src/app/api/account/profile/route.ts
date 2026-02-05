import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser, hashPassword, verifyPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Non autenticato' }, { status: 401 });
  }

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      addresses: {
        orderBy: { isDefault: 'desc' },
      },
    },
  });

  return NextResponse.json(profile);
}

export async function PUT(request: NextRequest) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Non autenticato' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, currentPassword, newPassword } = body;

    const updateData: { name?: string; password?: string } = {};

    if (name !== undefined) {
      updateData.name = name.trim() || null;
    }

    // Password change
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Inserisci la password attuale' }, { status: 400 });
      }
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'La nuova password deve avere almeno 8 caratteri' }, { status: 400 });
      }

      const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
      if (!dbUser?.password) {
        return NextResponse.json({ error: 'Impossibile cambiare password' }, { status: 400 });
      }

      const isValid = await verifyPassword(currentPassword, dbUser.password);
      if (!isValid) {
        return NextResponse.json({ error: 'Password attuale non corretta' }, { status: 401 });
      }

      updateData.password = await hashPassword(newPassword);
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Errore aggiornamento profilo' }, { status: 500 });
  }
}
