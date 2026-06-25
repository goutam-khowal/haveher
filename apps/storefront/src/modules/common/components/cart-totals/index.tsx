// "use client"

// import { convertToLocale } from "@lib/util/money"
// import React from "react"

// type CartTotalsProps = {
//   totals: {
//     total?: number | null
//     subtotal?: number | null
//     tax_total?: number | null
//     currency_code: string
//     item_subtotal?: number | null
//     shipping_subtotal?: number | null
//     discount_subtotal?: number | null
//   }
// }

// const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
//   const { currency_code, total, item_subtotal, discount_subtotal } = totals

//   return (
//     <div className="w-full font-sans text-[#3A1A2A]">
//       <div className="flex flex-col gap-y-3 txt-medium text-ui-fg-subtle">
//         {/* 👑 CLEANED SUBTOTAL: Brackets text completely expelled from rendering */}
//         <div className="flex items-center justify-between">
//           <span>Subtotal</span>
//           <span
//             data-testid="cart-subtotal"
//             data-value={item_subtotal || 0}
//             className="font-medium text-[#3A1A2A]"
//           >
//             {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
//           </span>
//         </div>

//         {/* 👑 FORCED FREE SHIPPING: Hardcoded text element for luxury boutique feeling */}
//         <div className="flex items-center justify-between">
//           <span>Shipping</span>
//           <span
//             data-testid="cart-shipping"
//             data-value={0}
//             className="text-emerald-600 font-bold uppercase tracking-widest text-xs"
//           >
//             FREE
//           </span>
//         </div>

//         {/* 👑 DISCOUNTS LOGIC (IF ACTIVE) */}
//         {!!discount_subtotal && (
//           <div className="flex items-center justify-between">
//             <span>Discount</span>
//             <span
//               className="text-ui-fg-interactive font-medium"
//               data-testid="cart-discount"
//               data-value={discount_subtotal || 0}
//             >
//               -{" "}
//               {convertToLocale({
//                 amount: discount_subtotal ?? 0,
//                 currency_code,
//               })}
//             </span>
//           </div>
//         )}

//         {/* 👑 TAXES BLOCKED: Entire taxes row block removed completely according to requirements */}
//       </div>

//       <div className="h-px w-full border-b border-gray-100 my-4" />

//       {/* GRAND TOTAL ROW */}
//       <div className="flex items-center justify-between text-[#3A1A2A] mb-2 txt-medium">
//         <span className="font-serif italic text-base tracking-wide">
//           Total Amount
//         </span>
//         <span
//           className="txt-xlarge-plus font-bold text-lg text-[#3A1A2A]"
//           data-testid="cart-total"
//           data-value={total || 0}
//         >
//           {convertToLocale({ amount: total ?? 0, currency_code })}
//         </span>
//       </div>

//       <div className="h-px w-full border-b border-gray-100 mt-4" />

//       {/* =========================================================================
//          👑 SHIFTED SECURE CHECKOUT: Positioned perfectly at the very bottom node
//          ========================================================================= */}
//       <div className="mt-6 pt-4 flex flex-col items-center justify-center gap-y-1.5 opacity-80">
//         <div className="flex items-center gap-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
//           <svg
//             className="w-3.5 h-3.5 text-emerald-500 fill-current"
//             viewBox="0 0 24 24"
//           >
//             <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
//           </svg>
//           <span>100% Secure Checkout</span>
//         </div>
//         <p className="text-[9px] text-gray-400 text-center tracking-wider max-w-xs leading-normal">
//           Guaranteed safe checkout transactions processed via Razorpay Secure
//           Gateway
//         </p>
//       </div>
//     </div>
//   )
// }

// export default CartTotals

"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
    metadata?: Record<string, any> | null // 👑 Type expand karo metadata read karne ke liye
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const { currency_code, total, item_subtotal, discount_subtotal, metadata } =
    totals

  // 👑 STRICT MATHEMATICAL ACCURACY OVERRIDE
  const isGiftApplied = !!metadata?.is_gift

  // Agar display par subtotal aur total match ho rahe hain tabhi ₹20 add karo, warna absolute standard check lagao
  const finalTotal =
    isGiftApplied && total === item_subtotal ? (total || 0) + 20 : total || 0

  return (
    <div className="w-full font-sans text-[#3A1A2A]">
      <div className="flex flex-col gap-y-3 txt-medium text-ui-fg-subtle">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span
            data-testid="cart-subtotal"
            data-value={item_subtotal || 0}
            className="font-medium text-[#3A1A2A]"
          >
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span
            data-testid="cart-shipping"
            data-value={0}
            className="text-emerald-600 font-bold uppercase tracking-widest text-xs"
          >
            FREE
          </span>
        </div>

        {/* 👑 PREMIUM GIFTING OPTION ROW (UI BREAKUP DISPLAY) */}
        {isGiftApplied && (
          <div className="flex items-center justify-between text-sm text-[#D45C88] font-medium animate-fadeIn">
            <span>🎁 Premium Gifting Option</span>
            <span>{convertToLocale({ amount: 20, currency_code })}</span>
          </div>
        )}

        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className="text-ui-fg-interactive font-medium"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}
      </div>

      <div className="h-px w-full border-b border-gray-100 my-4" />

      {/* GRAND TOTAL ROW */}
      <div className="flex items-center justify-between text-[#3A1A2A] mb-2 txt-medium">
        <span className="font-serif italic text-base tracking-wide">
          Total Amount
        </span>
        <span
          className="txt-xlarge-plus font-bold text-lg text-[#3A1A2A]"
          data-testid="cart-total"
          data-value={finalTotal}
        >
          {/* 👑 LOCKED TOTAL: Render original total + ₹20 helper mapping */}
          {convertToLocale({ amount: finalTotal, currency_code })}
        </span>
      </div>

      <div className="h-px w-full border-b border-gray-100 mt-4" />

      <div className="mt-6 pt-4 flex flex-col items-center justify-center gap-y-1.5 opacity-80">
        <div className="flex items-center gap-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <svg
            className="w-3.5 h-3.5 text-emerald-500 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          <span>100% Secure Checkout</span>
        </div>
        <p className="text-[9px] text-gray-400 text-center tracking-wider max-w-xs leading-normal">
          Guaranteed safe checkout transactions processed via Razorpay Secure
          Gateway
        </p>
      </div>
    </div>
  )
}

export default CartTotals
