import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google" // 🚀 Updated to Haveher Signature Fonts
import "styles/globals.css"

// 1. Initialize the correct typography engines matching your Tailwind config keys
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans", // Maps directly to font-sans class hooks
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif", // Maps directly to font-serif class hooks
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    // 2. Injecting the proper runtime CSS configuration variables into the DOM root
    <html
      lang="en"
      data-mode="light"
      className={`${montserrat.variable} ${playfair.variable} scroll-smooth`}
    >
      {/* 3. Apply the global fonts, soft Haveher pink aura background, and rich dark berry texts */}
      <body className="font-sans bg-[#FDF1F6]/40 text-[#3A1A2A] antialiased min-h-screen selection:bg-[#D45C88]/10 selection:text-[#D45C88]">
        {/* Main core client edge viewports layout wrapper layer */}
        <main className="relative w-full overflow-x-hidden min-h-screen flex flex-col">
          {props.children}
        </main>
      </body>
    </html>
  )
}
