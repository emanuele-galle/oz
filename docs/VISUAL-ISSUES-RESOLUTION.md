# Visual Issues Resolution — OZ Extrait

**Data:** 30 Gennaio 2026
**Status:** IDENTIFIED & FIXING

---

## Problema Identificato

**Sintomo:** Testo bianco appare su sfondi chiari = quasi invisibile

**Causa Root:**
- Body ha `background: #000` e `color: #fff`
- Alcune sezioni hanno background transparent (ereditano nero del body = OK)
- ALTRE sezioni hanno background CHIARO (beige, cream) MA testo eredita ancora white dal body = PROBLEMA

**Sezioni Problematiche:**
- Testimonials section (sfondo chiaro con testo bianco)
- Alcuni elementi nelle altre sezioni

---

## Soluzione

**Approach:** Aggiungere text color ESPLICITO su TUTTE le sezioni con background chiaro.

**Non toccare:** Body styles (lasciamo background #000, color #fff)

**Fixare:** Ogni componente/sezione con background chiaro deve avere text-stone-700 o simile ESPLICITO.

---

## Implementation Plan

Invece di modificare globals.css (non funziona per specificità Tailwind),
modifico direttamente i componenti problematici aggiungendo classi text color esplicite.

Files da controllare e fixare:
- TestimonialsSection.tsx
- Altri componenti con bg chiaro ma senza text color
