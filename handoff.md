# Handoff — Agency Website

## Zuletzt geaendert: 2026-04-05 (Redesign v2 HTML-Konzept + Archivierung)

## Was wurde gemacht

### Redesign Konzept v2 — Auros-inspiriert (2026-04-05)

**Datei:** `C:\Users\claas\claude-workspace\agency-website-redesign-v2.html`

Claas wollte ein HTML-Redesign-Konzept basierend auf der Auros-Website (godly.website/website/auros-215). Die HTML-Konzepte haben sich als besserer Workflow bewaehrt als direkte Implementierung in Next.js.

Standalone HTML-Konzept (kein Framework, kein Build-Step). Einfach im Browser oeffnen.

**Umgesetzte Elemente (alle 10 aus dem Briefing):**
1. Canvas-Hero-Animation — animierte Orbs (Radial-Gradients) + Partikel-Feld, JS Canvas API
2. Gradient-Sweep Button — `background-size: 280%`, `background-position` Shift, 600ms ease
3. CSS Marquee — 2 Reihen (links / reverse), `translateX` Keyframes, 10s linear infinite
4. Bento-Grid Stats — 3x2 Grid, Feature-Cell spannt 2 Reihen, Dark/Light-Kontrast
5. Fluid Typography — alle Font-Sizes via `clamp()`, kein Media-Query fuer Schriftgroessen
6. Glassmorphism Nav — `backdrop-filter: blur(20px)`, scrolled-State via JS
7. Gradient-Text Headlines — `background-clip: text` auf Section-Titles und Hero
8. Scroll-Reveal — IntersectionObserver, gestaffelte Delays 0.1s–0.6s
9. Card Hover-Effekte — `translateY(-8px)`, Border-Color, Shadow, 300ms transitions
10. Custom Cursor — Dot + Ring, Lag-Effekt via RAF, Hover-States auf Interaktionselementen

**Zusaetzlich:**
- 3D-Tilt auf Project-Cards (mousemove rotateX/Y, max 4deg)
- About-Section mit Visual, Badge, Principles-Liste
- Vollstaendige Nav + Footer (dark)
- Alle SVG-Icons inline, kein Image-Tag

**Claas' Feedback:**
- Grundsaetzlich sehr gut ("sieht schon sehr gut aus")
- Hero-Canvas "schimmert" zu stark / ist "bisschen crazy" — beim naechsten Schritt die Animation daempfen (weniger Orbs, geringere Opacity, langsamere Bewegung)

### Fruehere Arbeiten (zusammengefasst)

- Light Theme Design-System aufgesetzt (Indigo-Akzent #6366F1)
- Hero, Navigation, alle Sections implementiert (Next.js)
- GSAP + Lenis Integration gefixt
- WCAG-Kontrast-Fixes, Hover-States, Typografie-Tuning
- page.tsx in Komponenten refactored, Daten separiert
- Zwei HTML-Konzepte erstellt: `agency-website-plan.html` (Dark) + `agency-website-plan-light.html` (Light)

## Offene Punkte
- Hero-Canvas-Animation daempfen (Claas-Feedback: zu viel Schimmern)
- Focus-visible Styling im HTML-Konzept fehlt
- Mobile Nav-Hamburger im HTML-Konzept nicht implementiert
- `prefers-reduced-motion` Guard fuer Canvas-Animation einbauen
- Agentur-Name festlegen (ueberall noch "Studio")
- Impressum + Datenschutz Seiten
- Echte Inhalte (Services, Case Studies, About-Texte)

## Naechster Schritt
Wenn Claas zufrieden ist mit dem gedaempften HTML-Konzept → Elemente schrittweise in die Next.js-Website uebertragen. Canvas-Hero und Bento-Grid zuerst.

## Referenz-Dateien
- HTML-Konzepte: `agency-website-plan.html`, `agency-website-plan-light.html`, `agency-website-redesign-v2.html` (alle im claude-workspace Root)
- Inspiration: https://godly.website/website/auros-215 (Auros)
