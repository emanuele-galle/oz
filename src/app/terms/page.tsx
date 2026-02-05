import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termini e Condizioni | OZ Extrait',
  description: 'Termini e condizioni di vendita di OZ Extrait. Condizioni generali di vendita, diritto di recesso, garanzie.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-cinzel text-4xl md:text-5xl text-stone-900 mb-4">
          Termini e Condizioni
        </h1>
        <p className="font-inter text-sm text-stone-600 mb-12">
          Ultimo aggiornamento: Febbraio 2026
        </p>

        <div className="prose prose-stone max-w-none space-y-8 font-inter text-stone-700 leading-relaxed">
          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">1. Informazioni Generali</h2>
            <p>
              Le presenti condizioni generali di vendita regolano l'acquisto di prodotti attraverso
              il sito web oz.fodivps2.cloud, gestito da OZ Extrait con sede a Verona, Italia.
              Effettuando un ordine, l'utente accetta integralmente le presenti condizioni.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">2. Prodotti</h2>
            <p>
              I prodotti venduti sono profumi Extrait de Parfum artigianali. Le immagini e le
              descrizioni dei prodotti sono il più possibile fedeli alla realtà. Piccole variazioni
              nel colore o nel packaging possono verificarsi tra un lotto e l'altro a causa della
              natura artigianale della produzione.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">3. Prezzi e Pagamenti</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Tutti i prezzi sono espressi in Euro (EUR) e includono l'IVA.</li>
              <li>I pagamenti sono gestiti tramite Stripe, piattaforma di pagamento sicura certificata PCI-DSS.</li>
              <li>Metodi di pagamento accettati: carte di credito/debito (Visa, Mastercard, American Express).</li>
              <li>OZ Extrait si riserva il diritto di modificare i prezzi in qualsiasi momento, senza preavviso.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">4. Spedizioni</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Spedizione gratuita per ordini superiori a €200.</li>
              <li>Tempi di consegna: 3-5 giorni lavorativi in Italia.</li>
              <li>Spedizioni internazionali disponibili su richiesta.</li>
              <li>Tutti i pacchi sono assicurati e tracciabili.</li>
              <li>Il packaging è curato nei minimi dettagli per garantire un'esperienza luxury.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">5. Diritto di Recesso</h2>
            <p>
              Ai sensi del D.Lgs. 206/2005 (Codice del Consumo), hai diritto di recedere dal contratto
              entro 14 giorni dalla ricezione del prodotto, senza dover fornire alcuna motivazione.
            </p>
            <p className="mt-4">
              <strong>Condizioni per il reso:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Il prodotto deve essere integro, non utilizzato e nella confezione originale.</li>
              <li>I profumi sigillati non possono essere resi se il sigillo è stato rimosso, per motivi igienici (art. 59, comma 1, lett. e, Codice del Consumo).</li>
              <li>I tester (formati da 10ml) non sono restituibili una volta aperti.</li>
            </ul>
            <p className="mt-4">
              Per esercitare il diritto di recesso, contattaci a{' '}
              <a href="mailto:ordini@oz.fodivps2.cloud" className="text-gold-600 hover:underline">ordini@oz.fodivps2.cloud</a>.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">6. Garanzia</h2>
            <p>
              Tutti i prodotti sono coperti dalla garanzia legale di conformità di 2 anni ai sensi
              del Codice del Consumo. In caso di prodotto difettoso o non conforme, contattaci entro
              2 mesi dalla scoperta del difetto.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">7. Proprietà Intellettuale</h2>
            <p>
              Tutti i contenuti del sito (testi, immagini, loghi, grafica, design) sono di proprietà
              esclusiva di OZ Extrait e sono protetti dalle leggi sul diritto d'autore. È vietata
              qualsiasi riproduzione senza autorizzazione scritta.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">8. Legge Applicabile</h2>
            <p>
              Le presenti condizioni sono regolate dalla legge italiana. Per qualsiasi controversia
              è competente il Foro di Verona, salvo il foro del consumatore ai sensi del Codice del Consumo.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">9. Contatti</h2>
            <p>
              Per qualsiasi domanda o richiesta relativa a ordini, prodotti o servizi:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: <a href="mailto:ordini@oz.fodivps2.cloud" className="text-gold-600 hover:underline">ordini@oz.fodivps2.cloud</a></li>
              <li>Instagram: <a href="https://www.instagram.com/zoe_cristofoli" target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:underline">@zoe_cristofoli</a></li>
            </ul>
          </section>
          <section className="border-t border-stone-200 pt-8">
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">Sviluppo e Gestione Tecnica del Sito</h2>
            <p>Questo sito web è stato realizzato e viene gestito da:</p>
            <p className="mt-2">
              <strong className="text-stone-900">FODI S.r.l. – Startup Innovativa</strong><br />
              Via Santicelli 18/A, 88068 Soverato (CZ)<br />
              P.IVA: 03856160793<br />
              Email: <a href="mailto:info@fodisrl.it" className="text-gold-600 hover:underline">info@fodisrl.it</a><br />
              Tel: +39 0963 576433<br />
              Web: <a href="https://www.fodisrl.it" target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:underline">www.fodisrl.it</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
