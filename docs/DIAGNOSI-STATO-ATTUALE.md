# Diagnosi Stato Attuale - OZ Extrait

**Data:** 2026-01-30 17:00
**Obiettivo:** Documentare problemi visivi prima del reset completo

---

## 🔍 Problemi Identificati

### 1. Color Scheme Inconsistente

**Problema principale:** Mix di background scuri (`bg-midnight`, `bg-black`) e chiari nonostante le intenzioni di design luxury.

**Componenti con background scuri:**
```
- HomepageHero.tsx → bg-midnight (OK, è la hero)
- Craftsmanship.tsx → bg-black
- BrandStory.tsx → bg-midnight
- ProductInfo.tsx → bg-midnight
- ProductHero.tsx → bg-black
- OlfactoryJourney.tsx → bg-black
- BrandStoryHero.tsx → bg-midnight
- ProcessHero.tsx → bg-midnight
- BrandPhilosophyHero.tsx → bg-midnight
- FounderStory.tsx → bg-black
- Ingredients.tsx → bg-midnight
- BrandPhilosophy.tsx → bg-midnight
```

**Totale:** 12+ componenti con backgrounds scuri

### 2. Tailwind Config con Colori Problematici

Il `tailwind.config.ts` definisce:
```typescript
midnight: {
  DEFAULT: '#0A0A0A',  // Quasi nero
  lighter: '#1A1A1A',
}
```

Questo è in contraddizione con l'obiettivo di un design luxury chiaro stile Byredo.

### 3. globals.css Override Parziale

`globals.css` tenta un override:
```css
body {
  background: #FEFDFB !important;
  color: #0A0A0A !important;
}
```

Ma questo viene ignorato dai component con classi Tailwind `bg-midnight` / `bg-black` che hanno precedenza.

### 4. Text Colors

Molti componenti usano `text-white` o `text-cream-50` che diventano invisibili su backgrounds chiari.

---

## ✅ Cosa Funziona

1. **HomepageHero** - Correttamente ha background scuro (video) con overlay
2. **globals.css** - Ha la giusta intenzione (background chiaro)
3. **Tailwind colors palette** - Ha anche colori chiari disponibili (cream-50, stone-50)
4. **Font config** - Cinzel, Playfair Display, Inter sono configurati

---

## 🎯 Root Cause

Il problema NON è CSS override, ma che i componenti sono stati creati con un'estetica "dark luxury" (`bg-midnight`, `bg-black`) che contraddice il brief "clean luxury" (Byredo-style).

Serve refactoring sistematico di TUTTI i componenti sections per usare:
- `bg-white` o `bg-stone-50` come default
- `text-stone-900` o `text-stone-700` per testo
- `bg-midnight` SOLO per HomepageHero (video background)

---

## 📋 Action Plan

### Phase 1: Tailwind Config Cleanup
- Rimuovere `midnight` dal config (fonte di confusione)
- Usare `stone-900` per testi scuri invece di `midnight`
- Definire palette CHIARA come default

### Phase 2: Component-by-Component Refactor
Ogni componente deve passare da:
```tsx
<section className="bg-midnight">
  <h2 className="text-white">Title</h2>
</section>
```

A:
```tsx
<section className="bg-white">
  <h2 className="text-stone-900">Title</h2>
</section>
```

### Phase 3: Verification
- Docker rebuild --no-cache
- Clear .next cache
- Hard refresh browser
- Screenshot PRIMA/DOPO

---

## 🚨 Files da Modificare (Priorità)

1. `tailwind.config.ts` - Remove midnight color
2. `src/components/sections/Craftsmanship.tsx`
3. `src/components/sections/BrandStory.tsx`
4. `src/components/sections/ProductInfo.tsx`
5. `src/components/sections/ProductHero.tsx`
6. `src/components/sections/OlfactoryJourney.tsx`
7. `src/components/sections/FounderStory.tsx`
8. `src/components/sections/Ingredients.tsx`
9. `src/components/sections/BrandPhilosophy.tsx`
10. Tutti gli altri hero sections eccetto HomepageHero

---

## 📊 Metrics

- **Components con bg scuri:** 12+
- **Components totali:** ~20
- **Percentuale da modificare:** ~60%
- **Estimated effort:** 2-3 ore se fatto metodicamente

---

**Next Step:** Procedere con Phase 1 (Tailwind Config)
