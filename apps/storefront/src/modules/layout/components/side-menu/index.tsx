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

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  // Updated to match the refined Nav text styling
                  className="relative h-full flex items-center transition-colors ease-out duration-200 focus:outline-none text-gray-700 hover:text-berry-primary"
                >
                  Menu
                </Popover.Button>
              </div>

              {open && (
                <div
                  // Softened the backdrop overlay
                  className="fixed inset-0 z-[50] bg-gray-900/20 backdrop-blur-sm pointer-events-auto transition-opacity"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

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
                <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-[51] inset-x-0 m-2">
                  <div
                    data-testid="nav-menu-popup"
                    // Swapped from a dark theme to a premium glass white theme with soft shadows
                    className="flex flex-col h-full bg-white/95 backdrop-blur-xl rounded-2xl justify-between p-6 shadow-2xl border border-gray-100"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="p-2 text-gray-500 hover:text-berry-primary hover:bg-berry-primary/5 rounded-full transition-all"
                      >
                        <XMark />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start mt-8">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              // Added a premium subtle slide effect on hover
                              className="text-3xl font-medium tracking-tight text-gray-800 hover:text-berry-primary hover:translate-x-2 transition-all duration-300 inline-block"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-6 mt-auto pt-8 border-t border-gray-100">
                      {!!locales?.length && (
                        <div
                          className="flex justify-between items-center text-gray-600 hover:text-berry-primary cursor-pointer transition-colors"
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
                        className="flex justify-between items-center text-gray-600 hover:text-berry-primary cursor-pointer transition-colors"
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
                      <Text className="flex justify-between text-xs font-medium text-gray-400 mt-4">
                        © {new Date().getFullYear()} HaveHer. All rights
                        reserved.
                      </Text>
                    </div>
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
