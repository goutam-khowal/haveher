import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Returns & Exchanges | HaveHer",
  description: "Learn about HaveHer's premium return and exchange policy.",
}

export default function ReturnsPage() {
  return (
    <div className="content-container mx-auto py-16 md:py-24 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
        Returns & Exchanges
      </h1>
      <div className="h-1 w-20 bg-berry-primary mb-12"></div>

      <div className="prose prose-gray max-w-none text-gray-600 space-y-6 leading-relaxed">
        <p>
          At HaveHer, we take immense pride in the quality and craftsmanship of
          our ethnic and contemporary wear. If you are not entirely in love with
          your purchase, we are here to help.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          Our 7-Day Return Policy
        </h2>
        <p>
          You have 7 days from the date of delivery to initiate a return or
          exchange. To be eligible for a return, your item must be unused,
          unworn, unwashed, and in the exact same condition that you received
          it. It must also be in the original packaging with all HaveHer tags
          intact.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          Non-Returnable Items
        </h2>
        <p>
          For hygiene and safety reasons, the following items cannot be returned
          or exchanged:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-berry-primary">
          <li>Custom-fitted or tailored garments</li>
          <li>Jewelry and accessories</li>
          <li>Items purchased during clearance sales or promotional events</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          How to Initiate a Return
        </h2>
        <p>
          To start a return, simply log into your HaveHer account, navigate to
          your order history, and select "Request Return." Alternatively, you
          can email our support team at{" "}
          <a
            href="mailto:support@haveher.com"
            className="text-berry-primary hover:text-berry-dark font-medium underline underline-offset-4"
          >
            support@haveher.com
          </a>{" "}
          with your Order ID and the reason for return.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          Refunds
        </h2>
        <p>
          Once your return is received and inspected by our quality team, we
          will send you an email to notify you of the approval or rejection of
          your refund. Approved refunds will be automatically processed back to
          your original method of payment (via Razorpay) within 5-7 business
          days.
        </p>
      </div>
    </div>
  )
}
