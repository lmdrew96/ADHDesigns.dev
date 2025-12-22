"use client"

import { useState } from "react"
import { Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-burgundy/90 backdrop-blur-md border-b border-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-mustard flex items-center justify-center group-hover:animate-wiggle">
              <Sparkles className="w-5 h-5 text-burgundy" />
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-xl text-teal">ADHD</span>
          </a>

          {/* Desktop Nav - updated link colors */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#projects" className="text-teal/70 hover:text-mustard transition-colors font-medium">
              Projects
            </a>
            <a href="#about" className="text-teal/70 hover:text-mustard transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-teal/70 hover:text-mustard transition-colors font-medium">
              Contact
            </a>
            <Button className="bg-mustard text-burgundy hover:bg-mustard/90 rounded-full px-6 font-bold">
              Let&apos;s Chat
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-teal" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - updated menu colors */}
      {isOpen && (
        <div className="md:hidden bg-dark-teal border-b border-purple">
          <div className="px-4 py-4 space-y-3">
            <a href="#projects" className="block text-teal hover:text-mustard transition-colors font-medium py-2">
              Projects
            </a>
            <a href="#about" className="block text-teal hover:text-mustard transition-colors font-medium py-2">
              About
            </a>
            <a href="#contact" className="block text-teal hover:text-mustard transition-colors font-medium py-2">
              Contact
            </a>
            <Button className="w-full bg-mustard text-burgundy hover:bg-mustard/90 rounded-full font-bold">
              Let&apos;s Chat
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
