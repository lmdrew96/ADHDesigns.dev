"use client"

import { useState } from "react"
import { Atom, Cat, ListTodo, Newspaper, Search, Wand2, ExternalLink, Github, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ChaosLimbaIcon = ({ className }: { className?: string }) => (
  <span className={cn("relative inline-block", className)}>
    <Atom className="w-full h-full" />
    <span className="absolute -top-1 inset-x-0 text-center text-[28px] leading-none font-bold">˘</span>
  </span>
)

const projects = [
    {
    id: "chaoslimba",
    name: "ChaosLimbă",
    tagline: "Learn Romanian through Structured Chaos",
    description:
      "Innovative language learning platform that combines the chaos of ADHD with the structure of AI to create a unique and effective learning experience.",
    icon: ChaosLimbaIcon,
    color: "bg-teal",
    textColor: "text-olive",
    tags: ["SLA", "Romanian", "Interlanguage", "CALL"],
    status: "Testing Chaos",
    githubUrl: "https://github.com/lmdrew96/ChaosLimba",
    liveUrl: "https://chaoslimba.adhdesigns.dev/",
  },
  {
    id: "scribecat",
    name: "ScribeCat",
    tagline: "ScribeCat scribes and is cat",
    description:
      "Desktop app that records lectures with real-time transcription, then turns even the messiest notes into flashcards, quizzes, and other study tools using AI. Plus study group rooms, multiplayer quiz games, and 6 different themes because why not.",
    icon: Cat,
    color: "bg-mustard",
    textColor: "text-olive",
    tags: ["AI", "Study Tool", "Recordings", "Notes"],
    status: "Active Chaos",
    githubUrl: "https://github.com/lmdrew96/ScribeCat-v3",
    liveUrl: "https://scribecat.adhdesigns.dev/",
  },
  {
    id: "controlledchaos",
    name: "ControlledChaos",
    tagline: "ADHD planning, actually possible",
    description:
      "AI-powered 'What Now?' view tells you the single best next task based on context, deadlines, and your energy level. Brain dump your chaos and watch it turn into manageable tasks! Track personal insights, toggle themes, cloud sync. Your executive function, effectively replaced.",
    icon: ListTodo,
    color: "bg-purple",
    textColor: "text-teal",
    tags: ["ADHD", "Planning", "AI Assistant", "Productivity"],
    status: "Active Chaos",
    githubUrl: "https://github.com/lmdrew96/ControlledChaos",
    liveUrl: "https://controlledchaos.adhdesigns.dev/",
  },
  {
    id: "feyforge",
    name: "FeyForge",
    tagline: "Step into the Circle",
    description:
      "All-in-one D&D toolkit with character sheets, campaign tracking, dice roller, NPC generator, combat encounters, world maps, and an AI DM assistant. Currently redesigning the UI because the live version sucks.",
    icon: Wand2,
    color: "bg-accent",
    textColor: "text-card",
    tags: ["D&D", "TTRPG", "Game Tools", "Campaign Management"],
    status: "Chaos Paused",
    githubUrl: "https://github.com/lmdrew96/feyforge",
    liveUrl: "https://feyforge.adhdesigns.dev",
  },
  {
    id: "chickenscratch",
    name: "ChickenScratch",
    tagline: "Student-run zine submission portal",
    description:
      "Built for Hen & Ink Society's literary magazine. Students submit writing and art, editors review and assign pieces, work gets published to a public gallery. Role-based access, file uploads, and zero Google Forms document-requesting hell.",
    icon: Newspaper,
    color: "bg-muted",
    textColor: "text-purple",
    tags: ["Zine", "Student Platform", "Creative Writing", "Community"],
    status: "Live Chaos",
    githubUrl: "https://github.com/lmdrew96/ChickenScratch",
    liveUrl: "https://chickenscratch.me",
  },
  {
    id: "researchjournal",
    name: "Research Journal",
    tagline: "Where hyperfocus meets hypothesis",
    description:
      "Research hub for organizing papers, tracking citations, and connecting ideas across disciplines. Built for the kind of brain that reads one paper and ends up with 47 open tabs.",
    icon: Search,
    color: "bg-teal",
    textColor: "text-mustard",
    tags: ["Research", "Journal", "Academic", "Notes"],
    status: "Testing Chaos",
    githubUrl: "https://github.com/lmdrew96/research-journal",
    liveUrl: "https://research.adhdesigns.dev/demo",
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
      <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-mustard/30 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-teal/25 blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-purple/30 blur-3xl" />
      <div className="absolute bottom-1/3 left-10 w-56 h-56 rounded-full bg-accent/20 blur-3xl" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - updated colors */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-teal rounded-full text-sm font-bold mb-4 bg-background/60 backdrop-blur-md border border-teal/20">
            Current Projects
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-teal mb-4">
            Built Different, <span className="text-mustard">On Purpose</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-background">
            Each project is born from personal experience and designed to help others who think outside the box.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {projects.map((project) => {
            const Icon = project.icon
            const isExpanded = activeProject === project.id

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
                        <h3 className="font-bold text-lg text-teal">{project.name}</h3>
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
                      <div className="inline-block px-3 py-1 bg-teal text-olive rounded-full text-xs font-bold mb-4">
                        {project.status}
                      </div>

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
                          <Button className="bg-mustard text-olive hover:bg-mustard/90 rounded-full">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </Button>
                        </a>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            className="rounded-full border-teal text-teal hover:bg-teal hover:text-olive bg-transparent"
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
    </section>
  )
}
