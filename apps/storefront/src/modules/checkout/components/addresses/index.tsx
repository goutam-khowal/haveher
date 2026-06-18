"use client"

import { setAddresses } from "@lib/data/cart"
import useToggleState from "@lib/hooks/use-toggle-state"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import { Heading, Text } from "@modules/common/components/ui"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"

// 👑 STRICT RE-MAPPING: Points exactly to your folder names (Notice billing_address with underscore)
import BillingAddress from "../billing_address"
import ShippingAddress from "../shipping-address"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white font-sans text-[#3A1A2A]">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular gap-x-2 items-baseline text-[#3A1A2A]"
        >
          Shipping Address
          {!isOpen && <CheckCircleSolid className="text-[#D45C88]" />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-[#D45C88] hover:text-[#3A1A2A] font-semibold transition-colors cursor-pointer"
              data-testid="edit-address-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="text-3xl-regular gap-x-4 pb-6 pt-8 text-[#3A1A2A]"
                >
                  Billing address
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton
              className="mt-6 bg-[#3A1A2A] hover:bg-[#D45C88] text-white rounded-full transition-colors h-12 px-6 uppercase tracking-wider text-xs"
              data-testid="submit-address-button"
            >
              Continue to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div className="w-full">
          <div className="text-small-regular w-full">
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
                {/* SHIPPING */}
                <div
                  className="flex flex-col min-w-0"
                  data-testid="shipping-address-summary"
                >
                  <Text className="txt-medium-plus font-bold text-gray-400 uppercase tracking-wider text-[11px] mb-2">
                    Shipping Address
                  </Text>
                  <Text className="txt-medium font-semibold text-[#3A1A2A]">
                    {cart.shipping_address.first_name}{" "}
                    {cart.shipping_address.last_name}
                  </Text>
                  <Text className="txt-medium text-gray-600 mt-0.5">
                    {cart.shipping_address.address_1}{" "}
                    {cart.shipping_address.address_2}
                  </Text>
                  <Text className="txt-medium text-gray-500">
                    {cart.shipping_address.postal_code},{" "}
                    {cart.shipping_address.city}
                  </Text>
                  <Text className="txt-medium text-gray-400 text-xs uppercase mt-0.5">
                    {cart.shipping_address.country_code?.toUpperCase()}
                  </Text>
                </div>

                {/* CONTACT */}
                <div
                  className="flex flex-col min-w-0"
                  data-testid="shipping-contact-summary"
                >
                  <Text className="txt-medium-plus font-bold text-gray-400 uppercase tracking-wider text-[11px] mb-2">
                    Contact Details
                  </Text>
                  <Text className="txt-medium font-semibold text-[#3A1A2A]">
                    {cart.shipping_address.phone ?? "No phone added"}
                  </Text>
                  <Text className="txt-medium text-gray-500 break-all select-all mt-0.5">
                    {cart.email}
                  </Text>
                </div>

                {/* BILLING */}
                <div
                  className="flex flex-col min-w-0"
                  data-testid="billing-address-summary"
                >
                  <Text className="txt-medium-plus font-bold text-gray-400 uppercase tracking-wider text-[11px] mb-2">
                    Billing Address
                  </Text>
                  {sameAsBilling ? (
                    <span className="text-xs italic bg-[#FDF1F6] text-[#D45C88] font-medium px-2.5 py-1 rounded-full w-fit mt-0.5">
                      Same as delivery address
                    </span>
                  ) : (
                    <div className="flex flex-col">
                      <Text className="txt-medium font-semibold text-[#3A1A2A]">
                        {cart.billing_address?.first_name}{" "}
                        {cart.billing_address?.last_name}
                      </Text>
                      <Text className="txt-medium text-gray-600 mt-0.5">
                        {cart.billing_address?.address_1}{" "}
                        {cart.billing_address?.address_2}
                      </Text>
                      <Text className="txt-medium text-gray-500">
                        {cart.billing_address?.postal_code},{" "}
                        {cart.billing_address?.city}
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-4">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8 border-pink-50/50" />
    </div>
  )
}

export default Addresses
