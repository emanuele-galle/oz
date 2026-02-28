import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/admin/auth';
import { logActivity } from '@/lib/admin/log-activity';

// eslint-disable-next-line sonarjs/cognitive-complexity -- Product update handles sizes, notes, and images upsert
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Prodotto non trovato' }, { status: 404 });
    }

    const body = await request.json();
    const { name, slug, tagline, description, story, basePrice, concentration, season, gender, active, featured, sizes, olfactoryNotes, images } = body;

    // Update product fields
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        tagline,
        description,
        story,
        basePrice,
        concentration,
        season,
        gender,
        active,
        featured,
      },
    });

    // Update sizes: upsert existing, create new
    if (sizes) {
      for (const size of sizes) {
        if (size.id) {
          await prisma.productSize.update({
            where: { id: size.id },
            data: {
              volume: size.volume,
              price: size.price,
              sku: size.sku,
              stockQuantity: size.stockQuantity,
              lowStockThreshold: size.lowStockThreshold,
            },
          });
        } else {
          await prisma.productSize.create({
            data: {
              productId: id,
              volume: size.volume,
              price: size.price,
              sku: size.sku || `${slug}-${size.volume}ml`,
              stockQuantity: size.stockQuantity || 0,
              lowStockThreshold: size.lowStockThreshold || 5,
            },
          });
        }
      }
    }

    // Update olfactory notes: delete-and-recreate
    if (olfactoryNotes) {
      await prisma.olfactoryNote.deleteMany({ where: { productId: id } });
      if (olfactoryNotes.length > 0) {
        await prisma.olfactoryNote.createMany({
          data: olfactoryNotes.map((n: { category: string; note: string; order?: number }) => ({
            productId: id,
            category: n.category,
            note: n.note,
            order: n.order ?? 0,
          })),
        });
      }
    }

    // Update images: delete-and-recreate
    if (images) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      if (images.length > 0) {
        await prisma.productImage.createMany({
          data: images.map((img: { url: string; alt?: string; isPrimary?: boolean; order?: number }) => ({
            productId: id,
            url: img.url,
            alt: img.alt || '',
            isPrimary: img.isPrimary ?? false,
            order: img.order ?? 0,
          })),
        });
      }
    }

    await logActivity(user.id, 'product.updated', { type: 'product', id }, { name: product.name });

    return NextResponse.json({ success: true, product });
  } catch (error: unknown) {
    console.error('Product update error:', error);
    if (error instanceof Object && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug o SKU già esistente' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Errore nell\'aggiornamento' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAdminUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Solo gli admin possono eliminare prodotti' }, { status: 403 });
    }

    const { id } = await params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Prodotto non trovato' }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });
    await logActivity(user.id, 'product.deleted', { type: 'product', id }, { name: existing.name });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Product delete error:', error);
    return NextResponse.json({ error: 'Errore nell\'eliminazione' }, { status: 500 });
  }
}
