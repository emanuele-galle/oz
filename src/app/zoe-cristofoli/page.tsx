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

      {/* Instagram: Segui Zoe */}
      <Section bg="cream" spacing="default">
        <Container size="lg">
          <div className="bg-white border border-stone-200 overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Image side */}
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src="/uploads/images/Zoe-Cristofoli.jpeg"
                  alt="Zoe Cristofoli — @zoe_cristofoli"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/20" />
              </div>

              {/* Content side */}
              <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-6">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-stone-800">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/>
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="font-cinzel text-2xl md:text-3xl text-stone-900">
                    Segui Zoe
                  </h3>
                  <p className="font-inter text-sm text-stone-400 tracking-wide">
                    @zoe_cristofoli
                  </p>
                </div>

                <p className="font-playfair text-lg text-stone-600 italic max-w-sm">
                  Dietro le quinte di OZ Extrait, la vita quotidiana e l&apos;ispirazione
                  creativa di Zoe.
                </p>

                <a
                  href="https://www.instagram.com/zoe_cristofoli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white font-inter text-sm font-semibold uppercase tracking-[0.15em] hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Segui su Instagram
                </a>
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
