"use client"

import { useState } from "react"
import { ChevronDown, ExternalLink, Wrench } from "lucide-react"
import { ExampleFlowCard } from "@/components/mcp/example-flow"
import type { McpServer } from "@/lib/mcp-servers"
import { cn } from "@/lib/utils"

// Legacy accent names from lib/mcp-servers map onto zine fills (text on them is --on-fill)
const ACCENT_FILL: Record<McpServer["accent"], string> = {
  green: "bg-eco-card",
  purple: "bg-blue",
  amber: "bg-accent",
  sage: "bg-blue-pale",
  olive: "bg-chip-raging",
}

const chip = "inline-flex items-center px-2 py-0.5 border-2 border-fg zine-mono text-[11px] tracking-[1px]"

export function ServerCard({ server }: { server: McpServer }) {
  const [open, setOpen] = useState(false)
  const fill = ACCENT_FILL[server.accent]
  const bodyId = `mcp-server-${server.id}`

  return (
    <article id={server.id} className="bg-card border-2 border-fg overflow-hidden scroll-mt-24">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="w-full text-left p-6 sm:p-8 hover:bg-fg/5 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className={cn("w-12 h-12 border-2 border-fg text-on-fill flex items-center justify-center shrink-0", fill)}>
            <Wrench className="w-6 h-6" aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <h2 className="text-2xl sm:text-3xl text-fg leading-tight">
                {server.name}
              </h2>
              <span className={cn(chip, fill, "text-on-fill")}>
                {server.tools.length} tools
              </span>
              {server.prefix && (
                <code className="px-2 py-0.5 border border-fg/40 bg-background text-[11px] font-mono text-fg">
                  {server.prefix}*
                </code>
              )}
            </div>
            <p className="text-fg leading-snug">{server.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-fg-muted font-mono">
              <span>{server.endpointLabel}</span>
              {server.localOnly && (
                <span className={cn(chip, "text-fg border-dashed")}>
                  Local-only
                </span>
              )}
            </div>
          </div>
          <ChevronDown
            className={cn(
              "w-6 h-6 text-fg transition-transform duration-300 motion-reduce:transition-none shrink-0 mt-2",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </div>
      </button>

      <div
        id={bodyId}
        className={cn("grid transition-all duration-300 ease-in-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="overflow-hidden">
          <div className="border-t-2 border-fg bg-background px-6 sm:px-8 py-8 space-y-10">
            <section>
              <p className="text-fg leading-relaxed">{server.description}</p>
              {server.liveUrl && (
                <a
                  href={server.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "zine-shadow mt-4 inline-flex items-center gap-1.5 zine-mono text-xs tracking-[1.4px] border-2 border-fg text-on-fill px-4 py-2",
                    fill,
                  )}
                  style={{ "--shadow-size": "3px" } as React.CSSProperties}
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                  Live app
                </a>
              )}
            </section>

            <section>
              <h3 className="zine-mono text-sm tracking-[1.4px] text-fg mb-4">
                Tools ({server.tools.length})
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {server.tools.map((tool) => (
                  <div key={tool.name} className="bg-card border-2 border-fg/40 px-3 py-2.5">
                    <code className="block text-xs font-mono font-semibold mb-1 text-fg">
                      {tool.name}
                    </code>
                    <p className="text-xs text-fg-muted leading-snug">{tool.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="zine-mono text-sm tracking-[1.4px] text-fg mb-1">
                Example flows
              </h3>
              <p className="text-xs text-fg-muted mb-4">Illustrative — sample data, not real usage.</p>
              <div className="space-y-8">
                {server.examples.map((flow, i) => (
                  <ExampleFlowCard key={i} flow={flow} toolFill={fill} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}
