import { HomepageHeroLuxury } from '@/components/sections/heroes/HomepageHeroLuxury';
import { TrustFeaturesLuxury } from '@/components/sections/TrustFeaturesLuxury';
import { ProductsShowcaseLuxury } from '@/components/sections/ProductsShowcaseLuxury';
import { Craftsmanship } from '@/components/sections/Craftsmanship';
import { FounderStoryLuxury } from '@/components/sections/FounderStoryLuxury';
import { TestimonialsLuxury } from '@/components/sections/TestimonialsLuxury';
import { NewsletterLuxury } from '@/components/sections/NewsletterLuxury';
import { ParallaxDividerFirst, ParallaxDividerSecond, ParallaxDividerThird } from '@/components/sections/HomepageParallaxDividers';
import { OrganizationSchema } from '@/components/JsonLd';
import { getFeaturedProducts } from '@/data/products-db';

export const revalidate = 3600;

export default async function Home() {
  let productsData: { slug: string; name: string; tagline: string | null; price: number; imageUrl: string; imageUrlHover?: string; concentration: string; size: string }[] = [];

  try {
    const products = await getFeaturedProducts();
    productsData = products.map((p) => {
      const primaryImage = p.images.find((img) => img.isPrimary) || p.images[0];
      const hoverImage = p.images.find((img) => !img.isPrimary);
      const mainSize = p.sizes.find((s) => !s.isTester) || p.sizes[0];
      return {
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        price: p.price,
        imageUrl: primaryImage?.url || '/uploads/images/logo.png',
        imageUrlHover: hoverImage?.url,
        concentration: p.concentration.replace('Extrait de Parfum ', ''),
        size: mainSize?.volume || '50ml',
      };
    });
  } catch (error) {
    console.warn('Homepage: DB unavailable, using empty products');
  }

  return (
    <>
      <OrganizationSchema />
      <HomepageHeroLuxury />
      <TrustFeaturesLuxury />
      <ParallaxDividerFirst />
      <ProductsShowcaseLuxury products={productsData} />
      <ParallaxDividerSecond />
      <Craftsmanship />
      <ParallaxDividerThird />
      <FounderStoryLuxury />
      <TestimonialsLuxury />
      <NewsletterLuxury />
    </>
  );
}
