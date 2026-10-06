"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  // The stored theme is only known on the client; render a neutral button until then.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isPaper = mounted && resolvedTheme === "light"
  const label = isPaper ? "Switch to dark theme" : "Switch to light theme"

  return (
    <button
      type="button"
      onClick={() => setTheme(isPaper ? "dark" : "light")}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 rounded-xl border border-bone/30 text-bone hover:border-bone/60 hover:-translate-y-0.5 transition motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {isPaper ? <Moon className="w-5 h-5" aria-hidden /> : <Sun className="w-5 h-5" aria-hidden />}
    </button>
  )
}
