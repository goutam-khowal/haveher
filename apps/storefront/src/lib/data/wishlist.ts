import { sdk } from "@lib/config"

// 👑 PULL WISHLIST FROM BACKEND DATABASE
export async function getBackendWishlist(customerId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/customers/${customerId}/wishlist`,
      {
        method: "GET",
        headers: {
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
          "Content-Type": "application/json",
        },
        next: { tags: ["wishlist"] },
      }
    )
    if (!response.ok) return []
    const data = await response.json()
    return data.wishlist_items || []
  } catch (error) {
    console.error("Failed to fetch backend wishlist matrix:", error)
    return []
  }
}

// 👑 PUSH / TOGGLE WISHLIST STATE ON DATABASE
export async function toggleBackendWishlist(
  customerId: string,
  productId: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/customers/${customerId}/wishlist`,
      {
        method: "POST",
        headers: {
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId }),
      }
    )
    return response.ok
  } catch (error) {
    console.error("Failed to mutate database wishlist entry:", error)
    return false
  }
}
