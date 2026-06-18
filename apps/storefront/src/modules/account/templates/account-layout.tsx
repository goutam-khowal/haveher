// import React from "react"

// import UnderlineLink from "@modules/common/components/interactive-link"

// import AccountNav from "../components/account-nav"
// import { HttpTypes } from "@medusajs/types"

// interface AccountLayoutProps {
//   customer: HttpTypes.StoreCustomer | null
//   children: React.ReactNode
// }

// const AccountLayout: React.FC<AccountLayoutProps> = ({
//   customer,
//   children,
// }) => {
//   return (
//     <div className="flex-1 small:py-12" data-testid="account-page">
//       <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
//         <div className="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12">
//           <div>{customer && <AccountNav customer={customer} />}</div>
//           <div className="flex-1">{children}</div>
//         </div>
//         <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-gray-200 py-12 gap-8">
//           <div>
//             <h3 className="text-xl-semi mb-4">Got questions?</h3>
//             <span className="txt-medium">
//               You can find frequently asked questions and answers on our
//               customer service page.
//             </span>
//           </div>
//           <div>
//             <UnderlineLink href="/customer-service">
//               Customer Service
//             </UnderlineLink>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AccountLayout
"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div
      className="flex-1 small:py-12 bg-gray-50/10 font-sans text-[#3A1A2A]"
      data-testid="account-page"
    >
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col px-4 md:px-8 rounded-3xl border border-pink-50/30 shadow-2xs">
        {/* Main Dashboard Navigation Grid */}
        <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] py-8 md:py-12 gap-x-8 gap-y-6">
          <div className="w-full">
            {customer && <AccountNav customer={customer} />}
          </div>
          <div className="flex-1 w-full min-w-0">{children}</div>
        </div>

        {/* =========================================================================
           👑 RESTYLED GOT QUESTIONS SECTION: Transformed into the clean layout capsule box
           ========================================================================= */}
        <div className="mt-8 pt-8 border-t border-pink-50/60 w-full flex flex-col items-center justify-center text-center pb-12">
          <div className="bg-[#FDF1F6]/30 border border-[#F0C4D8]/20 rounded-2xl p-6 md:p-8 w-full max-w-xl mx-auto transition-all hover:bg-[#FDF1F6]/50 shadow-3xs">
            <h2 className="text-xl md:text-2xl font-serif italic tracking-wide text-[#3A1A2A] mb-3">
              Got Questions?
            </h2>

            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-sm mx-auto mb-6">
              You can find frequently asked questions, policy guidelines and
              returns answers on our customer service page.
            </p>

            <LocalizedClientLink
              href="/contact"
              className="inline-flex items-center gap-x-2 text-xs font-bold uppercase tracking-widest text-[#D45C88] hover:text-[#3A1A2A] bg-white border border-pink-100/60 px-6 py-2.5 rounded-full shadow-3xs hover:shadow-2xs transition-all cursor-pointer group"
            >
              <span>Customer Service</span>
              <svg
                className="w-3 h-3 stroke-current fill-none transform transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
