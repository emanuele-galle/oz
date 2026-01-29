// Type definitions for Products (compatible con mock e database)

import { Product as PrismaProduct, ProductSize as PrismaProductSize, ProductImage as PrismaProductImage, OlfactoryNote as PrismaOlfactoryNote } from '@prisma/client';

// Full product type con relations (da database)
export type ProductWithRelations = PrismaProduct & {
  sizes: PrismaProductSize[];
  images: PrismaProductImage[];
  olfactoryNotes: PrismaOlfactoryNote[];
};

// Computed types per frontend (backward compatible con mock)
export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string;
  story: string | null;
  price: number; // basePrice dal DB
  sizes: ProductSize[];
  images: ProductImage[];
  olfactoryNotes: OlfactoryNotes;
  concentration: string;
  season: string | null;
  gender: string | null;
  active: boolean;
  featured: boolean;
  // Legacy fields (to be added in future phases)
  ingredients?: string[];
  bestFor?: string[];
  longevity?: string;
  sillage?: string;
  videoUrl?: string;
}

export interface ProductSize {
  id?: string; // DB ID (per checkout)
  volume: string; // "50ml"
  price: number;
  sku: string;
  stockQuantity?: number;
  isTester?: boolean; // Derivato da volume (< 20ml)
}

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface OlfactoryNotes {
  top: string[];
  heart: string[];
  base: string[];
}

// Transform database product to frontend format
export function transformProductForFrontend(dbProduct: ProductWithRelations): Product {
  // Group olfactory notes by category
  const notesGrouped = dbProduct.olfactoryNotes.reduce(
    (acc, note) => {
      if (note.category === 'top' || note.category === 'heart' || note.category === 'base') {
        acc[note.category].push(note.note);
      }
      return acc;
    },
    { top: [] as string[], heart: [] as string[], base: [] as string[] }
  );

  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.name,
    tagline: dbProduct.tagline,
    description: dbProduct.description,
    story: dbProduct.story,
    price: Number(dbProduct.basePrice), // Decimal to number
    sizes: dbProduct.sizes
      .sort((a, b) => b.volume - a.volume) // Ordina per volume decrescente
      .map((size) => ({
        id: size.id, // Include DB ID
        volume: `${size.volume}ml`,
        price: Number(size.price),
        sku: size.sku,
        stockQuantity: size.stockQuantity,
        isTester: size.volume < 20, // Testers sono < 20ml
      })),
    images: dbProduct.images
      .sort((a, b) => a.order - b.order)
      .map((img) => ({
        url: img.url,
        alt: img.alt,
        isPrimary: img.isPrimary,
      })),
    olfactoryNotes: notesGrouped,
    concentration: dbProduct.concentration,
    season: dbProduct.season,
    gender: dbProduct.gender,
    active: dbProduct.active,
    featured: dbProduct.featured,
  };
}
