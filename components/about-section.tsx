"use client"

import { Heart, GraduationCap, Sparkles, Brain, Coffee, Lightbulb } from "lucide-react"

const struggles = [
  { icon: Brain, label: "ADHD", color: "bg-mustard", textColor: "text-burgundy" },
  { icon: Heart, label: "Bipolar Disorder", color: "bg-purple", textColor: "text-teal" },
  { icon: Coffee, label: "Depression", color: "bg-teal", textColor: "text-burgundy" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-mustard/40 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-teal/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-purple/20 blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Visual Side - updated decorative colors */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-dark-teal border-4 border-purple overflow-hidden relative">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-4 left-4 w-24 h-24 border-4 border-mustard rounded-full" />
                <div className="absolute top-20 right-8 w-16 h-16 bg-teal rounded-full" />
                <div className="absolute bottom-12 left-12 w-20 h-20 bg-purple rounded-lg rotate-12" />
                <div className="absolute bottom-20 right-20 w-12 h-12 bg-mustard rounded-full" />
              </div>

              {/* Main content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="w-36 h-36 rounded-full bg-mustard/30 border-4 border-mustard flex items-center justify-center mb-6 overflow-hidden">
                  <img 
                    src="/nae-profile.jpg" 
                    alt="Nae - Developer" 
                    className="w-full h-full object-cover object-top scale-110"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-teal text-center">
                  University of Delaware
                </h3>
                <p className="text-teal/70 text-center">Full-Time Student</p>

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
          </div>

          {/* Content Side - updated text/accent colors */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal text-burgundy rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              The Human Behind the Code
            </span>

            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-teal mb-6 leading-tight">
              Too Much on My Plate, <span className="text-mustard">Never Backing Down</span>
            </h2>

            <div className="space-y-4 text-teal/80 leading-relaxed">
              <p>
                {`I'm a full-time college student at the University of Delaware who lives with ADHD, 
                Bipolar Disorder, and Depression. These aren't just labels—they're part of my daily 
                reality that shapes how I think, work, and create.`}
              </p>
              <p>
                {`Instead of letting these challenges hold me back, I channel them into building tools 
                that actually work for brains like mine. Every app I create comes from personal 
                experience—from the frustration of traditional tools that don't fit neurodivergent 
                minds.`}
              </p>
              <p>
                {`I'm not a professional developer, and that's kind of the point. I'm just someone 
                who needed better tools and decided to make them myself. If they help even one 
                other person manage their chaos, it's all worth it.`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-mustard/20 rounded-xl border-2 border-mustard">
                <Lightbulb className="w-8 h-8 text-mustard mb-2" />
                <h4 className="font-bold text-teal mb-1">Built Different</h4>
                <p className="text-sm text-teal/70">Apps that embrace how your brain actually works</p>
              </div>
              <div className="p-4 bg-purple/20 rounded-xl border-2 border-purple">
                <Heart className="w-8 h-8 text-purple mb-2" />
                <h4 className="font-bold text-teal mb-1">Made with Heart</h4>
                <p className="text-sm text-teal/70">Every feature solves a real struggle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
