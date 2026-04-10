# Tasks — Agency Website

> Zuletzt abgeglichen: 2026-04-06 (nach Bugfix-Session)

## SOFORT
- [x] Page Transitions auf nullpunkt.cc live testen (Homepage ↔ Impressum/Datenschutz)
- [x] Favicon SVG aktiv (favicon.ico default entfernt)
- [x] OG-Image als PNG (war SVG — Social Media inkompatibel)
- [x] About-Section content sichtbar (fehlte in ScrollAnimations)
- [x] WorkSection REFERENZEN Padding-Bug gefixt

## Diese Woche

### Mobile
- [ ] **Lenis auf Mobile deaktivieren** — `matchMedia('(hover: none)')` oder Breakpoint-Check in `useLenis.ts`
- [ ] **Mobile Menu Transition** — aktuell CSS (`max-height + opacity`), auf GSAP umstellen

### Formulare & Infrastruktur
- [ ] **Contact-Formular** — aktuell `mailto:`, auf Formspree oder Resend umstellen
- [ ] **Analytics** — Plausible oder Umami einbinden

### SEO
- [ ] **SEO Meta Tags** — Homepage + Impressum + Datenschutz haben Metadata ✅, bei neuen Seiten direkt ergänzen

## Backlog
- [ ] Echte Inhalte — Work/Case Studies (wenn VetApp fertig)
- [ ] About-Texte schärfen
- [ ] Case Study Template + VetApp Showcase
- [ ] Horizontal Scroll für Case Studies
- [ ] 3D-Handy-Showcase (scroll-triggered, GSAP/Three.js)
- [ ] Parallax-Effekte (scroll-basiert, GSAP)
- [ ] Text Scramble Effekte
- [ ] Mobile Responsive Feinschliff
- [ ] Section-Padding auf clamp() für Mobile
- [ ] prefers-reduced-motion — TransitionProvider ✅, restliche Animationen prüfen

## Erledigt (2026-04-06 Abend-Session 4 — Tuning-Sprint)
- [x] Navbar Dark-Phase (transparent + weiß beim BigBang-Hero)
- [x] MagneticButton auf Hero-CTAs + Contact-CTA
- [x] Services Row Hover (Desktop + Mobile Touch)
- [x] ContactSection Text + MagneticButton
- [x] Favicon SVG (`/public/favicon.svg`, in layout.tsx)
- [x] Hero.tsx + HeroAnimations.tsx gelöscht
- [x] Inhalte geschärft (Services, Hero-Subline, Work, Bridge, About)
- [x] OG Image SVG + OpenGraph-Metadata in layout.tsx
- [x] Page Transitions "Ink Bleed" implementiert (TransitionProvider, TransitionLink, PageTransitionOverlay)
- [x] prefers-reduced-motion in TransitionProvider
- [x] Custom Cursor Fix — kein Upscaling mehr

## Erledigt (2026-04-06 Abend-Session 3)
- [x] Framer Motion neu installiert
- [x] Grid: Infinite-Grid mit Spotlight-Reveal
- [x] Smart Navbar: hide/show on scroll (GSAP)
- [x] MagneticButton.tsx: Proximity-basiert
- [x] Word-Split-Reveal für Section-Headlines

## Erledigt (2026-04-06 Tag-Session)
- [x] GitHub Repo + Vercel deployed: nullpunkt.cc live
- [x] DNS gefixt
- [x] Redesign umgesetzt
- [x] GSAP Visibility-Bug gefixt
- [x] Impressum + Datenschutz Seiten (inkl. Metadata)
- [x] SEO Metadata Homepage + Subpages
- [x] BigBangHero.tsx: Urknall-Effekt

## Quellen
- QA-Findings: `qa-findings.md`
- Design-Review: `design-review.md`
- Vault: Markenidentität, Domain-Entscheidung, Agentur-Name
