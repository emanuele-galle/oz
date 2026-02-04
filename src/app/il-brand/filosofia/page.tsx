import { Metadata } from 'next';
import { BrandPhilosophyHero } from '@/components/sections/heroes';
import { Section, Container } from '@/components/layout';
import { Heading, Body, Quote } from '@/components/typography';
import { BreadcrumbSchema } from '@/components/JsonLd';
import { ImageReveal } from '@/components/effects/ImageReveal';
import { CountUp } from '@/components/effects/CountUp';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'La Nostra Filosofia — OZ Extrait',
  description: 'Extrait de Parfum. Extrait d\'Âme. Scopri i valori che guidano OZ Extrait: autenticità, artigianalità, qualità senza compromessi.',
};

const values = [
  {
    numeral: 'I',
    title: 'Autenticità',
    description: 'Ogni fragranza è un pezzo della storia di Zoe. Non fingiamo di essere ciò che non siamo. Ingredienti veri, promesse mantenute, trasparenza totale.',
  },
  {
    numeral: 'II',
    title: 'Artigianalità',
    description: 'Ogni bottiglia assemblata a mano. Piccoli lotti, massimo 500 bottiglie. Controllo qualità su ogni singola goccia. Questo è craft vero.',
  },
  {
    numeral: 'III',
    title: 'Durabilità',
    description: 'Extrait de Parfum al 40% di concentrazione. 12-16 ore sulla pelle. Non profumi usa-e-getta, ma investimenti che durano.',
  },
  {
    numeral: 'IV',
    title: 'Inclusività',
    description: 'Nessuna etichetta "per lui" o "per lei". Le fragranze non hanno genere. Trova la tua basandoti su come ti fa sentire, non su stereotipi.',
  },
  {
    numeral: 'V',
    title: 'Sostenibilità',
    description: 'Ingredienti cruelty-free, packaging riciclabile, produzione locale italiana. Non salviamo il pianeta, ma facciamo scelte responsabili.',
  },
];

export default function FilosofiaPage() {
  return (
    <div className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Il Brand', url: '/il-brand/filosofia' },
          { name: 'Filosofia', url: '/il-brand/filosofia' },
        ]}
      />

      <BrandPhilosophyHero />

      {/* Il Manifesto */}
      <Section id="valori" bg="cream" spacing="default">
        <Container size="xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div>
                <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70">
                  Il Manifesto
                </span>
              </div>

              <Heading level={2} size="h2" color="black">
                Non Creiamo Profumi.
                <br />
                <span className="text-gold-600">Creiamo Esperienze.</span>
              </Heading>

              <Body size="lg" variant="narrative" className="text-stone-700">
                OZ Extrait nasce da una convinzione: la profumeria di lusso non dovrebbe essere un prodotto,
                ma un&apos;esperienza sensoriale che trascende il tempo. Ogni fragranza è un&apos;opera d&apos;arte liquida
                che vive sulla pelle e nell&apos;anima.
              </Body>

              <Body size="lg" variant="narrative" className="text-stone-700">
                Dove altri cercano il compromesso tra costo e qualità, noi scegliamo sempre la qualità.
                Dove altri seguono le tendenze, noi creiamo identità. Dove altri producono in massa,
                noi produciamo con cura.
              </Body>

              <div className="flex items-center gap-4 pt-4">
                <div className="h-[1px] w-16 bg-gradient-to-r from-gold-500/50 to-transparent" />
                <span className="font-playfair text-sm italic text-stone-500">
                  Extrait de Parfum. Extrait d&apos;Âme.
                </span>
              </div>
            </div>

            <div className="relative">
              <ImageReveal
                src="/uploads/images/Box vetrina.jpeg"
                alt="OZ Extrait — Collezione completa"
                fill
                className="aspect-[3/4] rounded-sm"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* I Nostri Valori */}
      <Section bg="white" spacing="default">
        <Container size="xl">
          <div className="text-center mb-16 md:mb-20">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70 block mb-4">
              I Principi
            </span>
            <Heading level={2} size="h2" color="black" className="mb-6">
              Cinque Valori Fondamentali
            </Heading>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/40" />
              <div className="w-1.5 h-1.5 bg-gold-500/40 rotate-45" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/40" />
            </div>
            <Body size="lg" className="text-stone-500 max-w-2xl mx-auto">
              Ogni decisione, ogni creazione, ogni interazione con i nostri clienti è guidata da questi principi.
            </Body>
          </div>

          {/* Values — Top row of 3 */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {values.slice(0, 3).map((value) => (
              <div
                key={value.numeral}
                className="group bg-cream-50 border border-stone-200/60 rounded-sm p-8 md:p-10 hover:border-gold-500/30 hover:shadow-lg transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-full border-2 border-gold-500/30 flex items-center justify-center mb-6 group-hover:border-gold-500 group-hover:bg-gold-500/5 transition-all duration-500">
                  <span className="font-cinzel text-sm text-gold-600 font-semibold">{value.numeral}</span>
                </div>
                <Heading level={3} size="h3" color="black" className="mb-4">
                  {value.title}
                </Heading>
                <Body size="md" className="text-stone-600 leading-relaxed">
                  {value.description}
                </Body>
              </div>
            ))}
          </div>

          {/* Values — Bottom row of 2, centered */}
          <div className="grid md:grid-cols-2 gap-8 max-w-[880px] mx-auto">
            {values.slice(3).map((value) => (
              <div
                key={value.numeral}
                className="group bg-cream-50 border border-stone-200/60 rounded-sm p-8 md:p-10 hover:border-gold-500/30 hover:shadow-lg transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-full border-2 border-gold-500/30 flex items-center justify-center mb-6 group-hover:border-gold-500 group-hover:bg-gold-500/5 transition-all duration-500">
                  <span className="font-cinzel text-sm text-gold-600 font-semibold">{value.numeral}</span>
                </div>
                <Heading level={3} size="h3" color="black" className="mb-4">
                  {value.title}
                </Heading>
                <Body size="md" className="text-stone-600 leading-relaxed">
                  {value.description}
                </Body>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* L'Impegno per la Qualità */}
      <Section bg="cream" spacing="default">
        <Container size="xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 md:order-1">
              <ImageReveal
                src="/uploads/images/Cristallo-5.jpeg"
                alt="OZ Extrait — Dettaglio artigianale"
                fill
                className="aspect-[3/4] rounded-sm"
              />
            </div>

            <div className="space-y-8 order-1 md:order-2">
              <div>
                <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70">
                  L&apos;Impegno
                </span>
              </div>

              <Heading level={2} size="h2" color="black">
                Qualità Senza
                <br />
                <span className="text-gold-600">Compromessi</span>
              </Heading>

              <Body size="lg" variant="narrative" className="text-stone-700">
                Ogni bottiglia di OZ Extrait è il risultato di mesi di ricerca, selezione rigorosa delle
                materie prime e un processo artigianale che non ammette scorciatoie. La concentrazione
                al 40% non è un numero di marketing — è una promessa.
              </Body>

              {/* Quality Stats */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="font-cinzel text-4xl md:text-5xl text-gold-600">
                    <CountUp to={40} duration={2} />%
                  </div>
                  <div className="font-inter text-xs uppercase tracking-wider text-stone-500 mt-2">
                    Concentrazione
                  </div>
                </div>
                <div className="text-center border-x border-stone-200">
                  <div className="font-cinzel text-4xl md:text-5xl text-gold-600">
                    <CountUp to={16} duration={2} />h
                  </div>
                  <div className="font-inter text-xs uppercase tracking-wider text-stone-500 mt-2">
                    Durata Max
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-cinzel text-4xl md:text-5xl text-gold-600">
                    <CountUp to={500} duration={2.5} />
                  </div>
                  <div className="font-inter text-xs uppercase tracking-wider text-stone-500 mt-2">
                    Max Bottiglie
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quote */}
      <Section bg="white" spacing="default">
        <Container size="md">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/30" />
              <div className="w-2 h-2 bg-gold-500/30 rotate-45" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/30" />
            </div>

            <Quote size="large" author="Zoe Cristofoli" role="Founder & Creative Director" showQuotationMarks>
              <span className="text-stone-800">
                Volevo creare qualcosa che andasse oltre l&apos;immagine, qualcosa che rimanesse
                sulla pelle e nell&apos;anima. Un profumo è la forma più intima di espressione personale.
              </span>
            </Quote>

            <div className="pt-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-gold-500/20">
                <Image
                  src="/uploads/images/Zoe-2.jpeg"
                  alt="Zoe Cristofoli"
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Il Processo */}
      <Section bg="cream" spacing="default">
        <Container size="xl">
          <div className="text-center mb-16">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70 block mb-4">
              Il Percorso
            </span>
            <Heading level={2} size="h2" color="black" className="mb-6">
              Dalla Visione alla Realtà
            </Heading>
            <Body size="lg" className="text-stone-500 max-w-2xl mx-auto">
              Il viaggio che ha portato ogni fragranza OZ Extrait dalla prima idea alla bottiglia finale.
            </Body>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Ispirazione', text: 'Ogni fragranza nasce da un\'emozione, un ricordo, un momento di vita vissuta.' },
              { step: '02', title: 'Ricerca', text: 'Mesi di selezione delle migliori materie prime da maestri parfumeur italiani e francesi.' },
              { step: '03', title: 'Creazione', text: 'Oltre 100 formule testate per ogni fragranza. Solo la perfezione viene approvata.' },
              { step: '04', title: 'Artigianato', text: 'Ogni bottiglia assemblata e confezionata a mano nel nostro laboratorio a Verona.' },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-4">
                <div className="font-cinzel text-5xl text-gold-500/50 font-bold">
                  {item.step}
                </div>
                <Heading level={3} size="h4" color="black">
                  {item.title}
                </Heading>
                <Body size="sm" className="text-stone-600 leading-relaxed">
                  {item.text}
                </Body>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section bg="midnight" spacing="default">
        <Container size="md">
          <div className="text-center space-y-8">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-500/80 block">
              Scopri OZ Extrait
            </span>
            <Heading level={2} size="h2" color="gold">
              Vivi la Nostra Filosofia
            </Heading>
            <Body size="lg" className="text-white/70 max-w-2xl mx-auto">
              Tre fragranze che incarnano ogni principio che ci guida.
              Autentiche, artigianali, indimenticabili.
            </Body>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="/#products"
                className="px-10 py-4 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500"
              >
                Scopri le Fragranze
              </a>
              <a
                href="/il-brand/storia"
                className="px-10 py-4 border border-white/30 text-white/90 font-inter text-sm font-medium uppercase tracking-[0.15em] hover:border-gold-500 hover:text-gold-400 transition-all duration-300"
              >
                La Nostra Storia
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
