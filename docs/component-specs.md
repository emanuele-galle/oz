# Component Design Specifications — OZ Extrait

**Versione:** 2.0
**Data:** 30 Gennaio 2026
**Scope:** Week 3-4 Development

---

## Component Inventory

### New Components da Creare (Week 3)

**Typography Components:**
1. `<Heading />` — Semantic headings con design tokens
2. `<Body />` — Body text con size variants
3. `<Caption />` — Small text, labels
4. `<Quote />` — Blockquotes styled

**Layout Components:**
5. `<Section />` — Wrapper con spacing consistente
6. `<Container />` — Max-width containers
7. `<Grid />` — CSS Grid wrapper
8. `<Stack />` — Vertical/horizontal stacking

**Product Components (NEW):**
9. `<ProductStoryBlock />` — Long-form narrative section
10. `<IngredientExplorer />` — Interactive ingredient cards
11. `<OlfactoryPyramid />` — Visual scent pyramid
12. `<ScentTimeline />` — Evolution chart 0min → 12h
13. `<UsageRitual />` — When-to-wear illustrated guide
14. `<ProductComparison />` — Side-by-side comparison table

**Content Components (NEW):**
15. `<EditorialSection />` — Magazine-style content blocks
16. `<PhotoEssay />` — Grid narrative con immagini
17. `<VideoPlayer />` — Custom branded player
18. `<Timeline />` — Process/story timeline vertical

---

## Detailed Specs

### 1. ProductStoryBlock

**Purpose:** Display long-form narrative content (600+ parole) in elegante, readable format

**Props:**
```tsx
interface ProductStoryBlockProps {
  title: string;           // es. "La Storia di Cristallo"
  story: string;           // Markdown content (600+ parole)
  images?: string[];       // Optional imagery per break up text
  pullQuote?: string;      // Optional quote highlight
}
```

**Design:**
- Max-width: 768px (optimal reading)
- Typography: Playfair 18px body, line-height 1.7
- Spacing: Paragrafi con mb-6 (24px)
- Pull quotes: Large Playfair italic con gold accent line
- Images: Inset nel testo, border subtle, caption sotto

**Layout:**
```
┌─────────────────────────────┐
│  [Title H2 Cinzel]          │
│                             │
│  Paragraph 1...             │
│  ...                        │
│                             │
│  ┌────────────┐             │
│  │   Image    │             │
│  │  (inset)   │             │
│  └────────────┘             │
│  Caption italic             │
│                             │
│  Paragraph 2...             │
│                             │
│  > "Pull Quote"             │
│    — Zoe                    │
│                             │
│  Paragraph 3...             │
└─────────────────────────────┘
```

**Variants:**
- `variant="light"` — Cream background, dark text
- `variant="dark"` — Midnight background, light text

---

### 2. IngredientExplorer

**Purpose:** Showcase 4 ingredienti chiave per fragranza con sourcing stories

**Props:**
```tsx
interface Ingredient {
  name: string;              // "Bergamotto di Calabria DOP"
  image: string;             // Foto ingrediente raw
  origin: string;            // "Calabria, Italia"
  story: string;             // 100-150 parole sourcing story
  funFact?: string;          // "Serve 8000 fiori per 1kg assoluta"
}

interface IngredientExplorerProps {
  ingredients: Ingredient[]; // Array di 4 ingredienti
  fragranceName: string;     // Per context
}
```

**Design:**
- Layout: Grid 2x2 (mobile: 1 col)
- Card: Immagine top (aspect-square), contenuto sotto
- Interaction: Hover → card lift + shadow increase
- Click: Expand modal con story completa

**Card structure:**
```
┌──────────────┐
│              │
│    Image     │
│  (square)    │
│              │
├──────────────┤
│ Name         │
│ Origin       │
│              │
│ [Read more]  │
└──────────────┘
```

**Modal expanded:**
```
┌─────────────────────────────────────┐
│  [Close X]                          │
│                                     │
│  ┌──────┐  Name                     │
│  │Image │  Origin                   │
│  └──────┘                           │
│                                     │
│  Story (150 parole)...              │
│  ...                                │
│                                     │
│  💡 Fun Fact: "..."                 │
│                                     │
│  [Close button]                     │
└─────────────────────────────────────┘
```

---

### 3. OlfactoryPyramid

**Purpose:** Visual representation piramide olfattiva (Top-Heart-Base notes)

**Props:**
```tsx
interface OlfactoryPyramidProps {
  notes: {
    top: string[];      // Array di note testa
    heart: string[];    // Array di note cuore
    base: string[];     // Array di note fondo
  };
  interactive?: boolean;  // Se hover mostra tooltip
}
```

**Design:**
- Geometria: Triangolo/piramide visual (SVG OR CSS)
- Color coding:
  - Top: Gold chiaro (#FCD34D)
  - Heart: Gold medio (#D4AF37)
  - Base: Gold scuro (#8B6914)
- Tooltip: Hover su nota → mostra descrizione breve

**Visual:**
```
        ▲ TOP
       ▲▲▲
      ▲▲▲▲▲ HEART
     ▲▲▲▲▲▲▲
    ▲▲▲▲▲▲▲▲▲ BASE

Bergamotto    Neroli      Muschio
Limone        Gelsomino   Ambra
Mandarino     Rosa        Cedro
```

**Interaction:**
- Hover nota → Tooltip appare con descrizione (es. "Bergamotto: Fresco, pungente, agrumato")
- Click nota → Espande sezione con storia ingrediente
- Mobile: Tap invece di hover

---

### 4. ScentTimeline

**Purpose:** Mostrare evoluzione profumo nel tempo (0min → 12h+)

**Props:**
```tsx
interface TimelinePhase {
  time: string;           // "0-5 min", "30 min - 3h", "8-12h"
  title: string;          // "Top Notes", "Heart Notes", "Base Notes"
  description: string;    // Cosa senti in questa fase
  intensity: number;      // 1-10 (per visual bar)
  projection: string;     // "Forte", "Moderato", "Skin scent"
}

interface ScentTimelineProps {
  phases: TimelinePhase[];  // 4-5 fasi
  fragranceName: string;
}
```

**Design:**
- Layout: Horizontal timeline (desktop), vertical (mobile)
- Visual: Line chart mostrando intensità over time
- Interactive: Click fase → espande dettagli

**Visual (desktop):**
```
Intensità
 ^
 │     ╱╲
 │    ╱  ╲___
 │   ╱       ╲___
 │  ╱            ╲____
 └──────────────────────> Time
    0   1h  4h  8h  12h

  [0-5min]  [30m-3h]  [8-12h]
  Top       Heart     Base
```

**Interaction:**
- Hover time point → Tooltip dettagli
- Click fase → Espande card con full description

---

### 5. UsageRitual

**Purpose:** Guide "quando indossare" con illustrated scenarios

**Props:**
```tsx
interface UsageScenario {
  title: string;        // "Il Primo Appuntamento"
  description: string;  // Scenario storytelling (100 parole)
  image?: string;       // Illustration OR photo
  tips: string[];       // ["Applica 1 spray dietro orecchie", "2 ore prima"]
}

interface UsageRitualProps {
  scenarios: UsageScenario[];  // 5-6 scenari
  fragranceName: string;
}
```

**Design:**
- Layout: Carousel OR accordion (mobile: accordion sempre)
- Card: Image left (40%), text right (60%)
- Style: Editorial magazine-style

**Card visual:**
```
┌────────────────────────────────┐
│ ┌──────┐                       │
│ │      │  Scenario Title       │
│ │Image │                       │
│ │      │  Description...       │
│ │      │                       │
│ │      │  Tips:                │
│ │      │  • Tip 1              │
│ └──────┘  • Tip 2              │
└────────────────────────────────┘
```

**Scenarios da includere (per ogni fragranza):**
1. Occasione formale
2. Occasione romantica
3. Uso quotidiano
4. Viaggio
5. Weekend relax

---

### 6. ProductComparison

**Purpose:** Side-by-side comparison fino a 3 fragranze

**Props:**
```tsx
interface ProductComparisonProps {
  products: Product[];  // Max 3 products
  showSpecs?: boolean;  // Toggle specs visibility
}
```

**Design:**
- Layout: Table responsive (diventa accordion su mobile)
- Rows:
  - Immagine prodotto
  - Nome + Tagline
  - Prezzo (50ml + 10ml)
  - Famiglia olfattiva
  - Top notes
  - Heart notes
  - Base notes
  - Longevità
  - Sillage
  - Best for (stagioni, occasioni)
  - Rating
  - [Add to cart] button

**Visual (desktop):**
```
┌──────────┬──────────┬──────────┐
│ Cristallo│ Scintilla│  Potion  │
├──────────┼──────────┼──────────┤
│  [IMG]   │  [IMG]   │  [IMG]   │
├──────────┼──────────┼──────────┤
│  €150    │  €155    │  €160    │
├──────────┼──────────┼──────────┤
│ Agrumato │ Orientale│ Gourmand │
├──────────┼──────────┼──────────┤
│ Top:     │ Top:     │ Top:     │
│ Bergam...│ Pepe rosa│ Lampone  │
│  ...     │  ...     │  ...     │
└──────────┴──────────┴──────────┘
```

**Mobile:** Accordion (1 product expanded alla volta)

---

## Component Implementation Priority

### Priority 1 (Week 3 Start)
1. **Typography components** (foundational, needed everywhere)
2. **Layout components** (foundational, needed everywhere)
3. **ProductStoryBlock** (critical per product pages)

### Priority 2 (Week 3 Mid)
4. **IngredientExplorer** (differenziatore chiave vs competitors)
5. **OlfactoryPyramid** (educational + visual appeal)
6. **ScentTimeline** (unique to OZ, scientific credibility)

### Priority 3 (Week 3 End)
7. **UsageRitual** (nice-to-have, lifestyle content)
8. **ProductComparison** (utility tool, can launch post-MVP)

### Priority 4 (Week 4)
9. **EditorialSection** (reusable content wrapper)
10. **PhotoEssay** (quando avremo photography professionali)
11. **VideoPlayer** (quando avremo video final)
12. **Timeline** (brand pages, lower priority)

---

## Design Tokens Usage per Component

### Typography Components

**Heading:**
```tsx
<Heading level={1} size="display-1" color="gold" />
// Uses: typography.scale.display-1, colors.gold[500]
```

**Body:**
```tsx
<Body size="lg" variant="narrative" />
// Uses: typography.scale['body-lg'], fontFamilies.playfair
```

### Layout Components

**Section:**
```tsx
<Section spacing="default" bg="midnight" />
// Uses: spacing.section.desktop (128px), colors.midnight
```

**Container:**
```tsx
<Container size="lg" padding="default" />
// Uses: containerWidths.lg (1024px), spacing.container.desktop
```

---

## Accessibility Requirements (Tutti i Componenti)

**MUST HAVE:**
- [ ] Semantic HTML (section, article, nav, NOT div soup)
- [ ] ARIA labels su interactive elements (buttons, links se icon-only)
- [ ] Keyboard navigation completa (Tab, Enter, Escape)
- [ ] Focus indicators visibili (no cursor override)
- [ ] Color contrast WCAG AA minimum (text/background)
- [ ] Reduced motion support (`prefers-reduced-motion: reduce`)
- [ ] Screen reader friendly (heading hierarchy, alt text)

**Testing:**
- WAVE browser extension (zero errors target)
- axe DevTools (zero violations target)
- Keyboard-only navigation test
- Screen reader test (NVDA/VoiceOver)

---

## Performance Requirements

**Image Components:**
- Next.js Image component (automatic optimization)
- Lazy loading below fold
- Blur placeholder mentre carica
- Sizes prop corretto per responsive

**Animation Components:**
- GPU-accelerated only (transform, opacity)
- Duration max 600ms (luxury è slow ma not sluggish)
- Disable con prefers-reduced-motion
- No layout shift durante animation

**Bundle Size:**
- Ogni component <5KB gzipped (eccetto chart libraries se necessario)
- Tree-shakeable exports
- No dependencies pesanti (es. no Three.js a meno strictly necessary)

---

## Component File Structure

```
src/components/
├── typography/
│   ├── Heading.tsx
│   ├── Body.tsx
│   ├── Caption.tsx
│   ├── Quote.tsx
│   └── index.ts
├── layout/
│   ├── Section.tsx
│   ├── Container.tsx
│   ├── Grid.tsx
│   ├── Stack.tsx
│   └── index.ts
├── product/
│   ├── ProductStoryBlock.tsx
│   ├── IngredientExplorer.tsx
│   ├── OlfactoryPyramid.tsx
│   ├── ScentTimeline.tsx
│   ├── UsageRitual.tsx
│   ├── ProductComparison.tsx
│   └── index.ts
└── content/
    ├── EditorialSection.tsx
    ├── PhotoEssay.tsx
    ├── VideoPlayer.tsx
    ├── Timeline.tsx
    └── index.ts
```

---

## Testing Strategy

### Unit Tests (opzionale ma raccomandato)

```tsx
// ProductStoryBlock.test.tsx
describe('ProductStoryBlock', () => {
  it('renders title correctly', () => {});
  it('renders markdown content', () => {});
  it('shows pull quote if provided', () => {});
  it('respects dark/light variant', () => {});
});
```

### Visual Regression Tests

- Screenshot baseline per ogni component
- Chromatic OR Percy per visual diff
- Test responsive (mobile, tablet, desktop)

### Accessibility Tests

```bash
npm run test:a11y  # Run axe-core automated
```

---

## Documentation per Component

Ogni component deve avere:

**1. JSDoc header:**
```tsx
/**
 * ProductStoryBlock — Long-form narrative display
 *
 * Displays product origin stories, ingredient journeys, and
 * brand storytelling in elegant, readable format.
 *
 * @example
 * <ProductStoryBlock
 *   title="La Storia di Cristallo"
 *   story={cristalloStory}
 *   images={["/img1.jpg", "/img2.jpg"]}
 *   pullQuote="Voglio catturare trasparenza..."
 * />
 */
```

**2. Props interface chiara**
**3. Usage examples inline**
**4. Variants documented**

---

## Next Steps

1. ✅ Component specs documented (questo file)
2. → Implement typography components (Task #9)
3. → Implement layout components (Task #9)
4. → Implement product components (Week 3)
5. → Test & iterate (Week 4)

---

**Specs compilate da:** Development Team
**Review required:** Design Team (se disponibile)
**Status:** READY for implementation Week 3

---

*Component Specs — OZ Extrait Week 2*
