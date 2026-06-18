// import { Metadata } from "next"

// import OrderOverview from "@modules/account/components/order-overview"
// import { notFound } from "next/navigation"
// import { listOrders } from "@lib/data/orders"
// import Divider from "@modules/common/components/divider"
// import TransferRequestForm from "@modules/account/components/transfer-request-form"

// export const metadata: Metadata = {
//   title: "Orders",
//   description: "Overview of your previous orders.",
// }

// export default async function Orders() {
//   const orders = await listOrders()

//   if (!orders) {
//     notFound()
//   }

//   return (
//     <div className="w-full" data-testid="orders-page-wrapper">
//       <div className="mb-8 flex flex-col gap-y-4">
//         <h1 className="text-2xl-semi">Orders</h1>
//         <p className="text-base-regular">
//           View your previous orders and their status. You can also create
//           returns or exchanges for your orders if needed.
//         </p>
//       </div>
//       <div>
//         <OrderOverview orders={orders} />
//         <Divider className="mb-8 mt-8" />
//         <TransferRequestForm />
//       </div>
//     </div>
//   )
// }
import { Metadata } from "next"
import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import Divider from "@modules/common/components/divider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Orders | HaveHer Couture",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full font-sans text-[#3A1A2A]" data-testid="orders-page-wrapper">
      {/* 👑 PREMIUM HEADLINE STRUCTURE */}
      <div className="mb-8 border-b border-pink-50/50 pb-5 text-left">
        <h1 className="text-2xl font-serif italic tracking-wide text-[#3A1A2A] mb-1">
          My Orders
        </h1>
        <p className="text-xs text-gray-400 uppercase tracking-wider">
          View your premium boutique purchase log and tracking status
        </p>
      </div>

      <div>
        {/* Render Order Cards Streams */}
        <OrderOverview orders={orders} />
      </div>
    </div>
  )
}