// import { listCartShippingMethods } from "@lib/data/fulfillment"
// import { listCartPaymentMethods } from "@lib/data/payment"
// import { HttpTypes } from "@medusajs/types"
// import Addresses from "@modules/checkout/components/addresses"
// import Payment from "@modules/checkout/components/payment"
// import Review from "@modules/checkout/components/review"
// import Shipping from "@modules/checkout/components/shipping"

// export default async function CheckoutForm({
//   cart,
//   customer,
// }: {
//   cart: HttpTypes.StoreCart | null
//   customer: HttpTypes.StoreCustomer | null
// }) {
//   if (!cart) {
//     return null
//   }

//   const shippingMethods = await listCartShippingMethods(cart.id)
//   const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

//   if (!shippingMethods || !paymentMethods) {
//     return null
//   }

//   return (
//     <div className="w-full grid grid-cols-1 gap-y-8">
//       <Addresses cart={cart} customer={customer} />

//       <Shipping cart={cart} availableShippingMethods={shippingMethods} />

//       <Payment cart={cart} availablePaymentMethods={paymentMethods} />

//       <Review cart={cart} />
//     </div>
//   )
// }
import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-8 font-sans text-[#3A1A2A]">
      {/* Checkout Operational Core Steps */}
      <Addresses cart={cart} customer={customer} />

      <Shipping cart={cart} availableShippingMethods={shippingMethods} />

      <Payment cart={cart} availablePaymentMethods={paymentMethods} />

      <Review cart={cart} />

      {/* =========================================================================
         👑 SHIFTED TRUST BADGES: Relocated here at the very bottom of the checkout flow
         ========================================================================= */}
      <div className="mt-8 pt-8 border-t border-pink-50/50 w-full flex flex-col items-center justify-center gap-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-xl py-4 px-6 bg-[#FDF1F6]/30 border border-[#F0C4D8]/20 rounded-2xl text-center shadow-3xs">
          <div className="flex flex-col items-center justify-center gap-y-1">
            <span className="text-lg">🔒</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#3A1A2A]">
              Secure Checkout
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-1">
            <span className="text-lg">🚀</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#3A1A2A]">
              Free Shipping
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-1">
            <span className="text-lg">🔄</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#3A1A2A]">
              Easy Returns
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-1">
            <span className="text-lg">💵</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#3A1A2A]">
              COD Available
            </span>
          </div>
        </div>

        {/* Fine-print Transaction Assurance Label */}
        <p className="text-[9px] text-gray-400 text-center tracking-widest uppercase opacity-75">
          Guaranteed Safe Checkout processed via Razorpay API Secure Engine
        </p>
      </div>
    </div>
  )
}
