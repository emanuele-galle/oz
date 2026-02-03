import { Metadata } from 'next';
import Image from 'next/image';
import { GuideHero } from '@/components/sections/heroes';
import { Section, Container } from '@/components/layout';
import { Heading, Body } from '@/components/typography';
import { BreadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Come Scegliere la Tua Fragranza Perfetta | Guida OZ Extrait',
  description: 'Guida completa alla scelta del profumo ideale. Famiglie olfattive, test sulla pelle, consigli stagionali. Da OZ Extrait.',
};

const fragrances = [
  {
    name: 'Cristallo',
    feeling: 'Fresco, pulito, luminoso',
    family: 'Agrumato, Acquatico',
    season: 'Primavera/Estate',
    occasion: 'Quotidiano, ufficio, brunch',
    image: '/uploads/images/Cristallo.jpeg',
    slug: '/products/cristallo',
    notes: 'Bergamotto, Cedro, Muschio bianco',
  },
  {
    name: 'Scintilla',
    feeling: 'Sicuro, potente, magnetico',
    family: 'Orientale Speziato',
    season: 'Autunno/Inverno',
    occasion: 'Serate, eventi, appuntamenti',
    image: '/uploads/images/Scintilla.jpeg',
    slug: '/products/scintilla',
    notes: 'Pepe Rosa, Iris, Patchouli',
  },
  {
    name: "Potion d'Amour",
    feeling: 'Confortato, amato, coccolato',
    family: 'Gourmand Orientale',
    season: 'Tutto l\'anno',
    occasion: 'Romantico, intimo, speciale',
    image: '/uploads/images/Potion-damour.jpeg',
    slug: '/products/potion-damour',
    notes: 'Vaniglia, Rosa, Ambra',
  },
];

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

      {/* Intro */}
      <Section bg="white" spacing="default">
        <Container size="md">
          <div className="space-y-8">
            <Body size="lg" variant="narrative" className="text-stone-700 leading-relaxed">
              Scegliere un profumo è un atto intimo. Non è come comprare un paio di scarpe o una borsa —
              non puoi semplicemente guardarlo e sapere se ti sta bene. Un profumo diventa parte di te.
              Si mescola con la tua chimica corporea, evolve sulla tua pelle, crea ricordi nelle persone che incontri.
            </Body>

            <Body size="lg" variant="narrative" className="text-stone-700 leading-relaxed">
              Con le fragranze OZ Extrait al 40% di concentrazione, ogni scelta è un investimento.
              Per questo abbiamo creato questa guida: per aiutarti a trovare la fragranza che racconta
              la <em>tua</em> storia.
            </Body>
          </div>
        </Container>
      </Section>

      {/* Part 1: Conosci Te Stesso */}
      <Section bg="cream" spacing="default">
        <Container size="xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div>
                <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70">
                  Parte 1
                </span>
              </div>

              <Heading level={2} size="h2" color="black">
                Conosci Te Stesso
              </Heading>

              <Body size="lg" variant="narrative" className="text-stone-700">
                Prima di annusare anche solo un profumo, chiediti: chi sei veramente?
                Non chi vuoi sembrare. Ma chi sei. La fragranza giusta amplifica la tua
                essenza — non la maschera.
              </Body>

              <div className="bg-gold-50 border-l-4 border-gold-500 p-6">
                <h3 className="font-cinzel text-xl text-gold-700 mb-3">
                  Esercizio Pratico
                </h3>
                <Body size="md" className="text-stone-700">
                  Chiudi gli occhi e immagina la versione migliore di te stesso/a.
                  Come ti senti in quel momento? Quella sensazione è il tuo nord olfattivo.
                </Body>
              </div>
            </div>

            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/uploads/images/Box vetrina.jpeg"
                alt="OZ Extrait — Collezione completa"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Part 2: Le Tre Fragranze — Visual Cards */}
      <Section bg="white" spacing="default">
        <Container size="xl">
          <div className="text-center mb-16">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70 block mb-4">
              Parte 2
            </span>
            <Heading level={2} size="h2" color="black" className="mb-6">
              Trova la Tua Fragranza
            </Heading>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/40" />
              <div className="w-1.5 h-1.5 bg-gold-500/40 rotate-45" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/40" />
            </div>
            <Body size="lg" className="text-stone-500 max-w-2xl mx-auto">
              Ogni fragranza OZ Extrait è stata creata per un&apos;emozione specifica.
              Quale risuona con te?
            </Body>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {fragrances.map((frag) => (
              <a
                key={frag.name}
                href={frag.slug}
                className="group bg-cream-50 border border-stone-200/60 overflow-hidden hover:border-gold-500/30 hover:shadow-lg transition-all duration-500"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={frag.image}
                    alt={`${frag.name} — ${frag.feeling}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-cinzel text-2xl text-white mb-1">{frag.name}</p>
                    <p className="font-inter text-xs text-white/70 uppercase tracking-wider">{frag.family}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="font-inter text-xs uppercase tracking-wider text-gold-600/70 mb-1">Come ti fa sentire</div>
                    <p className="font-playfair text-lg text-stone-800 italic">{frag.feeling}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-inter text-xs uppercase tracking-wider text-stone-400 mb-1">Stagione</div>
                      <p className="font-inter text-stone-600">{frag.season}</p>
                    </div>
                    <div>
                      <div className="font-inter text-xs uppercase tracking-wider text-stone-400 mb-1">Occasione</div>
                      <p className="font-inter text-stone-600">{frag.occasion}</p>
                    </div>
                  </div>

                  <div>
                    <div className="font-inter text-xs uppercase tracking-wider text-stone-400 mb-1">Note principali</div>
                    <p className="font-inter text-sm text-stone-600">{frag.notes}</p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-gold-600 font-inter text-sm font-medium uppercase tracking-wide group-hover:gap-3 transition-all duration-300">
                    <span>Scopri</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Part 3: Come Testare */}
      <Section bg="cream" spacing="default">
        <Container size="xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] overflow-hidden order-2 md:order-1">
              <Image
                src="/uploads/images/set-cristallo-scintilla-2-tester.jpeg"
                alt="OZ Extrait — Tester e set"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-8 order-1 md:order-2">
              <div>
                <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70">
                  Parte 3
                </span>
              </div>

              <Heading level={2} size="h2" color="black">
                Come Testare un Profumo
              </Heading>

              <div className="space-y-6">
                {[
                  {
                    step: '01',
                    title: 'Spruzza sul polso',
                    text: 'Mai strofinare — rompe le molecole. Spruzza e lascia asciugare naturalmente.',
                  },
                  {
                    step: '02',
                    title: 'Aspetta 30 minuti',
                    text: 'Le note di testa evaporano. Il vero carattere emerge con le note di cuore.',
                  },
                  {
                    step: '03',
                    title: 'Vivi la giornata',
                    text: 'Un extrait al 40% evolve per ore. Annusalo dopo 2, 4, 8 ore — ti sorprenderà.',
                  },
                  {
                    step: '04',
                    title: 'Chiedi un parere',
                    text: 'Il profumo si mescola con la tua chimica. Chiedi a chi ti sta vicino come lo percepisce.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 border border-gold-500/30 flex items-center justify-center">
                      <span className="font-cinzel text-sm text-gold-600">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-cinzel text-lg text-stone-800 mb-1">{item.title}</h4>
                      <p className="font-inter text-sm text-stone-600 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Part 4: Tabella comparativa */}
      <Section bg="white" spacing="default">
        <Container size="lg">
          <div className="text-center mb-12">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70 block mb-4">
              Parte 4
            </span>
            <Heading level={2} size="h2" color="black" className="mb-6">
              Confronto Rapido
            </Heading>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <p className="text-center text-xs text-stone-400 mb-3 md:hidden">Scorri per vedere tutte le fragranze &rarr;</p>
            <table className="w-full border-collapse min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-gold-500/40">
                  <th className="font-cinzel text-left p-2 md:p-4 text-stone-900 text-sm md:text-base"></th>
                  <th className="font-cinzel text-center p-2 md:p-4 text-gold-600 text-sm md:text-base">Cristallo</th>
                  <th className="font-cinzel text-center p-2 md:p-4 text-gold-600 text-sm md:text-base">Scintilla</th>
                  <th className="font-cinzel text-center p-2 md:p-4 text-gold-600 text-sm md:text-base whitespace-nowrap">Potion d&apos;Amour</th>
                </tr>
              </thead>
              <tbody className="font-inter text-xs md:text-sm">
                {[
                  { label: 'Famiglia', values: ['Agrumato', 'Orientale Speziato', 'Gourmand Orientale'] },
                  { label: 'Concentrazione', values: ['40%', '40%', '42%'] },
                  { label: 'Durata', values: ['12+ ore', '14+ ore', '16+ ore'] },
                  { label: 'Stagione ideale', values: ['Primavera/Estate', 'Autunno/Inverno', 'Tutto l\'anno'] },
                  { label: 'Momento', values: ['Giorno', 'Sera', 'Romantico'] },
                  { label: 'Sillage', values: ['Moderato', 'Intenso', 'Avvolgente'] },
                  { label: 'Prezzo', values: ['€150', '€155', '€160'] },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-stone-200/60">
                    <td className="p-2 md:p-4 font-medium text-stone-700">{row.label}</td>
                    {row.values.map((val, i) => (
                      <td key={i} className="p-2 md:p-4 text-center text-stone-600">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Tester CTA */}
      <Section bg="cream" spacing="default">
        <Container size="md">
          <div className="text-center space-y-6">
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70 block">
              Non riesci a scegliere?
            </span>
            <Heading level={2} size="h2" color="black">
              Prova i Tester da 10ml
            </Heading>
            <Body size="lg" className="text-stone-500 max-w-2xl mx-auto">
              Ogni fragranza è disponibile in formato tester da 10ml.
              Provale sulla tua pelle prima di scegliere il formato completo da 50ml.
            </Body>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="/fragranze"
                className="px-10 py-4 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500"
              >
                Scopri le Fragranze
              </a>
              <a
                href="/il-brand/processo"
                className="px-10 py-4 border border-stone-300 text-stone-600 font-inter text-sm font-medium uppercase tracking-[0.15em] hover:border-gold-500 hover:text-gold-600 transition-all duration-300"
              >
                Il Nostro Processo
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
