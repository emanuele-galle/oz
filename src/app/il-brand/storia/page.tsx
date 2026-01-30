import { Metadata } from 'next';
import { BrandStoryHero } from '@/components/sections/heroes';
import { Section, Container } from '@/components/layout';
import { Heading, Body, Quote } from '@/components/typography';
import { BreadcrumbSchema } from '@/components/JsonLd';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'La Storia di Zoe Cristofoli — Founder OZ Extrait',
  description: 'Da Verona al mondo della profumeria luxury. Scopri come Zoe Cristofoli ha creato OZ Extrait, portando autenticità e passione nella profumeria artigianale italiana.',
};

export default function StoriaPage() {
  return (
    <div className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Il Brand', url: '/il-brand/storia' },
          { name: 'Storia', url: '/il-brand/storia' },
        ]}
      />

      <BrandStoryHero />

      {/* Chapter 1: Le Origini */}
      <Section id="storia" bg="cream" spacing="default">
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Heading level={2} size="h2" color="black">
                Le Origini
              </Heading>

              <Body size="lg" variant="narrative" className="text-stone-700">
                Nata a Verona, città dell'amore e dell'arte, Zoe Cristofoli ha sempre avuto una
                personalità forte e distintiva. Il suo percorso nel mondo dell'immagine e della moda
                l'ha portata a diventare una delle influencer più seguite in Italia.
              </Body>

              <Body size="lg" variant="narrative" className="text-stone-700">
                Con i suoi tatuaggi iconici e il suo stile inconfondibile, Zoe ha sempre cercato modi
                per esprimere la propria identità, trovando nell'arte olfattiva la forma di espressione
                più pura e intima.
              </Body>
            </div>

            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src="/uploads/images/Zoe-2.jpeg"
                alt="Zoe Cristofoli"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Chapter 2: La Visione */}
      <Section bg="white" spacing="default">
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden order-2 md:order-1">
              <Image
                src="/uploads/images/Zoe-3.jpeg"
                alt="Zoe Cristofoli - The Vision"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <Heading level={2} size="h2" color="black">
                La Visione
              </Heading>

              <Quote size="default" author="Zoe Cristofoli" showQuotationMarks={false}>
                <span className="text-stone-800">
                  Volevo creare qualcosa che andasse oltre l'immagine, qualcosa che rimanesse sulla pelle
                  e nell'anima. I profumi hanno il potere di evocare ricordi, emozioni,
                  momenti. Volevo che le mie fragranze raccontassero storie.
                </span>
              </Quote>

              <Body size="lg" variant="narrative" className="text-stone-700">
                Dopo anni di ricerca e collaborazioni con i migliori nasi della profumeria francese e
                italiana, nasce OZ Extrait: tre fragranze che incarnano forza, sensualità e autenticità.
              </Body>
            </div>
          </div>
        </Container>
      </Section>

      {/* Chapter 3: Il Viaggio */}
      <Section bg="cream" spacing="default">
        <Container size="md">
          <div className="text-center space-y-8">
            <Heading level={2} size="h2" color="black">
              Il Viaggio verso OZ Extrait
            </Heading>

            <Body size="lg" variant="narrative" className="text-stone-700 max-w-3xl mx-auto">
              Il percorso di creazione di OZ Extrait è stato lungo e appassionato. 18 mesi di ricerca,
              collaborazioni con maestri parfumeur italiani e francesi, test di oltre 100 formule diverse.
            </Body>

            <Body size="lg" variant="narrative" className="text-stone-700 max-w-3xl mx-auto">
              Ma ogni momento è valso la pena. Perché OZ Extrait non è solo un brand — è un manifesto.
              Un manifesto contro la mediocrità, contro l'omologazione, per la qualità assoluta.
            </Body>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-8 pt-12 max-w-4xl mx-auto">
              <div className="p-6 bg-white border border-stone-200 rounded-lg">
                <div className="font-cinzel text-5xl text-gold-600 mb-2">18</div>
                <div className="font-inter text-sm uppercase tracking-wide text-stone-600">
                  Mesi di Sviluppo
                </div>
              </div>

              <div className="p-6 bg-white border border-stone-200 rounded-lg">
                <div className="font-cinzel text-5xl text-gold-600 mb-2">100+</div>
                <div className="font-inter text-sm uppercase tracking-wide text-stone-600">
                  Formule Testate
                </div>
              </div>

              <div className="p-6 bg-white border border-stone-200 rounded-lg">
                <div className="font-cinzel text-5xl text-gold-600 mb-2">3</div>
                <div className="font-inter text-sm uppercase tracking-wide text-stone-600">
                  Fragranze Perfette
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-12">
              <a
                href="/fragranze"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-midnight font-inter text-sm font-semibold uppercase tracking-wide rounded-sm shadow-gold-medium hover:bg-gold-400 hover:shadow-gold-strong transition-all duration-300"
              >
                Scopri le Fragranze
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
