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
    border: "border-adhd-green/30",
    cardShadow: "shadow-adhd-green/10",
    badge: "bg-adhd-green/20 text-adhd-green border-adhd-green/35",
    text: "text-adhd-green",
    iconBg: "bg-adhd-green/20",
    iconText: "text-adhd-green",
    chip: "bg-adhd-green/15 text-adhd-green border-adhd-green/30",
  },
  purple: {
    border: "border-adhd-purple/40",
    cardShadow: "shadow-adhd-purple/10",
    badge: "bg-adhd-purple/30 text-adhd-bg border-adhd-purple/50",
    text: "text-adhd-bg",
    iconBg: "bg-adhd-purple/30",
    iconText: "text-adhd-bg",
    chip: "bg-adhd-purple/20 text-adhd-bg border-adhd-purple/40",
  },
  amber: {
    border: "border-adhd-amber/30",
    cardShadow: "shadow-adhd-amber/10",
    badge: "bg-adhd-amber/20 text-adhd-amber border-adhd-amber/40",
    text: "text-adhd-amber",
    iconBg: "bg-adhd-amber/20",
    iconText: "text-adhd-amber",
    chip: "bg-adhd-amber/15 text-adhd-amber border-adhd-amber/30",
  },
  sage: {
    border: "border-adhd-sage/35",
    cardShadow: "shadow-adhd-sage/10",
    badge: "bg-adhd-sage/20 text-adhd-sage border-adhd-sage/40",
    text: "text-adhd-sage",
    iconBg: "bg-adhd-sage/20",
    iconText: "text-adhd-sage",
    chip: "bg-adhd-sage/15 text-adhd-sage border-adhd-sage/30",
  },
  olive: {
    border: "border-adhd-olive/40",
    cardShadow: "shadow-adhd-olive/10",
    badge: "bg-adhd-olive/30 text-adhd-bg border-adhd-olive/50",
    text: "text-adhd-bg",
    iconBg: "bg-adhd-olive/30",
    iconText: "text-adhd-bg",
    chip: "bg-adhd-olive/20 text-adhd-bg border-adhd-olive/40",
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
        "rounded-3xl bg-adhd-teal border-2 shadow-2xl shadow-black/20 overflow-hidden scroll-mt-24",
        accent.border,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="w-full text-left p-6 sm:p-8 hover:bg-adhd-dark/20 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", accent.iconBg)}>
            <Wrench className={cn("w-6 h-6", accent.iconText)} aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-adhd-bg leading-tight">
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
              <code className="px-2 py-0.5 rounded-md bg-adhd-dark/50 border border-adhd-sage/20 text-[11px] font-[family-name:var(--font-mono)] text-adhd-sage">
                {server.prefix}*
              </code>
            </div>
            <p className="text-adhd-lavender/90 leading-snug">{server.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-adhd-sage font-[family-name:var(--font-mono)]">
              <span className="opacity-80">{server.endpointLabel}</span>
              {server.localOnly && (
                <span className="px-2 py-0.5 rounded-full bg-adhd-amber/15 text-adhd-amber border border-adhd-amber/35 text-[10px] uppercase tracking-wider font-bold">
                  Local-only
                </span>
              )}
            </div>
          </div>
          <ChevronDown
            className={cn(
              "w-6 h-6 text-adhd-lavender/60 transition-transform duration-300 shrink-0 mt-2",
              open && "rotate-180 text-adhd-amber",
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
          <div className="border-t-2 border-adhd-sage/20 bg-adhd-dark/40 px-6 sm:px-8 py-8 space-y-10">
            <section>
              <p className="text-adhd-bg leading-relaxed">{server.description}</p>
              {server.liveUrl && (
                <a
                  href={server.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-4 inline-flex items-center gap-1.5 text-sm font-bold border rounded-full px-4 py-1.5 transition-colors hover:bg-adhd-bg/5",
                    accent.chip,
                  )}
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                  Live app
                </a>
              )}
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider text-adhd-lavender/80 mb-4">
                Tools ({server.tools.length})
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {server.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="rounded-xl bg-adhd-dark/50 border border-adhd-sage/15 px-3 py-2.5"
                  >
                    <code
                      className={cn(
                        "block text-xs font-[family-name:var(--font-mono)] font-bold mb-1",
                        accent.text,
                      )}
                    >
                      {tool.name}
                    </code>
                    <p className="text-xs text-adhd-lavender/85 leading-snug">{tool.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider text-adhd-lavender/80 mb-4">
                Example flows
              </h3>
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
