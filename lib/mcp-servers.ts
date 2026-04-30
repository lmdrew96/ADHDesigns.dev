export type ToolParam = {
  name: string
  type: string
  required?: boolean
  description: string
}

export type ToolDef = {
  name: string
  description: string
  params?: readonly ToolParam[]
}

export type ExampleFlow = {
  userPrompt: string
  toolName: string
  toolArgs: Record<string, unknown>
  response: unknown
  claudeReply: string
}

export type McpServer = {
  id: string
  name: string
  prefix: string
  tagline: string
  description: string
  endpoint: string
  endpointLabel: string
  comingSoon?: boolean
  liveUrl?: string
  accent: "green" | "purple" | "amber" | "sage" | "olive"
  tools: readonly ToolDef[]
  examples: readonly ExampleFlow[]
}

export const MCP_SERVERS: readonly McpServer[] = [
  {
    id: "controlledchaos",
    name: "ControlledChaos MCP",
    prefix: "cc_",
    tagline: "Tasks, goals, calendar, and brain dumps for an ADHD-friendly OS.",
    description:
      "The MCP layer behind ControlledChaos — an ADHD-first task manager with crisis mode, goal tracking, and a daily mirror. These tools let Claude create and triage tasks, log goals, drop brain dumps, and read back stats so users can plan a day without opening the app.",
    endpoint: "https://controlledchaos-mcp.vercel.app/mcp",
    endpointLabel: "controlledchaos-mcp.vercel.app",
    liveUrl: "https://controlledchaos.adhdesigns.dev/",
    accent: "green",
    tools: [
      { name: "cc_create_task", description: "Create a new task with optional priority, due date, and tags." },
      { name: "cc_list_tasks", description: "List tasks, filtered by status, date range, or priority." },
      { name: "cc_complete_task", description: "Mark a task as done and log the completion timestamp." },
      { name: "cc_delete_task", description: "Permanently delete a task by ID." },
      { name: "cc_search_tasks", description: "Full-text search across task titles and descriptions." },
      { name: "cc_update_task", description: "Update any field on an existing task — title, priority, due date, tags." },
      { name: "cc_list_goals", description: "List all active goals with current progress." },
      { name: "cc_create_goal", description: "Create a new long-term goal with optional target date." },
      { name: "cc_delete_goal", description: "Delete a goal by ID." },
      { name: "cc_update_goal", description: "Update a goal's title, description, or target date." },
      { name: "cc_get_daily_stats", description: "Return completion counts, streak data, and crisis mode triggers for a given day." },
      { name: "cc_list_calendar", description: "List calendar events in a date range." },
      { name: "cc_create_event", description: "Create a calendar event with start, end, and optional notes." },
      { name: "cc_update_event", description: "Update an existing calendar event." },
      { name: "cc_delete_event", description: "Delete a calendar event by ID." },
      { name: "cc_get_mirror_day", description: "Pull the daily reflection / mirror entry — what landed, what didn't, what surprised the user." },
      { name: "cc_list_brain_dumps", description: "List unstructured brain-dump notes the user logged for triage later." },
      { name: "cc_log_moment", description: "Log a quick mood / energy snapshot for the day." },
      { name: "cc_list_moments", description: "List logged mood / energy moments for a date range." },
      { name: "cc_update_moment", description: "Update an existing moment entry." },
      { name: "cc_delete_moment", description: "Delete a moment entry." },
      { name: "cc_brain_dump", description: "Save a free-form brain dump — anything from a passing thought to a half-formed idea." },
    ],
    examples: [
      {
        userPrompt: "Add 'review PR feedback for the auth refactor' to my tasks, high priority, due tomorrow.",
        toolName: "cc_create_task",
        toolArgs: {
          title: "review PR feedback for the auth refactor",
          priority: "high",
          due_date: "2026-05-01",
        },
        response: {
          id: "task_a8f3c1",
          title: "review PR feedback for the auth refactor",
          priority: "high",
          due_date: "2026-05-01",
          status: "pending",
          created_at: "2026-04-30T18:42:11.000Z",
        },
        claudeReply:
          "Added — high priority, due tomorrow. You've got 4 other tasks open for tomorrow already. Want me to pull those up so you can stack-rank?",
      },
      {
        userPrompt: "What's on my plate today?",
        toolName: "cc_list_tasks",
        toolArgs: { status: "pending", date: "2026-04-30" },
        response: [
          { id: "task_91f2", title: "ship MCP docs page", priority: "high" },
          { id: "task_b12c", title: "reply to client onboarding email", priority: "medium" },
          { id: "task_d4a8", title: "write up patch notes for v0.4.1", priority: "low" },
        ],
        claudeReply:
          "Three tasks today: shipping the MCP docs page (high), replying to the onboarding email (medium), and patch notes (low). The docs page is the heaviest — start there while your focus is fresh?",
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
    endpoint: "https://chaospatch.adhdesigns.dev/mcp",
    endpointLabel: "chaospatch.adhdesigns.dev/mcp",
    liveUrl: "https://chaospatch.adhdesigns.dev/",
    accent: "purple",
    tools: [
      { name: "cp_add_patch", description: "Create a new patch under a project with title, priority, and notes." },
      { name: "cp_list_patches", description: "List patches for a project, optionally filtered by status or priority." },
      { name: "cp_list_all_patches", description: "List patches across every project the user owns." },
      { name: "cp_add_note", description: "Append a timestamped note to an existing patch." },
      { name: "cp_complete_patch", description: "Mark a patch as done and log the completion timestamp." },
      { name: "cp_start_patch", description: "Move a patch to in_progress and log the start timestamp." },
      { name: "cp_delete_patch", description: "Permanently delete a patch." },
      { name: "cp_reopen_patch", description: "Reopen a completed patch — sets status back to open." },
      { name: "cp_update_patch", description: "Edit a patch's title, priority, or notes." },
      { name: "cp_search_patches", description: "Full-text search across patches by title and notes." },
      { name: "cp_batch_update", description: "Update status or priority on multiple patches at once." },
      { name: "cp_add_project", description: "Create a new project to scope patches under." },
      { name: "cp_list_projects", description: "List every project the user owns, with open-count summaries." },
      { name: "cp_delete_project", description: "Delete a project and all its patches." },
      { name: "cp_update_project", description: "Update a project's name, slug, or color." },
      { name: "cp_get_project_summary", description: "Get open / in_progress / done counts for every project." },
    ],
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
          created_at: "2026-04-30T18:55:03.000Z",
        },
        claudeReply:
          "Logged as a high-priority patch on ControlledChaos. Want me to start it now and dig into the day-grouping code?",
      },
      {
        userPrompt: "What's open on ChaosLimbă?",
        toolName: "cp_list_patches",
        toolArgs: { project_slug: "chaoslimba", status: "open" },
        response: [
          { id: "patch_1a2b", title: "Adaptation Engine fossilization tier transition logic", priority: "high" },
        ],
        claudeReply:
          "Just one open patch on ChaosLimbă — the Adaptation Engine tier transition logic, marked high. Want me to read the notes and propose a fix?",
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
    endpoint: "https://chaoslimba.adhdesigns.dev/mcp",
    endpointLabel: "chaoslimba.adhdesigns.dev/mcp",
    comingSoon: true,
    liveUrl: "https://chaoslimba.adhdesigns.dev/",
    accent: "amber",
    tools: [
      { name: "cl_get_schema", description: "Return the full content schema — exercise types, modalities, and metadata fields." },
      { name: "cl_get_content", description: "Fetch content items by lesson, CEFR level, or grammar feature." },
      { name: "cl_add_content", description: "Add new content items — exercises, readings, or stress-pair drills." },
      { name: "cl_get_grammar_map", description: "Return the grammar feature map showing prerequisites and exposure." },
      { name: "cl_get_reading_questions", description: "Fetch comprehension questions tied to a reading." },
      { name: "cl_add_reading_question", description: "Attach a comprehension question to an existing reading." },
      { name: "cl_coverage_report", description: "Report content coverage across CEFR levels and grammar features." },
      { name: "cl_get_error_patterns", description: "Return error patterns aggregated across users — what's tripping people up." },
      { name: "cl_get_feature_exposure", description: "Show how often each grammar feature has been seen in practice." },
      { name: "cl_get_generated_content_summary", description: "Summarize AI-generated content batches for review before publishing." },
      { name: "cl_get_learning_narratives", description: "Pull the narrative threads tying lessons together." },
      { name: "cl_get_mystery_items", description: "List items the diagnostic engine flagged as uncertain — needs human review." },
      { name: "cl_get_prerequisite_chain", description: "Return the prerequisite chain for any given grammar feature." },
      { name: "cl_get_proficiency_trends", description: "Trend a user's proficiency over time, broken down by grammar feature." },
      { name: "cl_get_session_summary", description: "Summarize a learner session — what was practiced, what landed, what fossilized." },
      { name: "cl_get_stress_pairs", description: "Return stress-pair drill data — common confusions and confusion rates." },
      { name: "cl_get_suggested_questions", description: "Suggest comprehension questions Claude can ask to deepen retention." },
      { name: "cl_get_tts_usage", description: "Report on text-to-speech usage and audio coverage." },
      { name: "cl_get_tutor_openings", description: "Return the openings used by the AI tutor across sessions." },
      { name: "cl_get_adaptation_summary", description: "Summarize the Adaptation Engine's recent decisions — chaos injection, fossilization interventions, modality shifts." },
    ],
    examples: [
      {
        userPrompt: "Show me where students are struggling most with Romanian stress patterns.",
        toolName: "cl_get_stress_pairs",
        toolArgs: { sort_by: "confusion_rate", limit: 5 },
        response: [
          { pair: "MAS·ină vs ma·ȘI·nă", confusion_rate: 0.42, sessions: 138 },
          { pair: "CO·pil vs co·PIL", confusion_rate: 0.38, sessions: 121 },
          { pair: "FA·tă vs fa·TĂ", confusion_rate: 0.31, sessions: 109 },
        ],
        claudeReply:
          "The top three confusion pairs all involve initial-syllable stress in 2-syllable nouns — that's a clear pattern. Worth surfacing this as a focused drill in the Adaptation Engine?",
      },
      {
        userPrompt: "What's my current proficiency on Romanian past tense?",
        toolName: "cl_get_proficiency_trends",
        toolArgs: {
          user_id: "user_3Bi...",
          feature: "past_tense_perfect",
          range_days: 30,
        },
        response: {
          feature: "past_tense_perfect",
          current_score: 0.71,
          trend_30d: "+0.18",
          fossilization_risk: "low",
          interventions_triggered: 2,
        },
        claudeReply:
          "You're at 0.71 on past tense perfect — up 0.18 over the last 30 days, and fossilization risk is low. Solid trajectory. Two adaptive interventions fired during the period; both seem to have moved the needle.",
      },
    ],
  },
  {
    id: "personal-context",
    name: "Personal Context MCP",
    prefix: "pctx_",
    tagline: "Cross-session memory store: identity, projects, and relationships.",
    description:
      "The MCP server that gives Claude continuity across sessions. It stores who the user is, the projects they're working on, the people in their life, and the preferences each Claude instance should respect. Used by Cha(t)os to give every Claude in a group chat a coherent picture of the person they're talking with.",
    endpoint: "https://personal-context-mcp.vercel.app/mcp",
    endpointLabel: "personal-context-mcp.vercel.app/mcp",
    liveUrl: "https://personal-context-mcp.vercel.app/",
    accent: "sage",
    tools: [
      { name: "pctx_get_context", description: "Return the user's full personal context — identity, projects, relationships, preferences." },
      { name: "pctx_update_context", description: "Update top-level identity or preference fields." },
      { name: "pctx_add_claude_identity", description: "Register a named Claude instance with custom instructions and persona." },
      { name: "pctx_update_claude_identity", description: "Update a registered Claude's name, instructions, or persona." },
      { name: "pctx_delete_claude_identity", description: "Remove a Claude identity from the user's roster." },
      { name: "pctx_add_project", description: "Add a project the user is working on — name, status, description." },
      { name: "pctx_update_project", description: "Update a project's metadata or status." },
      { name: "pctx_delete_project", description: "Remove a project from the user's active list." },
      { name: "pctx_add_relationship", description: "Add a person — name, relationship type, notes." },
      { name: "pctx_update_relationship", description: "Update notes or details on an existing relationship." },
      { name: "pctx_delete_relationship", description: "Remove a relationship from the context store." },
    ],
    examples: [
      {
        userPrompt: "What projects am I currently working on?",
        toolName: "pctx_get_context",
        toolArgs: {},
        response: {
          identity: { name: "Nae", pronouns: "she/they", brand: "ADHDesigns" },
          projects: [
            { name: "ControlledChaos", status: "shipped" },
            { name: "ChaosLimbă", status: "in_development" },
            { name: "ChaosPatch", status: "shipped" },
            { name: "ThreadBrain", status: "in_development" },
          ],
        },
        claudeReply:
          "You've got two shipped (ControlledChaos and ChaosPatch) and two in-development (ChaosLimbă and ThreadBrain). Want to focus on one in particular?",
      },
      {
        userPrompt: "Add Sam to my contacts — they're my brother, lives in Boston.",
        toolName: "pctx_add_relationship",
        toolArgs: {
          name: "Sam",
          relationship_type: "sibling",
          notes: "Brother. Lives in Boston.",
        },
        response: {
          id: "rel_b41f3a",
          name: "Sam",
          relationship_type: "sibling",
          created_at: "2026-04-30T19:02:44.000Z",
        },
        claudeReply: "Got it — saved Sam as your brother, based in Boston. I'll remember that for future conversations.",
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
    endpoint: "https://research.adhdesigns.dev/mcp",
    endpointLabel: "research.adhdesigns.dev/mcp",
    liveUrl: "https://research.adhdesigns.dev/",
    accent: "olive",
    tools: [
      { name: "journal_get_library", description: "List every article in the user's research library." },
      { name: "journal_add_article", description: "Save an article with title, authors, source, and optional notes." },
      { name: "journal_update_article", description: "Update an article's metadata or notes." },
      { name: "journal_delete_article", description: "Remove an article from the library." },
      { name: "journal_get_article", description: "Fetch a single article and its associated notes / excerpts." },
      { name: "journal_search", description: "Full-text search across articles, excerpts, and notes." },
      { name: "journal_add_excerpt", description: "Save a highlighted excerpt from an article with optional commentary." },
      { name: "journal_delete_excerpt", description: "Remove an excerpt." },
      { name: "journal_add_note", description: "Add a free-form note to an article or theme." },
      { name: "journal_update_tags", description: "Update tags on an article — for thematic grouping." },
      { name: "journal_get_themes", description: "List the user's research themes with article counts." },
      { name: "journal_add_theme", description: "Create a new research theme." },
      { name: "journal_get_questions", description: "List active research questions, optionally filtered by theme." },
      { name: "journal_add_question", description: "Add a new research question under a theme." },
      { name: "journal_update_question", description: "Update a question's text or status." },
      { name: "journal_link_question", description: "Link an article to a research question — track which sources answer which questions." },
    ],
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
        toolArgs: { query: "fossilization", scope: "excerpts" },
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
] as const

export const TOTAL_TOOL_COUNT = MCP_SERVERS.reduce((sum, s) => sum + s.tools.length, 0)
