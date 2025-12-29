"use client"

import { useState } from "react"
import { Cat, Globe, ListTodo, Newspaper, Wand2, ExternalLink, Github, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: "scribecat",
    name: "ScribeCat",
    tagline: "ScribeCat scribes and is cat",
    description:
      "A lecture recording and AI-powered study tool that transforms chaotic notes into organized knowledge. Because your brain has better things to do than remember everything.",
    icon: Cat,
    color: "bg-mustard",
    textColor: "text-olive",
    tags: ["AI", "Study Tool", "Recordings", "Notes"],
    status: "In Development",
    githubUrl: "https://github.com/lmdrew96/ScribeCat-v2",
    liveUrl: "https://github.com/lmdrew96/ScribeCat-v2/releases",
  },
  {
    id: "chaoslingua",
    name: "ChaosLingua",
    tagline: "Learn languages the unhinged way",
    description:
      "An experimental language-learning app focusing on immersion and the Romanian language. Forget boring drills—embrace the chaos of real language acquisition.",
    icon: Globe,
    color: "bg-teal",
    textColor: "text-olive",
    tags: ["Language Learning", "Romanian", "Immersion", "Experimental"],
    status: "In Development",
    githubUrl: "https://github.com/lmdrew96/beautiful-contradictions",
    liveUrl: "https://chaoslingua.adhdesigns.dev/",
  },
  {
    id: "controlledchaos",
    name: "ControlledChaos",
    tagline: "ADHD planning, actually possible",
    description:
      "An ADHD-friendly AI planning assistant that understands your brain doesn't work in straight lines. Flexible, forgiving, and actually helpful.",
    icon: ListTodo,
    color: "bg-purple",
    textColor: "text-teal",
    tags: ["ADHD", "Planning", "AI Assistant", "Productivity"],
    status: "In Development",
    githubUrl: "https://github.com/lmdrew96/ControlledChaos-zg",
    liveUrl: "https://controlledchaos.adhdesigns.dev/",
  },
  {
    id: "feyforge",
    name: "FeyForge",
    tagline: "All-in-one D&D toolkit",
    description:
      "A comprehensive toolkit for Dungeons & Dragons players and DMs. Character sheets, campaign management, encounter tracking, and more—all in one place for your adventures.",
    icon: Wand2,
    color: "bg-accent",
    textColor: "text-card",
    tags: ["D&D", "TTRPG", "Game Tools", "Campaign Management"],
    status: "In Development",
    githubUrl: "https://github.com/lmdrew96/feyforge",
    liveUrl: "https://feyforge.adhdesigns.dev",
  },
  {
    id: "chickenscratch",
    name: "ChickenScratch",
    tagline: "Student-run zine submission portal",
    description:
      "A platform for students to submit and review creative works for publication in a community-driven zine. Where messy creativity meets organized chaos.",
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
  const [activeProject, setActiveProject] = useState(projects[0].id)
  const active = projects.find((p) => p.id === activeProject) || projects[0]

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-foreground bg-foreground">
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

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Project List - updated border/bg colors */}
          <div className="space-y-4">
            {projects.map((project) => {
              const Icon = project.icon
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className={cn(
                    "w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group",
                    activeProject === project.id
                      ? "border-mustard bg-mustard/20"
                      : "border-purple bg-olive hover:border-mustard/50",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-popover-foreground",
                        project.color,
                      )}
                    >
                      <Icon className={cn("w-6 h-6", project.textColor)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-lg text-teal">{project.name}</h3>
                        <ChevronRight
                          className={cn(
                            "w-5 h-5 text-teal/60 transition-transform",
                            activeProject === project.id && "rotate-90 text-mustard",
                          )}
                        />
                      </div>
                      <p className="text-sm text-card">{project.tagline}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Project Details - updated card colors */}
          <div className="lg:sticky lg:top-24 bg-olive rounded-3xl border-2 border-purple p-8">
            <div
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-popover-foreground",
                active.color,
              )}
            >
              <active.icon className={cn("w-8 h-8", active.textColor)} />
            </div>

            <div className="inline-block px-3 py-1 bg-teal text-olive rounded-full text-xs font-bold mb-4">
              {active.status}
            </div>

            <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-teal mb-2">{active.name}</h3>
            <p className="text-mustard font-medium mb-4">{active.tagline}</p>
            <p className="leading-relaxed mb-6 text-card">{active.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {active.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-purple text-teal rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={active.liveUrl || active.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-mustard text-olive hover:bg-mustard/90 rounded-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Project
                </Button>
              </a>
              <a className="" href={active.githubUrl} target="_blank" rel="noopener noreferrer">
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
    </section>
  )
}
