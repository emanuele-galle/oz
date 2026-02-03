import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token mancante' },
        { status: 400 }
      );
    }

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { unsubscribeToken: token },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Token non valido' },
        { status: 404 }
      );
    }

    if (!subscriber.active) {
      return NextResponse.json(
        { message: 'Sei già disiscritto dalla newsletter' },
        { status: 200 }
      );
    }

    await prisma.newsletterSubscriber.update({
      where: { unsubscribeToken: token },
      data: { active: false },
    });

    return NextResponse.json(
      { message: 'Disiscrizione completata con successo' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
