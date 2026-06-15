// "use client"

// import { isManual, isStripeLike } from "@lib/constants"
// import { placeOrder } from "@lib/data/cart"
// import { HttpTypes } from "@medusajs/types"
// import { Button } from "@modules/common/components/ui"
// import { useElements, useStripe } from "@stripe/react-stripe-js"
// import React, { useState } from "react"
// import ErrorMessage from "../error-message"

// type PaymentButtonProps = {
//   cart: HttpTypes.StoreCart
//   "data-testid": string
// }

// const PaymentButton: React.FC<PaymentButtonProps> = ({
//   cart,
//   "data-testid": dataTestId,
// }) => {
//   const notReady =
//     !cart ||
//     !cart.shipping_address ||
//     !cart.billing_address ||
//     !cart.email ||
//     (cart.shipping_methods?.length ?? 0) < 1

//   const paymentSession = cart.payment_collection?.payment_sessions?.[0]

//   switch (true) {
//     case isStripeLike(paymentSession?.provider_id):
//       return (
//         <StripePaymentButton
//           notReady={notReady}
//           cart={cart}
//           data-testid={dataTestId}
//         />
//       )
//     case isManual(paymentSession?.provider_id):
//       return (
//         <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
//       )
//     default:
//       return <Button disabled>Select a payment method</Button>
//   }
// }
"use client"

import { isManual, isStripeLike } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isStripeLike(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    // Route Razorpay to the real frontend component
    case paymentSession?.provider_id === "pp_razorpay_razorpay":
      return (
        <RazorpayPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      )
    default:
      return <Button disabled>Select a payment method</Button>
  }
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const disabled = !stripe || !elements ? true : false

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

const RazorpayPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    // Find the active Razorpay session generated by the backend
    const session = cart.payment_collection?.payment_sessions?.find(
      (s) => s.status === "pending"
    )

    if (!session) {
      setErrorMessage("Payment session missing. Please refresh the page.")
      setSubmitting(false)
      return
    }

    // Configure the Razorpay Gateway Popup
    const options = {
      // NOTE: Ensure your NEXT_PUBLIC_RAZORPAY_KEY is set in your storefront .env.local file!
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "YOUR_TEST_KEY_HERE",
      amount: session.amount,
      currency: session.currency_code?.toUpperCase() || "INR",
      name: "HaveHer",
      description: "Premium Fashion Checkout",
      order_id: session.data.id as string, // This passes the "order_Sqx..." ID to Razorpay
      handler: function (response: any) {
        // If Razorpay succeeds, tell the Medusa backend to finalize the order
        onPaymentCompleted()
      },
      prefill: {
        name: `${cart.billing_address?.first_name} ${cart.billing_address?.last_name}`,
        email: cart.email,
        contact: cart.billing_address?.phone || cart.shipping_address?.phone,
      },
      theme: {
        color: "#D45C88", // Your HaveHer Brand Color!
      },
    }

    try {
      const rzp = new (window as any).Razorpay(options)
      rzp.on("payment.failed", function (response: any) {
        setErrorMessage(response.error.description)
        setSubmitting(false)
      })
      rzp.open()
    } catch (err) {
      setErrorMessage(
        "Failed to load Razorpay. Please check your internet connection."
      )
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Next.js strict script loading for Razorpay */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      <Button
        disabled={notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Pay with Razorpay
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="razorpay-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
