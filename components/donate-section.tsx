"use client"

import { useEffect, useState } from "react"
import { Heart, Zap, Star, Sparkles, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"

const SMOKE_PARTICLES = [
  { left: '10%', size: 20, delay: 0,   duration: 700, anim: 'smoke-left'  },
  { left: '35%', size: 24, delay: 220, duration: 820, anim: 'smoke-rise'  },
  { left: '55%', size: 18, delay: 110, duration: 660, anim: 'smoke-right' },
  { left: '75%', size: 22, delay: 340, duration: 760, anim: 'smoke-left'  },
  { left: '50%', size: 16, delay: 470, duration: 600, anim: 'smoke-rise'  },
]

function SpinningWord() {
  const [spinning, setSpinning] = useState(false)
  const [canHover, setCanHover] = useState(false)
  useEffect(() => { setCanHover(window.matchMedia('(hover: hover)').matches) }, [])

  return (
    <span
      className="text-mustard cursor-default"
      onMouseEnter={canHover ? () => setSpinning(true) : undefined}
      onMouseLeave={canHover ? () => setSpinning(false) : undefined}
      onClick={() => setSpinning(s => !s)}
    >
      {Array.from('Going').map((char, i) => (
        <span
          key={i}
          className="relative inline-block"
          style={{
            animation: spinning ? `tire-spin 120ms linear infinite` : 'none',
          }}
        >
          {char}
          {/* Smoke puffs — burn rubber! */}
          {spinning && SMOKE_PARTICLES.map((p, pi) => (
            <span
              key={pi}
              className="absolute pointer-events-none rounded-full"
              style={{
                bottom: '-6px',
                left: p.left,
                width:  p.size,
                height: p.size,
                background: 'rgba(70,70,70,0.5)',
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
    description: "Cover the cost of one user across the ADHDesigns ecosystem for a month. Servers, domains, API calls — the invisible stuff that makes free tools possible.",
    color: "bg-mustard",
    textColor: "text-olive",
    borderColor: "border-mustard/40",
  },
  {
    icon: Heart,
    title: "Fuel the Chaos",
    amount: "$10/mo",
    description: "Keep two users' worth of tools running AND help fund new features and bug fixes. You're basically my QA department's salary. (I am also the QA department.)",
    color: "bg-teal",
    textColor: "text-purple",
    borderColor: "border-teal/40",
  },
  {
    icon: Star,
    title: "Chaos Patron",
    amount: "$25/mo",
    description: "You're single-handedly keeping a chunk of the ecosystem alive. You get my undying gratitude, a spot on a future supporters page, and the knowledge that you're funding tools built by spite and stubbornness.",
    color: "bg-purple",
    textColor: "text-teal",
    borderColor: "border-purple/40",
  },
]

export function DonateSection() {
  return (
    <section id="donate" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-sage) 30%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-amber) 30%, transparent) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--adhd-purple) 20%, transparent) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 glass text-card">
            <Sparkles className="w-4 h-4" />
            Support the Work
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-teal mb-6 leading-tight">
            Help Keep This <SpinningWord />
          </h2>
          <p className="max-w-[90vw] md:max-w-[55vw] mx-auto text-teal/80 leading-relaxed font-medium">
            Everything I build is free — ChaosLimbă, ScribeCat, ThreadBrain, all of it.
            I'm a full-time college student who'd rather give my work away than gatekeep it behind a paywall. But servers cost money, domains cost money, and ramen can only sustain a person for so long.
            </p>
          <p className="max-w-[90vw] md:max-w-[55vw] mx-auto text-teal/80 leading-relaxed font-medium mt-4">
            If anything I've built has helped you, even a small monthly membership goes further than you'd think — $5 covers an entire user's server costs for a month. But if a one-time tip is more your speed, the floating yellow 'Tip Me' button in the corner has you covered. No pressure, no paywall, no guilt — just gratitude.
          </p>
        </div>

        {/* Donation Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {donationTiers.map((tier) => {
            const Icon = tier.icon
            return (
              <div
                key={tier.title}
                className={`relative p-6 glass rounded-3xl border-2 ${tier.borderColor} flex flex-col gap-4 transition-transform hover:-translate-y-1`}
              >
<div className={`w-12 h-12 rounded-2xl ${tier.color} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${tier.textColor}`} />
                </div>
                <div>
                  <p className="text-3xl font-bold font-[family-name:var(--font-display)] text-teal">{tier.amount}</p>
                  <h3 className="font-bold text-lg text-foreground mt-1">{tier.title}</h3>
                </div>
                <p className="text-sm text-teal/90 leading-relaxed font-semibold">{tier.description}</p>
              </div>
            )
          })}
        </div>

        {/* Single CTA */}
        <div className="text-center">
          <Button
            size="lg"
            asChild
            className="bg-adhd-amber text-adhd-dark hover:bg-adhd-amber/90 rounded-full px-10 py-6 text-lg font-bold shadow-lg shadow-adhd-amber/20"
          >
            <a href="https://ko-fi.com/adhdesigns/tiers" target="_blank" rel="noopener noreferrer">
              <Coffee className="w-5 h-5 mr-2" />
              Support on Ko-fi
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
