# Asset Management Strategy — OZ Extrait

**Versione:** 2.0
**Data:** 30 Gennaio 2026
**Scope:** Photography, Video, Design Assets Organization

---

## Directory Structure

```
/var/www/projects/oz/public/uploads/
├── images/
│   ├── products/
│   │   ├── cristallo/
│   │   │   ├── hero-1.jpg (2000x2000, hero shot frontale)
│   │   │   ├── hero-1.webp
│   │   │   ├── hero-2.jpg (¾ view)
│   │   │   ├── hero-3.jpg (flat lay)
│   │   │   ├── lifestyle-morning.jpg
│   │   │   ├── lifestyle-evening.jpg
│   │   │   ├── lifestyle-travel.jpg
│   │   │   ├── lifestyle-nature.jpg
│   │   │   ├── lifestyle-urban.jpg
│   │   │   ├── detail-cap.jpg
│   │   │   ├── detail-label.jpg
│   │   │   ├── detail-liquid.jpg
│   │   │   ├── detail-atomizer.jpg
│   │   │   ├── flatlay-minimal.jpg
│   │   │   ├── flatlay-luxury.jpg
│   │   │   ├── packaging-box.jpg
│   │   │   ├── packaging-unwrap.jpg
│   │   │   └── packaging-gift.jpg
│   │   ├── scintilla/
│   │   │   └── [same structure as cristallo]
│   │   └── potion-damour/
│   │       └── [same structure]
│   │
│   ├── ingredients/
│   │   ├── bergamotto-tree.jpg
│   │   ├── bergamotto-fruit.jpg
│   │   ├── bergamotto-oil.jpg
│   │   ├── rosa-damascena-field.jpg
│   │   ├── rosa-petals.jpg
│   │   ├── gelsomino-flower.jpg
│   │   ├── vaniglia-pods.jpg
│   │   ├── iris-rhizomes.jpg
│   │   ├── patchouli-leaves.jpg
│   │   ├── oud-synthesis.jpg
│   │   └── [altri ingredienti...]
│   │
│   ├── process/
│   │   ├── lab-overview.jpg
│   │   ├── essences-bottles.jpg
│   │   ├── precision-scale.jpg
│   │   ├── blending-hands.jpg
│   │   ├── testing-strips.jpg
│   │   ├── formula-notebook.jpg
│   │   ├── zoe-smelling.jpg
│   │   ├── glass-beaker.jpg
│   │   ├── filling-station.jpg
│   │   ├── crimping.jpg
│   │   ├── labeling.jpg
│   │   ├── quality-check.jpg
│   │   ├── boxing.jpg
│   │   └── finished-lineup.jpg
│   │
│   ├── founder/
│   │   ├── zoe-portrait-1-formal.jpg
│   │   ├── zoe-portrait-2-artistic.jpg
│   │   ├── zoe-portrait-3-workshop.jpg
│   │   ├── zoe-portrait-4-outdoor.jpg
│   │   ├── zoe-portrait-5-closeup.jpg
│   │   ├── zoe-portrait-6-candid.jpg
│   │   └── zoe-bts-[1-10].jpg (candid BTS shots)
│   │
│   └── lifestyle/
│       ├── editorial-1.jpg (magazine-style imagery)
│       ├── editorial-2.jpg
│       ├── mood-luxury.jpg
│       ├── mood-romantic.jpg
│       └── [altri mood shots]
│
├── videos/
│   ├── brand-manifesto-90s.mp4 (master 4K)
│   ├── brand-manifesto-90s-1080p.mp4 (web)
│   ├── brand-manifesto-90s-720p.mp4 (mobile fallback)
│   ├── cristallo-product-30s.mp4 (4K master)
│   ├── cristallo-product-30s-1080p.mp4
│   ├── scintilla-product-30s.mp4
│   ├── scintilla-product-30s-1080p.mp4
│   ├── potion-product-30s.mp4
│   ├── potion-product-30s-1080p.mp4
│   └── broll/
│       ├── blending-clip-1.mp4 (10-15s clips)
│       ├── bottling-clip-2.mp4
│       ├── ingredients-clip-3.mp4
│       └── [8 clips total]
│
└── design/
    ├── logos/
    │   ├── oz-logo-gold.svg
    │   ├── oz-logo-white.svg
    │   ├── oz-logo-black.svg
    │   └── oz-wordmark.svg
    ├── icons/
    │   └── [UI icons se custom]
    └── graphics/
        └── [infographics, illustrations]
```

---

## Naming Conventions

### Images

**Pattern:** `{category}-{variant}-{descriptor}.{ext}`

**Examples:**
- `hero-1-frontale.jpg` (product hero shot 1)
- `lifestyle-morning-ritual.jpg` (lifestyle context)
- `detail-cap-macro.jpg` (detail shot)
- `flatlay-minimal-ingredients.jpg` (flat lay composition)

**Rules:**
- Lowercase always (no CamelCase)
- Hyphens for spaces (no underscores)
- Descriptive (not img001.jpg)
- Version suffix se multiple (v1, v2) evitare — use folders

### Videos

**Pattern:** `{name}-{duration}.{ext}`

**Examples:**
- `brand-manifesto-90s.mp4`
- `cristallo-product-30s.mp4`
- `blending-broll-15s.mp4`

**Resolution suffix:**
- No suffix = Master 4K
- `-1080p` = Full HD web
- `-720p` = Mobile fallback

---

## Image Optimization Pipeline

### Automation Script (da creare)

```bash
#!/bin/bash
# /scripts/optimize-images.sh

# Converts JPEG → WebP
# Resizes to web-appropriate dimensions
# Maintains aspect ratios

INPUT_DIR="./public/uploads/images"
OUTPUT_DIR="./public/uploads/images"

for img in $INPUT_DIR/**/*.jpg; do
  # Create WebP version
  cwebp -q 85 "$img" -o "${img%.jpg}.webp"

  # Resize if > 2000px width
  convert "$img" -resize "2000x>" "${img%.jpg}-web.jpg"
done
```

**Dependencies:** ImageMagick, cwebp

### Next.js Image Component Configuration

```tsx
// next.config.ts
export default {
  images: {
    formats: ['image/webp', 'image/avif'], // Next-gen formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year (assets non cambiano)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
```

### Usage in Components

```tsx
// Always use Next Image, never <img>
import Image from 'next/image';

<Image
  src="/uploads/images/products/cristallo/hero-1.jpg"
  alt="Cristallo Extrait de Parfum — Hero shot frontale"
  width={2000}
  height={2000}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  quality={90}
  priority={isPrimary} // true solo per above-fold images
  placeholder="blur"
  blurDataURL={blurDataURL} // Generate con sharp OR use default
/>
```

---

## Video Optimization Pipeline

### Compression Settings

**Tool:** FFmpeg

**4K Master → 1080p Web:**
```bash
ffmpeg -i input-4k.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 20 \
  -vf "scale=1920:1080" \
  -c:a aac \
  -b:a 192k \
  output-1080p.mp4
```

**1080p → 720p Mobile:**
```bash
ffmpeg -i input-1080p.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -vf "scale=1280:720" \
  -c:a aac \
  -b:a 128k \
  output-720p.mp4
```

**Target file sizes:**
- 90s video 1080p: 15-25 MB
- 30s video 1080p: 8-12 MB
- 720p: ~50% of 1080p size

### Video Component Usage

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover"
  preload="metadata" // Non auto (save bandwidth)
>
  <source src="/uploads/videos/brand-manifesto-90s-1080p.mp4" type="video/mp4" />
  <source src="/uploads/videos/brand-manifesto-90s-1080p.webm" type="video/webm" />
</video>
```

**Poster image:** Always provide per immediate visual

---

## Storage & CDN Strategy

### Current Setup (Public Folder)

**Pro:**
- Simple (no external service)
- Free (no CDN costs)
- Next.js automatic optimization

**Con:**
- Slower che dedicated CDN (no edge caching)
- Docker image size aumenta (asset inside container)

**Current size:** `/public/uploads` = ~200MB (gestibile)

### Future: CDN Migration (Post-Launch)

**Se traffic aumenta molto (>10k visitors/mese):**

**Option 1: Cloudflare R2 + Images**
- Storage: €0.015/GB/mese
- Bandwidth: €0 (egress free)
- Image optimization: Built-in

**Option 2: Vercel Blob Storage**
- Integrazione native Next.js
- €0.20/GB storage
- Automatic optimization

**Option 3: Cloudinary**
- €0 fino a 25GB storage
- Automatic format conversion (WebP, AVIF)
- On-the-fly transformations

**Decisione:** Week 4 post-launch based on actual traffic.

---

## Backup Strategy

### Asset Backup Plan

**Primary storage:** `/var/www/projects/oz/public/uploads/`

**Backups:**
1. **Git:** NO (asset troppo large per Git)
2. **External drive:** Sì (settimanale full backup)
3. **Cloud:** MinIO VPS internal (disponibile)

**Script backup automatico:**
```bash
#!/bin/bash
# Backup uploads to MinIO weekly

tar -czf uploads-backup-$(date +%Y%m%d).tar.gz /var/www/projects/oz/public/uploads/
# Upload to MinIO (comando mc)
mc cp uploads-backup-*.tar.gz vps-minio/oz-backups/
# Keep only last 4 backups
```

**Cron:** Ogni domenica 2AM

---

## Asset Delivery Workflow

### From Photographer/Videographer to Production

**Step 1: Reception**
- Photographer delivers via WeTransfer/Dropbox
- Download to `/tmp/oz-photoshoot-raw/`

**Step 2: Selection**
- Review tutte le foto
- Seleziona 87 finali da editare
- Move to `/oz-photoshoot-selected/`

**Step 3: Post-Production**
- Photographer edita 87 selezionate
- Color grading, retouch
- Export multiple formats (high-res, web, webp)

**Step 4: Integration**
- Copy edited images to `/public/uploads/images/`
- Organize per category (products/, ingredients/, founder/, process/)
- Run optimization script
- Commit to Git (solo metadata/path changes, not assets themselves)
- Deploy

**Timeline:** 2-3 giorni da reception a production

---

## File Size Budget

### Per Page

**Homepage:**
- Images: 8-10 immagini = ~1.5 MB (optimized)
- Video: 1 hero video 1080p = ~20 MB (lazy load)
- Total: ~22 MB first load (acceptable per luxury site)

**Product Page:**
- Images: 15-20 immagini = ~2 MB
- Video: 1 product video 30s = ~8 MB (lazy)
- Total: ~10 MB first load

**Guide Pages:**
- Images: 5-8 immagini = ~800 KB
- Video: 0
- Total: ~800 KB

**Overall site budget:** <50 MB total assets (per cache warming)

---

## Performance Optimization Checklist

### Images
- [ ] All images usando Next.js Image component
- [ ] WebP format generated per tutti JPEG
- [ ] Blur placeholder per lazy-loaded images
- [ ] Sizes prop appropriato per responsive
- [ ] Priority solo su above-fold (hero images)

### Videos
- [ ] Multiple resolutions (1080p, 720p)
- [ ] Poster image sempre presente
- [ ] Muted + playsinline per autoplay
- [ ] Lazy load se below fold
- [ ] Preload="metadata" (not auto)

### Fonts
- [ ] Self-hosted (no Google Fonts CDN)
- [ ] Subset solo characters necessary (Latin + Italian)
- [ ] Font-display: swap (FOUT acceptable per performance)
- [ ] Preload font files critici

---

## Quality Assurance

### Image QA Checklist

Per ogni immagine prodotto:
- [ ] Focus sharp (no blur accidentale)
- [ ] Color accurate (match prodotto reale)
- [ ] Lighting consistent (across product line)
- [ ] Composition aligned (rule of thirds, negative space)
- [ ] File size optimized (<300KB per web version)
- [ ] Alt text present e descrittivo

### Video QA Checklist

Per ogni video:
- [ ] Audio sync (voce + lip OR musica + visual)
- [ ] Color grading consistent (brand aesthetic)
- [ ] No artifacts (compression artifacts, banding)
- [ ] Smooth playback (no stuttering)
- [ ] Captions/subtitles (se voice-over presente)
- [ ] End card with CTA visible e readable

---

## Content Delivery Network (CDN) Setup

### Phase 1: Local Serving (Current)

**Setup:** Assets served da Next.js public folder
**Cache:** Browser cache + Next.js automatic optimization
**Performance:** Good per low-medium traffic

### Phase 2: CloudFlare CDN (Future)

**When:** Traffic >5k visitors/mese

**Setup:**
1. Domain already on Cloudflare (fodivps2.cloud)
2. Enable "Cache Everything" page rule per `/uploads/*`
3. Set Browser Cache TTL: 1 year
4. Enable Auto Minify (CSS, JS, HTML)
5. Enable Brotli compression

**Result:** Assets cached at edge, latency ridotta 60-80%

---

## Monitoring & Analytics

### Asset Performance Tracking

**Metrics da tracciare:**
- **LCP (Largest Contentful Paint):** Should be <2.5s
  - Usually hero image/video
  - If >2.5s → optimize image OR defer video

- **Image load time:** Track per category
  - Product images: Should load <1s
  - Process images: Can lazy load <2s

- **Total page weight:** Target <3 MB per page (including assets)

**Tools:**
- Lighthouse (weekly audit)
- WebPageTest (monthly deep dive)
- Vercel Analytics (real user monitoring)

---

## Migration Plan (Quando Nuove Foto/Video Pronte)

### Step 1: Backup Current Assets

```bash
cd /var/www/projects/oz
tar -czf public-uploads-backup-$(date +%Y%m%d).tar.gz public/uploads/
mv public-uploads-backup-*.tar.gz ~/backups/oz/
```

### Step 2: Replace Assets

**Strategia:** Graduale, non big bang

**Week 3:**
- Replace homepage hero video
- Replace 3 product hero images (1 per fragranza)

**Week 4:**
- Replace remaining product images
- Add new founder portraits
- Add process/BTS imagery

**Why gradual:** Permette di testare impact, rollback facile se issues

### Step 3: Update References

**Automatic:** Se mantieni same filenames (es. `cristallo/hero-1.jpg`)
**Manual:** Se cambi naming (update in data/products.ts)

### Step 4: Purge Cache

```bash
# Clear Next.js cache
rm -rf .next/cache

# Rebuild
npm run build

# If using Cloudflare, purge CDN
# (API call OR dashboard)
```

---

## Legal & Licensing

### Asset Rights

**Photography:**
- **Usage rights:** Perpetual, worldwide, all media
- **Ownership:** Cliente owns finals (photographer keeps RAW per portfolio)
- **Model releases:** Required se persone riconoscibili (Zoe firma, models firmano)

**Video:**
- Same as photography
- **Music:** Check license (Artlist = commercial use OK)

**Stock assets (se usati):**
- **License type:** Extended (commercial use, high distribution)
- **Attribution:** Check se required (most paid licenses = no attribution)

### Privacy & GDPR

**Se fotografiamo persone (non Zoe):**
- Model release firmato (consent uso immagine per marketing)
- GDPR compliance (diritto rimozione se richiesto)
- Store releases per min 3 anni

---

## Next Steps Week 2

### Immediate Actions

1. ✅ Asset structure documented (questo file)
2. → Create directories in `/public/uploads/`
3. → Setup optimization scripts
4. → Configure Next.js images config
5. → Book photographer/videographer (external)

### Day-by-Day Plan

**Day 1-2:** Photographer/videographer booking + contract
**Day 3:** Location scout + prop sourcing
**Day 4:** Shot list final review
**Day 5-6:** Photography shooting (2 giorni)
**Day 7-8:** Video shooting (2 giorni)
**Day 9-11:** Photo editing delivery
**Day 12-14:** Video editing delivery

**End of Week 2:** All new assets ready for Week 3 integration

---

**Document status:** ✅ COMPLETE
**Review required:** Project Manager / Budget Approval
**Implementation:** Ready to start

---

*Asset Management Docs — OZ Extrait Week 2*
