"use client"

import React from "react"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  { value: "created_at", label: "Recommended" },  
  { value: "price_desc", label: "Price: High to Low" },
  { value: "price_asc", label: "Price: Low to High" },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryParams("sortBy", e.target.value as SortOptions)
  }

  const currentLabel =
    sortOptions.find((o) => o.value === sortBy)?.label || "Recommended"

  return (
    <div
      className="flex items-center justify-end py-2 px-4 mb-4 w-full"
      data-testid={dataTestId}
    >
      {/* 🌸 FLOATING PREMIUM BADGE SELECT BOX LAYER */}
      <div className="relative inline-flex items-center bg-[#fce7f3]/40 backdrop-blur-xs border border-[#D45C88]/20 rounded-full px-5 py-2 text-xs font-medium text-[#3A1A2A] font-sans hover:bg-[#fce7f3]/60 transition-all duration-200 cursor-pointer group shadow-2xs">
        <span className="text-gray-500 font-normal mr-1">Sort by:</span>
        <span className="font-semibold text-[#9d174d] tracking-wide">
          {currentLabel}
        </span>

        {/* Real hidden select input completely invisible overlay */}
        <select
          value={sortBy}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 font-sans"
        >
          {sortOptions.map((option, idx) => (
            <option
              key={`${option.value}-${idx}`}
              value={option.value}
              className="text-gray-700 bg-white"
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Sleek Berry/Pink Chevron Arrow Icon matching 'Shop the Collection' curvature */}
        <svg
          className="h-3.5 w-3.5 ml-2 text-[#D45C88] group-hover:translate-y-0.5 transition-transform duration-150"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  )
}

export default SortProducts
