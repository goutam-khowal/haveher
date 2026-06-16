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

  if (!customer) {
    redirect("/account?redirect=/checkout")
  }

  return (
    <>
      {/* Global Branded Navigation Header */}
      <Nav />

      <div className="bg-berry-bg/10 min-h-[80vh] py-12">
        <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40">
          <PaymentWrapper cart={cart}>
            <CheckoutForm cart={cart} customer={customer} />
          </PaymentWrapper>
          <CheckoutSummary cart={cart} />
        </div>
      </div>

      {/* Global Branded Footer */}
      <Footer />
    </>
  )
}
