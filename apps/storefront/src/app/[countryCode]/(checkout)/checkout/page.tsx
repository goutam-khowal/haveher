import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import Nav from "@modules/layout/templates/nav"
import Footer from "@modules/layout/templates/footer"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout | HaveHer",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  // Guest checkout fallback bypass rule (Optional, custom handled based on requirements)
  if (!customer) {
    redirect("/account?redirect=/checkout")
  }

  return (
    <>
      {/* Premium Luxury Navigation Header Bar */}
      <Nav />

      {/* 🌸 HaveHer Custom Aligned Theme Canvas Background Layout Wrapper */}
      <div className="bg-[#FAF4F6] min-h-screen py-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-container">
          {/* 👑 MASTER INTEGRATION SYNC LAYER: Wrapping the entire checkout grid matrix inside the dynamic provider context boundary block to avoid missing states across summaries */}
          <PaymentWrapper cart={cart}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
              {/* LEFT COLUMN: CONTROL ACTIVE FORMS MATRIX PANEL (7/12 layout grid weight) */}
              <div className="lg:col-span-7 space-y-6">
                <CheckoutForm cart={cart} customer={customer} />
              </div>

              {/* RIGHT COLUMN: RE-STABILIZED COMPACT SIDEBAR RENDER STACK (5/12 layout grid weight) */}
              <div className="lg:col-span-5 lg:sticky lg:top-8">
                <CheckoutSummary cart={cart} />
              </div>
            </div>
          </PaymentWrapper>
        </div>
      </div>

      {/* Global Brand Footer Layer */}
      <Footer />
    </>
  )
}
