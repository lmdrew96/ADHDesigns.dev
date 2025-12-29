"use client"

import { Heart, Sparkles, Brain, Coffee, Lightbulb } from "lucide-react"

const struggles = [
  { icon: Brain, label: "ADHD", color: "bg-mustard", textColor: "text-olive" },
  { icon: Heart, label: "Bipolar Disorder", color: "bg-purple", textColor: "text-teal" },
  { icon: Coffee, label: "Depression", color: "bg-teal", textColor: "text-olive" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative">
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-mustard/40 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-teal/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-purple/20 blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image/Visual Side - updated decorative colors */}
          <div className="md:sticky md:top-24 rounded-3xl bg-dark-teal border-4 border-purple overflow-hidden relative">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-4 left-4 w-24 h-24 border-4 border-mustard rounded-full" />
                <div className="absolute top-20 right-8 w-16 h-16 bg-teal rounded-full" />
                <div className="absolute bottom-12 left-12 w-20 h-20 bg-purple rounded-lg rotate-12" />
                <div className="absolute bottom-20 right-20 w-12 h-12 bg-mustard rounded-full" />
              </div>

              {/* Main content */}
              <div className="relative flex flex-col justify-center p-8 items-center">
                <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full bg-mustard/30 border-4 border-mustard flex items-center justify-center mb-6 overflow-hidden shrink-0">
                  <img
                    src="/nae-profile.jpg"
                    alt="Nae - Developer"
                    className="w-full h-full object-cover object-top scale-110"
                  />
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
                      <div key={item.label} className={`flex items-center gap-2 px-3 py-2 ${item.color} rounded-full`}>
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
            <span className="inline-flex items-center gap-2 px-4 py-2 text-olive rounded-full text-sm font-bold mb-6 bg-foreground text-card">
              <Sparkles className="w-4 h-4" />
              The Human Behind the Code
            </span>

            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-teal mb-6 leading-tight">
              Too much on my plate, <span className="text-mustard">making it work anyway</span>
            </h2>

            <div className="space-y-4 text-teal/80 leading-relaxed font-medium">
  <p>
    I build productivity tools for brains that don't work the way traditional apps expect them to.
  </p>
  
  <p>
    I have ADHD, Bipolar Disorder, and Depression. Every app I've built exists because I got tired of productivity tools designed for people whose brains cooperate. Apps that assume you'll remember to check them. That starting tasks is the easy part. That you can just pick what's most important and do it.
  </p>
  
  <p>
    My brain doesn't work like that. Yours might not either.
  </p>
  
  <p>I'm very much an “if you want it done right, do it yourself” person. Are my apps perfect? No. Are they better than what they're replacing? Not necessarily. But they work better for me—they solve my specific problems with price, UI, UX, missing features, or plain incompatibility with executive dysfunction. Besides, building them is fun—my brain craves that blend of creativity and perfectionism.
  </p>
  
  <p>
    I am by no means a professional developer—my coding experience consists of Y2K Neopets-level HTML. I use agentic tools like Claude Code and v0, because learning syntax for three years before I can solve today's problem is my idea of a terrible return on investment. (And there's no way in hell I'm taking all those math classes, are you kidding me?) This approach is immediate, lets me iterate in real-time, and keeps me focused on solving actual problems instead of constantly fighting with semicolons.
  </p>

  <p> 
    You can label it ‘vibe coding,’ I don't mind the dig. Do not think, however, that my apps are just slapped together with a couple of prompts. An ungodly amount of my waking hours is spent iterating and reiterating, problem-solving, and learning as I go. My hyperfocus is my superpower, and I've got the commit history to prove it.
  </p>

  <p>
    My apps handle the executive function stuff—prioritizing tasks, structuring study time, deciding what to work on next. The stuff that's supposed to be automatic but isn't. If professional developers aren't going to make tools that work with my brain, I'm going to make them myself.
  </p>
  
  <p>
    If these tools help others who think like me, excellent. But I'm building them either way because I need them to exist.
  </p>
</div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-mustard/20 rounded-xl border-2 border-mustard">
                <Lightbulb className="w-8 h-8 text-mustard mb-2" />
                <h4 className="font-bold text-teal mb-1">Built Different</h4>
                <p className="text-sm text-teal/70">Apps that embrace how your brain actually works</p>
              </div>
              <div className="p-4 rounded-xl border-2 border-accent opacity-100 bg-[rgba(183,199,177,0.34604206526958803)]">
                <Heart className="w-8 h-8 mb-2 text-accent" />
                <h4 className="font-bold mb-1 text-foreground">Made with Care</h4>
                <p className="text-sm text-sidebar-foreground">Every feature solves a real struggle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
