import Image from "next/image"
import Link from "next/link"
import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"

/**
 * Server-Side Data Fetcher: Pulls available catalog items directly from Medusa v2.
 */
async function fetchHeroProducts(): Promise<HttpTypes.StoreProduct[]> {
  try {
    const response = await sdk.store.product.list({
      limit: 50,
      fields: "*thumbnail,*images",
    })
    return response.products || []
  } catch (error) {
    console.error(
      "[Medusa SDK Error] Failed to fetch items for Hero pool:",
      error
    )
    return []
  }
}

/**
 * Deterministic Randomizer: Uses the current calendar day timestamp as a seed.
 */
function getRandomProductForToday(
  products: HttpTypes.StoreProduct[]
): HttpTypes.StoreProduct | null {
  if (!products || products.length === 0) return null

  const currentDaySeed = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000)
  const chosenIndex = currentDaySeed % products.length
  return products[chosenIndex]
}

const Hero = async () => {
  const allProducts = await fetchHeroProducts()
  const dailyProduct = getRandomProductForToday(allProducts)

  // Fallback image asset route if the database pool is empty during initial migrations
  const defaultHeroImage =
    "https://rghkazrivuowvkxrmbhm.supabase.co/storage/v1/object/public/haveher-products/shopping%20(3)-01KRXRGP227E5VXJMN1E0A492D.webp"

  const dynamicImageSrc =
    dailyProduct?.thumbnail ||
    dailyProduct?.images?.[0]?.url ||
    defaultHeroImage
  const dynamicProductLink = dailyProduct
    ? `/products/${dailyProduct.handle}`
    : "/store"
  const dynamicAltText = dailyProduct?.title || "HaveHer Luxury Selection"

  return (
    <div className="w-full bg-[#FDF1F6]/20 py-8 md:py-16 font-sans">
      <div className="content-container mx-auto px-4 max-w-5xl">
        {/* 👑 STRUCTURE UPDATED: Square aspect container built exactly like the brand inspo */}
        <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden shadow-xl border border-pink-100/30 group">
          {/* BACKGROUND IMAGE FILL BLOCK */}
          <Link href={dynamicProductLink}>
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={dynamicImageSrc}
                className="object-cover w-full h-full object-top transition-transform duration-700 hover:scale-105"
                alt={dynamicAltText}
                fill
                priority
              />
              {/* Soft dark elegant overlay to make text highly readable */}
              <div className="absolute inset-0 bg-black/15 transition-opacity duration-300 group-hover:bg-black/25" />
            </div>
          </Link>

          {/* 👑 TEXT OVERLAY CELL: Centered dynamically over the graphic layout stream */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
            <div className="max-w-xl">
              <h1 className="font-serif text-5xl md:text-7xl italic font-normal tracking-wide text-white drop-shadow-md mb-4">
                Season 1
              </h1>
              <p className="font-sans font-light text-sm md:text-base text-white/90 uppercase tracking-[0.2em] drop-shadow-sm">
                Defining pieces that embody the soul of HaveHer.
              </p>
            </div>
          </div>

          {/* 👑 FLOATING SHOP NOW ACTION BUTTON: Absolutely matching Chapter's UI specs */}
          <div className="absolute max-sm:bottom-10 bottom-[30%] left-0 right-0 flex justify-center z-10">
            <Link
              href={dynamicProductLink}
              className="bg-[#3A1A2A] hover:bg-[#D45C88] text-white text-xs md:text-sm
               font-bold uppercase tracking-widest px-8 md:px-12 py-3.5 md:py-4 rounded-full flex items-center gap-x-3.5 shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Shop Now</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
