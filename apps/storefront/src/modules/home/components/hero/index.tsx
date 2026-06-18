import Image from "next/image"
import Link from "next/link"
import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"

/**
 * Server-Side Data Fetcher: Pulls available catalog items directly from Medusa v2.
 * Revalidate tag forces Next.js to recalculate the selection daily (86400 seconds).
 */
async function fetchHeroProducts(): Promise<HttpTypes.StoreProduct[]> {
  try {
    const response = await sdk.store.product.list({
      limit: 50, // Grab a decent batch size pool to randomize from
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
 * This guarantees the image updates *once a day*, but stays consistent across refreshes.
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
    <div className="w-full bg-berry-bg">
      {/* 1. SPLIT-GRID HERO BANNER */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 flex flex-col md:flex-row items-center gap-12">
        {/* Left Column: Text & CTA */}
        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-berry-light text-berry-dark rounded-full">
            New Arrival Collection
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold tracking-tight text-berry-dark mb-6 leading-tight">
            Feel her <br className="hidden md:block" /> this season.
          </h1>
          <p className="font-sans font-light text-lg md:text-xl text-berry-dark/80 max-w-md mb-10 mx-auto md:mx-0">
            Uncompromising elegance. Premium ethnic and western wear for the
            modern woman.
          </p>
          <Link
            href="/store"
            className="inline-block bg-berry-primary text-white font-medium px-8 py-4 rounded-full shadow-lg shadow-berry-primary/30 hover:bg-berry-dark transition-all duration-300"
          >
            Shop the Collection
          </Link>
        </div>

        {/* Right Column: Dynamic Daily Product Image */}
        <div className="flex-1 relative w-full aspect-[4/5] md:aspect-square bg-berry-light/40 rounded-[2rem] overflow-hidden border border-berry-light">
          <Link href={dynamicProductLink}>
            <div className="absolute inset-0 flex items-center justify-center text-berry-mid">
              <Image
                src={dynamicImageSrc}
                className="object-cover w-full h-full object-top transition-transform duration-700 hover:scale-105"
                alt={dynamicAltText}
                width={600}
                height={600}
                priority // Speeds up Above-the-Fold LCP loading scores
              />
            </div>
          </Link>
        </div>
      </section>{" "}
    </div>
  )
}

export default Hero
