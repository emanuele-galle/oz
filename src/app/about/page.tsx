import { Metadata } from 'next';
import { AboutHero } from '@/components/sections/AboutHero';
import { FounderStory } from '@/components/sections/FounderStory';
import { BrandPhilosophy } from '@/components/sections/BrandPhilosophy';
import { Craftsmanship } from '@/components/sections/Craftsmanship';

export const metadata: Metadata = {
  title: 'La Nostra Storia - Zoe Cristofoli | OZ Extrait',
  description: 'Scopri la storia di Zoe Cristofoli, fondatrice di OZ Extrait. Passione per la profumeria di nicchia e l\'arte olfattiva italiana.',
  openGraph: {
    title: 'La Nostra Storia - OZ Extrait',
    description: 'Scopri la storia di Zoe Cristofoli e la nascita di OZ Extrait',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FounderStory />
      <BrandPhilosophy />
      <Craftsmanship />
    </>
  );
}
