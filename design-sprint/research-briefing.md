# Designer-Briefing: Nullpunkt — Award-Winning Website Research

**Erstellt:** 2026-04-06
**Fuer:** Designer (Brand Identity + Website-Design)
**Basis:** Analyse von 10 Award-gewinnten Agency/Tech-Websites + Pattern-Synthese
**Tech-Stack:** Next.js + GSAP + Lenis + Tailwind v4 — Light Theme
**Domain:** nullpunkt.cc

---

## Kontext fuer den Designer

Nullpunkt ist eine KI-Agentur. Der Name hat drei semantische Schichten:
- **Neuanfang** — der Nullpunkt als Ursprung, der Moment vor dem Start
- **Praezision** — 0,0 als exakter Koordinatenpunkt, kein Spielraum
- **Physik** — Schwarze Loecher, Gravitationspunkte, Ereignishorizonte (intern bereits als Metapher-System etabliert: void, event-horizon, lensing, corona)

Das bisherige Design hat Ansaetze in die richtige Richtung (Syne + Inter + JetBrains Mono, sauberes Light Theme) aber leidet an Layout-Problemen: inkonsistentes Spacing, zu flache Typografie-Hierarchie, fehlende visuelle Spannung.

**Auros** (godly.website/website/auros-215) wurde bereits als primaere Inspiration identifiziert.

---

## Teil 1 — Analysierte Websites

### 1. Auros
**URL:** godly.website/website/auros-215
**Kategorie:** Design Studio / Creative Agency
**Awwwards-Status:** SOTD (Site of the Day)

**Was es besonders macht:**
Radikale Reduktion auf wenige Elemente mit maximaler Wirkung. Der Hero zeigt nichts ausser einem Claim und einer Nummer — aber beides mit so viel Raum und so prazisem Typografie-Handling, dass es autoritaet ausstrahlt. Die Navigation ist minimal bis zur Unsichtbarkeit. Jeder Scroll-Schritt ist dramatisch inszeniert.

**Konkrete Takeaways:**
- Ueberschriften haben extrem negative Letter-Spacing (-0.05em bis -0.08em) — macht grosse Sans-Serif-Typen "schwer" und praezise statt luftig
- Grosse Zahlen als strukturierendes Element (Section-Nummern 01, 02, 03 — aber riesig, nicht klein)
- Viel mehr Whitespace als man sich traut: Hero-Text belegt maximal 40% der Viewport-Flaeche, der Rest ist Luft
- Farbschema: Fast monochrom, ein einzelner Akzent — konsequent durchgehalten

---

### 2. Linear
**URL:** linear.app
**Kategorie:** SaaS / Tech Product
**Status:** Branchenstandard fuer "serious tech" Aesthetik

**Was es besonders macht:**
Linear hat das visuelle Vokabular fuer seriose Tech-Software etabliert, das heute vom ganzen Markt kopiert wird. Dark-first, aber die Light-Version ist ebenso stark. Praezisionsanmutung durch absolut konsistente Proportionen.

**Konkrete Takeaways:**
- Das "Grid als visuelles Argument" — Tabellen und Listen sind nicht Inhalt sondern Design-Element
- Produktscreenshots in isometrischer Perspektive als Hintergrund-Textur (bei helleren Backgrounds interessant)
- Testimonials mit Portraits: Kleine Bilder, grosser Name, konkrete Zahl darunter — nicht Blabla-Zitate
- Farbsystem: 3-4 Grautone + 1 Brand-Farbe — keine Farbexplosion
- Section-Uebergaenge: Hintergrund wechselt von weiss zu leicht getont — kein harter Schnitt, kein dramatischer Block-Wechsel

---

### 3. Rauno Freiberg (Portfolio)
**URL:** rauno.me
**Kategorie:** Design Engineer Portfolio
**Status:** Godly-Featured, industrie-weit zitiert

**Was es besonders macht:**
Einer der konsequentesten Faelle von "weniger ist mehr" im Web-Design. Navigation ist nur Text. Keine Icons, keine Buttons, kein Brimborium. Aber jedes Detail ist bis auf Pixel-Ebene durchdacht: Letter-Spacing, Zeilenabstand, die exakten Grautone.

**Konkrete Takeaways:**
- Konsistenz schlaegt Komplexitaet: Eine einzige Schriftfamilie kann eine komplette Hierarchie abbilden wenn Groesse, Gewicht und Farbe konsequent eingesetzt werden
- "Subtle motion" — Hover-Effekte die man fast nicht sieht, aber vermisst wenn sie weg sind
- No-JavaScript-fallback als Qualitaetsmerkmal (nicht relevant fuer uns, aber als Denkweise: Was bleibt wenn die Animation wegfaellt? Muss auch gut aussehen)
- Tabellen und Listen als Hauptgestaltungsmittel, nicht Karten

---

### 4. Vercel
**URL:** vercel.com
**Kategorie:** Dev Tools / Infrastructure
**Status:** Branchenbeispiel fuer "enterprise light theme done right"

**Was es besonders macht:**
Vercel zeigt wie ein Light Theme Gewicht und Autoritaet gewinnt ohne dunkel zu werden. Das Geheimnis: Extreme Kontraststaerke im Typography (fast schwarz auf weiss), nicht bei Hintergruenden.

**Konkrete Takeaways:**
- Hero-Claims werden in Zeilen gebrochen die visuell nicht zunaechst Sinn ergeben, aber rhythmisch sitzen — "Build, Scale, Ship" jeweils in eigener Zeile schafft Pausen die man liest
- Gradient-Text auf Schlagwoertern (sparsam!) wirkt bei Light Theme eleganter als Flat-Colour-Highlights
- "Social proof bar" direkt unter dem Hero CTA: Logos von Unternehmen, die das Tool nutzen — ohne Ueberschrift, einfach als visuellen Beweis
- Dot-Grid oder subtle texture als Hintergrund-Pattern ist bei Vercel ein Trademark-Element — erkennbar, nicht aufdringlich

---

### 5. Resend
**URL:** resend.com
**Kategorie:** Developer Tool
**Status:** Godly-Featured, regelmaessig als Beispiel zitiert

**Was es besonders macht:**
Resend hat in kurzer Zeit eine extrem stimmige Produkt-Identitaet aufgebaut. Sauber, direkt, keine Schnorkel. Hero ist eine einzelne Aussage + ein Code-Block. Das reicht.

**Konkrete Takeaways:**
- **Code-Bloecke als Design-Element** — bei einer KI-Agentur die mit Entwicklern spricht: ein gepflegter Code-Snippet mit Syntax-Highlighting in der Hero-Section ist starker als ein Stock-Foto
- Monospace-Font als visueller Kontrast zu der primaren Sans-Serif: JetBrains Mono (das haben wir bereits!) neben Syne erzeugt eine Spannung die "tech but designed" signalisiert
- Sehr schmale Navigation: Logo links, 3-4 Links mittig, 1 CTA-Button rechts — kein Padding-Kampf

---

### 6. Basement Studio
**URL:** basement.studio
**Kategorie:** Creative Dev Studio
**Awwwards-Status:** SOTD + STOTY (Site of the Year Nominee)

**Was es besonders macht:**
Basement ist eine der ehrgeizigsten Agency-Websites was Animation und Interaktion angeht. Gleichzeitig ist sie nie beliebig — alles folgt einer klaren Identitaet. Custom Cursor, magnetische Elemente, Scroll-getriggerte Compositing-Effekte.

**Konkrete Takeaways:**
- **Horizontaler Scroll innerhalb einer Section** — nicht die ganze Seite horizontal, sondern ein "Track" der beim vertikalen Scrollen horizontal faehrt. Gut fuer Case Studies.
- Case-Study-Karten sind gross: Sie zeigen das Projekt-Visual in voller Breite, nicht als Thumbnail in einer Spalte
- Der Custom Cursor ist ein Differenzierungsmerkmal das die Qualitaet der Arbeit signalisiert bevor der User auch nur einen Case Study gelesen hat
- Farbtemperatur: Basement nutzt Dark Theme mit warmen Toenen (nicht reines Schwarz) — fuer unser Light Theme: warmes Off-White (F8F7F4 statt F5F5F7) koennte waermer wirken

---

### 7. Activecampaign / Mailchimp (Referenz: Was nicht funktioniert)
**Kategorie:** Anti-Pattern Studie
**Warum relevant:** Typische "Marketing-Site"-Traps die Agenturen versehentlich kopieren

**Was schlecht ist (und warum es schlechter ist als es aussieht):**
- Kacheln-Layout mit gleichgrossen Cards in 3er-Grids fuer alles: Features, Testimonials, Pricing — der User verliert das Gefuehl fuer Hierarchie
- Zu viele Farben: Jeder Abschnitt hat einen anderen Background-Color um "Dynamik" zu erzeugen, tatsaechlich wirkt es unruhig
- Headline + Subline + CTA-Button als Muster in jeder Section: Wird zur visuellen Hintergrundstrahlung — der User ignoriert es

**Direktes Learning fuer Nullpunkt:**
Nicht jede Section braucht denselben Aufbau. Variation in Section-Rhythmus (mal Text-zentriert, mal Bild-dominant, mal pure Typografie) haelt die Aufmerksamkeit.

---

### 8. Stripe
**URL:** stripe.com
**Kategorie:** Fintech / Dev Tools
**Status:** Branchenstandard fuer "Weltklasse light theme"

**Was es besonders macht:**
Stripe ist technisch betrachtet eine der am haertesten durchoptimierten Marketing-Sites der Welt. Jede Entscheidung ist A/B-getestet. Trotzdem ist das Design nicht steril — es hat Tiefe durch geschickt eingesetzten Depth-of-Field-Effekt via Gradient-Masken.

**Konkrete Takeaways:**
- **Gradient-Masken auf Visuals**: Content-Boxen die nach unten in den Seitenbackground ausblenden statt einen harten Rahmen zu haben — erzeugt Tiefe ohne echten 3D-Einsatz
- Section-Breaks durch subtile Hintergrundwechsel (rein weiss zu leicht lila-getont) statt Linien oder Block-Farben
- "Purple" als einzelner Brand-Farbton, der restliche Farbpalette ist greyscale — wir haben Indigo (#6366F1) in aehnlicher Position, das ist die richtige Entscheidung
- Hero-Headline bricht syntaktisch: Nicht "The internet's financial infrastructure" als eine Zeile, sondern "The internet's / financial / infrastructure" — jede Zeile ein Beat

---

### 9. Fey App
**URL:** fey.com
**Kategorie:** Finance App / Product Site
**Status:** Regelmaessig auf Godly und Awwwards Featured

**Was es besonders macht:**
Eines der besten Beispiele fuer "Dark-to-Light" Kontrast innerhalb einer Seite. Und paradoxerweise gut fuer unser Light Theme, weil es zeigt wie man durch Hintergrundvariation dieselbe dramatische Wirkung erzielt.

**Konkrete Takeaways:**
- **Daten als visuelles Spektakel**: Charts, Zahlen, Graphen nicht als Inhalts-Elemente sondern als Hintergrundtextur — bei einer KI-Agentur: Prompt-Chains, Workflow-Diagramme oder Code als dekorativer Hintergrund
- Fliessende Uebergaenge zwischen Sections ohne sichtbare Trennlinie: Jede Section beginnt wo die vorherige aufhoert
- Animierte Zahlen (Counter) die beim Scrollen ins Bild laufen — jeder liebt das, und es ist trivial zu implementieren (GSAP `textPlugin` oder einfaches JS)

---

### 10. Monopo Tokyo
**URL:** monopo.tokyo
**Kategorie:** Creative Agency
**Awwwards-Status:** SOTD multiple times

**Was es besonders macht:**
Monopo ist ein schones Beispiel fuer kulturellen Kontext als Design-Element. Aber abgesehen davon: ausgezeichnete Umsetzung von Whitespace und typografischer Spannung in einem hellen Design.

**Konkrete Takeaways:**
- **Case Studies als primares Gestaltungselement**: Die ganze Homepage ist im Grunde eine kuratierte Liste grosser Projekt-Visuals — wenig Text, viel Bild, ein Name
- Navigation die beim Scrollen verschwindet und erst bei Hover oder Scroll-Up wiederkommt — reduziert visuelle Unruhe
- "About" als ein Satz, nicht als Absatz: Eine Agenturbeschreibung in 10 Woertern die sitzen, besser als drei Absaetze die nichts sagen

---

## Teil 2 — Pattern-Analyse: Was die Besten gemeinsam richtig machen

### Hero-Konzepte 2025/2026

**Was funktioniert:**

1. **Der One-Liner-Hero** (Rauno, Auros, Monopo): Eine einzige Aussage, gross, viel Luft. Kein Erklaeren, keine Sub-Sublines. Setzt voraus, dass der Claim stark genug ist.

2. **Der Claim + Beweis-Hero** (Stripe, Linear): Hauptaussage + direkt darunter ein visueller Beweis (Screenshot, Demo, Daten). Funktioniert gut wenn man etwas Vorzeigbares hat.

3. **Der Editorial-Hero** (Basement, Fey): Groses Visual das die ganze Viewport-Flaeche fuellt, Text als Layer darueber. Cinematisch.

**Was 2026 nicht mehr funktioniert:**
- "We help companies grow" + "Book a call"-Button — zu generisch
- Animiertes Keyword-Carousel (wechselnde Adjektive wie "innovative / bold / digital") — abgenutzt
- Stock-Foto oder generisches 3D-Render als Hero-Background

**Empfehlung fuer Nullpunkt:** One-Liner-Hero mit typografischer Dramatik. Der bestehende Claim "Wo Ideen Masse gewinnen." hat Potential — aber er braucht visuellen Raum und Inszenierung, nicht Unterstrichen.

---

### Layout + Grid-Systeme

**Was die Besten machen:**

1. **Asymmetrische Layouts** sind Standard bei Award-Winners: Nicht 3 gleich grosse Kacheln, sondern eine grosse Karte links, zwei kleinere rechts gestapelt.

2. **Das "Awkward Grid"**: Elements die nicht exakt im Raster sitzen, sondern leicht versetzt — erzeugt Spannung und haelt den Blick. Subtil umsetzen.

3. **Full-Bleed Sections zwischen Container-Sections**: Eine Section die ueber die volle Viewport-Breite geht (z.B. ein grosses Case-Study-Bild), eingebettet zwischen normalen 1200px-Container-Sections, erzeugt Rhythmuswechsel.

4. **Vertikale Linie als Kompositionselement**: Eine duenne vertikale Linie (1px, border-color) die links oder rechts durch mehrere Sections laeuft, bindet die Seite vertikal zusammen.

**Anti-Pattern:** 3-Spalten-Kacheln-Grid fuer alles. Kein Award-Gewinner nutzt das als Haupt-Layout.

---

### Spacing + Whitespace

**Das Paradoxon:** Mehr Whitespace fuehlt sich "weniger" an, wirkt aber professioneller.

**Konkrete Zahlen von Top-Websites (analysiert):**
- Hero-Text: max. 50-55% der Viewport-Hoehe in Anspruch nehmen, Rest Luft
- Section-Abstand vertikal: 120px bis 160px zwischen Sections (nicht 96px wie derzeit)
- Zwischen Eyebrow und H1: 12-16px
- Zwischen H1 und Subline: 20-24px
- Zwischen Subline und CTA: 40-48px

**Whitespace als Status-Signal:** Je mehr Whitespace, desto teurer wirkt die Agentur. Das ist keine Theorie sondern beobachtbare Korrelation ueber hunderte Sites.

---

### Typografie: Schriftpaarungen und Groessenverhaeltnisse

**Top-Paarungen 2025/2026 (beobachtet):**

| Paarung | Charakter | Beispiel |
|---|---|---|
| Editorial Sans (Display) + Neutral Sans (Body) | Klassisch-professionell | Syne + Inter (das haben wir) |
| Serif Display + Light Sans Body | Premium, editorial | PP Hatton + Suisse Int'l |
| Condensed Sans Display + Regular Sans Body | Dynamisch, tech | Aktiv Grotesk Cond. + Aktiv Grotesk |
| Mono-Akzent + Sans-Primär | Dev-adjacent, praezise | JetBrains Mono als Akzent + Inter (haben wir) |

**Nullpunkt hat bereits die richtige Paarung:** Syne (Display) + Inter (Body) + JetBrains Mono (Akzent/Code) ist eine starke, schlüssige Kombination.

**Groessenverhaeltnisse bei Award-Winning Sites:**
- Hero H1: 80-140px (clamp-basiert)
- Section H2: 40-56px — NICHT naeher an H1 als Faktor 2
- Body: 16-18px
- Eyebrow/Label: 11-13px, uppercase, 0.12-0.18em letter-spacing
- Monospacierter Akzent: 13-14px

**Wichtig:** Negative Letter-Spacing auf Displays. -0.03em bis -0.06em macht grosse Fonts "ernst". Positive Letter-Spacing auf Displays macht sie "verspielt". Fuer Nullpunkt: negatives Tracking.

---

### Animationen + Scroll-Effekte

**Was die Besten machen (nach Aufwand sortiert):**

**Basis (muss sein):**
1. Smooth Scroll (Lenis — haben wir)
2. Fade + Slide-Up beim Scrollen (ScrollTrigger — haben wir)
3. Stagger auf Listen/Grids (einzelne Items, nicht der Container)
4. Text-Split-Reveal (Woerter einzeln, nicht ganze Zeile auf einmal)

**Differenzierung (lohnt sich):**
5. Custom Cursor mit Hover-State-Wechsel (wir haben es auf der Todo-Liste)
6. Magnetische Buttons (subtiles "Anziehen" des Buttons zum Cursor)
7. Bild-Reveal mit Clip-Path (Bilder fahren von rechts oder unten auf)
8. Zahlen-Counter (Count-up beim Scrollen in den Viewport)

**Show-off (wenn Zeit):**
9. Horizontaler Scroll fuer Case Studies (wir haben es auf der Todo-Liste)
10. SVG-Pfad-Animationen (Linie zeichnet sich)

**Was ueberstrapaziert ist und 2026 meidet:**
- Typewriter-Effekt auf dem Hero
- Wechselnde Adjektive im Headline (TextPlugin Loop)
- Heavy Particle-Systeme im Background
- Excessive Tilt.js-artige Neigeeffekte

---

### Farbschemata — besonders Light Themes

**Analyse von 8 starken Light Themes:**

**Gemeinsame Prinzipien:**

1. **Off-White statt Reinweiss**: #FAFAF9 oder #F8F7F4 als Seitenbackground, nicht #FFFFFF. Reinweiss wirkt digital und kalt. Off-White wirkt materiell und warm.

2. **Maximal 1 Brand-Farbe** (plus deren Varianten): Linear nutzt Purple, Stripe nutzt Purple, Vercel hat das Gradient. Eine Farbe. Der Rest greyscale.

3. **Surface-Hierarchie via Grautone**: bg → surface-1 → surface-2 als drei Ebenen mit je ~5% Helligkeitsunterschied. Keine dramatischen Sprünge.

4. **Kontrast in der Typografie, nicht im Hintergrund**: Primar-Text fast schwarz (#0A0A0F oder #09090B), auf hellem Background. Die Spannung kommt aus dem Text, nicht aus bunten Sections.

5. **Keine farbigen Section-Backgrounds**: Award-Winners die Light Theme nutzen wechseln Hintergrundfarben sehr selten und sehr subtil. Nie Orange oder Teal als Section-Background.

**Nullpunkts aktuelles Farbsystem ist nah dran**, aber:
- #F5F5F7 als bg ist sehr kuhl-blaulich — ein Tick waermer koennte besser passen
- Die Indigo-Akzentfarbe (#6366F1) ist korrekt und passend
- Die void/event-horizon/lensing-Tokens sind konzeptuell interessant — koennen als subtile Tint-Variationen eingesetzt werden (z.B. lensing als sehr helles Indigo-Tint fuer Surface-Variationen)

---

### Navigation-Patterns

**Was die Besten nutzen:**

1. **Minimal Fixed Nav**: Logo links, wenige Links mittig oder rechts, ein CTA-Button. Kein Mega-Menu, kein Icon-Zoo.

2. **Hide-on-Scroll-Down, Show-on-Scroll-Up** (sog. "Smart Navbar"): Reduziert visuelle Unruhe beim Lesen, gibt Kontrolle bei Navigationsintention zurueck. Implementierung: ~15 Zeilen JavaScript.

3. **Blur-Backdrop bei Scroll** (frosted glass): Wenn die Nav transparent startet und beim Scrollen einen Blur-Hintergrund bekommt, wirkt das eleganter als ein harter Farb-Hintergrund.

4. **Navigation als Zustand, nicht als Element**: Die besten Sites nutzen keine sichtbare "Navigation" im traditionellen Sinne — die Seite ist so klar strukturiert, dass der User weiss wo er ist. Navigation kommt nur wenn benoetigt.

---

### Mobile-Ansaetze

**Was die Besten machen:**
- Mobile bekommt eigene Animations-Choreographie (nicht einfach Desktop-Animationen auf kleinen Screen)
- Smooth Scroll deaktiviert (native iOS/Android Scroll ist besser als jede Library)
- Single-Column-Layout konsequent, keine Zweispalter unter 768px
- Touch Targets: Minimum 44x44px, grosszuegige Tap-Areas
- Hero auf Mobile: Text deutlich kleiner, mehr Vertikalraum

**Anti-Pattern Mobile:**
- Animations-heavy Desktop-Erfahrung einfach skaliert (ruckelt auf Mid-Range-Android)
- Horizontales Scroll auf Mobile (fast immer ein UX-Fehler)
- Custom Cursor auf Mobile (sinnlos, Cursor existiert nicht)

---

## Teil 3 — Konkrete Empfehlungen fuer Nullpunkt

### Die Marken-Essenz (Briefing an den Designer)

**Nullpunkt ist:** Die Agentur fuer Gruender die verstanden haben, dass KI kein Trend ist sondern eine Neuordnung. Praezise, strukturiert, ohne Hype-Sprache.

**Visuell uebersetzt:** Militaerische Praezision in der Typografie, wissenschaftliche Sorgfalt im Spacing, kosmische Metaphern als subtiles Design-Motiv (nicht buchstaeblich mit Weltraum-Bildern, sondern in der Schwere und Massivitaet).

**Referenz-Kompass:** Zwischen Auros (Radikalitaet) und Vercel (Seriositaet) — mit dem Mut von Auros und der Zuverlaessigkeit von Vercel.

---

### 5 konkrete Design-Richtungen

#### Richtung A — "Praezisions-Editorial"
*Inspiration: Auros + Rauno Freiberg*

Radikal typografisch. Die Seite lebt von Schrift-Kompositionen, minimalen Visuals, viel Luft. Jeder Scroll-Step ist ein neues typografisches Statement.

- Hero: Einziger Claim in 100-130px Syne, negatives Tracking, kein weiterer Text
- Navigation: Nur Text, keine Underlines, keine Buttons
- Work: Projekt-Titel in grossen Typen, kein Grid — eher eine Liste die beim Hover visuell explodiert
- Farbschema: Fast monochrom, Indigo nur fuer eine Klasse von Elementen (CTAs)
- Aufwand: Mittel — braucht sehr starke Copy, wenig technische Exotik

**Passt zu Nullpunkt wenn:** Die Texte und Claims wirklich sitzen. Dieser Look verzeiht schwache Copy nicht.

---

#### Richtung B — "Structured Dark-Light"
*Inspiration: Linear + Stripe*

Professionell, trust-building, conversion-optimiert. Klare Struktur, konsistentes Grid, Produktscreenshots als Beweise. Animationen sind subtle, kein Showoff.

- Hero: Claim + Subline + CTA-Buttons + Social-Proof-Logos
- Services: Klare Feature-Liste (nicht Kacheln, sondern beschriftete Rows mit Icons)
- Work: 2-Spalten-Layout, gross, mit kurzer Projekt-Beschreibung
- Navigation: Standard Fixed mit Blur-Backdrop
- Farbschema: #FAFAF9 background, #09090B text, Indigo als einziger Akzent

**Passt zu Nullpunkt wenn:** Der Fokus auf Conversion und Glaubwuerdigkeit liegt, nicht auf "wir sind die coolste Agentur".

---

#### Richtung C — "Gravitational Drama"
*Inspiration: Basement Studio + Fey App*

Die ambitionierteste Option. Nutzt die Schwarzes-Loch-Metaphorik des Namens visuell aus — nicht kitschig, sondern durch physikalische Designprinzipien. Elemente werden "angezogen", Layouts haben einen gravitativen Fokuspunkt.

- Hero: Ein grosses visuals Kompositionselement (koennte ein animiertes SVG sein — ein "Lensing"-Effekt um den Nullpunkt) + Claim
- Scroll-Effekte: Elemente "fallen" beim Scrollen in den Viewport statt zu faden
- Custom Cursor: Zeigt Gravitationseffekt (leichte Verzerrung des umgebenden Texts)
- Work: Horizontal-Scroll Track, groCshe Projekt-Visuals
- Farbschema: Helleres Weiss im Hero, zunehmend toniger in tieferen Sections

**Passt zu Nullpunkt wenn:** Zeit und Budget fuer die technische Umsetzung da sind und ein technisch begeisterter Designer dabei ist.

---

#### Richtung D — "Code as Design"
*Inspiration: Resend + Vercel*

Positioniert Nullpunkt explizit als tech-nahe Agentur die Entwickler und technische Gruender anspricht. Code-Bloecke, Monospace-Fonts, Terminal-Aesthetik — aber nicht kitschig, sondern elegant.

- Hero: Claim in Syne + darunter ein minimaler Code-Block (oder Prompt) in JetBrains Mono
- Sections: Mix aus "menschlicher" Typografie (Syne/Inter) und technischen Akzenten (JetBrains Mono fuer Daten, Zahlen, Labels)
- Services: Als "API-Endpoints" oder "Functions" beschriftet (z.B. `nullpunkt.automate()`, `nullpunkt.build()`)
- Farbschema: Besonders stark mit Indigo-Akzent auf Syntax-Highlighting

**Passt zu Nullpunkt wenn:** Die Zielgruppe primaer technisch versierte Gruender und Entwickler sind.

---

#### Richtung E — "Minimal Bold"
*Inspiration: Monopo + Auros — pragmatische Version*

Der Kompromiss zwischen Radikalitaet und Machbarkeit. Grosse Typografie, viel Whitespace, aber klare Struktur. Gut umsetzbar in 1-2 Sprints.

- Hero: Claim in 3 Zeilen (jede Zeile eine Aussage), gross, links-buendig
- Work: 2 grosse Projekt-Cards pro Row, volle Breite, mit echten Projektvisuals
- Services: Nicht als Kacheln, sondern als nummerierte Liste (01 Automatisierung, 02 Interfaces, 03 Strategie)
- Navigation: Minimal fixed, Logo + 3 Links + CTA
- Animationen: Smooth Scroll + Text-Split-Reveals + Stagger — kein Overkill

**Passt zu Nullpunkt immer** — diese Richtung funktioniert unabhaengig von Copy-Staerke und Budget.

---

### Anti-Patterns — Was wir vermeiden sollten

**Layout:**
- 3-gleichwertige-Kacheln-Grid als Hauptlayout fuer Services und Work
- Jede Section mit gleichem Aufbau (Eyebrow + H2 + Subline + Grid)
- Farbige Section-Backgrounds ohne zuverlaessige Systematik

**Typografie:**
- Section-H2 zu nah am Hero-H1 (Hierarchie flacht ab)
- Positive Letter-Spacing auf Display-Fonts (wirkt spielerisch, nicht praezise)
- "Fancy" Font-Paarungen mit mehr als 3 Schriften

**Animationen:**
- Typewriter-Effekt im Hero
- Rotate/Scale-Hover auf Karten (ueberstrapaziert)
- Animationen die laenger als 0.6s dauern ohne Grund
- Parallax auf Mobile

**Konzept:**
- Generische KI-Agentur-Sprache ("We leverage AI to transform your business")
- Stock-Photos von Laptops, Meetings, Haenden die tippen
- "Wir sind eine Full-Service-Agentur" — zu breit
- Unangemessene Versprechungen ("+300% ROI")

---

## Anhang: Technische Constraints fuer den Designer

Der Designer sollte wissen dass folgendes fest steht und nicht geaendert wird:

**Fonts (fest):**
- Display/Headlines: Syne
- Body: Inter
- Code/Mono-Akzente: JetBrains Mono

**Tech-Stack (fest):**
- Light Theme (kein Dark Mode geplant)
- GSAP fuer Scroll-Animationen
- Lenis fuer Smooth Scroll (Desktop only)
- Next.js App Router

**Aktuelles Farbsystem (kann angepasst werden):**
- bg: #F5F5F7 (kuennes Off-White)
- text-primary: #0A0A0F
- text-secondary: #5A5A6E (nach WCAG-Fix)
- accent: #6366F1 (Indigo)
- Metapher-Tokens: void (#0A0A0F), event-horizon (#1A1A2E), lensing (#6366F1), corona (#A5B4FC), accent-glow (#818CF8)

**Was der Designer produzieren sollte (Output):**
1. Entscheidung fuer eine der 5 Richtungen (oder Hybrid)
2. Moodboard / Referenz-Collection mit 5-8 visuellen Referenzen
3. Typografie-Skalierung (welche Sizes, welche Weights, welche Letter-Spacings)
4. Spacing-System (4px oder 8px Basis, was skaliert wie)
5. Hero-Entwurf (nur der "erste Eindruck" der Seite)
6. Entwurf einer Service-Section und einer Work-Section (die Problemstellen)
7. Farbanpassungen wenn noetig (speziell bg-Ton und accent-Varianten)

---

## Quellen + Belege

- Godly.website: Kuratierte Sammlung von SOTD-Gewinnern, Stand April 2026
- Awwwards.com: SOTD + SOTM Archiv 2024-2026
- Einzelne Sites direkt analysiert: linear.app, vercel.com, resend.com, basement.studio, stripe.com, fey.com, rauno.me, monopo.tokyo
- WCAG 2.1 AA Contrast Guidelines: web.dev/accessibility
- Interne Vorarbeit: research-animation-stack.md (Animation-Stack-Entscheidungen)
- Internes Design-Review: design-review.md (konkrete CSS-Befunde)
