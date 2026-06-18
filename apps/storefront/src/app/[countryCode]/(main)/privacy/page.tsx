import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | HaveHer",
  description: "Privacy policy and security statements for HaveHer.",
}

export default function PrivacyPage() {
  return (
    <div className="content-container mx-auto py-16 md:py-24 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
        Privacy Policy
      </h1>
      <div className="h-1 w-20 bg-berry-primary mb-12"></div>

      <div className="prose prose-gray max-w-none text-gray-600 space-y-6 leading-relaxed text-sm sm:text-base">
        <p>
          At HaveHer, we are deeply committed to protecting the privacy and
          security of our shoppers. This Privacy Policy details how your
          personal data is collected, shared, and treated when you buy from us.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          1. Data Collection
        </h2>
        <p>
          When you place an order or make an account on our store, we collect
          explicit identifiers including your full name, shipping destination
          address, billing addresses, email records, and matching phone
          contacts.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          2. How We Use Your Data
        </h2>
        <p>
          We parse your context data to process transactions, schedule logistic
          tracking fulfillments, arrange structured checkout confirmations, and
          protect our store endpoints from fraudulent payment activities.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          3. Secure Payments via Razorpay
        </h2>
        <p>
          We do not store your private bank parameters or credit card tracking
          sequences on our local databases. All monetary actions execute
          directly via safe, encrypted, PCI-DSS compliant payment pipes managed
          directly by Razorpay.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          4. Contact Information
        </h2>
        <p>
          For explicit queries regarding data extraction, modification, or
          removal requests, contact our administration teams via email at{" "}
          <span className="text-berry-primary font-medium">
            privacy@haveher.in
          </span>
          .
        </p>
      </div>
    </div>
  )
}
