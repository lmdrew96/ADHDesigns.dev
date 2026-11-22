"use client"

import { Github, Mail } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer id="contact" className="px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-6xl mx-auto border-t-2 border-fg pt-20">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-[-1px] text-fg mb-4">
            Let&apos;s Build Something <span className="zine-highlight">Together</span>
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-fg-muted">
            Got ideas? Want to collaborate? Or just want to chat about neurodivergent experiences? I&apos;d love to hear
            from you.
          </p>
          <a
            href="mailto:nae@adhdesigns.dev"
            className="zine-shadow zine-mono text-sm tracking-[1.4px] bg-fg text-background h-12 px-7 inline-flex items-center gap-2"
            style={{ "--shadow-color": "var(--blue)" } as React.CSSProperties}
          >
            <Mail className="w-5 h-5" aria-hidden />
            Get in Touch
          </a>
        </div>

        {/* Bottom Section — colophon */}
        <div className="border-t-2 border-fg/30 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-card overflow-hidden border-2 border-fg">
              <Image src="/vertexism_favicon_128.png" alt="ADHDesigns logo" width={28} height={28} className="object-contain" style={{ marginTop: '-4.67px' }} />
            </div>
            <div>
              <span className="inline-block bg-sticker text-on-fill border-2 border-fg px-3 py-0.5 font-display text-lg -rotate-1">
                brought to you by ADHD
              </span>
              <p className="mt-2 zine-mono text-[11px] tracking-[1px] text-fg-muted">Agentic Development of Human Designs</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/lmdrew96"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border-2 border-fg text-fg flex items-center justify-center hover:bg-fg/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:nae@adhdesigns.dev"
              className="w-10 h-10 border-2 border-fg text-fg flex items-center justify-center hover:bg-fg/10 transition-colors"
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
