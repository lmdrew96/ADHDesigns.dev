import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, Gluten, IBM_Plex_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { KofiWidget } from "@/components/kofi-widget"
import "./globals.css"

// latin-ext covers Romanian diacritics (ă, ț, ș) in headings and body
const gluten = Gluten({ subsets: ["latin", "latin-ext"], weight: "800", variable: "--font-gluten" })
const dmSans = DM_Sans({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "700"], variable: "--font-dm-sans" })
const plexMono = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], weight: ["500", "600"], variable: "--font-plex-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://adhdesigns.dev"),
  title: "ADHD: Agentic Development of Human Designs",
  description:
    "Apps created by a neurodivergent designer for fellow neurodivergents. ControlledChaos, ChaosLimbă, ScribeCat, & more! 💜",
  icons: {
    icon: '/vertexism_favicon_128.png',
    apple: '/vertexism_favicon_128.png',
  },
  openGraph: {
    title: "ADHD: Agentic Development of Human Designs",
    description:
      "Apps created by a neurodivergent designer for fellow neurodivergents. ControlledChaos, ChaosLimbă, ScribeCat, & more! 💜",
    url: "https://adhdesigns.dev",
    siteName: "ADHDesigns",
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
  // Literal required here (no CSS vars in meta tags): dark theme --bg, the default
  themeColor: "#141A2E",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${gluten.variable} ${dmSans.variable} ${plexMono.variable}`}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <KofiWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
