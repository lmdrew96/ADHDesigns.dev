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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-adhd-dark/95 backdrop-blur-xl border-b border-adhd-teal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-adhd-purple">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center group">
            <Image src="/adhdesigns-logo.png" alt="ADHDesigns logo" width={160} height={38} className="object-contain animate-chaos-shake" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-adhd-purple">
            <a href="/#projects" className="hover:text-adhd-sage transition-colors font-medium">
              Projects
            </a>
            <a href="/services" className="hover:text-adhd-sage transition-colors font-medium">
              Services
            </a>
            <a href="/mcp" className="hover:text-adhd-sage transition-colors font-medium">
              MCP
            </a>
            <a href="/about" className="hover:text-adhd-sage transition-colors font-medium">
              About
            </a>
            <a href="/#contact" className="hover:text-adhd-sage transition-colors font-medium">
              Contact
            </a>
            <Button
              type="button"
              onClick={openChat}
              className="bg-adhd-sage text-adhd-dark hover:bg-adhd-sage/90 rounded-full px-6 font-bold gap-2"
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

      {/* Mobile Menu - updated menu colors */}
      {isOpen && (
        <div className="md:hidden glass-card border-b border-adhd-sage/20">
          <div className="px-4 py-4 space-y-3">
            <a href="/#projects" className="block text-adhd-sage hover:text-mustard transition-colors font-medium py-2">
              Projects
            </a>
            <a href="/services" className="block text-adhd-sage hover:text-mustard transition-colors font-medium py-2">
              Services
            </a>
            <a href="/mcp" className="block text-adhd-sage hover:text-mustard transition-colors font-medium py-2">
              MCP
            </a>
            <a href="/about" className="block text-adhd-sage hover:text-mustard transition-colors font-medium py-2">
              About
            </a>
            <a href="/#contact" className="block text-adhd-sage hover:text-mustard transition-colors font-medium py-2">
              Contact
            </a>
            <Button
              type="button"
              onClick={openChat}
              className="w-full bg-adhd-purple text-adhd-dark hover:bg-adhd-purple/90 rounded-full font-bold gap-2"
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
