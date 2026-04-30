import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ServiceTier } from "@/components/services/service-tier"
import { TIERS } from "@/lib/services-tiers"

export const metadata: Metadata = {
  title: "Services — ADHDesigns",
  description:
    "Three ways to work with a neurodivergent developer: ND-first web app development, AI / MCP integration, and ND design audits.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute top-10 -left-20 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--adhd-amber) 30%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 right-0 w-[32rem] h-[32rem] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--adhd-sage) 28%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 glass text-card">
            Hire ADHDesigns
          </span>

          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold text-adhd-bg leading-[1.05]">
            Three ways to work together.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-adhd-lavender/90 leading-relaxed font-medium max-w-2xl mx-auto">
            I'm a neurodivergent developer building tools for neurodivergent people. Not accessibility as an afterthought —
            as the architecture. If your product serves humans, it should work for all of them.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {TIERS.map((tier) => (
            <ServiceTier key={tier.id} tier={tier} />
          ))}

          <p className="text-center text-adhd-lavender/80 italic font-medium pt-4">
            Flexible rates available for independent creators, nonprofits, and neurodivergent-led projects.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
