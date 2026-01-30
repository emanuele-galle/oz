import { Metadata } from 'next';
import { BrandPhilosophyHero } from '@/components/sections/heroes';
import { Section, Container } from '@/components/layout';
import { Heading, Body } from '@/components/typography';
import { BreadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'La Nostra Filosofia — OZ Extrait',
  description: 'Extrait de Parfum. Extrait d\'Âme. Scopri i valori che guidano OZ Extrait: autenticità, artigianalità, qualità senza compromessi.',
};

export default function FilosofiaPage() {
  const values = [
    {
      title: 'Autenticità',
      description: 'Ogni fragranza è un pezzo della storia di Zoe. Non fingiamo di essere ciò che non siamo. Ingredienti veri, promesse mantenute, trasparenza totale.',
      icon: '✨',
    },
    {
      title: 'Artigianalità',
      description: 'Ogni bottiglia assemblata a mano. Piccoli lotti (max 500 bottiglie). Controllo qualità su ogni singola goccia. Questo è craft vero.',
      icon: '🎨',
    },
    {
      title: 'Durabilità',
      description: 'Extrait de Parfum 40-42% = 12-16 ore sulla pelle. Non profumi usa-e-getta. Investimenti che durano, in tutti i sensi.',
      icon: '⏱️',
    },
    {
      title: 'Inclusività',
      description: 'No etichette "per lui/per lei". Le fragranze non hanno genere. Trova la tua basandoti su come ti fa sentire, non su stereotipi imposti.',
      icon: '🌈',
    },
    {
      title: 'Sostenibilità',
      description: 'Ingredienti cruelty-free, packaging riciclabile, produzione locale italiana. Non salviamo il pianeta, ma facciamo scelte responsabili.',
      icon: '🌱',
    },
  ];

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

      {/* I Nostri Valori */}
      <Section id="valori" bg="cream" spacing="default">
        <Container size="xl">
          <div className="text-center mb-16">
            <Heading level={2} size="h2" color="black" className="mb-6">
              I Nostri Valori
            </Heading>
            <Body size="lg" className="text-stone-600 max-w-3xl mx-auto">
              Cinque principi che guidano ogni decisione, ogni creazione, ogni interazione con i nostri clienti.
            </Body>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white border border-stone-200 rounded-lg p-8 hover:border-gold-300 hover:shadow-md transition-all duration-300"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <Heading level={3} size="h3" color="black" className="mb-4">
                  {value.title}
                </Heading>
                <Body size="md" className="text-stone-600">
                  {value.description}
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
            <Heading level={2} size="h2" color="gold">
              Vivi i Nostri Valori
            </Heading>
            <Body size="lg" className="text-white/80 max-w-2xl mx-auto">
              Scopri le tre fragranze che incarnano questa filosofia.
              Autentiche, artigianali, indimenticabili.
            </Body>
            <a
              href="/fragranze"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-midnight font-inter text-sm font-semibold uppercase tracking-wide rounded-sm shadow-gold-medium hover:bg-gold-400 hover:shadow-gold-strong transition-all duration-300"
            >
              Scopri le Fragranze
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
