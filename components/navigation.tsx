"use client"

import { useState } from "react"
import { Menu, X, MessageCircle } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChatPanel } from "@/components/chatbot/chat-panel"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openChat = () => {
    setIsChatOpen(true)
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-adhd-dark/95 backdrop-blur-xl border-b-2 border-adhd-purple/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-adhd-purple">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center group">
            <Image src="/adhdesigns-logo.png" alt="ADHDesigns logo" width={160} height={38} className="object-contain animate-chaos-shake" />
          </a>

          {/* Desktop Nav — mono uppercase tags, tape-strip hover */}
          <div className="hidden md:flex items-center gap-3 text-adhd-lavender">
            <a
              href="/#projects"
              className="font-mono text-xs uppercase tracking-widest border border-adhd-lavender/40 px-3 py-1.5 hover:bg-magenta hover:border-magenta hover:text-adhd-lavender transition-colors"
            >
              Projects
            </a>
            <a
              href="/mcp"
              className="font-mono text-xs uppercase tracking-widest border border-adhd-lavender/40 px-3 py-1.5 hover:bg-magenta hover:border-magenta hover:text-adhd-lavender transition-colors"
            >
              MCP
            </a>
            <a
              href="/about"
              className="font-mono text-xs uppercase tracking-widest border border-adhd-lavender/40 px-3 py-1.5 hover:bg-magenta hover:border-magenta hover:text-adhd-lavender transition-colors"
            >
              About
            </a>
             <Button
              type="button"
              onClick={openChat}
              className="bg-adhd-lavender text-adhd-dark hover:bg-adhd-lavender/90 rounded-sm px-6 font-mono text-xs uppercase tracking-widest gap-2 shadow-[3px_3px_0_var(--magenta)]"
            >
              <MessageCircle className="w-4 h-4" />
              Let&apos;s Chat
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-adhd-sage" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-adhd-dark border-b-2 border-adhd-purple/40">
          <div className="px-4 py-4 space-y-2">
            <a href="/#projects" className="block font-mono text-xs uppercase tracking-widest text-adhd-lavender border border-adhd-lavender/30 px-3 py-2.5 hover:bg-magenta hover:border-magenta transition-colors">
              Projects
            </a>
            <a href="/mcp" className="block font-mono text-xs uppercase tracking-widest text-adhd-lavender border border-adhd-lavender/30 px-3 py-2.5 hover:bg-magenta hover:border-magenta transition-colors">
              MCP
            </a>
            <a href="/about" className="block font-mono text-xs uppercase tracking-widest text-adhd-lavender border border-adhd-lavender/30 px-3 py-2.5 hover:bg-magenta hover:border-magenta transition-colors">
              About
            </a>
            <a href="/#contact" className="block font-mono text-xs uppercase tracking-widest text-adhd-lavender border border-adhd-lavender/30 px-3 py-2.5 hover:bg-magenta hover:border-magenta transition-colors">
              Contact
            </a>
            <Button
              type="button"
              onClick={openChat}
              className="w-full bg-adhd-lavender text-adhd-dark hover:bg-adhd-lavender/90 rounded-sm font-mono text-xs uppercase tracking-widest gap-2 shadow-[3px_3px_0_var(--magenta)]"
            >
              <MessageCircle className="w-4 h-4" />
              Let&apos;s Chat
            </Button>
          </div>
        </div>
      )}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </nav>
  )
}
