# QA Report — Nullpunkt Website Redesign
**Datum:** 2026-04-06
**Reviewer:** QA Agent (Claude Sonnet 4.6)
**Projekt:** agency-website — "Hybrid E+A mit C-Tonalität" Redesign

---

## Build & Type-Check

| Check | Ergebnis |
|-------|----------|
| `npx tsc --noEmit` | CLEAN — Exit 0, keine Fehler |
| `npm run build` | CLEAN — Statisch prerendered, 0 Errors |

**Nebenbefund:** Build-Warning zu Workspace-Root (mehrere lockfiles). Nicht kritisch, aber aufräumenswert.

---

## Befunde

### KRITISCH

Keine kritischen Blocker.

---

### MITTEL

#### M-01 — "Über uns" in Navigation verlinkt auf inexistente Section
**Datei:** `src/components/Navigation.tsx`, Zeile 9
**Problem:** `NAV_LINKS` enthält `{ label: 'Über uns', href: '#about', id: 'about' }`. Die `AboutSection` wurde aus `page.tsx` entfernt und auf `return null` reduziert — es gibt keine DOM-Section mit `id="about"` mehr. Der Link scrollt ins Leere.
**Wirkung:** Nutzer klickt "Über uns", nichts passiert. Active-Detection für `about` in `useActiveSection.ts` kann nie triggern.
**Fix:** Nav-Link `about` entfernen. Array auf drei Einträge kürzen.

#### M-02 — ScrollAnimations queried `#about` — section existiert nicht
**Datei:** `src/components/ScrollAnimations.tsx`, Zeile 11
**Problem:** `const sections = ['#work', '#services', '#about', '#contact']` — `#about` wird nie gefunden, `document.querySelector('#about')` gibt `null` zurück. Die Funktion greift zwar, überspringt es per Guard (`if (!section) return`), aber der Eintrag ist toter Code mit irreführendem Inhalt.
**Fix:** `'#about'` aus dem Array entfernen.

#### M-03 — useActiveSection kennt noch `'about'` als SectionId
**Datei:** `src/lib/hooks/useActiveSection.ts`, Zeile 5
**Problem:** `SECTION_IDS = ['work', 'services', 'about', 'contact']` — `about` findet kein DOM-Element, die `elements.filter`-Zeile filtert es heraus. Kein Runtime-Crash, aber SectionId-Type enthält einen toten Wert. Konsistenz verletzt.
**Fix:** `'about'` aus `SECTION_IDS` entfernen.

#### M-04 — "Alle ansehen" Link ist ein Stub (`href="#"`)
**Datei:** `src/components/WorkSection.tsx`, Zeile 61
**Problem:** Der Link "Alle ansehen →" zeigt auf `#`. Kein Scroll-Target, kein externer Link. Springt zum Seitenanfang.
**Fix:** Entweder auf eine echte Zielseite verlinken oder den Link temporär ausblenden (`display: none`) bis eine `/projekte`-Seite existiert. Einen sichtbaren, aktiv beworbenen Link ins Leere zu setzen ist UX-Schaden.

---

### NIEDRIG

#### N-01 — Hardcodierter Hex-Wert `#6366F1` in mehreren Komponenten
**Dateien:** `Hero.tsx` (Z.85), `ServicesSection.tsx` (Z.89, Z.99), `ContactSection.tsx` (Z.43)
**Problem:** `#6366F1` entspricht `--color-accent-light` aus `globals.css`. Der Wert ist im CSS-System als Variable definiert, wird aber in Komponenten als direkter Hex-Wert verwendet. Das Farbsystem verliert seine Single-Source-of-Truth.
**Fix:** `#6366F1` durch `var(--accent-light)` ersetzen. `rgba(99, 102, 241, ...)` analog als `rgba(var(--accent-light-rgb), ...)` — oder akzeptiert als-ist wenn keine Darkmode-Pläne bestehen.

#### N-02 — Dot-Grid und Indigo-Glow im Hero als inline styles
**Datei:** `src/components/Hero.tsx`, Zeilen 34–53
**Problem:** Dekorative Hintergrunds-Effekte sind als inline `style`-Objekte implementiert. Kein Tailwind-Breakpoint-Handling möglich. Auf mobilen Geräten kleiner als 375px kann das `700px` große Glow-Element horizontal überlaufen (der `overflow-hidden` auf der Section müsste das abfangen, ist aber vorhanden).
**Bewertung:** Akzeptabel solange keine Responsive-Anpassung dieser Effekte nötig ist. Section hat `overflow-hidden`.

#### N-03 — AbschnittSection als Zombie-Export
**Datei:** `src/components/AboutSection.tsx`
**Problem:** Die Datei existiert noch mit `export function AboutSection() { return null }`. Sie wird von `page.tsx` nicht importiert — aber der Export ist aktiv und die Datei liegt in `components/`. Verwirrungspotenzial für zukünftige Devs.
**Fix:** Datei löschen, oder behalten wenn die Section langfristig wiederkommt. Im zweiten Fall: Kommentar erweitern mit TODO-Datum.

#### N-04 — `data-reveal-element` auf `h1` gesetzt aber wird von HeroAnimations explizit ausgenommen
**Datei:** `src/components/Hero.tsx`, Zeile 78
**Problem:** `h1` hat `data-reveal-element data-reveal-delay="1"`, der querySelector in `HeroAnimations.tsx` filtert aber `[data-reveal-element]:not(h1)` aktiv heraus. Das `h1`-Element startet mit `opacity: 0; transform: translateY(20px)` aus `globals.css` (`[data-reveal-element]`-Regel) und wird nie zurückgesetzt — nur die `RevealLine`-Kinder werden animiert.
**Wirkung:** In der Praxis kein sichtbares Problem, weil die `RevealLine`-Spans die visuelle Wahrnehmung dominieren und die `h1` als Container unsichtbar bleibt. Aber: wenn GSAP aus irgendeinem Grund nicht lädt (NoScript, Fehler), bleibt die komplette Headline `opacity: 0`. Ein Verfügbarkeitsrisiko.
**Fix:** `data-reveal-element` und `data-reveal-delay` vom `h1`-Element entfernen. Das `overflow-hidden` auf den `RevealLine`-Spans erledigt die visuelle Containment bereits korrekt.

#### N-05 — `utils.ts` (cn-Helper) ist ungenutzt
**Datei:** `src/lib/utils.ts`
**Problem:** Die `cn()`-Funktion ist deklariert, wird aber in keiner Komponente importiert. Toter Code.
**Bewertung:** Kein Bug. Üblicherweise als Utility vorgehalten. Ignorierbar.

#### N-06 — Responsive: ServicesSection Grid bricht auf Mobile nicht ab
**Datei:** `src/components/ServicesSection.tsx`, Zeile 36
**Problem:** `gridTemplateColumns: '80px 1fr auto'` ist per inline style gesetzt ohne Breakpoint-Fallback. Auf mobilen Viewports (375px) sind 80px Zahl + flexibler Text + Tags-Spalte zusammen sehr eng. Tags werden durch `hidden sm:flex` korrekt ausgeblendet. Ohne Playwright-Test nicht visuell verifizierbar — als Niedrig eingestuft.
**Empfehlung:** Visuell auf 375px testen sobald Playwright verfügbar ist.

#### N-07 — `scrollLine`-Animation: transform-origin-Wechsel via CSS-Keyframes ist nicht vollständig standardkonform
**Datei:** `src/app/globals.css`, Zeilen 184–189
**Problem:** Keyframe wechselt `transform-origin` zwischen 50% und 51% — das ist ein verbreiteter Hack und funktioniert in allen modernen Browsern, ist aber nicht explizit spec-konform. Kein echtes Risiko, nur notiert.

---

## Accessibility-Check

| Punkt | Status |
|-------|--------|
| `lang="de"` auf `<html>` | OK |
| `aria-label` auf `<section>`-Elementen | OK (Hero, Work, Services, Contact) |
| `aria-label` auf Navigation | OK (Haupt- und Footer-Nav) |
| `aria-hidden` auf Dekor-Elementen | OK (SVGs, Dot-Grid, Scroll-Hint) |
| `aria-expanded` + `aria-controls` auf Hamburger | OK |
| `tabIndex=-1` auf mobilen Links wenn geschlossen | OK |
| `:focus-visible` Outline | OK |
| Semantisches HTML (`article`, `nav`, `footer`) | OK |
| Kontrast `#6366F1` auf `#F0EFFF` (ContactSection-Button) | Bestanden — Verhältnis ca. 3.2:1 für weißen Text auf `#6366F1` — **Grenzwertig** für AA (Fließtext 4.5:1). Für Buttons (Large Text) ist 3:1 ausreichend. Akzeptiert. |

---

## Design-Konsistenz

| Punkt | Status |
|-------|--------|
| Typografie-Hierarchie H1 > H2 > H3 > Body | OK — via globals.css konsistent |
| Section-Padding via `.section-padding` | OK — Hero, Work, Services, Contact verwenden es |
| `--accent` vs. `--accent-light` Verwendung | INKONSISTENT — siehe N-01 |
| Farbsystem Indigo-Tint in ContactSection | Inline `#F0EFFF` — kein Systemwert. Akzeptabel als einmalige CTA-Farbe |
| Spacing-Grid | Weitgehend konsistent — clamp-Werte variieren aber systematisch |

---

## GSAP / Animation Review

| Punkt | Status |
|-------|--------|
| `data-reveal-line` / `data-reveal-text` im Hero | OK — vorhanden, korrekte Verschachtelung |
| `data-reveal-element` auf Eyebrow, Subline, CTAs | OK |
| `data-reveal-element` auf `h1` | PROBLEM — siehe N-04 |
| `data-animate` in Work, Services, Contact | OK — alle animierbaren Elemente getaggt |
| `data-animate` initial-state in globals.css | OK — `opacity:0; transform: translateY(40px)` |
| ScrollAnimations queried `#about` | DEAD CODE — siehe M-02 |
| GSAP-Context cleanup via `ctx.revert()` | OK |
| Lenis + ScrollTrigger.update() im RAF | OK |

---

## Playwright-Smoke-Test

**Playwright MCP war im aktuellen Agent-Thread nicht verfügbar** (`mcp__playwright__browser_navigate` — No such tool). Dev-Server lief erfolgreich auf Port 3000 (HTTP 200 bestätigt). Visuelle Verifikation konnte nicht durchgeführt werden.

**Empfehlung:** Smoke-Test manuell oder in einem Playwright-fähigen Environment nachziehen. Fokus auf:
- ServicesSection Mobile 375px (Grid-Kollaps, N-06)
- Hero auf kleinen Viewports (`clamp(1.5rem, 12%, 10rem)` Padding)
- "Über uns" Link — sichtbarer Non-Scroll (M-01)

---

## Gesamtbewertung

**FIXES NÖTIG** — kein Blocker, aber 3 Mittel-Findings die vor Go-Live behoben werden sollten.

### Pflicht vor Go-Live
1. **M-01** — "Über uns"-Link aus Navigation entfernen
2. **M-02** — `#about` aus ScrollAnimations-Array entfernen
3. **M-03** — `'about'` aus useActiveSection SECTION_IDS entfernen
4. **M-04** — Stub-Link "Alle ansehen" entfernen oder deaktivieren

### Empfohlen
5. **N-04** — `data-reveal-element` vom `h1` entfernen (NoScript-Schutz)
6. Visueller Smoke-Test auf 375px Mobile

### Ignorierbar / Tech-Debt
- N-01 (Hex vs CSS-Var) — wenn kein Darkmode geplant
- N-03 (AboutSection Zombie) — nach finaler Entscheidung aufräumen
- N-05 (cn ungenutzt) — Standard-Utility-Pattern

---

*Kein console.log-Debug-Code gefunden. Build und TypeScript vollständig clean.*
