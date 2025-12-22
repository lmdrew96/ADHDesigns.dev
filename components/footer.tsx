"use client"

import { Github, Twitter, Mail, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-purple text-teal">
      <div className="max-w-6xl mx-auto">
        {/* CTA Section - updated colors */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s Build Something <span className="text-mustard">Together</span>
          </h2>
          <p className="text-teal/70 max-w-xl mx-auto mb-8">
            Got ideas? Want to collaborate? Or just want to chat about neurodivergent experiences? I&apos;d love to hear
            from you.
          </p>
          <Button
            size="lg"
            className="bg-mustard text-burgundy hover:bg-mustard/90 rounded-full px-8 py-6 text-lg font-bold"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get in Touch
          </Button>
        </div>

        {/* Divider */}
        <div className="border-t border-teal/20 my-12" />

        {/* Bottom Section - updated colors */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-mustard flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-burgundy" />
            </div>
            <div>
              <span className="font-[family-name:var(--font-display)] font-bold text-xl text-teal">ADHD</span>
              <p className="text-xs text-teal/60">Agentic Development of Human Designs</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center hover:bg-mustard hover:text-burgundy transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center hover:bg-mustard hover:text-burgundy transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center hover:bg-mustard hover:text-burgundy transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-teal/60 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-mustard fill-mustard" /> by a chaotic mind
          </p>
        </div>
      </div>
    </footer>
  )
}
