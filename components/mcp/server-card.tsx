"use client"

import { useState } from "react"
import { ChevronDown, ExternalLink, Wrench } from "lucide-react"
import { ExampleFlowCard } from "@/components/mcp/example-flow"
import type { McpServer } from "@/lib/mcp-servers"
import { cn } from "@/lib/utils"

const ACCENT: Record<
  McpServer["accent"],
  {
    border: string
    cardShadow: string
    badge: string
    text: string
    iconBg: string
    iconText: string
    chip: string
  }
> = {
  green: {
    border: "border-sage-green/30",
    cardShadow: "shadow-sage-green/10",
    badge: "bg-sage-green/20 text-sage-green paper:text-olive-text border-sage-green/35",
    text: "text-sage-green paper:text-olive-text",
    iconBg: "bg-sage-green/20",
    iconText: "text-sage-green paper:text-olive-text",
    chip: "bg-sage-green/15 text-sage-green paper:text-olive-text border-sage-green/30",
  },
  purple: {
    border: "border-muted-indigo/40",
    cardShadow: "shadow-muted-indigo/10",
    badge: "bg-muted-indigo/30 text-bone-dim paper:text-muted-indigo-text border-muted-indigo/50",
    text: "text-bone-dim paper:text-muted-indigo-text",
    iconBg: "bg-muted-indigo/30",
    iconText: "text-bone-dim paper:text-muted-indigo-text",
    chip: "bg-muted-indigo/20 text-bone-dim paper:text-muted-indigo-text border-muted-indigo/40",
  },
  amber: {
    border: "border-caution-amber/30",
    cardShadow: "shadow-caution-amber/10",
    badge: "bg-caution-amber/20 text-caution-amber paper:text-magenta border-caution-amber/40",
    text: "text-caution-amber paper:text-magenta",
    iconBg: "bg-caution-amber/20",
    iconText: "text-caution-amber paper:text-magenta",
    chip: "bg-caution-amber/15 text-caution-amber paper:text-magenta border-caution-amber/30",
  },
  sage: {
    border: "border-dusty-cyan/35",
    cardShadow: "shadow-dusty-cyan/10",
    badge: "bg-dusty-cyan/20 text-dusty-cyan paper:text-muted-indigo-text border-dusty-cyan/40",
    text: "text-dusty-cyan paper:text-muted-indigo-text",
    iconBg: "bg-dusty-cyan/20",
    iconText: "text-dusty-cyan paper:text-muted-indigo-text",
    chip: "bg-dusty-cyan/15 text-dusty-cyan paper:text-muted-indigo-text border-dusty-cyan/30",
  },
  olive: {
    border: "border-olive/40",
    cardShadow: "shadow-olive/10",
    badge: "bg-olive/30 text-bone-dim paper:text-olive-text border-olive/50",
    text: "text-bone-dim paper:text-olive-text",
    iconBg: "bg-olive/30",
    iconText: "text-bone-dim paper:text-olive-text",
    chip: "bg-olive/20 text-bone-dim paper:text-olive-text border-olive/40",
  },
}

export function ServerCard({ server }: { server: McpServer }) {
  const [open, setOpen] = useState(false)
  const accent = ACCENT[server.accent]
  const bodyId = `mcp-server-${server.id}`

  return (
    <article
      id={server.id}
      className={cn(
        "rounded-3xl bg-indigo-void/40 paper:bg-bone border-2 shadow-2xl shadow-black/20 paper:shadow-md paper:shadow-black/10 overflow-hidden scroll-mt-24",
        accent.border,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="w-full text-left p-6 sm:p-8 hover:bg-indigo-void/20 paper:hover:bg-bone-dim/60 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", accent.iconBg)}>
            <Wrench className={cn("w-6 h-6", accent.iconText)} aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-bone-dim paper:text-indigo-void leading-tight">
                {server.name}
              </h2>
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wide",
                  accent.badge,
                )}
              >
                {server.tools.length} tools
              </span>
              {server.prefix && (
                <code className="px-2 py-0.5 rounded-md bg-indigo-void/50 border border-dusty-cyan/20 paper:bg-bone-dim paper:border-hairline text-[11px] font-[family-name:var(--font-mono)] text-accent-cyan-text">
                  {server.prefix}*
                </code>
              )}
            </div>
            <p className="text-ink/90 leading-snug">{server.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-accent-cyan-text font-[family-name:var(--font-mono)]">
              <span className="opacity-80">{server.endpointLabel}</span>
              {server.localOnly && (
                <span className="px-2 py-0.5 rounded-full bg-dusty-cyan/15 text-accent-cyan-text border border-dusty-cyan/35 text-[10px] uppercase tracking-wider font-bold">
                  Local-only
                </span>
              )}
            </div>
          </div>
          <ChevronDown
            className={cn(
              "w-6 h-6 text-ink/60 transition-transform duration-300 shrink-0 mt-2",
              open && "rotate-180 text-caution-amber",
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
          <div className="border-t-2 border-dusty-cyan/20 bg-indigo-void/40 paper:border-hairline paper:bg-bone-dim px-6 sm:px-8 py-8 space-y-10">
            <section>
              <p className="text-bone-dim paper:text-indigo-void leading-relaxed">{server.description}</p>
              {server.liveUrl && (
                <a
                  href={server.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-4 inline-flex items-center gap-1.5 text-sm font-bold border rounded-full px-4 py-1.5 transition-colors hover:bg-muted-indigo/20",
                    accent.chip,
                  )}
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                  Live app
                </a>
              )}
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink/80 mb-4">
                Tools ({server.tools.length})
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {server.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="rounded-xl bg-indigo-void/50 border border-dusty-cyan/15 paper:bg-bone paper:border-hairline px-3 py-2.5"
                  >
                    <code
                      className={cn(
                        "block text-xs font-[family-name:var(--font-mono)] font-bold mb-1",
                        accent.text,
                      )}
                    >
                      {tool.name}
                    </code>
                    <p className="text-xs text-ink/85 leading-snug">{tool.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink/80 mb-1">
                Example flows
              </h3>
              <p className="text-xs text-ink/70 mb-4">Illustrative — sample data, not real usage.</p>
              <div className="space-y-8">
                {server.examples.map((flow, i) => (
                  <ExampleFlowCard key={i} flow={flow} accentText={accent.text} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}
