import { Metadata } from 'next';
import { ProcessHero } from '@/components/sections/heroes';
import { Section, Container } from '@/components/layout';
import { Heading, Body } from '@/components/typography';
import { BreadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Il Nostro Processo — Craftsmanship OZ Extrait',
  description: 'Dalle essenze più pure alla bottiglia: un viaggio di 12 settimane. Scopri le 5 fasi di creazione artigianale delle fragranze OZ Extrait.',
};

export default function ProcessoPage() {
  const steps = [
    {
      number: 1,
      title: 'Selezione Ingredienti',
      description: 'Scegliamo solo le migliori essenze dal mondo: bergamotto di Calabria DOP, rosa damascena bulgara, vaniglia bourbon del Madagascar. Ogni ingrediente è tracciato, certificato, perfetto.',
      time: '2-4 settimane',
    },
    {
      number: 2,
      title: 'Blending',
      description: 'Il parfumeur blenda le essenze seguendo formule precise testate per mesi. Ogni goccia conta. Un errore dello 0.5% può rovinare tutto. Precisione assoluta.',
      time: '1 settimana',
    },
    {
      number: 3,
      title: 'Macerazione',
      description: '12 settimane di riposo. Le molecole si "sposano", creando accordi che non esistevano nella formula fresca. Come invecchiare il vino — il tempo migliora il prodotto.',
      time: '12 settimane',
    },
    {
      number: 4,
      title: 'Imbottigliamento',
      description: 'Ogni bottiglia riempita a mano. Atomizzatore applicato con crimper professionale. Etichetta posizionata con precisione millimetrica. Artigianalità pura.',
      time: '1-2 giorni',
    },
    {
      number: 5,
      title: 'Quality Assurance',
      description: 'Zoe personalmente annusa e approva ogni lotto. Se non è perfetto, non esce. Zero compromessi. Solo eccellenza.',
      time: '1 giorno',
    },
  ];

  return (
    <div className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Il Brand', url: '/il-brand/processo' },
          { name: 'Processo', url: '/il-brand/processo' },
        ]}
      />

      <ProcessHero />

      {/* Steps Detail */}
      {steps.map((step, index) => (
        <Section
          key={step.number}
          id={`step-${step.number}`}
          bg={index % 2 === 0 ? 'cream' : 'white'}
          spacing="default"
        >
          <Container size="lg">
            <div className="grid md:grid-cols-[200px_1fr] gap-12 items-start">
              {/* Step Number (large) */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-32 h-32 border-4 border-gold-500 rounded-full">
                  <span className="font-cinzel text-6xl text-gold-600">{step.number}</span>
                </div>
                <div className="mt-4 font-inter text-sm text-stone-500 uppercase tracking-wide">
                  {step.time}
                </div>
              </div>

              {/* Step Content */}
              <div className="space-y-4">
                <Heading level={3} size="h2" color="black">
                  {step.title}
                </Heading>

                <Body size="lg" variant="narrative" className="text-stone-700">
                  {step.description}
                </Body>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      {/* Timeline Summary */}
      <Section bg="midnight" spacing="default">
        <Container size="md">
          <div className="text-center space-y-8">
            <Heading level={2} size="h2" color="gold">
              Tempo Totale: 16+ Settimane
            </Heading>
            <Body size="lg" className="text-white/80 max-w-2xl mx-auto">
              Dalla selezione degli ingredienti alla bottiglia finale, ogni fragranza OZ Extrait
              richiede oltre 4 mesi di lavoro. Non c'è fretta nel lusso vero.
            </Body>
            <a
              href="/fragranze"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-midnight font-inter text-sm font-semibold uppercase tracking-wide rounded-sm shadow-gold-medium hover:bg-gold-400 transition-all duration-300"
            >
              Vedi il Risultato
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
