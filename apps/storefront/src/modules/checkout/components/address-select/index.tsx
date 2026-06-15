"use client"

import { Listbox, Transition } from "@headlessui/react"
import { ChevronUpDown } from "@medusajs/icons"
import { clx } from "@modules/common/components/ui"
import { Fragment, useMemo } from "react"

import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import Radio from "@modules/common/components/radio"

type AddressSelectProps = {
  addresses: HttpTypes.StoreCustomerAddress[]
  addressInput: HttpTypes.StoreCartAddress | null
  onSelect: (
    address: HttpTypes.StoreCartAddress | undefined,
    email?: string
  ) => void
}

const AddressSelect = ({
  addresses,
  addressInput,
  onSelect,
}: AddressSelectProps) => {
  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id)
    if (savedAddress) {
      onSelect(savedAddress as HttpTypes.StoreCartAddress)
    }
  }

  const selectedAddress = useMemo(() => {
    return addresses.find(
      (a) => addressInput && compareAddresses(a, addressInput)
    )
  }, [addresses, addressInput])

  return (
    // CRITICAL FIX: Adding || "" guarantees the value is never undefined, killing the uncontrolled error.
    <Listbox onChange={handleSelect} value={selectedAddress?.id || ""}>
      <div className="relative">
        <Listbox.Button
          className="relative w-full flex justify-between items-center px-4 py-3 text-left bg-white cursor-default focus:outline-none border border-gray-200 rounded-xl focus:border-berry-primary text-sm font-medium text-gray-700 transition-colors"
          data-testid="shipping-address-select"
        >
          {({ open }) => (
            <>
              <span className="block truncate">
                {selectedAddress
                  ? selectedAddress.address_1
                  : "Choose a saved address"}
              </span>
              <ChevronUpDown
                className={clx(
                  "transition-transform duration-200 text-gray-400",
                  {
                    "transform rotate-180 text-berry-primary": open,
                  }
                )}
              />
            </>
          )}
        </Listbox.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-30 w-full overflow-auto text-sm bg-white border border-gray-100 shadow-xl rounded-xl max-h-60 mt-2 focus:outline-none scrollbar-none"
            data-testid="shipping-address-options"
          >
            {addresses.map((address) => {
              const isCurrentSelection = selectedAddress?.id === address.id
              return (
                <Listbox.Option
                  key={address.id}
                  value={address.id}
                  className={clx(
                    "cursor-default select-none relative pl-6 pr-10 py-4 transition-colors border-b border-gray-50 last:border-0",
                    isCurrentSelection
                      ? "bg-berry-light/10"
                      : "hover:bg-gray-50/80"
                  )}
                  data-testid="shipping-address-option"
                >
                  <div className="flex gap-x-4 items-start">
                    <Radio
                      checked={isCurrentSelection}
                      data-testid="shipping-address-radio"
                      className="mt-0.5 text-berry-primary border-berry-light focus:ring-berry-primary"
                    />
                    <div className="flex flex-col text-gray-600">
                      <span className="text-left font-semibold text-gray-900">
                        {address.first_name} {address.last_name}
                      </span>
                      {address.company && (
                        <span className="text-xs text-gray-400 font-medium mt-0.5">
                          {address.company}
                        </span>
                      )}
                      <div className="flex flex-col text-left text-xs gap-y-0.5 font-medium mt-2 text-gray-500">
                        <span>
                          {address.address_1}
                          {address.address_2 && (
                            <span>, {address.address_2}</span>
                          )}
                        </span>
                        <span>
                          {address.postal_code}, {address.city}
                        </span>
                        <span className="tracking-wider font-semibold text-[10px] text-gray-400 mt-0.5 uppercase">
                          {address.province && `${address.province}, `}
                          {address.country_code?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default AddressSelect
