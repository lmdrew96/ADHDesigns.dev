import projectsJson from "@/data/projects.json"

export type ProjectStatus = "live" | "beta" | "in-development" | "archived"

export type Project = {
  name: string
  slug: string
  url: string | null
  tagline: string
  description: string
  status: ProjectStatus
  tech?: string[]
  last_updated: string
}

export const projects: readonly Project[] = (projectsJson as Project[])
  .slice()
  .sort((a, b) => b.last_updated.localeCompare(a.last_updated))

export const visibleProjects: readonly Project[] = projects.filter(
  (p) => p.status !== "archived",
)
