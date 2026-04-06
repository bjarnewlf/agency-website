import { Navigation } from '@/components/Navigation'
import { BigBangHero } from '@/components/BigBangHero'
import { WorkSection } from '@/components/WorkSection'
import { ServicesSection } from '@/components/ServicesSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ScrollAnimations } from '@/components/ScrollAnimations'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <BigBangHero />
        <WorkSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollAnimations />
    </>
  )
}
