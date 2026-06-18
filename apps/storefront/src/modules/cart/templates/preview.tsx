"use client"

import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart: HttpTypes.StoreCart
}

const ItemsPreviewTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart.items
  const hasOverflow = items && items.length > 4

  return (
    <div
      className={clx({
        "pl-[1px] overflow-y-scroll overflow-x-hidden no-scrollbar max-h-[420px]":
          hasOverflow,
      })}
    >
      {/* 👑 FIXED HYDRATION LAYER: Replaced rigid native HTML Table blocks with an agnostic clean layout block.
          This seamlessly accommodates your <div> based Item components across Next.js 15 Turbopack runs. */}
      <div
        className="flex flex-col w-full divide-y divide-pink-100/30"
        data-testid="items-table"
      >
        {items
          ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <div key={item.id} className="w-full">
                    <Item
                      item={item}
                      type="preview"
                      currencyCode={cart.currency_code}
                    />
                  </div>
                )
              })
          : repeat(5).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
      </div>
    </div>
  )
}

export default ItemsPreviewTemplate
