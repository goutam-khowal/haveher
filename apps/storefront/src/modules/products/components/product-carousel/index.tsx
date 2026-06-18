"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"

type ImageCarouselProps = {
  images: { id: string; url: string }[]
}

export default function ProductImageCarousel({ images }: ImageCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Track active index on swipe touch (Mobile optimized)
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = container
      if (clientWidth > 0) {
        const newIndex = Math.round(scrollLeft / clientWidth)
        setActiveIndex(newIndex)
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [images])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current
      const offset = direction === "left" ? -clientWidth : clientWidth
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + offset,
        behavior: "smooth",
      })
    }
  }

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] w-full bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
        <span className="text-xs text-gray-400">No images available</span>
      </div>
    )
  }

  return (
    <div className="relative group w-full max-w-2xl mx-auto">
      {/* DESKTOP CLICK ARROWS (Hidden on mobile touch environments) */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 text-gray-700 hover:bg-white hover:text-berry-primary shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 text-gray-700 hover:bg-white hover:text-berry-primary shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200"
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {/* 🚀 FIXED HORIZONTAL CAROUSEL CONTAINER 
          Changed 'overflow-x-hidden' to 'overflow-x-auto' + 'touch-pan-x'
      */}
      <div
        ref={scrollContainerRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-2xl border border-gray-100 bg-white shadow-sm scrollbar-none touch-pan-x no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {images.map((image, idx) => (
          <div
            key={image.id || idx}
            className="w-full flex-shrink-0 snap-start snap-always aspect-[3/4] relative"
          >
            <Image
              src={image.url}
              alt={`Product preview image ${idx + 1}`}
              fill
              priority={idx === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center select-none pointer-events-none"
              draggable="false"
            />
          </div>
        ))}
      </div>

      {/* 🌸 DYNAMIC POSITION INDICATOR DOTS */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/10 backdrop-blur-xs px-2.5 py-1.5 rounded-full z-10">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-4 bg-[#D45C88]"
                  : "w-1.5 bg-white opacity-60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
