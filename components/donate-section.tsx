"use client"

import { useEffect, useState } from "react"
import { Heart, Zap, Star, Sparkles, Coffee } from "lucide-react"

const SMOKE_PARTICLES = [
  { left: '60%', size: 22, delay: 0,   duration: 700, anim: 'smoke-blow-left'     },
  { left: '75%', size: 26, delay: 210, duration: 830, anim: 'smoke-blow-left-far' },
  { left: '50%', size: 18, delay: 110, duration: 660, anim: 'smoke-blow-left'     },
  { left: '80%', size: 20, delay: 350, duration: 750, anim: 'smoke-blow-left-far' },
  { left: '65%', size: 16, delay: 470, duration: 600, anim: 'smoke-blow-left'     },
]

function SpinningWord() {
  const [spinning, setSpinning] = useState(false)
  const [canHover, setCanHover] = useState(false)
  useEffect(() => { setCanHover(window.matchMedia('(hover: hover)').matches) }, [])

  return (
    <span
      className="zine-highlight cursor-default"
      onMouseEnter={canHover ? () => setSpinning(true) : undefined}
      onMouseLeave={canHover ? () => setSpinning(false) : undefined}
      onClick={() => setSpinning(s => !s)}
    >
      {Array.from('Going').map((char, i) => (
        // Outer wrapper is static — anchors smoke to the "road"
        <span key={i} className="relative inline-block">
          {/* Only the letter spins */}
          <span style={{ display: 'inline-block', animation: spinning ? 'tire-spin 120ms linear infinite' : 'none' }}>
            {char}
          </span>
          {/* Smoke rises from the fixed baseline, not the spinning letter */}
          {spinning && SMOKE_PARTICLES.map((p, pi) => (
            <span
              key={pi}
              className="absolute pointer-events-none rounded-full"
              style={{
                bottom: '-6px',
                left: p.left,
                width:  p.size,
                height: p.size,
                background: 'color-mix(in srgb, var(--fg) 45%, transparent)',
                animation: `${p.anim} ${p.duration}ms ease-out infinite`,
                animationDelay: `${p.delay + i * 55}ms`,
              }}
            />
          ))}
        </span>
      ))}
    </span>
  )
}

const donationTiers = [
  {
    icon: Zap,
    title: "Keep the Lights On",
    amount: "$5/mo",
    description: "Chip in on the monthly bills: servers, domains, API calls — the invisible stuff that makes free tools possible.",
    tilt: "-0.8deg",
    tape: "var(--tape-1)",
    iconFill: "bg-accent",
  },
  {
    icon: Heart,
    title: "Fuel the Chaos",
    amount: "$10/mo",
    description: "Help keep the lights on AND fund new features and bug fixes. You're basically my QA department's salary. (I am also the QA department.)",
    tilt: "0.6deg",
    tape: "var(--tape-2)",
    iconFill: "bg-blue",
  },
  {
    icon: Star,
    title: "Chaos Patron",
    amount: "$25/mo",
    description: "You're keeping a real chunk of the ecosystem alive. You get my undying gratitude, a spot on a future supporters page, and the knowledge that you're funding tools built by spite and stubbornness.",
    tilt: "-0.4deg",
    tape: "var(--tape-3)",
    iconFill: "bg-eco-card",
  },
]

export function DonateSection() {
  return (
    <section id="donate" className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-6xl mx-auto border-t-2 border-fg pt-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-accent text-on-fill border-2 border-fg zine-mono text-xs tracking-[1.4px] px-3 py-1.5 -rotate-2 mb-6">
            <Sparkles className="w-4 h-4" aria-hidden />
            Support the Work
            <Sparkles className="w-4 h-4" aria-hidden />
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-[52px] tracking-[-1px] text-fg mb-6 leading-tight">
            Help Keep This <SpinningWord />
          </h2>
          <p className="max-w-[90vw] md:max-w-[55vw] mx-auto text-fg leading-relaxed">
            Everything I build is free — ControlledChaos, ChaosLimbă, Kindling, all of it.
            I'm a full-time college student who'd rather give my work away than gatekeep it behind a paywall. But servers cost money, domains cost money, and ramen can only sustain a person for so long.
            </p>
          <p className="max-w-[90vw] md:max-w-[55vw] mx-auto text-fg leading-relaxed mt-4">
            If anything I've built has helped you, even a small monthly membership goes further than you'd think — it goes toward the servers, domains, and API calls that keep it all free. But if a one-time tip is more your speed, the floating yellow 'Tip Me' button in the corner has you covered. No pressure, no paywall, no guilt — just gratitude.
          </p>
        </div>

        {/* Donation Tiers — taped like a raffle-ticket strip */}
        <div className="grid md:grid-cols-3 gap-x-6 gap-y-10 mb-12">
          {donationTiers.map((tier) => {
            const Icon = tier.icon
            return (
              <div
                key={tier.title}
                className="zine-card p-6 pt-8 flex flex-col gap-4"
                style={{ "--tilt": tier.tilt, "--tape": tier.tape } as React.CSSProperties}
              >
                <div className="zine-tape" />
                <div className={`w-12 h-12 border-2 border-fg ${tier.iconFill} text-on-fill flex items-center justify-center`}>
                  <Icon className="w-6 h-6" aria-hidden />
                </div>
                <div>
                  <p className="text-3xl font-display text-fg">{tier.amount}</p>
                  <h3 className="zine-mono text-sm tracking-[1.4px] text-fg mt-1">{tier.title}</h3>
                </div>
                <p className="text-sm text-fg leading-relaxed">{tier.description}</p>
              </div>
            )
          })}
        </div>

        {/* Single CTA */}
        <div className="text-center">
          <a
            href="https://ko-fi.com/adhdesigns/tiers"
            target="_blank"
            rel="noopener noreferrer"
            className="zine-shadow zine-mono text-sm tracking-[1.4px] bg-primary text-primary-foreground border-2 border-fg h-12 px-7 inline-flex items-center gap-2"
          >
            <Coffee className="w-5 h-5" aria-hidden />
            Support on Ko-fi
          </a>
        </div>
      </div>
    </section>
  )
}
