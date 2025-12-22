import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
