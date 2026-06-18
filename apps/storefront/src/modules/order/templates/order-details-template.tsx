// "use client"

// import { XMark } from "@medusajs/icons"
// import { HttpTypes } from "@medusajs/types"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import Help from "@modules/order/components/help"
// import Items from "@modules/order/components/items"
// import OrderDetails from "@modules/order/components/order-details"
// import OrderSummary from "@modules/order/components/order-summary"
// import ShippingDetails from "@modules/order/components/shipping-details"
// import React from "react"

// type OrderDetailsTemplateProps = {
//   order: HttpTypes.StoreOrder
// }

// const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
//   order,
// }) => {
//   return (
//     <div className="flex flex-col justify-center gap-y-4">
//       <div className="flex gap-2 justify-between items-center">
//         <h1 className="text-2xl-semi">Order details</h1>
//         <LocalizedClientLink
//           href="/account/orders"
//           className="flex gap-2 items-center text-ui-fg-subtle hover:text-ui-fg-base"
//           data-testid="back-to-overview-button"
//         >
//           <XMark /> Back to overview
//         </LocalizedClientLink>
//       </div>
//       <div
//         className="flex flex-col gap-4 h-full bg-white w-full"
//         data-testid="order-details-container"
//       >
//         <OrderDetails order={order} showStatus />
//         <Items order={order} />
//         <ShippingDetails order={order} />
//         <OrderSummary order={order} />
//         <Help />
//       </div>
//     </div>
//   )
// }

// export default OrderDetailsTemplate
// 🔍 Modules/order/components/order-details/index.tsx file open karke ye target markup update karo:
return (
  <div className="w-full flex flex-col text-left font-sans text-[#3A1A2A]">
    {/* Existing text layout nodes */}
    <Text className="text-gray-400 uppercase tracking-wider text-[11px] font-bold mb-1">
      Order ID
    </Text>
    {/* 👑 CHANGED: Force direct database key mapping layout string */}
    <Heading
      level="h2"
      className="text-base sm:text-lg font-bold text-[#3A1A2A] select-all"
    >
      {order.id}
    </Heading>

    {/* Rest of order dates mapping and fulfillment status trackers badges */}
  </div>
)
