import { Suspense } from "react"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* 🌸 Fixed background header track */}
      <header className="relative h-20 mx-auto border-b bg-white border-pink-50/50 shadow-2xs duration-200">
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

          {/* 👑 CENTER: ENLARGED BRAND IMAGE LOGO */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="flex items-center justify-center transition-opacity hover:opacity-85 focus:outline-none"
              data-testid="nav-store-link"
            >
              {/* ⚡ UPGRADED: Expanded bounding box to match the original layout presence perfectly */}
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

          {/* RIGHT SIDE: Account links & Cart Drawer node */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="text-gray-700 hover:text-[#D45C88] font-bold text-xs uppercase tracking-wider transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center gap-2 text-gray-700 hover:text-[#D45C88] font-bold text-xs uppercase tracking-wider transition-colors"
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
