"use client"

import { useEffect, useState } from "react"
import { Atom, Bug, Cat, CloudLightning, Coins, Columns2, Dices, Fingerprint, Flame, Gamepad2, Layers, Library, ListTodo, Music, Network, NotebookPen, Newspaper, Palette, RefreshCcwDot, Scroll, Sparkles, Swords, Volume2, ExternalLink, Github, ChevronDown, Zap } from "lucide-react"

const HEADING = "Built Different, On Purpose"
const MUSTARD_START = 17 // index where "On Purpose" begins
const ROMANIAN = "Conceput altfel, în mod intenționat"

// Deterministic per-letter chaos — seed offsets keep EN and RO values independent
function letterChaos(i: number, seed = 0) {
  const a = Math.sin(i * 7.31 + 1.1 + seed)
  const b = Math.sin(i * 3.77 + 2.5 + seed)
  const c = Math.sin(i * 11.3 + 0.7 + seed)
  const d = Math.sin(i * 5.19 + 4.2 + seed)
  return {
    delay:    Math.round(i * 45 + ((a + 1) / 2) * 35),
    duration: Math.round(420 + ((b + 1) / 2) * 280),
    rotation: Math.round(200 + ((c + 1) / 2) * 560),
    dy:       Math.round(((d + 1) / 2 - 0.5) * 60),
  }
}

const SUBTITLE = "Each project is born from personal experience and designed to help others who think outside the box."

function CartwheelingHeading({ gone }: { gone: boolean }) {
  return (
    <div className="relative mb-4 cursor-default select-none">
      {/* English — cartwheels off to the right, last letter first */}
      <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold">
        {HEADING.split(' ').map((word, wi, words) => {
          const charOffset = words.slice(0, wi).reduce((n, w) => n + w.length + 1, 0)
          return (
            <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {Array.from(word).map((char, j) => {
                const i  = charOffset + j
                const ri = HEADING.length - 1 - i
                const { delay, duration, rotation, dy } = letterChaos(ri)
                return (
                  <span
                    key={j}
                    className={i >= MUSTARD_START ? 'text-magenta' : 'text-adhd-purple'}
                    style={{
                      display: 'inline-block',
                      transition: gone ? `transform ${duration}ms cubic-bezier(.4,0,.6,1)` : 'transform 300ms ease',
                      transitionDelay: gone ? `${delay}ms` : '0ms',
                      transform: gone
                        ? `translateX(calc(100vw + 100%)) translateY(${dy}px) rotate(${rotation}deg)`
                        : 'translateX(0) translateY(0) rotate(0deg)',
                    }}
                  >{char}</span>
                )
              })}
              {wi < words.length - 1 && (
                <span style={{ display: 'inline-block' }}>&nbsp;</span>
              )}
            </span>
          )
        })}
      </h2>

      {/* Romanian — cartwheels in from the left, last letter first */}
      <h2
        className="absolute top-0 left-0 right-0 text-center font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold pointer-events-none"
        aria-hidden
      >
        {ROMANIAN.split(' ').map((word, wi, words) => {
          const charOffset = words.slice(0, wi).reduce((n, w) => n + w.length + 1, 0)
          return (
            <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {Array.from(word).map((char, j) => {
                const i  = charOffset + j
                const ri = ROMANIAN.length - 1 - i
                const { delay, duration, rotation, dy } = letterChaos(ri, 3.14)
                return (
                  <span
                    key={j}
                    className={i <= 15 ? 'text-magenta' : 'text-adhd-purple'}
                    style={{
                      display: 'inline-block',
                      transition: gone ? `transform ${duration}ms cubic-bezier(.2,0,.4,1)` : 'transform 300ms ease',
                      transitionDelay: gone ? `${delay}ms` : '0ms',
                      transform: gone
                        ? `translateX(0) translateY(0) rotate(0deg)`
                        : `translateX(calc(-100vw - 100%)) translateY(${dy}px) rotate(-${rotation}deg)`,
                    }}
                  >{char}</span>
                )
              })}
              {wi < words.length - 1 && (
                <span style={{ display: 'inline-block' }}>&nbsp;</span>
              )}
            </span>
          )
        })}
      </h2>
    </div>
  )
}

function ProjectsIntroBlock() {
  const [gone, setGone] = useState(false)
  const [canHover, setCanHover] = useState(false)
  useEffect(() => { setCanHover(window.matchMedia('(hover: hover)').matches) }, [])

  const subtitleWords = SUBTITLE.split(' ')

  return (
    <div
      onMouseEnter={canHover ? () => setGone(true) : undefined}
      onMouseLeave={canHover ? () => setGone(false) : undefined}
    >
      <CartwheelingHeading gone={gone} />
      <p className="text-lg max-w-2xl mx-auto text-adhd-purple select-none cursor-default">
        {subtitleWords.map((word, wi, words) => {
          const charOffset = words.slice(0, wi).reduce((n, w) => n + w.length + 1, 0)
          return (
            <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {Array.from(word).map((char, j) => {
                const i = charOffset + j
                const ri = SUBTITLE.length - 1 - i
                const { duration, rotation, dy } = letterChaos(ri, 1.61)
                const delay = 150 + ri * 18 + Math.round(Math.abs(Math.sin(ri * 4.9)) * 30)
                return (
                  <span key={j} style={{
                    display: 'inline-block',
                    transition: gone ? `transform ${duration}ms cubic-bezier(.4,0,.6,1)` : 'transform 300ms ease',
                    transitionDelay: gone ? `${delay}ms` : '0ms',
                    transform: gone
                      ? `translateX(calc(100vw + 100%)) translateY(${dy}px) rotate(${rotation}deg)`
                      : 'translateX(0) translateY(0) rotate(0deg)',
                  }}>{char}</span>
                )
              })}
              {wi < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
            </span>
          )
        })}
      </p>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Markdown } from "@/components/markdown"
import { cn } from "@/lib/utils"
import { projects as projectsData, type Project as ProjectData } from "@/lib/projects"

const ChaosLimbaIcon = ({ className }: { className?: string }) => (
  <span className={cn("relative inline-block", className)}>
    <Atom className="w-full h-full" />
    <span className="absolute -top-1 inset-x-0 text-center text-[28px] leading-none font-bold">˘</span>
  </span>
)

type StatusKey = "brewing" | "unleashed" | "raging" | "sustained" | null

const statusConfig: Record<Exclude<StatusKey, null>, { label: string; description: string; icon: React.FC<{ className?: string }>; bg: string; text: string; border: string }> = {
  brewing:   { label: "Brewing",   description: "Planning or early build",   icon: CloudLightning, bg: "bg-adhd-sage/20",  text: "text-adhd-teal",   border: "border-adhd-teal/70" },
  unleashed: { label: "Unleashed", description: "Recently launched",         icon: Zap,            bg: "bg-adhd-amber/20", text: "text-adhd-purple", border: "border-adhd-purple" },
  raging:    { label: "Raging",    description: "Active development",        icon: Flame,          bg: "bg-adhd-green/20", text: "text-adhd-olive",  border: "border-adhd-olive" },
  sustained: { label: "Sustained", description: "Stable, in maintenance",    icon: RefreshCcwDot,  bg: "bg-adhd-purple/15", text: "text-adhd-dark",   border: "border-adhd-dark" },
}

const STATUS_ORDER: Exclude<StatusKey, null>[] = ["brewing", "unleashed", "raging", "sustained"]

function StatusKeyLegend() {
  return (
    <div className="max-w-3xl mx-auto mb-12 glass-card rounded-2xl border-2 border-adhd-purple/20 p-4 sm:p-5">
      <p className="text-xs font-mono font-bold uppercase tracking-wider text-adhd-dark mb-3 text-center">
        Status Key
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATUS_ORDER.map((key) => {
          const cfg = statusConfig[key]
          const Icon = cfg.icon
          return (
            <div key={key} className="flex items-start gap-2">
              <span className={cn("inline-flex items-center justify-center w-7 h-7 rounded-full shrink-0", cfg.bg)}>
                <Icon className={cn("w-4 h-4", cfg.text)} />
              </span>
              <div className="min-w-0">
                <div className={cn("text-sm font-bold leading-tight", cfg.text)}>{cfg.label}</div>
                <div className="text-xs text-card/80 leading-snug">{cfg.description}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type Project = {
  id: string
  name: string
  tagline: string
  description: string
  icon: React.FC<{ className?: string }>
  color: string
  textColor: string
  tags: string[]
  status: Exclude<StatusKey, null>
  githubUrl: string
  liveUrl?: string
  demoUrl?: string
  category: "chaos" | "other"
}

type ProjectUI = {
  icon: React.FC<{ className?: string }>
  color: string
  textColor: string
  tags: string[]
  category: "chaos" | "other"
}

const statusMap: Record<ProjectData["status"], StatusKey> = {
  "live": "unleashed",
  "beta": "raging",
  "in-development": "brewing",
  "alpha": "sustained",
  "archived": null
}

const projectUIConfig: Record<string, ProjectUI> = {
  controlledchaos: {
    icon: ListTodo,
    color: "bg-adhd-purple",
    textColor: "text-adhd-lavender",
    tags: ["ADHD", "MCP", "Crisis Mode", "Productivity"],
    category: "chaos",
  },
  chaospatch: {
    icon: Bug,
    color: "bg-adhd-dark",
    textColor: "text-adhd-purple",
    tags: ["PWA", "MCP", "Patch Tracking", "Dev Tools"],
    category: "chaos",
  },
  chaoslimba: {
    icon: ChaosLimbaIcon,
    color: "bg-adhd-amber",
    textColor: "text-olive",
    tags: ["SLA", "AI Ensemble", "Adaptation Engine", "MCP"],
    category: "chaos",
  },
  "chaoslingua-lite": {
    icon: Scroll,
    color: "bg-adhd-olive",
    textColor: "text-adhd-amber",
    tags: ["Latin", "SLA", "Drills", "Convex"],
    category: "chaos",
  },
  duelingchaos: {
    icon: Swords,
    color: "bg-adhd-purple",
    textColor: "text-adhd-amber",
    tags: ["MTG", "Rules Engine", "Deckbuilder", "AI Opponent"],
    category: "chaos",
  },
  scribecat: {
    icon: Cat,
    color: "bg-adhd-purple",
    textColor: "text-adhd-amber",
    tags: ["Convex", "Transcription", "Study Games", "Chrome Extension"],
    category: "other",
  },
  "personal-context-mcp": {
    icon: Fingerprint,
    color: "bg-adhd-sage",
    textColor: "text-adhd-purple",
    tags: ["MCP", "Context", "Identity", "Cross-Session"],
    category: "other",
  },
  tangle: {
    icon: Network,
    color: "bg-adhd-teal",
    textColor: "text-adhd-amber",
    tags: ["MCP", "Continuity", "Epistemic Memory", "Claude"],
    category: "other",
  },
  walt: {
    icon: Sparkles,
    color: "bg-adhd-dark",
    textColor: "text-adhd-lavender",
    tags: ["Whitman", "Constellation", "Music", "Canvas"],
    category: "other",
  },
  chaosshelf: {
    icon: Library,
    color: "bg-adhd-green",
    textColor: "text-adhd-dark",
    tags: ["Books", "AI Recs", "Social", "MCP"],
    category: "other",
  },
  majorot: {
    icon: Dices,
    color: "bg-adhd-dark",
    textColor: "text-adhd-amber",
    tags: ["Tarot", "Solo RPG", "Offline-First", "PWA"],
    category: "other",
  },
  "color-factory": {
    icon: Palette,
    color: "bg-adhd-sage",
    textColor: "text-adhd-dark",
    tags: ["OKLCH", "Palette", "Export"],
    category: "other",
  },
  "loose-change": {
    icon: Coins,
    color: "bg-adhd-amber",
    textColor: "text-adhd-dark",
    tags: ["Voice Capture", "Convex", "PWA", "MCP"],
    category: "other",
  },
  nonstop: {
    icon: Music,
    color: "bg-adhd-amber",
    textColor: "text-olive",
    tags: ["PWA", "Soundboard", "Cloudflare R2"],
    category: "other",
  },
  folio: {
    icon: NotebookPen,
    color: "bg-adhd-purple",
    textColor: "text-adhd-sage",
    tags: ["Convex", "Attribution", "MCP", "TipTap"],
    category: "other",
  },
  sensible: {
    icon: Columns2,
    color: "bg-adhd-teal",
    textColor: "text-adhd-amber",
    tags: ["Reader", "Convex", "Claude API"],
    category: "other",
  },
  strata: {
    icon: Layers,
    color: "bg-adhd-dark",
    textColor: "text-adhd-sage",
    tags: ["Etymology", "Reference", "Drizzle ORM"],
    category: "other",
  },
}

const displayOrder = [
  "controlledchaos", "chaospatch", "chaoslimba", "chaoslingua-lite", "duelingchaos", "chaoscord", "chaoscord-activity",
  "scribecat", "chickenscratch", "personal-context-mcp", "tangle", "walt", "chaosshelf", "majorot",
  "color-factory", "loose-change", "nonstop", "folio", "sensible", "strata",
]

// Rotation + torn-edge shape per card, cycled by index so the stack reads as scattered clippings
const CLIPPING_VARIANTS = [
  { tilt: "-1.4deg", clip: "zine-card--a" },
  { tilt: "1.1deg", clip: "zine-card--b" },
  { tilt: "-0.7deg", clip: "zine-card--c" },
  { tilt: "1.6deg", clip: "zine-card--a" },
] as const

const projects: Project[] = displayOrder
  .map((slug): Project | null => {
    const data = projectsData.find((p) => p.slug === slug)
    const ui = projectUIConfig[slug]
    if (!data || !ui) return null
    const status = data.displayStatus ?? statusMap[data.status]
    if (!status) return null
    return {
      id: data.slug,
      name: data.name,
      tagline: data.tagline,
      description: data.description,
      icon: ui.icon,
      color: ui.color,
      textColor: ui.textColor,
      tags: ui.tags,
      status,
      githubUrl: data.githubUrl ?? "",
      ...(data.url ? { liveUrl: data.url } : {}),
      ...(data.demoUrl ? { demoUrl: data.demoUrl } : {}),
      category: ui.category,
    }
  })
  .filter((p): p is Project => p !== null)

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  const toggleProject = (projectId: string) => {
    setActiveProject(activeProject === projectId ? null : projectId)
  }

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-adhd-lavender relative overflow-hidden">
      {/* Background blobs for glassmorphism */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-amber) 30%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-sage) 25%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-purple) 30%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-green) 20%, transparent) 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-adhd-lavender text-xs font-mono uppercase tracking-widest mb-4 bg-adhd-dark border border-adhd-amber/40">
            Current Projects
          </span>
          <ProjectsIntroBlock />
        </div>

        <StatusKeyLegend />

        {([
          { key: "chaos" as const, label: "The Chaos Ecosystem" },
          { key: "other" as const, label: "Other Projects" },
        ]).map((group) => {
          const groupProjects = projects.filter((p) => p.category === group.key)
          return (
            <div key={group.key} className="max-w-3xl mx-auto mb-12 last:mb-0">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-adhd-dark uppercase tracking-wide mb-6 text-center">
                {group.label}
              </h3>
              {/* TODO(nae): this is a single-column stack (space-y-6) so expanding a card never
                  reshuffles a grid row. If you want the concept board's scattered multi-column
                  layout instead, swap this for a CSS grid (grid-template-columns / auto-fit) —
                  just mind that an expanding card grows its whole grid row, which can leave gaps
                  next to shorter neighbors. Rotation is already per-card (CLIPPING_VARIANTS below)
                  so it'll still read as scattered clippings even in a single column. */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupProjects.map((project, idx) => {
                  const Icon = project.icon
                  const isExpanded = activeProject === project.id
                  const status = statusConfig[project.status]
                  const StatusIcon = status.icon
                  const variant = CLIPPING_VARIANTS[idx % CLIPPING_VARIANTS.length]

                  return (
                    <div
                      key={project.id}
                      className={cn("zine-card", variant.clip)}
                      style={{ "--tilt": variant.tilt } as React.CSSProperties}
                    >
                      <div className="zine-tape" />

                      {/* Clickable header */}
                      <button onClick={() => toggleProject(project.id)} className="w-full text-left p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", project.color)}
                          >
                            <Icon className={cn("w-6 h-6", project.textColor)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-3">
                                <h3 className="font-bold text-lg text-adhd-dark">{project.name}</h3>
                              </div>
                              <ChevronDown
                                className={cn(
                                  "w-5 h-5 text-adhd-purple/50 transition-transform duration-300",
                                  isExpanded && "rotate-180 text-magenta",
                                )}
                              />
                            </div>
                            <Markdown className="text-sm text-adhd-purple">{project.tagline}</Markdown>
                            <span className={cn("mt-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase tracking-wider border-2 -rotate-2", status.bg, status.text, status.border)}>
                                  <StatusIcon className="w-3.5 h-3.5" />
                              {status.label}
                                </span>
                          </div>
                        </div>
                      </button>

                      <div
                        className={cn(
                          "grid transition-all duration-300 ease-in-out",
                          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-6 pt-2 border-t border-adhd-dark/15">
                            <Markdown className="leading-relaxed mb-6 text-paper-text">{project.description}</Markdown>

                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-adhd-dark text-adhd-lavender text-xs font-mono uppercase tracking-wide">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                              <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Button className="bg-adhd-amber text-adhd-dark hover:bg-adhd-amber/90 rounded-sm">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View Project
                                </Button>
                              </a>
                              {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <Button className="bg-adhd-teal text-adhd-lavender hover:bg-adhd-teal/90 rounded-sm">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                  </Button>
                                </a>
                              )}
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Button
                                  variant="outline"
                                  className="rounded-sm border-adhd-purple text-adhd-purple hover:bg-adhd-purple hover:text-adhd-lavender bg-transparent"
                                >
                                  <Github className="w-4 h-4 mr-2" />
                                  Source Code
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
