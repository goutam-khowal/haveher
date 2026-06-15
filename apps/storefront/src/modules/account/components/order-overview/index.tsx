"use client"

import { Button } from "@modules/common/components/ui"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      // FIXED: Adjusted spacing gap vertical configurations to sit perfectly with card containers
      <div className="flex flex-col gap-y-4 w-full">
        {orders.map((o) => (
          <div key={o.id} className="w-full">
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-3 py-12 text-center"
      data-testid="no-orders-container"
    >
      <h2 className="text-xl font-bold text-gray-900">Nothing to see here</h2>
      <p className="text-sm text-gray-500 max-w-xs">
        You don&apos;t have any orders yet, let us change that {":)"}
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button
            data-testid="continue-shopping-button"
            className="rounded-full bg-berry-primary text-white font-semibold px-6 py-3 border-0 shadow-md hover:bg-berry-dark transition-colors"
          >
            Continue shopping
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
