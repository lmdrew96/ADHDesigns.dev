"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sidebar/95 backdrop-blur-xl border-b border-adhd-teal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center group">
            <Image src="/adhdesigns-logo.png" alt="ADHDesigns logo" width={160} height={38} className="object-contain animate-chaos-shake" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-foreground">
            <a href="/#projects" className="hover:text-adhd-amber transition-colors font-medium text-foreground">
              Projects
            </a>
            <a href="/services" className="hover:text-adhd-amber transition-colors font-medium text-foreground">
              Services
            </a>
            <a href="/#about" className="hover:text-adhd-amber transition-colors font-medium text-foreground">
              About
            </a>
            <a href="/#contact" className="hover:text-adhd-amber transition-colors font-medium text-foreground">
              Contact
            </a>
            <Button className="bg-adhd-amber text-adhd-dark hover:bg-adhd-amber/90 rounded-full px-6 font-bold" asChild>
              <a href="mailto:nae@adhdesigns.dev">Let&apos;s Chat</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-adhd-amber" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - updated menu colors */}
      {isOpen && (
        <div className="md:hidden glass-dark border-b border-teal/20">
          <div className="px-4 py-4 space-y-3">
            <a href="/#projects" className="block text-teal hover:text-mustard transition-colors font-medium py-2">
              Projects
            </a>
            <a href="/services" className="block text-teal hover:text-mustard transition-colors font-medium py-2">
              Services
            </a>
            <a href="/#about" className="block text-teal hover:text-mustard transition-colors font-medium py-2">
              About
            </a>
            <a href="/#contact" className="block text-teal hover:text-mustard transition-colors font-medium py-2">
              Contact
            </a>
            <Button className="w-full bg-adhd-amber text-adhd-dark hover:bg-adhd-amber/90 rounded-full font-bold" asChild>
              <a href="mailto:nae@adhdesigns.dev">Let&apos;s Chat</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
