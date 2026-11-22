import { ArrowDown } from "lucide-react"
import type { ExampleFlow } from "@/lib/mcp-servers"
import { cn } from "@/lib/utils"

const formatJson = (value: unknown) => JSON.stringify(value, null, 2)

const label = "zine-mono text-[11px] tracking-[1px]"

const Arrow = () => (
  <div className="flex justify-center">
    <ArrowDown className="w-4 h-4 text-fg" aria-hidden />
  </div>
)

export function ExampleFlowCard({ flow, toolFill }: { flow: ExampleFlow; toolFill: string }) {
  return (
    <div className="space-y-3">
      <div className="bg-card border-2 border-fg p-4">
        <div className={cn(label, "text-fg-muted mb-1.5")}>User asks Claude</div>
        <p className="text-fg leading-relaxed">{flow.userPrompt}</p>
      </div>

      <Arrow />

      <div className="bg-card border-2 border-fg overflow-hidden">
        <div className="flex items-center justify-between gap-2 flex-wrap px-4 py-2 border-b-2 border-fg">
          <span className={cn(label, "text-fg-muted")}>Claude calls MCP tool</span>
          <code className={cn("text-xs font-mono font-semibold text-on-fill border border-fg px-1.5 py-0.5", toolFill)}>
            {flow.toolName}
          </code>
        </div>
        <pre className="px-4 py-3 text-xs text-fg font-mono overflow-x-auto leading-relaxed">
          {formatJson(flow.toolArgs)}
        </pre>
      </div>

      <Arrow />

      <div className="bg-card border-2 border-fg overflow-hidden">
        <div className="px-4 py-2 border-b-2 border-fg">
          <span className={cn(label, "text-fg-muted")}>MCP server responds</span>
        </div>
        <pre className="px-4 py-3 text-xs text-fg font-mono overflow-x-auto leading-relaxed">
          {formatJson(flow.response)}
        </pre>
      </div>

      <Arrow />

      <div className="bg-accent text-on-fill border-2 border-fg p-4">
        <div className={cn(label, "mb-1.5")}>Claude replies</div>
        <p className="leading-relaxed">{flow.claudeReply}</p>
      </div>
    </div>
  )
}
