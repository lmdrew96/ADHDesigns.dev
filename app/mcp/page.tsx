import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { HowItWorks } from "@/components/mcp/how-it-works"
import { ServerCard } from "@/components/mcp/server-card"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { MCP_SERVERS, TOTAL_TOOL_COUNT } from "@/lib/mcp-servers"

export const metadata: Metadata = {
  title: "MCP Servers — ADHDesigns",
  description: `Five custom Model Context Protocol servers, ${TOTAL_TOOL_COUNT} tools across the ADHDesigns ecosystem — task management, language learning, dev tooling, personal context, and research.`,
}

export default function McpPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute top-10 -left-20 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--adhd-sage) 28%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 right-0 w-[32rem] h-[32rem] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--adhd-amber) 26%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 glass-dark text-adhd-sage/90 border border-adhd-sage/25">
            Model Context Protocol
          </span>

          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold text-adhd-teal leading-[1.05]">
            MCP servers I&rsquo;ve <span className="text-adhd-amber">built</span>.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-adhd-lavender/90 leading-relaxed font-medium max-w-2xl mx-auto">
            Five custom servers, {TOTAL_TOOL_COUNT} tools. Each one wires a real product&rsquo;s data and logic
            directly into Claude — so users can ask questions, take actions, and get back natural answers without
            ever leaving the conversation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {MCP_SERVERS.map((server) => (
              <a
                key={server.id}
                href={`#${server.id}`}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-adhd-sage/40 border border-adhd-teal/25 text-adhd-lavender hover:border-adhd-sage/60 hover:text-adhd-sage hover:bg-adhd-sage/25 transition-colors font-[family-name:var(--font-mono)]"
              >
                {server.prefix}*
                <span className="ml-1.5 opacity-70">·</span>
                <span className="ml-1.5 opacity-90">{server.tools.length}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <HowItWorks />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-2">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-adhd-lavender">
              The servers, up close.
            </h2>
            <p className="mt-3 text-adhd-lavender/85">
              Click any card to expand the tool list and see real example flows.
            </p>
          </div>
          {MCP_SERVERS.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto rounded-3xl glass-dark shadow-2xl shadow-black/20 p-8 sm:p-12 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-adhd-sage/15 text-adhd-sage border border-adhd-sage/30 uppercase tracking-wide mb-4">
            Want one of these for your product?
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-adhd-bg leading-tight">
            I build MCP servers for clients too.
          </h2>
          <p className="mt-5 text-adhd-lavender/90 leading-relaxed max-w-xl mx-auto">
            If your users are already asking &ldquo;can I use this with Claude?&rdquo; — the answer should be yes.
            Custom MCP servers, tool APIs, auth, and the data layer that makes it work, scoped per project.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-7 font-bold">
              <Link href="/services#ai-mcp">See the AI Integration tier</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-adhd-sage text-adhd-sage hover:bg-adhd-sage hover:text-adhd-dark bg-transparent font-bold"
            >
              <a href="mailto:nae@adhdesigns.dev">Email Nae</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
