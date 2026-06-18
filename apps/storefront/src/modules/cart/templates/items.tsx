"use client"

import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    // 👑 FIXED: Purana ganda Table framework aur "Item | Quantity | Total" headers completely clear.
    // Ab yeh ek premium divider layered stack ban gaya hai jisme misalignment ka chance 0% hai.
    <div className="w-full font-sans">
      <div className="flex flex-col w-full divide-y divide-pink-100/50 border-t border-pink-100/40 mt-2">
        {items
          ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                )
              })
          : repeat(5).map((i) => {
              return (
                <div key={i} className="py-6 border-b border-pink-50">
                  <SkeletonLineItem />
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default ItemsTemplate
