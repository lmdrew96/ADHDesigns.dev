"use client"

import { useEffect, useState } from "react"
import { Heart, Sparkles, Brain, Coffee, Lightbulb, Zap } from "lucide-react"
import { ABOUT_CARD, ABOUT_PARAGRAPHS } from "@/lib/about"

const BALLOON_WORD = "work anyway"

// Letters flung in every direction — visible flailing arc, then gone
function burstVector(i: number) {
  const angle    = (i / BALLOON_WORD.length) * Math.PI * 2 + Math.sin(i * 5.3 + 1.7) * 1.5
  const dist     = Math.round(450 + Math.abs(Math.sin(i * 4.1 + 0.9)) * 350)
  const rot      = Math.round((Math.sin(i * 7.7 + 3.1) > 0 ? 1 : -1) * (1080 + Math.abs(Math.sin(i * 3.3)) * 1800))
  const duration = Math.round(650 + Math.abs(Math.sin(i * 6.2 + 2.1)) * 400)
  return { dx: Math.round(Math.cos(angle) * dist), dy: Math.round(Math.sin(angle) * dist), rot, duration }
}

function CoinFlipAvatar() {
  const [flipped, setFlipped] = useState(false)
  const [canHover, setCanHover] = useState(false)
  useEffect(() => { setCanHover(window.matchMedia('(hover: hover)').matches) }, [])

  return (
    <div
      className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 shrink-0 cursor-pointer"
      style={{ perspective: '700px' }}
      onMouseEnter={canHover ? () => setFlipped(true) : undefined}
      onMouseLeave={canHover ? () => setFlipped(false) : undefined}
      onClick={!canHover ? () => setFlipped(f => !f) : undefined}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.65s cubic-bezier(.4,0,.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* Front — profile photo */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}
          className="rounded-full bg-caution-amber/30 border-4 border-caution-amber overflow-hidden">
          <img src="/nae-profile.jpg" alt="Nae" className="w-full h-full object-cover object-top scale-110" />
        </div>
        {/* Back — SpaceNugg */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="rounded-full bg-muted-indigo/30 border-4 border-muted-indigo overflow-hidden">
          <img src="/SpaceNugg.png" alt="Space Nugg" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}

function BalloonText() {
  const [burst, setBurst] = useState(false)
  const [canHover, setCanHover] = useState(false)
  useEffect(() => { setCanHover(window.matchMedia('(hover: hover)').matches) }, [])

  return (
    <span
      className="text-caution-amber cursor-default"
      onMouseEnter={canHover ? () => setBurst(true) : undefined}
      onMouseLeave={canHover ? () => setBurst(false) : undefined}
    >
      {BALLOON_WORD.split(' ').map((word, wi, words) => {
        const charOffset = words.slice(0, wi).reduce((n, w) => n + w.length + 1, 0)
        return (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {Array.from(word).map((char, j) => {
              const i = charOffset + j
              const { dx, dy, rot, duration } = burstVector(i)
              return (
                <span
                  key={j}
                  style={{
                    display: 'inline-block',
                    transition: burst ? `transform ${duration}ms cubic-bezier(.15,.5,.3,1)` : 'transform 220ms ease',
                    transform: burst
                      ? `translate(${dx}px, ${dy}px) scale(3) rotate(${rot}deg)`
                      : 'translate(0,0) scale(1) rotate(0deg)',
                  }}
                >{char}</span>
              )
            })}
            {wi < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
          </span>
        )
      })}
    </span>
  )
}

const struggles = [
  { icon: Brain, label: "ADHD", color: "bg-caution-amber", textColor: "text-foreground" },
  { icon: Coffee, label: "Depression", color: "bg-dusty-cyan", textColor: "text-muted-indigo" },
  { icon: Zap, label: "Tenacity", color: "bg-muted-indigo", textColor: "text-dusty-cyan" },
  { icon: Lightbulb, label: "Innovation", color: "bg-accent", textColor: "text-card" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative">
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--caution-amber) 40%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--dusty-cyan) 35%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--muted-indigo) 25%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute top-1/4 left-5 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--sage-green) 20%, transparent) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col gap-12 items-start">
          {/* Image/Visual Side - updated decorative colors */}
          <div className="w-full rounded-3xl glass-dark border border-dusty-cyan/25 overflow-hidden relative shadow-2xl shadow-black/20">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-4 left-4 w-24 h-24 border-4 border-caution-amber rounded-full" />
                <div className="absolute top-20 right-8 w-16 h-16 bg-dusty-cyan rounded-full" />
                <div className="absolute bottom-12 left-12 w-20 h-20 bg-muted-indigo rounded-lg rotate-12" />
                <div className="absolute bottom-20 right-20 w-12 h-12 bg-caution-amber rounded-full" />
              </div>

              {/* Main content */}
              <div className="relative flex flex-col justify-center p-8 items-center">
                <div className="mb-6">
                  <CoinFlipAvatar />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-dusty-cyan text-center">
                  {ABOUT_CARD.name}
                </h3>
                <p className="text-dusty-cyan/70 text-center">{ABOUT_CARD.role}</p>
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-dusty-cyan text-center">
                  {ABOUT_CARD.school}
                </p>

                {/* Struggle badges */}
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {struggles.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className={`flex items-center gap-2 px-3 py-2 ${item.color} rounded-full backdrop-blur-md border border-white/15`}>
                        <Icon className={`w-4 h-4 ${item.textColor}`} />
                        <span className={`text-sm font-bold ${item.textColor}`}>{item.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
          </div>

          {/* Content Side - updated text/accent colors */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 glass text-card">
              <Sparkles className="w-4 h-4" />
              The Human Behind the Code
            </span>

            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-dusty-cyan mb-6 leading-tight">
              Too much on my plate, making it <BalloonText />
            </h2>

            <div className="space-y-4 text-bone leading-relaxed font-medium">
              {ABOUT_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 glass-dark rounded-xl">
                <Lightbulb className="w-8 h-8 text-caution-amber mb-2" />
                <h4 className="font-bold text-sage-green mb-1">Built Different</h4>
                <p className="text-sm text-lavender">Unique solutions designed to work <span className="font-bold italic">with</span> unique brains, not against them</p>
              </div>
              <div className="p-4 rounded-xl glass-dark">
                <Heart className="w-8 h-8 mb-2 text-dusty-cyan" />
                <h4 className="font-bold mb-1 text-sage-green">Structured Chaos</h4>
                <p className="text-sm text-bone">ADHD-AI synergy: the core of the development process</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
