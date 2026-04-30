export type FieldKind = "text" | "email" | "textarea" | "select"

export type TierField = {
  name: string
  label: string
  kind: FieldKind
  placeholder?: string
  required?: boolean
  options?: readonly string[]
}

export type Tier = {
  id: "nd-web-app" | "ai-mcp" | "nd-design-audit"
  badge: string
  headline: string
  pricing: string
  body: string
  caseStudyAnchor?: string
  ctaLabel: string
  formIntro: string
  fields: readonly TierField[]
}

const TIMELINE_OPTIONS = ["ASAP", "1–2 months", "3–6 months", "6+ months", "Flexible"] as const
const BUDGET_OPTIONS = [
  "$1.5k – $3k",
  "$3k – $5k",
  "$5k – $10k",
  "$10k+",
  "Let's discuss",
] as const

export const TIERS: readonly Tier[] = [
  {
    id: "nd-web-app",
    badge: "Tier 1 — Build",
    headline: "Software that works the way your brain does.",
    pricing: "Starting at $1,500 · Introductory rate · Scoped per project",
    body:
      "Most software is built by neurotypical teams using neurotypical assumptions about how people focus, decide, and get things done. Then someone adds a dark mode and calls it accessible. I build web apps from the ground up for neurodivergent users — not as an accommodation layer, but as the actual architecture. Information hierarchy that reduces decision fatigue. Flexible workflows that don't punish nonlinear thinking. Interfaces that respect sensory needs and cognitive load as first-class design constraints. Full-stack TypeScript and React, shipped to production.",
    caseStudyAnchor:
      "Case studies: ControlledChaos (ADHD task management with AI recommendations and crisis mode), ScribeCat (ADHD-friendly lecture companion), and the full ADHDesigns ecosystem.",
    ctaLabel: "Start a project",
    formIntro:
      "Tell me about what you want to build. The more context you share, the better the first reply.",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", kind: "email", required: true, placeholder: "you@domain.com" },
      {
        name: "projectDescription",
        label: "Project description",
        kind: "textarea",
        required: true,
        placeholder: "What are you trying to build? What problem does it solve?",
      },
      {
        name: "targetUsers",
        label: "Target users",
        kind: "textarea",
        required: true,
        placeholder: "Who is this for? Any specific neurotypes, accessibility needs, or contexts to design around?",
      },
      {
        name: "timeline",
        label: "Timeline",
        kind: "select",
        required: true,
        options: TIMELINE_OPTIONS,
      },
      {
        name: "budgetRange",
        label: "Budget range",
        kind: "select",
        required: true,
        options: BUDGET_OPTIONS,
      },
    ],
  },
  {
    id: "ai-mcp",
    badge: "Tier 2 — Integrate",
    headline: "Give your product a conversation with AI.",
    pricing: "Starting at $800 · Introductory rate · Scoped per project",
    body:
      "The Model Context Protocol is how AI assistants like Claude connect to the tools people actually use — and most products don't have that bridge yet. I build the infrastructure that gets your app into the hands of AI: custom MCP servers, tool APIs, auth flows, and the data layer that makes it all work. If your users are already asking \"can I use this with Claude?\" the answer should be yes.",
    caseStudyAnchor:
      "Case studies: five production MCP servers built and deployed across the ADHDesigns ecosystem — task management, language learning, dev tooling, personal context, and patch tracking.",
    ctaLabel: "Wire up an MCP",
    formIntro:
      "Tell me about your product and what you'd want an AI assistant to be able to do with it.",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", kind: "email", required: true, placeholder: "you@domain.com" },
      {
        name: "productName",
        label: "Product / app name",
        kind: "text",
        required: true,
        placeholder: "What's it called?",
      },
      {
        name: "aiAssistants",
        label: "AI assistants to integrate with",
        kind: "text",
        required: true,
        placeholder: "Claude, ChatGPT, Cursor, custom — whatever you have in mind",
      },
      {
        name: "techStack",
        label: "Existing tech stack",
        kind: "textarea",
        required: true,
        placeholder: "Languages, frameworks, database, hosting, auth — whatever's relevant",
      },
    ],
  },
  {
    id: "nd-design-audit",
    badge: "Tier 3 — Audit",
    headline: "Your app isn't broken. It just wasn't built for everyone.",
    pricing: "Starting at $300 · Introductory rate · Scoped per audit",
    body:
      "I audit existing products through a neurodivergent-centered lens — not just WCAG compliance checklists, but the stuff that actually makes or breaks the experience. Where does your UI create unnecessary decisions? Where does your onboarding assume linear processing? Where are you overwhelming instead of informing? You get a prioritized, actionable report — what's hostile, what's close, and what to fix first. No 40-page PDF you'll never read.",
    ctaLabel: "Request an audit",
    formIntro:
      "Point me at what you'd like reviewed and what specifically you want eyes on.",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", kind: "email", required: true, placeholder: "you@domain.com" },
      {
        name: "productUrl",
        label: "Product URL or description",
        kind: "textarea",
        required: true,
        placeholder: "Link to the live product, or describe it if it's not public yet",
      },
      {
        name: "areasOfConcern",
        label: "Specific areas of concern",
        kind: "textarea",
        required: true,
        placeholder: "Onboarding? A specific flow? Settings? General overwhelm? Something else?",
      },
      {
        name: "timeline",
        label: "Timeline",
        kind: "select",
        required: true,
        options: TIMELINE_OPTIONS,
      },
    ],
  },
] as const

export const TIER_BY_ID: Record<Tier["id"], Tier> = TIERS.reduce(
  (acc, tier) => {
    acc[tier.id] = tier
    return acc
  },
  {} as Record<Tier["id"], Tier>,
)
