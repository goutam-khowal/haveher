"use client"

import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, XMark } from "@medusajs/icons"
import {
  HttpTypes,
  StoreCart,
  StoreCartShippingOption,
  StorePrice,
} from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, clx } from "@modules/common/components/ui"
import { useState } from "react"
import { StoreFreeShippingPrice } from "types/global"

const computeTarget = (
  cart: HttpTypes.StoreCart,
  price: HttpTypes.StorePrice
) => {
  const priceRule = (price.price_rules || []).find(
    (pr) => pr.attribute === "item_total"
  )!

  const currentAmount = cart.item_total
  const targetAmount = parseFloat(priceRule.value)

  if (priceRule.operator === "gt") {
    return {
      current_amount: currentAmount,
      target_amount: targetAmount,
      target_reached: currentAmount > targetAmount,
      target_remaining:
        currentAmount > targetAmount ? 0 : targetAmount + 1 - currentAmount,
      remaining_percentage: (currentAmount / targetAmount) * 100,
    }
  } else if (priceRule.operator === "gte") {
    return {
      current_amount: currentAmount,
      target_amount: targetAmount,
      target_reached: currentAmount >= targetAmount, // 🚀 FIXED: Absolute condition sync
      target_remaining:
        currentAmount >= targetAmount ? 0 : targetAmount - currentAmount,
      remaining_percentage: (currentAmount / targetAmount) * 100,
    }
  } else if (priceRule.operator === "lt") {
    return {
      current_amount: currentAmount,
      target_amount: targetAmount,
      target_reached: targetAmount > currentAmount,
      target_remaining:
        targetAmount > currentAmount ? 0 : currentAmount + 1 - targetAmount,
      remaining_percentage: (currentAmount / targetAmount) * 100,
    }
  } else if (priceRule.operator === "lte") {
    return {
      current_amount: currentAmount,
      target_amount: targetAmount,
      target_reached: targetAmount >= currentAmount,
      target_remaining:
        targetAmount >= currentAmount ? 0 : currentAmount - targetAmount,
      remaining_percentage: (currentAmount / targetAmount) * 100,
    }
  } else {
    return {
      current_amount: currentAmount,
      target_amount: targetAmount,
      target_reached: currentAmount === targetAmount,
      target_remaining:
        targetAmount > currentAmount ? 0 : targetAmount - currentAmount,
      remaining_percentage: (currentAmount / targetAmount) * 100,
    }
  }
}

export default function ShippingPriceNudge({
  variant = "inline",
  cart,
  shippingOptions,
}: {
  variant?: "popup" | "inline"
  cart: StoreCart
  shippingOptions: StoreCartShippingOption[]
}) {
  if (!cart || !shippingOptions?.length) {
    return
  }

  const freeShippingPrice = shippingOptions
    .map((shippingOption) => {
      const calculatedPrice = shippingOption.calculated_price

      if (!calculatedPrice) {
        return
      }

      const validCurrencyPrices = shippingOption.prices.filter(
        (price) =>
          price.currency_code === cart.currency_code &&
          (price.price_rules || []).some(
            (priceRule) => priceRule.attribute === "item_total"
          )
      )

      return validCurrencyPrices.map((price) => {
        return {
          ...price,
          shipping_option_id: shippingOption.id,
          ...computeTarget(cart, price),
        }
      })
    })
    .flat(1)
    .filter(Boolean)
    .find((price) => price?.amount === 0)

  if (!freeShippingPrice) {
    return
  }

  if (variant === "popup") {
    return <FreeShippingPopup cart={cart} price={freeShippingPrice} />
  } else {
    return <FreeShippingInline cart={cart} price={freeShippingPrice} />
  }
}

/* =========================================================================
   🌸 INLINE DESIGN METHOD (TIGHT MATRIX)
   ========================================================================= */
function FreeShippingInline({
  cart,
  price,
}: {
  cart: StoreCart
  price: StorePrice & {
    target_reached: boolean
    target_remaining: number
    remaining_percentage: number
  }
}) {
  return (
    <div className="bg-[#FDF1F6]/60 p-4 rounded-xl border border-[#F0C4D8]/50 font-sans">
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <div className="text-[#3A1A2A]">
            {price.target_reached ? (
              <div className="flex items-center gap-1.5 text-[#D45C88] font-semibold">
                <CheckCircleSolid className="text-[#D45C88] inline-block w-4 h-4" />
                Free Shipping Unlocked! 🌸
              </div>
            ) : (
              `Unlock Free Shipping `
            )}
          </div>

          {!price.target_reached && (
            <div className="text-gray-500 font-sans">
              Only{" "}
              <span className="text-[#3A1A2A] font-semibold">
                {convertToLocale({
                  amount: price.target_remaining,
                  currency_code: cart.currency_code,
                })}
              </span>{" "}
              away
            </div>
          )}
        </div>

        {/* Dynamic Smooth Progress Frame Line */}
        <div className="w-full bg-pink-100/60 h-1.5 rounded-full overflow-hidden">
          <div
            className={clx(
              "h-full bg-linear-to-r from-[#C07090] to-[#D45C88] duration-500 ease-in-out rounded-full",
              {
                "from-[#D45C88] to-[#3A1A2A]": price.target_reached,
              }
            )}
            style={{ width: `${Math.min(100, price.remaining_percentage)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   👑 POPUP COMPONENT METHOD (FLOATING PILL)
   ========================================================================= */
function FreeShippingPopup({
  cart,
  price,
}: {
  cart: StoreCart
  price: StoreFreeShippingPrice
}) {
  const [isClosed, setIsClosed] = useState(false)

  // Auto-hide popup nicely once dynamic target conditions are validated
  const shouldShow = !price.target_reached && !isClosed

  return (
    <div
      className={clx(
        "fixed bottom-6 right-6 flex flex-col items-end gap-2 transition-all duration-300 ease-in-out z-50 max-w-[calc(100vw-32px)] md:max-w-[400px]",
        {
          "opacity-0 scale-95 pointer-events-none": !shouldShow,
          "opacity-100 scale-100": shouldShow,
        }
      )}
    >
      <div>
        {/* 🌸 BOUTIQUE FLOATING CLOSE WINDOW ICON */}
        <button
          className="rounded-full bg-white border border-pink-100 hover:border-[#D45C88] text-gray-500 hover:text-[#D45C88] p-2 shadow-xs cursor-pointer transition-all active:scale-90"
          onClick={() => setIsClosed(true)}
        >
          <XMark className="w-4 h-4" />
        </button>
      </div>

      {/* Main Card Frame Base Container */}
      <div className="w-full bg-white text-[#3A1A2A] p-5 md:p-6 rounded-2xl border border-[#F0C4D8]/60 shadow-lg font-sans">
        <div className="pb-4">
          <div className="space-y-3">
            <div className="flex justify-between text-xs md:text-sm font-medium">
              <div className="text-gray-800 mr-1">Unlock Free Shipping</div>

              <div className="text-gray-500">
                Only{" "}
                <span className="text-[#D45C88] font-semibold font-sans">
                  {convertToLocale({
                    amount: price.target_remaining,
                    currency_code: cart.currency_code,
                  })}
                </span>{" "}
                away
              </div>
            </div>

            {/* Fluid Visual Bar Tracker */}
            <div className="w-full bg-pink-50 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#C07090] to-[#D45C88] duration-500 ease-out rounded-full"
                style={{
                  width: `${Math.min(100, price.remaining_percentage)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* 🛍️ HAVEHER PREMIUM CTA ROUND BUTTON LINE MAPS */}
        <div className="flex gap-3 pt-1">
          <LocalizedClientLink
            className="flex-1 text-center bg-white border border-[#D45C88]/30 hover:border-[#D45C88] text-gray-800 hover:text-[#D45C88] text-xs font-semibold py-2.5 px-4 rounded-full transition-all active:scale-[0.98]"
            href="/cart"
          >
            View Bag
          </LocalizedClientLink>

          <LocalizedClientLink
            className="flex-1 text-center bg-[#D45C88] hover:bg-[#3A1A2A] text-white text-xs font-semibold py-2.5 px-4 rounded-full transition-all shadow-2xs active:scale-[0.98]"
            href="/store"
          >
            View Products
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
