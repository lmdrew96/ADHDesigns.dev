"use client"

import { Github, Mail, Heart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-purple/60 backdrop-blur-xl text-popover-foreground relative overflow-hidden">
      {/* Background blobs for glassmorphism */}
      <div className="absolute top-10 left-10 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(222,165,73,0.25) 0%, transparent 70%)" }} />
      <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(140,189,185,0.2) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(150,208,128,0.15) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* CTA Section - updated colors */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s Build Something <span className="text-accent">Together</span>
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-primary">
            Got ideas? Want to collaborate? Or just want to chat about neurodivergent experiences? I&apos;d love to hear
            from you.
          </p>
          <Button
            size="lg"
            className="bg-mustard text-olive hover:bg-mustard/90 rounded-full px-8 py-6 text-lg font-bold"
            asChild
          >
            <a href="mailto:nae@adhdesigns.dev">
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </a>
          </Button>
        </div>

        {/* Divider */}
        <div className="border-t border-teal/20 my-12" />

        {/* Bottom Section - updated colors */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent overflow-hidden">
              <Image src="/vertexism_favicon_128.png" alt="ADHDesigns logo" width={28} height={28} className="object-contain" style={{ marginTop: '-4.67px' }} />
            </div>
            <div>
              <span className="font-[family-name:var(--font-display)] font-bold text-xl text-card">Brought to you by ADHD</span>
              <p className="text-xs text-foreground">Agentic Development of Human Designs</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-center justify-center">
            <a
              href="https://github.com/lmdrew96"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-teal/10 backdrop-blur-md border border-teal/20 flex items-center justify-center hover:bg-mustard hover:text-olive transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:nae@adhdesigns.dev"
              className="w-10 h-10 rounded-full bg-teal/10 backdrop-blur-md border border-teal/20 flex items-center justify-center hover:bg-mustard hover:text-olive transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm flex items-center gap-1 text-popover-foreground">
            Made with <Heart className="w-4 h-4 text-mustard fill-mustard" /> by a chaotic mind
          </p>
        </div>
      </div>
    </footer>
  )
}
