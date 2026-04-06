# Changelog

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
