# Design Review — Agency Website
**Datum:** 2026-04-05
**Reviewer:** Designer
**Basis:** Statische Code-Analyse, kein Browser-Rendering

---

## Executive Summary

Solide Grundlage. Das Farbsystem ist kohärent, die Typografie-Paarung Syne/Inter funktioniert, und die Animations-Architektur denkt bereits in den richtigen Kategorien. Die groessten Probleme liegen nicht im Konzept sondern in der Ausführung: Inline-Styles dominieren überall, wo Tailwind-Klassen sein sollten — das macht das System unwartbar und erzeugt mehrere Konsistenz-Brüche. Dazu fehlt ein kompletter Footer, ein CTA im Hero, und mehrere Hover-States existieren nur in der Navigation.

---

## 1. Design-System Konsistenz

**Was gut ist:**
`globals.css` definiert ein sauberes Token-Set: 7 Farben, 3 Schatten-Ebenen, Syne/Inter als Font-Paar. Die Farben werden ausschliesslich als CSS Custom Properties referenziert — kein hartcodierter HEX-Wert ausserhalb der Token-Definition. Das ist die richtige Basis.

**Was problematisch ist:**
Das `@theme` in `globals.css` und der `:root`-Block darunter definieren *dieselben Werte doppelt* — einmal als Tailwind v4 Tokens (`--color-accent`), einmal als CSS Properties (`--accent`). Beide sind im Einsatz: Die Komponenten nutzen `var(--accent)` (CSS Property), während Tailwind-Klassen theoretisch `text-color-accent` erwarten würden. Das erzeugt ein zweigleisiges System, das mittelfristig auseinanderlaeuft.

`page.tsx` verwendet auf jedem Element `fontFamily: 'var(--font-syne), system-ui, sans-serif'` als Inline-Style — identischer String, copy-pasted ca. 20x. In `globals.css` steht bereits `h1, h2, ... { font-family: var(--font-syne) }`. Diese globale Regel greift aber nicht, weil alle Sections inline-styled sind und das `<h2>` keinen klassischen Markup-Flow hat. Das ist ein Widerspruch im System.

Das Badge in den Work-Cards nutzt `rgba(99, 102, 241, 0.08)` hardcodiert — das ist `--accent` mit manueller Opacity. Wenn sich der Accent-Wert ändert, bricht diese Farbe.

**Konkret:**
- Doppelte Token-Definition bereinigen: Entweder konsequent Tailwind v4 `@theme` nutzen oder konsequent CSS Custom Properties — nicht beides parallel.
- Einen `--accent-subtle: rgba(99, 102, 241, 0.08)` Token anlegen.
- Die font-family-Inline-Strings durch Tailwind-Klassen ersetzen (`font-display` / `font-sans`).

**Priorität: Mittel** (kein akuter Bug, aber Wartungsschulden wachsen schnell)

---

## 2. Typografie

**Was gut ist:**
Die Paarung Syne (Display/Headlines) und Inter (Body) ist visuell stimmig. Die Entscheidung, den Hero-H1 auf `clamp(3.5rem, 10vw, 9rem)` zu setzen mit `letter-spacing: -0.04em` und `line-height: 0.92` ist mutig und richtig — das atmet bei grossen Viewports. Die Eyebrow-Labels (`0.75rem, 600, 0.15em letter-spacing, uppercase`) sind konsistent durch alle Sections durchgezogen — das ist gute Disziplin.

**Was problematisch ist:**
Die Section-H2s sind `clamp(2rem, 5vw, 3.5rem)` — auf einem 1440px-Screen landen die bei circa 72px. Das ist fast so gross wie der Hero-H1 (max 9rem, aber dort clamp-begrenzt). Die Hierarchie Hero > Section-Header ist zu flach. Ein Besucher, der auf die Work-Section scrollt, bekommt fast denselben visuellen Druck wie im Hero.

Service-Cards haben H3 mit `1.125rem` (18px). Work-Cards haben H3 mit `1.25rem` (20px). Zwei verschiedene H3-Grössen für gleichwertige Card-Typen — das ist inkonsistent ohne ersichtlichen Grund.

Der Body-Text in den Service-Cards (`0.9375rem`) ist ein Off-Grid-Wert. `15px` ist kein sinnvoller Stop auf einer 4px-Basis. `16px` (1rem) wäre korrekt.

Im About-Bereich zwei aufeinanderfolgende `<p>`-Tags mit identischen Styles (fontFamily, fontSize, color, lineHeight) — semantisch und visuell sollte das ein `<p>` mit mehr Abstand sein, oder besser: ein `<p>` mit einem `<br>` vermeiden und stattdessen `margin-bottom` auf dem ersten Paragraphen erhöhen.

**Konkret:**
- Section-H2 auf `clamp(1.75rem, 4vw, 2.75rem)` reduzieren — klarere Distanz zum Hero.
- Alle H3 in Cards auf einheitlich `1.125rem` setzen.
- `0.9375rem` → `1rem` in Service-Cards.

**Priorität: Quick Win** — kleine Zahlenänderungen, sofortige Wirkung auf Hierarchie.

---

## 3. Spacing & Layout

**Was gut ist:**
Alle vier Sections nutzen konsequent `padding: '6rem 2rem'` und `maxWidth: '1200px'`. Das ist sauberer vertikaler Rhythmus auf Section-Ebene.

**Was problematisch ist:**
Die Abstände *innerhalb* der Sections folgen keinem System. Beispiele:
- Eyebrow → H2: `marginBottom: '1rem'` (16px)
- H2 → Subline: `marginBottom: '1rem'` oder `'1.5rem'` — je nach Section unterschiedlich
- Subline → Grid: `marginBottom: '4rem'` (64px), aber im About: `marginBottom: '4rem'` nach dem zweiten Paragraphen

Das sind mindestens 5 verschiedene margin-Werte in einem Muster das dreimal wiederholt wird. Das Section-Header-Pattern (Eyebrow + H2 + Subline) sollte eine einzige, konsistente Komponente sein — nicht dreimal händisch ausgerollt.

Der Hero hat kein `padding-top` für die Navbar. Bei `min-h-screen` und dem Fixed-Header (72px) liegt der Content-Block vertikal zentriert bezogen auf `100vh` — aber effektiv sitzt er `72px` zu weit oben, weil der Header über den Content greift. Auf kleinen Viewports könnte der obere Teil des Eyebrow-Labels hinter der Navbar verschwinden.

Service-Cards: `padding: '2rem'` (32px). Work-Cards: `padding: '1.5rem'` (24px). Kein erkennbarer Grund für die Unterschied — beide sind gleichwertige Card-Typen.

**Konkret:**
- Section-Header-Pattern in eine `<SectionHeader>`-Komponente extrahieren mit fixen Spacings: Eyebrow → H2: `12px`, H2 → Subline: `16px`, Subline → Content: `48px`.
- Hero: `padding-top: 72px` oder `min-h-[calc(100vh-72px)] mt-[72px]`.
- Card-Padding vereinheitlichen auf `padding: '1.5rem'`.

**Priorität: Quick Win (SectionHeader-Komponente) / Mittel (Card-Padding)**

---

## 4. Farbkontraste (Accessibility WCAG AA)

**Was gut ist:**
`--text-primary: #0A0A0F` auf `--bg: #F5F5F7` ergibt ein Kontrastverhältnis von ca. 18:1 — deutlich über dem AA-Minimum von 4.5:1. Exzellent.

**Was problematisch ist:**
`--text-secondary: #6B6B7E` auf `--surface-2: #EBEBF0` — das ist der kritischste Fall. #6B6B7E auf #EBEBF0 ergibt ca. **3.8:1**. Damit verfehlt die Contact-Section (background: surface-2) das WCAG AA-Minimum für Normaltext (4.5:1). Der Subline-Text in Contact sowie der Eyebrow-Label in Accent-Farbe auf surface-2 sind potenziell problematisch.

`--accent: #6366F1` auf `--bg: #F5F5F7` ergibt ca. **3.2:1** — ebenfalls unter AA. Accent-farbiger Text (Eyebrow-Labels, Badge-Text) auf dem Hintergrund verletzt den Standard. Für decorative/large-text (18px+ bold) wäre 3:1 ausreichend, aber die Eyebrow-Labels sind 12px — da gilt 4.5:1.

Das Badge in Work-Cards: `--accent` auf `rgba(99, 102, 241, 0.08)`-Fläche auf `--bg`-Hintergrund. Der Badge-Hintergrund ist semi-transparent — der effektive Kontrast ist `#6366F1` auf einem Mix aus Badge-Color und Card-Background. Auch das landet unter AA für 12px-Text.

**Konkret:**
- `--text-secondary` auf `#5A5A6E` oder dunkler anpassen — ca. 4.6:1 auf surface-2.
- Eyebrow-Labels: Entweder `--accent` abdunkeln auf `#4B4EDB` (ca. 4.6:1 auf bg), oder Eyebrows auf `--text-secondary` setzen und den visuellen Akzent über Spacing/Uppercase-Styling herstellen.
- Badge-Text: Gleiche Lösung wie Eyebrows.

**Priorität: Hoch** — WCAG AA ist nicht optional.

---

## 5. Komponenten-Design

**Was gut ist:**
Navigation ist die am stärksten durchdachte Komponente: Aktiv-State mit Underline, Hamburger mit korrekten ARIA-Attributen (`aria-expanded`, `aria-controls`), 44px Touch-Target, Stagger-Animation auf Mobile-Links. Das ist sauber.

Work-Cards haben Bild-Placeholder (240px height) + Content-Bereich + Tags — die richtige Struktur für späteres Befüllen.

**Was fehlt / problematisch ist:**

**Hover-States:** Nur die Navigation hat Hover-Feedback. Work-Cards, Service-Cards, der Mail-Button in Contact — kein einziger Hover-State ist definiert. Der Mail-Link hat `transition: 'opacity 0.15s ease'` aber kein `opacity`-Ziel — das ist eine Transition ohne Effekt. Ein `:hover { opacity: 0.85 }` fehlt.

**Work-Cards:** Kein Hover-State (`transform: translateY(-4px)`, `box-shadow: var(--shadow-lg)` wäre Standard), kein Link/CTA, kein Projekt-Beschreibungstext. Die Cards sind visuell stummgeschaltet.

**Service-Cards:** Icon-Placeholder ist ein leeres Div (`40px x 40px`, `rgba(99, 102, 241, 0.1)` Hintergrund). Das ist intentional als Platzhalter, aber visuell ist es nichts. Kein Hover.

**Stats in About:** Die Stat-Zahlen (`3rem`, font-syne, accent-color) sehen gut aus. Aber die Stats-Grid hat `maxWidth: '720px'` während der Rest der About-Section kein maxWidth-Limit auf dem Text hat — das lässt die About-Paragraphen auf 1200px Breite laufen, was bei 18px-Text ca. 100+ Zeichen pro Zeile ergibt. 60-75 Zeichen ist das Optimum.

**Kein Footer:** Fehlend. Für eine Agency-Website ist ein Footer mit Copyright, Impressum-Link, und Social-Links nicht optional — das ist die Seite die einen seriösen Eindruck vermittelt oder nicht.

**Kein Hero-CTA:** Der Hero hat einen Eyebrow, eine Headline und eine Subline — aber keine Handlungsaufforderung. Der User liest "We craft digital experiences" und scrollt... vielleicht. Ein Primary-Button ("See our work" → anchor #work) und/oder ein Secondary-Link ("Get in touch") würden den Conversion-Flow schliessen.

**Konkret:**
- Hover-States auf alle interaktiven Elemente: Cards (`translateY + shadow-lg`), Mail-Button (`opacity: 0.88` + leichter `scale(0.98)`).
- Text-maxWidth auf About-Paragraphen: `maxWidth: '640px'`.
- Hero: Primary CTA Button hinzufügen.
- Footer: Minimal-Footer mit Copyright + Impressum + Social.

**Priorität: Hero-CTA und Hover-States sind Quick Wins / Footer ist mittelgrosse Aufgabe**

---

## 6. Animation UX

**Was gut ist:**
Das Timing-System ist durchdacht. Hero: Text-Reveal mit `duration: 0.8, ease: power3.out` — das ist klassisch, angenehm schwungvoll. Die gestaffelten Delays (0ms, 80ms, 160ms für die drei Headline-Zeilen) sind nah genug zusammen um als zusammengehörig zu wirken, weit genug für Rhythmus.

ScrollTrigger `start: 'top 80%'` ist ein guter Trigger-Punkt — Elemente beginnen sich zu bewegen bevor sie voll im Viewport sind, was sich natürlich anfühlt. `once: true` verhindert Re-Trigger beim Rückscrollen — korrekt.

Lenis mit `duration: 1.2` ist ein angenehmer Smooth-Scroll-Wert.

**Was problematisch ist:**
Die vier `[data-animate]` Targets pro Section werden als eine gemeinsame `gsap.to(targets, { stagger: 0.1 })` Gruppe animiert. Das bedeutet: Eyebrow (0ms), H2 (100ms), Subline (200ms), Grid (300ms) — aber das Grid ist *eine einzelne* Instanz, also erscheinen alle Grid-Items gleichzeitig. Das ist inkonsistent mit dem Eyebrow/H2/Subline-Stagger. Service-Cards und Work-Cards würden schöner wirken wenn jedes Grid-Item einzeln via `[data-animate]` getaggt wäre.

Die Scroll-Line-Animation im Hero (`scrollLine` Keyframe) funktioniert korrekt, aber das 0/50/51/100%-Split-Pattern für transform-origin-Wechsel ist fragil — ein Browser der Keyframes leicht anders interpretiert, würde einen harten Schnitt bei 50/51% erzeugen. Sauberer wäre: zwei separate Animationen oder `animation-direction: alternate` mit einer einfacheren Keyframe-Kurve.

Die Hero-Animation (`data-reveal-delay` als Index 0/1/2 für Eyebrow/H1/Subline) nutzt das delay-Attribut für zwei verschiedene Zwecke: Im RevealLine-Context ist es ein Millisekunden-Offset (0, 80, 160), im `p[data-reveal-element]`-Context ist es ein Schritt-Index der mit `0.1 + index * 0.15` umgerechnet wird. Derselbe Attribute-Name, zwei verschiedene Interpretationsschemata — das ist ein stilles Bug-Risiko.

**Konkret:**
- Grid-Items einzeln mit `[data-animate]` taggen statt das Grid-Wrapper-Div.
- ScrollLine-Keyframe vereinfachen: `0% { opacity: 0, transform: scaleY(0) } 20% { opacity: 1, transform: scaleY(1) } 100% { opacity: 0, transform: scaleY(1) }` und `transform-origin: top` fest.
- `data-reveal-delay` umbenennen: Im RevealLine-Context → `data-reveal-delay-ms`, im Element-Context → `data-reveal-index`.

**Priorität: Die Grid-Item-Animation ist Quick Win / Rename ist Refactoring-Aufgabe**

---

## 7. Responsive

**Was gut ist:**
Hero ist vollständig responsive: `clamp()` auf H1, `px-6`, `text-center`, kein festes Width. Navigation hat saubere MD-Breakpoints und einen funktionalen Mobile-Drawer. Die grids nutzen `repeat(auto-fill, minmax(...))` — das passt sich ohne Breakpoints an.

**Was problematisch ist:**
`padding: '6rem 2rem'` auf allen Sections — `2rem` (32px) seitliches Padding ist auf kleinen Screens (375px) ausreichend, aber `6rem` (96px) vertikal oben/unten auf Mobile ist viel. Auf einem iPhone läuft eine Section dann ca. `96 + content + 96 = ~280px+` — das macht lange Scroll-Wege ohne inhaltliche Verdichtung. Mobile braucht typischerweise `4rem` statt `6rem` vertikal.

Die Work-Cards haben `minmax(320px, 1fr)` — auf einem 375px-Viewport plus `2x 2rem` Padding (= 311px verfügbare Breite) ist 320px zu gross. Die Grid-Items würden einen horizontalen Scroll verursachen oder auf `minmax(auto, 1fr)` zurückfallen, abhängig vom Browser. Der korrekte Wert wäre `minmax(min(320px, 100%), 1fr)` oder ein Breakpoint der auf Mobile auf `1` Spalte wechselt.

Service-Cards: `minmax(280px, 1fr)` — gleiches Problem, etwas weniger kritisch weil 280px < 311px verfügbar, aber eng.

Das Stats-Grid in About (`minmax(160px, 1fr)`) ist unproblematisch — 4 Items zu je min. 160px werden auf 375px zu 2x2 umbrechen, was gut aussieht.

Der Scroll-Hint im Hero (`bottom: 2.5rem, left: 50%, transform: translateX(-50%)`) ist auf Mobile nicht sichtbar wenn der User die virtuelle Tastatur öffnet — aber das ist ein Edge Case, kein Bug.

**Konkret:**
- Section-Padding: `padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2rem)'` — atmet auf Desktop, komprimiert auf Mobile.
- Work-Cards: `minmax(min(320px, 100%), 1fr)`.
- Service-Cards: `minmax(min(280px, 100%), 1fr)`.

**Priorität: Mittel** — kein totalbreak, aber Work-Cards könnten auf einigen Geräten horizontal scrollen.

---

## 8. Was visuell fehlt

**Footer — fehlt komplett.**
Minimal-Footer: Copyright-Zeile, Impressum-Link (rechtlich in DE relevant), optionale Social-Icons (2-3: GitHub, LinkedIn, Twitter/X). Visuell: `surface-2` Hintergrund, `border-top: 1px solid var(--border)`, `padding: 2rem`, dezentes `text-secondary`-Typescale.

**Hero-CTA — fehlt.**
Nach der Subline braucht es einen Primary-Button und einen Secondary-Link. Vorschlag:
- Primary: `"See our work"` → `#work`, Hintergrund `var(--accent)`, border-radius 8px, padding 14px 28px, Syne 600.
- Secondary: `"Start a project →"` → `#contact`, plain text mit Underline-Hover, `var(--text-secondary)`.
Beide mit `margin-top: 2.5rem` nach der Subline.

**Hover-States auf Cards — fehlen komplett.**
Jede Card (Work und Service) sollte beim Hover eine subtile Reaktion zeigen: `translateY(-4px)` + `shadow-lg`. Duration 200ms ease.

**Bilder / Visuals — Placeholder-Status.**
Work-Cards haben leere `surface-2`-Flächen als Platzhalter. Das ist intentional, aber der "Project 1" Text als Einziges in 240px Leerraum ist schwach. Ein nummerierter Index oder ein generischer Pattern-Background wäre visuell stärker — z.B. ein leichtes Diagonal-Muster in `surface-2`.

**Progress-Indikator beim Scrollen — nice to have.**
Eine schmale Fortschritts-Linie oben (1-2px, accent-color) die beim Scrollen wächst würde das Lenis-Smooth-Scroll visuell ergänzen und dem User Orientierung geben.

**Focus-States — nicht sichtbar.**
Kein `:focus-visible`-Styling in globals.css. Keyboard-Navigation ist damit für sehbehinderte User nicht nutzbar. Minimal: `outline: 2px solid var(--accent); outline-offset: 3px` auf `:focus-visible`.

---

## Priorisierte Massnahmen

### Quick Wins (1-2h, hohe Wirkung)

| # | Was | Datei | Impact |
|---|-----|-------|--------|
| 1 | `--text-secondary` Kontrast korrigieren (#5A5A6E) | globals.css | Accessibility / WCAG |
| 2 | Focus-visible Styling hinzufügen | globals.css | Accessibility |
| 3 | Hero-CTA (Primary-Button + Secondary-Link) | Hero.tsx | Conversion |
| 4 | Section-H2-Grösse reduzieren (clamp 2rem → 2.75rem max) | page.tsx | Typografie-Hierarchie |
| 5 | Hover-States auf Cards und Mail-Button | page.tsx | Interaktivität |
| 6 | Grid-Items einzeln mit `[data-animate]` taggen | page.tsx | Animation UX |
| 7 | `--accent-subtle` Token hinzufügen | globals.css | System-Konsistenz |

### Mittlere Aufgaben (halber Tag)

| # | Was | Datei(en) | Impact |
|---|-----|-----------|--------|
| 8 | `<SectionHeader>`-Komponente extrahieren | Neue Komponente | DRY, Spacing-Konsistenz |
| 9 | Work-Cards minmax-Fix für Mobile | page.tsx | Mobile Layout |
| 10 | Section-Padding auf clamp() umstellen | page.tsx | Mobile Rhythmus |
| 11 | About-Text maxWidth: 640px | page.tsx | Lesbarkeit |
| 12 | Doppelte Token-Definition bereinigen | globals.css | System-Kohärenz |

### Groessere Umbauten (ganzer Tag+)

| # | Was | Warum |
|---|-----|-------|
| 13 | Footer-Komponente bauen | Komplett fehlend, rechtlich relevant |
| 14 | font-family Inline-Strings → Tailwind-Klassen | Technische Schuld, Refactoring |
| 15 | data-reveal-Attribute umbenennen | Bug-Risiko, Refactoring |
| 16 | Echte Projekt-Visuals / Bild-System | Inhaltliche Phase, nicht Code-Problem |

---

*Analyse-Basis: Statische Code-Analyse ohne Browser-Rendering. Kontrast-Werte sind Berechnungen, kein gemessenes Rendering.*
