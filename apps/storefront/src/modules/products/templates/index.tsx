import React, { Suspense } from "react"

import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

// CRITICAL FIX: Importing the newly created dynamic image swiper component
import ProductImageCarousel from "@modules/products/components/product-carousel"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Formatting backend product media into safe parameters for the carousel item map
  const carouselImages = images?.length 
    ? images.map((img) => ({ id: img.id || "", url: img.url || "" }))
    : [{ id: "thumb", url: product.thumbnail || "" }]

  return (
    <>
      <div
        className="content-container grid grid-cols-1 small:grid-cols-3 gap-y-6 small:gap-x-8 py-8 md:py-12 relative"
        data-testid="product-container"
      >
        {/* COLUMN 1: TITLES & GENERAL SPECS */}
        {/* Responsive Order: Loaded 2nd on Mobile devices beneath product photos */}
        <div className="flex flex-col small:sticky small:top-36 order-2 small:order-1 w-full gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>

        {/* COLUMN 2: PRIMARY INTERACTIVE SWIPE MEDIA */}
        {/* Responsive Order: Loaded 1st at the very top of mobile views */}
        <div className="block w-full order-1 small:order-2 relative">
          <ProductImageCarousel images={carouselImages} />
        </div>

        {/* COLUMN 3: VARIANT BUTTONS & PURCHASE ACTIONS */}
        {/* Responsive Order: Loaded 3rd directly beneath description layout vectors */}
        <div className="flex flex-col small:sticky small:top-36 order-3 w-full gap-y-6 small:gap-y-8">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>

      {/* RELATED COMPONENT ARCHITECTURE FEED */}
      <div
        className="content-container my-16 small:my-28 border-t border-gray-100 pt-16"
        data-testid="related-products-container"
      >
        <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-8">
          You May Also Like
        </h2>
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate