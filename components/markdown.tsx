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
              className="text-adhd-amber underline underline-offset-2 hover:text-adhd-amber/80"
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
                <code className="block bg-adhd-dark/40 text-adhd-amber font-mono text-xs rounded-lg p-3 my-2 overflow-x-auto whitespace-pre">
                  {c}
                </code>
              )
            }
            return (
              <code className="bg-adhd-dark/30 text-adhd-amber font-mono text-[0.85em] px-1.5 py-0.5 rounded">
                {c}
              </code>
            )
          },
          pre: ({ children: c }) => <pre className="my-2">{c}</pre>,
          blockquote: ({ children: c }) => (
            <blockquote className="border-l-2 border-adhd-amber/60 pl-3 italic text-adhd-bg/80 my-2">
              {c}
            </blockquote>
          ),
          hr: () => <hr className="my-3 border-adhd-purple/30" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
