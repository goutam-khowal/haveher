import ProductPreview from "@modules/products/components/product-preview"

export default function ProductRail({
  product,
  region,
}: {
  product: any
  region: any
}) {
  if (!product) return null

  return (
    <div className="w-full transition-transform duration-300 hover:-translate-y-0.5">
      {/* Direct execution using Medusa Core Preview styling engine hooks */}
      <ProductPreview product={product} region={region} isFeatured />
    </div>
  )
}
