"use client"

import React, { useState, useEffect } from "react"
import { toggleBackendWishlist } from "@lib/data/wishlist"

type WishlistButtonProps = {
  productId: string
  initialCustomer?: any
}

export default function WishlistButton({
  productId,
  initialCustomer,
}: WishlistButtonProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  // 👑 HYBRID SCAN ENGINE: Checks both backend data profiles and browser cache loops
  useEffect(() => {
    if (initialCustomer?.wishlist_items) {
      // 1. Backend Verification Sync
      const match = initialCustomer.wishlist_items.some(
        (item: any) => item.product_id === productId
      )
      setIsLiked(match)
    } else {
      // 2. Local Fallback Verification
      const saved = localStorage.getItem("haveher_wishlist")
      if (saved) {
        const list = JSON.parse(saved) as string[]
        setIsLiked(list.includes(productId))
      }
    }
  }, [productId, initialCustomer])

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setLoading(true)

    // 👑 CASE A: CUSTOMER IS LOGGED IN -> Execute Backend Real-time Sync Pipeline
    if (initialCustomer?.id) {
      const success = await toggleBackendWishlist(initialCustomer.id, productId)
      if (success) {
        setIsLiked(!isLiked)
        window.dispatchEvent(new Event("wishlist-updated"))
      }
    }
    // 👑 CASE B: GUEST USER -> Fallback seamlessly to Browser Local Cache (NO ACCOUNT REDIRECT)
    else {
      const saved = localStorage.getItem("haveher_wishlist")
      let list: string[] = saved ? JSON.parse(saved) : []

      if (list.includes(productId)) {
        list = list.filter((id) => id !== productId)
        setIsLiked(false)
      } else {
        list.push(productId)
        setIsLiked(true)
      }

      localStorage.setItem("haveher_wishlist", JSON.stringify(list))
      window.dispatchEvent(new Event("wishlist-updated"))
    }

    setLoading(false)
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="absolute top-3 right-3 z-30 p-2 bg-white/90 rounded-full text-[#3A1A2A] hover:text-[#D45C88] hover:bg-white transition-all shadow-sm cursor-pointer disabled:opacity-50 transform active:scale-90"
      aria-label="Toggle Wishlist"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLiked ? "#D45C88" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke={isLiked ? "#D45C88" : "currentColor"}
        className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  )
}
