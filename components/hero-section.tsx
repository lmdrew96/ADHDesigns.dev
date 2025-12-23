"use client"

import { ArrowDown, Zap, Brain, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      {/* Decorative shapes - updated to new color palette */}
      <div className="absolute top-32 left-10 w-24 h-24 rounded-full bg-mustard opacity-80 animate-float" />
      <div
        className="absolute top-48 right-16 w-20 h-20 rounded-full bg-teal opacity-70 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full bg-purple opacity-60 animate-float"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-dark-teal opacity-70 animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Tagline - updated colors */}
        

        {/* Main Headline - updated accent colors */}
        <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-foreground">
          <span className="whitespace-nowrap text-foreground">
            <span className="inline-block hover:animate-wiggle cursor-default text-muted">A</span>gentic
          </span>{" "}
          <span className="whitespace-nowrap text-foreground">
            <span className="inline-block hover:animate-wiggle cursor-default text-accent">D</span>evelopment
          </span>{" "}
          of{" "}
          <span className="whitespace-nowrap">
            <span className="inline-block hover:animate-wiggle cursor-default text-destructive">H</span>uman
          </span>{" "}
          <span className="whitespace-nowrap">
            <span className="inline-block hover:animate-wiggle cursor-default text-primary">D</span>esigns
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-teal max-w-3xl mx-auto mb-10 leading-relaxed">
          Apps built with chaos, designed with heart. Created by an amateur developer who believes the best tools come
          from understanding the beautiful mess of neurodivergent minds.
        </p>

        {/* CTA Buttons - updated button colors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            className="bg-mustard text-dark-teal hover:bg-mustard/90 rounded-full px-8 py-6 text-lg font-semibold group"
            asChild
          >
            <a href="#projects">
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
              Explore Projects
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-lg font-semibold border-2 border-teal text-teal hover:bg-teal hover:text-dark-teal bg-transparent"
            asChild
          >
            <a href="#about">
              <Brain className="w-5 h-5 mr-2" />
              My Story
            </a>
          </Button>
        </div>

        {/* Feature Pills - updated pill colors */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {["ADHD Friendly", "Student Built", "Open Source", "Language Learning", "AI Powered"].map((tag, i) => {
            const bgColors = ["bg-secondary", "bg-primary", "bg-accent", "bg-card", "bg-secondary"]
            const txtColors = ["text-card", "text-card", "text-card", "text-primary", "text-card"]
            return (
              <span
                key={tag}
                className={`px-4 py-2 ${bgColors[i]} ${txtColors[i]} rounded-full text-sm font-bold hover:scale-105 transition-transform cursor-default`}
              >
                {tag}
              </span>
            )
          })}
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
