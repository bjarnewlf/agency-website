# Tasks — Agency Website

## SOFORT
- [ ] Agentur-Name festlegen — ueberall noch "Studio" als Platzhalter
- [ ] Hero-Canvas daempfen — weniger Schimmern (Claas-Feedback v2-Konzept)

## BALD
- [ ] Gedaempftes v2-Konzept in Next.js uebertragen (Canvas-Hero + Bento-Grid zuerst)
- [ ] Token-Doppeldefinition aufloesen — @theme vs :root, Single Source of Truth (Architekt S4)
- [ ] --accent-subtle in @theme Block ergaenzen
- [ ] Impressum-Seite anlegen (rechtlich noetig)
- [ ] Datenschutz-Seite anlegen
- [ ] Social Links mit echten URLs befuellen (GitHub, LinkedIn)

## Diese Woche
- [ ] Page Transitions (GSAP — Researcher-Empfehlung)
- [ ] Echte Inhalte: Services definieren + einfuegen
- [ ] Echte Inhalte: Work/Case Studies mit echten Projekten
- [ ] About-Texte schreiben
- [ ] Contact-Formular (Formspree/Resend)
- [ ] Mobile Menu Transition (Animation statt hartes Toggle)
- [ ] Custom Cursor + magnetische Buttons (~80 Zeilen, GSAP)
- [ ] Lenis auf Mobile deaktivieren — nativ scrollen lassen

## Backlog
- [ ] prefers-reduced-motion im HTML-Konzept + Next.js respektieren
- [ ] Focus-visible Styling im HTML-Konzept
- [ ] Mobile Nav im HTML-Konzept (Hamburger)
- [ ] Hardcodierte Farben in Hero durch Design-Tokens ersetzen
- [ ] Text-Split-Reveals (groesster Quick-Win fuer Godly-Level)
- [ ] Parallax-Effekte (scroll-basiert, GSAP)
- [ ] Case Study Template + VetApp Showcase
- [ ] Horizontal Scroll fuer Case Studies
- [ ] Text Scramble Effekte (Nav, Headlines)
- [ ] Mobile Responsive Feinschliff
- [ ] Section-Padding auf clamp() fuer Mobile
- [ ] Work-Cards minmax-Fix fuer Mobile
- [ ] SEO + Meta Tags + OG Images
- [ ] Analytics (Plausible/Umami)
- [ ] Domain + Deployment (Vercel)
- [ ] Blog (optional, spaeter)
- [ ] data-reveal-delay umbenennen (-ms vs -index)
- [ ] ScrollLine Keyframe vereinfachen

## Erledigt
- [x] Redesign v2 HTML-Konzept erstellt (Auros-inspiriert, alle 10 Elemente)
- [x] Auros-Website recherchiert und analysiert
- [x] HTML-Plan updaten mit Godly-Inspirationen
- [x] Light-Version des Plans erstellt
- [x] Design-Entscheidung: Light Theme statt Dark
- [x] Next.js Projekt scaffolden
- [x] Design-System aufsetzen (Light Theme)
- [x] Hero Section bauen
- [x] Navigation bauen
- [x] Platzhalter-Sections mit Content
- [x] Scroll-Bug fixen
- [x] GSAP Text-Reveal auf Hero-Headline
- [x] ScrollTrigger Einblendungen fuer Sections
- [x] Lenis/ScrollTrigger Bridge gefixt
- [x] useGSAP Hook Bug gefixt
- [x] Farbkontraste WCAG AA gefixt
- [x] focus-visible Styling ergaenzt
- [x] Leeren animations/index.ts + Ordner entfernt
- [x] scrollLine Keyframes nach globals.css verschoben
- [x] Hero-Gradient-Farben aktualisiert
- [x] Badge-Backgrounds: var(--accent-subtle)
- [x] page.tsx refactored — Sections in Komponenten, Daten separiert, Tailwind statt Inline
- [x] Hero-CTA (Primary + Secondary Link)
- [x] Footer mit Copyright, Impressum, Social-Links
- [x] Hover-States auf Cards + Buttons
- [x] Section-H2 Groesse reduziert
- [x] Grid-Items einzeln animiert
- [x] About-Text max-width
- [x] Service-Icon-Box auf --accent-subtle
- [x] Framer Motion entfernt

## Quellen
- QA-Findings: `qa-findings.md`
- Design-Review: `design-review.md`
- Architektur-Review: `architektur-review.md` (Workspace-Root)
- Animation-Research: `research-animation-stack.md` (Workspace-Root)
- Auros-Analyse: Im Agency-Vault archiviert
