// import { Suspense } from "react"

// import { listLocales } from "@lib/data/locales"
// import { getLocale } from "@lib/data/locale-actions"
// import { listRegions } from "@lib/data/regions"
// import { StoreRegion } from "@medusajs/types"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import CartButton from "@modules/layout/components/cart-button"
// import SideMenu from "@modules/layout/components/side-menu"

// export default async function Nav() {
//   const [regions, locales, currentLocale] = await Promise.all([
//     listRegions().then((regions: StoreRegion[]) => regions),
//     listLocales(),
//     getLocale(),
//   ])

//   return (
//     <div className="sticky top-0 inset-x-0 z-50 group">
//       <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
//         <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
//           <div className="flex-1 basis-0 h-full flex items-center">
//             <div className="h-full">
//               <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
//             </div>
//           </div>

//           <div className="flex items-center h-full">
//             <LocalizedClientLink
//               href="/"
//               className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
//               data-testid="nav-store-link"
//             >
//               Medusa Store
//             </LocalizedClientLink>
//           </div>

//           <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
//             <div className="hidden small:flex items-center gap-x-6 h-full">
//               <LocalizedClientLink
//                 className="hover:text-ui-fg-base"
//                 href="/account"
//                 data-testid="nav-account-link"
//               >
//                 Account
//               </LocalizedClientLink>
//             </div>
//             <Suspense
//               fallback={
//                 <LocalizedClientLink
//                   className="hover:text-ui-fg-base flex gap-2"
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
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Updated height, added subtle shadow, and refined border */}
      <header className="relative h-20 mx-auto border-b bg-white border-gray-100 shadow-sm duration-200">
        <nav className="content-container flex items-center justify-between w-full h-full font-sans text-sm font-medium text-gray-700">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              // Premium fashion logo styling using your berry theme
              className="text-2xl font-bold tracking-widest text-berry-primary
              font-serif italic uppercase hover:text-berry-dark transition-colors"
              data-testid="nav-store-link"
            >
              HaveHer
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                // Clean hover effect using the primary brand color
                className="text-gray-700 hover:text-berry-primary transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  // Clean hover effect using the primary brand color
                  className="flex items-center gap-2 text-gray-700 hover:text-berry-primary transition-colors"
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
