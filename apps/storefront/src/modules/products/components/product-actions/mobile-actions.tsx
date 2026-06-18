"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Button, clx } from "@modules/common/components/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-50", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          {/* 🌸 FIXED 1: Replaced boring gray borders with Haveher luxury styling and brand fonts */}
          <div
            className="bg-white flex flex-col gap-y-3 justify-center items-center p-4 h-full w-full border-t border-[#F0C4D8]/50 shadow-[0_-10px_30px_rgba(212,92,136,0.06)] font-sans"
            data-testid="mobile-actions"
          >
            {/* Title & Price Row */}
            <div className="flex items-center gap-x-2 text-sm md:text-base">
              <span
                data-testid="mobile-title"
                className="font-serif italic font-medium text-[#3A1A2A]"
              >
                {product.title}
              </span>
              <span className="text-pink-200">—</span>
              {selectedPrice ? (
                <div className="flex items-end gap-x-2 text-[#3A1A2A] font-semibold font-sans">
                  {selectedPrice.price_type === "sale" && (
                    <p>
                      <span className="line-through text-xs text-gray-400 font-normal">
                        {selectedPrice.original_price}
                      </span>
                    </p>
                  )}
                  <span
                    className={clx("text-[#D45C88]", {
                      "text-berry-primary": selectedPrice.price_type === "sale",
                    })}
                  >
                    {selectedPrice.calculated_price}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 w-full gap-x-3">
              {!isSimple && (
                <button
                  onClick={open}
                  className="w-full h-12 px-4 rounded-full border-2 border-[#D45C88]/30 text-gray-700 hover:text-[#D45C88] text-xs font-semibold flex items-center justify-between transition-all duration-150 bg-white active:scale-[0.98] cursor-pointer"
                  data-testid="mobile-actions-button"
                >
                  <span className="truncate pr-1">
                    {variant ? Object.values(options).join(" / ") : "Options"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#D45C88] shrink-0" />
                </button>
              )}

              {/* 👑 PREMIUM SUBMIT BUTTON LAYOUT */}
              <button
                onClick={handleAddToCart}
                disabled={!inStock || !variant || isAdding}
                className={clx(
                  "h-12 px-4 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-150 shadow-2xs active:scale-[0.98] flex items-center justify-center cursor-pointer shrink-0",
                  {
                    "w-full col-span-2": isSimple,
                    "w-full": !isSimple,
                    "bg-[#D45C88] text-white hover:bg-[#3A1A2A]":
                      inStock && variant,
                    "bg-gray-100 text-gray-400 cursor-not-allowed border-none shadow-none":
                      !inStock || !variant,
                  }
                )}
                data-testid="mobile-cart-button"
              >
                {isAdding ? (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                ) : !variant ? (
                  "Select Style"
                ) : !inStock ? (
                  "Out of stock"
                ) : (
                  "Add to Bag 🌸"
                )}
              </button>
            </div>
          </div>
        </Transition>
      </div>

      {/* OPTIONS EXPANSION DRAWER MODAL SHEET */}
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#3A1A2A]/40 backdrop-blur-xs" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-10"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-10"
              >
                <Dialog.Panel
                  className="w-full h-full transform overflow-hidden text-left flex flex-col gap-y-3"
                  data-testid="mobile-actions-modal"
                >
                  <div className="w-full flex justify-end pr-6">
                    <button
                      onClick={close}
                      className="bg-white border border-pink-100 text-gray-500 w-10 h-10 rounded-full flex justify-center items-center shadow-xs cursor-pointer active:scale-90 transition-all"
                      data-testid="close-modal-button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-white px-6 pt-6 pb-12 rounded-t-3xl border-t border-pink-100 shadow-2xl">
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-5">
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title ?? ""}
                                disabled={optionsDisabled}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
