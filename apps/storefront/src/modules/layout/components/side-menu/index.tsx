// "use client"

// import { Popover, PopoverPanel, Transition } from "@headlessui/react"
// import useToggleState from "@lib/hooks/use-toggle-state"
// import { ArrowRightMini, XMark } from "@medusajs/icons"
// import { HttpTypes } from "@medusajs/types"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import { Text, clx } from "@modules/common/components/ui"
// import { Fragment } from "react"
// import CountrySelect from "../country-select"
// import LanguageSelect from "../language-select"
// import { Locale } from "@lib/data/locales"

// type SideMenuProps = {
//   regions: HttpTypes.StoreRegion[] | null
//   locales: Locale[] | null
//   currentLocale: string | null
// }

// const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
//   const countryToggleState = useToggleState()
//   const languageToggleState = useToggleState()

//   return (
//     <div className="h-full flex items-center">
//       <div className="flex items-center h-full">
//         <Popover className="h-full flex items-center relative">
//           {({ open, close }) => (
//             <>
//               <div className="relative flex h-full items-center">
//                 {/* 👑 PREMIUM HAVERHER HAMBURGER ICON TRIGGER */}
//                 <Popover.Button
//                   data-testid="nav-menu-button"
//                   className="relative h-full flex items-center justify-center focus:outline-none text-[#3A1A2A] hover:text-[#D45C88] transition-colors duration-200 group p-2 cursor-pointer outline-none border-none"
//                 >
//                   <div className="flex flex-col items-center justify-center gap-y-[5px] w-5 h-5 relative">
//                     <span className="w-5 h-[1.5px] bg-current rounded-full transition-transform duration-200 group-hover:translate-y-[1px]"></span>
//                     <span className="w-5 h-[1.5px] bg-current rounded-full transition-opacity duration-200"></span>
//                     <span className="w-5 h-[1.5px] bg-current rounded-full transition-transform duration-200 group-hover:-translate-y-[1px]"></span>
//                   </div>
//                 </Popover.Button>
//               </div>

//               {/* BACKDROP OVERLAY */}
//               {open && (
//                 <div
//                   className="fixed inset-0 z-[50] bg-gray-900/20 backdrop-blur-sm pointer-events-auto transition-opacity"
//                   onClick={close}
//                   data-testid="side-menu-backdrop"
//                 />
//               )}

//               {/* 👑 FIXED POPUP DRAWER STRUCTURE */}
//               <Transition
//                 show={open}
//                 as={Fragment}
//                 enter="transition ease-out duration-200"
//                 enterFrom="opacity-0 -translate-x-4"
//                 enterTo="opacity-100 translate-x-0"
//                 leave="transition ease-in duration-150"
//                 leaveFrom="opacity-100 translate-x-0"
//                 leaveTo="opacity-0 -translate-x-4"
//               >
//                 {/* ⚡ FIXED: Forces full structural layout screen stream height block directly */}
//                 <PopoverPanel
//                   static
//                   className="flex flex-col fixed left-0 top-0 w-full sm:w-1/3 2xl:w-1/4 sm:min-w-[320px] h-screen z-[51] m-0 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-100 p-6 justify-between text-left"
//                   data-testid="nav-menu-popup"
//                 >
//                   {/* CLOSE TRIGGER BLOCK */}
//                   <div className="flex justify-end w-full" id="xmark">
//                     <button
//                       data-testid="close-menu-button"
//                       onClick={close}
//                       className="p-2 text-gray-400 hover:text-[#D45C88] hover:bg-[#FDF1F6] rounded-full transition-all cursor-pointer focus:outline-none"
//                     >
//                       <XMark className="w-5 h-5" />
//                     </button>
//                   </div>

//                   {/* 🌸 NAVIGATION LINKS CONTAINER DISPLAY */}
//                   <div className="flex flex-col gap-y-6 items-start justify-start flex-1 mt-10 w-full block">
//                     <LocalizedClientLink
//                       href="/"
//                       className="text-2xl md:text-3xl font-medium tracking-tight text-[#3A1A2A] hover:text-[#D45C88] hover:translate-x-2 transition-all duration-300 block w-full py-1 focus:outline-none"
//                       onClick={close}
//                       data-testid="home-link"
//                     >
//                       Home
//                     </LocalizedClientLink>
//                     <LocalizedClientLink
//                       href="/store"
//                       className="text-2xl md:text-3xl font-medium tracking-tight text-[#3A1A2A] hover:text-[#D45C88] hover:translate-x-2 transition-all duration-300 block w-full py-1 focus:outline-none"
//                       onClick={close}
//                       data-testid="store-link"
//                     >
//                       Store
//                     </LocalizedClientLink>
//                     <LocalizedClientLink
//                       href="/account"
//                       className="text-2xl md:text-3xl font-medium tracking-tight text-[#3A1A2A] hover:text-[#D45C88] hover:translate-x-2 transition-all duration-300 block w-full py-1 focus:outline-none"
//                       onClick={close}
//                       data-testid="account-link"
//                     >
//                       Account
//                     </LocalizedClientLink>
//                     <LocalizedClientLink
//                       href="/cart"
//                       className="text-2xl md:text-3xl font-medium tracking-tight text-[#3A1A2A] hover:text-[#D45C88] hover:translate-x-2 transition-all duration-300 block w-full py-1 focus:outline-none"
//                       onClick={close}
//                       data-testid="cart-link"
//                     >
//                       Cart
//                     </LocalizedClientLink>
//                   </div>

//                   {/* BOTTOM SELECTION MATRIX AND META INFORMATION */}
//                   <div className="flex flex-col gap-y-5 mt-auto pt-6 border-t border-gray-100 w-full">
//                     {!!locales?.length && (
//                       <div
//                         className="flex justify-between items-center text-gray-600 hover:text-[#D45C88] cursor-pointer transition-colors"
//                         onMouseEnter={languageToggleState.open}
//                         onMouseLeave={languageToggleState.close}
//                       >
//                         <LanguageSelect
//                           toggleState={languageToggleState}
//                           locales={locales}
//                           currentLocale={currentLocale}
//                         />
//                         <ArrowRightMini
//                           className={clx(
//                             "transition-transform duration-200",
//                             languageToggleState.state ? "-rotate-90" : ""
//                           )}
//                         />
//                       </div>
//                     )}

//                     <div
//                       className="flex justify-between items-center text-gray-600 hover:text-[#D45C88] cursor-pointer transition-colors"
//                       onMouseEnter={countryToggleState.open}
//                       onMouseLeave={countryToggleState.close}
//                     >
//                       {regions && (
//                         <CountrySelect
//                           toggleState={countryToggleState}
//                           regions={regions}
//                         />
//                       )}
//                       <ArrowRightMini
//                         className={clx(
//                           "transition-transform duration-200",
//                           countryToggleState.state ? "-rotate-90" : ""
//                         )}
//                       />
//                     </div>

//                     <Text className="flex justify-between text-[11px] font-medium text-gray-400 mt-2">
//                       © {new Date().getFullYear()} HaveHer. All rights reserved.
//                     </Text>
//                   </div>
//                 </PopoverPanel>
//               </Transition>
//             </>
//           )}
//         </Popover>
//       </div>
//     </div>
//   )
// }

// export default SideMenu
"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text, clx } from "@modules/common/components/ui"
import { Fragment } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { Locale } from "@lib/data/locales"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full flex items-center">
      <div className="flex items-center h-full">
        <Popover className="h-full flex items-center relative">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full items-center">
                {/* HAMBURGER ICON TRIGGER */}
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center justify-center focus:outline-none text-[#3A1A2A] hover:text-[#D45C88] transition-colors duration-200 group p-2 cursor-pointer outline-none border-none"
                >
                  <div className="flex flex-col items-center justify-center gap-y-[5px] w-5 h-5 relative">
                    <span className="w-5 h-[1.5px] bg-current rounded-full transition-transform duration-200 group-hover:translate-y-[1px]"></span>
                    <span className="w-5 h-[1.5px] bg-current rounded-full transition-opacity duration-200"></span>
                    <span className="w-5 h-[1.5px] bg-current rounded-full transition-transform duration-200 group-hover:-translate-y-[1px]"></span>
                  </div>
                </Popover.Button>
              </div>

              {/* BACKDROP OVERLAY */}
              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-gray-900/20 backdrop-blur-sm pointer-events-auto transition-opacity"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              {/* DRAWER POPUP PANEL */}
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-x-4"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-4"
              >
                <PopoverPanel
                  static
                  className="flex flex-col fixed left-0 top-0 w-full sm:w-1/3 2xl:w-1/4 sm:min-w-[320px] h-screen z-[51] m-0 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-100 p-6 justify-between text-left"
                  data-testid="nav-menu-popup"
                >
                  {/* CLOSE TRIGGER BLOCK */}
                  <div className="flex justify-end w-full" id="xmark">
                    <button
                      data-testid="close-menu-button"
                      onClick={close}
                      className="p-2 text-gray-400 hover:text-[#D45C88] hover:bg-[#FDF1F6] rounded-full transition-all cursor-pointer focus:outline-none"
                    >
                      <XMark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* 🌸 NAVIGATION LINKS MATRIX */}
                  <div className="flex flex-col gap-y-6 items-start justify-start flex-1 mt-10 w-full block">
                    <LocalizedClientLink
                      href="/"
                      className="text-2xl md:text-3xl font-medium tracking-tight text-[#3A1A2A] hover:text-[#D45C88] hover:translate-x-2 transition-all duration-300 block w-full py-1 focus:outline-none"
                      onClick={close}
                      data-testid="home-link"
                    >
                      Home
                    </LocalizedClientLink>
                    <LocalizedClientLink
                      href="/store"
                      className="text-2xl md:text-3xl font-medium tracking-tight text-[#3A1A2A] hover:text-[#D45C88] hover:translate-x-2 transition-all duration-300 block w-full py-1 focus:outline-none"
                      onClick={close}
                      data-testid="store-link"
                    >
                      Store
                    </LocalizedClientLink>

                    {/* 👑 INJECTED WISHLIST LINK OPTION */}
                    <LocalizedClientLink
                      href="/account/wishlist"
                      className="text-2xl md:text-3xl font-medium tracking-tight text-[#3A1A2A] hover:text-[#D45C88] hover:translate-x-2 transition-all duration-300 block w-full py-1 focus:outline-none flex items-center gap-x-2.5"
                      onClick={close}
                    >
                      <span>Wishlist</span>
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/account"
                      className="text-2xl md:text-3xl font-medium tracking-tight text-[#3A1A2A] hover:text-[#D45C88] hover:translate-x-2 transition-all duration-300 block w-full py-1 focus:outline-none"
                      onClick={close}
                      data-testid="account-link"
                    >
                      Account
                    </LocalizedClientLink>
                    <LocalizedClientLink
                      href="/cart"
                      className="text-2xl md:text-3xl font-medium tracking-tight text-[#3A1A2A] hover:text-[#D45C88] hover:translate-x-2 transition-all duration-300 block w-full py-1 focus:outline-none"
                      onClick={close}
                      data-testid="cart-link"
                    >
                      Cart
                    </LocalizedClientLink>
                  </div>

                  {/* BOTTOM SELECTION REGIONS */}
                  <div className="flex flex-col gap-y-5 mt-auto pt-6 border-t border-gray-100 w-full">
                    {!!locales?.length && (
                      <div
                        className="flex justify-between items-center text-gray-600 hover:text-[#D45C88] cursor-pointer transition-colors"
                        onMouseEnter={languageToggleState.open}
                        onMouseLeave={languageToggleState.close}
                      >
                        <LanguageSelect
                          toggleState={languageToggleState}
                          locales={locales}
                          currentLocale={currentLocale}
                        />
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-200",
                            languageToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                    )}

                    <div
                      className="flex justify-between items-center text-gray-600 hover:text-[#D45C88] cursor-pointer transition-colors"
                      onMouseEnter={countryToggleState.open}
                      onMouseLeave={countryToggleState.close}
                    >
                      {regions && (
                        <CountrySelect
                          toggleState={countryToggleState}
                          regions={regions}
                        />
                      )}
                      <ArrowRightMini
                        className={clx(
                          "transition-transform duration-200",
                          countryToggleState.state ? "-rotate-90" : ""
                        )}
                      />
                    </div>

                    <Text className="flex justify-between text-[11px] font-medium text-gray-400 mt-2">
                      © {new Date().getFullYear()} HaveHer. All rights reserved.
                    </Text>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
