"use client"

import Script from "next/script"

export function KofiWidget() {
  return (
    <Script
      src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        // @ts-expect-error - kofiWidgetOverlay is injected by the script above
        kofiWidgetOverlay.draw('adhdesigns', {
          'type': 'floating-chat',
          'floating-chat.donateButton.text': 'Tip Me',
          'floating-chat.donateButton.background-color': '#DEA549',
          'floating-chat.donateButton.text-color': '#244952',
        })
      }}
    />
  )
}
