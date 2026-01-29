import { HeroSection } from '@/components/sections/HeroSection';
import { BrandStory } from '@/components/sections/BrandStory';
import { ProductsSection } from '@/components/sections/ProductsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStory />
      <ProductsSection />
    </>
  );
}
