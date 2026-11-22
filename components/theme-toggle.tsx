"use client"

import { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// View Transitions API; this project's DOM lib types predate it.
type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => unknown }

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  // The stored theme is only known on the client; render a neutral button until then.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isPaper = mounted && resolvedTheme === "light"
  const label = isPaper ? "Switch to dark theme" : "Switch to light theme"

  const toggle = () => {
    const next = isPaper ? "dark" : "light"
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const doc = document as ViewTransitionDocument
    if (!doc.startViewTransition || reduceMotion) {
      setTheme(next)
      return
    }
    // next-themes writes data-theme in an effect, so set it here too:
    // the transition snapshots the new state as soon as this callback returns.
    doc.startViewTransition(() => {
      document.documentElement.setAttribute("data-theme", next)
      document.documentElement.style.colorScheme = next
      flushSync(() => setTheme(next))
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 border-2 border-fg text-fg hover:bg-fg/10 transition-colors motion-reduce:transition-none",
        className,
      )}
    >
      {isPaper ? <Moon className="w-5 h-5" aria-hidden /> : <Sun className="w-5 h-5" aria-hidden />}
    </button>
  )
}
