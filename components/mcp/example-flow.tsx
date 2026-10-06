import { ArrowDown } from "lucide-react"
import type { ExampleFlow } from "@/lib/mcp-servers"

const formatJson = (value: unknown) => JSON.stringify(value, null, 2)

export function ExampleFlowCard({ flow, accentText }: { flow: ExampleFlow; accentText: string }) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-muted-indigo/30 border border-muted-indigo/40 p-4">
        <div className="text-[10px] uppercase tracking-wider font-bold text-bone/70 mb-1.5">
          User asks Claude
        </div>
        <p className="text-bone-dim leading-relaxed">{flow.userPrompt}</p>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-4 h-4 text-bone/50" aria-hidden />
      </div>

      <div className="rounded-2xl bg-indigo-void/70 border border-dusty-cyan/20 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-dusty-cyan/15 bg-indigo-void/50">
          <span className="text-[10px] uppercase tracking-wider font-bold text-bone/70">
            Claude calls MCP tool
          </span>
          <code className={`text-xs font-[family-name:var(--font-mono)] font-bold ${accentText}`}>
            {flow.toolName}
          </code>
        </div>
        <pre className="px-4 py-3 text-xs text-dusty-cyan font-[family-name:var(--font-mono)] overflow-x-auto leading-relaxed">
          {formatJson(flow.toolArgs)}
        </pre>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-4 h-4 text-bone/50" aria-hidden />
      </div>

      <div className="rounded-2xl bg-indigo-void/70 border border-dusty-cyan/20 overflow-hidden">
        <div className="px-4 py-2 border-b border-dusty-cyan/15 bg-indigo-void/50">
          <span className="text-[10px] uppercase tracking-wider font-bold text-bone/70">
            MCP server responds
          </span>
        </div>
        <pre className="px-4 py-3 text-xs text-bone-dim/90 font-[family-name:var(--font-mono)] overflow-x-auto leading-relaxed">
          {formatJson(flow.response)}
        </pre>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-4 h-4 text-bone/50" aria-hidden />
      </div>

      <div className="rounded-2xl bg-caution-amber/15 border border-caution-amber/35 p-4">
        <div className="text-[10px] uppercase tracking-wider font-bold text-caution-amber/90 mb-1.5">
          Claude replies
        </div>
        <p className="text-bone-dim leading-relaxed">{flow.claudeReply}</p>
      </div>
    </div>
  )
}
