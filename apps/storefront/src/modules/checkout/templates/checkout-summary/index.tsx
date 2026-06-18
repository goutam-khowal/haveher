"use client"

import { Heading } from "@modules/common/components/ui"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-6 py-6 small:py-0 font-sans text-[#3A1A2A]">
      <div className="w-full bg-white flex flex-col p-5 border border-pink-50/50 rounded-2xl shadow-sm">
        <Divider className="my-4 small:hidden" />

        {/* 👑 BRAND STYLE: Luxury heading configuration updates */}
        <Heading
          level="h2"
          className="flex flex-row text-xl font-serif italic font-medium tracking-wide text-[#3A1A2A] items-baseline text-left mb-2"
        >
          In your Cart
        </Heading>
        <div className="h-[2px] w-10 bg-[#D45C88] mb-4"></div>

        {/* 👑 ORDER BREAKDOWN PARAMETERS (Subtotal, Free Shipping Badge Injected) */}
        <CartTotals totals={cart} />

        <Divider className="my-6 border-pink-50/40" />

        {/* Core Safe Rendering Tables Container avoiding nested layer crashes */}
        <div className="w-full select-none max-h-[320px] overflow-y-auto pr-1">
          <ItemsPreviewTemplate cart={cart} />
        </div>

        <Divider className="my-6 border-pink-50/40" />

        <div className="mt-2">
          <DiscountCode cart={cart} />
        </div>
      </div>

      {/* 👑 PREMIUM CONVERSION GAIN: Dynamic trust badges grid panel injected right below the card totals container */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-4 bg-[#FDF1F6]/40 border border-[#F0C4D8]/20 rounded-2xl text-center">
        <div className="flex flex-col items-center justify-center gap-y-1">
          <span className="text-base">🔒</span>
          <span className="text-[10px] sm:text-xs font-bold text-[#3A1A2A]">
            Secure Checkout
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-1">
          <span className="text-base">🚀</span>
          <span className="text-[10px] sm:text-xs font-bold text-[#3A1A2A]">
            Free Shipping
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-1">
          <span className="text-base">🔄</span>
          <span className="text-[10px] sm:text-xs font-bold text-[#3A1A2A]">
            Easy Returns
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-1">
          <span className="text-base">💵</span>
          <span className="text-[10px] sm:text-xs font-bold text-[#3A1A2A]">
            COD Available
          </span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
