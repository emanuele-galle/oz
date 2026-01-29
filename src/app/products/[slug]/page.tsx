import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProductSlugs } from '@/data/products';
import { ProductHero } from '@/components/sections/ProductHero';
import { ProductInfo } from '@/components/sections/ProductInfo';
import { OlfactoryJourney } from '@/components/sections/OlfactoryJourney';
import { Ingredients } from '@/components/sections/Ingredients';
import { ProductSchema, BreadcrumbSchema } from '@/components/JsonLd';

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Prodotto non trovato - OZ Extrait',
    };
  }

  return {
    title: `${product.name} - ${product.tagline} | OZ Extrait`,
    description: product.description,
    openGraph: {
      title: `${product.name} - OZ Extrait`,
      description: product.description,
      images: [product.images[0].url],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  return (
    <div className="min-h-screen">
      <ProductSchema
        name={product.name}
        description={product.description}
        image={primaryImage.url}
        price={product.price}
        sku={product.sizes[0].sku}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Prodotti', url: '/#products' },
          { name: product.name, url: `/products/${product.slug}` },
        ]}
      />
      <ProductHero product={product} />
      <ProductInfo product={product} />
      <OlfactoryJourney product={product} />
      <Ingredients product={product} />
    </div>
  );
}
