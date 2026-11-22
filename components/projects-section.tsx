"use client"

import { useEffect, useState } from "react"
import { Archive, Atom, Bug, Cat, CloudLightning, Coins, FlaskConical, Fingerprint, Flame, Gamepad2, Highlighter, Layers, Library, Lightbulb, ListTodo, Network, NotebookPen, Newspaper, Palette, PawPrint, RefreshCcwDot, Scroll, Sparkles, Swords, Terminal, Volume2, ExternalLink, Github, ChevronDown, Zap } from "lucide-react"

const HEADING = "Built Different, On Purpose"
const HIGHLIGHT_START = 17 // index where "On Purpose" / "în mod intenționat" begins
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
      <h2 className="text-4xl sm:text-5xl md:text-[52px] tracking-[-1px] leading-tight text-fg">
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
                    className={i >= HIGHLIGHT_START ? 'zine-highlight px-0' : undefined}
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
        className="absolute top-0 left-0 right-0 text-center text-4xl sm:text-5xl md:text-[52px] tracking-[-1px] leading-tight text-fg pointer-events-none"
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
                    className={i >= HIGHLIGHT_START ? 'zine-highlight px-0' : undefined}
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
      <p className="text-lg max-w-2xl mx-auto text-fg-muted select-none cursor-default">
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
import { DISPLAY_STATUS_INFO, homeProjects } from "@/lib/projects"

const ChaosLimbaIcon = ({ className }: { className?: string }) => (
  <span className={cn("relative inline-block", className)}>
    <Atom className="w-full h-full" />
    <span className="absolute -top-1 inset-x-0 text-center text-[28px] leading-none font-bold">˘</span>
  </span>
)

type StatusKey = "brewing" | "unleashed" | "raging" | "sustained" | "archived" | null

// Square mono chips; the word carries the meaning, color is a second cue
const statusConfig: Record<Exclude<StatusKey, null>, { label: string; description: string; icon: React.FC<{ className?: string }>; chip: string }> = {
  brewing: { ...DISPLAY_STATUS_INFO.brewing, icon: CloudLightning, chip: "bg-transparent text-fg" },
  unleashed: { ...DISPLAY_STATUS_INFO.unleashed, icon: Zap, chip: "bg-blue text-on-fill" },
  raging: { ...DISPLAY_STATUS_INFO.raging, icon: Flame, chip: "bg-chip-raging text-on-fill" },
  sustained: { ...DISPLAY_STATUS_INFO.sustained, icon: RefreshCcwDot, chip: "bg-blue-pale text-on-fill" },
  archived: { ...DISPLAY_STATUS_INFO.archived, icon: Archive, chip: "bg-card text-fg border-dashed" },
}

const chipBase = "inline-flex items-center gap-1 px-2 py-0.5 border-2 border-fg zine-mono text-[11px] tracking-[1px]"

const STATUS_ORDER: Exclude<StatusKey, null>[] = ["brewing", "raging", "unleashed", "sustained", "archived"]

function StatusKeyLegend() {
  return (
    <div className="max-w-4xl mx-auto mb-16 bg-card border-2 border-fg p-4 sm:p-5">
      <p className="zine-mono text-xs tracking-[1.4px] text-fg mb-4 text-center">
        Status Key
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {STATUS_ORDER.map((key) => {
          const cfg = statusConfig[key]
          const Icon = cfg.icon
          return (
            <div key={key} className="flex flex-col items-start gap-1.5">
              <span className={cn(chipBase, cfg.chip)}>
                <Icon className="w-3.5 h-3.5" aria-hidden />
                {cfg.label}
              </span>
              <span className="text-xs text-fg-muted leading-snug">{cfg.description}</span>
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
  tags: string[]
  status: Exclude<StatusKey, null>
  githubUrl: string
  liveUrl?: string
  demoUrl?: string
  category: "chaos" | "other"
}

type ProjectUI = {
  icon: React.FC<{ className?: string }>
  tags: string[]
  category: "chaos" | "other"
}


const projectUIConfig: Record<string, ProjectUI> = {
  controlledchaos: {
    icon: ListTodo,
    tags: ["ADHD", "MCP", "Rescue", "Productivity"],
    category: "chaos",
  },
  chaospatch: {
    icon: Bug,
    tags: ["PWA", "MCP", "Patch Tracking", "Dev Tools"],
    category: "chaos",
  },
  chaoslimba: {
    icon: ChaosLimbaIcon,
    tags: ["SLA", "AI Ensemble", "Error Garden", "MCP"],
    category: "chaos",
  },
  "chaoslingua-lite": {
    icon: Scroll,
    tags: ["Latin", "SLA", "Drills", "Convex"],
    category: "chaos",
  },
  duelingchaos: {
    icon: Swords,
    tags: ["MTG", "Rules Engine", "Deckbuilder", "AI Opponent"],
    category: "chaos",
  },
  scribecat: {
    icon: Cat,
    tags: ["Convex", "Transcription", "Study Games", "StudyQuest"],
    category: "other",
  },
  nugnotes: {
    icon: PawPrint,
    tags: ["Study", "Handwriting", "Study Rooms", "Convex"],
    category: "other",
  },
  chickenscratch: {
    icon: Newspaper,
    tags: ["Zine", "Submissions", "Editorial", "Kanban"],
    category: "other",
  },
  threadnotes: {
    icon: FlaskConical,
    tags: ["Research", "OpenAlex", "MCP", "Chrome Extension"],
    category: "other",
  },
  "personal-context-mcp": {
    icon: Fingerprint,
    tags: ["MCP", "Context", "Identity", "Cross-Session"],
    category: "other",
  },
  tangle: {
    icon: Network,
    tags: ["MCP", "Continuity", "Epistemic Memory", "Claude"],
    category: "other",
  },
  kindling: {
    icon: Lightbulb,
    tags: ["Idea Capture", "MCP", "Resurfacing", "Upstash Redis"],
    category: "other",
  },
  walt: {
    icon: Sparkles,
    tags: ["Whitman", "Constellation", "Music", "Canvas"],
    category: "other",
  },
  chaosshelf: {
    icon: Library,
    tags: ["Books", "AI Recs", "Social", "MCP"],
    category: "other",
  },
  "color-factory": {
    icon: Palette,
    tags: ["OKLCH", "Palette", "Export"],
    category: "other",
  },
  "loose-change": {
    icon: Coins,
    tags: ["Voice Capture", "Convex", "PWA", "MCP"],
    category: "other",
  },
  folio: {
    icon: NotebookPen,
    tags: ["Convex", "Attribution", "MCP", "TipTap"],
    category: "other",
  },
  strata: {
    icon: Layers,
    tags: ["Etymology", "Reference", "Drizzle ORM"],
    category: "other",
  },
  marginalia: {
    icon: Highlighter,
    tags: ["PDF", "OCR", "Claude API", "Quizzes"],
    category: "other",
  },
  codynd: {
    icon: Terminal,
    tags: ["Claude Code", "Plugin", "ADHD", "ChaosPatch"],
    category: "other",
  },
}


// Slight alternating tilt, tape color and icon fill per card, cycled by index
const CLIPPING_VARIANTS = [
  { tilt: "-0.8deg", tape: "var(--tape-1)", iconFill: "bg-accent" },
  { tilt: "0.6deg", tape: "var(--tape-2)", iconFill: "bg-blue" },
  { tilt: "-0.4deg", tape: "var(--tape-3)", iconFill: "bg-eco-card" },
] as const

const projects: Project[] = homeProjects
  .map((data): Project | null => {
    const ui = projectUIConfig[data.slug]
    if (!ui) return null
    const status = data.displayStatus
    return {
      id: data.slug,
      name: data.name,
      tagline: data.tagline,
      description: data.description,
      icon: ui.icon,
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
    <section id="projects" className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto border-t-2 border-fg pt-20">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-accent text-on-fill border-2 border-fg zine-mono text-xs tracking-[1.4px] px-3 py-1.5 -rotate-2 mb-6">
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
            <div key={group.key} className="max-w-4xl mx-auto mb-16 last:mb-0">
              <h3 className="font-display text-3xl tracking-[-1px] text-fg mb-8 text-center">
                {group.label}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-x-8 gap-y-10">
                {groupProjects.map((project, idx) => {
                  const Icon = project.icon
                  const isExpanded = activeProject === project.id
                  const status = statusConfig[project.status]
                  const StatusIcon = status.icon
                  const variant = CLIPPING_VARIANTS[idx % CLIPPING_VARIANTS.length]

                  return (
                    <div
                      key={project.id}
                      className="zine-card"
                      style={{ "--tilt": variant.tilt, "--tape": variant.tape } as React.CSSProperties}
                    >
                      <div className="zine-tape" />

                      {/* Clickable header */}
                      <button onClick={() => toggleProject(project.id)} aria-expanded={isExpanded} className="w-full text-left p-6 pt-7">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn("w-12 h-12 border-2 border-fg flex items-center justify-center shrink-0 text-on-fill", variant.iconFill)}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-3">
                                <h3 className="font-display text-2xl leading-tight text-fg">{project.name}</h3>
                              </div>
                              <ChevronDown
                                className={cn(
                                  "w-5 h-5 text-fg shrink-0 transition-transform duration-300 motion-reduce:transition-none",
                                  isExpanded && "rotate-180",
                                )}
                              />
                            </div>
                            <Markdown className="text-sm text-fg-muted">{project.tagline}</Markdown>
                            <span className={cn("mt-3", chipBase, status.chip)}>
                              <StatusIcon className="w-3.5 h-3.5" aria-hidden />
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
                          <div className="px-6 pb-6 pt-4 border-t-2 border-fg/20">
                            <Markdown className="leading-relaxed mb-6 text-fg">{project.description}</Markdown>

                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 border-2 border-fg text-fg zine-mono text-[11px] tracking-[1px]">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                              {(project.liveUrl || project.githubUrl) && (
                                <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Button className="zine-shadow zine-mono tracking-[1.4px]" style={{ "--shadow-size": "4px" } as React.CSSProperties}>
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View Project
                                  </Button>
                                </a>
                              )}
                              {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <Button variant="secondary" className="zine-mono tracking-[1.4px]">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                  </Button>
                                </a>
                              )}
                              {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Button
                                    variant="outline"
                                    className="zine-mono tracking-[1.4px]"
                                  >
                                    <Github className="w-4 h-4 mr-2" />
                                    Source Code
                                  </Button>
                                </a>
                              )}
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
