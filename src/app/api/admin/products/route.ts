import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';
import { logActivity } from '@/lib/admin/log-activity';

export async function POST(request: NextRequest) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, tagline, description, story, basePrice, concentration, season, gender, active, featured, sizes, olfactoryNotes, images } = body;

    if (!name || !slug || !description || !basePrice) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        tagline,
        description,
        story,
        basePrice,
        concentration: concentration || 'Extrait de Parfum',
        season,
        gender,
        active: active ?? true,
        featured: featured ?? false,
        sizes: {
          create: sizes?.map((s: any) => ({
            volume: s.volume,
            price: s.price,
            sku: s.sku || `${slug}-${s.volume}ml`,
            stockQuantity: s.stockQuantity || 0,
            lowStockThreshold: s.lowStockThreshold || 5,
          })) || [],
        },
        olfactoryNotes: {
          create: olfactoryNotes?.map((n: any) => ({
            category: n.category,
            note: n.note,
            order: n.order ?? 0,
          })) || [],
        },
        images: {
          create: images?.map((img: any) => ({
            url: img.url,
            alt: img.alt || '',
            isPrimary: img.isPrimary ?? false,
            order: img.order ?? 0,
          })) || [],
        },
      },
    });

    await logActivity(user.id, 'product.created', { type: 'product', id: product.id }, { name: product.name });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Product create error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug o SKU già esistente' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Errore nella creazione' }, { status: 500 });
  }
}
