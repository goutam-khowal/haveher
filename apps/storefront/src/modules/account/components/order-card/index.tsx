// import { Button } from "@modules/common/components/ui"
// import { useMemo } from "react"

// import Thumbnail from "@modules/products/components/thumbnail"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import { convertToLocale } from "@lib/util/money"
// import { HttpTypes } from "@medusajs/types"

// type OrderCardProps = {
//   order: HttpTypes.StoreOrder
// }

// const OrderCard = ({ order }: OrderCardProps) => {
//   const numberOfLines = useMemo(() => {
//     return (
//       order.items?.reduce((acc, item) => {
//         return acc + item.quantity
//       }, 0) ?? 0
//     )
//   }, [order])

//   const numberOfProducts = useMemo(() => {
//     return order.items?.length ?? 0
//   }, [order])

//   // Extract the premium boutique billing custom ID safely from the backend metadata object
//   const customInvoiceId = (order.metadata as Record<string, any> | undefined)
//     ?.custom_invoice_id

//   // Extract the Razorpay invoice URL directly from the order metadata
//   const invoiceUrl = (order.metadata as Record<string, any> | undefined)
//     ?.razorpay_invoice_url

//   return (
//     <div
//       className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs flex flex-col mb-4 transition-all hover:border-gray-200"
//       data-testid="order-card"
//     >
//       {/* HEADER SECTION: Displays boutique brand format tracking IDs smoothly */}
//       <div
//         className="text-base font-bold text-gray-900 mb-1"
//         data-testid="order-display-id"
//       >
//         {customInvoiceId ? (
//           <span className="text-berry-primary tracking-wide">
//             {customInvoiceId}
//           </span>
//         ) : (
//           <span>#{order.display_id}</span>
//         )}
//       </div>

//       <div className="flex items-center divide-x divide-gray-200 text-xs font-medium text-gray-500">
//         <span className="pr-2" data-testid="order-created-at">
//           {new Date(order.created_at).toDateString()}
//         </span>
//         <span
//           className="px-2 text-gray-900 font-semibold"
//           data-testid="order-amount"
//         >
//           {convertToLocale({
//             amount: order.total,
//             currency_code: order.currency_code,
//           })}
//         </span>
//         <span className="pl-2">{`${numberOfLines} ${
//           numberOfLines > 1 ? "items" : "item"
//         }`}</span>
//       </div>

//       {/* PRODUCT VARIANT IMAGE ITERATIONS */}
//       <div className="grid grid-cols-2 small:grid-cols-4 gap-4 my-6">
//         {order.items?.slice(0, 3).map((i) => {
//           return (
//             <div
//               key={i.id}
//               className="flex flex-col gap-y-2 border border-gray-50 rounded-xl p-2 bg-gray-50/30"
//               data-testid="order-item"
//             >
//               <Thumbnail
//                 thumbnail={i.thumbnail}
//                 images={[]}
//                 size="full"
//                 className="rounded-lg overflow-hidden"
//               />
//               <div className="flex flex-col text-xs mt-1">
//                 <span
//                   className="text-gray-800 font-semibold truncate max-w-full"
//                   data-testid="item-title"
//                 >
//                   {i.title}
//                 </span>
//                 <span className="text-gray-400 font-medium mt-0.5">
//                   Qty:{" "}
//                   <span
//                     data-testid="item-quantity"
//                     className="text-gray-600 font-semibold"
//                   >
//                     {i.quantity}
//                   </span>
//                 </span>
//               </div>
//             </div>
//           )
//         })}

//         {numberOfProducts > 4 && (
//           <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-xl bg-gray-50/10">
//             <span className="text-xs font-bold text-berry-primary">
//               + {numberOfLines - 4}
//             </span>
//             <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 mt-0.5">
//               more
//             </span>
//           </div>
//         )}
//       </div>

//       {/* FOOTER ACTIONS SECTION: Balanced layout featuring Razorpay PDF on the left and Medusa details on the right */}
//       <div className="flex justify-between items-center border-t border-gray-50 pt-4 mt-2">
//         {invoiceUrl ? (
//           <a
//             href={invoiceUrl as string}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-x-1.5 text-xs font-bold text-berry-primary hover:underline"
//           >
//             <svg
//               className="w-3.5 h-3.5 stroke-current fill-none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
//               />
//             </svg>
//             Invoice PDF
//           </a>
//         ) : (
//           <div /> /* Flex spacing node placeholder if no invoice has generated yet */
//         )}

//         <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
//           <Button
//             data-testid="order-details-link"
//             className="rounded-full px-5 py-2 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border-0"
//           >
//             See details
//           </Button>
//         </LocalizedClientLink>
//       </div>
//     </div>
//   )
// }

// export default OrderCard
"use client"

import { Button } from "@modules/common/components/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  const customInvoiceId = (order.metadata as Record<string, any> | undefined)
    ?.custom_invoice_id

  const invoiceUrl = (order.metadata as Record<string, any> | undefined)
    ?.razorpay_invoice_url

  return (
    <div
      className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs flex flex-col mb-4 transition-all hover:border-gray-200 font-sans text-left"
      data-testid="order-card"
    >
      {/* HEADER SECTION: Displays precise raw database order references cleanly */}
      <div className="flex flex-col text-left mb-2">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          Order ID
        </span>
        <div
          className="text-sm font-mono font-semibold text-[#3A1A2A] mt-0.5 select-all"
          data-testid="order-display-id"
        >
          {customInvoiceId ? (
            <span className="text-[#D45C88] tracking-wide">
              {customInvoiceId}
            </span>
          ) : (
            // 👑 CHANGED: Swapped simple integer #display_id directly with raw order.id hash
            <span>{order.id}</span>
          )}
        </div>
      </div>

      <div className="flex items-center divide-x divide-gray-200 text-xs font-medium text-gray-500">
        <span className="pr-2" data-testid="order-created-at">
          {new Date(order.created_at).toDateString()}
        </span>
        <span
          className="px-2 text-gray-900 font-semibold"
          data-testid="order-amount"
        >
          {convertToLocale({
            amount: order.total,
            currency_code: order.currency_code,
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "items" : "item"
        }`}</span>
      </div>

      {/* PRODUCT THUMBNAILS CONTAINER */}
      <div className="grid grid-cols-2 small:grid-cols-4 gap-4 my-6">
        {order.items?.slice(0, 3).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-y-2 border border-gray-50 rounded-xl p-2 bg-gray-50/30"
              data-testid="order-item"
            >
              <Thumbnail
                thumbnail={i.thumbnail}
                images={[]}
                size="full"
                className="rounded-lg overflow-hidden"
              />
              <div className="flex flex-col text-xs mt-1">
                <span
                  className="text-gray-800 font-semibold truncate max-w-full"
                  data-testid="item-title"
                >
                  {i.title}
                </span>
                <span className="text-gray-400 font-medium mt-0.5">
                  Qty:{" "}
                  <span
                    data-testid="item-quantity"
                    className="text-gray-600 font-semibold"
                  >
                    {i.quantity}
                  </span>
                </span>
              </div>
            </div>
          )
        })}

        {numberOfProducts > 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-xl bg-gray-50/10">
            <span className="text-xs font-bold text-[#D45C88]">
              + {numberOfLines - 4}
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 mt-0.5">
              more
            </span>
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-between items-center border-t border-gray-50 pt-4 mt-2">
        {invoiceUrl ? (
          <a
            href={invoiceUrl as string}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-x-1.5 text-xs font-bold text-[#D45C88] hover:underline"
          >
            <svg
              className="w-3.5 h-3.5 stroke-current fill-none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Invoice PDF
          </a>
        ) : (
          <div />
        )}

        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button
            data-testid="order-details-link"
            className="rounded-full px-5 py-2 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border-0 cursor-pointer"
          >
            See details
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
