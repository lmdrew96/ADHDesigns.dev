import type { Metadata } from "next"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "About — ADHDesigns",
  description:
    "The human behind the code. Lanae \"Nae\" Drew — neurodivergent developer, University of Delaware student, and the brain behind the ADHDesigns ecosystem.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <AboutSection />
      </div>
      <Footer />
    </main>
  )
}
