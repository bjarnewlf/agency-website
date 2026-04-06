# Changelog

## 2026-04-06 — Tuning-Sprint (Session heute)

### Neu

- **BigBangHero** — Urknall-Effekt als neues Hero-Konzept. ScrollTrigger-Pin + scrub: schwarzer Screen, "0." als Singularität, Lichtburst aus der Mitte, Headline explodiert rein, Übergang zu hellem Design. Ersetzt Hero.tsx.
- **Navbar Dark-Phase** — Navigation erkennt beim Seitenstart den dunklen Hero-Hintergrund und wechselt auf `rgba(0,0,0,0.35)` + weißer Schrift. Smooth Transition zu hellem Design beim Scrollen.
- **MagneticButton auf CTAs** — Beide Hero-CTAs ("Projekte ansehen", "Projekt starten") und Contact-CTA mit GSAP-Proximity-Magnetismus gewrappt.
- **Services Row Hover** — Hover-State auf Service-Rows: Ziffer leuchtet auf, Titel wird lila, Pfeil translateX. Touch-Feedback für Mobile via `onTouchStart`/`onTouchEnd`.
- **BridgeSection** — Positionierungssatz zwischen Hero und Work: *"Eine Agentur. Ein Entwickler. KI als Werkzeug, nicht als Buzzword."*
- **AboutSection** — Reaktiviert mit echtem Inhalt: drei Blöcke Wer / Wie / Warum. Zwischen Services und Contact eingebunden.
- **Favicon SVG** — "0." als SVG-Favicon in `/public/favicon.svg`, in `layout.tsx` referenziert.

### Geändert

- **ContactSection** — Subtext: *"Kein Pitch-Deck. Kein Formular. Einfach schreiben."*
- **Hero-Subline** — Von "Design und Engineering ohne Kompromiss." zu *"KI-Produkte. Gebaut, nicht geplant."*
- **Services-Texte** — Alle drei Services geschärft: "Interface Design" → "Produkt & Interface", "Strategie & Aufbau" → "Technische Strategie". Beschreibungen konkreter.
- **Work-Kartentext** — *"Erste Projekte in Entwicklung. Case Studies folgen, wenn sie fertig sind — nicht vorher."*
- **Smart Navbar** — Hide/Show beim Scrollen (GSAP pixelbasiert, aus vorheriger Session).
- **Animated Grid** — Infinite Grid mit Spotlight-Reveal per Radial-Gradient-Maske auf Mausposition (Framer Motion SVG, aus vorheriger Session).

### Entfernt

- `Hero.tsx` — durch BigBangHero ersetzt
- `HeroAnimations.tsx` — nicht mehr benötigt
- Fake-Projekte aus `content.ts` (`VetConnect`, `Horizon Dashboard`, `Meridian Brand`)

---

**Statistik**
- 10 Commits diese Session
- tsc: Clean
- Build: Clean (Vercel)

---

## 2026-04-06 — Upgrade-Sprint Session

Website durchlief zwei Phasen heute: grosse Redesign-Umsetzung in der Nacht (Hybrid E+A Design mit typografischer Dramatik), dann Feinschliff mit interaktiven Elementen (animiertes Grid, Custom Cursor, Performance-Tuning).

### Neu

- **Impressum + Datenschutzerklärung** — Vollstaendige DSGVO/TMG-Compliance hinzugefügt. Statische Seiten unter `/impressum` und `/datenschutz` mit Hosting-Details (Vercel), Datenschutzbeauftragter (ULD Kiel), Haftungsausschlüsse. Footer mit entsprechenden Links erweitert.
- **Animated Grid Background** — Subtiles 60px-Grid-Pattern mit Indigo-Linien ueber gesamte Website (nicht nur Hero). Mit Randmasken-Effekt und Breathing-Aurora-Glow dahinter. Global als fixed Layer, nicht sticky Hero-Element mehr.
- **Custom Cursor Upgrade** — Eigener Cursor mit reduzierten Latenz (0.15s statt 0.35s) fuer responsiveres Feeling. Grid-Background-Sichtbarkeit verdoppelt (Opacity-Anpassung).

### Geaendert

- **Website-Redesign (Hybrid E+A Tonalitaet)** — Grosse visuelle Restrukturierung:
  - Hero-Section jetzt links-ausgerichtet mit typografischer Dramatik
  - Services als nummerierte Liste (statt alte Kachel-Struktur)
  - Work-Section asymmetrisch (65/35-Layout)
  - AboutSection entfernt
  - CTA-Section neu hinzugefügt
  - Waermeres Off-White, erweiterter Whitespace, schaerfere Typografie-Hierarchie
- **GSAP Visibility Bug Fix** — Content war bei langer JS-Ladezeit unsichtbar. CSS-Animation-States (opacity:0) greifen jetzt erst nach `js-ready` Klasse. Verhindert weisse Seite bei verzögerten GSAP-Load.

### Entfernt

- AboutSection Component (als Teil des Redesigns)
- Hero Gravitationsfeld (durch Grid+Aurora-Glow ersetzt)

---

**Statistik**
- 7 Commits
- 19 Dateien geaendert (3.239 Zeilen hinzugefügt, 325 entfernt)
- Design-Sprint-Dokumentation hinzugefügt (Bewertung, Research-Briefing, Screen-Stitches)

**Getestet & freigegeben**
- TypeScript: Clean
- Build: Clean
- QA: Reviewed
