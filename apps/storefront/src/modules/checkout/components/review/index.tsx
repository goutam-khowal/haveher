// "use client"

// import { Heading, Text, clx } from "@modules/common/components/ui"

// import PaymentButton from "../payment-button"
// import { useSearchParams } from "next/navigation"
// import { HttpTypes } from "@medusajs/types"

// const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
//   const searchParams = useSearchParams()

//   const isOpen = searchParams.get("step") === "review"

//   const paidByGiftcard = !!(
//     (cart as unknown as Record<string, unknown>)?.gift_cards && ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 && cart?.total === 0
//   )

//   const previousStepsCompleted =
//     cart.shipping_address &&
//     (cart.shipping_methods?.length ?? 0) > 0 &&
//     (cart.payment_collection || paidByGiftcard)

//   return (
//     <div className="bg-white">
//       <div className="flex flex-row items-center justify-between mb-6">
//         <Heading
//           level="h2"
//           className={clx(
//             "flex flex-row text-3xl-regular gap-x-2 items-baseline",
//             {
//               "opacity-50 pointer-events-none select-none": !isOpen,
//             }
//           )}
//         >
//           Review
//         </Heading>
//       </div>
//       {isOpen && previousStepsCompleted && (
//         <>
//           <div className="flex items-start gap-x-1 w-full mb-6">
//             <div className="w-full">
//               <Text className="txt-medium-plus text-ui-fg-base mb-1">
//                 By clicking the Place Order button, you confirm that you have
//                 read, understand and accept our Terms of Use, Terms of Sale and
//                 Returns Policy and acknowledge that you have read Medusa
//                 Store&apos;s Privacy Policy.
//               </Text>
//             </div>
//           </div>
//           <PaymentButton cart={cart} data-testid="submit-order-button" />
//         </>
//       )}
//     </div>
//   )
// }

// export default Review
"use client"

import { Heading, Text, clx } from "@modules/common/components/ui"
import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards &&
    ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])
      ?.length > 0 &&
    cart?.total === 0
  )

  const previousStepsCompleted =
    cart.shipping_address &&
    (cart.shipping_methods?.length ?? 0) > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    // 👑 FIXED UNIFORM SPACER: Added padding block matrices to completely eliminate sticky bounds
    <div className="bg-white px-4 py-6 md:p-8 rounded-2xl border border-pink-50/50 shadow-sm font-sans text-[#3A1A2A]">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-xl font-serif italic font-medium tracking-wide gap-x-2 items-baseline text-[#3A1A2A]",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Review
        </Heading>
      </div>

      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6 text-left">
            <div className="w-full">
              <Text className="text-sm text-gray-600 leading-relaxed">
                By clicking the Place Order button, you confirm that you have
                read, understand and accept our Terms of Use, Terms of Sale and
                Returns Policy and acknowledge that you have read Medusa
                Store&apos;s Privacy Policy.
              </Text>
            </div>
          </div>

          {/* Dynamic Razorpay integration triggers pipeline */}
          <div className="w-full">
            <PaymentButton cart={cart} data-testid="submit-order-button" />
          </div>
        </>
      )}
    </div>
  )
}

export default Review
