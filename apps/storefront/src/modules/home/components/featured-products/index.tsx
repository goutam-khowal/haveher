import { sdk } from "@lib/config"
import ProductRail from "@modules/home/components/featured-products/product-rail"

// 👑 COLLECTION INDEPENDENT FETCH: Pulls latest products directly from database pool
async function fetchLatestProducts() {
  try {
    const response = await sdk.store.product.list({
      limit: 4, // Elite 4-item grid display matching brand aesthetics
      fields: "*variants.calculated_price,*thumbnail",
    })
    return response.products || []
  } catch (error) {
    console.error(
      "[Medusa SDK Error] Failed to fetch straight products for home:",
      error
    )
    return []
  }
}

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: any
  region: any
}) {
  // Call our new direct fetch bypass instead of using empty template arrays
  const pricedProducts = await fetchLatestProducts()

  if (!pricedProducts.length) return null

  return (
    <div className="w-full bg-white py-12 md:py-20 font-sans text-[#3A1A2A]">
      <div className="content-container mx-auto px-4 max-w-5xl">
        {/* Curated Collection Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D45C88] font-bold mb-2">
            Curated Selection
          </span>
          <h2 className="text-3xl md:text-4xl font-serif italic font-normal tracking-wide">
            Season 1 Drops
          </h2>
          <div className="w-12 h-[1.5px] bg-[#D45C88]/30 mt-4"></div>
        </div>

        {/* 👑 PREMIUM 4-COLUMN RESPONSIVE SQUARE GRID (DIRECT RENDER) */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 w-full">
          {pricedProducts.map((product) => (
            <li key={product.id} className="w-full">
              <ProductRail product={product} region={region} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
