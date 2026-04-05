export type Project = {
  title: string
  tags: string[]
}

export type Service = {
  title: string
  text: string
}

export type Stat = {
  value: string
  label: string
}

export const projects: Project[] = [
  { title: 'Brand Identity', tags: ['Branding', 'Strategy'] },
  { title: 'E-Commerce Platform', tags: ['Web', 'Development'] },
  { title: 'Mobile App', tags: ['UI/UX', 'React Native'] },
]

export const services: Service[] = [
  { title: 'Brand Strategy', text: 'Positioning, naming, and visual identity that makes you stand out.' },
  { title: 'Web Design', text: 'Pixel-perfect interfaces built around your users and goals.' },
  { title: 'Development', text: 'Fast, accessible, and maintainable code — from prototype to production.' },
  { title: 'Product Design', text: 'End-to-end UX design for web and mobile products.' },
  { title: 'Motion & Interaction', text: 'Animations and micro-interactions that bring your product to life.' },
  { title: 'Consulting', text: 'Strategic guidance for teams building ambitious digital products.' },
]

export const stats: Stat[] = [
  { value: '50+', label: 'Projects shipped' },
  { value: '5', label: 'Years in business' },
  { value: '30+', label: 'Happy clients' },
  { value: '3', label: 'Core team members' },
]

export const contactEmail = 'hello@agency.dev'
