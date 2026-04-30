"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InquiryForm } from "@/components/services/inquiry-form"
import type { Tier } from "@/lib/services-tiers"

export function ServiceTier({ tier }: { tier: Tier }) {
  const [open, setOpen] = useState(false)
  const formRegionId = `tier-form-${tier.id}`

  return (
    <article
      id={tier.id}
      className="rounded-3xl glass-dark shadow-2xl shadow-black/20 overflow-hidden scroll-mt-24"
    >
      <div className="p-8 sm:p-10 space-y-5">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-adhd-green/25 text-adhd-green border border-adhd-green/30 uppercase tracking-wide">
          {tier.badge}
        </span>

        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-adhd-lavender leading-tight">
          {tier.headline}
        </h2>

        <p className="text-adhd-sage font-semibold italic">{tier.pricing}</p>

        <p className="text-adhd-lavender/90 leading-relaxed font-medium">{tier.body}</p>

        {tier.caseStudyAnchor && (
          <p className="text-adhd-green text-sm leading-relaxed border-l-4 border-adhd-green/40 pl-4">
            {tier.caseStudyAnchor}
          </p>
        )}

        <div className="pt-2">
          <Button
            size="lg"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={formRegionId}
            className="rounded-full px-7 font-bold gap-2 bg-adhd-sage/35 text-adhd-sage border border-adhd-sage hover:bg-adhd-sage/70 hover:text-adhd-dark transition-colors duration-300"
          >
            {open ? "Close" : tier.ctaLabel}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              aria-hidden
            />
          </Button>
        </div>
      </div>

      <div
        id={formRegionId}
        hidden={!open}
        className="bg-adhd-dark/60 border-t-2 border-adhd-sage/20 px-8 sm:px-10 py-8"
      >
        {open && <InquiryForm tier={tier} />}
      </div>
    </article>
  )
}
