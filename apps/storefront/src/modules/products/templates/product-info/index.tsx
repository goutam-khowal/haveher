"use client"

import { HttpTypes } from "@medusajs/types"
import { Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

/* =========================================================================
   👑 ULTRA-LIGHTWEIGHT FRONTLINE MARKDOWN ENGINE
   Converts admin descriptions into real luxurious HTML structures on-the-fly.
   ========================================================================= */
function parseMarkdownToHTML(text: string | null | undefined): string {
  if (!text) return ""

  let html = text

  // 1. Process Headings: #### Product Details -> Premium Underlined Subheadings
  html = html.replace(
    /####\s+(.+)/g,
    '<h4 class="font-sans text-xs md:text-sm font-semibold uppercase tracking-widest text-[#3A1A2A] mt-6 mb-3 border-b border-pink-100 pb-1.5">$1</h4>'
  )

  // 2. Process Bold Text: **Style Tip:** -> High contrast bold weights
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-semibold text-gray-950">$1</strong>'
  )

  // 3. Process Bullet Points: * Item Line -> Custom branded mini magenta dots
  html = html.replace(
    /^\*\s+(.+)/gm,
    '<li class="text-xs md:text-[13px] text-gray-600 list-none flex items-center gap-x-2 my-2 pl-1"><span class="w-1.5 h-1.5 rounded-full bg-[#D45C88] inline-block shrink-0"></span>$1</li>'
  )

  // 4. Handle standard layout line breaks smoothly
  html = html.replace(/\n/g, "<br />")

  return html
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const parsedDescriptionHTML = parseMarkdownToHTML(product.description)

  return (
    <div id="product-info" className="w-full px-1">
      {/* FIXED: Removed the limiting max-w center restriction to allow fluid column distribution */}
      <div className="flex flex-col gap-y-4 w-full">
        {/* 🏷️ Brand Collection Label Tag Line */}
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-[10px] md:text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#D45C88] hover:text-[#C07090] transition-colors w-fit"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}

        {/* 👑 Premium Product Title Heading - Editorial Bodoni Serif Axis */}
        <Heading
          level="h2"
          className="font-serif text-3xl md:text-4xl font-normal text-[#3A1A2A] tracking-wide capitalize leading-tight"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {/* 📝 COMPACT HIGH-END CONTENT INJECTOR BLOCK
            No more flat string printing, renders parsed tokens seamlessly.
        */}
        {product.description && (
          <div
            className="prose prose-sm text-xs md:text-[13px] text-gray-600 leading-relaxed space-y-3 font-sans mt-2"
            dangerouslySetInnerHTML={{ __html: parsedDescriptionHTML }}
            data-testid="product-description"
          />
        )}
      </div>
    </div>
  )
}

export default ProductInfo
