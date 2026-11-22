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
          className="rounded-full bg-accent border-2 border-fg overflow-hidden">
          <img src="/nae-profile.jpg" alt="Nae" className="w-full h-full object-cover object-top scale-110" />
        </div>
        {/* Back — SpaceNugg */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="rounded-full bg-blue border-2 border-fg overflow-hidden">
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
      className="cursor-default"
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
                  className="zine-highlight px-0"
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
  { icon: Brain, label: "ADHD", fill: "bg-accent" },
  { icon: Coffee, label: "Depression", fill: "bg-blue" },
  { icon: Zap, label: "Tenacity", fill: "bg-blue-pale" },
  { icon: Lightbulb, label: "Innovation", fill: "bg-eco-card" },
]

export function AboutSection() {
  return (
    <section id="about" className="pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-14 items-start">
          {/* Profile card */}
          <div className="zine-card w-full" style={{ "--tilt": "-0.4deg", "--tape": "var(--tape-1)" } as React.CSSProperties}>
            <div className="zine-tape left-1/2 -translate-x-1/2" />
            <div className="flex flex-col justify-center p-8 pt-10 items-center">
              <div className="mb-6">
                <CoinFlipAvatar />
              </div>
              <h3 className="font-display text-3xl text-fg text-center">
                {ABOUT_CARD.name}
              </h3>
              <p className="text-fg-muted text-center">{ABOUT_CARD.role}</p>
              <p className="font-display text-2xl text-fg text-center">
                {ABOUT_CARD.school}
              </p>

              {/* Struggle badges */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {struggles.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className={`flex items-center gap-2 px-3 py-1.5 border-2 border-fg text-on-fill ${item.fill}`}>
                      <Icon className="w-4 h-4" aria-hidden />
                      <span className="zine-mono text-xs tracking-[1px]">{item.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-flex items-center gap-2 bg-accent text-on-fill border-2 border-fg zine-mono text-xs tracking-[1.4px] px-3 py-1.5 -rotate-2 mb-6">
              <Sparkles className="w-4 h-4" aria-hidden />
              The Human Behind the Code
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-[52px] tracking-[-1px] text-fg mb-6 leading-tight">
              Too much on my plate, making it <BalloonText />
            </h2>

            <div className="space-y-4 text-fg leading-relaxed text-lg">
              {ABOUT_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              <div className="p-5 bg-card border-2 border-fg">
                <Lightbulb className="w-7 h-7 text-fg mb-2" aria-hidden />
                <h4 className="font-display text-xl text-fg mb-1">Built Different</h4>
                <p className="text-sm text-fg">Unique solutions designed to work <span className="font-bold italic">with</span> unique brains, not against them</p>
              </div>
              <div className="p-5 bg-card border-2 border-fg">
                <Heart className="w-7 h-7 text-fg mb-2" aria-hidden />
                <h4 className="font-display text-xl text-fg mb-1">Structured Chaos</h4>
                <p className="text-sm text-fg">ADHD-AI synergy: the core of the development process</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
