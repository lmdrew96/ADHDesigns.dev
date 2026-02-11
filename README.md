# ADHD: Agentic Development of Human Designs

> **Apps built with chaos, designed with purpose.**

A portfolio of tools and applications created by a neurodivergent designer for fellow neurodivergents. This isn't your average dev portfolio — it's a living showcase of what happens when ADHD meets AI meets an unhealthy amount of determination.

[![Live Site](https://img.shields.io/badge/Live_Site-adhdesigns.dev-DEA549?style=for-the-badge)](https://v0-adhd-friendly-portfolio.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-lmdrew96-244952?style=for-the-badge&logo=github)](https://github.com/lmdrew96)
[![Built with Next.js](https://img.shields.io/badge/Next.js-16-8CBDB9?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/hen-and-ink/v0-adhd-friendly-portfolio)

---

## What Is This?

This is the source code for **ADHD: Agentic Development of Human Designs** — Lanae Drew's portfolio site. It showcases a collection of projects that all share one philosophy:

**Technology should adapt to users, not the other way around.**

Every project here was born from personal experience — the frustration of tools that don't work for brains that work differently, and the stubborn refusal to accept "that's just how it is."

---

## Featured Projects

| Project                                                            | Description                                                               | Status         |
|--------------------------------------------------------------------|---------------------------------------------------------------------------|----------------|
| **[ChaosLimba](https://chaoslimba.adhdesigns.dev/)**               | Romanian language learning through structured chaos                       | Active Chaos   |
| **[ScribeCat](https://github.com/lmdrew96/ScribeCat-v2/releases)** | AI lecture transcription turned into flashcards, quizzes, and study tools | Sporadic Chaos |
| **[ControlledChaos](https://controlledchaos.adhdesigns.dev/)**     | AI-powered "What Now?" task manager that replaces your executive function | Chaos Paused   |
| **[FeyForge](https://feyforge.adhdesigns.dev)**                    | All-in-one D&D toolkit with an AI DM assistant                            | Chaos Paused   |
| **[ChickenScratch](https://chickenscratch.me)**                    | Student-run zine submission portal for Hen & Ink Society                  | Live Chaos     |

---

## Tech Stack

This site is built with modern, cutting-edge tools because if we're going to build things, we might as well build them with the shiny stuff.

**Core**
- [Next.js 16](https://nextjs.org) — App Router, React Server Components
- [React 19](https://react.dev) — The latest and greatest
- [TypeScript 5](https://www.typescriptlang.org) — Strict mode, because chaos needs guardrails

**Styling & UI**
- [Tailwind CSS 4](https://tailwindcss.com) — Utility-first with a custom color palette
- [Shadcn/ui](https://ui.shadcn.com) — Accessible component primitives (Radix UI under the hood)
- [Lucide React](https://lucide.dev) — Clean, consistent icons
- Custom animations — Wiggling letters, floating shapes, because *vibes*

**Typography**
- **Space Grotesk** — Body text
- **Fraunces** — Display headers
- **Geist Mono** — Monospace accents

**Deployment & Analytics**
- [Vercel](https://vercel.com) — Hosting & CI/CD
- [Vercel Analytics](https://vercel.com/analytics) — Performance tracking

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Purple | `#88739E` | Primary, backgrounds |
| Mustard | `#DEA549` | CTAs, accents, the "click me" energy |
| Teal | `#8CBDB9` | Text accents, tertiary elements |
| Pale Lavender | `#DBD5E2` | Foreground, light surfaces |
| Dark Teal | `#244952` | Cards, deep backgrounds |
| Lime | `#96D080` | Accent pops |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18+)
- [pnpm](https://pnpm.io) (package manager)

### Installation

```bash
# Clone the repo
git clone https://github.com/lmdrew96/ADHD-AgenticDevHumanDesigns.git

# Navigate into the project
cd ADHD-AgenticDevHumanDesigns

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and you're in.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
ADHD-AgenticDevHumanDesigns/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Homepage — assembles all sections
│   └── globals.css         # Theme variables, custom animations
├── components/
│   ├── ui/                 # Shadcn base components
│   ├── navigation.tsx      # Header nav + mobile menu
│   ├── hero-section.tsx    # Landing section with animated elements
│   ├── projects-section.tsx # Expandable project cards
│   ├── about-section.tsx   # Bio, story, values
│   └── footer.tsx          # Contact CTA + social links
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
├── public/                 # Static assets, favicons
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
└── components.json         # Shadcn CLI configuration
```

---

## Deployment

This project auto-deploys to [Vercel](https://vercel.com) on every push to `main`. No manual steps needed — push it and forget it (the ADHD way).

The site is also synced with [v0.app](https://v0.app) for rapid prototyping and iteration.

---

## Contributing

This is a personal portfolio, but if you spot a bug, have an accessibility improvement, or just want to say hi:

1. Fork it
2. Create your branch (`git checkout -b fix/something-cool`)
3. Commit your changes
4. Push to your branch
5. Open a PR

Or just [open an issue](https://github.com/lmdrew96/ADHD-AgenticDevHumanDesigns/issues) — no pressure.

---

## About the Creator

**Lanae Drew** — University of Delaware student studying Linguistics and Cognitive Neuroscience. Neurodivergent developer who uses agentic tools (Claude Code, Replit, JetBrains, etc.) to bridge learning gaps and build things that actually work for brains like hers.

- GitHub: [@lmdrew96](https://github.com/lmdrew96)
- Email: [nae@adhdesigns.dev](mailto:nae@adhdesigns.dev)

---

<p align="center">
  <strong>Made with tenacity by a chaotic mind.</strong><br>
  <sub>ADHD Friendly | Student Built | Open Source | AI Powered</sub>
</p>