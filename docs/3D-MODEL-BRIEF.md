# OZ Extrait - 3D Bottle Models Brief

## Project Overview

E-commerce luxury perfume brand requiring 3D models of product bottles for interactive web viewer.

**Website:** https://oz.fodivps2.cloud (in development)
**Target:** Premium luxury aesthetic, Cartier/Dior level quality

---

## Models Required (3 bottles)

### 1. Cristallo (Flagship)
**Reference:** Modern minimalist bottle, clear glass
- **Shape:** Cylindrical, clean lines, flat surfaces
- **Cap:** Gold metallic screw cap (brushed finish)
- **Label:** Minimal gold text "CRISTALLO OZ" embossed/printed
- **Size:** ~100ml standard perfume bottle proportions
- **Priority:** HIGH (used in 3D viewer demo)

### 2. Scintilla
**Reference:** Elegant square bottle
- **Shape:** Square base, slightly tapered neck
- **Cap:** Rose gold metallic cap
- **Label:** "SCINTILLA OZ" with subtle pattern
- **Size:** ~50ml
- **Priority:** MEDIUM

### 3. Potion d'Amour
**Reference:** Romantic rounded bottle
- **Shape:** Rounded/oval body, feminine curves
- **Cap:** Gold ornate cap with decorative top
- **Label:** "POTION D'AMOUR OZ" script font
- **Size:** ~75ml
- **Priority:** MEDIUM

---

## Technical Specifications

### File Format
- **Primary:** GLTF 2.0 (.glb binary)
- **Compression:** Draco compression enabled
- **File size:** <2MB per model (target: 1-1.5MB)

### Geometry
- **Polygon count:** ~5,000-8,000 tris per bottle (balance quality/performance)
- **Components:** Separate meshes for:
  - Bottle body (glass)
  - Cap (metal)
  - Label (decal/texture)
  - Liquid inside (optional, simple geometry)

### Materials (PBR)
**Bottle Glass:**
- Material: Transmission/Refraction material
- IOR: 1.5 (glass refractive index)
- Roughness: 0.05 (very smooth)
- Transmission: 0.95
- Color: Clear/transparent with slight blue-green tint

**Cap (Metallic):**
- Material: Metallic PBR
- Metallic: 1.0
- Roughness: 0.2-0.3 (brushed metal)
- Base color: Gold RGB(212, 175, 55) or Rose Gold RGB(183, 110, 121)

**Label:**
- Material: Diffuse with alpha mask
- Texture: 2K resolution PNG (1024x1024 or 2048x2048)
- Text: Embossed normal map for depth
- Color: Gold text on transparent/white background

**Liquid (optional):**
- Material: Translucent shader
- Color: Amber/gold tint
- Opacity: 0.8
- Simple geometry (cylinder/capsule)

### Textures
- **Resolution:** 2K (2048x2048) maximum
- **Format:** PNG or JPEG (PNG for alpha)
- **Maps required:**
  - Base Color (albedo)
  - Normal map (for label embossing)
  - Metallic map (for cap)
  - Roughness map
  - Alpha mask (for label)
- **Optimization:** Compress textures, use texture atlas if possible

### UV Mapping
- Clean UV unwrap
- No overlapping UVs
- Efficient texture space usage

### Pivot/Origin
- Origin at bottle base center (0,0,0)
- Upright orientation (Y-up axis)
- Scale: Real-world units (bottle ~12-15cm height)

---

## Reference Images Needed

**Placeholder reference (create based on these guidelines):**
- Modern luxury perfume bottle aesthetics
- Clean, minimalist design
- High-end brand feel (Chanel, Dior, Tom Ford style)
- Gold/metallic accents
- Transparent glass with refraction

**Inspiration brands:**
- Chanel Coco Mademoiselle (bottle shape)
- Dior Sauvage (minimalist aesthetic)
- Tom Ford Private Blend (luxury feel)

---

## Lighting Setup (for preview renders)

**Recommended lighting for test renders:**
- Studio lighting (3-point setup)
- Gold rim light (warm 3000K)
- Environment map: Studio HDRI
- Background: Neutral gradient (dark to light)

**Camera:**
- Perspective camera
- FOV: 35-50mm equivalent
- Angle: Slight 3/4 view showcasing bottle + cap

---

## Deliverables

### For Each Model (3 total):
1. **.glb file** (Draco compressed, <2MB)
2. **Texture files** (separate PNG/JPEG, organized)
3. **Preview renders** (PNG, 1920x1080):
   - Front view
   - 3/4 view
   - Back view
   - Top view (cap detail)
4. **Wireframe screenshot** (topology reference)

### Bonus (optional):
- Blender/Maya source file (.blend, .ma)
- Material setup guide (for tweaking)

---

## Technical Testing Checklist

Before delivery, please verify:
- [ ] Model loads in Three.js viewer (test in gltf-viewer.donmccurdy.com)
- [ ] File size <2MB (Draco compressed)
- [ ] Polygon count within spec (~5-8K tris)
- [ ] Glass material shows refraction
- [ ] Metallic cap reflects environment
- [ ] Label texture readable at distance
- [ ] No texture seams visible
- [ ] UV layout clean (no overlaps)
- [ ] Origin at base center (0,0,0)
- [ ] Upright orientation (Y-up)

---

## Budget & Timeline

**Budget:** €300-600 (€100-200 per model)
- Cristallo (priority): €150-200
- Scintilla + Potion d'Amour: €75-200 each

**Timeline:**
- **Concept/Sketches:** 2-3 days (awaiting approval)
- **Model Draft 1:** 5-7 days
- **Revisions:** 2-3 days (1-2 revision rounds)
- **Final delivery:** 10-14 days total

**Milestones:**
1. Concept approval (sketches/reference)
2. First draft Cristallo model (priority)
3. Revision + approval Cristallo
4. Draft Scintilla + Potion d'Amour
5. Final delivery all 3 models

---

## Integration Notes (for developer reference)

**Three.js implementation:**
```javascript
import { useGLTF } from '@react-three/drei'

function BottleModel({ modelPath }) {
  const { scene } = useGLTF(modelPath)
  return <primitive object={scene} />
}

// Usage
<BottleModel modelPath="/models/cristallo.glb" />
```

**Lighting setup (code):**
```javascript
<ambientLight intensity={0.3} />
<spotLight position={[5, 5, 5]} intensity={1} angle={0.3} penumbra={1} castShadow />
<spotLight position={[-5, 2, -5]} intensity={0.5} color="#D4AF37" />
<Environment preset="studio" />
```

---

## Contact & Questions

**Point of contact:** [Developer name]
**Project repo:** GitHub (private)
**Questions?** Ask before starting modeling to avoid revisions

---

## Platform Recommendations

**Where to find 3D artists:**
1. **Fiverr:** Search "3D product modeling GLTF" ($100-300)
2. **Upwork:** Post job "Luxury perfume bottle 3D modeling"
3. **CGTrader Studio:** Professional product visualization artists
4. **ArtStation:** Hire section (portfolio review first)
5. **Blender Artists Forum:** Freelance section

**Keywords for search:**
- "3D product modeling"
- "GLTF GLB"
- "PBR texturing"
- "Luxury product visualization"
- "E-commerce 3D"

---

**Next step:** Review this brief, provide/approve reference images for bottles, then post job on preferred platform.
