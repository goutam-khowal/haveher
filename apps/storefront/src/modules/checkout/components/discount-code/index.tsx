"use client"

import {
  Badge,
  Heading,
  Input,
  Label,
  Text,
} from "@modules/common/components/ui"
import React from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const { promotions = [] } = cart
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")

    const code = formData.get("code")
    if (!code) {
      return
    }
    const input = document.getElementById("promotion-input") as HTMLInputElement
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : String(e))
    }

    if (input) {
      input.value = ""
    }
  }

  return (
    <div className="w-full bg-white flex flex-col text-left font-sans">
      <div className="txt-medium">
        <form action={(a) => addPromotionCode(a)} className="w-full mb-5">
          <Label className="flex gap-x-1 my-2 items-center">
            {/* 🌸 UPGRADED: Brand-fitted pink premium coupon toggle link text style */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-sm font-bold text-[#D45C88] hover:text-[#3A1A2A] transition-colors cursor-pointer focus:outline-none"
              data-testid="add-discount-button"
            >
              Have a Coupon Code?
            </button>
          </Label>

          {isOpen && (
            <>
              {/* 🌸 UPGRADED: Modern rounded tight capsule field frame blocks layout spacing */}
              <div className="flex w-full gap-x-2 mt-2 h-11">
                <Input
                  className="size-full rounded-xl border border-gray-200 px-4 text-sm focus:border-[#D45C88] focus:outline-none"
                  id="promotion-input"
                  name="code"
                  type="text"
                  placeholder="Enter coupon code..."
                  autoFocus={false}
                  data-testid="discount-input"
                />
                <SubmitButton
                  variant="secondary"
                  className="bg-[#3A1A2A] hover:bg-[#D45C88] text-white rounded-xl text-xs font-bold px-5 tracking-wide h-full transition-colors cursor-pointer shrink-0 border-transparent"
                  data-testid="discount-apply-button"
                >
                  Apply
                </SubmitButton>
              </div>

              <ErrorMessage
                error={errorMessage}
                data-testid="discount-error-message"
              />
            </>
          )}
        </form>

        {promotions.length > 0 && (
          <div className="w-full flex items-center mt-2">
            <div className="flex flex-col w-full">
              {/* 🌸 UPGRADED: Re-phrased to Coupon vocabulary specifications */}
              <Heading className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Coupon(s) applied:
              </Heading>

              {promotions.map((promotion) => {
                return (
                  <div
                    key={promotion.id}
                    className="flex items-center justify-between w-full max-w-full mb-2 bg-[#FDF1F6]/60 border border-[#F0C4D8]/30 rounded-xl p-3"
                    data-testid="discount-row"
                  >
                    <Text className="flex gap-x-1 items-center txt-small-plus w-4/5 pr-1 text-[#3A1A2A] font-semibold text-sm">
                      <span
                        className="truncate flex items-center gap-x-2"
                        data-testid="discount-code"
                      >
                        <Badge
                          color={promotion.is_automatic ? "green" : "grey"}
                          className="bg-[#3A1A2A] text-white px-2 py-0.5 rounded-md text-xs border-transparent font-sans font-bold"
                        >
                          {promotion.code}
                        </Badge>{" "}
                        <span className="text-xs text-gray-500 font-normal">
                          (
                          {promotion.application_method?.value !== undefined &&
                            promotion.application_method.currency_code !==
                              undefined && (
                              <>
                                {promotion.application_method.type ===
                                "percentage"
                                  ? `${promotion.application_method.value}% OFF`
                                  : convertToLocale({
                                      amount:
                                        +promotion.application_method.value,
                                      currency_code:
                                        promotion.application_method
                                          .currency_code,
                                    })}
                              </>
                            )}
                          )
                        </span>
                      </span>
                    </Text>
                    {!promotion.is_automatic && (
                      <button
                        className="flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer focus:outline-none"
                        onClick={() => {
                          if (!promotion.code) {
                            return
                          }
                          removePromotionCode(promotion.code)
                        }}
                        data-testid="remove-discount-button"
                      >
                        <Trash size={15} />
                        <span className="sr-only">
                          Remove discount code from order
                        </span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscountCode
