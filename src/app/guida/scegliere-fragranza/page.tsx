import { Metadata } from 'next';
import { GuideHero } from '@/components/sections/heroes';
import { Section, Container } from '@/components/layout';
import { Body } from '@/components/typography';
import { BreadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Come Scegliere la Tua Fragranza Perfetta | Guida OZ Extrait',
  description: 'Guida completa alla scelta del profumo ideale. Famiglie olfattive, test sulla pelle, consigli stagionali. Da OZ Extrait.',
};

export default function ScegliereFragranzaPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Guida', url: '/guida/scegliere-fragranza' },
          { name: 'Come Scegliere', url: '/guida/scegliere-fragranza' },
        ]}
      />

      <GuideHero
        category="Guida"
        title="Come Scegliere la Tua Fragranza Perfetta"
        description="Guida completa alla scoperta del profumo che racconta la tua storia"
        meta={{
          readTime: '8 min',
          lastUpdated: 'Gen 2026',
          author: 'OZ Extrait Team',
        }}
      />

      {/* Article Content */}
      <Section bg="white" spacing="default">
        <Container size="md">
          <div className="prose prose-lg max-w-none space-y-8">
            {/* Intro */}
            <Body size="lg" variant="narrative" className="text-stone-700 leading-relaxed">
              Scegliere un profumo è un atto intimo. Non è come comprare un paio di scarpe o una borsa —
              non puoi semplicemente guardarlo e sapere se ti sta bene. Un profumo diventa parte di te.
              Si mescola con la tua chimica corporea, evolve sulla tua pelle, crea ricordi nelle persone che incontri.
            </Body>

            {/* Part 1 */}
            <h2 className="font-cinzel text-3xl text-ink-950 mt-12 mb-6">
              Parte 1: Conosci Te Stesso
            </h2>

            <Body size="lg" variant="narrative" className="text-stone-700">
              Prima di annusare anche solo un profumo, chiediti: chi sei veramente?
              Non chi vuoi sembrare. Ma chi sei.
            </Body>

            <div className="bg-gold-50 border-l-4 border-gold-500 p-6 my-8">
              <h3 className="font-cinzel text-xl text-gold-700 mb-4">
                Esercizio Pratico
              </h3>
              <Body size="md" className="text-stone-700">
                Chiudi gli occhi e immagina la versione migliore di te stesso/a.
                Come ti senti in quel momento? Quella sensazione è il tuo nord olfattivo.
              </Body>
            </div>

            {/* Table */}
            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gold-500">
                    <th className="font-cinzel text-left p-4 text-ink-950">Sensazione Desiderata</th>
                    <th className="font-cinzel text-left p-4 text-ink-950">Famiglia Olfattiva</th>
                    <th className="font-cinzel text-left p-4 text-ink-950">Esempio OZ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone-200">
                    <td className="p-4 font-inter text-stone-700">Fresco, pulito, luminoso</td>
                    <td className="p-4 font-inter text-stone-600">Agrumato, Acquatico</td>
                    <td className="p-4 font-semibold text-gold-600">CRISTALLO</td>
                  </tr>
                  <tr className="border-b border-stone-200">
                    <td className="p-4 font-inter text-stone-700">Sicuro, potente, magnetico</td>
                    <td className="p-4 font-inter text-stone-600">Orientale Speziato</td>
                    <td className="p-4 font-semibold text-gold-600">SCINTILLA</td>
                  </tr>
                  <tr className="border-b border-stone-200">
                    <td className="p-4 font-inter text-stone-700">Confortato, amato, coccolato</td>
                    <td className="p-4 font-inter text-stone-600">Gourmand Orientale</td>
                    <td className="p-4 font-semibold text-gold-600">POTION D'AMOUR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CTA */}
            <div className="bg-midnight p-8 rounded-lg text-center my-12">
              <h3 className="font-cinzel text-2xl text-gold-500 mb-4">
                Pronto a Trovare la Tua Fragranza?
              </h3>
              <Body size="md" className="text-white/80 mb-6">
                Esplora le tre fragranze OZ Extrait e trova quella che risuona con te.
              </Body>
              <a
                href="/fragranze"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-midnight font-inter text-sm font-semibold uppercase tracking-wide rounded-sm hover:bg-gold-400 transition-all duration-300"
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
