"use client"

import { ArrowDown, Brain } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

const PUCK_SIZE = 20

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
    <section
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--adhd-dark) 0%, var(--adhd-teal) 45%, var(--adhd-purple) 70%, var(--adhd-dark) 100%)" }}
    >
      {/* Grid horizon — perspective floor in bone, replaces the old pastel blobs */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[46%] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, color-mix(in srgb, var(--adhd-lavender) 30%, transparent) 0 2px, transparent 2px 60px), repeating-linear-gradient(0deg, color-mix(in srgb, var(--adhd-lavender) 24%, transparent) 0 2px, transparent 2px 34px)",
          transform: "perspective(240px) rotateX(58deg)",
          transformOrigin: "bottom",
          maskImage: "linear-gradient(180deg, transparent, black 30%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 30%)",
        }}
      />

      {/* Halftone halo behind the headline — same dot texture as the project clippings */}
      <div
        className="absolute left-1/2 top-[54%] w-[480px] h-[480px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, var(--adhd-lavender) 1.5px, transparent 1.8px)",
          backgroundSize: "14px 14px",
          maskImage: "radial-gradient(circle, black 0%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 65%)",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{ background: "repeating-linear-gradient(0deg, color-mix(in srgb, var(--shadow) 18%, transparent) 0 1px, transparent 1px 3px)" }}
      />

      {/* Bouncing puck — fixed clone of the button icon */}
      {puckPos && (
        <div
          className="fixed z-[9999] pointer-events-none rounded-full"
          style={{ left: puckPos.x, top: puckPos.y, width: PUCK_SIZE, height: PUCK_SIZE }}
        >
          <Image src="/vertexism_favicon_128.png" alt="" width={PUCK_SIZE} height={PUCK_SIZE} className="rounded-full w-full h-full object-contain bg-adhd-dark" />
        </div>
      )}

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main Headline - stamped double-shadow, magenta + indigo */}
        <h1
          className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-adhd-lavender"
          style={{ textShadow: "3px 3px 0 var(--pink), 6px 6px 0 var(--adhd-purple)" }}
        >
          <span className="whitespace-nowrap">
            <span className="inline-block hover:animate-wiggle cursor-default text-magenta">A</span>gentic
          </span>{" "}
          <span className="whitespace-nowrap">
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
        <p className="text-lg sm:text-xl md:text-2xl text-adhd-lavender max-w-3xl mx-auto mb-10 leading-relaxed">
          Apps built with chaos, designed with purpose. Created by a neurodivergent designer who believes the best tools come from understanding the beautiful mess of neurodivergent minds.
        </p>

        {/* CTA Buttons — sticker-taped rectangles instead of pills */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          <Button
            size="lg"
            className="bg-adhd-lavender text-adhd-dark border-2 border-adhd-lavender hover:-translate-y-0.5 rounded-sm px-4 py-3 sm:px-8 sm:py-6 text-sm sm:text-lg font-mono uppercase tracking-widest transition-transform group"
            style={{ boxShadow: "4px 4px 0 var(--magenta)" }}
            asChild
          >
            <a
              href="/#projects"
              onMouseEnter={canHover ? startPuck : undefined}
              onMouseLeave={canHover ? stopPuck : undefined}
            >
              <span
                ref={iconRef}
                className="block w-5 h-5 mr-1.5 sm:mr-2 shrink-0"
                style={{ visibility: puckPos ? "hidden" : "visible" }}
              >
                <Image src="/vertexism_favicon_128.png" alt="" width={20} height={20} className="object-contain w-full h-full" />
              </span>
              See My Projects
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-sm px-4 py-3 sm:px-8 sm:py-6 text-sm sm:text-lg font-mono uppercase tracking-widest border-2 border-adhd-lavender text-adhd-lavender bg-transparent hover:bg-adhd-lavender/10 transition-colors"
            style={{ boxShadow: "4px 4px 0 var(--adhd-purple)" }}
            asChild
          >
            <a href="/about">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
              My Story
            </a>
          </Button>
        </div>

        {/* Feature tags — mono chips instead of pastel pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {["ADHD Friendly", "Open Source", "Student Built", "AI Powered"].map((label) => (
            <span
              key={label}
              className="px-3 py-1.5 bg-adhd-dark text-adhd-lavender text-xs font-mono uppercase tracking-wider border border-adhd-lavender/25 hover:border-magenta transition-colors cursor-default"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#projects" className="flex flex-col items-center gap-2 text-adhd-lavender/70 hover:text-magenta transition-colors">
          <span className="text-sm font-mono uppercase tracking-widest">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
