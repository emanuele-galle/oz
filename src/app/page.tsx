import { HomepageHeroLuxury } from '@/components/sections/heroes/HomepageHeroLuxury';
import { TrustFeaturesLuxury } from '@/components/sections/TrustFeaturesLuxury';
import { ProductsShowcaseLuxury } from '@/components/sections/ProductsShowcaseLuxury';
import { Craftsmanship } from '@/components/sections/Craftsmanship';
import { FounderStoryLuxury } from '@/components/sections/FounderStoryLuxury';
import { TestimonialsLuxury } from '@/components/sections/TestimonialsLuxury';
import { NewsletterLuxury } from '@/components/sections/NewsletterLuxury';
import { OrganizationSchema } from '@/components/JsonLd';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <>
      <OrganizationSchema />
      <HomepageHeroLuxury />
      <TrustFeaturesLuxury />
      <ProductsShowcaseLuxury />
      <Craftsmanship />
      <FounderStoryLuxury />
      <TestimonialsLuxury />
      <NewsletterLuxury />
    </>
  );
}
