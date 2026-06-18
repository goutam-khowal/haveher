// import { Suspense } from "react"
// import { listLocales } from "@lib/data/locales"
// import { getLocale } from "@lib/data/locale-actions"
// import { listRegions } from "@lib/data/regions"
// import { StoreRegion } from "@medusajs/types"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import CartButton from "@modules/layout/components/cart-button"
// import SideMenu from "@modules/layout/components/side-menu"
// import Image from "next/image"
// import NavLikesCounter from "@modules/layout/components/nav-likes-counter"

// export default async function Nav() {
//   const [regions, locales, currentLocale] = await Promise.all([
//     listRegions().then((regions: StoreRegion[]) => regions),
//     listLocales(),
//     getLocale(),
//   ])

//   return (
//     <div className="sticky top-0 inset-x-0 z-50 group">
//       <header className="relative h-20 mx-auto border-b bg-white border-pink-50/50 shadow-2xs duration-200">
//         <nav className="content-container flex items-center justify-between w-full h-full font-sans text-sm font-medium text-gray-700 max-w-5xl mx-auto px-4">
//           {/* LEFT SIDE: Side Drawer Menu */}
//           <div className="flex-1 basis-0 h-full flex items-center">
//             <div className="h-full">
//               <SideMenu
//                 regions={regions}
//                 locales={locales}
//                 currentLocale={currentLocale}
//               />
//             </div>
//           </div>

//           {/* CENTER: ENLARGED BRAND IMAGE LOGO */}
//           <div className="flex items-center h-full">
//             <LocalizedClientLink
//               href="/"
//               className="flex items-center justify-center transition-opacity hover:opacity-85 focus:outline-none"
//               data-testid="nav-store-link"
//             >
//               <div className="relative w-44 h-16 flex items-center justify-center">
//                 <Image
//                   src="/haveher-logo.png"
//                   alt="HaveHer Couture"
//                   fill
//                   priority
//                   className="object-contain"
//                 />
//               </div>
//             </LocalizedClientLink>
//           </div>

//           {/* RIGHT SIDE: Action Bars & Triggers Grid */}
//           <div className="flex items-center gap-x-4 sm:gap-x-6 h-full flex-1 basis-0 justify-end">
//             {/* Desktop Navigation Text Links Array */}
//             <div className="hidden small:flex items-center gap-x-6 h-full">
//               <LocalizedClientLink
//                 className="text-gray-700 hover:text-[#D45C88] font-bold text-xs uppercase tracking-widest transition-colors"
//                 href="/contact"
//               >
//                 Contact Us
//               </LocalizedClientLink>

//               <LocalizedClientLink
//                 className="text-gray-700 hover:text-[#D45C88] font-bold text-xs uppercase tracking-widest transition-colors"
//                 href="/account"
//                 data-testid="nav-account-link"
//               >
//                 Account
//               </LocalizedClientLink>
//             </div>

//             {/* =========================================================================
//                👑 REFINED NAVBAR WISHLIST ICON: Premium heart vector link with live count integration
//                ========================================================================= */}
//             <LocalizedClientLink
//               href="/account/wishlist"
//               className="relative p-2 text-gray-700 hover:text-[#D45C88] transition-colors flex items-center justify-center transform active:scale-95"
//               aria-label="View favorites"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={2}
//                 stroke="currentColor"
//                 className="w-5 h-5"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//                 />
//               </svg>
//               {/* Absolute nested counter engine layout node */}
//               <div className="absolute -top-0.5 -right-0.5">
//                 <NavLikesCounter />
//               </div>
//             </LocalizedClientLink>

//             {/* Medusa Cart Actions Module */}
//             <Suspense
//               fallback={
//                 <LocalizedClientLink
//                   className="flex items-center gap-2 text-gray-700 hover:text-[#D45C88] font-bold text-xs uppercase tracking-widest transition-colors"
//                   href="/cart"
//                   data-testid="nav-cart-link"
//                 >
//                   Cart (0)
//                 </LocalizedClientLink>
//               }
//             >
//               <CartButton />
//             </Suspense>
//           </div>
//         </nav>
//       </header>
//     </div>
//   )
// }
import { Suspense } from "react"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer" // 👑 INJECTED: Fetch customer validation function
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import NavLikesCounter from "@modules/layout/components/nav-likes-counter"
import AnnouncementMarquee from "@modules/layout/components/announcement-marquee"

export default async function Nav() {
  const [regions, locales, currentLocale, customer] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    retrieveCustomer().catch(() => null), // 👑 INJECTED: Safely capture customer session context without throwing errors
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group flex flex-col w-full">
      {/* REGULATION 8 MARQUEE BANNER */}
      <AnnouncementMarquee />

      <header className="relative h-20 mx-auto border-b bg-white border-pink-50/50 shadow-2xs duration-200 w-full">
        <nav className="content-container flex items-center justify-between w-full h-full font-sans text-sm font-medium text-gray-700 max-w-5xl mx-auto px-4">
          {/* LEFT SIDE: Side Drawer Menu */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
          </div>

          {/* CENTER: ENLARGED BRAND IMAGE LOGO */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="flex items-center justify-center transition-opacity hover:opacity-85 focus:outline-none"
              data-testid="nav-store-link"
            >
              <div className="relative w-44 h-16 flex items-center justify-center">
                <Image
                  src="/haveher-logo.png"
                  alt="HaveHer Couture"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </LocalizedClientLink>
          </div>

          {/* RIGHT SIDE: Action Bars & Triggers Grid */}
          <div className="flex items-center gap-x-4 sm:gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="text-gray-700 hover:text-[#D45C88] font-bold text-xs uppercase tracking-widest transition-colors"
                href="/contact"
              >
                Contact Us
              </LocalizedClientLink>

              <LocalizedClientLink
                className="text-gray-700 hover:text-[#D45C88] font-bold text-xs uppercase tracking-widest transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>

            {/* =========================================================================
               👑 REFINED NAVBAR WISHLIST ICON MASK: Render ONLY if the user is authenticated (customer !== null)
               ========================================================================= */}
            {customer && (
              <LocalizedClientLink
                href="/account/wishlist"
                className="relative p-2 text-gray-700 hover:text-[#D45C88] transition-colors flex items-center justify-center transform active:scale-95"
                aria-label="View favorites"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <div className="absolute -top-0.5 -right-0.5">
                  <NavLikesCounter />
                </div>
              </LocalizedClientLink>
            )}

            {/* Medusa Cart Actions Module */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center gap-2 text-gray-700 hover:text-[#D45C88] font-bold text-xs uppercase tracking-widest transition-colors"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
