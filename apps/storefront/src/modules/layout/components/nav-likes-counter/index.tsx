"use client"

import React, { useState, useEffect } from "react"

export default function NavLikesCounter() {
  const [count, setCount] = useState(0)

  const updateCount = () => {
    const saved = localStorage.getItem("haveher_wishlist")
    if (saved) {
      const list = JSON.parse(saved)
      setCount(list.length)
    } else {
      setCount(0)
    }
  }

  useEffect(() => {
    updateCount() // Baseline scan mapping

    // Listen to continuous custom notifications from components stream loops
    window.addEventListener("wishlist-updated", updateCount)
    return () => window.removeEventListener("wishlist-updated", updateCount)
  }, [])

  if (count === 0) return null

  return (
    <span className="ml-1 bg-[#D45C88] text-white text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-full min-w-[14px] text-center shadow-xs animate-pulse">
      {count}
    </span>
  )
}
