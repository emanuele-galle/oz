import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const { id } = await params;

    const original = await prisma.product.findUnique({
      where: { id },
      include: {
        sizes: true,
        olfactoryNotes: true,
      },
    });

    if (!original) {
      return NextResponse.json({ error: 'Prodotto non trovato' }, { status: 404 });
    }

    const timestamp = Date.now();
    const newSlug = `${original.slug}-copy-${timestamp}`;

    const newProduct = await prisma.product.create({
      data: {
        name: `${original.name} (Copia)`,
        slug: newSlug,
        tagline: original.tagline,
        description: original.description,
        story: original.story,
        basePrice: original.basePrice,
        concentration: original.concentration,
        season: original.season,
        gender: original.gender,
        active: false,
        featured: false,
        sizes: {
          create: original.sizes.map((s) => ({
            volume: s.volume,
            price: s.price,
            sku: `${newSlug}-${s.volume}ml`,
            stockQuantity: 0,
            lowStockThreshold: s.lowStockThreshold,
          })),
        },
        olfactoryNotes: {
          create: original.olfactoryNotes.map((n) => ({
            category: n.category,
            note: n.note,
            order: n.order,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, productId: newProduct.id });
  } catch (error: any) {
    console.error('Product duplicate error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug o SKU già esistente' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Errore nella duplicazione' }, { status: 500 });
  }
}
