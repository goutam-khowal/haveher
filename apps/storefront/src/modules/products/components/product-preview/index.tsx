// // import { Text } from "@modules/common/components/ui"
// // import { getProductPrice } from "@lib/util/get-product-price"
// // import { HttpTypes } from "@medusajs/types"
// // import LocalizedClientLink from "@modules/common/components/localized-client-link"
// // import Thumbnail from "../thumbnail"
// // import PreviewPrice from "./price"

// // export default async function ProductPreview({
// //   product,
// //   isFeatured,
// //   region: _region,
// // }: {
// //   product: HttpTypes.StoreProduct
// //   isFeatured?: boolean
// //   region: HttpTypes.StoreRegion
// // }) {
// //   // const pricedProduct = await listProducts({
// //   //   regionId: region.id,
// //   //   queryParams: { id: [product.id!] },
// //   // }).then(({ response }) => response.products[0])

// //   // if (!pricedProduct) {
// //   //   return null
// //   // }

// //   const { cheapestPrice } = getProductPrice({
// //     product,
// //   })

// //   return (
// //     <LocalizedClientLink href={`/products/${product.handle}`} className="group">
// //       <div data-testid="product-wrapper">
// //         <Thumbnail
// //           thumbnail={product.thumbnail}
// //           images={product.images}
// //           size="full"
// //           isFeatured={isFeatured}
// //         />
// //         <div className="flex txt-compact-medium mt-4 justify-between">
// //           <Text className="text-ui-fg-subtle" data-testid="product-title">
// //             {product.title}
// //           </Text>
// //           <div className="flex items-center gap-x-2">
// //             {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
// //           </div>
// //         </div>
// //       </div>
// //     </LocalizedClientLink>
// //   )
// // }

// import { Text } from "@modules/common/components/ui"
// import { getProductPrice } from "@lib/util/get-product-price"
// import { HttpTypes } from "@medusajs/types"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import Thumbnail from "../thumbnail"
// import PreviewPrice from "./price"

// export default async function ProductPreview({
//   product,
//   isFeatured,
//   region: _region,
// }: {
//   product: HttpTypes.StoreProduct
//   isFeatured?: boolean
//   region: HttpTypes.StoreRegion
// }) {
//   const { cheapestPrice } = getProductPrice({
//     product,
//   })

//   return (
//     <LocalizedClientLink
//       href={`/products/${product.handle}`}
//       className="group block w-full"
//     >
//       <div data-testid="product-wrapper" className="flex flex-col">
//         {/* Image Container with Badges */}
//         <div className="relative w-full aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-3 shadow-sm border border-berry-light/50">
//           {/* NEW Badge (Top Left) */}
//           <div className="absolute top-3 left-3 z-10 bg-white/95 text-berry-primary text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-sm tracking-wider">
//             NEW
//           </div>

//           {/* Wishlist Heart Button (Top Right) - Removed onClick to keep it a pure Server Component */}
//           <button
//             className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full text-berry-mid hover:text-berry-primary hover:bg-white transition-all shadow-sm"
//             aria-label="Add to wishlist"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="w-4 h-4 sm:w-5 sm:h-5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//               />
//             </svg>
//           </button>

//           {/* Product Image */}
//           <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out">
//             <Thumbnail
//               thumbnail={product.thumbnail}
//               images={product.images}
//               size="full"
//               isFeatured={isFeatured}
//             />
//           </div>
//         </div>

//         {/* Product Details (Title & Price) */}
//         <div className="flex flex-col gap-1 px-1">
//           <Text
//             className="font-sans font-medium text-berry-dark truncate text-sm sm:text-base"
//             data-testid="product-title"
//           >
//             {product.title}
//           </Text>
//           <div className="font-sans text-berry-primary font-bold text-sm sm:text-base">
//             {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
//           </div>
//         </div>
//       </div>
//     </LocalizedClientLink>
//   )
// }
import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import WishlistButton from "./wishlist-button" // 🌸 INJECTED CLIENT INTERACTIVE ACTION NODE

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block w-full"
    >
      <div data-testid="product-wrapper" className="flex flex-col">
        {/* Image Container with Badges */}
        <div className="relative w-full aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-3 shadow-sm border border-berry-light/50">
          {/* NEW Badge (Top Left) */}
          <div className="absolute top-3 left-3 z-10 bg-white/95 text-[#D45C88] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-sm tracking-wider">
            NEW
          </div>

          {/* 👑 FIXED WISHLIST LINK TOGGLE LAYER: Safe interactive dynamic hook implementation */}
          {product.id && <WishlistButton productId={product.id} />}

          {/* Product Image */}
          <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
          </div>
        </div>

        {/* Product Details (Title & Price) */}
        <div className="flex flex-col gap-1 px-1">
          <Text
            className="font-sans font-medium text-berry-dark truncate text-sm sm:text-base"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="font-sans text-berry-primary font-bold text-sm sm:text-base">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
