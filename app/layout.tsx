import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Fraunces, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { KofiWidget } from "@/components/kofi-widget"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://adhdesigns.dev"),
  title: "ADHD: Agentic Development of Human Designs",
  description:
    "Apps created by a neurodivergent designer for fellow neurodivergents. ControlledChaos, ChaosLimbă, ScribeCat, & more! 💜",
  generator: 'v0.app',
  icons: {
    icon: '/vertexism_favicon_128.png',
    apple: '/vertexism_favicon_128.png',
  },
  openGraph: {
    title: "ADHD: Agentic Development of Human Designs",
    description:
      "Apps created by a neurodivergent designer for fellow neurodivergents. ControlledChaos, ChaosLimbă, ScribeCat, & more! 💜",
    url: "https://adhdesigns.dev",
    siteName: "ADHD Designs",
    images: [{ url: "/homepage.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADHD: Agentic Development of Human Designs",
    description:
      "Apps created by a neurodivergent designer for fellow neurodivergents. ControlledChaos, ChaosLimbă, ScribeCat, & more! 💜",
    images: ["/homepage.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#DFA649",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${fraunces.variable}`}>
        {children}
        <Analytics />
        <KofiWidget />
      </body>
    </html>
  )
}
