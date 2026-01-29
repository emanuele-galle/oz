import { HeroSection } from '@/components/sections/HeroSection';
import { BrandStoryAnimated } from '@/components/sections/BrandStoryAnimated';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { InstagramFeed } from '@/components/sections/InstagramFeed';
import { OrganizationSchema } from '@/components/JsonLd';

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <HeroSection />
      <BrandStoryAnimated />
      <ProductsSection />
      <TestimonialsSection />
      <InstagramFeed />
    </>
  );
}
