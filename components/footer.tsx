"use client"

import { Github, Mail, Heart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-adhd-purple/60 backdrop-blur-xl text-popover-foreground relative overflow-hidden">
      {/* Background blobs for glassmorphism */}
      <div className="absolute top-10 left-10 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-lavender) 25%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-teal) 20%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-green) 15%, transparent) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* CTA Section*/}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-adhd-lavender font-bold mb-4">
            Let&apos;s Build Something <span className="text-adhd-sage">Together</span>
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-adhd-green">
            Got ideas? Want to collaborate? Or just want to chat about neurodivergent experiences? I&apos;d love to hear
            from you.
          </p>
          <Button
            size="lg"
            className="bg-adhd-dark/90 text-adhd-sage hover:bg-adhd-lavender hover:text-adhd-teal rounded-full px-8 py-6 text-lg font-bold"
            asChild
          >
            <a href="mailto:nae@adhdesigns.dev">
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </a>
          </Button>
        </div>

        {/* Divider */}
        <div className="border-t border-adhd-lavender/20 my-12" />

        {/* Bottom Section*/}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-adhd-dark overflow-hidden">
              <Image src="/vertexism_favicon_128.png" alt="ADHDesigns logo" width={28} height={28} className="object-contain" style={{ marginTop: '-4.67px' }} />
            </div>
            <div>
              <span className="font-[family-name:var(--font-display)] font-bold text-xl text-adhd-lavender">
                Brought to you by{" "}
                <span className="text-adhd-teal">A</span>
                <span className="text-adhd-green">D</span>
                <span className="text-adhd-amber">H</span>
                <span className="text-adhd-sage">D</span>
              </span>
              <p className="text-xs text-adhd-lavender">Agentic Development of Human Designs</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-center justify-center">
            <a
              href="https://github.com/lmdrew96"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-adhd-teal/10 backdrop-blur-md border border-adhd-sage/20 flex items-center justify-center hover:bg-adhd-green hover:text-adhd-dark transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:nae@adhdesigns.dev"
              className="w-10 h-10 rounded-full bg-adhd-teal/10 backdrop-blur-md border border-adhd-sage/20 flex items-center justify-center hover:bg-adhd-green hover:text-adhd-dark transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
