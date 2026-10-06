import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { HowItWorks } from "@/components/mcp/how-it-works"
import { ServerCard } from "@/components/mcp/server-card"
import { Navigation } from "@/components/navigation"
import { MCP_SERVERS, TOTAL_TOOL_COUNT } from "@/lib/mcp-servers"

export const metadata: Metadata = {
  title: "MCP Servers — ADHDesigns",
  description: `${MCP_SERVERS.length} custom Model Context Protocol servers, ${TOTAL_TOOL_COUNT} tools across the ADHDesigns ecosystem — tasks, ideas, notes, reading, research, language learning, and dev tooling.`,
}

const formatSnapshotDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

const LATEST_SNAPSHOT = formatSnapshotDate(MCP_SERVERS.map((s) => s.snapshotDate).sort().at(-1) ?? "")

export default function McpPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute top-10 -left-20 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--dusty-cyan) 28%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 right-0 w-[32rem] h-[32rem] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--caution-amber) 26%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-20 glass-dark text-dusty-cyan/90 paper:text-accent-cyan-text border border-dusty-cyan/25 paper:border-hairline">
            Model Context Protocol
          </span>

          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold text-indigo-deep leading-[1.05]">
            MCP servers I&rsquo;ve <span className="text-accent-amber-text">built</span>.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-ink leading-relaxed font-medium max-w-2xl mx-auto">
            {MCP_SERVERS.length} custom servers, {TOTAL_TOOL_COUNT} tools. Each one wires a real product&rsquo;s data and logic
            directly into Claude — so users can ask questions, take actions, and get back natural answers without
            ever leaving the conversation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {MCP_SERVERS.map((server) => (
              <a
                key={server.id}
                href={`#${server.id}`}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-dusty-cyan/40 border border-indigo-deep/25 text-bone hover:border-dusty-cyan/60 hover:text-dusty-cyan hover:bg-dusty-cyan/25 paper:bg-bone paper:text-indigo-void paper:border-hairline paper:hover:text-muted-indigo-text paper:hover:bg-bone transition-colors font-[family-name:var(--font-mono)]"
              >
                {server.prefix ? `${server.prefix}*` : server.id}
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
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-indigo-deep">
              The servers, <span className="text-accent-amber-text">up close.</span>
            </h2>
            <p className="mt-3 text-ink">
              Click any card to expand the tool list and see example flows.
            </p>
            <p className="mt-2 text-xs text-ink">
              Tool lists come straight from each server&rsquo;s own <code>tools/list</code>, last updated{" "}
              {LATEST_SNAPSHOT}.
            </p>
          </div>
          {MCP_SERVERS.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
