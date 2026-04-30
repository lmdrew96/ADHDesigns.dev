# ADHDesigns Services Page — Copy Doc

> **Route:** `/services` (or `/hire`)
> **ChaosPatch:** `618ca0e0` · ADHDesigns Portfolio · Priority: High
> **Brand tokens:** Use ADHDesigns color palette + typography from adhdesigns.dev

---

## Page Headline

**Software that works the way your brain does.**

## Page Intro

I'm a neurodivergent developer building tools for neurodivergent people. Not accessibility as an afterthought — as the architecture. If your product serves humans, it should work for all of them.

---

## Tier 1: ND Web App Development

**Headline:** Software that works the way your brain does.

**Pricing:** *Starting at $1,500 · Introductory rate · Scoped per project*

**Body:**

Most software is built by neurotypical teams using neurotypical assumptions about how people focus, decide, and get things done. Then someone adds a dark mode and calls it accessible. I build web apps from the ground up for neurodivergent users — not as an accommodation layer, but as the actual architecture. Information hierarchy that reduces decision fatigue. Flexible workflows that don't punish nonlinear thinking. Interfaces that respect sensory needs and cognitive load as first-class design constraints. Full-stack TypeScript and React, shipped to production.

**Case study anchors:** ControlledChaos (ADHD task management with AI recommendations and crisis mode), ScribeCat (ADHD-friendly lecture companion), the full ADHDesigns ecosystem.

**CTA Form Fields:**
- Name
- Email
- Project description
- Target users
- Timeline
- Budget range

---

## Tier 2: AI Integration & MCP Development

**Headline:** Give your product a conversation with AI.

**Pricing:** *Starting at $800 · Introductory rate · Scoped per project*

**Body:**

The Model Context Protocol is how AI assistants like Claude connect to the tools people actually use — and most products don't have that bridge yet. I build the infrastructure that gets your app into the hands of AI: custom MCP servers, tool APIs, auth flows, and the data layer that makes it all work. If your users are already asking "can I use this with Claude?" the answer should be yes.

**Case study anchors:** Five production MCP servers built and deployed across the ADHDesigns ecosystem — task management, language learning, dev tooling, personal context, and patch tracking.

**CTA Form Fields:**
- Name
- Email
- Product/app name
- AI assistants to integrate with
- Existing tech stack

---

## Tier 3: ND Design Consulting

**Headline:** Your app isn't broken. It just wasn't built for everyone.

**Pricing:** *Starting at $300 · Introductory rate · Scoped per audit*

**Body:**

I audit existing products through a neurodivergent-centered lens — not just WCAG compliance checklists, but the stuff that actually makes or breaks the experience. Where does your UI create unnecessary decisions? Where does your onboarding assume linear processing? Where are you overwhelming instead of informing? You get a prioritized, actionable report — what's hostile, what's close, and what to fix first. No 40-page PDF you'll never read.

**CTA Form Fields:**
- Name
- Email
- Product URL or description
- Specific areas of concern
- Timeline

---

## Footer Note (all tiers)

*Flexible rates available for independent creators, nonprofits, and neurodivergent-led projects.*

---

## Implementation Notes for Cody

- Each tier is a card/section with its own CTA button that opens a form (modal or inline expand)
- Use ADHDesigns brand tokens: Mauve Purple #88739E, Deep Teal #244952, Amber #DFA649, Sage Teal #8CBDB9, Soft Green #97D181, Lavender Mist #DBD5E2, Off White #F7F5FA, Deep Dark #1E1830
- Forms should submit via email or a simple backend endpoint (Nae to decide)
- Mobile-first responsive layout
- Case study anchors should link to the relevant project pages on adhdesigns.dev
- After 3-5 completed client projects, update pricing to full rates ($3,000+ / $1,500+ / $500+)
