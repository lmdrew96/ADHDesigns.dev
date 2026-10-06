"use client"

import { useEffect, useRef, useState } from "react"
import { Send, X, Sparkles, RotateCcw } from "lucide-react"

import { Markdown } from "@/components/markdown"
import { cn } from "@/lib/utils"
import { useChatBot, type ChatMessage } from "./use-chatbot"

type ChatPanelProps = {
  isOpen: boolean
  onClose: () => void
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const { messages, status, errorMsg, sendMessage, reset } = useChatBot()
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      const last = lastFocusedRef.current
      if (last && typeof last.focus === "function") {
        last.focus()
        lastFocusedRef.current = null
      }
      return
    }
    if (typeof document !== "undefined") {
      const active = document.activeElement
      if (active instanceof HTMLElement) lastFocusedRef.current = active
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 250)
    return () => window.clearTimeout(t)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== "Tab" || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isOpen, status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = input
    setInput("")
    await sendMessage(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      void handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[60] bg-indigo-void/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="ADHDesigns Assistant"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "fixed top-0 right-0 z-[70] h-[100dvh] w-full sm:w-[420px] bg-indigo-void paper:bg-bone border-l-2 border-indigo-deep/30 shadow-2xl flex flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
      >
        <header className="surface-dark flex items-center justify-between px-4 py-3 border-b border-indigo-deep/30 bg-indigo-void">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-caution-amber/20 text-caution-amber">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <div className="font-bold text-bone-dim leading-tight">ADHDesigns Assistant</div>
              <div className="text-[11px] text-muted-indigo/80 leading-tight">Powered by Claude Haiku</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={reset}
              className="p-2 rounded-full text-muted-indigo hover:text-dusty-cyan hover:bg-indigo-deep/20 transition-colors"
              aria-label="Reset conversation"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-muted-indigo hover:text-caution-amber hover:bg-indigo-deep/20 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
          aria-live="polite"
          aria-busy={status === "sending"}
        >
          {messages.map((m, i) => (
            <ChatBubble key={i} message={m} />
          ))}
          {status === "sending" && (
            <div className="flex items-center gap-2 text-muted-indigo/80 paper:text-ink-muted text-sm pl-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-caution-amber animate-pulse" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-caution-amber animate-pulse [animation-delay:150ms]" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-caution-amber animate-pulse [animation-delay:300ms]" />
            </div>
          )}
          {errorMsg && (
            <div role="alert" className="rounded-xl bg-caution-amber/15 border border-caution-amber/40 px-3 py-2 text-bone-dim paper:text-indigo-void text-sm">
              {errorMsg}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="surface-dark border-t border-indigo-deep/30 p-3 bg-indigo-void">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a project, or send a message…"
              rows={1}
              maxLength={4000}
              disabled={status === "sending"}
              className="flex-1 resize-none rounded-2xl bg-bone-dim/95 text-indigo-void placeholder:text-muted-indigo/60 px-4 py-2.5 text-sm border-2 border-indigo-deep/20 focus:border-caution-amber focus:outline-none transition-colors max-h-32"
            />
            <button
              type="submit"
              disabled={status === "sending" || !input.trim()}
              className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-caution-amber text-indigo-void hover:bg-caution-amber/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-muted-indigo/70 mt-2 text-center">
            Or email{" "}
            <a href="mailto:nae@adhdesigns.dev" className="text-caution-amber underline underline-offset-2">
              nae@adhdesigns.dev
            </a>{" "}
            directly.
          </p>
        </form>
      </aside>
    </>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
          isUser
            ? "bg-caution-amber text-indigo-void rounded-br-sm font-medium"
            : "bg-indigo-deep/30 text-bone-dim paper:bg-bone-dim paper:text-indigo-void paper:border paper:border-hairline rounded-bl-sm",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        ) : (
          <Markdown>{message.content}</Markdown>
        )}
      </div>
    </div>
  )
}
