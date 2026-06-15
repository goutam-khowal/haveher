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

  // If there is only 1 variant, preselect the options
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

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
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

  // check if the selected variant is in stock
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

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }

  // Helper boolean for disabled state
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
            onClick={handleAddToCart}
            disabled={isButtonDisabled}
            className="flex-1 px-6 py-4 rounded-full border-2 border-berry-primary bg-white text-berry-primary font-bold tracking-wide hover:bg-berry-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

          {/* BUY NOW BUTTON */}
          <button
            onClick={async () => {
              await handleAddToCart()
              // Redirect straight to checkout after adding to cart
              if (selectedVariant?.id && inStock) {
                router.push(`/${countryCode}/checkout?step=address`)
              }
            }}
            disabled={isButtonDisabled}
            className="flex-1 px-6 py-4 rounded-full border-2 border-berry-primary bg-berry-primary text-white font-bold tracking-wide hover:bg-berry-dark hover:border-berry-dark shadow-lg shadow-berry-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
