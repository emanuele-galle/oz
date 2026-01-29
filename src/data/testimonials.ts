export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  product: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Giulia M.',
    location: 'Milano',
    rating: 5,
    date: '2025-12-15',
    comment: 'Cristallo è semplicemente meraviglioso. Una fragranza fresca ma persistente, perfetta per ogni occasione. La qualità si sente ad ogni spruzzo, e la durata è eccezionale - ancora percettibile dopo 12 ore!',
    product: 'Cristallo',
    verified: true,
  },
  {
    id: '2',
    name: 'Marco R.',
    location: 'Roma',
    rating: 5,
    date: '2025-11-28',
    comment: 'Ho provato molti profumi di nicchia, ma Scintilla è su un altro livello. Note speziate bilanciate perfettamente con iris e vaniglia. Un profumo che lascia il segno e ricevo complimenti ogni volta che lo indosso.',
    product: 'Scintilla',
    verified: true,
  },
  {
    id: '3',
    name: 'Alessandra T.',
    location: 'Verona',
    rating: 5,
    date: '2025-12-01',
    comment: 'Potion d\'Amour è pura seduzione. Dolce senza essere stucchevole, sensuale e avvolgente. È diventato il mio profumo signature per le serate speciali. Il packaging è elegantissimo!',
    product: 'Potion d\'Amour',
    verified: true,
  },
  {
    id: '4',
    name: 'Luca B.',
    location: 'Torino',
    rating: 5,
    date: '2025-11-10',
    comment: 'Finalmente un profumo che dura davvero tutta la giornata! La concentrazione si sente, e la scia è elegante senza essere invadente. Cristallo è diventato il mio daily driver.',
    product: 'Cristallo',
    verified: true,
  },
  {
    id: '5',
    name: 'Sofia L.',
    location: 'Firenze',
    rating: 5,
    date: '2025-10-22',
    comment: 'Sono una grande fan di Zoe e non potevo non provare le sue fragranze. Scintilla supera ogni aspettativa - sofisticato, unico, memorabile. Vale ogni centesimo!',
    product: 'Scintilla',
    verified: true,
  },
  {
    id: '6',
    name: 'Francesco P.',
    location: 'Napoli',
    rating: 5,
    date: '2025-12-08',
    comment: 'Extrait de Parfum al 40% non è uno scherzo. Bastano 2-3 spruzzi e dura tutto il giorno. Potion d\'Amour è gourmand ma elegante, perfetto per l\'inverno. Confezione curatissima.',
    product: 'Potion d\'Amour',
    verified: true,
  },
];

export function getAverageRating(): number {
  const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
  return total / testimonials.length;
}

export function getTestimonialsByProduct(product: string): Testimonial[] {
  return testimonials.filter((t) => t.product === product);
}
