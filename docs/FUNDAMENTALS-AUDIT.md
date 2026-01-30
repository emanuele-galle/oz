# Fundamentals Audit — OZ Extrait

**Data:** 30 Gennaio 2026
**Obiettivo:** Identificare e fixare problemi basilari prima di features avanzate

---

## 🔍 Problemi Identificati (da screenshot)

### 1. TYPOGRAPHY
- [ ] Hero title "OZ EXTRAIT" - size sembra OK ma contrast migliorabile
- [ ] Body text sizing inconsistente tra sezioni
- [ ] Line-height troppo tight in alcuni punti
- [ ] Font weight troppo thin in alcune aree

### 2. CONTRAST
- [ ] Alcune sezioni ancora hanno problemi nero/grigio
- [ ] Text gold su backgrounds chiari - verificare WCAG AA
- [ ] White text su alcuni bg grigi - basso contrast

### 3. SPACING
- [ ] Sezioni hanno padding inconsistente
- [ ] Gap tra elementi variabile
- [ ] Trust features cards - spacing interno da migliorare

### 4. COLOR PALETTE
- [ ] Troppi toni di grigio/nero diversi
- [ ] Gold appare in troppi toni
- [ ] Background colors non coerenti

### 5. SECTIONS LAYOUT
- [ ] Hero troppo alta (occupa tutto viewport, content below invisible)
- [ ] Alcune sezioni troppo "vuote" (whitespace eccessivo)
- [ ] Products grid - spacing da ottimizzare

---

## 🛠️ Piano di Fix (Priorità)

### P1 - CRITICI (Fix ora)
1. Contrast audit - fixare text color ovunque
2. Typography sizing - standardizzare
3. Spacing - applicare design tokens consistentemente

### P2 - IMPORTANTI (Dopo P1)
4. Hero height - ridurre a 80vh invece di 100vh
5. Section backgrounds - decidere palette definitiva
6. Product grid layout - ottimizzare

### P3 - POLISH (Dopo P2)
7. Hover states consistency
8. Transitions smoothness
9. Mobile responsive check

---

**Next:** Implementare P1 sistematicamente
