/**
 * Fragrance Wizard — Data, Scoring & Atmosphere Configs
 */

export type FragranceId = 'cristallo' | 'scintilla' | 'potion-damour';

export interface WizardOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  scores: Record<FragranceId, number>;
}

export interface WizardStep {
  id: string;
  title: string;
  subtitle: string;
  options: WizardOption[];
}

export interface FragranceResult {
  id: FragranceId;
  name: string;
  tagline: string;
  family: string;
  concentration: string;
  season: string;
  price: string;
  image: string;
  slug: string;
  gradient: string;
  accentColor: string;
}

// Step 1: Il Tuo Momento
export const stepMomento: WizardStep = {
  id: 'momento',
  title: 'Il Tuo Momento',
  subtitle: 'Quando indosserai la tua fragranza?',
  options: [
    {
      id: 'mattina',
      label: 'Mattina',
      description: 'Freschezza e chiarezza per iniziare la giornata',
      icon: '☀️',
      scores: { cristallo: 3, scintilla: 0, 'potion-damour': 1 },
    },
    {
      id: 'sera',
      label: 'Sera',
      description: 'Intensità e magnetismo per la notte',
      icon: '🌙',
      scores: { cristallo: 0, scintilla: 3, 'potion-damour': 1 },
    },
    {
      id: 'speciale',
      label: 'Occasione Speciale',
      description: 'Un momento unico che merita qualcosa di straordinario',
      icon: '✨',
      scores: { cristallo: 1, scintilla: 1, 'potion-damour': 3 },
    },
    {
      id: 'sempre',
      label: 'Ogni Giorno',
      description: 'Una firma olfattiva che ti rappresenta sempre',
      icon: '💫',
      scores: { cristallo: 2, scintilla: 1, 'potion-damour': 2 },
    },
  ],
};

// Step 2: La Tua Energia
export const stepEnergia: WizardStep = {
  id: 'energia',
  title: 'La Tua Energia',
  subtitle: 'Come vuoi sentirti?',
  options: [
    {
      id: 'luminosa',
      label: 'Luminosa',
      description: 'Pulito, fresco, come una brezza marina',
      icon: '💎',
      scores: { cristallo: 3, scintilla: 0, 'potion-damour': 0 },
    },
    {
      id: 'intensa',
      label: 'Intensa',
      description: 'Potente, sicuro, magnetico',
      icon: '🔥',
      scores: { cristallo: 0, scintilla: 3, 'potion-damour': 1 },
    },
    {
      id: 'romantica',
      label: 'Romantica',
      description: 'Avvolgente, dolce, irresistibile',
      icon: '🌹',
      scores: { cristallo: 0, scintilla: 1, 'potion-damour': 3 },
    },
  ],
};

// Step 3: Le Tue Note
export const stepNote: WizardStep = {
  id: 'note',
  title: 'Le Tue Note',
  subtitle: 'Quale famiglia olfattiva ti attrae?',
  options: [
    {
      id: 'agrumato',
      label: 'Agrumato & Fresco',
      description: 'Bergamotto, cedro, note marine',
      icon: '🍋',
      scores: { cristallo: 3, scintilla: 0, 'potion-damour': 0 },
    },
    {
      id: 'speziato',
      label: 'Speziato & Legnoso',
      description: 'Pepe rosa, iris, patchouli',
      icon: '🌿',
      scores: { cristallo: 0, scintilla: 3, 'potion-damour': 0 },
    },
    {
      id: 'gourmand',
      label: 'Gourmand & Orientale',
      description: 'Vaniglia, rosa, ambra',
      icon: '🍯',
      scores: { cristallo: 0, scintilla: 0, 'potion-damour': 3 },
    },
  ],
};

export const wizardSteps = [stepMomento, stepEnergia, stepNote];

// Fragrance results data
export const fragranceResults: Record<FragranceId, FragranceResult> = {
  cristallo: {
    id: 'cristallo',
    name: 'Cristallo',
    tagline: 'La purezza in forma liquida',
    family: 'Agrumato, Acquatico',
    concentration: '40%',
    season: 'Primavera/Estate',
    price: '€150',
    image: '/uploads/images/Cristallo.jpeg',
    slug: '/products/cristallo',
    gradient: 'from-sky-200/20 via-blue-100/10 to-transparent',
    accentColor: '#87CEEB',
  },
  scintilla: {
    id: 'scintilla',
    name: 'Scintilla',
    tagline: 'L\'intensità che lascia il segno',
    family: 'Orientale Speziato',
    concentration: '40%',
    season: 'Autunno/Inverno',
    price: '€155',
    image: '/uploads/images/Scintilla.jpeg',
    slug: '/products/scintilla',
    gradient: 'from-amber-500/20 via-red-400/10 to-transparent',
    accentColor: '#D4AF37',
  },
  'potion-damour': {
    id: 'potion-damour',
    name: "Potion d'Amour",
    tagline: 'L\'amore ha trovato il suo profumo',
    family: 'Gourmand Orientale',
    concentration: '42%',
    season: 'Tutto l\'anno',
    price: '€160',
    image: '/uploads/images/Potion-damour.jpeg',
    slug: '/products/potion-damour',
    gradient: 'from-pink-300/20 via-rose-200/10 to-transparent',
    accentColor: '#E8A0BF',
  },
};

// Calculate winner from scores
export function calculateResult(
  answers: Record<string, string>
): FragranceId {
  const totals: Record<FragranceId, number> = {
    cristallo: 0,
    scintilla: 0,
    'potion-damour': 0,
  };

  const allSteps = [stepMomento, stepEnergia, stepNote];

  for (const step of allSteps) {
    const answerId = answers[step.id];
    if (!answerId) continue;
    const option = step.options.find((o) => o.id === answerId);
    if (!option) continue;

    for (const [fragId, score] of Object.entries(option.scores)) {
      totals[fragId as FragranceId] += score;
    }
  }

  // Find highest score
  let winner: FragranceId = 'cristallo';
  let maxScore = 0;
  for (const [id, score] of Object.entries(totals)) {
    if (score > maxScore) {
      maxScore = score;
      winner = id as FragranceId;
    }
  }

  return winner;
}

// Comparison table data (preserved from guide for SEO)
export const comparisonData = [
  { label: 'Famiglia', values: ['Agrumato', 'Orientale Speziato', 'Gourmand Orientale'] },
  { label: 'Concentrazione', values: ['40%', '40%', '42%'] },
  { label: 'Durata', values: ['12+ ore', '14+ ore', '16+ ore'] },
  { label: 'Stagione ideale', values: ['Primavera/Estate', 'Autunno/Inverno', 'Tutto l\'anno'] },
  { label: 'Momento', values: ['Giorno', 'Sera', 'Romantico'] },
  { label: 'Sillage', values: ['Moderato', 'Intenso', 'Avvolgente'] },
  { label: 'Prezzo', values: ['€150', '€155', '€160'] },
];
