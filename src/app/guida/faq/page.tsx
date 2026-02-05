import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/JsonLd';
import { FAQAccordion } from '@/components/sections/FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQ — Domande Frequenti',
  description: 'Risposte a tutte le domande su OZ Extrait: spedizioni, ingredienti, fragranze, pagamenti, conservazione del profumo e molto altro.',
};

const faqCategories = [
  {
    title: 'Ordini & Spedizioni',
    icon: '📦',
    items: [
      {
        q: 'Come posso ordinare?',
        a: 'Puoi ordinare direttamente dal nostro sito aggiungendo prodotti al carrello e procedendo al checkout. Accettiamo carte di credito/debito tramite Stripe (pagamento sicuro). Oppure contattaci via Instagram per ordini personalizzati.',
      },
      {
        q: 'Quanto tempo ci vuole per ricevere il mio ordine?',
        a: 'Italia: 3-5 giorni lavorativi (standard) o 1-2 giorni (express). Europa: 5-7 giorni lavorativi. Resto del mondo: 7-15 giorni lavorativi. Tutti gli ordini sono tracciabili.',
      },
      {
        q: 'Le spedizioni sono gratuite?',
        a: 'Spedizione gratuita in Italia per ordini sopra €100. Per ordini sotto €100: €6.90 spedizione standard. Europa e Internazionale: calcolato al checkout.',
      },
      {
        q: 'Posso restituire se non mi piace?',
        a: 'Bottiglia sigillata (non aperta): rimborso completo entro 30 giorni. Bottiglia aperta: no rimborso (prodotti igienici personali). Per questo consigliamo di iniziare con i tester 10ml.',
      },
      {
        q: 'Spedite in modo discreto?',
        a: 'Sì. Tutti i pacchi sono neutri, senza branding esterno visibile. Per regali, possiamo aggiungere un biglietto personalizzato (specificalo nelle note ordine).',
      },
    ],
  },
  {
    title: 'Prodotti & Fragranze',
    icon: '💧',
    items: [
      {
        q: 'Qual è la differenza tra le tre fragranze?',
        a: 'Cristallo: fresco, luminoso, elegante — perfetto per primavera/estate. Scintilla: magnetico, intenso, audace — ideale per autunno/inverno. Potion d\'Amour: dolce, seducente, avvolgente — perfetto tutto l\'anno.',
      },
      {
        q: 'I profumi sono unisex?',
        a: 'Cristallo è completamente unisex. Scintilla è unisex con leaning femminile. Potion d\'Amour è prevalentemente femminile ma molti uomini lo adorano. La nostra filosofia: il profumo non ha genere.',
      },
      {
        q: 'Perché Extrait de Parfum costa di più?',
        a: 'Contiene 40-42% di essenze pure (vs 15-20% in Eau de Parfum). Questo significa 2.5x più ingredienti pregiati, 12 settimane di macerazione e expertise di maestri parfumeur. Ma dura 2-3 volte di più sulla pelle, quindi il costo per utilizzo è minore.',
      },
      {
        q: 'Quanto dura una boccetta da 50ml?',
        a: 'Con Extrait serve molto meno prodotto. Una boccetta da 50ml contiene circa 500 spray. Con 1-2 spray al giorno dura 8-16 mesi. Con uso 3 volte a settimana può durare 2+ anni.',
      },
      {
        q: 'I profumi scadono?',
        a: 'No, ma si ossidano. Ben conservato (luogo fresco, buio, asciutto): Cristallo dura 3-5 anni, Scintilla e Potion d\'Amour 7-10 anni. Dopo 5+ anni il profumo cambia ma non diventa "cattivo".',
      },
      {
        q: 'Posso mescolare due fragranze OZ?',
        a: 'Non consigliato. Gli Extrait sono già complessi e perfettamente bilanciati. Mescolarli può creare troppa complessità. Meglio alternare le fragranze in giorni diversi.',
      },
    ],
  },
  {
    title: 'Ingredienti & Formulazione',
    icon: '🧪',
    items: [
      {
        q: 'Usate ingredienti naturali o sintetici?',
        a: 'Entrambi, strategicamente. Naturali quando è superiore (bergamotto, rosa, vaniglia). Sintetici quando è etico (muschio bianco cruelty-free, oud senza deforestazione, ambra senza caccia). Qualità + etica.',
      },
      {
        q: 'Gli ingredienti sono cruelty-free?',
        a: 'Sì, 100%. Non usiamo muschio animale, castoreum, civet o ambra grigia animale. Tutte queste note sono ricostruite sinteticamente o sostituite con alternative vegetali.',
      },
      {
        q: 'Fate test su animali?',
        a: 'Assolutamente no. Né noi, né i nostri fornitori, né i nostri laboratori partner. Siamo conformi al Regolamento UE 1223/2009.',
      },
      {
        q: 'Ci sono allergeni?',
        a: 'Come in tutti i profumi, sono presenti allergeni dichiarati per legge UE: Limonene, Linalool, Citral, Geraniol, Eugenol, Benzyl benzoate, Coumarin. Se hai allergie note, leggi la lista completa sull\'etichetta.',
      },
    ],
  },
  {
    title: 'Tester & Campioni',
    icon: '🎁',
    items: [
      {
        q: 'Posso ricevere campioni gratuiti?',
        a: 'Offriamo tester 10ml a prezzo accessibile. Con Extrait, 10ml durano 1-2 mesi di uso quotidiano — tempo sufficiente per capire se è il tuo profumo. Preferiamo tester full-size piuttosto che micro-campioni.',
      },
      {
        q: 'Posso comprare solo tester senza full size?',
        a: 'Sì! I tester 10ml sono prodotti completi con stessa formulazione, concentrazione e bottiglia in vetro del 50ml. Molti clienti comprano solo tester e ruotano le 3 fragranze.',
      },
    ],
  },
  {
    title: 'Pagamenti & Sicurezza',
    icon: '💳',
    items: [
      {
        q: 'Quali metodi di pagamento accettate?',
        a: 'Carte di credito/debito (Visa, Mastercard, AmEx), Apple Pay, Google Pay — tutti tramite Stripe. Per ordini bulk: bonifico bancario. Per clienti internazionali: PayPal su richiesta.',
      },
      {
        q: 'I miei dati di pagamento sono sicuri?',
        a: 'Sì, al 100%. Non conserviamo mai i dati di carta. Il pagamento è processato da Stripe, uno dei processori più sicuri al mondo. Noi vediamo solo la conferma e le ultime 4 cifre.',
      },
    ],
  },
  {
    title: 'Utilizzo & Conservazione',
    icon: '🧴',
    items: [
      {
        q: 'Quanto profumo devo mettere?',
        a: 'Con Extrait, meno di quanto pensi. Uso quotidiano: 1-2 spray. Eventi speciali: 2-3 spray. Mai più di 4 spray. Applicare Extrait come Eau de Parfum (4-6 spray) è un errore comune.',
      },
      {
        q: 'Dove devo conservare il profumo?',
        a: 'Ideale: cassetto della camera (fresco, buio, asciutto, 15-20°C). Mai in bagno (umidità), vicino a finestra (luce) o in frigorifero (condensa). Ben conservato, un Extrait dura 5-10 anni.',
      },
      {
        q: 'Posso portare il profumo in aereo?',
        a: 'Sì. Bagaglio a mano: bottiglie fino a 100ml in sacchetto trasparente (il nostro 50ml è OK). Bagaglio in stiva: nessun limite. Consiglio: porta il tester 10ml per ritocchi in viaggio.',
      },
      {
        q: 'Il profumo si rovina con il caldo o il freddo?',
        a: 'Caldo intenso (+30°C) accelera l\'ossidazione. Freddo intenso può causare cristallizzazione reversibile. Soluzione: conserva a temperatura ambiente e in viaggio avvolgi in vestiti per isolamento.',
      },
    ],
  },
  {
    title: 'Brand & Filosofia',
    icon: '🎨',
    items: [
      {
        q: 'Chi è Zoe Cristofoli?',
        a: 'Modella, influencer e parfumeur italiana. Nata a Verona, nota per i suoi tatuaggi iconici e il suo stile distintivo. OZ Extrait è il suo progetto più personale — ogni fragranza è un pezzo della sua anima.',
      },
      {
        q: 'Perché il nome "OZ"?',
        a: 'OZ ha significati multipli: Zoe backwards (elemento di mistero), Oz come oncia (unità di misura in profumeria), il Mago di Oz (magia e trasformazione), e la brevità di 2 lettere (memorabile e internazionale).',
      },
      {
        q: 'OZ Extrait è un brand italiano?',
        a: 'Sì, 100% italiano. Fondato a Verona, formulato in Italia con laboratori partner a Firenze e Milano, ingredienti italiani quando possibile (bergamotto Calabria, iris Firenze), confezionato e spedito dall\'Italia.',
      },
    ],
  },
  {
    title: 'Supporto',
    icon: '🛠️',
    items: [
      {
        q: 'Posso modificare o cancellare un ordine?',
        a: 'Sì, ma solo se non ancora spedito. Contattaci subito via email (info@oz-extrait.com) o Instagram DM con numero ordine. Ordini prima delle 14:00 vengono spediti lo stesso giorno.',
      },
      {
        q: 'Il mio pacco è in ritardo, cosa faccio?',
        a: 'Controlla il tracking. Se non si aggiorna da 3+ giorni, contattaci con il numero ordine. Investigheremo con il corriere. Se il pacco è perso: rimborso completo o rispedizione gratuita.',
      },
      {
        q: 'Offrite consulenza personalizzata?',
        a: 'Sì, gratuitamente. Usa il nostro quiz interattivo sul sito, oppure scrivici su Instagram per una consulenza 1-to-1. Per ordini €200+ offriamo anche video call con il team.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Guida', url: '/guida/scegliere-fragranza' },
          { name: 'FAQ', url: '/guida/faq' },
        ]}
      />

      {/* Hero */}
      <div className="bg-stone-950 pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-inter text-[11px] uppercase tracking-[0.3em] text-gold-500/70 mb-4">
            Assistenza
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl text-white mb-4">
            Domande Frequenti
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/40" />
            <div className="w-1.5 h-1.5 bg-gold-500/40 rotate-45" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/40" />
          </div>
          <p className="font-playfair text-lg text-white/50 italic max-w-xl mx-auto">
            Tutto quello che hai sempre voluto sapere su OZ Extrait
          </p>
        </div>
      </div>

      {/* Gradient transition */}
      <div className="h-16 bg-gradient-to-b from-stone-950 to-[#FBF8F3]" />

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <FAQAccordion categories={faqCategories} />

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-white border border-stone-200 p-8 md:p-12">
          <p className="font-inter text-xs uppercase tracking-[0.3em] text-gold-600/70 mb-3">
            Non trovi la risposta?
          </p>
          <h2 className="font-cinzel text-2xl md:text-3xl text-stone-900 mb-4">
            Contattaci
          </h2>
          <p className="font-inter text-sm text-stone-500 max-w-md mx-auto mb-6">
            Rispondiamo a tutte le domande via email o Instagram. Il nostro team è a tua disposizione.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:info@oz-extrait.com"
              className="px-8 py-3 bg-gold-500 text-stone-950 font-inter text-sm font-semibold uppercase tracking-[0.15em] hover:bg-gold-400 transition-all duration-500"
            >
              Scrivici
            </a>
            <a
              href="https://www.instagram.com/zoe_cristofoli/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-stone-300 text-stone-600 font-inter text-sm font-medium uppercase tracking-[0.15em] hover:border-gold-500 hover:text-gold-600 transition-all duration-300"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqCategories.flatMap((cat) =>
              cat.items.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              }))
            ),
          }),
        }}
      />
    </div>
  );
}
