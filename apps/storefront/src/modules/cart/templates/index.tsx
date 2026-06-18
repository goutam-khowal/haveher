"use client"

import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#3A1A2A] pt-4 pb-20">
      <div
        className="content-container max-w-6xl mx-auto px-4 md:px-6"
        data-testid="cart-container"
      >
        {cart?.items?.length ? (
          <div className="w-full">
            {/* 👑 PREMIUM HEADLINE BLOCK */}
            <div className="border-b border-pink-100/60 pb-4 mb-8">
              <h1 className="font-serif italic text-2xl md:text-3xl text-[#3A1A2A] font-medium tracking-wide">
                Shopping Bag 🌸
              </h1>
              <p className="text-xs text-gray-400 font-sans mt-1">
                Review your selected artisan silhouettes before checkout.
              </p>
            </div>

            {/* RESPONSIVE BOUTIQUE MULTI-COLUMN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12 items-start">
              {/* LEFT COLUMN: Items List Matrix & Auth Banner (7 Columns) */}
              <div className="lg:col-span-7 flex flex-col gap-y-6 w-full">
                {!customer && (
                  <div className="bg-[#FDF1F6]/40 border border-[#F0C4D8]/30 rounded-2xl p-1 shadow-3xs transition-all duration-300">
                    <SignInPrompt />
                  </div>
                )}

                {/* Real Live Dynamic Item Mapping Thread */}
                <div className="w-full bg-white">
                  <ItemsTemplate cart={cart} />
                </div>
              </div>

              {/* RIGHT COLUMN: Sticky Luxury Summary Check Frame (5 Columns) */}
              <div className="lg:col-span-5 w-full lg:sticky lg:top-28">
                {cart && cart.region && (
                  <div className="bg-white border border-pink-100/80 p-5 md:p-6 rounded-2xl shadow-[0_10px_30px_rgba(212,92,136,0.03)]">
                    <Summary cart={cart} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Empty State Viewport Wrapper */
          <div className="min-h-[60vh] flex items-center justify-center">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
