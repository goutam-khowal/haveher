import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    if (!str) return "N/A"
    const formatted = str.split("_").join(" ")
    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  // Safe data-extraction lookup for your custom boutique ID parameter string
  const customInvoiceId = (order.metadata as Record<string, any> | undefined)
    ?.custom_invoice_id

  // Extract the Razorpay invoice URL directly from the order metadata
  const metadata = (order.metadata as Record<string, any> | undefined) ?? {}
  const invoiceUrl = metadata.razorpay_invoice_url

  return (
    <div className="flex flex-col gap-y-4">
      {/* 1. Email Notification Receipt Block */}
      <Text className="text-gray-600 text-sm">
        We have sent the order confirmation details to{" "}
        <span className="text-gray-900 font-semibold" data-testid="order-email">
          {order.email}
        </span>
        .
      </Text>

      {/* 2. Order Date Metadata Row */}
      <Text className="text-gray-600 text-sm">
        Order date:{" "}
        <span data-testid="order-date" className="text-gray-900 font-medium">
          {new Date(order.created_at).toDateString()}
        </span>
      </Text>

      {/* 3. FIXED ORDER NUMBER: Swaps out flat numbers for boutique tracking codes */}
      <Text className="text-sm font-medium text-gray-600">
        Order number:{" "}
        <span
          data-testid="order-id"
          className="text-berry-primary font-bold tracking-wide text-base"
        >
          {customInvoiceId ? customInvoiceId : order.display_id}
        </span>
      </Text>

      {/* 4. RAZORPAY INVOICE PDF DOWNLOAD TRIGGER */}
      {invoiceUrl && (
        <div className="mt-1 text-left">
          <a
            href={invoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-x-2 text-xs font-bold text-berry-primary bg-berry-light/5 hover:bg-berry-light/10 px-4 py-2.5 rounded-full border border-berry-primary/20 transition-all shadow-2xs"
          >
            {/* Download Paper Sheet Minimalist Vector Icon Line */}
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
            Download Tax Invoice (GST)
          </a>
        </div>
      )}

      {/* 5. Transaction & Fulfillment Status Badge Feeds */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-xs font-medium text-gray-500 border-t border-gray-50 pt-4">
        {showStatus && (
          <>
            <div className="flex items-center gap-x-1.5">
              <span className="text-gray-400">Order status:</span>{" "}
              <span
                className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider"
                data-testid="order-status"
              >
                {formatStatus(order.fulfillment_status)}
              </span>
            </div>

            <div className="flex items-center gap-x-1.5">
              <span className="text-gray-400">Payment status:</span>{" "}
              <span
                className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1"
                data-testid="order-payment-status"
              >
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                {formatStatus(order.payment_status)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
