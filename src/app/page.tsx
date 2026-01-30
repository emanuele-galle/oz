import { HomepageHero } from '@/components/sections/heroes';
import { TrustFeaturesSection } from '@/components/sections/TrustFeaturesSection';
import { BrandStoryAnimated } from '@/components/sections/BrandStoryAnimated';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { InstagramFeed } from '@/components/sections/InstagramFeed';
import { EnhancedNewsletter } from '@/components/sections/EnhancedNewsletter';
import { OrganizationSchema } from '@/components/JsonLd';
import { getFeaturedProducts } from '@/data/products-db';

export const revalidate = 3600; // Rivalidare ogni ora
export const dynamic = 'force-dynamic'; // Skip SSG during build

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <>
      <OrganizationSchema />
      <HomepageHero />
      <TrustFeaturesSection />
      <BrandStoryAnimated />
      <ProductsSection products={products} />
      <TestimonialsSection />
      <InstagramFeed />
      <EnhancedNewsletter />
    </>
  );
}
