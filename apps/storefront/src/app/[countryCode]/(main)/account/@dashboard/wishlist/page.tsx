"use client"

import React, { useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

export default function WishlistDashboard() {
  const [likedProducts, setLikedProducts] = useState<HttpTypes.StoreProduct[]>(
    []
  )
  const [loading, setLoading] = useState(true)

  const fetchWishlistProducts = async () => {
    setLoading(true)
    const saved = localStorage.getItem("haveher_wishlist")
    const ids: string[] = saved ? JSON.parse(saved) : []

    if (ids.length === 0) {
      setLikedProducts([])
      setLoading(false)
      return
    }

    try {
      const response = await sdk.store.product.list({
        id: ids,
        fields: "*variants.calculated_price,*thumbnail,*images",
      })
      setLikedProducts(response.products || [])
    } catch (error) {
      console.error("Failed to fetch wishlist product objects:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlistProducts()
  }, [])

  // 👑 HANDLE DIRECT CARD REMOVAL FROM WISHLIST SCREEN
  const handleRemove = (productId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const saved = localStorage.getItem("haveher_wishlist")
    let list: string[] = saved ? JSON.parse(saved) : []
    list = list.filter((id) => id !== productId)

    localStorage.setItem("haveher_wishlist", JSON.stringify(list))
    setLikedProducts(likedProducts.filter((p) => p.id !== productId))
    window.dispatchEvent(new Event("wishlist-updated"))
  }

  return (
    <div className="w-full font-sans text-[#3A1A2A] bg-white p-4 md:p-8 rounded-3xl border border-pink-100/30">
      {/* Page Header */}
      <div className="mb-8 border-b border-pink-50/50 pb-4">
        <h1 className="text-2xl font-serif italic tracking-wide mb-1">
          My Favorites
        </h1>
        <p className="text-xs text-gray-400 uppercase tracking-wider">
          Your Curated Season 1 Wishlist
        </p>
      </div>

      {/* 1. LOADING SKELETON */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="w-full aspect-[3/4] bg-gray-50 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* 2. DYNAMIC WISHLIST BOUTIQUE GRID */}
      {!loading && likedProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 w-full">
          {likedProducts.map((product) => {
            // Safe fallback extraction for image thumbnails
            const imageSrc = product.thumbnail || product.images?.[0]?.url || ""

            return (
              <LocalizedClientLink
                key={product.id}
                href={`/products/${product.handle}`}
                className="group block w-full relative"
              >
                <div className="flex flex-col">
                  {/* Image Frame */}
                  <div className="relative w-full aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-3 shadow-xs border border-pink-100/30">
                    {/* Floating Cross Action to remove card instantly */}
                    <button
                      onClick={(e) => handleRemove(product.id!, e)}
                      className="absolute top-2 right-2 z-20 p-1.5 bg-white/90 rounded-full text-gray-400 hover:text-[#D45C88] transition-all shadow-xs cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={product.title || "Curated Piece"}
                        fill
                        className="object-cover w-full h-full object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Meta Details */}
                  <div className="flex flex-col gap-0.5 px-1">
                    <h3 className="font-sans font-medium text-sm text-gray-800 truncate group-hover:text-[#D45C88] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs font-bold text-[#D45C88]">
                      View Product Details →
                    </p>
                  </div>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>
      )}

      {/* 3. EMPTY STATE */}
      {!loading && likedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-[#FDF1F6] flex items-center justify-center text-[#D45C88] mb-4">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-600 mb-6">
            Your saved luxury pieces will appear here in real-time.
          </p>
          <LocalizedClientLink
            href="/store"
            className="bg-[#3A1A2A] text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:bg-[#D45C88] transition-all"
          >
            Explore Boutique
          </LocalizedClientLink>
        </div>
      )}
    </div>
  )
}
