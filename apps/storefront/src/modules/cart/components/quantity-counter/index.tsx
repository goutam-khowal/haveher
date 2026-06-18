"use client"

import React, { useState } from "react"
import { updateLineItem } from "@lib/data/cart" // 🚀 Medusa's standard dynamic mutation hook
import { clx } from "@modules/common/components/ui"

type QuantityCounterProps = {
  lineId: string
  currentQuantity: number
  disabled?: boolean
}

export default function QuantityCounter({
  lineId,
  currentQuantity,
}: QuantityCounterProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = async (newQuantity: number) => {
    if (newQuantity < 1 || isUpdating) return
    setIsUpdating(true)
    try {
      await updateLineItem({ lineId, quantity: newQuantity })
    } catch (err) {
      console.error("Failed to compile item modification values:", err)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div
      className={clx(
        "flex items-center bg-[#FDF1F6]/80 border border-[#F0C4D8]/40 h-9 rounded-full overflow-hidden p-0.5 shadow-3xs transition-opacity duration-200",
        { "opacity-50 pointer-events-none": isUpdating }
      )}
    >
      {/* MINUS OPERATION TRIGGER */}
      <button
        type="button"
        disabled={currentQuantity <= 1 || isUpdating}
        onClick={() => handleUpdate(currentQuantity - 1)}
        className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#D45C88] hover:bg-white rounded-full transition-all text-sm font-bold cursor-pointer disabled:opacity-25 disabled:hover:bg-transparent"
      >
        &minus;
      </button>

      {/* RENDER CURRENT RE-CALCULATED VALUE */}
      <span className="w-8 text-center text-xs font-bold font-sans text-[#3A1A2A] select-none">
        {currentQuantity}
      </span>

      {/* PLUS OPERATION TRIGGER */}
      <button
        type="button"
        disabled={isUpdating}
        onClick={() => handleUpdate(currentQuantity + 1)}
        className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#D45C88] hover:bg-white rounded-full transition-all text-sm font-bold cursor-pointer disabled:opacity-25"
      >
        &#43;
      </button>
    </div>
  )
}
