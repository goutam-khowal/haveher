// "use client"

// import { Button, Heading } from "@modules/common/components/ui"

// import CartTotals from "@modules/common/components/cart-totals"
// import Divider from "@modules/common/components/divider"
// import DiscountCode from "@modules/checkout/components/discount-code"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import { HttpTypes } from "@medusajs/types"

// type SummaryProps = {
//   cart: HttpTypes.StoreCart
// }

// function getCheckoutStep(cart: HttpTypes.StoreCart) {
//   if (!cart?.shipping_address?.address_1 || !cart.email) {
//     return "address"
//   } else if (cart?.shipping_methods?.length === 0) {
//     return "delivery"
//   } else {
//     return "payment"
//   }
// }

// const Summary = ({ cart }: SummaryProps) => {
//   const step = getCheckoutStep(cart)

//   return (
//     <div className="flex flex-col gap-y-4">
//       <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
//         Summary
//       </Heading>
//       <DiscountCode cart={cart} />
//       <Divider />
//       <CartTotals totals={cart} />
//       <LocalizedClientLink
//         href={"/checkout?step=" + step}
//         data-testid="checkout-button"
//       >
//         <Button className="w-full h-10">Go to checkout</Button>
//       </LocalizedClientLink>
//     </div>
//   )
// }

// export default Summary
"use client"

import { Button, Heading } from "@modules/common/components/ui"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  // 👑 FIXED: Metadata validation matrix parsing
  const isGiftApplied = !!cart?.metadata?.is_gift

  // Custom deep clone context overrides to manipulate total render safely without altering core structure directly inside core component
  const customizedCartTotals = {
    ...cart,
    total: isGiftApplied ? (cart.total || 0) + 20 : cart.total,
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />

      {/* 👑 FIXED: Updated injected custom object total totals property mapping */}
      <CartTotals totals={customizedCartTotals} />

      {/* 👑 ADDITIONAL COMPILATION LOGIC: UI verification if gift is tracked */}
      {isGiftApplied && (
        <div className="flex justify-between items-center text-sm px-1 text-pink-600 bg-pink-50/50 border border-pink-100/40 p-2 rounded-xl">
          <span>🎁 Premium Gifting Option Included</span>
          <span className="font-bold">+ ₹20.00</span>
        </div>
      )}

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-10">Go to checkout</Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
