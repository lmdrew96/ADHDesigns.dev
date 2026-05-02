"use client"

import { useEffect, useState } from "react"
import { Atom, BookOpen, Brain, Bug, Cat, CloudLightning, Fingerprint, Flame, ListTodo, MessageSquare, Newspaper, RefreshCcwDot, Search, ExternalLink, Github, ChevronDown, Zap } from "lucide-react"

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
                    className={i >= MUSTARD_START ? 'text-adhd-amber' : 'text-adhd-sage'}
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
                    className={i <= 15 ? 'text-adhd-amber' : 'text-adhd-sage'}
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
import { cn } from "@/lib/utils"
import { projects as projectsData, type Project as ProjectData } from "@/lib/projects"

const ChaosLimbaIcon = ({ className }: { className?: string }) => (
  <span className={cn("relative inline-block", className)}>
    <Atom className="w-full h-full" />
    <span className="absolute -top-1 inset-x-0 text-center text-[28px] leading-none font-bold">˘</span>
  </span>
)

const ChaosLenguaIcon = ({ className }: { className?: string }) => (
  <span className={cn("relative inline-block", className)}>
    <Atom className="w-full h-full" />
    <span className="absolute -top-2 inset-x-0 text-center text-[28px] leading-none font-bold">˜</span>
  </span>
)

type StatusKey = "brewing" | "unleashed" | "raging" | "sustained"

const statusConfig: Record<StatusKey, { label: string; description: string; icon: React.FC<{ className?: string }>; bg: string; text: string }> = {
  brewing:   { label: "Brewing",   description: "Planning or early build",   icon: CloudLightning, bg: "bg-adhd-sage/30",  text: "text-adhd-teal/70" },
  unleashed: { label: "Unleashed", description: "Recently launched",         icon: Zap,            bg: "bg-adhd-amber/50", text: "text-adhd-purple" },
  raging:    { label: "Raging",    description: "Active development",        icon: Flame,          bg: "bg-adhd-green/30", text: "text-adhd-olive" },
  sustained: { label: "Sustained", description: "Stable, in maintenance",    icon: RefreshCcwDot,  bg: "bg-adhd-purple/30",  text: "text-adhd-dark" },
}

const STATUS_ORDER: StatusKey[] = ["brewing", "unleashed", "raging", "sustained"]

function StatusKeyLegend() {
  return (
    <div className="max-w-3xl mx-auto mb-12 glass-card rounded-2xl border-2 border-adhd-purple/20 p-4 sm:p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-adhd-sage mb-3 text-center">
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
  status: StatusKey
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
  displayStatus?: StatusKey
  githubUrl: string
  demoUrl?: string
}

const statusMap: Record<ProjectData["status"], StatusKey> = {
  "live": "unleashed",
  "beta": "raging",
  "in-development": "brewing",
  "archived": "sustained",
}

const projectUIConfig: Record<string, ProjectUI> = {
  controlledchaos: {
    icon: ListTodo,
    color: "bg-adhd-purple",
    textColor: "text-adhd-lavender",
    tags: ["ADHD", "MCP", "Crisis Mode", "Productivity"],
    category: "chaos",
    displayStatus: "raging",
    githubUrl: "https://github.com/lmdrew96/ControlledChaos",
  },
  chaospatch: {
    icon: Bug,
    color: "bg-adhd-dark",
    textColor: "text-adhd-purple",
    tags: ["PWA", "MCP", "Patch Tracking", "Dev Tools"],
    category: "chaos",
    displayStatus: "sustained",
    githubUrl: "https://github.com/lmdrew96/ChaosPatch",
  },
  chaoslimba: {
    icon: ChaosLimbaIcon,
    color: "bg-adhd-amber",
    textColor: "text-olive",
    tags: ["SLA", "AI Ensemble", "Adaptation Engine", "MCP"],
    category: "chaos",
    displayStatus: "sustained",
    githubUrl: "https://github.com/lmdrew96/ChaosLimba",
    demoUrl: "https://chaoslimba.adhdesigns.dev/demo",
  },
  chaoslengua: {
    icon: ChaosLenguaIcon,
    color: "bg-adhd-olive",
    textColor: "text-adhd-amber",
    tags: ["SLA", "AI Ensemble", "Spanish", "Monorepo"],
    category: "chaos",
    githubUrl: "https://github.com/lmdrew96/chaos",
  },
  chaoscitim: {
    icon: BookOpen,
    color: "bg-adhd-sage",
    textColor: "text-adhd-dark",
    tags: ["SLA", "PWA", "Reading", "Morphology"],
    category: "chaos",
    githubUrl: "https://github.com/lmdrew96/ChaosCitim",
  },
  chatos: {
    icon: MessageSquare,
    color: "bg-adhd-green",
    textColor: "text-adhd-dark",
    tags: ["Convex", "Next.js", "Claude API", "MCP"],
    category: "chaos",
    displayStatus: "raging",
    githubUrl: "https://github.com/lmdrew96/Chatos",
  },
  scribecat: {
    icon: Cat,
    color: "bg-adhd-purple",
    textColor: "text-adhd-amber",
    tags: ["Convex", "Transcription", "Study Games", "Chrome Extension"],
    category: "other",
    displayStatus: "sustained",
    githubUrl: "https://github.com/lmdrew96/ScribeCat-v3",
  },
  threadnotes: {
    icon: Search,
    color: "bg-adhd-green",
    textColor: "text-adhd-teal",
    tags: ["Research", "Journal", "Browser Extension", "Academic"],
    category: "other",
    displayStatus: "unleashed",
    githubUrl: "https://github.com/lmdrew96/research-journal",
    demoUrl: "https://research.adhdesigns.dev/demo",
  },
  threadbrain: {
    icon: Brain,
    color: "bg-adhd-teal",
    textColor: "text-adhd-lavender",
    tags: ["AI", "Reading", "Accessibility", "ADHD"],
    category: "other",
    displayStatus: "raging",
    githubUrl: "https://github.com/lmdrew96/threadbrain",
  },
  chickenscratch: {
    icon: Newspaper,
    color: "bg-adhd-amber",
    textColor: "text-adhd-dark",
    tags: ["Submissions", "Editorial", "Image Processing", "Community"],
    category: "other",
    displayStatus: "sustained",
    githubUrl: "https://github.com/lmdrew96/ChickenScratch",
  },
  "personal-context-mcp": {
    icon: Fingerprint,
    color: "bg-adhd-sage",
    textColor: "text-adhd-purple",
    tags: ["MCP", "Context", "Identity", "Cross-Session"],
    category: "other",
    githubUrl: "https://github.com/lmdrew96/personal-context-mcp",
  },
}

const displayOrder = [
  "chatos", "controlledchaos", "chaoslimba", "chaoslengua", "chaoscitim", "chaospatch",
  "scribecat", "threadnotes", "threadbrain", "chickenscratch", "personal-context-mcp",
]

const projects: Project[] = displayOrder
  .map((slug): Project | null => {
    const data = projectsData.find((p) => p.slug === slug)
    const ui = projectUIConfig[slug]
    if (!data || !ui) return null
    return {
      id: data.slug,
      name: data.name,
      tagline: data.tagline,
      description: data.description,
      icon: ui.icon,
      color: ui.color,
      textColor: ui.textColor,
      tags: ui.tags,
      status: ui.displayStatus ?? statusMap[data.status],
      githubUrl: ui.githubUrl,
      ...(data.url ? { liveUrl: data.url } : {}),
      ...(ui.demoUrl ? { demoUrl: ui.demoUrl } : {}),
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
        {/* Section Header - updated colors */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-adhd-lavender rounded-full text-sm font-bold mb-4 bg-adhd-olive backdrop-blur-md border border-adhd-amber/30">
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
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-adhd-sage mb-6 text-center">
                {group.label}
              </h3>
              <div className="space-y-4">
                {groupProjects.map((project) => {
                  const Icon = project.icon
                  const isExpanded = activeProject === project.id
                  const status = statusConfig[project.status]
                  const StatusIcon = status.icon

                  return (
                    <div
                      key={project.id}
                      className={cn(
                        "rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                        isExpanded ? "glass-accent shadow-lg shadow-adhd-amber/10" : "glass-card hover:border-adhd-amber/30 hover:shadow-lg hover:shadow-adhd-amber/5",
                      )}
                    >
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
                                <h3 className="font-bold text-lg text-adhd-sage">{project.name}</h3>
                                <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold", status.bg, status.text)}>
                                  <StatusIcon className="w-3.5 h-3.5" />
                                  {status.label}
                                </span>
                              </div>
                              <ChevronDown
                                className={cn(
                                  "w-5 h-5 text-adhd-sage/60 transition-transform duration-300",
                                  isExpanded && "rotate-180 text-adhd-amber",
                                )}
                              />
                            </div>
                            <p className="text-sm text-card">{project.tagline}</p>
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
                          <div className="px-6 pb-6 pt-2 border-t border-adhd-purple/30">
                            <p className="leading-relaxed mb-6 text-card">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-adhd-purple text-adhd-sage rounded-full text-sm font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                              <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Button className="bg-adhd-amber text-adhd-dark hover:bg-adhd-amber/90 rounded-full">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View Project
                                </Button>
                              </a>
                              {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <Button className="bg-adhd-teal text-adhd-lavender hover:bg-adhd-teal/90 rounded-full">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                  </Button>
                                </a>
                              )}
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Button
                                  variant="outline"
                                  className="rounded-full border-adhd-sage text-adhd-sage hover:bg-adhd-sage hover:text-adhd-dark bg-transparent"
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
