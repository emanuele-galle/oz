import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | OZ Extrait",
  description: "Informativa sui cookie utilizzati dal sito OZ Extrait.",
};

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-cream-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-cinzel text-4xl md:text-5xl text-stone-900 mb-4">
          Cookie Policy
        </h1>
        <p className="font-inter text-sm text-stone-600 mb-12">
          Ultimo aggiornamento: Febbraio 2026
        </p>

        <div className="prose prose-stone max-w-none space-y-8 font-inter text-stone-700 leading-relaxed">
          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">1. Cosa Sono i Cookie</h2>
            <p>
              I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando
              visiti un sito web. Servono a migliorare l&apos;esperienza di navigazione e a garantire
              il corretto funzionamento del sito.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">2. Cookie Tecnici</h2>
            <p className="mb-4">
              Essenziali per il funzionamento del sito. Non richiedono il tuo consenso.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-2 pr-4 text-stone-900">Nome</th>
                    <th className="text-left py-2 pr-4 text-stone-900">Durata</th>
                    <th className="text-left py-2 text-stone-900">Scopo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 pr-4 font-mono text-sm">__session</td>
                    <td className="py-2 pr-4">Sessione</td>
                    <td className="py-2">Autenticazione utente</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 pr-4 font-mono text-sm">__stripe_mid</td>
                    <td className="py-2 pr-4">1 anno</td>
                    <td className="py-2">Prevenzione frodi pagamenti</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 pr-4 font-mono text-sm">cart</td>
                    <td className="py-2 pr-4">30 giorni</td>
                    <td className="py-2">Persistenza carrello acquisti</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">3. Cookie Analitici</h2>
            <p>
              Utilizziamo cookie analitici anonimi per comprendere come i visitatori interagiscono
              con il sito. Questi dati sono aggregati e non permettono l&apos;identificazione personale.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">4. Come Gestire i Cookie</h2>
            <p>
              Puoi gestire le preferenze sui cookie attraverso le impostazioni del tuo browser.
              La disabilitazione dei cookie tecnici potrebbe compromettere alcune funzionalita del sito,
              come il sistema di pagamento e il carrello.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">5. Aggiornamenti</h2>
            <p>
              Questa Cookie Policy puo essere aggiornata periodicamente. Ti consigliamo di
              consultare regolarmente questa pagina per essere informato su eventuali modifiche.
            </p>
          </section>

          <section className="border-t border-stone-200 pt-8">
            <h2 className="font-cinzel text-2xl text-stone-900 mb-4">Sviluppo e Gestione Tecnica del Sito</h2>
            <p>Questo sito web e stato realizzato e viene gestito da:</p>
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
