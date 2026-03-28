"use client"

import { useEffect, useState } from "react"
import { Heart, Sparkles, Brain, Coffee, Lightbulb, Zap } from "lucide-react"

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
          className="rounded-full bg-mustard/30 border-4 border-mustard overflow-hidden">
          <img src="/nae-profile.jpg" alt="Nae" className="w-full h-full object-cover object-top scale-110" />
        </div>
        {/* Back — SpaceNugg */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="rounded-full bg-adhd-purple/30 border-4 border-adhd-purple overflow-hidden">
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
      className="text-mustard cursor-default"
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
  { icon: Brain, label: "ADHD", color: "bg-mustard", textColor: "text-foreground" },
  { icon: Coffee, label: "Depression", color: "bg-teal", textColor: "text-purple" },
  { icon: Zap, label: "Tenacity", color: "bg-purple", textColor: "text-teal" },
  { icon: Lightbulb, label: "Innovation", color: "bg-accent", textColor: "text-card" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative">
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-amber) 40%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-sage) 35%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-purple) 25%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute top-1/4 left-5 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-green) 20%, transparent) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col gap-12 items-start">
          {/* Image/Visual Side - updated decorative colors */}
          <div className="w-full rounded-3xl glass-dark border border-teal/25 overflow-hidden relative shadow-2xl shadow-black/20">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-4 left-4 w-24 h-24 border-4 border-mustard rounded-full" />
                <div className="absolute top-20 right-8 w-16 h-16 bg-teal rounded-full" />
                <div className="absolute bottom-12 left-12 w-20 h-20 bg-purple rounded-lg rotate-12" />
                <div className="absolute bottom-20 right-20 w-12 h-12 bg-mustard rounded-full" />
              </div>

              {/* Main content */}
              <div className="relative flex flex-col justify-center p-8 items-center">
                <div className="mb-6">
                  <CoinFlipAvatar />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-teal text-center">
                  Lanae Drew
                </h3>
                <p className="text-teal/70 text-center">Full-Time Student</p>
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-teal text-center">
                  University of Delaware
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

            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-teal mb-6 leading-tight">
              Too much on my plate, making it <BalloonText />
            </h2>

            <div className="space-y-4 text-teal/80 leading-relaxed font-medium">
  <p>
    I build tools for brains that don't work the way traditional apps expect them to.
  </p>
  
  <p>
   My program development journey started because I got tired of being failed by productivity tools designed for people whose brains cooperate. Existing tools assume you’ll remember to check them, that starting tasks is easy, or that you always know what’s most important. My brain doesn't work like that.
  </p>
  
  <p>
    By no means am I a professional developer—the bulk of my coding experience consists of Y2K Neopets-level HTML. I use agentic tools like Claude Code, JetBrains, and Replit to bridge the gap as I learn, because spending three years mastering syntax before I can solve the problem I have today is my idea of a terrible return on investment. This approach is immediate, lets me iterate in real-time, and keeps me focused on solving actual problems instead of constantly fighting with semicolons.
  </p>

  <p>
    What I bring to the table is a combination of tenacity, pattern recognition, and insatiable curiosity that fuels an innovative approach to problem-solving. My unique perspective as someone who lives with ADHD and Depression dictates the premise upon which my apps are built. I strongly believe that technology can and should be designed to adapt to the individual needs of its users, rather than forcing users to adapt to the technology.
  </p>

  <p>
    Through hands-on experience with various tools and technologies, I have found and settled into my niche at the intersection of executive dysfunction and Artificial Intelligence. The programs I design are built to act as complements to brains that don't work the way traditional apps expect them to—aiding individuals who struggle with prioritizing tasks, structuring schedules, and deciding what to work on next. If professional developers aren't going to make tools that work with brains like mine, I'm going to make them myself.
  </p>

  <p>
    As I continue on my academic journey at the University of Delaware, I plan to incorporate my ever-growing base of Linguistic and Cognitive Neuroscience knowledge into my work. Personal experiments with Machine Learning will continue to inform my development of innovative tools and systems that synergize AI and ADHD. I expect this combined research to both reaffirm and challenge my current understanding of the intersection of ADHD and AI, enabling me to implement a more nuanced and balanced development process.
  </p>

  <p>
    Projects will move in and out of development as I learn, grow, fail, and succeed; some will be abandoned in favor of others, many will be nuked and rebuilt from scratch, a few will even be shelved indefinitely. My goal is not to build the Next Big Thing, but to explore the implications of working with Artificial Intelligence to create tools, and eventually systems, that adapt to individuals' neurological strengths and needs.
  </p>
</div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 glass rounded-xl border-2 border-teal/30">
                <Lightbulb className="w-8 h-8 text-teal mb-2" />
                <h4 className="font-bold text-lime mb-1">Built Different</h4>
                <p className="text-sm text-foreground/70">Unique solutions designed to work <span className="font-bold italic text-foreground/70">with</span> unique brains, not against them</p>
              </div>
              <div className="p-4 rounded-xl glass-accent border-2 border-accent/30">
                <Heart className="w-8 h-8 mb-2 text-accent" />
                <h4 className="font-bold mb-1 text-teal">Structured Chaos</h4>
                <p className="text-sm text-dark-teal">ADHD-AI synergy: the core of the development process</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
