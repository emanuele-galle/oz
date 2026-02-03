import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = 'homepage' } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email non valida' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();
    let subscriber;

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { message: 'Sei già iscritto alla newsletter' },
          { status: 200 }
        );
      }
      // Re-activate
      subscriber = await prisma.newsletterSubscriber.update({
        where: { email: normalizedEmail },
        data: { active: true, source },
      });
    } else {
      subscriber = await prisma.newsletterSubscriber.create({
        data: { email: normalizedEmail, source },
      });
    }

    // Fire-and-forget N8N webhook
    const webhookUrl = process.env.N8N_NEWSLETTER_WEBHOOK_URL;
    if (webhookUrl) {
      const unsubscribeUrl = `${SITE_URL}/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}`;
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: subscriber.email,
          subscribedAt: subscriber.createdAt,
          source: subscriber.source,
          unsubscribeUrl,
        }),
      }).catch((err) => {
        console.error('N8N webhook error:', err);
      });
    }

    return NextResponse.json(
      { message: 'Iscrizione completata con successo' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
