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
      return (
        <Button
          disabled
          className="w-full rounded-full uppercase tracking-wider text-xs font-bold opacity-50"
        >
          Select a payment method
        </Button>
      )
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

  const disabled = !stripe || !elements

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
      })
  }

  return (
    <div className="w-full flex flex-col gap-y-2">
      <Button
        disabled={disabled || notReady || submitting}
        onClick={handlePayment}
        isLoading={submitting}
        data-testid={dataTestId}
        className="w-full bg-[#D45C88] hover:bg-[#3A1A2A] text-white text-xs font-bold uppercase tracking-widest h-12 rounded-full transition-all cursor-pointer flex items-center justify-center shadow-3xs"
      >
        {submitting ? "Processing Card..." : "Place order 🌸"}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </div>
  )
}

const ManualTestPaymentButton = ({
  notReady,
  "data-testid": dataTestId,
}: {
  notReady: boolean
  "data-testid": string
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

  const handlePayment = () => {
    setSubmitting(true)
    onPaymentCompleted()
  }

  return (
    <div className="w-full flex flex-col gap-y-2">
      <Button
        disabled={notReady || submitting}
        isLoading={submitting}
        onClick={handlePayment}
        data-testid={dataTestId}
        className="w-full bg-[#D45C88] hover:bg-[#3A1A2A] text-white text-xs font-bold uppercase tracking-widest h-12 rounded-full transition-all cursor-pointer flex items-center justify-center shadow-3xs"
      >
        {submitting ? "Placing Order..." : "Place Test Order 🌸"}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </div>
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
    if (submitting) return

    setSubmitting(true)
    setErrorMessage(null)

    const session = cart.payment_collection?.payment_sessions?.find(
      (s) => s.status === "pending"
    )

    if (!session) {
      setErrorMessage("Payment session missing. Please refresh the page.")
      setSubmitting(false)
      return
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "YOUR_TEST_KEY_HERE",
      amount: session.amount,
      currency: session.currency_code?.toUpperCase() || "INR",
      name: "HaveHer",
      description: "Premium Fashion Checkout",
      order_id: session.data.id as string,
      handler: function () {
        onPaymentCompleted()
      },
      prefill: {
        name: `${cart.billing_address?.first_name || ""} ${
          cart.billing_address?.last_name || ""
        }`,
        email: cart.email,
        contact:
          cart.billing_address?.phone || cart.shipping_address?.phone || "",
      },
      theme: {
        color: "#D45C88",
      },
      modal: {
        ondismiss: function () {
          setSubmitting(false)
        },
      },
    }

    try {
      if (typeof (window as any).Razorpay === "undefined") {
        throw new Error("Razorpay SDK not loaded yet. Please wait a second.")
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on("payment.failed", function (response: any) {
        setErrorMessage(response.error.description)
        setSubmitting(false)
      })
      rzp.open()
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          "Failed to load Razorpay. Please check your internet connection."
      )
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-y-2">
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Button
        disabled={notReady || submitting}
        onClick={handlePayment}
        isLoading={submitting}
        data-testid={dataTestId}
        className="w-full bg-[#D45C88] hover:bg-[#3A1A2A] text-white text-xs font-bold uppercase tracking-widest h-12 rounded-full transition-all cursor-pointer flex items-center justify-center shadow-3xs"
      >
        {submitting ? "Opening Razorpay..." : "Pay with Razorpay 🌸"}
      </Button>
      {errorMessage && (
        <ErrorMessage
          error={errorMessage}
          data-testid="razorpay-payment-error-message"
        />
      )}
    </div>
  )
}

{
  /* 👑 FIXED THE EXPORT VOID CRASH FOR TURBOPACK */
}
export default PaymentButton
