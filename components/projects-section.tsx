"use client"

import { useEffect, useState } from "react"
import { Atom, Brain, Bug, Cat, CloudLightning, Fingerprint, Flame, ListTodo, MessageSquare, Newspaper, RefreshCcwDot, Search, ExternalLink, Github, ChevronDown, Zap } from "lucide-react"

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
                    className={i >= MUSTARD_START ? 'text-mustard' : 'text-teal'}
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
                    className={i <= 15 ? 'text-adhd-amber' : 'text-teal'}
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
      <p className="text-lg max-w-2xl mx-auto text-background select-none cursor-default">
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

const ChaosLimbaIcon = ({ className }: { className?: string }) => (
  <span className={cn("relative inline-block", className)}>
    <Atom className="w-full h-full" />
    <span className="absolute -top-1 inset-x-0 text-center text-[28px] leading-none font-bold">˘</span>
  </span>
)

type StatusKey = "brewing" | "unleashed" | "raging" | "sustained"

const statusConfig: Record<StatusKey, { label: string; description: string; icon: React.FC<{ className?: string }>; bg: string; text: string }> = {
  brewing:   { label: "Brewing",   description: "Planning or early build",   icon: CloudLightning, bg: "bg-adhd-sage/30",  text: "text-adhd-sage" },
  unleashed: { label: "Unleashed", description: "Recently launched",         icon: Zap,            bg: "bg-adhd-amber/30", text: "text-adhd-amber" },
  raging:    { label: "Raging",    description: "Active development",        icon: Flame,          bg: "bg-adhd-olive/30", text: "text-adhd-olive" },
  sustained: { label: "Sustained", description: "Stable, in maintenance",    icon: RefreshCcwDot,  bg: "bg-adhd-teal/30",  text: "text-adhd-teal" },
}

const STATUS_ORDER: StatusKey[] = ["brewing", "unleashed", "raging", "sustained"]

function StatusKeyLegend() {
  return (
    <div className="max-w-3xl mx-auto mb-12 glass-card rounded-2xl border-2 border-purple/20 p-4 sm:p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-teal/70 mb-3 text-center">
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

const projects: Project[] = [
  // ── The Chaos Ecosystem ──
  {
    id: "chatos",
    name: "Cha(t)os",
    tagline: "Group chat, but everyone brought Claude",
    description:
      "Multi-user group chat app where everyone brings their own Claude API key. Each user gets a personalized Claude instance in shared rooms with @mention routing, multimodal file uploads, and Personal Context MCP integration. Built on Convex + Next.js.",
    icon: MessageSquare,
    color: "bg-purple",
    textColor: "text-teal",
    tags: ["Convex", "Next.js", "Claude API", "MCP"],
    status: "raging",
    githubUrl: "https://github.com/lmdrew96/Chatos",
    liveUrl: "https://chatos.adhdesigns.dev/",
    category: "chaos",
  },
  {
    id: "controlledchaos",
    name: "ControlledChaos",
    tagline: "Your Executive Function, Effectively Replaced",
    description:
      "ADHD-friendly task manager with a Crisis Mode feature for overwhelm moments. Includes a 10-tool MCP server for Claude integration.",
    icon: ListTodo,
    color: "bg-adhd-dark",
    textColor: "text-adhd-amber",
    tags: ["ADHD", "MCP", "Crisis Mode", "Productivity"],
    status: "raging",
    githubUrl: "https://github.com/lmdrew96/ControlledChaos",
    liveUrl: "https://controlledchaos.adhdesigns.dev/",
    category: "chaos",
  },
  {
    id: "chaoslimba",
    name: "ChaosLimbă",
    tagline: "Learn Romanian through Structured Chaos",
    description:
      "English-to-Romanian language learning platform grounded in second language acquisition theory. Features a 10-component AI ensemble, a 3-tier fossilization Adaptation Engine, 14 dashboard routes, and a dedicated MCP server for instructional design auditing.",
    icon: ChaosLimbaIcon,
    color: "bg-teal",
    textColor: "text-olive",
    tags: ["SLA", "AI Ensemble", "Adaptation Engine", "MCP"],
    status: "sustained",
    githubUrl: "https://github.com/lmdrew96/ChaosLimba",
    liveUrl: "https://chaoslimba.adhdesigns.dev/",
    demoUrl: "https://chaoslimba.adhdesigns.dev/demo",
    category: "chaos",
  },
  {
    id: "chaospatch",
    name: "ChaosPatch",
    tagline: "Dev patch tracker with MCP powers",
    description:
      "Lightweight dev patch tracker PWA with Claude Code MCP integration. Manages bugs, fixes, and refactors scoped to individual projects.",
    icon: Bug,
    color: "bg-accent",
    textColor: "text-card",
    tags: ["PWA", "MCP", "Patch Tracking", "Dev Tools"],
    status: "sustained",
    githubUrl: "https://github.com/lmdrew96/ChaosPatch",
    liveUrl: "https://chaospatch.adhdesigns.dev/",
    category: "chaos",
  },
  // ── Other Projects ──
  {
    id: "scribecat",
    name: "ScribeCat",
    tagline: "ScribeCat scribes and is cat",
    description:
      "Collaborative study platform with real-time speech-to-text transcription, multiplayer study games, and a Chrome extension. Built on Convex.",
    icon: Cat,
    color: "bg-mustard",
    textColor: "text-olive",
    tags: ["Convex", "Transcription", "Study Games", "Chrome Extension"],
    status: "sustained",
    githubUrl: "https://github.com/lmdrew96/ScribeCat-v3",
    liveUrl: "https://scribecat.adhdesigns.dev/",
    category: "other",
  },
  {
    id: "threadbrain",
    name: "ThreadBrain",
    tagline: "Long reads, finally readable",
    description:
      "ADHD-focused AI reading companion that helps break down and engage with dense text.",
    icon: Brain,
    color: "bg-accent",
    textColor: "text-card",
    tags: ["AI", "Reading", "Accessibility", "ADHD"],
    status: "raging",
    githubUrl: "https://github.com/lmdrew96/threadbrain",
    liveUrl: "https://threadbrain.adhdesigns.dev",
    category: "other",
  },
  {
    id: "threadnotes",
    name: "ThreadNotes",
    tagline: "Where hyperfocus meets hypothesis",
    description:
      "Research journal app for tracking academic research questions across thematic categories. Includes a browser extension for highlighting and saving excerpts from sources.",
    icon: Search,
    color: "bg-teal",
    textColor: "text-purple",
    tags: ["Research", "Journal", "Browser Extension", "Academic"],
    status: "sustained",
    githubUrl: "https://github.com/lmdrew96/research-journal",
    liveUrl: "https://research.adhdesigns.dev/",
    demoUrl: "https://research.adhdesigns.dev/demo",
    category: "other",
  },
  {
    id: "chickenscratch",
    name: "ChickenScratch",
    tagline: "Student-run zine submission portal",
    description:
      "The editorial submission portal for Hen & Ink Society's literary zine, Chicken Scratch. Handles submissions, editorial review, and image processing.",
    icon: Newspaper,
    color: "bg-muted",
    textColor: "text-purple",
    tags: ["Submissions", "Editorial", "Image Processing", "Community"],
    status: "sustained",
    githubUrl: "https://github.com/lmdrew96/ChickenScratch",
    liveUrl: "https://chickenscratch.me",
    category: "other",
  },
  {
    id: "personal-context-mcp",
    name: "Personal Context MCP",
    tagline: "Cross-session memory for Claude",
    description:
      "An MCP server that stores identity, projects, relationships, and preferences for cross-session Claude context. Powers Cha(t)os context awareness and provides continuity across Claude conversations.",
    icon: Fingerprint,
    color: "bg-adhd-sage",
    textColor: "text-adhd-dark",
    tags: ["MCP", "Context", "Identity", "Cross-Session"],
    status: "sustained",
    githubUrl: "https://github.com/lmdrew96/personal-context-mcp",
    liveUrl: "https://personal-context-mcp.vercel.app/",
    category: "other",
  },
]

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  const toggleProject = (projectId: string) => {
    setActiveProject(activeProject === projectId ? null : projectId)
  }

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-foreground relative overflow-hidden">
      {/* Background blobs for glassmorphism */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-amber) 30%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-sage) 25%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-purple) 30%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-green) 20%, transparent) 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - updated colors */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-teal rounded-full text-sm font-bold mb-4 bg-background/60 backdrop-blur-md border border-teal/20">
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
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-teal mb-6 text-center">
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
                        isExpanded ? "glass-accent shadow-lg shadow-mustard/10" : "glass-card hover:border-mustard/30 hover:shadow-lg hover:shadow-mustard/5",
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
                                <h3 className="font-bold text-lg text-teal">{project.name}</h3>
                                <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold", status.bg, status.text)}>
                                  <StatusIcon className="w-3.5 h-3.5" />
                                  {status.label}
                                </span>
                              </div>
                              <ChevronDown
                                className={cn(
                                  "w-5 h-5 text-teal/60 transition-transform duration-300",
                                  isExpanded && "rotate-180 text-mustard",
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
                          <div className="px-6 pb-6 pt-2 border-t border-purple/30">
                            <p className="leading-relaxed mb-6 text-card">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-purple text-teal rounded-full text-sm font-medium">
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
