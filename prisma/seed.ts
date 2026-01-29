// OZ Extrait - Database Seed Script
// Migra i prodotti mock in database

import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL!;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Mock products data (da src/data/products.ts)
const mockProducts = [
  {
    slug: 'cristallo',
    name: 'Cristallo',
    tagline: 'Purezza Cristallina',
    description: 'Un extrait de parfum che cattura l\'essenza della purezza cristallina. Note fresche e luminose che evocano la trasparenza del vetro veneziano.',
    story: 'Cristallo nasce dall\'ispirazione delle vetrate di Murano, dove la luce danza attraverso il cristallo creando riflessi infiniti. Una fragranza che incarna la bellezza pura e senza tempo.',
    basePrice: '150.00',
    concentration: 'Extrait de Parfum 40%',
    season: 'Spring/Summer',
    gender: 'Unisex',
    active: true,
    featured: true,
    sizes: [
      { volume: 50, price: '150.00', sku: 'CRIS-50', stockQuantity: 20 },
      { volume: 10, price: '45.00', sku: 'CRIS-10', stockQuantity: 50 },
    ],
    images: [
      { url: '/uploads/images/Cristallo.jpeg', alt: 'Cristallo Extrait de Parfum', isPrimary: true, order: 1 },
      { url: '/uploads/images/Cristallo-2.jpeg', alt: 'Cristallo vista 2', isPrimary: false, order: 2 },
      { url: '/uploads/images/Cristallo-3.jpeg', alt: 'Cristallo vista 3', isPrimary: false, order: 3 },
      { url: '/uploads/images/Cristallo-4.jpeg', alt: 'Cristallo vista 4', isPrimary: false, order: 4 },
      { url: '/uploads/images/Cristallo-5.jpeg', alt: 'Cristallo vista 5', isPrimary: false, order: 5 },
      { url: '/uploads/images/Cristallo-6.jpeg', alt: 'Cristallo dettaglio', isPrimary: false, order: 6 },
      { url: '/uploads/images/Cristallo 7.jpeg', alt: 'Cristallo packaging', isPrimary: false, order: 7 },
      { url: '/uploads/images/Cristallo-man.jpeg', alt: 'Cristallo uomo', isPrimary: false, order: 8 },
      { url: '/uploads/images/Cristallo-tester-10ml.jpeg', alt: 'Cristallo tester 10ml', isPrimary: false, order: 9 },
    ],
    olfactoryNotes: [
      { category: 'top', note: 'Bergamotto di Calabria', order: 1 },
      { category: 'top', note: 'Limone Sfumato', order: 2 },
      { category: 'top', note: 'Mandarino Verde', order: 3 },
      { category: 'heart', note: 'Neroli Tunisia', order: 1 },
      { category: 'heart', note: 'Gelsomino Sambac', order: 2 },
      { category: 'heart', note: 'Rosa Centifolia', order: 3 },
      { category: 'base', note: 'Muschio Bianco', order: 1 },
      { category: 'base', note: 'Ambra Grigia', order: 2 },
      { category: 'base', note: 'Legno di Cedro', order: 3 },
    ],
  },
  {
    slug: 'scintilla',
    name: 'Scintilla',
    tagline: 'L\'Energia della Luce',
    description: 'Una fragranza vibrante e magnetica, come una scintilla che accende la notte. Note speziate e sensuali che lasciano una scia indimenticabile.',
    story: 'Scintilla rappresenta il momento magico in cui la passione si accende. Una fragranza audace per chi osa, ispirata all\'energia elettrica delle notti milanesi.',
    basePrice: '155.00',
    concentration: 'Extrait de Parfum 40%',
    season: 'Fall/Winter',
    gender: 'Unisex',
    active: true,
    featured: true,
    sizes: [
      { volume: 50, price: '155.00', sku: 'SCIN-50', stockQuantity: 15 },
      { volume: 10, price: '48.00', sku: 'SCIN-10', stockQuantity: 40 },
    ],
    images: [
      { url: '/uploads/images/Scintilla.jpeg', alt: 'Scintilla Extrait de Parfum', isPrimary: true, order: 1 },
      { url: '/uploads/images/Scintilla-2.jpeg', alt: 'Scintilla vista 2', isPrimary: false, order: 2 },
      { url: '/uploads/images/Scintilla-3.jpeg', alt: 'Scintilla dettaglio', isPrimary: false, order: 3 },
      { url: '/uploads/images/Scintilla-4.jpeg', alt: 'Scintilla packaging', isPrimary: false, order: 4 },
      { url: '/uploads/images/Scintilla-tester-10ml.jpeg', alt: 'Scintilla tester 10ml', isPrimary: false, order: 5 },
    ],
    olfactoryNotes: [
      { category: 'top', note: 'Pepe Rosa', order: 1 },
      { category: 'top', note: 'Zenzero Fresco', order: 2 },
      { category: 'top', note: 'Cardamomo', order: 3 },
      { category: 'heart', note: 'Iris Fiorentino', order: 1 },
      { category: 'heart', note: 'Tuberosa', order: 2 },
      { category: 'heart', note: 'Peonia', order: 3 },
      { category: 'base', note: 'Patchouli Indonesia', order: 1 },
      { category: 'base', note: 'Vaniglia Madagascar', order: 2 },
      { category: 'base', note: 'Oud Sintetico', order: 3 },
    ],
  },
  {
    slug: 'potion-damour',
    name: "Potion d'Amour",
    tagline: 'L\'Elisir dell\'Amore',
    description: 'Una pozione sensuale e avvolgente, come un incantesimo d\'amore. Note gourmand e afrodisiache che seducono i sensi.',
    story: 'Potion d\'Amour è l\'essenza della seduzione. Una fragranza che racconta storie d\'amore proibite e passioni segrete, ispirata agli antichi elisir d\'amore veneziani.',
    basePrice: '160.00',
    concentration: 'Extrait de Parfum 42%',
    season: 'Year-round',
    gender: 'Unisex',
    active: true,
    featured: true,
    sizes: [
      { volume: 50, price: '160.00', sku: 'POT-50', stockQuantity: 12 },
      { volume: 10, price: '50.00', sku: 'POT-10', stockQuantity: 35 },
    ],
    images: [
      { url: '/uploads/images/Potion d\'amour.jpeg', alt: 'Potion d\'Amour Extrait de Parfum', isPrimary: true, order: 1 },
      { url: '/uploads/images/Potion-d-amour-1.jpeg', alt: 'Potion d\'Amour vista 2', isPrimary: false, order: 2 },
      { url: '/uploads/images/Potion d\'amour con tester cristallo.jpeg', alt: 'Potion d\'Amour con tester Cristallo', isPrimary: false, order: 3 },
      { url: '/uploads/images/Potion d\'amour con tester scintilla.jpeg', alt: 'Potion d\'Amour con tester Scintilla', isPrimary: false, order: 4 },
    ],
    olfactoryNotes: [
      { category: 'top', note: 'Lampone Rosso', order: 1 },
      { category: 'top', note: 'Bergamotto', order: 2 },
      { category: 'top', note: 'Liquore di Amaretto', order: 3 },
      { category: 'heart', note: 'Rosa Damascena', order: 1 },
      { category: 'heart', note: 'Ylang Ylang', order: 2 },
      { category: 'heart', note: 'Caramello', order: 3 },
      { category: 'base', note: 'Vaniglia Tahitiana', order: 1 },
      { category: 'base', note: 'Pralinato', order: 2 },
      { category: 'base', note: 'Muschio di Quercia', order: 3 },
    ],
  },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (in reverse order per foreign keys)
  console.log('🗑️  Clearing existing data...');
  await prisma.review.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.olfactoryNote.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productSize.deleteMany();
  await prisma.product.deleteMany();
  await prisma.address.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Data cleared');

  // Seed products
  console.log('📦 Seeding products...');
  for (const mockProduct of mockProducts) {
    const product = await prisma.product.create({
      data: {
        slug: mockProduct.slug,
        name: mockProduct.name,
        tagline: mockProduct.tagline,
        description: mockProduct.description,
        story: mockProduct.story,
        basePrice: new Prisma.Decimal(mockProduct.basePrice),
        concentration: mockProduct.concentration,
        season: mockProduct.season,
        gender: mockProduct.gender,
        active: mockProduct.active,
        featured: mockProduct.featured,
        sizes: {
          create: mockProduct.sizes.map((size) => ({
            volume: size.volume,
            price: new Prisma.Decimal(size.price),
            sku: size.sku,
            stockQuantity: size.stockQuantity,
            lowStockThreshold: 5,
          })),
        },
        images: {
          create: mockProduct.images.map((image) => ({
            url: image.url,
            alt: image.alt,
            isPrimary: image.isPrimary,
            order: image.order,
          })),
        },
        olfactoryNotes: {
          create: mockProduct.olfactoryNotes.map((note) => ({
            category: note.category,
            note: note.note,
            order: note.order,
          })),
        },
      },
    });

    console.log(`  ✅ Created product: ${product.name} (${product.slug})`);
  }

  console.log('✨ Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
