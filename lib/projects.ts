import projectsJson from "@/data/projects.json"

export type ProjectStatus = "live" | "beta" | "in-development" | "alpha" | "archived"
export type ProjectDisplayStatus = "brewing" | "unleashed" | "raging" | "sustained" | "archived"

export type Project = {
  name: string
  slug: string
  url: string | null
  tagline: string
  description: string
  status: ProjectStatus
  tech?: string[]
  last_updated: string
  githubUrl?: string
  displayStatus?: ProjectDisplayStatus
  demoUrl?: string
}

export const projects: readonly Project[] = (projectsJson as Project[])
  .slice()
  .sort((a, b) => b.last_updated.localeCompare(a.last_updated))

// Home page lineup and status labels — shared with the site assistant so they never disagree.

export const HOME_PROJECT_ORDER: readonly string[] = [
  "controlledchaos", "chaospatch", "chaoslimba", "chaoslingua-lite",
  "scribecat", "nugnotes", "threadnotes", "personal-context-mcp", "tangle", "kindling", "walt", "chaosshelf",
  "color-factory", "loose-change", "folio", "strata", "chickenscratch",
]

const STATUS_TO_DISPLAY: Record<ProjectStatus, ProjectDisplayStatus | null> = {
  "live": "unleashed",
  "beta": "raging",
  "in-development": "brewing",
  "alpha": "sustained",
  // Archived projects stay off the home page unless they opt in with displayStatus: "archived".
  "archived": null,
}

export const DISPLAY_STATUS_INFO: Record<ProjectDisplayStatus, { label: string; description: string }> = {
  brewing: { label: "Brewing", description: "Planning or early build" },
  raging: { label: "Raging", description: "Active development" },
  unleashed: { label: "Unleashed", description: "Recently launched" },
  sustained: { label: "Sustained", description: "Stable, in maintenance" },
  archived: { label: "Archived", description: "Finished or retired" },
}

export const displayStatusOf = (p: Project): ProjectDisplayStatus | null =>
  p.displayStatus ?? STATUS_TO_DISPLAY[p.status]

export type HomeProject = Project & { displayStatus: ProjectDisplayStatus }

export const homeProjects: readonly HomeProject[] = HOME_PROJECT_ORDER.flatMap((slug) => {
  const project = projects.find((p) => p.slug === slug)
  const displayStatus = project ? displayStatusOf(project) : null
  return project && displayStatus ? [{ ...project, displayStatus }] : []
})
