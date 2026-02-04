import { Metadata } from 'next';
import { BrandStoryHero } from '@/components/sections/heroes';
import { Section, Container } from '@/components/layout';
import { Heading, Body, Quote } from '@/components/typography';
import { BreadcrumbSchema } from '@/components/JsonLd';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Zoe Cristofoli — Founder & Creative Director | OZ Extrait',
  description: 'Da Verona al mondo della profumeria luxury. Scopri come Zoe Cristofoli ha creato OZ Extrait, portando autenticità e passione nella profumeria artigianale italiana.',
  openGraph: {
    title: 'Zoe Cristofoli — Founder OZ Extrait',
    description: 'Scopri la storia di Zoe Cristofoli e la nascita di OZ Extrait',
  },
};

export default function ZoeCristofoliPage() {
  return (
    <div className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Zoe Cristofoli', url: '/zoe-cristofoli' },
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
                Nata a Verona, città dell&apos;amore e dell&apos;arte, Zoe Cristofoli ha sempre avuto una
                personalità forte e distintiva. Il suo percorso nel mondo dell&apos;immagine e della moda
                l&apos;ha portata a diventare una delle influencer più seguite in Italia.
              </Body>

              <Body size="lg" variant="narrative" className="text-stone-700">
                Con i suoi tatuaggi iconici e il suo stile inconfondibile, Zoe ha sempre cercato modi
                per esprimere la propria identità, trovando nell&apos;arte olfattiva la forma di espressione
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

      {/* Chapter 2: La Visione + Quote */}
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
                  Volevo creare qualcosa che andasse oltre l&apos;immagine, qualcosa che rimanesse sulla pelle
                  e nell&apos;anima. I profumi hanno il potere di evocare ricordi, emozioni,
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

      {/* Video: Zoe Racconta OZ Extrait */}
      <Section bg="cream" spacing="default">
        <Container size="lg">
          <div className="bg-stone-50 border border-stone-200 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-cinzel text-3xl text-gold-600 mb-6 text-center">
                Zoe Racconta OZ Extrait
              </h3>
              <div className="aspect-video rounded-lg overflow-hidden bg-black/50">
                <video
                  controls
                  className="w-full h-full"
                  poster="/uploads/images/Zoe-Cristofoli.jpeg"
                >
                  <source src="/uploads/videos/Video Zoe con Schiume capelli.mp4" type="video/mp4" />
                  Il tuo browser non supporta il video.
                </video>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quote personale sulle fragranze */}
      <Section bg="white" spacing="default">
        <Container size="md">
          <div className="text-center max-w-4xl mx-auto">
            <blockquote className="relative">
              <div className="absolute -top-8 -left-4 text-8xl text-gold-600/20 font-cinzel">&ldquo;</div>
              <p className="font-playfair text-3xl text-stone-800 leading-relaxed italic relative z-10 mb-6">
                Ogni fragranza è un pezzo di me. Cristallo per la purezza che cerco, Scintilla per
                l&apos;energia che porto, Potion d&apos;Amour per la passione che vivo.
              </p>
              <footer className="font-inter text-gold-600 uppercase tracking-widest text-sm">
                — Zoe Cristofoli
              </footer>
            </blockquote>
          </div>
        </Container>
      </Section>

      {/* Chapter 3: Il Viaggio + Stats */}
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
              Un manifesto contro la mediocrità, contro l&apos;omologazione, per la qualità assoluta.
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
