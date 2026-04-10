# Handoff — Agency Website

## Zuletzt geaendert: 2026-04-06 (BigBang Mobile — Canvas-Explosion)

## Was wurde gemacht

### BigBang Mobile — Canvas-basierte Explosion (2026-04-06, Session nach Crash)

Kompletter Umbau der Mobile-Animation auf HTML5 Canvas. Designer-Spec erarbeitet, dann Developer implementiert.

**Geaendert:** `src/components/BigBangHero.tsx`

- `BigBangCanvas`-Klasse — reines Canvas-Rendering, kein DOM-Partikel-Overhead
- 4 Partikel-Typen: Core Burst (60), Plasma Streams (80), Stellar Debris (40), Micro-Sparks (30) = 210 gesamt
- Kosmische Farbpalette: core-white, plasma-indigo #6366F1, plasma-violet #8B5CF6, nova-magenta #EC4899, stellar-cyan #22D3EE, corona-amber #F59E0B
- 3 Shockwaves auf Canvas (weiss, violett, indigo) mit korrekten Farben + Blur-Werten
- Phasen-Timing via negativen age-Werten (Partikel starten mit -delay)
- Headline Blur-to-Sharp (filter blur(8px) → blur(0px)) bei 1600ms nach Tap
- Idle Pulse via easeSineInOut, alles Canvas
- ResizeObserver + devicePixelRatio-Support
- Low-End-Detection: hardwareConcurrency <= 4 oder deviceMemory <= 2 → halbe Partikelzahl
- prefers-reduced-motion: nur Idle Pulse + direkter Fade
- Desktop-ScrollTrigger-Pfad unveraendert
- Alte DOM-Elemente (.bb-flash, .bb-shockwaves, .bb-particles, .bb-ring-*) entfernt

**Commit:** `1b0159d` — gepusht, Vercel deployt automatisch
**tsc:** clean
**npm run build:** Compiled successfully

---

### BigBang Mobile — Pulse Idle + Tap-to-Start (2026-04-06)

Mobile-Branch in `BigBangHero.tsx` umgebaut: statt direktem Timeline-Autostart jetzt Pulse-Idle + manueller Tap-Trigger.

**Geaendert:** `src/components/BigBangHero.tsx`

- 3 neue Refs: `isMobileRef`, `animationStartedRef`, `pulseRef`
- `handleTap()` ausserhalb `useGSAP` — prueft Guard, killt Pulse, startet BigBang-Timeline
- Mobile-Branch in `useGSAP` setzt `isMobileRef.current`, startet Pulse-Loop
- Container-div erhaelt `onTouchStart={handleTap}`
- Desktop-Pfad unveraendert (ScrollTrigger + Pin)

---

### Page Transitions — Ink Bleed Panel Wipe (2026-04-06)

Zweischichtiger Panel-Wipe zwischen allen Routen implementiert.

**Neue Dateien:**
- `src/components/TransitionProvider.tsx`
- `src/components/PageTransitionOverlay.tsx`
- `src/components/TransitionLink.tsx`

---

## Offene Punkte
- [ ] Page Transitions auf nullpunkt.cc visuell testen (nach Deploy)
- [ ] Contact-Formular — Formspree/Resend
- [ ] SEO Meta Tags — pro Seite

## Naechster Schritt
Handy-Test der neuen Canvas-Animation auf nullpunkt.cc (Vercel deployt gerade). Dann VetApp.

## Referenz-Dateien
- HTML-Konzepte: `agency-website-plan.html`, `agency-website-plan-light.html`, `agency-website-redesign-v2.html`
- Designer Spec BigBang Mobile: Session 2026-04-06
