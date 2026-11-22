"use client"

import { useState } from "react"
import { Menu, X, MessageCircle } from "lucide-react"
import { ChatPanel } from "@/components/chatbot/chat-panel"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openChat = () => {
    setIsChatOpen(true)
    setIsOpen(false)
  }

  const navLink = "zine-mono text-[13px] tracking-[1.2px] text-fg hover:text-link-hover underline-offset-4 hover:underline decoration-2 transition-colors"
  const mobileLink = "block zine-mono text-[13px] tracking-[1.2px] text-fg border-2 border-fg px-3 py-2.5 hover:bg-fg/10 transition-colors"

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b-2 border-fg">
          <a href="/" className="flex items-center font-display text-2xl leading-none text-fg animate-chaos-shake" aria-label="ADHDesigns home">
            <span className="bg-accent text-on-fill border-2 border-fg px-1.5 pt-1 pb-0.5">ADHD</span>
            <span className="pt-1">esigns</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            <a href="/#projects" className={navLink}>Projects</a>
            <a href="/mcp" className={navLink}>MCP</a>
            <a href="/about" className={navLink}>About</a>
            <button
              type="button"
              onClick={openChat}
              className="zine-shadow zine-mono text-[13px] tracking-[1.2px] bg-fg text-background px-5 h-10 inline-flex items-center gap-2"
              style={{ "--shadow-size": "4px", "--shadow-color": "var(--blue)" } as React.CSSProperties}
            >
              <MessageCircle className="w-4 h-4" aria-hidden />
              Say Hi
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button className="p-2 text-fg" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" aria-expanded={isOpen}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b-2 border-fg">
          <div className="px-4 py-4 space-y-2">
            <a href="/#projects" className={mobileLink}>Projects</a>
            <a href="/mcp" className={mobileLink}>MCP</a>
            <a href="/about" className={mobileLink}>About</a>
            <a href="/#contact" className={mobileLink}>Contact</a>
            <button
              type="button"
              onClick={openChat}
              className="w-full zine-mono text-[13px] tracking-[1.2px] bg-fg text-background h-11 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" aria-hidden />
              Say Hi
            </button>
          </div>
        </div>
      )}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </nav>
  )
}
