import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | HaveHer",
  description: "Terms and conditions for shopping at HaveHer.",
}

export default function TermsPage() {
  return (
    <div className="content-container mx-auto py-16 md:py-24 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
        Terms & Conditions
      </h1>
      <div className="h-1 w-20 bg-berry-primary mb-12"></div>

      <div className="prose prose-gray max-w-none text-gray-600 space-y-6 leading-relaxed">
        <p>
          Welcome to HaveHer. By accessing our website and purchasing our
          products, you agree to be bound by the following terms and conditions.
          Please read them carefully before making a purchase.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          1. General Conditions
        </h2>
        <p>
          We reserve the right to refuse service to anyone for any reason at any
          time. You understand that your content (excluding credit card
          information), may be transferred unencrypted and involve transmissions
          over various networks. All payment processing is securely handled
          through our PCI-compliant payment gateway, Razorpay.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          2. Products & Pricing
        </h2>
        <p>
          Prices for our products are subject to change without notice. We
          reserve the right at any time to modify or discontinue a product
          without notice. We have made every effort to display as accurately as
          possible the colors and images of our products that appear on the
          store. We cannot guarantee that your computer monitor's display of any
          color will be perfectly accurate.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          3. Accuracy of Billing & Account Information
        </h2>
        <p>
          You agree to provide current, complete, and accurate purchase and
          account information for all purchases made at our store. You agree to
          promptly update your account and other information, including your
          email address and credit card numbers and expiration dates, so that we
          can complete your transactions and contact you as needed.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          4. Intellectual Property
        </h2>
        <p>
          All content included on this site, such as text, graphics, logos,
          images, and software, is the property of HaveHer or its content
          suppliers and protected by international copyright laws. The
          compilation of all content on this site is the exclusive property of
          HaveHer.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          5. Contact Information
        </h2>
        <p>
          Questions about the Terms of Service should be sent to us at{" "}
          <a
            href="mailto:legal@haveher.in"
            className="text-berry-primary hover:text-berry-dark font-medium underline underline-offset-4"
          >
            legal@haveher.in
          </a>
          .
        </p>
      </div>
    </div>
  )
}
