export type Service = {
  title: string
  text: string
  tags: string[]
}

export const services: Service[] = [
  {
    title: 'KI-Automatisierung',
    text: 'Agenten, Workflows, Integrationen. Systeme die mitdenken statt mitschwimmen.',
    tags: ['Agents', 'LLM', 'n8n', 'APIs'],
  },
  {
    title: 'Produkt & Interface',
    text: 'Von der Idee zum funktionierenden Produkt. Design, Code, Deployment — aus einer Hand.',
    tags: ['React', 'React Native', 'UX', 'Motion'],
  },
  {
    title: 'Technische Strategie',
    text: 'Stack-Entscheidungen, Architektur-Audit, MVP-Planung. Bevor Geld verbrannt wird.',
    tags: ['Audit', 'MVP', 'Roadmap', 'Stack'],
  },
]

export type Package = {
  title: string
  description: string
  scope: string[]
  duration: string
  cta: string
}

export const packages: Package[] = [
  {
    title: 'KI-Audit',
    description:
      'Wo bremsen manuelle Prozesse? Wir analysieren eure Workflows und zeigen, wo KI echten ROI bringt — mit konkreter Roadmap.',
    scope: [
      'Prozess-Analyse (1-2 Tage)',
      'KI-Potenzial-Mapping',
      'ROI-Schaetzung pro Use Case',
      'Priorisierte Roadmap',
    ],
    duration: '1 Woche',
    cta: 'Audit anfragen',
  },
  {
    title: 'KI-Sprint',
    description:
      'Ein klar definierter Geschaeftsprozess, automatisiert mit KI. Von der Idee bis zum laufenden System in zwei Wochen.',
    scope: [
      'Ein Prozess, ein Ziel',
      'Prototyp in Woche 1',
      'Live-System in Woche 2',
      'Dokumentation + Uebergabe',
    ],
    duration: '2 Wochen',
    cta: 'Sprint starten',
  },
  {
    title: 'MVP in 6 Wochen',
    description:
      'Von der Idee zum funktionierenden Produkt. App, Web-Tool oder Plattform — Design, Code, Deployment aus einer Hand.',
    scope: [
      'Konzept + Design (Woche 1-2)',
      'Entwicklung (Woche 3-5)',
      'Testing + Launch (Woche 6)',
      'Tech-Stack-Beratung inklusive',
    ],
    duration: '6 Wochen',
    cta: 'Projekt besprechen',
  },
]

export const contactEmail = 'hallo@nullpunkt.cc'
