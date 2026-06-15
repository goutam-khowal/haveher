import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import "styles/globals.css"

// 1. Initialize the typography engine
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    // 2. Inject the CSS variables into the HTML tag
    <html
      lang="en"
      data-mode="light"
      className={`${dmSans.variable} ${playfair.variable}`}
    >
      {/* 3. Apply the global fonts and Blush & Berry theme colors */}
      <body className="font-sans bg-berry-bg text-berry-dark antialiased">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
