"use client"

import { ArrowDown, Brain } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

const PUCK_SIZE = 52

function AirHockeyPuck({ active }: { active: boolean }) {
  const posRef = useRef({ x: 0, y: 0 })
  const velRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!active) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      return
    }

    posRef.current = {
      x: window.innerWidth / 2 - PUCK_SIZE / 2,
      y: window.innerHeight / 2 - PUCK_SIZE / 2,
    }
    velRef.current = {
      x: (Math.random() > 0.5 ? 1 : -1) * (9 + Math.random() * 5),
      y: (Math.random() > 0.5 ? 1 : -1) * (7 + Math.random() * 5),
    }

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
      setPos({ x: nx, y: ny })
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [active])

  if (!active) return null

  return (
    <div
      className="fixed z-[9999] pointer-events-none rounded-full shadow-2xl shadow-adhd-amber/40"
      style={{ left: pos.x, top: pos.y, width: PUCK_SIZE, height: PUCK_SIZE }}
    >
      <Image
        src="/vertexism_favicon_128.png"
        alt=""
        width={PUCK_SIZE}
        height={PUCK_SIZE}
        className="rounded-full w-full h-full object-contain bg-adhd-teal"
      />
    </div>
  )
}

export function HeroSection() {
  const [puckActive, setPuckActive] = useState(false)

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden bg-background">
      {/* Decorative blobs - radial gradients avoid iOS WebKit filter:blur compositing bug */}
      <div className="absolute top-20 left-5 w-96 h-96 rounded-full animate-float pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-amber) 50%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute top-32 right-10 w-96 h-96 rounded-full animate-float pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-sage) 40%, transparent) 0%, transparent 70%)", animationDelay: "1s" }} />
      <div className="absolute bottom-24 left-1/4 w-80 h-80 rounded-full animate-float pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-purple) 40%, transparent) 0%, transparent 70%)", animationDelay: "0.5s" }} />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full animate-float pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-teal) 50%, transparent) 0%, transparent 70%)", animationDelay: "1.5s" }} />
      <div className="absolute bottom-1/3 right-16 w-80 h-80 rounded-full animate-float pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-green) 30%, transparent) 0%, transparent 70%)", animationDelay: "2s" }} />

      <AirHockeyPuck active={puckActive} />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Tagline - updated colors */}
        

        {/* Main Headline - updated accent colors */}
        <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-foreground">
          <span className="whitespace-nowrap text-foreground">
            <span className="inline-block hover:animate-wiggle cursor-default text-adhd-teal">A</span>gentic
          </span>{" "}
          <span className="whitespace-nowrap text-foreground">
            <span className="inline-block hover:animate-wiggle cursor-default text-adhd-green">D</span>evelopment
          </span>{" "}
          of{" "}
          <span className="whitespace-nowrap">
            <span className="inline-block hover:animate-wiggle cursor-default text-adhd-amber">H</span>uman
          </span>{" "}
          <span className="whitespace-nowrap">
            <span className="inline-block hover:animate-wiggle cursor-default text-adhd-sage">D</span>esigns
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-teal max-w-3xl mx-auto mb-10 leading-relaxed">
          Apps built with chaos, designed with purpose. Created by a neurodivergent designer who believes the best tools come from understanding the beautiful mess of neurodivergent minds.
        </p>

        {/* CTA Buttons - updated button colors */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          <Button
            size="lg"
            className="bg-adhd-amber text-adhd-dark hover:bg-adhd-amber/90 rounded-full px-4 py-3 sm:px-8 sm:py-6 text-sm sm:text-lg font-semibold group"
            asChild
          >
            <a
              href="#projects"
              onMouseEnter={() => setPuckActive(true)}
              onMouseLeave={() => setPuckActive(false)}
            >
              <span className="block w-5 h-5 mr-1.5 sm:mr-2 group-hover:animate-spin shrink-0" style={{ transformOrigin: '50% 66.67%' }}>
                <Image src="/vertexism_favicon_128.png" alt="" width={20} height={20} className="object-contain w-full h-full" />
              </span>
              Explore Projects
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-4 py-3 sm:px-8 sm:py-6 text-sm sm:text-lg font-semibold border border-adhd-sage/40 text-adhd-sage hover:bg-adhd-sage hover:text-adhd-dark bg-white/5 backdrop-blur-md shadow-lg shadow-adhd-sage/10"
            asChild
          >
            <a href="#about">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
              My Story
            </a>
          </Button>
        </div>

        {/* Feature Pills - updated pill colors */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "ADHD Friendly",     cls: "bg-foreground/40 text-card" },
            { label: "Student Built",     cls: "bg-primary/40 text-foreground" },
            { label: "Open Source",       cls: "bg-accent/40 text-secondary" },
            { label: "Learning Tools", cls: "bg-card/40 text-primary" },
            { label: "AI Powered",        cls: "bg-secondary/40 text-secondary" },
          ].map(({ label, cls }) => (
            <span
              key={label}
              className={`px-4 py-2 ${cls} rounded-full text-sm font-bold hover:scale-105 transition-transform cursor-default backdrop-blur-xl border border-white/20 shadow-lg shadow-black/10`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#projects" className="flex flex-col items-center gap-2 text-teal hover:text-mustard transition-colors">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
