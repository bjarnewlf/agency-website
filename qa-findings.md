# QA Findings — Agency Website

**Datum:** 2026-04-05
**Pruefumfang:** Startseite laedt, Sections unterhalb Hero nicht sichtbar
**Type-Check:** Bestanden (0 Fehler)
**Build:** Erfolgreich, keine Warnings

---

## Findings (nach Schwere sortiert)

---

### F1 — `height: 100%` auf html und body blockiert Scroll

**Schwere:** Kritisch
**Was:** `globals.css` Zeile 56–58 setzt `html, body { height: 100% }`. Das begrenzt die sichtbare Hoehe auf genau ein Viewport. Der Content ausserhalb dieses Bereichs ist zwar im DOM, aber die Seite scrollt nicht, weil das Scroll-Modell durch die fixe Hoehe kaputtgemacht wird.
**Wo:** `/src/app/globals.css`, Zeile 55–58
**Warum kritisch:** Das ist die wahrscheinlichste Hauptursache des gemeldeten Bugs. Sections werden gerendert, sind aber unerreichbar. Die Lenis-spezifischen CSS-Regeln in Zeilen 101–103 (`html.lenis, html.lenis body { height: auto }`) sollen das korrigieren — aber nur wenn Lenis die CSS-Klasse `lenis` auf `<html>` schreibt. Lenis v1.x schreibt diese Klassen standardmaessig. Greift das jedoch nicht (z.B. weil Lenis zu spaet initialisiert), bleibt `height: 100%` aktiv und Scroll ist unmoeglich.
**Fix:** `height: 100%` aus dem `html, body`-Block entfernen. Fuer Lenis wird es nicht benoetigt. Ersatz: `min-height: 100%` nur auf `body`, oder den Block ganz weglassen.

---

### F2 — `'use client'` Direktive in einem Hook-File (kein Komponenten-File)

**Schwere:** Mittel
**Was:** `/src/lib/hooks/useLenis.ts` traegt in Zeile 1 die Direktive `'use client'`. Diese Direktive ist in Next.js App Router nur fuer Komponenten-Files sinnvoll, nicht fuer Hook-Dateien. Der Hook wird bereits dadurch Client-only, dass `LenisProvider.tsx` (ebenfalls `'use client'`) ihn importiert. Die Direktive im Hook-File selbst ist redundant, aber nicht direkt schaedlich — sie kann jedoch zu Verwirrung fuehren und ist laut Next.js Docs ein Anti-Pattern fuer Utility-/Hook-Dateien.
**Wo:** `/src/lib/hooks/useLenis.ts`, Zeile 1
**Fix:** `'use client'` aus `useLenis.ts` entfernen. Die Client-Boundary liegt korrekt in `LenisProvider.tsx`.

---

### F3 — Platzhalter-Sections haben keinerlei sichtbaren Inhalt

**Schwere:** Mittel
**Was:** Die vier Sections in `page.tsx` (Work, Services, About, Contact) sind leere `<section>`-Tags mit nur `minHeight` und `background`. Beide CSS-Variablen `var(--surface-1)` und `var(--bg)` sind fast identisch hell (Weiss und #F5F5F7). Selbst wenn gescrollt werden kann, ist der visuelle Unterschied zwischen den Sections minimal und koennte als "nichts geladen" wahrgenommen werden.
**Wo:** `/src/app/page.tsx`, Zeilen 12–54
**Warum Mittel:** Erklaert das subjektive Nutzergefuehl "da kommt nichts" auch bei technisch funktionierendem Scroll. Der `borderTop: '1px solid var(--border)'` mit `rgba(0,0,0,0.06)` ist bei hellem Hintergrund kaum sichtbar.
**Fix:** Minimale Text-Labels in die Platzhalter einfuegen (z.B. Section-Name als `<h2>`), damit der Fortschritt beim Scrollen erkennbar ist.

---

### F4 — RAF-Loop in useLenis laeuft ohne Throttle weiter

**Schwere:** Niedrig
**Was:** Die `raf`-Funktion in `useLenis.ts` ruft sich via `requestAnimationFrame` endlos selbst auf. Der `cancelAnimationFrame(rafId)` im Cleanup loescht nur den ersten Frame-Request, nicht die bereits gestarteten Folge-Requests. Dadurch laeuft der Loop nach Unmount theoretisch weiter bis der Tab geschlossen wird.
**Wo:** `/src/lib/hooks/useLenis.ts`, Zeilen 19–27
**Warum Niedrig:** In der Praxis wird `LenisProvider` nie unmountet (Root-Layout). Im Entwicklungsmodus mit React StrictMode (doppeltes Mounting) koennte es jedoch zwei parallele Loops geben.
**Fix:** `rafId` als `let`-Variable tracken und in der `raf`-Funktion aktualisieren, dann im Cleanup den aktuellen Wert canceln:
```ts
let rafId: number
function raf(time: number) {
  lenis.raf(time)
  rafId = requestAnimationFrame(raf)
}
rafId = requestAnimationFrame(raf)
return () => { cancelAnimationFrame(rafId); lenis.destroy() }
```

---

### F5 — `next.config.ts` setzt `turbopack.root` explizit auf `__dirname`

**Schwere:** Niedrig
**Was:** `next.config.ts` Zeile 4–6 konfiguriert `turbopack: { root: __dirname }`. Laut Next.js 16 Docs ist `turbopack.root` ein optionaler Override fuer das Projekt-Root. Der Default ist bereits `__dirname` des Config-Files. Die explizite Angabe ist redundant und koennte bei monorepo-Setups zu Verwirrung fuehren.
**Wo:** `/c/Users/claas/claude-workspace/agency-website/next.config.ts`, Zeile 5
**Fix:** `turbopack`-Block entfernen oder leer lassen, da keine echten Turbopack-spezifischen Einstellungen benoetigt werden.

---

## Zusammenfassung

| ID | Problem | Schwere |
|----|---------|---------|
| F1 | `height: 100%` auf html/body blockiert Scroll | Kritisch |
| F2 | `'use client'` im Hook-File statt nur in der Komponente | Mittel |
| F3 | Platzhalter-Sections visuell nicht unterscheidbar | Mittel |
| F4 | RAF-Cleanup-Logik unvollstaendig | Niedrig |
| F5 | Redundante Turbopack-Konfiguration | Niedrig |

**Hauptverdaechtiger fuer den gemeldeten Bug:** F1 allein oder F1 + F3 kombiniert.
**Naechster Schritt:** Developer behebt F1 (`height: 100%` entfernen) — das sollte den Scroll-Bug loesen.
