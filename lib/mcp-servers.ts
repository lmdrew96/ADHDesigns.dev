import toolSnapshot from "@/data/mcp-tools.json"

// Hand-written content per server lives here. Tool names, descriptions and counts come from
// data/mcp-tools.json, which `pnpm mcp:snapshot` refreshes from each server's own tools/list.

export type ToolDef = {
  name: string
  description: string
}

export type ExampleFlow = {
  userPrompt: string
  toolName: string
  toolArgs: Record<string, unknown>
  response: unknown
  claudeReply: string
}

type McpServerContent = {
  id: keyof typeof toolSnapshot
  name: string
  /** Shared tool-name prefix, when the server uses one. */
  prefix?: string
  tagline: string
  description: string
  endpointLabel: string
  localOnly?: boolean
  liveUrl?: string
  accent: "green" | "purple" | "amber" | "sage" | "olive"
  examples: readonly ExampleFlow[]
}

export type McpServer = McpServerContent & {
  tools: readonly ToolDef[]
  snapshotDate: string
}

const SERVER_CONTENT: readonly McpServerContent[] = [
  {
    id: "controlledchaos",
    name: "ControlledChaos MCP",
    prefix: "cc_",
    tagline: "Tasks, goals, calendar, and brain dumps for an ADHD-friendly OS.",
    description:
      "The MCP layer behind ControlledChaos — an ADHD-first task manager with crisis mode, goal tracking, and a daily mirror. These tools let Claude create and triage tasks, log goals, drop brain dumps, and read back stats so users can plan a day without opening the app.",
    endpointLabel: "controlledchaos-mcp.vercel.app/mcp",
    liveUrl: "https://controlledchaos.adhdesigns.dev/",
    accent: "green",
    examples: [
      {
        userPrompt: "Add 'review PR feedback for the auth refactor' to my tasks — it's important, due tomorrow at 5.",
        toolName: "cc_create_task",
        toolArgs: {
          title: "review PR feedback for the auth refactor",
          priority: "important",
          deadline: "2026-10-06T21:00:00Z",
        },
        response: {
          id: "a8f3c1d2-…",
          title: "review PR feedback for the auth refactor",
          priority: "important",
          deadline: "2026-10-06T21:00:00Z",
          status: "pending",
        },
        claudeReply:
          "Added — marked important, due tomorrow at 5. You've got 4 other tasks open for tomorrow already. Want me to pull those up so you can stack-rank?",
      },
      {
        userPrompt: "What's on my plate today?",
        toolName: "cc_list_tasks",
        toolArgs: { status: "pending" },
        response: [
          { title: "ship MCP docs page", priority: "urgent", energy_level: "high" },
          { title: "reply to client onboarding email", priority: "normal", energy_level: "low" },
          { title: "write up patch notes for v0.4.1", priority: "someday", energy_level: "low" },
        ],
        claudeReply:
          "Three on the list: shipping the MCP docs page (urgent), replying to the onboarding email, and patch notes whenever. The docs page is the heaviest — start there while your focus is fresh?",
      },
    ],
  },
  {
    id: "chaospatch",
    name: "ChaosPatch MCP",
    prefix: "cp_",
    tagline: "Lightweight dev patch tracker with full Claude Code integration.",
    description:
      "The MCP server behind ChaosPatch — a project-scoped patch tracker for fixes, features, and refactors. From inside Claude Code, you can spin up a patch, mark one in progress, search the backlog, or close one out without ever leaving the editor. Built for solo devs and small teams who don't need the weight of Jira.",
    endpointLabel: "chaospatch.adhdesigns.dev/mcp",
    liveUrl: "https://chaospatch.adhdesigns.dev/",
    accent: "purple",
    examples: [
      {
        userPrompt: "Log a patch for the timezone bug I just found in the calendar view.",
        toolName: "cp_add_patch",
        toolArgs: {
          project_slug: "controlledchaos",
          title: "fix timezone offset on calendar day boundary",
          priority: "high",
          notes:
            "Events created at 11:30pm local appear on the next day in the week view. Suspected double-conversion of UTC → local in the day-grouping logic.",
        },
        response: {
          id: "patch_9c4e22",
          status: "open",
          priority: "high",
          created_at: "2026-10-05T18:55:03.000Z",
        },
        claudeReply:
          "Logged as a high-priority patch on ControlledChaos. Want me to start it now and dig into the day-grouping code?",
      },
      {
        userPrompt: "What's open on Kindling? I've only got energy for small stuff.",
        toolName: "cp_list_patches",
        toolArgs: { project_slug: "kindling", status: "open", tags: ["energy:low"] },
        response: [
          { title: "Snooze picker: add a 'next week' shortcut", priority: "medium", tags: ["ui", "energy:low"] },
          { title: "Fix tag chip wrapping on mobile", priority: "low", tags: ["bug", "energy:low"] },
        ],
        claudeReply:
          "Two low-energy patches on Kindling: a 'next week' snooze shortcut and a tag-chip wrapping fix on mobile. The chip fix is the quickest — want to start there?",
      },
    ],
  },
  {
    id: "chaoslimba",
    name: "ChaosLimbă MCP",
    prefix: "cl_",
    tagline: "Instructional design auditing for an SLA-grounded language learning app.",
    description:
      "The MCP layer behind ChaosLimbă — an English-to-Romanian language learning platform built on second language acquisition theory. These tools expose the diagnostic and adaptation pipeline so Claude can audit content coverage, surface error patterns, track proficiency trends, and check that the curriculum is progressing the way the SLA framework expects.",
    endpointLabel: "local stdio (Claude Code / Desktop)",
    localOnly: true,
    liveUrl: "https://chaoslimba.adhdesigns.dev/",
    accent: "amber",
    examples: [
      {
        userPrompt: "Which grammar features still don't have any content?",
        toolName: "cl_coverage_report",
        toolArgs: {},
        response: {
          features_with_content: 41,
          gaps: ["conditional_perfect", "vocative_case", "supine"],
        },
        claudeReply:
          "41 features have content; three don't yet — the conditional perfect, the vocative, and the supine. The vocative is the easiest gap to close with short dialogues. Want me to draft a few?",
      },
      {
        userPrompt: "Pull a few stress pairs for a pronunciation drill.",
        toolName: "cl_get_stress_pairs",
        toolArgs: { limit: 3 },
        response: [
          { a: "CÓpii", a_meaning: "copies", b: "coPÍI", b_meaning: "children" },
          { a: "ÁCele", a_meaning: "the needles", b: "aCÉle", b_meaning: "those" },
          { a: "MÓdele", a_meaning: "fashions", b: "moDÉle", b_meaning: "models" },
        ],
        claudeReply:
          "Three pairs where stress flips the meaning: copii (copies / children), acele (the needles / those), modele (fashions / models). I'll say a sentence, you tell me which one I meant?",
      },
    ],
  },
  {
    id: "personal-context",
    name: "Personal Context MCP",
    prefix: "pctx_",
    tagline: "Durable facts about you, so every Claude starts warm.",
    description:
      "The MCP server for what no codebase or task tracker holds — dated facts about you, your people, and which Claude is which. Each fact records when it was established and how it's known, so stale context announces itself; relationships carry pronouns, affiliations, and nicknames Claude would otherwise guess at; and each Claude that connects is told which one it is.",
    endpointLabel: "personal-context-mcp.vercel.app/mcp?token={uuid}",
    liveUrl: "https://personal-context-mcp.vercel.app/",
    accent: "sage",
    examples: [
      {
        userPrompt: "Remember that I passed the B1 Spanish exam in June.",
        toolName: "pctx_add_fact",
        toolArgs: {
          label: "Spanish level",
          category: "linguistic",
          content: "Passed the B1 Spanish exam.",
          established: "2026-06",
          confidence: "measured",
        },
        response: { label: "Spanish level", category: "linguistic", established: "2026-06", confidence: "measured" },
        claudeReply:
          "Saved — B1 Spanish, dated June 2026 and marked as measured. Any Claude you talk to will see it, along with how old it is.",
      },
      {
        userPrompt: "Add Sam — they're my brother, lives in Boston.",
        toolName: "pctx_add_relationship",
        toolArgs: {
          name: "Sam",
          role: "Brother",
          context: "Lives in Boston.",
        },
        response: { name: "Sam", role: "Brother", pronouns: null },
        claudeReply:
          "Got it — Sam, your brother in Boston. I didn't record pronouns since you didn't mention them; want to add those?",
      },
    ],
  },
  {
    id: "threadnotes",
    name: "ThreadNotes MCP",
    prefix: "journal_",
    tagline: "Research journal for academic reading, excerpts, and threaded questions.",
    description:
      "The MCP layer behind ThreadNotes — a research journal for tracking academic questions across thematic threads. These tools let Claude save articles you're reading, surface excerpts you've highlighted, link readings to research questions, and pull thematic summaries when you're trying to remember what you've read.",
    endpointLabel: "research.adhdesigns.dev/mcp",
    liveUrl: "https://research.adhdesigns.dev/",
    accent: "olive",
    examples: [
      {
        userPrompt: "Save this article I'm reading on interlanguage theory by Selinker.",
        toolName: "journal_add_article",
        toolArgs: {
          title: "Interlanguage",
          authors: ["Larry Selinker"],
          source: "IRAL — International Review of Applied Linguistics",
          year: 1972,
          tags: ["SLA", "interlanguage", "fossilization"],
        },
        response: {
          id: "art_72sel",
          title: "Interlanguage",
          year: 1972,
          tags: ["SLA", "interlanguage", "fossilization"],
        },
        claudeReply:
          "Saved Selinker's 1972 \"Interlanguage\" under SLA / interlanguage / fossilization. Want me to link it to your fossilization research question?",
      },
      {
        userPrompt: "Pull my excerpts about fossilization.",
        toolName: "journal_search",
        toolArgs: { query: "fossilization" },
        response: [
          {
            article: "Interlanguage (Selinker, 1972)",
            excerpt:
              "Fossilization refers to the persistent retention of linguistic items, rules, and subsystems...",
          },
          {
            article: "Rethinking Fossilization (Han, 2004)",
            excerpt:
              "Fossilization is best understood not as a binary state but as a continuum of stabilized variability...",
          },
        ],
        claudeReply:
          "Two excerpts — Selinker's 1972 definition and Han's 2004 reframe of it as a continuum. Want me to draft a synthesis paragraph that holds both?",
      },
    ],
  },
  {
    id: "kindling",
    name: "Kindling MCP",
    prefix: "kindl",
    tagline: "A curated idea store that resurfaces what you'd otherwise forget.",
    description:
      "The MCP server behind Kindling — where ideas worth keeping go to be developed. Claude can kindle a spark when you ask it to, recall the sparks most in need of attention (ranked by age and neglect), dig up cold ones for triage, and record when an idea finally became something real.",
    endpointLabel: "kindling.adhdesigns.dev/{token}/mcp",
    liveUrl: "https://kindling.adhdesigns.dev/",
    accent: "amber",
    examples: [
      {
        userPrompt: "I'm about to work on the essay — anything I captured that's relevant?",
        toolName: "kindling_recall",
        toolArgs: { context: "essay on attention and design", limit: 3 },
        response: [
          { title: "Attention as a design material", kind: "essay", age_days: 64 },
          { title: "Interfaces that forgive forgetting", kind: "essay", age_days: 112 },
        ],
        claudeReply:
          "Two sparks rhyme with this: \"Attention as a design material\" (two months old) and \"Interfaces that forgive forgetting\" (almost four). The second one might be your opening.",
      },
    ],
  },
  {
    id: "tangle",
    name: "Tangle MCP",
    prefix: "note_",
    tagline: "Working memory for AI collaborators: hunches, suspicions, and dead-ends.",
    description:
      "The MCP server behind Tangle — an epistemic notebook for AI assistants. Claude captures a hunch with an honest confidence level, recalls what it suspected last session before starting work, and resolves each note as it plays out, so dead-ends don't get re-investigated and guesses get calibrated over time.",
    endpointLabel: "tangle.adhdesigns.dev/{userId}/mcp",
    liveUrl: "https://tangle.adhdesigns.dev/",
    accent: "purple",
    examples: [
      {
        userPrompt: "Before you start on the calendar bug — anything we already know?",
        toolName: "note_recall",
        toolArgs: { project: "controlledchaos", limit: 5 },
        response: [
          {
            content_preview: "Day grouping may convert UTC → local twice in the week view.",
            confidence: "suspicion",
            recall_tier: "open",
          },
        ],
        claudeReply:
          "One open suspicion from last time: the week view might convert UTC to local twice. I'll check that first instead of starting from scratch.",
      },
    ],
  },
  {
    id: "loose-change",
    name: "Loose Change MCP",
    prefix: "lc_",
    tagline: "A raw-capture inbox for stray thoughts, typed or spoken.",
    description:
      "The MCP server behind Loose Change — the place half-formed thoughts land so they don't die. Claude can capture a thought straight from the chat, walk the untriaged inbox with you, keep or discard entries, and mark the ones that graduated to another app.",
    endpointLabel: "change.adhdesigns.dev/{token}/mcp",
    liveUrl: "https://change.adhdesigns.dev/",
    accent: "olive",
    examples: [
      {
        userPrompt: "Let's triage my Loose Change inbox.",
        toolName: "lc_list_inbox",
        toolArgs: { limit: 3 },
        response: [
          { id: "lc_41", transcript: "what if the reading list could tell me what I abandoned", captureMode: "voice" },
          { id: "lc_40", transcript: "buy printer ink", captureMode: "chat" },
        ],
        claudeReply:
          "Two waiting. The reading-list one sounds like a Kindling spark; printer ink is a task. Want me to move each one where it belongs?",
      },
    ],
  },
  {
    id: "folio",
    name: "Folio MCP",
    prefix: "folio_",
    tagline: "Read-only catch-up on a writing workspace.",
    description:
      "The MCP layer behind Folio — a document editor for long-form writing. It's a reading door, never a writing one: Claude can list and read documents, search across them, and see exactly what changed since it last looked, tracked per key so each assistant keeps its own place.",
    endpointLabel: "Convex HTTP · /mcp/{key}",
    liveUrl: "https://folio.adhdesigns.dev/",
    accent: "sage",
    examples: [
      {
        userPrompt: "What did I change in my thesis draft since we last talked?",
        toolName: "folio_diff_since_last_visit",
        toolArgs: { documentId: "doc_7c21" },
        response: { added: 4, edited: 2, deleted: 1, preview: "## Methods — participants were recruited from…" },
        claudeReply:
          "Four new blocks, two edits, and one deletion — mostly in Methods, where you started the participants section. Want me to read it through?",
      },
    ],
  },
  {
    id: "libralex",
    name: "LibraLex MCP",
    tagline: "A reading tracker: shelves, library loans, and friends' recommendations.",
    description:
      "The MCP server behind LibraLex — a personal library for what you own, borrow, and want to read. Claude can add books to the right shelf, track library loans and due dates, update reading status and ratings, and pass recommendations between friends.",
    endpointLabel: "Convex HTTP · /mcp/{token}",
    liveUrl: "https://libra.adhdesigns.dev/",
    accent: "green",
    examples: [
      {
        userPrompt: "Is anything due back at the library soon?",
        toolName: "active_loans",
        toolArgs: {},
        response: [{ title: "Piranesi", dueDate: "2026-10-09", dueInDays: 4, overdue: false }],
        claudeReply: "Just Piranesi, due Thursday — four days out. Want me to renew it?",
      },
    ],
  },
  {
    id: "scribecat",
    name: "ScribeCat MCP",
    tagline: "Lecture transcripts and notes, searchable from Claude.",
    description:
      "The MCP server behind ScribeCat — a lecture recorder with transcripts and notes. Four read tools let Claude find a session by course or keyword and pull its full transcript, so studying starts from what was actually said in class.",
    endpointLabel: "Cloudflare Worker · /mcp",
    liveUrl: "https://scribecat.adhdesigns.dev/",
    accent: "purple",
    examples: [
      {
        userPrompt: "Find the lecture where we covered garden-path sentences.",
        toolName: "search_sessions",
        toolArgs: { query: "garden-path", course: "LING 202" },
        response: [{ id: "ses_19", title: "Parsing and ambiguity", date: "2026-09-24" }],
        claudeReply: "That's \"Parsing and ambiguity\" from September 24. Want me to pull the transcript and quiz you on it?",
      },
    ],
  },
  {
    id: "vertex",
    name: "Vertex MCP",
    prefix: "vtx_",
    tagline: "A typed knowledge graph for connecting ideas.",
    description:
      "The MCP layer behind Vertex — a knowledge graph of concepts, people, works, claims, and questions joined by typed edges (connects to, tension with, contradicts, evidenced by). Claude can add and link nodes, walk the graph outward from any idea, and render a neighborhood as a Mermaid diagram.",
    endpointLabel: "vertex.adhdesigns.dev/{userId}/mcp",
    liveUrl: "https://vertex.adhdesigns.dev/",
    accent: "olive",
    examples: [
      {
        userPrompt: "Draw me what's connected to \"Sacred Edges\".",
        toolName: "vtx_graph_render",
        toolArgs: { node_id: "Sacred Edges", depth: 1 },
        response: "graph LR\n  sacred-edges -->|tension_with| liminality\n  sacred-edges -->|evidenced_by| turner-1969",
        claudeReply:
          "Two direct links: a tension with Liminality, and evidence from Turner (1969). Here's the diagram, ready to paste.",
      },
    ],
  },
  {
    id: "chaoslingua-lite",
    name: "ChaosLingua Lite MCP",
    prefix: "cll_",
    tagline: "A Latin tutor grounded in the class's own textbook.",
    description:
      "The MCP server behind ChaosLingua Lite — a Latin drill app built around the Suburani curriculum. Claude tutors from the app's verified grammar tables and chapter vocabulary instead of recalling forms from memory, and logs each answer so weak spots show up across both the app and the chat.",
    endpointLabel: "chaoslingua-lite-mcp.lmdrew.workers.dev/mcp",
    liveUrl: "https://lingua-lite.vercel.app/",
    accent: "amber",
    examples: [
      {
        userPrompt: "Quiz me on what I keep getting wrong.",
        toolName: "cll_get_weak_areas",
        toolArgs: {},
        response: [{ drillType: "parse", declension: 3, case: "genitive", accuracy: 0.52, attempts: 23 }],
        claudeReply:
          "Third-declension genitives are your weak spot — about half right over 23 tries. Let's start there: what case is noctis?",
      },
    ],
  },
]

/** Card order: most-used first. */
const ORDER: readonly McpServerContent["id"][] = [
  "controlledchaos",
  "chaospatch",
  "kindling",
  "tangle",
  "threadnotes",
  "loose-change",
  "folio",
  "personal-context",
  "libralex",
  "scribecat",
  "vertex",
  "chaoslimba",
  "chaoslingua-lite",
]

// The snapshot keeps each server's full description; the cards show its first sentence.
const firstSentence = (text: string): string => text.match(/^[\s\S]+?[.!?](?=\s+[A-Z]|$)/)?.[0] ?? text

export const MCP_SERVERS: readonly McpServer[] = ORDER.map((id) => {
  const content = SERVER_CONTENT.find((s) => s.id === id)
  if (!content) throw new Error(`No MCP server content for "${id}"`)
  const snapshot = toolSnapshot[id]
  return {
    ...content,
    snapshotDate: snapshot.capturedAt,
    tools: snapshot.tools.map((t) => ({ name: t.name, description: firstSentence(t.description) })),
  }
})

export const TOTAL_TOOL_COUNT = MCP_SERVERS.reduce((sum, s) => sum + s.tools.length, 0)
