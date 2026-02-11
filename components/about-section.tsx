"use client"

import { Heart, Sparkles, Brain, Coffee, Lightbulb, Bolt, Zap } from "lucide-react"

const struggles = [
  { icon: Brain, label: "ADHD", color: "bg-mustard", textColor: "text-foreground" },
  { icon: Coffee, label: "Depression", color: "bg-teal", textColor: "text-purple" },
  { icon: Zap, label: "Tenacity", color: "bg-purple", textColor: "text-teal" },
  { icon: Lightbulb, label: "Innovation", color: "bg-accent", textColor: "text-card" },
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
            <span className="inline-flex items-center gap-2 px-4 py-2 text-dark-teal rounded-full text-sm font-bold mb-6 bg-foreground text-card">
              <Sparkles className="w-4 h-4" />
              The Human Behind the Code
            </span>

            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-teal mb-6 leading-tight">
              Too much on my plate, <span className="text-mustard">making it work anyway</span>
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
              <div className="p-4 bg-teal/20 rounded-xl border-2 border-teal">
                <Lightbulb className="w-8 h-8 text-teal mb-2" />
                <h4 className="font-bold text-lime mb-1">Built Different</h4>
                <p className="text-sm text-foreground/70">Unique solutions designed to work <span className="font-bold italic text-foreground/70">with</span> unique brains, not against them</p>
              </div>
              <div className="p-4 rounded-xl border-2 border-accent opacity-100 bg-[rgba(183,199,177,0.34604206526958803)]">
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
