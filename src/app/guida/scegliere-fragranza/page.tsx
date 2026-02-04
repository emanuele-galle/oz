import { Metadata } from 'next';
import { FragranceWizard } from '@/components/wizard/FragranceWizard';
import { BreadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Come Scegliere la Tua Fragranza Perfetta | Guida OZ Extrait',
  description: 'Guida interattiva alla scelta del profumo ideale. Quiz personalizzato per trovare la tua fragranza OZ Extrait. Famiglie olfattive, confronto fragranze, consigli stagionali.',
};

export default function ScegliereFragranzaPage() {
  return (
    <div className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Guida', url: '/guida/scegliere-fragranza' },
          { name: 'Scegli la Tua Fragranza', url: '/guida/scegliere-fragranza' },
        ]}
      />

      {/* Interactive Wizard */}
      <FragranceWizard />

      {/* SEO-crawlable content — visible to search engines, sr-only for users */}
      <div className="sr-only" aria-hidden="true">
        <h1>Come Scegliere la Tua Fragranza Perfetta — Guida OZ Extrait</h1>
        <p>
          Scegliere un profumo è un atto intimo. Con le fragranze OZ Extrait al 40% di
          concentrazione, ogni scelta è un investimento. Usa il nostro quiz interattivo per
          trovare la fragranza che racconta la tua storia.
        </p>

        <h2>Le Tre Fragranze OZ Extrait</h2>

        <h3>Cristallo</h3>
        <p>Famiglia: Agrumato, Acquatico. Stagione: Primavera/Estate. Occasione: Quotidiano, ufficio, brunch.
          Note: Bergamotto, Cedro, Muschio bianco. Concentrazione: 40%. Durata: 12+ ore. Prezzo: €150.</p>

        <h3>Scintilla</h3>
        <p>Famiglia: Orientale Speziato. Stagione: Autunno/Inverno. Occasione: Serate, eventi, appuntamenti.
          Note: Pepe Rosa, Iris, Patchouli. Concentrazione: 40%. Durata: 14+ ore. Prezzo: €155.</p>

        <h3>Potion d&apos;Amour</h3>
        <p>Famiglia: Gourmand Orientale. Stagione: Tutto l&apos;anno. Occasione: Romantico, intimo, speciale.
          Note: Vaniglia, Rosa, Ambra. Concentrazione: 42%. Durata: 16+ ore. Prezzo: €160.</p>

        <h2>Come Testare un Profumo</h2>
        <p>1. Spruzza sul polso — mai strofinare. 2. Aspetta 30 minuti per le note di cuore.
          3. Vivi la giornata — un extrait al 40% evolve per ore. 4. Chiedi un parere a chi ti sta vicino.</p>

        <h2>Confronto Fragranze</h2>
        <table>
          <thead>
            <tr><th></th><th>Cristallo</th><th>Scintilla</th><th>Potion d&apos;Amour</th></tr>
          </thead>
          <tbody>
            <tr><td>Famiglia</td><td>Agrumato</td><td>Orientale Speziato</td><td>Gourmand Orientale</td></tr>
            <tr><td>Concentrazione</td><td>40%</td><td>40%</td><td>42%</td></tr>
            <tr><td>Durata</td><td>12+ ore</td><td>14+ ore</td><td>16+ ore</td></tr>
            <tr><td>Stagione</td><td>Primavera/Estate</td><td>Autunno/Inverno</td><td>Tutto l&apos;anno</td></tr>
            <tr><td>Momento</td><td>Giorno</td><td>Sera</td><td>Romantico</td></tr>
            <tr><td>Sillage</td><td>Moderato</td><td>Intenso</td><td>Avvolgente</td></tr>
            <tr><td>Prezzo</td><td>€150</td><td>€155</td><td>€160</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
