export type Project = {
  title: string
  tags: string[]
}

export type Service = {
  title: string
  text: string
  tags: string[]
}

export const projects: Project[] = [
  { title: 'VetConnect', tags: ['Mobile App', 'React Native', 'UX Design'] },
  { title: 'Horizon Dashboard', tags: ['Web App', 'React', 'Data Visualization'] },
  { title: 'Meridian Brand', tags: ['Brand Identity', 'Web Design'] },
]

export const services: Service[] = [
  {
    title: 'KI-Automatisierung',
    text: 'Workflows die arbeiten während du schläfst.',
    tags: ['LLM', 'Agents', 'APIs'],
  },
  {
    title: 'Interface Design',
    text: 'Produkte die man versteht bevor man denkt.',
    tags: ['UX', 'React', 'Motion'],
  },
  {
    title: 'Strategie & Aufbau',
    text: 'Der richtige Start, bevor der erste Commit.',
    tags: ['Audit', 'Roadmap', 'MVP'],
  },
]

export const contactEmail = 'hallo@nullpunkt.cc'
