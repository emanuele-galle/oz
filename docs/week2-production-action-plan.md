# Week 2 — Production Action Plan (Budget Approvato)

**Budget:** €8,000
**Timeline:** Partenza immediata
**Completion target:** 14 giorni da oggi
**Data:** 30 Gennaio 2026

---

## Immediate Actions (Next 48 Hours)

### Day 1 (Oggi) — Booking Initiation

**PHOTOGRAPHER**

**Action Items:**
- [ ] Cercare 3-5 photographers portfolio (luxury product/beauty experience)
- [ ] Shortlist 2 finalisti
- [ ] Request quote + availability
- [ ] Check portfolio alignment con brief

**Dove cercare:**
- Instagram hashtags: #luxuryproductphotography #perfumephotography #beautyphotographer
- Portfolio sites: Behance, 500px (filter "Italy" OR "Milan")
- Agencies: Contattare agencies Milano/Verona specializzate luxury
- Referrals: Chiedere a Zoe se conosce photographers dal suo network fashion

**Selection criteria:**
- Portfolio con lavori luxury (perfumi, beauty, fashion)
- Based in Italia (Milano, Verona, Firenze preferred — no travel costs)
- Disponibilità prossimi 7-10 giorni
- Budget range €2,500-3,500 (1.5 giorni + post-production)

**VIDEOGRAPHER**

**Action Items:**
- [ ] Cercare 2-3 videographers/filmmakers
- [ ] Request reel + quote
- [ ] Check gear availability (4K camera, gimbal, lighting)

**Dove cercare:**
- Vimeo: Search "luxury commercial" "perfume video" creators
- Instagram: #luxuryvideographer #commercialfilmmaker
- Production companies: Milano-based boutique studios
- Zoe network: Fashion week videographers

**Selection criteria:**
- Reel con commercial/branded content (non solo wedding)
- Cinematic style (non documentary flat)
- Color grading skills
- Budget range €3,500-4,500 (2 giorni shoot + 3 giorni edit)

---

### Day 2 — Contracting & Planning

**PHOTOGRAPHER (once selected):**
- [ ] Send detailed brief (`photography-brief.md`)
- [ ] Contract negotiation (usage rights, deliverables, timeline)
- [ ] Deposit payment (50% upfront standard)
- [ ] Schedule shoot dates (ideally Day 5-6 from now)

**VIDEOGRAPHER (once selected):**
- [ ] Send detailed brief (`video-brief.md`)
- [ ] Storyboard review call (30 min)
- [ ] Contract + deposit
- [ ] Schedule shoot dates (Day 7-8 OR overlap con photography Day 6)

**MUSIC LICENSING:**
- [ ] Subscribe Artlist.io (€200/anno)
- [ ] Start curating tracks per each video
- [ ] Download + organize in `/music-library/`

**LOCATION SCOUTING (se outdoor shots):**
- [ ] Identify Verona locations (Arena, Ponte Pietra, centro storico)
- [ ] Check permissions needed (public spaces usually OK)
- [ ] Backup indoor locations se maltempo

---

## Pre-Production Checklist (Day 3-4)

### PHOTOGRAPHER Preparation

**Props to source:**
- [ ] Marble slab (bianco Carrara OR nero Marquina) — 50x50cm minimum
- [ ] Silk fabric (crema, nero) — 2 metri
- [ ] Fresh ingredients (se disponibili localmente):
  - Bergamotto (Calabria — può essere difficile, use lemons se necessary)
  - Rose fresche rosse
  - Bacche pepe rosa decorative
  - Baccelli vaniglia (da pasticceria)
- [ ] Lifestyle props:
  - Lenzuola bianche luxury (high thread count)
  - Candle elegante
  - Vintage books (2-3)
  - Gold jewelry (da Zoe personal collection)

**Locations to confirm:**
- [ ] Studio rental booked (Day 5-6)
  - Needed: Cove, lighting setup, backdrop options
- [ ] Outdoor location scouted (Verona centro OR alternative)
- [ ] Backup plan if rain

**Shot list refinement:**
- [ ] Review 87-shot list con photographer
- [ ] Prioritize must-haves (Priority 1: 30 shots minimum)
- [ ] Adjust based on photographer input

### VIDEOGRAPHER Preparation

**Pre-production meeting:**
- [ ] Storyboard walk-through (30 min video call)
- [ ] Discuss color grading reference (Kodak Portra look)
- [ ] Confirm gear list (4K camera, lenses, gimbal, lights)
- [ ] Music selection review (send Artlist tracks shortlist)

**Zoe preparation (per voiceover):**
- [ ] Script finalization (120-150 parole for 90s video)
- [ ] Voice recording session (studio OR home setup quiet)
- [ ] Practice delivery (warm, confident, non scripted-sounding)

**B-roll planning:**
- [ ] Identify processo locations (lab available?)
- [ ] Coordinate con production schedule (bottling, blending timing)
- [ ] Prepare "mise-en-scène" (setup looks intentional, not random)

---

## Production Schedule

### Week 2.5 Actual Timeline

**Day 1-2 (30-31 Gen):** Booking + contracting
**Day 3-4 (1-2 Feb):** Pre-production prep
**Day 5-6 (3-4 Feb):** PHOTOGRAPHY SHOOT (2 giorni)
**Day 7-8 (5-6 Feb):** VIDEO SHOOT (2 giorni)
**Day 9-11 (7-9 Feb):** Photo editing + delivery (photographer)
**Day 12-14 (10-12 Feb):** Video editing + delivery (videographer)

**Delivery finale:** 12 Febbraio 2026

---

## Parallel Track: Week 3 Development Starts NOW

**Mentre aspettiamo production, iniziamo development:**

### Day 1-2 (Oggi - Domani)

**Task 1: Tailwind Config Update**
```bash
# Import design tokens in tailwind.config.ts
# Configure theme.extend con colors, typography, spacing, shadows
```

**Task 2: Create Typography Components Demo Page**
```bash
# /src/app/design-system-demo/page.tsx
# Showcase all Heading sizes, Body variants, Quote styles
# Per QA visual
```

**Task 3: Start Product Page Refactor**
```bash
# /src/app/fragranze/[slug]/page.tsx
# Integrate ProductHeroGallery
# Layout skeleton ready per ProductStoryBlock
```

### Day 3-5

**Task 4: Implement ProductStoryBlock**
```bash
# Long-form narrative component
# Use content from /content/product-stories.md
# Markdown rendering + image insets
```

**Task 5: Create /fragranze Shop Page**
```bash
# Use ShopHero
# Product grid con Grid component
# Filter/sort UI (functionality Week 4)
```

### Day 6-7

**Task 6: Create /il-brand Pages Structure**
```bash
# /il-brand/storia — Use BrandStoryHero + content
# /il-brand/filosofia — Use BrandPhilosophyHero
# /il-brand/processo — Use ProcessHero
```

**By Day 7:** Core structure complete, ready per new asset integration

---

## Budget Breakdown Confirmed

### Photography (€3,200)
- Photographer fee (1.5 giorni): €1,800
- Studio rental: €300
- Props & materials: €200
- Post-production (87 images): €900

**Deliverables:** 87 immagini edited (RAW + high-res + web + WebP)

### Video Production (€4,200)
- Videographer fee (2 giorni): €2,400
- Equipment rental (if needed): €400
- Music licensing (Artlist): €200
- Voice-over studio: €200
- Editing & color grading: €1,000

**Deliverables:** 4 video edited (4K master + 1080p + 720p) + 8 B-roll clips

### Contingency (€600)
- Unexpected costs (travel, additional props, extra shooting time)
- Buffer per revisions

**TOTAL: €8,000**

---

## Payment Schedule

**Photographer:**
- 50% deposit (€1,600) — At booking
- 50% balance (€1,600) — Upon delivery edited photos

**Videographer:**
- 50% deposit (€2,100) — At booking
- 50% balance (€2,100) — Upon delivery final videos

**Total upfront needed NOW:** €3,700
**Total upon completion:** €4,300

---

## Deliverables Quality Guarantee

### Photography
- Minimum 87 shots edited perfettamente
- If <87 usable shots → additional shooting OR partial refund
- 2 revision rounds included
- RAW files provided (ownership transfer)

### Video
- 4 videos final edited con color grading
- 2 revision rounds per video
- Master files (4K) provided
- Music licensed included

### Contracts Must Include
- Usage rights: Perpetual, worldwide, all media
- Ownership: Client owns finals
- Timeline: Delivery max 14 giorni da shoot
- Revisions: 2 rounds included
- Cancellation policy: 50% refund se cancella 48h+ prima shoot

---

## Next Steps Immediate

### YOUR ACTIONS NEEDED (entro 24-48h):

1. **Approve final budget €8,000**
2. **Provide Zoe availability** per shoot giorni
   - Photography: 2 giorni needed (almeno mezzo giorno per founder portraits)
   - Video: 2 giorni needed (1 giorno pieno per voiceover + footage)
3. **Approve photography/video briefs** (review `/content/production-briefs/`)
4. **Access to locations** (if shooting at Zoe home/office OR need specific locations)

### MY ACTIONS (parallel):

1. ✅ Start Week 3 development NOW (non blocked)
2. ✅ Research photographers/videographers (shortlist pronto domani)
3. ✅ Prepare booking emails (ready to send quando approvi final)

---

## Week 3 Development Starts Now

Non aspettiamo la production — iniziamo Week 3 development con assets esistenti. Nuove foto/video saranno integrate incrementalmente quando pronte.

**Vuoi che inizi Week 3 development adesso?**

Posso fare:
1. Configure Tailwind con design tokens
2. Implement ProductStoryBlock component
3. Create /fragranze shop page
4. Refactor product pages con new components

Oppure aspetti review photographer/videographer shortlist prima?