// "use client"

// import { ArrowRightOnRectangle } from "@medusajs/icons"
// import { clx } from "@modules/common/components/ui"
// import { useParams, usePathname } from "next/navigation"

// import { signout } from "@lib/data/customer"
// import { HttpTypes } from "@medusajs/types"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import ChevronDown from "@modules/common/icons/chevron-down"
// import MapPin from "@modules/common/icons/map-pin"
// import Package from "@modules/common/icons/package"
// import User from "@modules/common/icons/user"

// const AccountNav = ({
//   customer,
// }: {
//   customer: HttpTypes.StoreCustomer | null
// }) => {
//   const route = usePathname()
//   const { countryCode } = useParams() as { countryCode: string }

//   const handleLogout = async () => {
//     await signout(countryCode)
//   }

//   return (
//     <div>
//       <div className="small:hidden" data-testid="mobile-account-nav">
//         {route !== `/${countryCode}/account` ? (
//           <LocalizedClientLink
//             href="/account"
//             className="flex items-center gap-x-2 text-small-regular py-2"
//             data-testid="account-main-link"
//           >
//             <>
//               <ChevronDown className="transform rotate-90" />
//               <span>Account</span>
//             </>
//           </LocalizedClientLink>
//         ) : (
//           <>
//             <div className="text-xl-semi mb-4 px-8">
//               Hello {customer?.first_name}
//             </div>
//             <div className="text-base-regular">
//               <ul>
//                 <li>
//                   <LocalizedClientLink
//                     href="/account/profile"
//                     className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
//                     data-testid="profile-link"
//                   >
//                     <>
//                       <div className="flex items-center gap-x-2">
//                         <User size={20} />
//                         <span>Profile</span>
//                       </div>
//                       <ChevronDown className="transform -rotate-90" />
//                     </>
//                   </LocalizedClientLink>
//                 </li>
//                 <li>
//                   <LocalizedClientLink
//                     href="/account/addresses"
//                     className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
//                     data-testid="addresses-link"
//                   >
//                     <>
//                       <div className="flex items-center gap-x-2">
//                         <MapPin size={20} />
//                         <span>Addresses</span>
//                       </div>
//                       <ChevronDown className="transform -rotate-90" />
//                     </>
//                   </LocalizedClientLink>
//                 </li>
//                 <li>
//                   <LocalizedClientLink
//                     href="/account/orders"
//                     className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
//                     data-testid="orders-link"
//                   >
//                     <div className="flex items-center gap-x-2">
//                       <Package size={20} />
//                       <span>Orders</span>
//                     </div>
//                     <ChevronDown className="transform -rotate-90" />
//                   </LocalizedClientLink>
//                 </li>
//                 <li>
//                   <button
//                     type="button"
//                     className="flex items-center justify-between py-4 border-b border-gray-200 px-8 w-full"
//                     onClick={handleLogout}
//                     data-testid="logout-button"
//                   >
//                     <div className="flex items-center gap-x-2">
//                       <ArrowRightOnRectangle />
//                       <span>Log out</span>
//                     </div>
//                     <ChevronDown className="transform -rotate-90" />
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </>
//         )}
//       </div>
//       <div className="hidden small:block" data-testid="account-nav">
//         <div>
//           <div className="pb-4">
//             <h3 className="text-base-semi">Account</h3>
//           </div>
//           <div className="text-base-regular">
//             <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
//               <li>
//                 <AccountNavLink
//                   href="/account"
//                   route={route!}
//                   data-testid="overview-link"
//                 >
//                   Overview
//                 </AccountNavLink>
//               </li>
//               <li>
//                 <AccountNavLink
//                   href="/account/profile"
//                   route={route!}
//                   data-testid="profile-link"
//                 >
//                   Profile
//                 </AccountNavLink>
//               </li>
//               <li>
//                 <AccountNavLink
//                   href="/account/addresses"
//                   route={route!}
//                   data-testid="addresses-link"
//                 >
//                   Addresses
//                 </AccountNavLink>
//               </li>
//               <li>
//                 <AccountNavLink
//                   href="/account/orders"
//                   route={route!}
//                   data-testid="orders-link"
//                 >
//                   Orders
//                 </AccountNavLink>
//               </li>
//               <li className="text-grey-700">
//                 <button
//                   type="button"
//                   onClick={handleLogout}
//                   data-testid="logout-button"
//                 >
//                   Log out
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// type AccountNavLinkProps = {
//   href: string
//   route: string
//   children: React.ReactNode
//   "data-testid"?: string
// }

// const AccountNavLink = ({
//   href,
//   route,
//   children,
//   "data-testid": dataTestId,
// }: AccountNavLinkProps) => {
//   const { countryCode }: { countryCode: string } = useParams()

//   const active = route.split(countryCode)[1] === href
//   return (
//     <LocalizedClientLink
//       href={href}
//       className={clx("text-ui-fg-subtle hover:text-ui-fg-base", {
//         "text-ui-fg-base font-semibold": active,
//       })}
//       data-testid={dataTestId}
//     >
//       {children}
//     </LocalizedClientLink>
//   )
// }

// export default AccountNav
"use client"

import { ArrowRightOnRectangle } from "@medusajs/icons"
import { clx } from "@modules/common/components/ui"
import { useParams, usePathname } from "next/navigation"

import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"
import React, { useEffect, useState } from "react"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }
  const [wishlistCount, setWishlistCount] = useState(0)

  // 👑 LIVE COUNT STREAM: Scan browser cache to showcase active likes count dynamically
  const updateWishlistCount = () => {
    const saved = localStorage.getItem("haveher_wishlist")
    if (saved) {
      const list = JSON.parse(saved)
      setWishlistCount(list.length)
    } else {
      setWishlistCount(0)
    }
  }

  useEffect(() => {
    updateWishlistCount()
    window.addEventListener("wishlist-updated", updateWishlistCount)
    return () =>
      window.removeEventListener("wishlist-updated", updateWishlistCount)
  }, [])

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div className="font-sans text-[#3A1A2A]">
      {/* ==================== A. MOBILE RESPONSIVE ACCORDION VIEW ==================== */}
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2 text-[#3A1A2A]"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl font-serif italic mb-4 px-8 text-[#3A1A2A]">
              Hello {customer?.first_name}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between py-4 border-b border-gray-100 px-8 text-gray-600 hover:text-[#D45C88]"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>Profile</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>

                {/* 👑 INJECTED MOBILE NAVIGATION: Wishlist direct routing access */}
                <li>
                  <LocalizedClientLink
                    href="/account/wishlist"
                    className="flex items-center justify-between py-4 border-b border-gray-100 px-8 text-gray-600 hover:text-[#D45C88]"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <svg
                          className="w-5 h-5 fill-none stroke-current text-gray-500"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>My Wishlist</span>
                        {wishlistCount > 0 && (
                          <span className="ml-1 text-[10px] bg-[#FDF1F6] text-[#D45C88] px-2 py-0.5 rounded-full font-bold">
                            {wishlistCount}
                          </span>
                        )}
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between py-4 border-b border-gray-100 px-8 text-gray-600 hover:text-[#D45C88]"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>Addresses</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between py-4 border-b border-gray-100 px-8 text-gray-600 hover:text-[#D45C88]"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>Orders</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b border-gray-100 px-8 w-full text-gray-600 hover:text-[#D45C88]"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Log out</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {/* ==================== B. DESKTOP SIDEBAR NAVIGATION VIEW ==================== */}
      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-4 border-b border-pink-50/50 mb-4">
            <h3 className="font-serif italic text-lg font-normal tracking-wide">
              Account
            </h3>
          </div>
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <AccountNavLink href="/account" route={route!}>
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/profile" route={route!}>
                  Profile
                </AccountNavLink>
              </li>

              {/* 👑 INJECTED DESKTOP NAVIGATION SIDE ELEMENT LINK */}
              <li>
                <AccountNavLink href="/account/wishlist" route={route!}>
                  <div className="flex items-center gap-x-2">
                    <span>My Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="bg-[#D45C88] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                </AccountNavLink>
              </li>

              <li>
                <AccountNavLink href="/account/addresses" route={route!}>
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/orders" route={route!}>
                  Orders
                </AccountNavLink>
              </li>
              <li className="text-gray-400 hover:text-[#D45C88] transition-colors mt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  data-testid="logout-button"
                  className="cursor-pointer font-medium tracking-wide text-xs uppercase"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "text-sm text-gray-500 hover:text-[#D45C88] transition-colors",
        {
          "text-[#D45C88] font-bold tracking-wide": active,
        }
      )}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav
