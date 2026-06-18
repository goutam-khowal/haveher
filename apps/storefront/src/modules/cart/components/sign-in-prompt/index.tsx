"use client"

import { Button, Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    // 👑 FIXED: Mobile par flex-col block layout active karega, desktop (sm:) par horizontal setup back to normal
    <div className="bg-[#FDF1F6]/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3.5 gap-x-4 p-4 md:p-6 rounded-2xl border border-[#F0C4D8]/30 font-sans w-full">
      {/* ROW 1 & 2 AREA: Heading & Text Stacking */}
      <div className="flex flex-col text-left">
        {/* ROW 1: Heading */}
        <Heading
          level="h2"
          className="font-serif italic text-base md:text-lg font-medium text-[#3A1A2A] leading-tight"
        >
          Already have an account?
        </Heading>
        {/* ROW 2: Subtitle Text */}
        <Text className="text-xs text-gray-400 font-sans mt-1">
          Sign in for a better experience.
        </Text>
      </div>

      {/* ROW 3 AREA: Full-Width Mobile Action CTA Button */}
      <div className="w-full sm:w-auto shrink-0">
        <LocalizedClientLink href="/account" className="w-full block">
          <Button
            variant="secondary"
            className="h-10 w-full sm:w-auto px-5 bg-white border border-[#D45C88]/30 text-[#D45C88] hover:bg-[#D45C88] hover:text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 active:scale-95 shadow-3xs cursor-pointer flex items-center justify-center"
            data-testid="sign-in-button"
          >
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
