# Handoff — Agency Website

## Zuletzt geaendert: 2026-04-05

## Was wurde gemacht

### Light Theme Design-System
- `src/app/globals.css` — Komplette Farbpalette von Dark "Obsidian" auf Light umgestellt
  - Bg: #F5F5F7, Surface-1: #FFFFFF, Surface-2: #EBEBF0
  - Text-Primary: #0A0A0F, Text-Secondary: #6B6B7E
  - Accent bleibt: #6366F1 / #818CF8
  - Border-Token: rgba(0,0,0,0.06)
  - Shadow-Tokens neu: --shadow-sm, --shadow-md, --shadow-lg (subtil, fuer helles Theme)
  - Alles in @theme UND :root Custom Properties

### Hero Component
- `src/components/Hero.tsx` — Server Component (kein 'use client' noetig, keine Browser-APIs)
  - Syne-Headline mit clamp(3.5rem, 10vw, 9rem), letterSpacing -0.04em
  - Dreizeilig: "We craft / digital / experiences." — mittlere Zeile in Accent-Gradient
  - RevealLine-Wrapper mit data-reveal-line / data-reveal-text fuer spaetere GSAP-Anbindung
  - data-reveal-element + data-reveal-delay Attribute auf allen Elementen
  - Subtiles Grid-Pattern im Hintergrund (Accent, 5% Opacity)
  - Dezenter Radial-Glow in Mitte (7% Opacity)
  - Scroll-Hint: "SCROLL" Label + animierte Linie (scrollLine Keyframe)

### Navigation Component
- `src/components/Navigation.tsx` — Client Component ('use client', useState fuer Hamburger)
  - Frosted Glass: rgba(255,255,255,0.75) + backdrop-filter: blur(20px)
  - Logo "Studio" links — Syne, 800 weight
  - Nav-Links rechts: Work, Services, About, Contact — hover via inline event handler
  - Mobile Hamburger: animiert (Kreuz-State), min. 44px Touch-Target
  - Mobile Menu: Overlay unterhalb Nav

### Scroll-Bug Fix + Sections (2026-04-05)
- `src/app/globals.css` — `html, body { height: 100% }` entfernt (F1: Scroll-Bug kritisch)
  - Lenis-Regeln (html.lenis body { height: auto }) bleiben unveraendert
- `src/lib/hooks/useLenis.ts` — `'use client'` Direktive entfernt (F2: Anti-Pattern)
  - RAF-Cleanup-Logik gefixt: rafId jetzt als let-Variable, wird in der raf-Funktion aktualisiert (F4)
- `src/app/page.tsx` — Alle vier Platzhalter-Sections mit Inhalt befoellt (F3):
  - Work: "Selected Work" + 3 Projekt-Cards (Bild-Platzhalter, Titel, Tags)
  - Services: "What we do" + 6 Service-Items (Icon-Platzhalter, Titel, Beschreibung)
  - About: "About us" + Text-Block + 4 Stats (50+ Projects, 5 Years, etc.)
  - Contact: "Let's talk" + CTA-Text + E-Mail-Button (mailto:hello@agency.dev)

## Type-Check
Bestanden — 0 Fehler

## Offene Punkte
- GSAP Text-Reveal Animation verdrahten (data-Attribute sind bereit)
- Nav: active state beim Scrollen (IntersectionObserver — Developer-Aufgabe)
- Hero-Headline Platzhalter ("We craft digital experiences") durch finalen Text ersetzen sobald Name/Brand steht
- Logo "Studio" durch echtes Logo ersetzen
- Mobile Menu: Transition/Animation (aktuell hartes Einblenden)
- Custom Cursor aus Light-Plan noch nicht umgesetzt (Scope-Entscheidung offen)
- Contact-Section: E-Mail (hello@agency.dev) ist Platzhalter — durch echte Adresse ersetzen
- F5 (redundante Turbopack-Config in next.config.ts) ist niedrig priorisiert, noch offen

## Naechster Schritt
Scroll testen im Browser — Hero -> Work -> Services -> About -> Contact sollte jetzt durchgaengig scrollbar sein. Dann GSAP-Reveals oder echte Inhalte einpflegen.
