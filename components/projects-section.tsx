"use client"

import { useState } from "react"
import { Cat, Globe, ListTodo, Newspaper, Wand2, ExternalLink, Github, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const projects = [
    {
    id: "chaoslimba",
    name: "ChaosLimbă",
    tagline: "Learn Romanian through Structured Chaos",
    description:
      "Language learning through measured mayhem: random timed sessions, fog mode for full immersion, vocabulary forge that learns from your mistakes, grammar spirals, and a mystery system. Romanian + Korean support.",
    icon: Globe,
    color: "bg-teal",
    textColor: "text-olive",
    tags: ["Language Learning", "Romanian", "Korean", "Experimental"],
    status: "Active Development",
    githubUrl: "https://github.com/lmdrew96/ChaosLingua",
    liveUrl: "https://chaoslingua.adhdesigns.dev/",
  },
  {
    id: "scribecat",
    name: "ScribeCat",
    tagline: "ScribeCat scribes and is cat",
    description:
      "Desktop app that records lectures with real-time transcription, then turns even the messiest notes into flashcards, quizzes, and other study tools using AI. Plus study group rooms, multiplayer quiz games, and 40 themes because why not.",
    icon: Cat,
    color: "bg-mustard",
    textColor: "text-olive",
    tags: ["AI", "Study Tool", "Recordings", "Notes"],
    status: "Development Paused",
    githubUrl: "https://github.com/lmdrew96/ScribeCat-v2",
    liveUrl: "https://github.com/lmdrew96/ScribeCat-v2/releases",
  },
  {
    id: "controlledchaos",
    name: "ControlledChaos",
    tagline: "ADHD planning, actually possible",
    description:
      "AI-powered 'What Now?' view tells you the single best next task based on context, deadlines, and your mood/energy level. Brain dump your chaos and watch it turn into manageable tasks, track personal insights, toggle themes, cloud sync. Your executive function, effectively replaced.",
    icon: ListTodo,
    color: "bg-purple",
    textColor: "text-teal",
    tags: ["ADHD", "Planning", "AI Assistant", "Productivity"],
    status: "Development Paused",
    githubUrl: "https://github.com/lmdrew96/ControlledChaos-zg",
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
    status: "Development Paused",
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
    status: "Live",
    githubUrl: "https://github.com/lmdrew96/ChickenScratch",
    liveUrl: "https://chickenscratch.me",
  },
]

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  const toggleProject = (projectId: string) => {
    setActiveProject(activeProject === projectId ? null : projectId)
  }

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - updated colors */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-olive rounded-full text-sm font-bold mb-4 bg-background">
            Current Projects
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-teal mb-4">
            Built Different, <span className="text-mustard">On Purpose</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-background">
            Each project is born from personal struggle and designed to help others who think outside the box.
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
                  isExpanded ? "border-mustard bg-mustard/20" : "border-purple bg-olive hover:border-mustard/50",
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
