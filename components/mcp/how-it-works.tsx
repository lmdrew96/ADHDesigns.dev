import { ArrowRight, Bot, Database, MessageCircle, Server } from "lucide-react"

const STEPS = [
  {
    icon: MessageCircle,
    title: "User asks Claude",
    body: "Plain language. \"What's on my plate today?\" — no API knowledge required.",
  },
  {
    icon: Bot,
    title: "Claude picks a tool",
    body: "Claude reads the available tools, picks the right one, and fills in the parameters.",
  },
  {
    icon: Server,
    title: "MCP server validates",
    body: "Auth, parameter checks, business logic. The server speaks to your app's database.",
  },
  {
    icon: Database,
    title: "Data flows back",
    body: "The response lands back in Claude, which writes a natural reply for the user.",
  },
] as const

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="rounded-3xl glass-card border-2 border-adhd-sage/25 px-6 sm:px-10 py-10 sm:py-12"
    >
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold glass-dark text-adhd-sage border border-adhd-sage/30 uppercase tracking-wide mb-4">
          How it works
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-adhd-amber leading-tight">
          From a question to your database, <span className="text-adhd-teal">in one round trip.</span>
        </h2>
        <p className="mt-4 text-adhd-lavender leading-relaxed">
          MCP is the protocol that lets AI assistants like Claude talk directly to the tools and data your users
          already trust. No screenshot uploads, no copy-paste — just a conversation.
        </p>
      </div>

      <ol className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 lg:gap-3 items-stretch">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <li key={step.title} className="contents">
              <div className="flex flex-col items-center text-center bg-adhd-dark/40 rounded-2xl border border-adhd-sage/20 p-5">
                <div className="w-12 h-12 rounded-xl bg-adhd-sage/20 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-adhd-sage" aria-hidden />
                </div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-adhd-lavender/70 mb-1">
                  Step {i + 1}
                </div>
                <h3 className="font-bold text-adhd-sage mb-2">{step.title}</h3>
                <p className="text-xs text-adhd-lavender/85 leading-relaxed">{step.body}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="hidden lg:flex items-center justify-center text-adhd-sage/60"
                  aria-hidden
                >
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
