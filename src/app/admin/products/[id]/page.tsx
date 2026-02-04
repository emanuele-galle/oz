import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '../components/ProductForm';

export const dynamic = 'force-dynamic';

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      sizes: { orderBy: { volume: 'asc' } },
      images: { orderBy: { order: 'asc' } },
      olfactoryNotes: { orderBy: { order: 'asc' } },
    },
  });

  if (!product) notFound();

  // Serialize Decimal fields
  const serialized = {
    ...product,
    basePrice: Number(product.basePrice),
    sizes: product.sizes.map((s) => ({ ...s, price: Number(s.price) })),
  };

  return (
    <div>
      <Link href="/admin/products" className="text-stone-400 text-sm hover:text-gold-500 font-inter mb-4 inline-block">
        ← Torna ai Prodotti
      </Link>
      <h1 className="font-cinzel text-2xl text-white mb-8">Modifica: {product.name}</h1>
      <ProductForm product={serialized} />
    </div>
  );
}
