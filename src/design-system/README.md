# OZ Extrait — Design System Documentation

**Versione:** 2.0
**Data:** 30 Gennaio 2026
**Maintainer:** Development Team

---

## Cosa C'è in Questa Directory

```
design-system/
├── tokens.ts           # Master file (importa tutto)
├── colors.ts           # Color palette completa
├── typography.ts       # Type scale + families
├── spacing.ts          # Spacing scale + semantic
├── shadows.ts          # Shadow system + glow effects
└── README.md          # This file
```

---

## Quick Start

### Import Tokens

```tsx
// Importa tutto
import { tokens } from '@/design-system/tokens';

// Oppure importa moduli specifici
import { colors } from '@/design-system/colors';
import { typography } from '@/design-system/typography';
import { spacing } from '@/design-system/spacing';
import { shadows } from '@/design-system/shadows';
```

### Uso Base

```tsx
// In un componente React
export function MyComponent() {
  return (
    <div
      style={{
        color: tokens.colors.gold[500],
        fontSize: tokens.typography.scale.h1.fontSize,
        padding: tokens.spacing.scale.xl,
        boxShadow: tokens.shadows.elevation.md,
      }}
    >
      Hello OZ Extrait
    </div>
  );
}
```

### Uso con Tailwind (Raccomandato)

Configura `tailwind.config.ts` per usare i tokens:

```ts
import { tokens } from './src/design-system/tokens';

export default {
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing.scale,
      boxShadow: {
        ...tokens.shadows.elevation,
        'gold-subtle': tokens.shadows.glow.subtle,
        'gold-medium': tokens.shadows.glow.medium,
      },
      // ... ecc
    }
  }
}
```

Poi usa in JSX:

```tsx
<h1 className="text-h1 font-cinzel text-gold-500">
  L'Essenza del Lusso
</h1>
```

---

## Color System

### Primary: Gold

La nostra color identity. Usa `gold.500` come default.

```tsx
// Headings
<h1 className="text-gold-500">Titolo</h1>

// CTAs
<button className="bg-gold-500 text-midnight hover:bg-gold-400">
  Acquista Ora
</button>

// Accents
<div className="border-t-2 border-gold-300">Divider</div>
```

### Neutrals: Stone

Per testi e backgrounds. Preferire sempre a gray puro (ha undertone warm).

```tsx
// Body text su background chiaro
<p className="text-stone-700">Testo normale</p>

// Secondary text
<span className="text-stone-500">Caption</span>

// Background sezione chiara
<section className="bg-stone-50">...</section>
```

### Semantic: Success, Error, Warning

Solo per feedback UI, non per decorazione.

```tsx
// Success message
<div className="bg-success-50 border-success-500 text-success-700">
  Ordine completato!
</div>

// Error message
<div className="bg-error-50 border-error-500 text-error-700">
  Errore nel pagamento
</div>
```

---

## Typography System

### Font Families

**Cinzel:** Solo per headings importanti (H1, H2, H3)
**Playfair:** Per narrative text, quotes, taglines
**Inter:** Per UI, body text standard, navigation

```tsx
// Display heading (hero)
<h1 className="font-cinzel text-display-1 text-gold-500">
  OZ Extrait
</h1>

// Section heading
<h2 className="font-cinzel text-h2 text-gold-500">
  Le Nostre Fragranze
</h2>

// Narrative text (product descriptions)
<p className="font-playfair text-body-lg text-white/80">
  Cristallo nasce dall'ispirazione delle vetrate di Murano...
</p>

// Standard UI text
<p className="font-inter text-body text-stone-700">
  Aggiungi al carrello
</p>

// Quote
<blockquote className="font-playfair text-quote italic text-gold-500">
  "Ogni fragranza è un pezzo di me."
</blockquote>
```

### Responsive Typography

Su mobile, riduci display sizes:

```tsx
<h1 className="text-[60px] md:text-display-1 font-cinzel">
  Hero Title
</h1>
```

---

## Spacing System

### Section Spacing (Vertical Rhythm)

Consistent spacing tra sezioni è CRITICAL per luxury feel.

```tsx
// Tutte le sezioni devono avere:
<section className="py-24 md:py-32">
  {/* 96px mobile, 128px desktop */}
</section>
```

### Component Internal Spacing

```tsx
// Card padding
<div className="p-6 md:p-8">
  {/* 24px mobile, 32px desktop */}
</div>

// Grid gaps
<div className="grid grid-cols-3 gap-4 md:gap-6">
  {/* 16px mobile, 24px desktop */}
</div>
```

### Containers

```tsx
// Content pages (articles, guides)
<div className="max-w-3xl mx-auto px-4 md:px-6">
  {/* 768px max-width, 16px padding mobile, 24px desktop */}
</div>

// Shop grids
<div className="max-w-6xl mx-auto px-4 md:px-8">
  {/* 1024px max-width */}
</div>

// Homepage sections
<div className="max-w-7xl mx-auto px-4 md:px-8">
  {/* 1280px max-width */}
</div>
```

---

## Shadow System

### Elevation Shadows

```tsx
// Subtle card
<div className="shadow-sm">Card</div>

// Standard elevation
<div className="shadow-md">Modal</div>

// Dramatic depth
<div className="shadow-xl">Hero Image</div>
```

### Gold Glow (Signature OZ)

```tsx
// Subtle glow su gold elements
<h1 className="text-gold-500 shadow-gold-subtle">
  Titolo con glow
</h1>

// Medium glow su CTAs
<button className="bg-gold-500 shadow-gold-medium hover:shadow-gold-strong">
  CTA con glow
</button>
```

### Product Cards

```tsx
// Usa i combined shadows specifici
<div className="shadow-product-card hover:shadow-product-card-hover transition-shadow duration-300">
  <ProductCard />
</div>
```

---

## Animations

### Hover Effects Standard

```tsx
// Button hover
<button className="
  bg-gold-500
  hover:bg-gold-400
  transition-all
  duration-250
  ease-standard
">
  Hover me
</button>

// Card hover
<div className="
  shadow-sm
  hover:shadow-md
  hover:-translate-y-1
  transition-all
  duration-300
  ease-smooth
">
  Card con lift
</div>
```

### Reduced Motion

SEMPRE rispettare prefers-reduced-motion:

```tsx
<div className="
  motion-safe:animate-fade-in
  motion-reduce:opacity-100
">
  Content che anima solo se motion OK
</div>
```

Oppure in CSS:

```css
@media (prefers-reduced-motion: no-preference) {
  .my-element {
    animation: fadeIn 0.6s ease-smooth;
  }
}
```

---

## Best Practices

### DO ✅

- Usa tokens invece di magic values (`spacing.xl` non `24px`)
- Rispetta type scale (no font-size custom)
- Consistent section spacing (`py-24 md:py-32` ovunque)
- Gold glow su elementi gold per brand consistency
- Cream backgrounds invece di white puro (più warm)

### DON'T ❌

- No magic values hardcoded (`text-[13px]`, `p-[17px]`)
- No colori non nel design system (`#FF5733`)
- No spacing inconsistente (sezione ha py-20, altra py-28)
- No gold overuse (ogni elemento ha gold = perde impatto)
- No animazioni gratuite (solo purposeful)

---

## Component Examples

### Example 1: Hero Section

```tsx
import { tokens } from '@/design-system/tokens';

export function HeroSection() {
  return (
    <section className="
      relative
      py-24 md:py-32
      bg-midnight
    ">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="
          font-cinzel
          text-[60px] md:text-display-1
          text-gold-500
          mb-6
        ">
          OZ Extrait
        </h1>
        <p className="
          font-playfair
          text-body-xl
          text-white/80
          max-w-2xl
        ">
          Extrait de Parfum. Extrait d'Âme.
        </p>
      </div>
    </section>
  );
}
```

### Example 2: Product Card

```tsx
export function ProductCard({ product }) {
  return (
    <div className="
      group
      bg-cream-50
      rounded-lg
      overflow-hidden
      shadow-product-card
      hover:shadow-product-card-hover
      transition-all
      duration-300
      ease-smooth
    ">
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full h-full
            object-cover
            group-hover:scale-105
            transition-transform
            duration-500
            ease-smooth
          "
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="
          font-cinzel
          text-h4
          text-ink-950
          mb-2
        ">
          {product.name}
        </h3>
        <p className="
          font-inter
          text-body-sm
          text-stone-600
          mb-4
        ">
          {product.tagline}
        </p>
        <div className="
          font-inter
          text-h5
          text-gold-600
        ">
          €{product.price}
        </div>
      </div>
    </div>
  );
}
```

### Example 3: Button Component

```tsx
export function Button({ children, variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-gold-500 text-midnight hover:bg-gold-400 shadow-gold-medium hover:shadow-gold-strong',
    secondary: 'border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-midnight',
    tertiary: 'text-gold-500 underline hover:text-gold-400',
  };

  return (
    <button
      className={cn(
        'font-inter text-body font-semibold',
        'px-8 py-3 rounded-sm',
        'transition-all duration-250 ease-standard',
        variants[variant]
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

## Migration Guide (Da Vecchio a Nuovo Design System)

### Step 1: Update Tailwind Config

Importa tutti i tokens in `tailwind.config.ts`:

```ts
import { designSystem } from './src/design-system/tokens';

export default {
  theme: {
    extend: {
      colors: designSystem.colors,
      spacing: designSystem.spacing.scale,
      fontSize: /* map typography.scale */,
      boxShadow: /* map shadows */,
    }
  }
}
```

### Step 2: Replace Magic Values

Cerca nel codebase:
```bash
grep -r "text-\[.*px\]" src/  # Custom font sizes
grep -r "p-\[.*px\]" src/     # Custom padding
grep -r "#[0-9A-F]" src/      # Hex colors hardcoded
```

Replace con tokens appropriati.

### Step 3: Component Refactor

Per ogni componente:
1. Replace inline styles con Tailwind classes
2. Replace magic values con design tokens
3. Ensure consistent spacing (section py-24 md:py-32)
4. Add gold glow su elementi gold
5. Fix text contrast issues (WCAG compliance)

### Step 4: Test Accessibility

```bash
npm run lighthouse  # Check accessibility score
npm run axe        # axe-core audit
```

Target: >95% accessibility score.

---

## Maintenance

### When to Update Tokens

**Add new token quando:**
- Nuovo use case non coperto da esistenti
- New component richiede spacing custom
- Feedback design richiede adjustment

**NEVER:**
- No magic values inline (sempre estendere system)
- No override random (se token non funziona, è token sbagliato)

### Versioning

Design system segue Semantic Versioning:
- **Major (2.0 → 3.0):** Breaking changes (rename tokens, remove)
- **Minor (2.0 → 2.1):** New tokens aggiunti
- **Patch (2.0.0 → 2.0.1):** Bug fixes, documentation

---

## Support & Questions

Se hai dubbi su quale token usare, chiedi nel team Slack/Discord oppure consulta questa decision matrix:

**Choosing Colors:**
- Text su dark background? → `text-white/80` (body) OR `text-gold-500` (headings)
- Text su light background? → `text-stone-700` (body) OR `text-ink-950` (headings)
- CTA button? → `bg-gold-500 text-midnight`
- Subtle divider? → `border-stone-200` (light) OR `border-white/10` (dark)

**Choosing Typography:**
- Hero statement? → `text-display-1 font-cinzel`
- Section title? → `text-h2 font-cinzel`
- Storytelling? → `text-body-lg font-playfair`
- UI text? → `text-body font-inter`

**Choosing Spacing:**
- Between sections? → `py-24 md:py-32`
- Between components? → `space-y-12 md:space-y-16`
- Grid gap? → `gap-4 md:gap-6`
- Card padding? → `p-6 md:p-8`

**Choosing Shadows:**
- Subtle card? → `shadow-sm`
- Prominent card? → `shadow-md`
- Gold element? → Add `shadow-gold-subtle`
- Product card? → `shadow-product-card hover:shadow-product-card-hover`

---

**Fine Documentation**

*Per questions o suggestions: contatta il design team*
