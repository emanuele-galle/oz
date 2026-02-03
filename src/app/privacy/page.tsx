import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | OZ Extrait',
  description: 'Informativa sulla privacy di OZ Extrait ai sensi del GDPR e del Regolamento UE 2016/679.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-cinzel text-4xl md:text-5xl text-stone-900 mb-4">
          Privacy Policy
        </h1>
        <p className="font-inter text-sm text-stone-500 mb-12">
          Ultimo aggiornamento: Febbraio 2026
        </p>

        <div className="prose prose-stone max-w-none space-y-8 font-inter text-stone-700 leading-relaxed">
          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">1. Titolare del Trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati personali è OZ Extrait, con sede a Verona, Italia.
              Per qualsiasi informazione relativa al trattamento dei dati personali è possibile
              contattarci all'indirizzo email: <a href="mailto:privacy@oz.fodivps2.cloud" className="text-gold-600 hover:underline">privacy@oz.fodivps2.cloud</a>.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">2. Dati Raccolti</h2>
            <p>Raccogliamo i seguenti dati personali:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate, orario di accesso.</li>
              <li><strong>Dati forniti volontariamente:</strong> nome, email, indirizzo di spedizione, numero di telefono forniti durante il checkout o l'iscrizione alla newsletter.</li>
              <li><strong>Dati di pagamento:</strong> elaborati direttamente da Stripe Inc. Non conserviamo numeri di carta di credito sui nostri server.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">3. Finalità del Trattamento</h2>
            <p>I dati personali sono trattati per le seguenti finalità:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestione ed evasione degli ordini di acquisto.</li>
              <li>Invio di comunicazioni relative agli ordini (conferma, spedizione, consegna).</li>
              <li>Invio di newsletter e comunicazioni commerciali (previo consenso esplicito).</li>
              <li>Miglioramento del servizio e analisi aggregate di utilizzo del sito.</li>
              <li>Adempimento di obblighi legali e fiscali.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">4. Base Giuridica</h2>
            <p>
              Il trattamento dei dati si basa su: esecuzione del contratto di vendita,
              consenso dell'interessato (per newsletter), obbligo legale, legittimo interesse
              del titolare (per sicurezza e miglioramento del servizio).
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">5. Diritti dell'Interessato</h2>
            <p>Ai sensi del GDPR (Regolamento UE 2016/679), hai diritto a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accedere ai tuoi dati personali.</li>
              <li>Rettificare dati inesatti o incompleti.</li>
              <li>Cancellare i tuoi dati ("diritto all'oblio").</li>
              <li>Limitare il trattamento dei dati.</li>
              <li>Opporti al trattamento.</li>
              <li>Richiedere la portabilità dei dati.</li>
              <li>Revocare il consenso in qualsiasi momento.</li>
            </ul>
            <p className="mt-4">
              Per esercitare i tuoi diritti, contattaci a{' '}
              <a href="mailto:privacy@oz.fodivps2.cloud" className="text-gold-600 hover:underline">privacy@oz.fodivps2.cloud</a>.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">6. Cookie</h2>
            <p>
              Il sito utilizza cookie tecnici necessari al funzionamento e cookie analitici anonimi.
              Non utilizziamo cookie di profilazione senza il tuo consenso esplicito.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">7. Conservazione dei Dati</h2>
            <p>
              I dati personali sono conservati per il tempo necessario alle finalità per cui sono stati
              raccolti, e comunque non oltre i termini di legge (10 anni per i dati fiscali).
              I dati della newsletter sono conservati fino alla revoca del consenso.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">8. Sicurezza</h2>
            <p>
              Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i dati
              personali da accesso non autorizzato, perdita o distruzione. Le comunicazioni sono
              protette da crittografia SSL/TLS.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
