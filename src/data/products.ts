export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  price: number;
  sizes: ProductSize[];
  images: ProductImage[];
  videoUrl?: string;
  olfactoryNotes: OlfactoryNotes;
  ingredients: string[];
  concentration: string;
  longevity: string;
  sillage: string;
  bestFor: string[];
}

export interface ProductSize {
  volume: string;
  price: number;
  sku: string;
  isTester?: boolean;
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

export const products: Product[] = [
  {
    id: '1',
    slug: 'cristallo',
    name: 'Cristallo',
    tagline: 'Purezza Cristallina',
    description: 'Un extrait de parfum che cattura l\'essenza della purezza cristallina. Note fresche e luminose che evocano la trasparenza del vetro veneziano.',
    story: 'Cristallo nasce dall\'ispirazione delle vetrate di Murano, dove la luce danza attraverso il cristallo creando riflessi infiniti. Una fragranza che incarna la bellezza pura e senza tempo.',
    price: 150,
    sizes: [
      { volume: '50ml', price: 150, sku: 'CRIS-50' },
      { volume: '10ml', price: 45, sku: 'CRIS-10', isTester: true },
    ],
    images: [
      { url: '/uploads/images/Cristallo.jpeg', alt: 'Cristallo Extrait de Parfum', isPrimary: true },
      { url: '/uploads/images/Cristallo-2.jpeg', alt: 'Cristallo vista 2' },
      { url: '/uploads/images/Cristallo-3.jpeg', alt: 'Cristallo vista 3' },
      { url: '/uploads/images/Cristallo-4.jpeg', alt: 'Cristallo vista 4' },
      { url: '/uploads/images/Cristallo-5.jpeg', alt: 'Cristallo vista 5' },
      { url: '/uploads/images/Cristallo-6.jpeg', alt: 'Cristallo dettaglio' },
      { url: '/uploads/images/Cristallo 7.jpeg', alt: 'Cristallo packaging' },
      { url: '/uploads/images/Cristallo-man.jpeg', alt: 'Cristallo uomo' },
      { url: '/uploads/images/Cristallo-tester-10ml.jpeg', alt: 'Cristallo tester 10ml' },
    ],
    videoUrl: '/uploads/videos/cristallo-background.mp4',
    olfactoryNotes: {
      top: ['Bergamotto di Calabria', 'Limone Sfumato', 'Mandarino Verde'],
      heart: ['Neroli Tunisia', 'Gelsomino Sambac', 'Rosa Centifolia'],
      base: ['Muschio Bianco', 'Ambra Grigia', 'Legno di Cedro'],
    },
    ingredients: [
      'Bergamotto di Calabria DOP',
      'Gelsomino Sambac del Marocco',
      'Ambra Grigia naturale',
      'Muschio Bianco sintetico (cruelty-free)',
    ],
    concentration: 'Extrait de Parfum 40%',
    longevity: '12+ ore',
    sillage: 'Moderato-Forte',
    bestFor: ['Primavera', 'Estate', 'Giorno', 'Occasioni speciali'],
  },
  {
    id: '2',
    slug: 'scintilla',
    name: 'Scintilla',
    tagline: 'L\'Energia della Luce',
    description: 'Una fragranza vibrante e magnetica, come una scintilla che accende la notte. Note speziate e sensuali che lasciano una scia indimenticabile.',
    story: 'Scintilla rappresenta il momento magico in cui la passione si accende. Una fragranza audace per chi osa, ispirata all\'energia elettrica delle notti milanesi.',
    price: 155,
    sizes: [
      { volume: '50ml', price: 155, sku: 'SCIN-50' },
      { volume: '10ml', price: 48, sku: 'SCIN-10', isTester: true },
    ],
    images: [
      { url: '/uploads/images/Scintilla.jpeg', alt: 'Scintilla Extrait de Parfum', isPrimary: true },
      { url: '/uploads/images/Scintilla-2.jpeg', alt: 'Scintilla vista 2' },
      { url: '/uploads/images/Scintilla-3.jpeg', alt: 'Scintilla dettaglio' },
      { url: '/uploads/images/Scintilla-4.jpeg', alt: 'Scintilla packaging' },
      { url: '/uploads/images/Scintilla-tester-10ml.jpeg', alt: 'Scintilla tester 10ml' },
    ],
    videoUrl: '/uploads/videos/scrintilla-background.mp4',
    olfactoryNotes: {
      top: ['Pepe Rosa', 'Zenzero Fresco', 'Cardamomo'],
      heart: ['Iris Fiorentino', 'Tuberosa', 'Peonia'],
      base: ['Patchouli Indonesia', 'Vaniglia Madagascar', 'Oud Sintetico'],
    },
    ingredients: [
      'Iris Fiorentino Pallida',
      'Vaniglia Bourbon del Madagascar',
      'Patchouli aged 10 anni',
      'Oud sintetico molecolare',
    ],
    concentration: 'Extrait de Parfum 40%',
    longevity: '14+ ore',
    sillage: 'Forte-Molto Forte',
    bestFor: ['Autunno', 'Inverno', 'Sera', 'Eventi glamour'],
  },
  {
    id: '3',
    slug: 'potion-damour',
    name: "Potion d'Amour",
    tagline: 'L\'Elisir dell\'Amore',
    description: 'Una pozione sensuale e avvolgente, come un incantesimo d\'amore. Note gourmand e afrodisiache che seducono i sensi.',
    story: 'Potion d\'Amour è l\'essenza della seduzione. Una fragranza che racconta storie d\'amore proibite e passioni segrete, ispirata agli antichi elisir d\'amore veneziani.',
    price: 160,
    sizes: [
      { volume: '50ml', price: 160, sku: 'POT-50' },
      { volume: '10ml', price: 50, sku: 'POT-10', isTester: true },
    ],
    images: [
      { url: '/uploads/images/Potion d\'amour.jpeg', alt: 'Potion d\'Amour Extrait de Parfum', isPrimary: true },
      { url: '/uploads/images/Potion-d-amour-1.jpeg', alt: 'Potion d\'Amour vista 2' },
      { url: '/uploads/images/Potion d\'amour con tester cristallo.jpeg', alt: 'Potion d\'Amour con tester Cristallo' },
      { url: '/uploads/images/Potion d\'amour con tester scintilla.jpeg', alt: 'Potion d\'Amour con tester Scintilla' },
    ],
    olfactoryNotes: {
      top: ['Lampone Rosso', 'Bergamotto', 'Liquore di Amaretto'],
      heart: ['Rosa Damascena', 'Ylang Ylang', 'Caramello'],
      base: ['Vaniglia Tahitiana', 'Pralinato', 'Muschio di Quercia'],
    },
    ingredients: [
      'Rosa Damascena della Bulgaria',
      'Vaniglia Tahitiana premium',
      'Ylang Ylang delle Comore',
      'Accord gourmand naturale',
    ],
    concentration: 'Extrait de Parfum 42%',
    longevity: '16+ ore',
    sillage: 'Molto Forte',
    bestFor: ['Sera', 'Notte', 'Romantico', 'San Valentino'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
