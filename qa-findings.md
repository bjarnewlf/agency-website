# QA Findings — Agency Website

**Datum:** 2026-04-05 (Update, zweiter Durchlauf)
**Pruefumfang:** Vollstaendiger Code-Review aller src/-Dateien: layout.tsx, page.tsx, globals.css, alle Komponenten, alle Hooks, data/content.ts, lib/utils.ts
**Type-Check:** Bestanden (0 Fehler, npx tsc --noEmit)

---

## Status vorheriger Findings (erster Durchlauf)

| ID | Problem | Status |
|----|---------|--------|
| F1 | HeroAnimations animiert ohne vorherigen GSAP-Set | BEHOBEN — gsap.set() ist jetzt vorhanden (Z. 18 + Z. 34) |
| F2 | ScrollTrigger nicht explizit in ScrollAnimations registriert | BEHOBEN — registerPlugin() in ScrollAnimations.tsx Z. 7 |
| F3 | Lenis nicht mit ScrollTrigger verbunden | BEHOBEN — lenis.on('scroll', ScrollTrigger.update) in useLenis.ts Z. 19 |
| F4 | data-animate Elemente bleiben opacity:0 (Folge von F3) | BEHOBEN (Folge von F3-Fix) |
| F5 | useGSAP containerRef nie gebunden | OFFEN |
| F6 | gsap.context() mit null als Scope-Parameter | OFFEN |
| F7 | framer-motion installiert aber ungenutzt | BEHOBEN — nicht mehr in package.json |
| F8 | animations/index.ts leer und nicht importiert | BEHOBEN — Verzeichnis nicht mehr vorhanden |
| F9 | RAF-Loop in StrictMode problematisch | OFFEN (kein Production-Bug) |
| F10 | lang="de" aber Inhalte auf Englisch | OFFEN |

---

## Aktuelle Findings (nach Schwere sortiert)

---

### F-A — `useLenis` verbindet Lenis per Event-Listener statt im RAF-Callback — suboptimal

**Schwere:** Mittel
**Was:** `useLenis.ts` Z. 19 verwendet `lenis.on('scroll', ScrollTrigger.update)`. Die empfohlene Methode (laut Lenis-Dokumentation und GSAP-Integration-Guide) ist es, `ScrollTrigger.update()` im RAF-Callback aufzurufen — direkt nach `lenis.raf(time)`. Der Event-Listener-Ansatz funktioniert prinzipiell, aber der Aufruf-Zeitpunkt ist vom Event-System abhaengig, nicht synchron mit dem RAF-Frame. Das kann bei schnellem Scrollen zu einem Frame-Delay fuehren, in dem ScrollTrigger noch den alten Scroll-Stand hat.
**Wo:** `/src/lib/hooks/useLenis.ts`, Zeile 19 + 23–26
**Fix:**
```ts
function raf(time: number) {
  lenis.raf(time)
  ScrollTrigger.update()
  rafId = requestAnimationFrame(raf)
}
// lenis.on('scroll', ScrollTrigger.update) entfernen
```

---

### F-B — `useGSAP` containerRef wird nie gebunden — globaler GSAP-Context

**Schwere:** Mittel
**Was:** `useGSAP.ts` erstellt `containerRef` (Z. 14), uebergibt ihn als zweiten Parameter an `gsap.context()` (Z. 17-19) und gibt ihn zurueck (Z. 27). Beide Aufrufer — `HeroAnimations.tsx` und `ScrollAnimations.tsx` — ignorieren den Rueckgabewert. `containerRef.current` ist immer `null`. Der Ausdruck `containerRef.current || undefined` wird zu `undefined`, also arbeitet `gsap.context()` im globalen Scope.

Konsequenz: `ctx.revert()` im Cleanup reverted alle GSAP-Animationen im gesamten Dokument. Mit zwei gleichzeitig aktiven `useGSAP`-Instanzen (HeroAnimations + ScrollAnimations) zerstoert der Cleanup der einen Komponente die Animationen der anderen. In React StrictMode (Development) tritt das zuverlaessig auf.
**Wo:** `/src/lib/hooks/useGSAP.ts`, Z. 14-27; `/src/components/HeroAnimations.tsx` Z. 7; `/src/components/ScrollAnimations.tsx` Z. 10
**Fix-Option A (sauber):** Den `containerRef` in den aufrufenden Komponenten an ein Wrapper-Element binden:
```tsx
// HeroAnimations.tsx
const containerRef = useGSAP(() => { ... }, [])
return <div ref={containerRef as React.RefObject<HTMLDivElement>} style={{display:'none'}} />
```
**Fix-Option B (pragmatisch):** `containerRef` aus `useGSAP` entfernen, `gsap.context()` ohne zweiten Parameter nutzen und Scope-Isolation ueber den Callback sicherstellen.

---

### F-C — Projektkarten klickbar gemacht (cursor-pointer), aber kein Link — Dead Interaction

**Schwere:** Mittel
**Was:** `WorkSection.tsx` Z. 72 setzt `cursor-pointer` auf die `<article>`-Elemente. Es gibt weder ein `onClick`-Handler noch einen `<a>`-Tag noch `role="button"`. Fuer den User sieht es aus wie ein klickbares Element — er klickt, nichts passiert. Zusaetzlich fehlt damit die Tastaturnavigation (Tab-Focus, Enter-Taste) komplett.
**Wo:** `/src/components/WorkSection.tsx`, Z. 72
**Fix:** Entweder `cursor-pointer` entfernen, bis Links vorhanden sind — oder jeden `<article>` in einen `<a href="/work/[slug]">` wrappen.

---

### F-D — Array-Index als React-Key in Listen — instabile Keys

**Schwere:** Niedrig
**Was:** `WorkSection.tsx` Z. 69, `ServicesSection.tsx` Z. 50, `AboutSection.tsx` Z. 48 verwenden `key={i}` (Array-Index). Bei Listen die sich in Reihenfolge oder Inhalt aendern koennen, fuehrt das zu inkorrektem Re-Rendering und potentiellen Animation-Glitches (GSAP haelt refs auf DOM-Elemente — falsche Reconciliation bricht das).
**Wo:** Drei Stellen (WorkSection Z. 69, ServicesSection Z. 50, AboutSection Z. 48)
**Fix:** Natuerlichen eindeutigen Key verwenden:
- WorkSection: `key={project.title}`
- ServicesSection: `key={service.title}`
- AboutSection: `key={stat.label}`

---

### F-E — Footer-Links zu Impressum und Datenschutz zeigen auf `#` — rechtlich riskant

**Schwere:** Niedrig (im aktuellen Zustand) — Mittel wenn die Seite live geht
**Was:** `Footer.tsx` Z. 36, 43, 82, 88 verwenden `href="#"` fuer Impressum und Datenschutz. Eine deutsche Website ohne Impressum und Datenschutzerklaerung (DSGVO) ist rechtswidrig. Das ist kein Code-Bug, aber ein Deployment-Blocker.
**Wo:** `/src/components/Footer.tsx`, Z. 36, 43, 82, 88
**Fix:** Eigene Seiten `/impressum` und `/datenschutz` erstellen und verlinken.

---

### F-F — `lang="de"` im HTML aber Hero-Headline auf Englisch

**Schwere:** Niedrig
**Was:** `layout.tsx` Z. 35 setzt `lang="de"`. Die Hero-Headline lautet "We craft digital experiences." — Englisch. Screen-Reader verwenden `lang` fuer die Aussprache. Der Text wird auf Deutsch-Phonetik vorgelesen.
**Wo:** `/src/app/layout.tsx`, Z. 35; `/src/components/Hero.tsx`, Z. 97-123
**Fix:** `lang` auf `"en"` setzen oder die Headline einsprachig halten. Fuer gemischte Sprachen: `lang`-Attribut auf dem jeweiligen Element setzen.

---

### F-G — `scrollLine` CSS-Animation: transform-origin in Keyframes nicht zuverlaessig

**Schwere:** Niedrig
**Was:** `globals.css` Z. 148-152 definiert `@keyframes scrollLine` mit wechselndem `transform-origin` (top bei 0–50%, bottom bei 51–100%). Das Wechseln von `transform-origin` mitten in einer Animation ist in alten Safari-Versionen (< 15.4) und einigen Chromium-Versionen buggy — der Uebergang bei 50%/51% kann zu einem Sprung fuehren statt einem fliessenden Uebergang.
**Wo:** `/src/app/globals.css`, Z. 147-152
**Fix:** Alternative mit zwei Pseudo-Elementen oder einer clip-path-Animation verwenden. Oder als Known Issue mit niedriger Prioritaet dokumentieren, da der Scroll-Hint nur dekorativ ist.

---

## Zusammenfassung — Aktueller Stand

| ID | Problem | Schwere |
|----|---------|---------|
| F-A | Lenis/ScrollTrigger Sync via Event statt RAF — Frame-Delay | Mittel |
| F-B | useGSAP containerRef nie gebunden — globaler GSAP-Context | Mittel |
| F-C | Projektkarten cursor-pointer ohne Link/Handler | Mittel |
| F-D | Array-Index als React-Key in drei Komponenten | Niedrig |
| F-E | Impressum/Datenschutz-Links zeigen auf # | Niedrig (Blocker vor Launch) |
| F-F | lang="de" bei englischer Hero-Headline | Niedrig |
| F-G | transform-origin-Wechsel in Keyframe-Animation | Niedrig |

**Keine kritischen Findings mehr.** Die vier kritischen Issues des ersten Durchlaufs wurden behoben.

**Prioritaet vor Launch:** F-C (Dead Interaction) und F-E (Rechtliches) angehen. F-A und F-B sind technische Schulden, die bei komplexeren Animationen schmerzhaft werden.
