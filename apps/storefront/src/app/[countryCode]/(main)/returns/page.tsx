import { Metadata } from "next"

// 🌸 Premium meta tracking tags updated (Safe here because "use client" is removed)
export const metadata: Metadata = {
  title: "Returns & Exchanges | HaveHer",
  description: "Learn about HaveHer's premium return and exchange window protocol.",
}

export default function ReturnsPage() {
  return (
    <div className="content-container mx-auto py-16 md:py-24 max-w-3xl font-sans text-[#3A1A2A] px-4">
      
      {/* HEADER SECTION */}
      <h1 className="font-serif italic text-3xl md:text-4xl font-medium tracking-wide text-[#3A1A2A] mb-4 text-left">
        Returns & Exchanges
      </h1>
      <div className="h-[2px] w-16 bg-[#D45C88] mb-12"></div>

      <div className="prose prose-gray max-w-none text-sm md:text-base text-gray-600 space-y-6 leading-relaxed text-left">
        <p className="font-medium text-gray-700">
          At HaveHer, we take immense pride in the quality, texture, and craftsmanship of
          our ethnic luxury lines. If you are not entirely in love with
          your purchase, our dedicated concierge team is here to guide you.
        </p>

        {/* 👑 STRICT 48-HOUR CLAIM WINDOW */}
        <div className="bg-[#FDF1F6]/60 border border-[#F0C4D8]/50 rounded-2xl p-5 md:p-6 my-8">
          <h3 className="font-sans font-bold text-xs tracking-wider uppercase text-[#D45C88] mb-2 flex items-center gap-x-2">
            <span>⚠️</span> Claim Window (Strict Verification)
          </h3>
          <p className="text-xs md:text-sm text-[#3A1A2A] font-medium leading-relaxed">
            Any complaints regarding damages, missing pieces, or mismatch products <strong>must be raised within 48 hours of delivery</strong>. To process this claim, you will be required to share a clear unboxing video or product clip showing the attached untampered tag. Requests made after this strict 48-hour window will unfortunately not be accepted.
          </p>
        </div>

        {/* POLICY MATRIX */}
        <h2 className="font-serif italic text-xl md:text-2xl font-medium text-[#3A1A2A] mt-12 mb-4">
          Our 7-Day Return Policy
        </h2>
        <p>
          Returns or exchange requests can be logged <strong>within 7 days of delivery</strong>, provided the original security tag remains fully attached to the product. Items from our exclusive <strong>Blooming Aura</strong> collection that have missing tags, or are found washed, altered, or worn, are strictly non-eligible for standard returns.
        </p>

        <h2 className="font-serif italic text-xl md:text-2xl font-medium text-[#3A1A2A] mt-12 mb-4">
          Non-Returnable Items
        </h2>
        <p>
          For hygiene and global safety standards, the following product categories cannot be returned or swapped:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-[#D45C88] text-xs md:text-sm">
          <li>Custom-fitted, tailored adjustments, or modified garments</li>
          <li>Luxury jewelry, fine accessories, and delicate overlays</li>
          <li>Items purchased during exclusive archive clearance sales or seasonal markdown promotional events</li>
        </ul>

        <h2 className="font-serif italic text-xl md:text-2xl font-medium text-[#3A1A2A] mt-12 mb-4">
          How to Initiate Your Request
        </h2>
        <p>
          To start your validation log, simply access your personal HaveHer dashboard panel, navigate straight into order details tracking history, and check "Request Return". Alternatively, connect with our fashion concierge team via email at{" "}
          <a
            href="mailto:concierge@haveher.in"
            className="text-[#D45C88] hover:text-[#3A1A2A] font-bold underline underline-offset-4 transition-colors"
          >
            concierge@haveher.in
          </a>{" "}
          including your Order ID along with your raw product verification video clip.
        </p>

        <h2 className="font-serif italic text-xl md:text-2xl font-medium text-[#3A1A2A] mt-12 mb-4">
          Refund Allocation
        </h2>
        <p>
          Once your reverse package package safely reaches our distribution center and passes manual quality audit parameters, an instant evaluation notification alert is triggered. All successfully approved refunds will be safely credited back into your original bank channel network account (processed securely via Razorpay gateways) inside 5-7 working business days.
        </p>
      </div>

    </div>
  )
}