import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Fraunces, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ADHD: Agentic Development of Human Designs",
  description:
    "Apps designed by a neurodivergent developer for fellow neurodivergents. ScribeCat, ChaosLingua, ControlledChaos & D&D Tools.",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#D97706",
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
      </body>
    </html>
  )
}
