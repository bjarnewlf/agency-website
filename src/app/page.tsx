import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { WorkSection } from '@/components/WorkSection'
import { ServicesSection } from '@/components/ServicesSection'
import { AboutSection } from '@/components/AboutSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ScrollAnimations } from '@/components/ScrollAnimations'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <WorkSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollAnimations />
    </>
  )
}
