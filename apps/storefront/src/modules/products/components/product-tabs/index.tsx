"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full font-sans">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

/* =========================================================================
   📐 BOUTIQUE PRODUCT INFO & DYNAMIC SIZE GUIDE TAB
   ========================================================================= */
const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-xs md:text-[13px] py-4 text-gray-600 font-sans space-y-6 leading-relaxed">
      {/* Brief Specifications Section */}
      <div className="grid grid-cols-2 gap-4 border-b border-pink-50/60 pb-5">
        <div>
          <span className="font-semibold text-[#3A1A2A] block mb-0.5">
            Fabric & Composition
          </span>
          <p className="text-gray-500">
            {product.material
              ? product.material
              : "Premium Breathable Luxury Blend"}
          </p>
        </div>
        <div>
          <span className="font-semibold text-[#3A1A2A] block mb-0.5">
            Fit & Style Profile
          </span>
          <p className="text-gray-500">
            Flattering silhouette designed for daily luxury
          </p>
        </div>
      </div>

      {/* 👑 PREMIUM HAVEHER SIZE CHART INJECTION */}
      <div className="w-full">
        <span className="font-semibold text-[#3A1A2A] block mb-3 uppercase tracking-wider text-[11px] text-[#D45C88]">
          📐 Size Guide (Inches)
        </span>

        {/* Mobile Overflow Responsive Wrapper */}
        <div className="w-full overflow-x-auto rounded-xl border border-pink-100/70">
          <table className="w-full text-left border-collapse min-w-[280px]">
            <thead>
              <tr className="bg-[#FDF1F6]/60 text-[#3A1A2A] font-semibold border-b border-pink-100/70 text-[11px] md:text-xs">
                <th className="py-2.5 px-4">Size</th>
                <th className="py-2.5 px-4 text-center">Chest</th>
                <th className="py-2.5 px-4 text-center">Waist</th>
                <th className="py-2.5 px-4 text-center">Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50/50 text-xs text-gray-600 font-sans">
              <tr className="hover:bg-[#FDF1F6]/20 transition-colors">
                <td className="py-2.5 px-4 font-bold text-[#3A1A2A]">S</td>
                <td className="py-2.5 px-4 text-center">34"</td>
                <td className="py-2.5 px-4 text-center">28"</td>
                <td className="py-2.5 px-4 text-center">25"</td>
              </tr>
              <tr className="hover:bg-[#FDF1F6]/20 transition-colors">
                <td className="py-2.5 px-4 font-bold text-[#3A1A2A]">M</td>
                <td className="py-2.5 px-4 text-center">36"</td>
                <td className="py-2.5 px-4 text-center">30"</td>
                <td className="py-2.5 px-4 text-center">25"</td>
              </tr>
              <tr className="hover:bg-[#FDF1F6]/20 transition-colors">
                <td className="py-2.5 px-4 font-bold text-[#3A1A2A]">L</td>
                <td className="py-2.5 px-4 text-center">38"</td>
                <td className="py-2.5 px-4 text-center">32"</td>
                <td className="py-2.5 px-4 text-center">25"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   📦 BRANDED SHIPPING & EXCHANGE MATRIX TAB
   ========================================================================= */
const ShippingInfoTab = () => {
  return (
    <div className="text-xs md:text-[13px] py-4 text-gray-600 font-sans space-y-6 leading-relaxed">
      <div className="grid grid-cols-1 gap-y-5">
        {/* Delivery Timelines Node */}
        <div className="flex items-start gap-x-3 group">
          <div className="text-[#D45C88] bg-[#FDF1F6] p-2 rounded-full transition-colors group-hover:bg-[#D45C88] group-hover:text-white shrink-0">
            <FastDelivery className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-[#3A1A2A] block mb-0.5">
              Premium Air Shipping
            </span>
            <p className="text-gray-500 max-w-xl">
              Metro cities are dispatched within 24 hours and delivered in 2-4
              business days. Regional zones deliver in 4-7 business days via
              top-tier logistics partners.
            </p>
          </div>
        </div>

        {/* Size Exchange Node */}
        <div className="flex items-start gap-x-3 group">
          <div className="text-[#D45C88] bg-[#FDF1F6] p-2 rounded-full transition-colors group-hover:bg-[#D45C88] group-hover:text-white shrink-0">
            <Refresh className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-[#3A1A2A] block mb-0.5">
              Hassle-Free Sizing Exchanges
            </span>
            <p className="text-gray-500 max-w-xl">
              Did the fit not match perfectly? No worries—we offer a
              complimentary 7-day size exchange from the date of delivery.
            </p>
          </div>
        </div>

        {/* Returns Node */}
        <div className="flex items-start gap-x-3 group">
          <div className="text-[#D45C88] bg-[#FDF1F6] p-2 rounded-full transition-colors group-hover:bg-[#D45C88] group-hover:text-white shrink-0">
            <Back className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-[#3A1A2A] block mb-0.5">
              Easy Returns Policy
            </span>
            <p className="text-gray-500 max-w-xl">
              If you aren't completely satisfied with your purchase, return your
              unworn item with original tags intact within 7 days for a seamless
              refund process.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
