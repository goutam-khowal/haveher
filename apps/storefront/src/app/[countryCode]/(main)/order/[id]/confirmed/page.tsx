import { retrieveOrder } from "@lib/data/orders"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { Metadata } from "next"
import { sdk } from "@lib/config" // FIXED: Importing the direct static sdk object instance

type Props = {
  params: Promise<{ 
    id: string
    countryCode: string 
  }>
}

export const metadata: Metadata = {
  title: "Order Confirmed | HaveHer",
  description: "Your purchase was successful.",
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

// Safe SDK-backed lookup helper using the official store retrieval method
async function fetchOrderWithSdk(id: string) {
  try {
    // Uses Medusa v2 SDK core schema validation wrapper instead of a raw manual string fetch
    const response = await sdk.store.order.retrieve(id, {}, {
      next: { revalidate: 0 } // Prevent Next.js caching layers from serving stale empty results
    })
    return response.order
  } catch (err) {
    console.error(`SDK retrieval attempt failed for order query (${id}):`, err)
    return null
  }
}

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params
  const targetId = params.id

  let order = null
  let attempts = 0
  const maxAttempts = 5

  console.log(`Verifying HaveHer purchase confirmation event for ID string: ${targetId}`)

  while (!order && attempts < maxAttempts) {
    if (targetId.startsWith("order_")) {
      // Query the official endpoint using the formal SDK store instance layout
      order = await fetchOrderWithSdk(targetId)
    } else {
      // Fallback lookup using standard starter template parameters (e.g., cart IDs)
      order = await retrieveOrder(targetId).catch(() => null)
    }

    if (!order) {
      attempts++
      console.log(`Database synchronization pending (Attempt ${attempts}/${maxAttempts}). Retrying entry lookups...`)
      await delay(1500)
    }
  }

  // Fallback loading interface if network latency delays data persistence
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-12 h-12 border-4 border-berry-primary border-t-transparent rounded-full animate-spin mb-6"></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Finalizing Order Review</h1>
        <p className="text-sm text-gray-500 max-w-sm">
          Your transaction was authorized successfully! We are rendering your tracking documentation. 
          This view will complete automatically in a brief moment.
        </p>
        <script dangerouslySetInnerHTML={{ __html: `setTimeout(() => { window.location.reload(); }, 4000);` }} />
      </div>
    )
  }

  console.log(`Success! Resolved validated order records for tracking reference: ${order.id}`)
  return <OrderCompletedTemplate order={order} />
}