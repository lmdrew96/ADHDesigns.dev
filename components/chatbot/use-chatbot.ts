"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

const STORAGE_KEY = "adhdesigns-chatbot-messages"
const MAX_MESSAGES = 40
const COOLDOWN_MS = 1500

export const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hey! I'm the ADHDesigns assistant — I can tell you about Nae's projects, walk you through her services, or pass a message along to her. What would you like to know?",
}

type Status = "idle" | "sending" | "error"

export function useChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const lastSendRef = useRef<number>(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as ChatMessage[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
        }
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // quota exceeded — fail silently
    }
  }, [messages, hydrated])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return
      if (status === "sending") return

      const now = Date.now()
      if (now - lastSendRef.current < COOLDOWN_MS) {
        setErrorMsg("Slow down a sec — give the bot a moment.")
        setStatus("error")
        return
      }
      lastSendRef.current = now

      const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }]
      if (next.length > MAX_MESSAGES) {
        setErrorMsg("This conversation has gotten long. Refresh the page to start fresh, or email nae@adhdesigns.dev.")
        setStatus("error")
        return
      }

      setMessages(next)
      setStatus("sending")
      setErrorMsg(null)

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        })
        const data = (await res.json().catch(() => ({}))) as { content?: string; error?: string }
        if (!res.ok || !data.content) {
          setErrorMsg(data.error ?? "Something went wrong. Try again.")
          setStatus("error")
          return
        }
        setMessages((prev) => [...prev, { role: "assistant", content: data.content as string }])
        setStatus("idle")
      } catch {
        setErrorMsg("Network error. Check your connection or email nae@adhdesigns.dev.")
        setStatus("error")
      }
    },
    [messages, status],
  )

  const reset = useCallback(() => {
    setMessages([GREETING])
    setStatus("idle")
    setErrorMsg(null)
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(STORAGE_KEY)
      } catch {
        // ignore
      }
    }
  }, [])

  return {
    messages,
    status,
    errorMsg,
    sendMessage,
    reset,
  }
}
