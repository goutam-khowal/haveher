import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "About Us | HaveHer",
  description:
    "Discover HaveHer - Premium fashion crafted for confidence and elite elegance, founded by Shalini Ranjan.",
}

export default async function AboutUsPage() {
  return (
    <div className="w-full bg-[#FDF1F6]/20 py-16 md:py-24 font-sans text-[#3A1A2A]">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* ==================== CORE BRAND SECTION ==================== */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D45C88] font-bold mb-3">
            Our Philosophy
          </span>
          <h1 className="text-4xl md:text-5xl font-serif italic font-normal tracking-wide mb-6">
            About HaveHer
          </h1>
          <div className="w-16 h-[1.5px] bg-[#D45C88]/40 mb-8"></div>

          <div className="text-base md:text-lg leading-relaxed text-[#3A1A2A]/90 max-w-2xl text-justify font-light flex flex-col gap-y-6">
            <p>
              At <span className="font-semibold">HaveHer</span>, we are building
              more than just a fashion brand—we are creating something that
              feels deeply personal, familiar, and truly yours.
            </p>
            <p>
              Every piece we design is meticulously crafted with the absolute
              intention of helping you feel confident, beautiful, and
              unapologetically yourself. This is only the beginning of our
              journey. As we continue to launch new curated collections and
              evolve, your feedback, support, and trust will remain at the very
              heart of everything we do.
            </p>
          </div>

          <div className="mt-10 max-w-xl">
            <h2 className="text-xl md:text-2xl font-serif italic text-center text-[#D45C88] font-normal tracking-wide leading-snug">
              &ldquo;Because HaveHer isn't just a brand you wear—it's a brand
              you become.&rdquo;
            </h2>
          </div>
        </div>

        {/* Dynamic Section Separator */}
        <div className="w-full max-w-2xl border-t border-[#pink-100]/40 my-4"></div>

        {/* ==================== FOUNDER SECTION ==================== */}
        <div className="text-center mt-12 flex flex-col items-center w-full max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D45C88] font-bold mb-3">
            The Visionary
          </span>
          <h3 className="text-3xl font-serif italic font-normal tracking-wide mb-6">
            About the Founder
          </h3>

          <div className="text-base md:text-md leading-relaxed text-[#3A1A2A]/85 text-justify font-light flex flex-col gap-y-5">
            <p className="font-serif italic text-lg text-[#D45C88] text-center mb-2 font-normal">
              Hi, I'm Shalini Ranjan, the founder of HaveHer.
            </p>
            <p>
              While I may be the person guiding the baseline behind the brand,
              building something truly meaningful is never a one-person journey.
              It takes the collective strength and support of family, friends,
              uniquely talented individuals, and most importantly, a community
              that fundamentally believes in the vision.
            </p>
            <p>
              HaveHer is being built day by day with love, ambition, and a deep
              appreciation for every single person who chooses to be a part of
              it. As our premium community grows, your voice, ideas, and support
              will always be valued, listened to, and celebrated.
            </p>
            <p className="text-center font-medium mt-4 text-[#3A1A2A]">
              Thank you for being here and for growing with us.
            </p>
          </div>
        </div>

        {/* Luxury Footer Metadata Signature */}
        <div className="mt-20 text-center">
          <p className="font-serif italic text-xs text-[#D45C88] tracking-[0.3em] uppercase">
            Designed to be Remembered ✦ Season 1
          </p>
        </div>
      </div>
    </div>
  )
}
