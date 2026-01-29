// Database queries per Products (sostituisce mock in produzione)

import { prisma } from '@/lib/prisma';
import { type Product, type ProductWithRelations, transformProductForFrontend } from '@/types/product';

/**
 * Get all active products
 */
export async function getProducts(): Promise<Product[]> {
  const dbProducts = await prisma.product.findMany({
    where: { active: true },
    include: {
      sizes: true,
      images: true,
      olfactoryNotes: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return dbProducts.map(transformProductForFrontend);
}

/**
 * Get featured products (for homepage)
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const dbProducts = await prisma.product.findMany({
    where: {
      active: true,
      featured: true,
    },
    include: {
      sizes: true,
      images: true,
      olfactoryNotes: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return dbProducts.map(transformProductForFrontend);
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const dbProduct = await prisma.product.findUnique({
    where: { slug },
    include: {
      sizes: true,
      images: true,
      olfactoryNotes: true,
    },
  });

  if (!dbProduct || !dbProduct.active) {
    return null;
  }

  return transformProductForFrontend(dbProduct);
}

/**
 * Get product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const dbProduct = await prisma.product.findUnique({
    where: { id },
    include: {
      sizes: true,
      images: true,
      olfactoryNotes: true,
    },
  });

  if (!dbProduct) {
    return null;
  }

  return transformProductForFrontend(dbProduct);
}

/**
 * Get all product slugs (per generateStaticParams)
 */
export async function getAllProductSlugs(): Promise<string[]> {
  const products = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true },
  });

  return products.map((p) => p.slug);
}

/**
 * Check product availability (stock)
 */
export async function checkProductAvailability(productId: string, sizeId: string): Promise<{ available: boolean; stock: number }> {
  const size = await prisma.productSize.findUnique({
    where: { id: sizeId },
  });

  if (!size) {
    return { available: false, stock: 0 };
  }

  return {
    available: size.stockQuantity > 0,
    stock: size.stockQuantity,
  };
}
