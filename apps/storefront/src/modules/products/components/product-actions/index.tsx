"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner" // 🚀 Added for custom high-end toast bypass
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }
    if (selectedVariant?.allow_backorder) {
      return true
    }
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  /* =========================================================================
     🌸 UPGRADED CART TRIGGER WITH PREMIUM EMBEDDED TOAST SYNC
     ========================================================================= */
  const handleAddToCart = async (showNotification = true) => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })

      // 👑 Dynamic Custom Toast Execution (Overriding ugly black box)
      if (showNotification) {
        toast.custom(
          (t) => (
            <div
              className={clx(
                "w-full max-w-sm bg-white border border-[#F0C4D8] p-4 rounded-full shadow-xl flex items-center justify-between gap-x-4 font-sans transition-all duration-300 transform",
                t.visible
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-2"
              )}
            >
              <div className="flex items-center gap-x-2 pl-3">
                <span className="font-serif italic text-sm text-[#3A1A2A] font-medium">
                  {product.title}
                </span>
                <span className="text-xs text-gray-500 font-sans tracking-wide">
                  added to bag 🌸
                </span>
              </div>

              <div className="flex items-center gap-x-2 shrink-0">
                <LocalizedClientLink
                  href="/cart"
                  className="bg-[#D45C88] text-white text-[10px] font-semibold uppercase tracking-widest py-2 px-4 rounded-full transition-colors hover:bg-[#3A1A2A]"
                  onClick={() => toast.dismiss(t.id)}
                >
                  View Bag
                </LocalizedClientLink>
              </div>
            </div>
          ),
          { duration: 3500, position: "bottom-right" }
        )
      }
    } catch (err) {
      console.error("Failed to append item selection array context:", err)
    } finally {
      setIsAdding(false)
    }
  }

  const isButtonDisabled =
    !inStock || !selectedVariant || !!disabled || isAdding || !isValidVariant

  return (
    <>
      <div className="flex flex-col gap-y-6" ref={actionsRef}>
        {/* VARIANT SELECTORS */}
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-6">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider className="mt-2" />
            </div>
          )}
        </div>

        {/* PRICE DISPLAY */}
        <ProductPrice product={product} variant={selectedVariant} />

        {/* CUSTOM BRAND BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          {/* ADD TO BAG BUTTON */}
          <button
            onClick={() => handleAddToCart(true)}
            disabled={isButtonDisabled}
            className="flex-1 px-6 py-4 rounded-full border-2 border-berry-primary bg-white text-berry-primary font-bold tracking-wide hover:bg-berry-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            data-testid="add-product-button"
          >
            {isAdding ? (
              <span className="w-5 h-5 border-2 border-berry-primary border-t-transparent rounded-full animate-spin"></span>
            ) : !selectedVariant && !options ? (
              "Select variant"
            ) : !inStock || !isValidVariant ? (
              "Out of stock"
            ) : (
              "Add to Bag"
            )}
          </button>

          {/* BUY NOW BUTTON - STABLE REDIRECTION FLOW */}
          <button
            onClick={async () => {
              if (isButtonDisabled) return
              // Pass false to skip toast alert since we are redirecting straight away
              await handleAddToCart(false)
              if (selectedVariant?.id && inStock) {
                router.push(`/${countryCode}/checkout`)
              }
            }}
            disabled={isButtonDisabled}
            className="flex-1 px-6 py-4 rounded-full border-2 border-berry-primary bg-berry-primary text-white font-bold tracking-wide hover:bg-berry-dark hover:border-berry-dark shadow-lg shadow-berry-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
          >
            {isAdding ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Buy Now"
            )}
          </button>
        </div>

        {/* MOBILE STICKY ACTIONS */}
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={() => handleAddToCart(true)}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
