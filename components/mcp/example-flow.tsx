import { ArrowDown } from "lucide-react"
import type { ExampleFlow } from "@/lib/mcp-servers"

const formatJson = (value: unknown) => JSON.stringify(value, null, 2)

export function ExampleFlowCard({ flow, accentText }: { flow: ExampleFlow; accentText: string }) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-adhd-purple/30 border border-adhd-purple/40 p-4">
        <div className="text-[10px] uppercase tracking-wider font-bold text-adhd-lavender/70 mb-1.5">
          User asks Claude
        </div>
        <p className="text-adhd-bg leading-relaxed">{flow.userPrompt}</p>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-4 h-4 text-adhd-lavender/50" aria-hidden />
      </div>

      <div className="rounded-2xl bg-adhd-dark/70 border border-adhd-sage/20 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-adhd-sage/15 bg-adhd-dark/50">
          <span className="text-[10px] uppercase tracking-wider font-bold text-adhd-lavender/70">
            Claude calls MCP tool
          </span>
          <code className={`text-xs font-[family-name:var(--font-mono)] font-bold ${accentText}`}>
            {flow.toolName}
          </code>
        </div>
        <pre className="px-4 py-3 text-xs text-adhd-sage font-[family-name:var(--font-mono)] overflow-x-auto leading-relaxed">
          {formatJson(flow.toolArgs)}
        </pre>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-4 h-4 text-adhd-lavender/50" aria-hidden />
      </div>

      <div className="rounded-2xl bg-adhd-dark/70 border border-adhd-sage/20 overflow-hidden">
        <div className="px-4 py-2 border-b border-adhd-sage/15 bg-adhd-dark/50">
          <span className="text-[10px] uppercase tracking-wider font-bold text-adhd-lavender/70">
            MCP server responds
          </span>
        </div>
        <pre className="px-4 py-3 text-xs text-adhd-bg/90 font-[family-name:var(--font-mono)] overflow-x-auto leading-relaxed">
          {formatJson(flow.response)}
        </pre>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-4 h-4 text-adhd-lavender/50" aria-hidden />
      </div>

      <div className="rounded-2xl bg-adhd-amber/15 border border-adhd-amber/35 p-4">
        <div className="text-[10px] uppercase tracking-wider font-bold text-adhd-amber/90 mb-1.5">
          Claude replies
        </div>
        <p className="text-adhd-bg leading-relaxed">{flow.claudeReply}</p>
      </div>
    </div>
  )
}
