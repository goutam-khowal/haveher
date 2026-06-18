"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname, useRouter } from "next/navigation" // 🚀 Added useRouter for fluid navigation controls
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  // 🚀 FIXED: Absolute Toggle method handles smooth clicks cleanly
  const toggleDropdown = () => {
    if (window.innerWidth < 1024) {
      router.push("/cart") // Redirect straight away on mobile screens
    } else {
      setCartDropdownOpen((prev) => !prev)
    }
  }

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    itemRef.current = totalItems
  }, [totalItems, pathname])

  return (
    <div
      className="h-full z-50 font-sans flex items-center"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full flex items-center">
        {/* 👑 FIXED 2: Attached the explicit click interceptor to the dynamic button node */}
        <PopoverButton
          className="relative h-full flex items-center focus:outline-none group p-2 border-none outline-none select-none cursor-pointer"
          onClick={toggleDropdown}
          data-testid="nav-cart-link"
        >
          <div className="relative text-[#3A1A2A] group-hover:text-[#D45C88] transition-colors duration-200">
            {/* Outlined Boutique Minimalist Shopping Bag SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.6"
              stroke="currentColor"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            {/* Dynamic Pops Pink Counter Badge Bubble */}
            <span className="absolute -top-1.5 -right-1.5 bg-[#D45C88] text-white font-sans text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-110">
              {totalItems}
            </span>
          </div>
        </PopoverButton>

        {/* DROPDOWN EXPANSION OVERLAY PANEL */}
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+8px)] right-0 bg-white border border-pink-100 rounded-2xl w-[420px] text-[#3A1A2A] shadow-xl p-5 z-50"
            data-testid="nav-cart-dropdown"
          >
            <div className="flex items-center justify-between border-b border-pink-50 pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#3A1A2A]">
                Shopping Bag 🌸
              </h3>
              <span className="text-xs text-gray-400 font-sans">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                {/* Scrollable Items Stack Window Area */}
                <div className="overflow-y-auto max-h-[280px] no-scrollbar pr-1 divide-y divide-pink-50/50">
                  {cartState.items
                    .sort((a, b) =>
                      (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    )
                    .map((item) => (
                      <div
                        className="flex gap-x-4 py-3.5 first:pt-0 last:pb-0 items-center"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-14 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-pink-50"
                          onClick={close}
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>

                        <div className="flex-1 min-w-0 text-left">
                          <h4 className="font-serif italic text-sm text-[#3A1A2A] truncate pr-2">
                            <LocalizedClientLink
                              href={`/products/${item.product_handle}`}
                              data-testid="product-link"
                              onClick={close}
                            >
                              {item.title}
                            </LocalizedClientLink>
                          </h4>
                          <LineItemOptions
                            variant={item.variant}
                            data-testid="cart-item-variant"
                          />
                          <p className="text-[11px] text-gray-400 font-sans mt-0.5">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <div className="text-right flex flex-col items-end gap-y-1 shrink-0">
                          <LineItemPrice
                            item={item}
                            style="tight"
                            currencyCode={cartState.currency_code}
                          />
                          <DeleteButton
                            id={item.id}
                            className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors"
                            data-testid="cart-item-remove-button"
                          >
                            Remove
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Bottom Footer Price CTA Action Controls */}
                <div className="border-t border-pink-50 pt-4 mt-4 space-y-4 font-sans">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-gray-500">
                      Subtotal (excl. taxes)
                    </span>
                    <span
                      className="text-[#3A1A2A] text-base font-bold"
                      data-testid="cart-subtotal"
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" className="block w-full">
                    <button
                      className="w-full bg-[#D45C88] hover:bg-[#3A1A2A] text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-full text-center block transition-all shadow-2xs active:scale-[0.99] cursor-pointer"
                      data-testid="go-to-cart-button"
                      onClick={close}
                    >
                      Go to Checkout
                    </button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              /* 🌸 ELEGANT EMPTY STATE */
              <div className="flex flex-col items-center justify-center py-10 text-center font-sans">
                <div className="bg-[#FDF1F6] text-[#D45C88] flex items-center justify-center w-10 h-10 rounded-full font-bold mb-3 shadow-2xs">
                  <span>0</span>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Your bag is empty
                </p>
                <p className="text-xs text-gray-400 mt-1 max-w-[220px] mb-4">
                  Explore our luxury curated designs to fill it up.
                </p>
                <LocalizedClientLink href="/store">
                  <button
                    onClick={close}
                    className="border border-[#D45C88] text-[#D45C88] hover:bg-[#D45C88] hover:text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2 rounded-full transition-colors cursor-pointer"
                  >
                    Explore Products
                  </button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
