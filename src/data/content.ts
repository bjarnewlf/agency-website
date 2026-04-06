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

export const contactEmail = 'hallo@nullpunkt.cc'
