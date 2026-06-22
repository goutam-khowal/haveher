import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

// 👑 IMPORT: Medusa v2 action utils se region cache resolver fetch karo
import { getRegion } from "@lib/data/regions"
import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // 👑 FIXED: Pehle countryCode se core Region context resolve karo
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          {/* 👑 FIXED: Ab calculated prices ko context binding dene ke liye region_id pass karo */}
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            regionId={region.id} // 👈 Yeh tumhare sub-component ke dynamic prices ko fully unlocked kar dega
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
