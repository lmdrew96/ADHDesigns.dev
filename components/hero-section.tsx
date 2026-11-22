"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { CHAOS_ECOSYSTEM_SLUGS, homeProjects } from "@/lib/projects"

const PUCK_SIZE = 20

const ecosystem = homeProjects.filter((p) => CHAOS_ECOSYSTEM_SLUGS.includes(p.slug))

function EcosystemCard({ className }: { className?: string }) {
  return (
    <div className={cn("relative bg-eco-card text-on-fill border-2 border-fg p-6", className)}>
      <div className="zine-tape left-1/2 -translate-x-1/2" style={{ "--tape": "var(--accent)" } as React.CSSProperties} />
      <p className="zine-mono text-xs tracking-[1.4px] mb-3">The Chaos Ecosystem</p>
      <ul className="space-y-1">
        {ecosystem.map((p) => (
          <li key={p.slug} className="font-display text-2xl xl:text-[28px] leading-tight">{p.name}</li>
        ))}
      </ul>
    </div>
  )
}

const RoundSticker = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "rounded-full bg-accent text-on-fill border-2 border-fg flex items-center justify-center text-center zine-mono tracking-[1px] leading-snug -rotate-12",
      className,
    )}
  >
    Student<br />Built<br />· Open ·<br />Source
  </div>
)

const AdhdSticker = ({ className }: { className?: string }) => (
  <div className={cn("bg-sticker text-on-fill border-2 border-fg px-4 py-2 font-display -rotate-2 whitespace-nowrap", className)}>
    brought to you by ADHD
  </div>
)

export function HeroSection() {
  const iconRef = useRef<HTMLSpanElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const velRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)
  const [puckPos, setPuckPos] = useState<{ x: number; y: number } | null>(null)
  const [canHover, setCanHover] = useState(false)
  useEffect(() => { setCanHover(window.matchMedia('(hover: hover)').matches) }, [])

  const startPuck = () => {
    if (!iconRef.current) return
    const rect = iconRef.current.getBoundingClientRect()
    posRef.current = { x: rect.left, y: rect.top }
    velRef.current = {
      x: (Math.random() > 0.5 ? 1 : -1) * (9 + Math.random() * 5),
      y: (Math.random() > 0.5 ? 1 : -1) * (7 + Math.random() * 5),
    }
    setPuckPos({ x: rect.left, y: rect.top })

    const tick = () => {
      const p = posRef.current
      const v = velRef.current
      let nx = p.x + v.x
      let ny = p.y + v.y
      let nvx = v.x
      let nvy = v.y

      if (nx <= 0) { nx = 0; nvx = Math.abs(nvx) }
      if (nx >= window.innerWidth - PUCK_SIZE) { nx = window.innerWidth - PUCK_SIZE; nvx = -Math.abs(nvx) }
      if (ny <= 0) { ny = 0; nvy = Math.abs(nvy) }
      if (ny >= window.innerHeight - PUCK_SIZE) { ny = window.innerHeight - PUCK_SIZE; nvy = -Math.abs(nvy) }

      posRef.current = { x: nx, y: ny }
      velRef.current = { x: nvx, y: nvy }
      setPuckPos({ x: nx, y: ny })
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
  }

  const stopPuck = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    setPuckPos(null)
  }

  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }, [])

  return (
    <section id="top" className="pt-32 pb-20 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8">
      {/* Bouncing puck — fixed clone of the button icon */}
      {puckPos && (
        <div
          className="fixed z-[9999] pointer-events-none rounded-full"
          style={{ left: puckPos.x, top: puckPos.y, width: PUCK_SIZE, height: PUCK_SIZE }}
        >
          <Image src="/vertexism_favicon_128.png" alt="" width={PUCK_SIZE} height={PUCK_SIZE} className="rounded-full w-full h-full object-contain bg-background" />
        </div>
      )}

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-10 items-center">
        <div>
          <span className="inline-block bg-accent text-on-fill border-2 border-fg zine-mono text-xs tracking-[1.4px] px-3 py-1.5 -rotate-2 mb-6">
            ADHD Friendly · AI Powered
          </span>

          <h1 className="text-[44px] sm:text-6xl lg:text-[72px] xl:text-[84px] leading-[1.02] tracking-[-1.5px] text-fg mb-8">
            Agentic Development of <span className="zine-highlight">Human Designs</span>
          </h1>

          <p className="text-lg sm:text-xl text-fg max-w-xl mb-10 leading-relaxed">
            Apps built with chaos, designed with purpose. Created by a neurodivergent designer who believes the best tools come from understanding the beautiful mess of neurodivergent minds.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/#projects"
              onMouseEnter={canHover ? startPuck : undefined}
              onMouseLeave={canHover ? stopPuck : undefined}
              className="zine-shadow zine-mono text-sm tracking-[1.4px] bg-primary text-primary-foreground border-2 border-fg h-12 px-6 inline-flex items-center gap-2"
            >
              <span
                ref={iconRef}
                className="block w-5 h-5 shrink-0"
                style={{ visibility: puckPos ? "hidden" : "visible" }}
              >
                <Image src="/vertexism_favicon_128.png" alt="" width={20} height={20} className="object-contain w-full h-full" />
              </span>
              See My Projects
            </a>
            <a
              href="/about"
              className="zine-mono text-sm tracking-[1.4px] text-fg border-2 border-fg h-12 px-6 inline-flex items-center hover:bg-fg/10 transition-colors"
            >
              My Story
            </a>
          </div>
        </div>

        {/* Collage — desktop */}
        <div className="relative hidden lg:block h-[460px]" aria-hidden>
          <div className="zine-dots absolute left-[6%] top-0 w-[58%] h-[80%] -rotate-4" />
          <EcosystemCard className="absolute right-0 top-[11%] w-[62%] rotate-3" />
          <RoundSticker className="absolute left-0 bottom-[12%] w-40 h-40 text-xs" />
          <AdhdSticker className="absolute right-[8%] bottom-0 text-lg" />
        </div>

        {/* Collage — phones and tablets: stacked, no overflow */}
        <div className="lg:hidden flex flex-col items-center gap-8 px-3" aria-hidden>
          <EcosystemCard className="w-full max-w-sm rotate-[1.5deg]" />
          <div className="flex items-center justify-center gap-5 flex-wrap">
            <RoundSticker className="w-28 h-28 text-[10px]" />
            <AdhdSticker className="text-base" />
          </div>
        </div>
      </div>
    </section>
  )
}
