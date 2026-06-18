import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CartTemplate from "@modules/cart/templates"
import GiftingOption from "@modules/cart/components/gifting-option" // 🌸 Import our premium gifting module
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

export default async function Cart() {
  const cart = await retrieveCart().catch((error) => {
    console.error(error)
    return notFound()
  })

  const customer = await retrieveCustomer()

  return (
    <div className="w-full bg-white font-sans text-[#3A1A2A]">
      {/* Main native Medusa Cart list templates (Items grid layout wrapper) */}
      <CartTemplate cart={cart} customer={customer} />

      {/* 👑 PREMIUM HAVERHER GIFTING SECTION INJECTION */}
      {/* Rendered beautifully at the bottom container of the items block inside full layout container constraints */}
      {cart && cart.items && cart.items.length > 0 && (
        <div className="content-container mx-auto max-w-5xl pb-16 px-4">
          <div className="w-full grid grid-cols-1 small:grid-cols-[1fr_380px] gap-x-8">
            {/* Left Column stack area below products lines */}
            <div className="w-full">
              <GiftingOption />
            </div>
            {/* Right Column spacing placeholder line to perfectly match Medusa summary block symmetry */}
            <div className="hidden small:block w-full"></div>
          </div>
        </div>
      )}
    </div>
  )
}
