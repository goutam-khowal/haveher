// "use client"

// import { RadioGroup } from "@headlessui/react"
// import { isStripeLike, paymentInfoMap } from "@lib/constants"
// import { initiatePaymentSession } from "@lib/data/cart"
// import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
// import ErrorMessage from "@modules/checkout/components/error-message"
// import PaymentContainer from "@modules/checkout/components/payment-container"
// import Divider from "@modules/common/components/divider"
// import { Button, Heading, Text, clx } from "@modules/common/components/ui"
// import { HttpTypes } from "@medusajs/types"
// import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import { useCallback, useEffect, useState } from "react"

// const Payment = ({
//   cart,
//   availablePaymentMethods,
// }: {
//   cart: HttpTypes.StoreCart
//   availablePaymentMethods: { id: string }[]
// }) => {
//   const activeSession = cart.payment_collection?.payment_sessions?.find(
//     (paymentSession) => paymentSession.status === "pending"
//   )

//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
//     activeSession?.provider_id ?? ""
//   )

//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const pathname = usePathname()

//   const isOpen = searchParams.get("step") === "payment"
//   const paymentReady = !!activeSession

//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams)
//       params.set(name, value)
//       return params.toString()
//     },
//     [searchParams]
//   )

//   const handleEdit = () => {
//     router.push(pathname + "?" + createQueryString("step", "payment"), {
//       scroll: false,
//     })
//   }

//   const setPaymentMethod = async (method: string) => {
//     setError(null)
//     setSelectedPaymentMethod(method)
//     try {
//       await initiatePaymentSession(cart, {
//         provider_id: method,
//         data: {
//           metadata: {
//             brand: "HaveHer",
//             cart_id: cart.id,
//             customer_email: cart.email,
//             customer_phone: cart.billing_address?.phone || "8700998068",
//           },
//         },
//       })
//     } catch (err) {
//       console.error("Failed to synchronize session parameters:", err)
//     }
//   }

//   const handleSubmit = async () => {
//     const targetMethod =
//       selectedPaymentMethod || availablePaymentMethods?.[0]?.id || "razorpay"
//     setIsLoading(true)
//     setError(null)
//     try {
//       const isBothRazorpay =
//         activeSession?.provider_id?.includes("razorpay") &&
//         targetMethod.includes("razorpay")
//       const checkActiveSession =
//         activeSession?.provider_id === targetMethod || isBothRazorpay

//       if (!checkActiveSession) {
//         await initiatePaymentSession(cart, {
//           provider_id: targetMethod,
//           data: {
//             metadata: {
//               brand: "HaveHer",
//               cart_id: cart.id,
//               customer_email: cart.email,
//               customer_phone: cart.billing_address?.phone || "8700998068",
//             },
//           },
//         })
//       }

//       return router.push(pathname + "?" + createQueryString("step", "review"), {
//         scroll: false,
//       })
//     } catch (err) {
//       setError(err instanceof Error ? err.message : String(err))
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // 🌸 AUTO-LOAD PRE-SELECT ENFORCER
//   useEffect(() => {
//     if (isOpen && availablePaymentMethods?.length) {
//       const razorpayMethod = availablePaymentMethods.find((m) =>
//         m.id.includes("razorpay")
//       )
//       const targetId = razorpayMethod
//         ? razorpayMethod.id
//         : availablePaymentMethods[0].id
//       if (!selectedPaymentMethod) {
//         setSelectedPaymentMethod(targetId)
//       }
//     }
//   }, [isOpen, availablePaymentMethods, selectedPaymentMethod])

//   return (
//     <div className="bg-white font-sans text-[#3A1A2A]">
//       <div className="flex flex-row items-center justify-between mb-6">
//         <Heading
//           level="h2"
//           className={clx(
//             "flex flex-row text-3xl-regular gap-x-2 items-baseline text-[#3A1A2A]",
//             {
//               "opacity-50 pointer-events-none select-none":
//                 !isOpen && !paymentReady,
//             }
//           )}
//         >
//           Payment
//           {!isOpen && paymentReady && (
//             <CheckCircleSolid className="text-[#D45C88]" />
//           )}
//         </Heading>
//         {!isOpen && paymentReady && (
//           <Text>
//             <button
//               onClick={handleEdit}
//               className="text-[#D45C88] hover:text-[#3A1A2A] font-semibold transition-colors cursor-pointer"
//             >
//               Edit
//             </button>
//           </Text>
//         )}
//       </div>

//       <div>
//         <div className={isOpen ? "block" : "hidden"}>
//           {availablePaymentMethods?.length && (
//             <RadioGroup
//               value={selectedPaymentMethod || availablePaymentMethods[0].id}
//               onChange={(value: string) => setPaymentMethod(value)}
//             >
//               {availablePaymentMethods.map((paymentMethod) => (
//                 <div key={paymentMethod.id} className="mb-2 cursor-pointer">
//                   <div className="flex items-center justify-between p-4 border border-pink-200 rounded-xl bg-pink-50/20 shadow-3xs">
//                     <div className="flex items-center gap-x-3">
//                       <div className="h-4 w-4 rounded-full border-2 border-[#D45C88] flex items-center justify-center bg-white">
//                         <div className="h-2 w-2 rounded-full bg-[#D45C88]"></div>
//                       </div>
//                       <span className="text-sm font-semibold text-[#3A1A2A]">
//                         Razorpay Secure Checkout{" "}
//                         <span className="text-xs text-gray-400 font-normal">
//                           (Cards, UPI, NetBanking, Wallets)
//                         </span>
//                       </span>
//                     </div>
//                     <span className="text-lg">💳</span>
//                   </div>
//                 </div>
//               ))}
//             </RadioGroup>
//           )}

//           <ErrorMessage
//             error={error}
//             data-testid="payment-method-error-message"
//           />

//           {/* 👑 FORCED ACTIVE BUTTON: Locked onto luxury branding accent color palette, ready to hit */}
//           <Button
//             size="large"
//             className="mt-6 bg-[#3A1A2A] hover:bg-[#D45C88] text-white rounded-full transition-all h-12 uppercase tracking-widest text-xs font-bold w-full md:w-auto px-8 cursor-pointer shadow-md"
//             onClick={handleSubmit}
//             isLoading={isLoading}
//             disabled={isLoading}
//           >
//             Continue to Review
//           </Button>
//         </div>

//         <div className={isOpen ? "hidden" : "block"}>
//           {paymentReady && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
//               <div className="flex flex-col min-w-0">
//                 <Text className="txt-medium-plus font-bold text-gray-400 uppercase tracking-wider text-[11px] mb-2">
//                   Payment Method
//                 </Text>
//                 <Text className="txt-medium font-semibold text-[#3A1A2A]">
//                   Razorpay Secure Checkout
//                 </Text>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Divider className="mt-8 border-pink-50/50" />
//     </div>
//   )
// }

// export default Payment
"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer from "@modules/checkout/components/payment-container"
import Divider from "@modules/common/components/divider"
import { Button, Heading, Text, clx } from "@modules/common/components/ui"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: { id: string }[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"
  const paymentReady = !!activeSession

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    try {
      await initiatePaymentSession(cart, {
        provider_id: method,
        data: {
          metadata: {
            brand: "HaveHer",
            cart_id: cart.id,
            customer_email: cart.email,
            customer_phone: cart.billing_address?.phone || "8700998068",
          },
        },
      })
    } catch (err) {
      console.error("Failed to synchronize session parameters:", err)
    }
  }

  const handleSubmit = async () => {
    const targetMethod =
      selectedPaymentMethod || availablePaymentMethods?.[0]?.id || "razorpay"
    setIsLoading(true)
    setError(null)
    try {
      const isBothRazorpay =
        activeSession?.provider_id?.includes("razorpay") &&
        targetMethod.includes("razorpay")
      const checkActiveSession =
        activeSession?.provider_id === targetMethod || isBothRazorpay

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: targetMethod,
          data: {
            metadata: {
              brand: "HaveHer",
              cart_id: cart.id,
              customer_email: cart.email,
              customer_phone: cart.billing_address?.phone || "8700998068",
            },
          },
        })
      }

      return router.push(pathname + "?" + createQueryString("step", "review"), {
        scroll: false,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  // AUTO-LOAD PRE-SELECT ENFORCER
  useEffect(() => {
    if (isOpen && availablePaymentMethods?.length) {
      const razorpayMethod = availablePaymentMethods.find((m) =>
        m.id.includes("razorpay")
      )
      const targetId = razorpayMethod
        ? razorpayMethod.id
        : availablePaymentMethods[0].id
      if (!selectedPaymentMethod) {
        setSelectedPaymentMethod(targetId)
      }
    }
  }, [isOpen, availablePaymentMethods, selectedPaymentMethod])

  return (
    // 👑 FIXED PADDING WRAPPER BLOCK: Converted container layout to upscale breathing white box padding
    <div className="bg-white px-4 py-6 md:p-8 rounded-2xl border border-pink-50/50 shadow-sm font-sans text-[#3A1A2A]">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-xl font-serif italic font-medium tracking-wide gap-x-2 items-baseline text-[#3A1A2A]",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          Payment
          {!isOpen && paymentReady && (
            <CheckCircleSolid className="text-[#D45C88] w-4 h-4" />
          )}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-[#D45C88] hover:text-[#3A1A2A] font-semibold text-sm transition-colors cursor-pointer"
            >
              Edit
            </button>
          </Text>
        )}
      </div>

      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {availablePaymentMethods?.length && (
            <RadioGroup
              value={selectedPaymentMethod || availablePaymentMethods[0].id}
              onChange={(value: string) => setPaymentMethod(value)}
            >
              {availablePaymentMethods.map((paymentMethod) => (
                <div key={paymentMethod.id} className="mb-2 cursor-pointer">
                  <div className="flex items-center justify-between p-4 border border-pink-100/50 rounded-xl bg-pink-50/10 shadow-3xs">
                    <div className="flex items-center gap-x-3">
                      <div className="h-4 w-4 rounded-full border-2 border-[#D45C88] flex items-center justify-center bg-white">
                        <div className="h-2 w-2 rounded-full bg-[#D45C88]"></div>
                      </div>
                      <span className="text-sm font-semibold text-[#3A1A2A]">
                        Razorpay Secure Checkout{" "}
                        <span className="text-xs text-gray-400 font-normal">
                          (Cards, UPI, NetBanking, Wallets)
                        </span>
                      </span>
                    </div>
                    <span className="text-lg"></span>
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="mt-6 bg-[#3A1A2A] hover:bg-[#D45C88] text-white rounded-full transition-all h-12 uppercase tracking-widest text-xs font-bold w-full md:w-auto px-8 cursor-pointer shadow-md"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Continue to Review
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {paymentReady && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
              <div className="flex flex-col min-w-0">
                <Text className="txt-medium-plus font-bold text-gray-400 uppercase tracking-wider text-[11px] mb-2">
                  Payment Method
                </Text>
                <Text className="txt-medium font-semibold text-[#3A1A2A]">
                  Razorpay Secure Checkout
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Payment
