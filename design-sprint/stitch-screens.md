# Stitch Screen-Prompts — Nullpunkt Website
**Erstellt:** 2026-04-06
**Designer:** Designerin, Agentur
**Design-Richtung:** Hybrid E+A mit C-Tonalität (Score 43/50)
**Status:** Prompts fertig — Stitch MCP nicht verfügbar in dieser Session, manuelle Ausführung nötig

---

## Kontext

Die bestehende Website hat folgende Schwächen die diese Screens adressieren:
- Hero ist zentriert statt links-ausgerichtet — verliert editoriale Spannung
- Services als gleichwertige Kacheln (auto-fill grid, minmax 280px) — kein Rhythmus, keine Hierarchie
- Work als gleichwertiges 3er-Grid — keine visuelle Gewichtung
- Typografie-Hierarchie zu flach: H2 bei `clamp(1.75rem, 4vw, 2.75rem)` — zu nah am Body

**Bestehende Stärken die beibehalten werden:**
- Syne + Inter + JetBrains Mono — richtige Wahl, bleibt
- Indigo #6366F1 als einziger Akzent — bleibt
- Navigation "0." Logo + Blur-Backdrop — gut, bleibt
- Metapher-Token-System (void, event-horizon, lensing, corona) — beibehalten

---

## Screen 1 — Hero Section

**Dateiname nach Generierung:** `screen-01-hero.png`

### Stitch-Prompt

```
Design a hero section for "Nullpunkt" — a German AI agency website. Light theme.

LAYOUT: Full viewport height. Left-aligned content, not centered. Content starts at 35% from top. Maximum 40% of viewport height used by text elements, rest is breathing room.

NAVIGATION (top): Fixed minimal nav, 72px height. Logo left: "0." in JetBrains Mono, bold, 1.25rem, letter-spacing 0.05em, color #0A0A0F. Nav links center/right: "Projekte · Leistungen · Über uns" in Inter 14px, color #5A5A6E. CTA button right: "Projekt starten" small, Indigo #6366F1 background, white text, border-radius 6px. Backdrop blur background rgba(248,247,245,0.85).

HERO CONTENT (left-aligned, max-width 1200px container, 12% padding left):
- Eyebrow label: "KI-Agentur" in JetBrains Mono, 11px, uppercase, letter-spacing 0.15em, color #6366F1
- Gap 16px
- H1 headline: "Wo Ideen / Masse / gewinnen." — each phrase on its own line, Syne font, 110px size, font-weight 800, letter-spacing -0.04em, line-height 0.90, color #0A0A0F. "Masse" in Indigo #6366F1.
- Gap 32px
- Subline: "Design und Engineering ohne Kompromiss." Inter, 18px, color #5A5A6E, max-width 420px
- Gap 48px
- CTAs: Primary button "Projekte ansehen" — Indigo bg #6366F1, white text, Syne font, 15px, px-7 py-3.5. Secondary link "Projekt starten →" text only, color #5A5A6E, underline

BACKGROUND: Off-white #F8F7F5. Very subtle dot-grid pattern (Indigo rgba(99,102,241,0.04), 64px spacing). Extremely faint radial gradient glow center-left, Indigo rgba(99,102,241,0.05), 800px radius.

BOTTOM: Scroll indicator centered bottom, "Scroll" in JetBrains Mono 10px uppercase, thin vertical line below fading to transparent.

TYPOGRAPHY SYSTEM: Syne for display, Inter for body, JetBrains Mono for labels/code accents. All negative tracking on display text.
```

### Design-Entscheidungen erklärt

- **Links-ausgerichtet statt zentriert:** Zentrierter Hero wirkt wie eine Präsentation, links-ausgerichteter wie ein Manifesto. Auros, Basement, Monopo — alle großen Referenzen sind links-ausgerichtet.
- **110px H1:** Derzeit `clamp(3.5rem, 10vw, 9rem)` = max 144px, aber durch die dreizeilige Struktur und Zentrierung verliert es Gewicht. Links-ausgerichtet mit 110px fester Größe sitzt besser.
- **Dreizeiliger Claim:** "Wo Ideen / Masse / gewinnen." — jede Zeile ein Beat. "Masse" in Indigo bricht die Monochromatik an der semantisch richtigen Stelle.
- **Background #F8F7F5 statt #F5F5F7:** Einen Tick wärmer. #F5F5F7 hat einen kühlen Blaustich der mit Indigo konkurriert.

---

## Screen 2 — Services Section

**Dateiname nach Generierung:** `screen-02-services.png`

### Stitch-Prompt

```
Design a services section for "Nullpunkt" German AI agency. Light theme, editorial numbered list layout — NOT card grid.

SECTION LAYOUT: White background #FFFFFF. 160px top/bottom padding. Max-width 1200px container, centered.

SECTION HEADER (left):
- Eyebrow: "Leistungen" in JetBrains Mono, 11px, uppercase, letter-spacing 0.15em, color #6366F1
- H2: "Was wir / bauen." Syne, 56px, font-weight 800, letter-spacing -0.03em, line-height 0.92, color #0A0A0F. Two lines: "Was wir" then "bauen."
- Subline: "Strategie, Design und Engineering aus einer Hand." Inter 17px, color #5A5A6E

SERVICES LIST (full width, below header, 64px gap between header and list):
Three services as horizontal rows with full-width divider lines between them. Each row:
- Left column (15% width): Huge decorative number "01", "02", "03" — Syne, 80px, font-weight 800, color rgba(99,102,241,0.15), letter-spacing -0.04em
- Middle column (55% width): Service name in Syne 28px bold #0A0A0F, then description in Inter 16px #5A5A6E below, max 2 lines
- Right column (30% width): Tags/tech stack as small mono labels in JetBrains Mono 12px, color #6366F1, separated by spaces. Plus "→" arrow link right-aligned, color #5A5A6E
- Full-width 1px divider line rgba(0,0,0,0.06) between each row

SERVICES CONTENT:
01 — "KI-Automatisierung" / "Workflows die arbeiten während du schläfst." / tags: LLM · Agents · APIs
02 — "Interface Design" / "Produkte die man versteht bevor man denkt." / tags: UX · React · Motion
03 — "Strategie & Aufbau" / "Der richtige Start, bevor der erste Commit." / tags: Audit · Roadmap · MVP

VISUAL DETAIL: The numbers are purely decorative — large, light, background-like. The actual service name carries the visual weight. Strong typographic hierarchy: number (decorative) → name (bold, prominent) → description (quiet) → tags (mono, accent).

No icons. No cards. No shadows on individual items. This is editorial, not product-catalogue.
```

### Design-Entscheidungen erklärt

- **Nummerierte Liste statt Kacheln:** Die aktuelle `auto-fill minmax(280px, 1fr)` Kachel-Lösung ist das Anti-Pattern das im Research-Briefing explizit als "was Activecampaign falsch macht" genannt wird. Jede Kachel wirkt gleichwertig, es gibt keine Hierarchie.
- **Dekorative Ziffern 80px rgba(15%):** Die Zahl ist ein visuelles Kompositionselement, kein Inhalt. Auros setzt das meisterhaft ein. Der User liest "01" nicht, er spürt die Struktur.
- **H2 auf 56px:** Gegenüber den derzeit `clamp(1.75rem, 4vw, 2.75rem)` = max 44px eine spürbare Steigerung. Die Hierarchie zu H1 (110px) bleibt klar, aber die Section gewinnt Gewicht.
- **Divider statt Card-Border:** Eine 1px Linie trennt sauberer als Schatten und Rundungen bei Listen-Layouts.

---

## Screen 3 — Work/Projekte Section

**Dateiname nach Generierung:** `screen-03-work.png`

### Stitch-Prompt

```
Design a work/projects section for "Nullpunkt" German AI agency website. Asymmetric layout, NOT equal-width grid.

SECTION: Background #F8F7F5 (off-white). 160px top/bottom padding. Max-width 1400px container.

SECTION HEADER (split row):
- Left: Eyebrow "Projekte" JetBrains Mono 11px uppercase letter-spacing 0.15em color #6366F1, then H2 "Ausgewählte / Projekte." Syne 56px weight 800 letter-spacing -0.03em line-height 0.92 color #0A0A0F
- Right (same row, aligned to baseline): "Alle ansehen →" Inter 14px color #5A5A6E

ASYMMETRIC PROJECT LAYOUT (two-column, NOT equal):
Left column (65% width): ONE large featured project card, 500px height
Right column (35% width): TWO stacked smaller cards, each 235px height, 16px gap

LEFT CARD — "VetConnect" (featured):
- Top 65% of card: gradient background linear-gradient(135deg, #667eea 0%, #764ba2 100%) with abstract organic SVG shapes (white, opacity 0.12)
- Bottom 35% white: "VetConnect" Syne 24px bold color #0A0A0F, tags below "Web App · React · KI" as small pills bg rgba(99,102,241,0.08) color #6366F1 Inter 12px
- Card: border-radius 16px, shadow 0 8px 32px rgba(0,0,0,0.08), overflow hidden
- Tag top-left in gradient area: "Gesundheit" as small pill rgba(255,255,255,0.18) white text 11px

RIGHT TOP CARD — "Horizon Dashboard":
- Top 55%: gradient linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) with chart/line SVG shapes white opacity 0.12
- Bottom 45% white: "Horizon" Syne 20px bold, tag "Dashboard · Daten"
- Same border-radius and shadow

RIGHT BOTTOM CARD — "Meridian Brand":
- Top 55%: gradient linear-gradient(135deg, #f093fb 0%, #f5576c 100%) with geometric circle SVG shapes white opacity 0.12
- Bottom 45% white: "Meridian" Syne 20px bold, tag "Branding · Identity"
- Same border-radius and shadow

VISUAL TENSION: The asymmetry (65/35) creates visual hierarchy — featured project dominates, others support. This is intentional. Not three equal boxes.
```

### Design-Entscheidungen erklärt

- **65/35 statt 33/33/33:** Das `auto-fill minmax(320px, 1fr)` des bestehenden Codes erzeugt drei gleichwertige Karten. Das ist das "Kacheln-Anti-Pattern". Die Asymmetrie ist kein ästhetisches Mittel sondern eine inhaltliche Aussage: VetConnect ist das Featured-Projekt.
- **500px linke Card vs. 235px rechts:** Die Proportionen stammen aus der Basement Studio Analyse — Case Study Karten "sind groß: Sie zeigen das Projekt-Visual in voller Breite, nicht als Thumbnail".
- **Off-white #F8F7F5 als Section-Hintergrund:** Visuelle Differenzierung zur weißen Services-Section. Kein dramatischer Sprung, aber wahrnehmbar.

---

## Screen 4 — Full Page Overview

**Dateiname nach Generierung:** `screen-04-fullpage.png`

### Stitch-Prompt

```
Design a full-page overview of the complete "Nullpunkt" AI agency website showing all sections stacked vertically. Compact overview showing the full page flow. Font stack: Syne (display), Inter (body), JetBrains Mono (mono accents). Primary accent: Indigo #6366F1.

SECTION 1 — NAVIGATION (fixed, 72px):
Logo "0." JetBrains Mono bold left. Nav links "Projekte · Leistungen · Über uns" center. CTA button "Projekt starten" right Indigo #6366F1. Background rgba(248,247,245,0.85) blur.

SECTION 2 — HERO (~60vh):
Background #F8F7F5 with subtle dot-grid. Left-aligned content. Large "Wo Ideen / Masse / gewinnen." Syne 90px letter-spacing -0.04em. "Masse" in Indigo #6366F1. Eyebrow "KI-Agentur" mono above. Subline + dual CTAs below. Faint Indigo glow.

SECTION 3 — SERVICES (~45vh):
White #FFFFFF background. "Was wir / bauen." H2 Syne 50px left. Numbered editorial list: 01 KI-Automatisierung / 02 Interface Design / 03 Strategie & Aufbau. Large decorative numbers rgba(99,102,241,0.15). Full-width dividers between rows.

SECTION 4 — WORK (~45vh):
Background #F8F7F5. "Ausgewählte / Projekte." H2. Asymmetric layout: large card left (VetConnect, 65%), two smaller cards stacked right (35%).

SECTION 5 — CTA/CONTACT (~20vh):
Background very light Indigo tint #F0EFFF. Centered: "Bereit?" Syne 64px #0A0A0F. "Lass uns reden." Inter 20px #5A5A6E. Single CTA button Indigo. Email "hallo@nullpunkt.cc" JetBrains Mono 13px color #5A5A6E below.

SECTION 6 — FOOTER (compact):
Border-top divider rgba(0,0,0,0.06). "0. Nullpunkt" Syne left, nav links "Projekte · Leistungen · Über uns · Kontakt" Inter center, "nullpunkt.cc" JetBrains Mono right. Background #F8F7F5. All text color #5A5A6E.

VISUAL FLOW: Sections breathe — 160px between them. Typography carries the weight, not decoration. Background alternates subtly: off-white → white → off-white → light Indigo tint → off-white. The page feels like one coherent document, not assembled puzzle pieces.
```

### Design-Entscheidungen erklärt

- **Section-Hintergrund-Rhythmus:** Off-white → weiß → off-white → Indigo-Tint → off-white. Kein harter Schnitt, kein dramatischer Block. Genau das Stripe-Pattern aus dem Research: "Section-Breaks durch subtile Hintergrundwechsel".
- **CTA-Section mit Indigo-Tint:** #F0EFFF als sehr helles Lila-Weiß. Nicht die Indigo-Farbe selbst sondern ihre leichteste Variation. Signalisiert "das ist der Abschluss" ohne Showoff.
- **Footer ultra-minimal:** Logo, Nav, Domain. Drei Spalten. Kein Clutter. Die Site hat Autorität — der Footer muss das nicht mehr retten.

---

## Manuelle Ausführung

Das Stitch MCP-Tool (`mcp__stitch`) war in dieser Session nicht verfügbar (Tool not found). Die Prompts sind fertig formuliert und können direkt verwendet werden:

**Option A — Stitch Web:** https://stitch.withgoogle.com
Jeden Prompt direkt ins Textfeld, Type: Webpage

**Option B — MCP in nächster Session:** Brian aktiviert das Stitch-MCP korrekt, dann können die Prompts als `mcp__stitch__generate_ui` Calls ausgeführt werden.

**Option C — Alternative Tools:** Prompts funktionieren auch in v0.dev (Vercel), Locofy, oder als Basis für direkte Code-Implementierung.

---

## Erwartete Screen-Ergebnisse und nächste Schritte

Wenn die Screens generiert sind, prüfe ich:

1. **Hero:** Atmet die Seite? Ist der Claim dominant genug ohne zu schreien? Sitzt das negative Tracking?
2. **Services:** Fühlt sich die Nummerierung strukturierend an (nicht dekorativ)? Lesereihenfolge klar?
3. **Work:** Zieht die linke große Card den Blick sofort? Wirken rechts die kleineren Cards als Ergänzung, nicht Konkurrenz?
4. **Fullpage:** Fließt die Seite? Gibt es Punkte wo das Auge "hängen bleibt" (= zu viel oder zu wenig Kontrast zwischen Sections)?

**Nach Screen-Review:** Developer-Handoff mit konkreten CSS-Werten und Component-Änderungen (ServicesSection.tsx, WorkSection.tsx, Hero.tsx, globals.css).

---

## Offene Entscheidungen (noch nicht final)

- **Hero-Claim Varianten:** "Wo Ideen Masse gewinnen." (aktuell) vs. "Der Nullpunkt kommt vor dem Start." vs. schlicht "Nullpunkt." — Screens könnten alle drei testen
- **Services-Texte:** Die drei Service-Beschreibungen sind Platzhalter. Brauchen scharfes Copywriting bevor Launch
- **Projekt-Visuals:** Derzeit Farbverläufe als Platzhalter. Echte Screenshots wenn verfügbar deutlich stärker
- **CTA-Section:** Noch kein eigenes Component in `page.tsx` — muss neu gebaut werden
