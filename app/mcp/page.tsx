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

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-accent text-on-fill border-2 border-fg zine-mono text-xs tracking-[1.4px] px-3 py-1.5 -rotate-2 mb-8">
            Model Context Protocol
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-[-1.5px] text-fg leading-[1.05]">
            MCP servers I&rsquo;ve <span className="zine-highlight">built</span>.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-fg leading-relaxed max-w-2xl mx-auto">
            {MCP_SERVERS.length} custom servers, {TOTAL_TOOL_COUNT} tools. Each one wires a real product&rsquo;s data and logic
            directly into Claude — so users can ask questions, take actions, and get back natural answers without
            ever leaving the conversation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {MCP_SERVERS.map((server) => (
              <a
                key={server.id}
                href={`#${server.id}`}
                className="px-3 py-1 border-2 border-fg bg-card text-fg font-mono text-xs font-semibold hover:bg-fg hover:text-background transition-colors"
              >
                {server.prefix ? `${server.prefix}*` : server.id}
                <span className="ml-1.5 opacity-70">·</span>
                <span className="ml-1.5">{server.tools.length}</span>
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
            <h2 className="text-3xl sm:text-4xl tracking-[-1px] text-fg">
              The servers, <span className="zine-highlight">up close.</span>
            </h2>
            <p className="mt-3 text-fg">
              Click any card to expand the tool list and see example flows.
            </p>
            <p className="mt-2 text-xs text-fg-muted">
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
