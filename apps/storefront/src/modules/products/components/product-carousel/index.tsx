"use client"

import React, { useRef } from "react"
import Image from "next/image"

type ImageCarouselProps = {
  images: { id: string; url: string }[]
}

export default function ProductImageCarousel({ images }: ImageCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

      {/* FLUID HORIZONTAL CAROUSEL CONTAINER */}
      <div
        ref={scrollContainerRef}
        className="flex w-full overflow-x-hidden snap-x snap-mandatory scroll-smooth rounded-2xl border border-gray-100 bg-white shadow-sm scrollbar-none"
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
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* CAROUSEL POSITION DOTINDICATORS */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/10 backdrop-blur-xs px-2.5 py-1.5 rounded-full">
          {images.map((_, idx) => (
            <span
              key={idx}
              className="w-1.5 h-1.5 rounded-full bg-white odd:opacity-50 last:opacity-50"
            />
          ))}
        </div>
      )}
    </div>
  )
}
