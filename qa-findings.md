# QA Findings — Agency Website

**Datum:** 2026-04-05
**Pruefumfang:** Vollstaendiger Code-Review — page.tsx, Hero.tsx, HeroAnimations.tsx, ScrollAnimations.tsx, Navigation.tsx, LenisProvider.tsx, layout.tsx, globals.css, useGSAP.ts, useActiveSection.ts, useLenis.ts, animations/index.ts
**Type-Check:** Bestanden (0 Fehler)

---

## Findings (nach Schwere sortiert)

---

### F1 — HeroAnimations animiert von `translateY(100%)` ohne vorherigen Set-State — Flash-Risiko

**Schwere:** Kritisch
**Was:** `HeroAnimations.tsx` Zeile 18 ruft direkt `gsap.to(text, { y: '0%' })` auf, ohne vorher `gsap.set(text, { y: '100%' })` zu setzen. Der Initialzustand liegt ausschliesslich im CSS (`globals.css` Zeile 96–98: `[data-reveal-text] { transform: translateY(100%) }`). Das funktioniert nur, wenn das CSS vor GSAP greift. In React mit Server-Side Rendering kann GSAP nach Hydration kurz einen Frame rendern, in dem GSAP den CSS-Zustand nicht kennt und von `y: 0` nach `y: 0` animiert — Text ist sofort sichtbar statt animiert.
**Wo:** `/src/components/HeroAnimations.tsx`, Zeile 18
**Warum kritisch:** Der Text-Reveal-Effekt — das zentrale visuelle Element der Hero-Section — funktioniert nicht zuverlaessig. Besonders auf schnellen Verbindungen oder nach Hard-Refresh.
**Fix:** Vor dem `gsap.to()` ein `gsap.set()` hinzufuegen:
```ts
gsap.set(text, { y: '100%' })
gsap.to(text, { y: '0%', duration: 0.8, ease: 'power3.out', delay: delaySec })
```

---

### F2 — ScrollAnimations registriert ScrollTrigger nicht — Plugin fehlt

**Schwere:** Kritisch
**Was:** `ScrollAnimations.tsx` importiert `ScrollTrigger` aus `gsap/ScrollTrigger` und nutzt es in der `scrollTrigger`-Option. `gsap.registerPlugin(ScrollTrigger)` wird jedoch nur in `useGSAP.ts` aufgerufen (Zeile 8). `ScrollAnimations.tsx` importiert `useGSAP` und verlasst sich darauf, dass das Plugin bereits registriert ist — das stimmt nur wenn `useGSAP` zuerst importiert wird. Die Registration in `useGSAP.ts` ist ein Nebeneffekt des Imports, nicht explizit. Wenn die Import-Reihenfolge sich aendert oder das Modul isoliert getestet wird, bricht das stumm.
**Wo:** `/src/components/ScrollAnimations.tsx`, Zeile 1–6
**Warum kritisch:** ScrollTrigger-Animationen schiessen nie an, wenn das Plugin zum Zeitpunkt des `gsap.to()`-Aufrufs nicht registriert ist — GSAP ignoriert unbekannte Plugin-Optionen ohne Fehler.
**Fix:** `gsap.registerPlugin(ScrollTrigger)` direkt in `ScrollAnimations.tsx` hinzufuegen (doppelte Registration ist in GSAP kein Problem).

---

### F3 — Lenis nicht mit ScrollTrigger verbunden — ScrollTrigger.update() fehlt

**Schwere:** Kritisch
**Was:** `useLenis.ts` initialisiert Lenis mit einem eigenen RAF-Loop. Lenis uebernimmt das native Scroll-Verhalten und leitet scroll-Events um. ScrollTrigger (in `ScrollAnimations.tsx`) lauscht jedoch auf native Scroll-Events des Browsers. Ohne explizite Verbindung weiss ScrollTrigger nicht von Lenis' virtueller Scroll-Position. Die Folge: ScrollTrigger-Trigger-Punkte stimmen nicht mit der tatsaechlichen Scroll-Position ueberein oder feuern gar nicht.
**Wo:** `/src/lib/hooks/useLenis.ts`, Zeilen 19–26
**Warum kritisch:** Alle vier Scroll-Animationen (Work, Services, About, Contact) koennen stumm versagen — Elemente bleiben permanent auf `opacity: 0` (Initialzustand aus globals.css). Das ist "was fehlt".
**Fix:** Im Lenis RAF-Callback `ScrollTrigger.update()` aufrufen:
```ts
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function raf(time: number) {
  lenis.raf(time)
  ScrollTrigger.update()
  rafId = requestAnimationFrame(raf)
}
```

---

### F4 — `[data-animate]` Elemente bleiben bei opacity:0 wenn ScrollTrigger nicht feuert

**Schwere:** Kritisch (Folge von F3)
**Was:** `globals.css` Zeile 105–108 setzt alle `[data-animate]`-Elemente auf `opacity: 0; transform: translateY(40px)`. Das betrifft alle Section-Ueberschriften, -Texte und -Karten in Work, Services, About und Contact (mind. 20 Elemente). Wenn ScrollTrigger aufgrund von F3 nicht feuert, sind diese Elemente permanent unsichtbar. Der User sieht leere Sections — die wahrscheinlichste Ursache fuer Claas' Gefuehl "da fehlt etwas".
**Wo:** `/src/app/globals.css`, Zeile 105–108; alle `data-animate`-Attribute in `/src/app/page.tsx`
**Fix:** F3 beheben. Als Fallback-Sicherung: CSS `transition` auf die Elemente setzen damit sie als CSS-Fallback sichtbar bleiben wenn JS versagt — oder `prefers-reduced-motion` respektieren und Animationen dort nicht setzen.

---

### F5 — `useGSAP` uebergibt `containerRef` als Context-Root, nutzt ihn aber nie

**Schwere:** Mittel
**Was:** `useGSAP.ts` erstellt einen `containerRef` (Zeile 14), uebergibt ihn an `gsap.context()` als zweiten Parameter (Zeile 17) und gibt ihn zurueck (Zeile 27). Beide Aufrufer — `HeroAnimations.tsx` und `ScrollAnimations.tsx` — ignorieren den Rueckgabewert komplett. Ohne gebundenen Container arbeitet `gsap.context()` im globalen Scope. Das bedeutet: `ctx.revert()` beim Cleanup reverts alle GSAP-Animationen im gesamten Dokument, nicht nur die der Komponente. Bei zwei gleichzeitig aktiven useGSAP-Instanzen (HeroAnimations + ScrollAnimations) bricht der Cleanup des einen den anderen.
**Wo:** `/src/lib/hooks/useGSAP.ts`, Zeilen 14, 17, 27; `/src/components/HeroAnimations.tsx` Zeile 7; `/src/components/ScrollAnimations.tsx` Zeile 8
**Fix:** Entweder den `containerRef` in den aufrufenden Komponenten an ein DOM-Element binden (`const ref = useGSAP(...); return <div ref={ref}>...</div>`) — oder den `containerRef` aus `useGSAP` entfernen und `gsap.context()` ohne Container aufrufen, dafuer aber Cleanup-Scope explizit managen.

---

### F6 — `gsap.context()` mit `containerRef.current = null` ist kein gueltiger Scope

**Schwere:** Mittel
**Was:** `containerRef` ist beim ersten Render `null` (Zeile 14: `useRef<HTMLElement | null>(null)`). `gsap.context(callback, null)` ist in GSAP nicht dokumentiert und verhalt sich wie `gsap.context(callback)` — also globaler Scope. Das ist nicht zwingend ein Bug, aber die API-Nutzung ist falsch und der Code kommuniziert eine Absicht (scoped context), die nie umgesetzt wird.
**Wo:** `/src/lib/hooks/useGSAP.ts`, Zeile 17
**Fix:** Entweder Container korrekt binden (siehe F5) oder den zweiten Parameter weglassen.

---

### F7 — `framer-motion` installiert aber nirgendwo genutzt

**Schwere:** Niedrig
**Was:** `package.json` Zeile 8 listet `framer-motion: ^12.38.0` als Dependency. Kein einziger Import in den geprueften Dateien nutzt Framer Motion. Die Library ist ~40KB gzip und landet im Bundle obwohl GSAP verwendet wird.
**Wo:** `/c/Users/claas/claude-workspace/agency-website/package.json`, Zeile 8
**Fix:** `npm uninstall framer-motion` — es sei denn, zukuenftige Komponenten sind geplant.

---

### F8 — `animations/index.ts` ist leer und wird nirgendwo importiert

**Schwere:** Niedrig
**Was:** `/src/components/animations/index.ts` enthaelt nur einen Kommentar und `export {}`. Kein Import zeigt auf diesen Pfad. Das File ist toter Code.
**Wo:** `/src/components/animations/index.ts`
**Fix:** Loeschen oder mit echten Animation-Utilities befuellen sobald refactored wird.

---

### F9 — RAF-Cleanup in useLenis cancelt nicht zuverlaessig

**Schwere:** Niedrig
**Was:** Die `raf`-Funktion in `useLenis.ts` aktualisiert `rafId` in jedem Frame (Zeile 21: `rafId = requestAnimationFrame(raf)`). Das ist korrekt — der Cleanup (Zeile 28: `cancelAnimationFrame(rafId)`) cancelt den zuletzt gespeicherten Frame. Funktioniert im Normalfall. Im React StrictMode (Development) wird der Effect zweimal ausgefuehrt: zwei Lenis-Instanzen, zwei RAF-Loops, nur einer wird gecancelt. Resultiert in doppeltem Lenis-Scroll im Dev-Modus.
**Wo:** `/src/lib/hooks/useLenis.ts`, Zeilen 19–28
**Fix:** Kein akuter Bug in Production. In Strict Mode bemerken: ein Warnsignal, kein Crash.

---

### F10 — `lang="de"` im HTML-Element, Inhalte auf Englisch

**Schwere:** Niedrig
**Was:** `layout.tsx` Zeile 35 setzt `lang="de"`. Alle Texte in `page.tsx` und `Hero.tsx` sind auf Englisch ("We craft digital experiences", "Selected Work", etc.). Screen-Reader und SEO-Crawler werten das als Englisch auf Deutsch-deklarierter Seite.
**Wo:** `/src/app/layout.tsx`, Zeile 35
**Fix:** `lang="en"` setzen oder Texte ins Deutsche uebersetzen.

---

## Zusammenfassung

| ID | Problem | Schwere |
|----|---------|---------|
| F1 | HeroAnimations animiert ohne vorherigen GSAP-Set — Flash-Risiko | Kritisch |
| F2 | ScrollTrigger-Plugin nicht explizit in ScrollAnimations registriert | Kritisch |
| F3 | Lenis nicht mit ScrollTrigger verbunden — ScrollTrigger.update() fehlt | Kritisch |
| F4 | Alle data-animate Elemente bleiben opacity:0 (Folge von F3) | Kritisch |
| F5 | useGSAP containerRef nie gebunden — globaler statt scoped Context | Mittel |
| F6 | gsap.context() mit null als Scope-Parameter | Mittel |
| F7 | framer-motion installiert aber ungenutzt | Niedrig |
| F8 | animations/index.ts leer und nicht importiert | Niedrig |
| F9 | RAF-Loop in StrictMode problematisch | Niedrig |
| F10 | lang="de" aber Inhalte auf Englisch | Niedrig |

**Hauptursache fuer "da fehlt etwas":** F3 + F4. Lenis und ScrollTrigger sind nicht verbunden. Alle section-Inhalte (Work, Services, About, Contact) starten mit `opacity: 0` und bleiben es, weil ScrollTrigger nie feuert. Die Sections sind im DOM — aber unsichtbar.

**Naechster Schritt:** Developer behebt F3 (ScrollTrigger.update() in Lenis RAF) und F1 (gsap.set vor gsap.to in HeroAnimations). F2 als Absicherung dazu.
