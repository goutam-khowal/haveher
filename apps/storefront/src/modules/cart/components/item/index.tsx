"use client"

import { Text, clx } from "@modules/common/components/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || updating) return
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity: newQuantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <div
      className={clx(
        "w-full py-6 font-sans border-b border-pink-100/50 last:border-none transition-opacity duration-200",
        { "opacity-60 pointer-events-none": updating }
      )}
      data-testid="product-row"
    >
      {/* 👑 SOLID GRID GRID ARCHITECTURE FOR STABLE SYMMETRY */}
      <div
        className={clx("w-full grid items-center", {
          "grid-cols-1 gap-y-4 sm:grid-cols-[1fr_auto_100px_100px] sm:gap-x-6":
            type === "full",
          "grid-cols-[1fr_auto] gap-x-4": type === "preview",
        })}
      >
        {/* AREA 1: Product Thumbnail & Meta Details (Takes remaining space) */}
        <div className="flex items-center gap-x-4 min-w-0">
          <div
            className={clx(
              "bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-pink-50 shadow-3xs",
              {
                "w-14 h-18": type === "preview",
                "w-16 h-20 sm:w-20 sm:h-24": type === "full",
              }
            )}
          >
            <LocalizedClientLink href={`/products/${item.product_handle}`}>
              <Thumbnail
                thumbnail={item.thumbnail}
                images={item.variant?.product?.images}
                size="square"
              />
            </LocalizedClientLink>
          </div>

          <div className="flex flex-col min-w-0 text-left">
            <h3 className="font-serif italic text-base md:text-lg text-[#3A1A2A] font-medium tracking-wide truncate pr-2 hover:text-[#D45C88] transition-colors">
              <LocalizedClientLink
                href={`/products/${item.product_handle}`}
                data-testid="product-title"
              >
                {item.product_title}
              </LocalizedClientLink>
            </h3>
            <div className="mt-0.5 text-xs text-gray-400">
              <LineItemOptions
                variant={item.variant}
                data-testid="product-variant"
              />
            </div>

            {/* Mobile Only Baseline Pricing Display */}
            {type === "full" && (
              <div className="sm:hidden mt-1 text-xs text-gray-400 font-medium">
                <LineItemUnitPrice
                  item={item}
                  style="tight"
                  currencyCode={currencyCode}
                />
              </div>
            )}
          </div>
        </div>

        {/* PREVIEW LAYOUT COMPACT BADGE */}
        {type === "preview" && (
          <div className="flex items-center gap-x-2 text-xs font-medium text-gray-500">
            <span>{item.quantity}x</span>
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        )}

        {/* FULL LAYOUT EXCLUSIVE ACTION FIELDS */}
        {type === "full" && (
          <>
            {/* AREA 2: Embedded Soft Pill-Stepper & Action Nodes */}
            <div className="flex flex-col items-start sm:items-center gap-y-1 w-full sm:w-auto border-t sm:border-none pt-3 sm:pt-0 border-pink-50/40">
              <div className="flex items-center gap-x-3 w-full sm:w-auto justify-between sm:justify-start">
                {/* Micro Pill Container Structure */}
                <div className="flex items-center bg-[#FDF1F6]/70 border border-[#F0C4D8]/40 h-8.5 rounded-full overflow-hidden p-0.5 shadow-3xs relative min-w-[92px] justify-between shrink-0">
                  {updating ? (
                    <div className="w-full flex items-center justify-center text-[#D45C88] animate-spin scale-80">
                      <Spinner />
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled={item.quantity <= 1}
                        onClick={() => changeQuantity(item.quantity - 1)}
                        className="w-7 h-full flex items-center justify-center text-gray-400 hover:text-[#D45C88] hover:bg-white rounded-full transition-all text-sm font-bold cursor-pointer disabled:opacity-20"
                      >
                        &minus;
                      </button>

                      <span className="text-xs font-bold font-sans text-[#3A1A2A] select-none px-0.5">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        disabled={item.quantity >= maxQuantity}
                        onClick={() => changeQuantity(item.quantity + 1)}
                        className="w-7 h-full flex items-center justify-center text-gray-400 hover:text-[#D45C88] hover:bg-white rounded-full transition-all text-sm font-bold cursor-pointer disabled:opacity-20"
                      >
                        &#43;
                      </button>
                    </>
                  )}
                </div>

                {/* Trash Delete Execution Link */}
                <div className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50/40 cursor-pointer flex items-center justify-center shrink-0">
                  <DeleteButton
                    id={item.id}
                    data-testid="product-delete-button"
                  />
                </div>
              </div>

              <ErrorMessage error={error} data-testid="product-error-message" />
            </div>

            {/* AREA 3: Symmetrical Unit Cost Matrix Column (Locked at 100px width grid) */}
            <div className="hidden sm:block text-center font-medium text-xs text-gray-400 font-sans w-full">
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>

            {/* AREA 4: Absolute Total Accumulation Line Cost (Locked at 100px width grid) */}
            <div className="text-left sm:text-right font-sans font-bold text-sm sm:text-base text-[#3A1A2A] w-full">
              <LineItemPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Item
