"use client"

import { ArrowDown, Brain, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden bg-background">
      {/* Decorative blobs - large and blurred for glassmorphism backdrop */}
      <div className="absolute top-20 left-5 w-48 h-48 rounded-full bg-mustard/50 blur-2xl animate-float" />
      <div
        className="absolute top-32 right-10 w-56 h-56 rounded-full bg-teal/40 blur-2xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-24 left-1/4 w-40 h-40 rounded-full bg-purple/40 blur-2xl animate-float"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-36 h-36 rounded-full bg-dark-teal/50 blur-2xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-1/3 right-1/6 w-44 h-44 rounded-full bg-accent/30 blur-2xl animate-float"
        style={{ animationDelay: "2s" }}
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
          Apps built with chaos, designed with purpose. Created by a neurodivergent designer who believes the best tools come from understanding the beautiful mess of neurodivergent minds.
        </p>

        {/* CTA Buttons - updated button colors */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          <Button
            size="lg"
            className="bg-mustard text-dark-teal hover:bg-mustard/90 rounded-full px-4 py-3 sm:px-8 sm:py-6 text-sm sm:text-lg font-semibold group"
            asChild
          >
            <a href="#projects">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 group-hover:animate-spin" />
              Explore Projects
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-4 py-3 sm:px-8 sm:py-6 text-sm sm:text-lg font-semibold border border-teal/40 text-teal hover:bg-teal hover:text-dark-teal bg-white/5 backdrop-blur-md shadow-lg shadow-teal/10"
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
          {["ADHD Friendly", "Student Built", "Open Source", "Language Learning", "AI Powered"].map((tag, i) => {
            const bgColors = ["bg-secondary", "bg-primary", "bg-accent", "bg-card", "bg-secondary"]
            const txtColors = ["text-card", "text-card", "text-card", "text-primary", "text-card"]
            return (
              <span
                key={tag}
                className={`px-4 py-2 ${bgColors[i]}/40 ${txtColors[i]} rounded-full text-sm font-bold hover:scale-105 transition-transform cursor-default backdrop-blur-xl border border-white/20 shadow-lg shadow-black/10`}
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
