# Tasks — Agency Website

## SOFORT
- [ ] Agentur-Name festlegen — ueberall noch "Studio" als Platzhalter
- [ ] Hero-CTA Button — User landet in Headline ohne Handlungsaufforderung (Designer)
- [ ] Footer anlegen — rechtlich in DE relevant (Impressum!) (Designer)
- [ ] Im Browser testen: Kontrast-Aenderungen + Animationen pruefen

## BALD
- [ ] page.tsx refactoren — Sections in eigene Komponenten, ~70% Inline-Styles raus (Architekt S1)
- [ ] Daten aus page.tsx extrahieren nach `src/data/content.ts` (Architekt S2)
- [ ] Token-Doppeldefinition aufloesen — @theme vs :root, Single Source of Truth (Architekt S4, Designer)
- [ ] font-family Inline-Strings entfernen — 20x copy-pasted, globals.css definiert es bereits (Designer)
- [ ] Hover-States auf Cards und Buttons (Designer)
- [ ] Section-H2-Groesse reduzieren — kaempft mit Hero-H1 um Aufmerksamkeit (Designer)
- [ ] Grid-Items einzeln mit [data-animate] taggen statt Grid-Wrapper (Designer)
- [ ] Service-Icon rgba(0.1) auch auf --accent-subtle umstellen

## Diese Woche
- [ ] Page Transitions (GSAP — Researcher-Empfehlung)
- [ ] Echte Inhalte: Services definieren + einfuegen
- [ ] Echte Inhalte: Work/Case Studies mit echten Projekten
- [ ] About-Texte schreiben
- [ ] Contact-Formular (Formspree/Resend)
- [ ] Mobile Menu Transition (Animation statt hartes Toggle)
- [ ] Custom Cursor + magnetische Buttons (Researcher: ~80 Zeilen, GSAP, kein extra Package)
- [ ] Lenis auf Mobile deaktivieren — nativ scrollen lassen (Researcher)

## Backlog
- [ ] Hardcodierte Farben in Hero durch Design-Tokens ersetzen (Architekt S5)
- [ ] Text-Split-Reveals (Researcher: groesster Quick-Win fuer Godly-Level)
- [ ] Parallax-Effekte (scroll-basiert, GSAP)
- [ ] Case Study Template + VetApp Showcase
- [ ] 3D-Tilt Cards fuer Projekte
- [ ] Horizontal Scroll fuer Case Studies
- [ ] Text Scramble Effekte (Nav, Headlines)
- [ ] Mobile Responsive Feinschliff
- [ ] SEO + Meta Tags + OG Images
- [ ] Analytics (Plausible/Umami)
- [ ] Domain + Deployment (Vercel)
- [ ] Blog (optional, spaeter)
- [ ] prefers-reduced-motion respektieren (Researcher)
- [ ] data-reveal-delay umbenennen: -ms vs -index (Designer)
- [ ] ScrollLine Keyframe vereinfachen (Designer)
- [ ] Section-Padding auf clamp() fuer Mobile (Designer)
- [ ] Work-Cards minmax-Fix fuer Mobile (Designer)
- [ ] About-Text maxWidth: 640px (Designer)

## Erledigt
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
- [x] Lenis/ScrollTrigger Bridge gefixt (QA F3/F4)
- [x] useGSAP Hook Bug gefixt (ctx Zirkelverweis)
- [x] Farbkontraste WCAG AA gefixt (--accent, --text-secondary, --accent-subtle Token)
- [x] focus-visible Styling ergaenzt
- [x] Leeren animations/index.ts + Ordner entfernt
- [x] scrollLine Keyframes von Hero.tsx nach globals.css verschoben
- [x] Hero-Gradient-Farben auf neue Accent-Werte aktualisiert
- [x] Badge-Backgrounds: hardcodiertes rgba durch var(--accent-subtle) ersetzt

## Quellen
- QA-Findings: `qa-findings.md`
- Design-Review: `design-review.md`
- Architektur-Review: `architektur-review.md` (Workspace-Root)
- Animation-Research: `research-animation-stack.md` (Workspace-Root)
