"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

type MarkdownProps = {
  children: string
  className?: string
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={cn("prose-chat", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: c }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-caution-amber underline underline-offset-2 hover:text-caution-amber/80 paper:text-magenta paper:hover:text-magenta/80"
            >
              {c}
            </a>
          ),
          p: ({ children: c }) => <p className="mb-2 last:mb-0 leading-relaxed">{c}</p>,
          ul: ({ children: c }) => <ul className="list-disc pl-5 mb-2 space-y-1">{c}</ul>,
          ol: ({ children: c }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{c}</ol>,
          li: ({ children: c }) => <li className="leading-relaxed">{c}</li>,
          h1: ({ children: c }) => <h3 className="text-base font-bold mb-2 mt-3 first:mt-0">{c}</h3>,
          h2: ({ children: c }) => <h3 className="text-base font-bold mb-2 mt-3 first:mt-0">{c}</h3>,
          h3: ({ children: c }) => <h4 className="text-sm font-bold mb-1 mt-2 first:mt-0">{c}</h4>,
          strong: ({ children: c }) => <strong className="font-bold">{c}</strong>,
          em: ({ children: c }) => <em className="italic">{c}</em>,
          code: ({ children: c, className: codeClassName }) => {
            const isBlock = codeClassName?.startsWith("language-")
            if (isBlock) {
              return (
                <code className="block bg-indigo-void/40 paper:bg-indigo-void text-caution-amber font-mono text-xs rounded-lg p-3 my-2 overflow-x-auto whitespace-pre">
                  {c}
                </code>
              )
            }
            return (
              <code className="bg-indigo-void/30 paper:bg-indigo-void text-caution-amber font-mono text-[0.85em] px-1.5 py-0.5 rounded">
                {c}
              </code>
            )
          },
          pre: ({ children: c }) => <pre className="my-2">{c}</pre>,
          blockquote: ({ children: c }) => (
            <blockquote className="border-l-2 border-caution-amber/60 pl-3 italic text-bone-dim/80 paper:text-ink-muted my-2">
              {c}
            </blockquote>
          ),
          hr: () => <hr className="my-3 border-muted-indigo/30" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
