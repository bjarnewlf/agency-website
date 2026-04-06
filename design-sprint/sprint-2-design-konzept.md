# Design-Konzept Sprint 2 — Nullpunkt.cc
**Erstellt:** 2026-04-06  
**Autor:** Designer (Dev-Agentur)  
**Status:** Konzept — bereit fuer Developer-Umsetzung

---

## Auftrag 1: Hero Signature-Element — SVG Gravitationsfeld

### 1.1 Visuelle Beschreibung

Das Element ist ein Schwarzes Loch als reine Geometrie. Kein Foto, keine Textur, keine Farbe ausser dem Systempalette-Indigo. Die Metapher wird ehrlich gebaut, nicht illustriert.

**Form und Proportionen:**
- Gesamtgroesse: 520 × 520px SVG-Viewbox, rendered als 480px × 480px auf Desktop
- Zentrum: Ausgefuellter Kreis, 16px Radius, Farbe `#0A0A0F` (void-Token) — das ist der Ereignishorizont. Kein Glow, keine Leuchte. Nur Masse.
- 7 konzentrische Ringe um das Zentrum, radiale Abstufung (nicht linear):
  - Ring 1: r=40px, stroke 1.5px, opacity 0.55
  - Ring 2: r=72px, stroke 1.2px, opacity 0.42
  - Ring 3: r=110px, stroke 1px, opacity 0.32
  - Ring 4: r=154px, stroke 0.8px, opacity 0.24
  - Ring 5: r=202px, stroke 0.7px, opacity 0.17
  - Ring 6: r=254px, stroke 0.6px, opacity 0.11
  - Ring 7: r=310px, stroke 0.5px, opacity 0.07
- Alle Ringe: `stroke: #4F46E5` (accent-Token), `fill: none`
- 2 Ellipsen als Verzerrungsandeutung (Lensing-Effekt): Dieselben r-Werte wie Ring 3 und Ring 5, aber ry = rx * 0.82 — leicht abgeflacht, als wuerde Raumzeit biegen. Rotation: 15deg, dieselben Stroke-Parameter aber 60% der Ring-Opacity.

**Farbentscheidung:** Monochrom. Indigo, nichts anderes. Keine grauen Ringe, kein weisser Glow. Das Schwarze-Loch-Zentrum in void-Farbe, die Ringe im Akzent. Mehr braucht es nicht und alles andere waere zu viel.

**Hintergrund:** Das Dot-Grid-Pattern bleibt NICHT. Es kaempft mit den konzentrischen Ringen um dieselbe Frequenz. Ein Element, nicht zwei. Der dezente Indigo-Glow links-mittig faellt weg — das Gravitationsfeld ersetzt ihn.

Der Off-White-Background #F8F7F5 unter dem SVG-Element bekommt einen radialen Verlauf: `radial-gradient(circle at center, rgba(79, 70, 229, 0.035) 0%, transparent 65%)` — Radius 340px, zentriert auf das SVG. Kein Glow im klassischen Sinn, nur eine subtile Waerme die sagt "hier ist etwas".

### 1.2 Platzierung im Layout

```
Desktop (>= 1024px):
┌────────────────────────────────────────────────────────────┐
│  KI-AGENTUR                          [SVG-Feld, abs pos]   │
│                                                             │
│  Wo Ideen                        ●  ← Gravitationszentrum  │
│  Masse                        (Ringe)                       │
│  gewinnen.                                                  │
│                                                             │
│  Design und Engineering          SVG rechts-mittig,         │
│  ohne Kompromiss.                vertikal auf Text-         │
│                                  mitte ausgerichtet         │
│  [CTA]  Projekt starten →                                   │
└────────────────────────────────────────────────────────────┘
```

Positionierung: `position: absolute`, `right: -80px`, `top: 50%`, `transform: translateY(-50%)`. Der rechte Rand des SVG geht bewusst 80px ueber die max-width hinaus — das Feld bricht aus dem Grid aus, was Gravitationsfelder auch tun.

Ueberlappungszone: Ring 6 und Ring 7 ueberlagern sich mit dem Text-Bereich im Viewport von ca. 1200–1440px. Das ist gewollt. Die Ringe sind so opak (0.07–0.11) dass sie den Text nicht beeintraechtige, aber die Raumverschrankung von Text und visuellem Element sieht aus wie ein Dokument das weiss was es tut.

`z-index: 0` fuer das SVG, `z-index: 10` bleibt auf dem Content — unveraendert aus dem bestehenden Code.

### 1.3 SVG-Struktur

```svg
<svg
  id="gravitational-field"
  viewBox="-320 -320 640 640"
  width="480"
  height="480"
  aria-hidden="true"
  role="presentation"
>
  <!-- Hintergrund-Radialverlauf fuer lokale Waerme -->
  <defs>
    <radialGradient id="field-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#4F46E5" stop-opacity="0.04" />
      <stop offset="100%" stop-color="#4F46E5" stop-opacity="0"   />
    </radialGradient>
    <!-- Filter fuer Lensing-Verzerrung — SVG feTurbulence -->
    <filter id="lensing-distort" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.015"
        numOctaves="2"
        seed="42"
        result="noise"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="3"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </defs>

  <!-- Hintergrund-Waerme -->
  <circle cx="0" cy="0" r="320" fill="url(#field-glow)" />

  <!-- Gruppe fuer Lensing-Ellipsen (leichte Raumkruemmung) -->
  <g id="lensing-ellipses" transform="rotate(15)" opacity="0.6">
    <ellipse cx="0" cy="0" rx="110" ry="90"
      stroke="#4F46E5" stroke-width="1"   fill="none" opacity="0.32" />
    <ellipse cx="0" cy="0" rx="202" ry="166"
      stroke="#4F46E5" stroke-width="0.7" fill="none" opacity="0.17" />
  </g>

  <!-- Konzentrische Ringe — Gruppe fuer GSAP-Target -->
  <g id="orbital-rings" filter="url(#lensing-distort)">
    <circle cx="0" cy="0" r="40"  stroke="#4F46E5" stroke-width="1.5" fill="none" opacity="0.55" />
    <circle cx="0" cy="0" r="72"  stroke="#4F46E5" stroke-width="1.2" fill="none" opacity="0.42" />
    <circle cx="0" cy="0" r="110" stroke="#4F46E5" stroke-width="1"   fill="none" opacity="0.32" />
    <circle cx="0" cy="0" r="154" stroke="#4F46E5" stroke-width="0.8" fill="none" opacity="0.24" />
    <circle cx="0" cy="0" r="202" stroke="#4F46E5" stroke-width="0.7" fill="none" opacity="0.17" />
    <circle cx="0" cy="0" r="254" stroke="#4F46E5" stroke-width="0.6" fill="none" opacity="0.11" />
    <circle cx="0" cy="0" r="310" stroke="#4F46E5" stroke-width="0.5" fill="none" opacity="0.07" />
  </g>

  <!-- Ereignishorizont-Kern — zuletzt, immer oben -->
  <circle cx="0" cy="0" r="16" fill="#0A0A0F" />
  <!-- Innerer Glow-Ring direkt am Kern -->
  <circle cx="0" cy="0" r="20" stroke="#4F46E5" stroke-width="2" fill="none" opacity="0.8" />
</svg>
```

Anmerkung zum `feTurbulence`-Filter: Der `scale`-Wert von 3 ist sehr subtil. Er erzeugt minimales organisches Rauschen auf den Ringen — kein Zittern, nur das leiseste Nicht-ganz-perfekt. Bei `scale=0` wirken die Ringe mechanisch wie ein Techniker-Diagramm. Bei `scale=3` wirken sie wie echte Physik. Der Filter laeuft auf der GPU, kein Performance-Problem.

### 1.4 Animations-Konzept

**Phase 1 — Load (0 bis ~1.2s):**

Das SVG ist beim Load initial unsichtbar (`opacity: 0`). Es fadet erst nach dem Text-Reveal ein — der Text behauptet die Buehne zuerst.

```
t=0.0s    Text-Reveal startet (RevealLines)
t=0.4s    Eyebrow, Subline, CTAs faden ein
t=0.8s    SVG beginnt einzufaden: opacity 0 → 1, duration 1.2s, ease power2.out
t=0.8s    Gleichzeitig: Ringe skalieren von scale(0.88) → scale(1), duration 1.4s, ease power3.out
```

Warum nach dem Text: Das visuelle Element soll den Claim "Wo Ideen Masse gewinnen." unterstuetzen, nicht davor einlaufen. Die Gravitationsfeld-Metapher entfaltet sich, nachdem die Aussage besteht.

**Phase 2 — Idle (Dauerpuls):**

Zwei unabhaengige GSAP-Loops, beide mit `repeat: -1, yoyo: true`:

Loop A — Kern-Puls:
- Ziel: `#orbital-rings circle:first-child` (innerster Ring, r=40)
- Eigenschaft: `scale`, von `1` zu `1.06`
- Duration: 2.4s, ease: sine.inOut
- Verstaerkt den Eindruck von Gravitationsdruck

Loop B — Gesamtfeld-Atmen:
- Ziel: `#orbital-rings` (gesamte Ring-Gruppe)
- Eigenschaft: `scale`, von `1` zu `0.985`
- Duration: 4s, ease: sine.inOut
- Versatz: `delay: 1.2s` — nicht synchron mit Loop A
- Das Feld atmet leise, asynchron zum Puls. Zwei ueberlagerte Rhythmen die sich nie vollstaendig synchronisieren — das ist wie ein echtes System.

Loop C — Lensing-Rotation:
- Ziel: `#lensing-ellipsen`
- Eigenschaft: `rotation`, von `15deg` zu `20deg`
- Duration: 8s, ease: none (linear), repeat: -1 (kein yoyo — kontinuierlich)
- Sehr langsam. Nicht wahrnehmbar als Bewegung, nur als "es stimmt nicht ganz".

**Phase 3 — ScrollTrigger:**

GSAP ScrollTrigger auf die Hero-Section. Wenn der User scrollt (`start: "top top"`, `end: "bottom top"`):

- `#gravitational-field` scale: `1` → `1.15` (Feld waechst beim Scrollen — die Ringe breiten sich aus)
- `#gravitational-field` opacity: `1` → `0` (Feld loest sich auf wenn man hindurchscrollt)
- `scrub: 1.5` — weich, kein hartes Snapping
- Transform-Origin: Center des SVG

Das kommuniziert: Du scrollst durch das Gravitationsfeld hindurch. Du verlasst die Schwerkraft. Die naechste Section ist das andere Ende.

**Performance-Hinweis:** `will-change: transform, opacity` auf den SVG-Container setzen. GSAP arbeitet mit `transform3d` automatisch. `feTurbulence`-Filter ist statisch (kein GSAP darauf), nur der `feDisplacementMap` berechnet sich einmal bei Render.

### 1.5 Mobile-Verhalten

**< 768px:**
- SVG-Groesse: 320 × 320px
- Position: `absolute`, `right: -60px`, `top: 0`, `transform: none`
- Opacity grundlegend runter: alle Ring-Opacities × 0.7 via CSS-Filter oder einem GSAP-Set on mount bei mobile breakpoint
- Scroll-Animation deaktiviert (zu viel visueller Noise beim Touch-Scrollen)
- Idle-Puls-Loops bleiben aktiv (guenstiger Performance-Footprint)

**< 480px:**
- SVG komplett hinter den Content verschieben, `z-index: -1`, scale auf 0.75
- Das Feld wird zur reinen Hintergrundtextur, der Text sitzt vollstaendig davor

---

## Auftrag 2: Work-Section "Coming Soon"

### 2.1 Strategische Entscheidung

Die bunten Gradient-Cards muessen nicht nur raus weil sie fake sind — sie muessen raus weil sie das Gegenteil der Markenidentitaet kommunizieren. Nullpunkt ist monochrom + ein Akzent, ernsthaft und praezise. Purple-zu-Pink-Gradients sind Konfetti bei einem Architekturbuero.

Claas' Entscheidung: Option A mit Haltung. Kein Entschuldigungs-"Coming Soon", sondern eine selbstbewusste Aussage die mehr verrraet als drei Fake-Projekte je koennten.

### 2.2 Layout-Konzept

Eine einzelne Karte. Volle Breite der 1200px-Max-Width. Keine Spalten.

**Proportionen:** Hoehe 360px auf Desktop, 280px auf Mobile. Das ist weniger als die aktuellen 500px des Featured-Cards. Weniger Flaecherhoehe — aber alles was da ist, hat Absicht.

**Visuell:**
- Background: `var(--surface-1)` (#FFFFFF) — hebt sich bewusst vom Off-White-Seitenbackground ab
- Border: `1px solid var(--border)` — konsequent mit dem System
- Border-Radius: 24px — konsistent mit bestehenden Cards (derzeit `rounded-2xl`)
- Box-Shadow: `var(--shadow-md)` — unveraendert

**Innere Komposition (Desktop):**

Horizontale Dreiteilung: Links grosses decoratives Element (SVG-Gravitationsring), Mitte Typografie, rechts numerische Andeutung.

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│   [SVG 120px]    KEIN PLATZ         [Jahr]                           │
│   Einzelner      FÜR ALIBI.         2026                             │
│   Ring           ──────────                                           │
│   (Indigo)       Bald.                                                │
│                                                                       │
│   ←── 280px ──→  ←───── 520px ─────→  ←── 200px ──→                │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

Dreispaltig mit `display: grid; grid-template-columns: 280px 1fr 200px`. Der linke Bereich ist dekorativ und gibt der Karte Luft. Der mittlere Bereich traegt die ganze kommunikative Last.

### 2.3 Copy-Vorschlaege

**Headline (H2-Groesse, 2.5–3.5rem, Syne 700):**

Option 1 (direkt, dominant):
> Kein Platz für Alibi.

Option 2 (zukunftsorientiert, etwas weicher):
> Echte Arbeit. Bald hier.

Option 3 (provokativ, am starksten):
> Wir zeigen keine Fake-Projekte.

**Meine Empfehlung: Option 1.** Es erklaert sich selbst, es klingt nach Nullpunkt, und es macht neugierig. "Alibi" ist das praezise Wort — Alibi-Portfolio, Alibi-Expertise. Kein Besucher kann diese Aussage ignorieren.

**Subtext (Inter 16px, text-secondary):**
> Die ersten Projekte laufen. VetApp. Sonos TTS.  
> Wenn wir etwas zeigen, ist es echt.

Maximal 2 Saetze. Inter Regular, `var(--text-secondary)`. Die echten Projektnamen (VetApp, Sonos TTS) stehen drin — das ist stärker als jeder Platzhaltertext, weil sie beweisen dass es sie gibt.

**Eyebrow-Zeile:**
Statt "Projekte" → `ARBEIT` oder `REFERENZEN` — beides ehrlicher als "Projekte" wenn noch keine gezeigt werden. Ich wuerde `ARBEIT` nehmen: kuerzer, direkt, passt zur Tonalitaet von JetBrains Mono.

**Section-H2 anpassen:**
Statt "Ausgewaehlte Projekte." → "In Arbeit." (mit Punkt, gross, Syne).
Oder die H2 ganz weglassen und stattdessen die Card-Headline `Kein Platz fuer Alibi.` die visuelle H2-Funktion uebernehmen lassen. Weniger ist mehr.

### 2.4 Visuelle Details

**Dekoratives SVG-Element links:**

Einzelner Indigo-Ring, 80px Durchmesser, 2px Stroke, Opacity 0.25. Darueber ein zweiter Ring, 50px, 1.5px Stroke, Opacity 0.4. Kein Zentrum-Punkt — der fehlt demonstrativ. Das Schwarze Loch wartet noch auf seinen Kern. Es ist eine subtile Aussage: Das Gravitationszentrum kommt.

**Rechte Spalte (Jahr):**

Grosses monochromes Jahr: `2026`, Syne, 80px, `var(--color-surface-2)` als Farbe (#EBEBF0) — der Text ist sichtbar aber zurueckhaltend. Darunter, 12px kleiner: `→ Q3` in JetBrains Mono, accent-Farbe. Das kommuniziert Zeitplan ohne Versprechen zu machen.

**Innenabstand:** `padding: 48px 56px` auf Desktop, `padding: 40px 32px` auf Mobile.

**Headline-Styling:**
```
font-family: var(--font-syne)
font-size: clamp(2rem, 4vw, 3rem)
font-weight: 800
letter-spacing: -0.04em
color: var(--text-primary)
```

**Subtext-Styling:**
```
font-family: var(--font-inter)
font-size: 1rem
line-height: 1.7
color: var(--text-secondary)
margin-top: 16px
max-width: 360px
```

**"Alle ansehen"-Link im Section-Header:** Entfernen oder ersetzen durch "Mehr erfahren →" mit Anchor auf `#contact`. Es gibt noch nichts anzusehen. Der Link luegt.

### 2.5 Animation

`data-animate` Scroll-Reveal reicht fuer 90% des Effekts. Bestehende ScrollAnimations.tsx greift automatisch.

Zusaetzlich (optionales Enhancement, 15 Zeilen):
- Das dekorative SVG-Element bekommt einen eigenen Reveal: scale von `0.8` zu `1`, opacity `0` zu `1`, duration `0.9s`, ease `power3.out`, `delay: 0.2s` relativ zum Section-Trigger
- Das gibt der Karte eine zweite Ebene der Bewegung ohne sie zu ueberladen

Kein Hover-Zustand auf dieser Card — sie ist kein Link. Wenn man sie anklickt sollte nichts passieren. Keine fake-Interaktivitaet.

### 2.6 Uebergang zu echten Projekten

Wenn VetApp und Sonos TTS als Case Studies fertig sind, laesst sich das Layout sauber ersetzen:

**Variante A (asymmetrisch, beibehaltend):** Das bestehende 65/35-Grid von WorkSection.tsx wieder aufnehmen. VetApp als Featured Card (65%), Sonos TTS als kleinere Card (35%). Die "Kein Platz fuer Alibi"-Card faellt komplett raus.

**Variante B (horizontal, linear):** Zwei gleichgrosse Cards nebeneinander, je 50% Breite, gleiche Hoehe (360px). Klarer Schnitt, keine Hierarchie zwischen den Projekten — sie sind gleichwertig.

**Was nicht aendern muss:** Section-Header, Eyebrow, Animation-Architektur. Nur `WorkSection.tsx` austauschen. Der Rest des Systems bleibt.

**Empfehlung:** Sobald VetApp live ist, sofort umbauen. Der zeitliche Abstand zwischen "Kein Platz fuer Alibi" und echten Projekten sollte fuer den Besucher kuerzer sein als er fuehlt — das erzeugt positive Ueberraschung.

---

## Abhaengigkeiten fuer den Developer

### Hero SVG:
1. `Hero.tsx` — Dot-Grid und Indigo-Glow-Div raus, SVG-Element und lokaler Radialverlauf rein
2. `HeroAnimations.tsx` — SVG-Load-Animation + Idle-Loops + ScrollTrigger-Logik hinzufuegen
3. `globals.css` — `@keyframes scrollLine` bleibt, kein Scroll-Hint entfernen
4. **Kein neues CSS notwendig** — alle Farben kommen aus bestehenden Tokens

### Work-Section:
1. `WorkSection.tsx` — kompletter Umbau des Card-Bereichs, Section-Header-Text anpassen
2. `content.ts` in `src/data/` pruefen — eventuell projects-Array leeren oder komplett entfernen; WorkSection muss nicht mehr aus `content.ts` lesen
3. **Kein neues CSS notwendig**

### Kein Typ-Check-Risiko:
- Das SVG ist JSX im TSX-File, alle Attribute sind valide SVG-Props
- Neue Komponente fuer das SVG empfohlen: `GravitationalField.tsx` (Server Component, kein 'use client') — reine Darstellung, Animation laeuft in HeroAnimations
- `GravitationalField` bekommt optionale Props: `size?: number` (default 480), `className?: string`

---

## Offen / Fragen an Claas

1. **Copy-Freigabe:** Welcher Headline-Vorschlag fuer die Work-Card? Empfehlung: "Kein Platz fuer Alibi."
2. **Eyebrow Work-Section:** "ARBEIT" oder "REFERENZEN" statt "Projekte"?
3. **Section-H2:** Behalten ("Ausgewaehlte Projekte." anpassen zu "In Arbeit.") oder ganz weglassen?
4. **Timing Hero-SVG:** Soll das SVG auch beim ersten Load-Impression die Rings einzeln nacheinander einblenden (Stagger von aussen nach innen), oder als Gruppe? Stagger ist cineastischer, als Gruppe ist cleaner.
5. **feTurbulence-Filter:** Manche Designer/Devs finden den subtilen Verzerrungseffekt zu "unfertig". Falls gewuenscht: Filter kann komplett entfernt werden, Ringe sind dann perfekt rund. Ich wuerde ihn behalten.
