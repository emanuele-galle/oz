import { HeroSection } from '@/components/sections/HeroSection';
import { BrandStory } from '@/components/sections/BrandStory';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { InstagramFeed } from '@/components/sections/InstagramFeed';
import { OrganizationSchema } from '@/components/JsonLd';

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <HeroSection />
      <BrandStory />
      <ProductsSection />
      <TestimonialsSection />
      <InstagramFeed />
    </>
  );
}
