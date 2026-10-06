"use client"

import Script from "next/script"

export function KofiWidget() {
  return (
    <Script
      src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        // Ko-fi takes literal colors, so read the brand tokens from :root instead of hardcoding hex.
        const root = getComputedStyle(document.documentElement)
        // @ts-expect-error - kofiWidgetOverlay is injected by the script above
        kofiWidgetOverlay.draw('adhdesigns', {
          'type': 'floating-chat',
          'floating-chat.donateButton.text': 'Tip Me',
          'floating-chat.donateButton.background-color': root.getPropertyValue('--caution-amber').trim(),
          'floating-chat.donateButton.text-color': root.getPropertyValue('--indigo-void').trim(),
        })
      }}
    />
  )
}
