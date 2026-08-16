import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { KofiWidget } from "@/components/kofi-widget"
import "./globals.css"

const raelaGrotesque = localFont({
  variable: "--font-raela",
  src: [
    { path: "../branding/fonts/RaelaGrotesqueThin-ovpea.ttf", weight: "100", style: "normal" },
    { path: "../branding/fonts/RaelaGrotesqueExtraLight-4nYxx.ttf", weight: "200", style: "normal" },
    { path: "../branding/fonts/RaelaGrotesqueLight-0v1ER.ttf", weight: "300", style: "normal" },
    { path: "../branding/fonts/RaelaGrotesqueRegular-e9476.ttf", weight: "400", style: "normal" },
    { path: "../branding/fonts/RaelaGrotesqueMedium-WprDE.ttf", weight: "500", style: "normal" },
    { path: "../branding/fonts/RaelaGrotesqueSemiBold-aY5KR.ttf", weight: "600", style: "normal" },
    { path: "../branding/fonts/RaelaGrotesqueBold-E4Omn.ttf", weight: "700", style: "normal" },
    { path: "../branding/fonts/RaelaGrotesqueExtraBold-OGgW4.ttf", weight: "800", style: "normal" },
    { path: "../branding/fonts/RaelaGrotesqueBlack-Zp21m.ttf", weight: "900", style: "normal" },
  ],
})
const kineksRound = localFont({
  variable: "--font-display",
  src: [
    { path: "../branding/fonts/KineksRoundLight-KVe8X.otf", weight: "300", style: "normal" },
    { path: "../branding/fonts/KineksRoundRegular-vnPJ9.otf", weight: "400", style: "normal" },
    { path: "../branding/fonts/KineksRoundMedium-2vyGo.otf", weight: "500", style: "normal" },
    { path: "../branding/fonts/KineksRoundSemiBold-woLx6.otf", weight: "600", style: "normal" },
    { path: "../branding/fonts/KineksRoundBold-MAlrP.otf", weight: "700", style: "normal" },
  ],
})
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

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
  themeColor: "#665C99",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${raelaGrotesque.variable} ${kineksRound.variable} ${geistMono.variable}`}>
        {children}
        <Analytics />
        <KofiWidget />
      </body>
    </html>
  )
}
