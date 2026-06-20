// "use client"

// import { login } from "@lib/data/customer"
// import { LOGIN_VIEW } from "@modules/account/templates/login-template"
// import ErrorMessage from "@modules/checkout/components/error-message"
// import { SubmitButton } from "@modules/checkout/components/submit-button"
// import Input from "@modules/common/components/input"
// import { useState } from "react"
// import { useParams, useRouter, useSearchParams } from "next/navigation"

// type Props = {
//   setCurrentView: (view: LOGIN_VIEW) => void
// }

// const Login = ({ setCurrentView }: Props) => {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const { countryCode } = useParams()

//   const [errorMessage, setErrorMessage] = useState<string | null>(null)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setErrorMessage(null)

//     const formData = new FormData(e.currentTarget)
//     const result = await login(null, formData)

//     if (typeof result === "string") {
//       setErrorMessage(result)
//     } else {
//       const redirectTo = searchParams.get("redirect")

//       if (redirectTo) {
//         router.push(`/${countryCode}${redirectTo}`)
//       } else {
//         router.push(`/${countryCode}/account`)
//       }
//       router.refresh()
//     }
//   }

//   return (
//     // 👑 FIXED: Perfect Global Centering Matrix Wrapper with Haute Luxury Layout
//     <div
//       className="max-w-md mx-auto w-full flex flex-col items-center justify-center font-sans py-16 px-4 min-h-[60vh] bg-white text-neutral-950"
//       data-testid="login-page"
//     >
//       {/* BRAND HEADLINE SEGMENT */}
//       <div className="text-center mb-10">
//         <h1 className="font-serif italic text-3xl md:text-4xl text-[#3A1A2A] font-light tracking-[0.2em] uppercase">
//           Welcome back
//         </h1>
//         <p className="text-center text-xs text-neutral-400 mt-4 font-sans tracking-[0.12em] uppercase max-w-[290px] mx-auto leading-relaxed">
//           Sign in to access an enhanced luxury shopping experience.
//         </p>
//       </div>

//       <form className="w-full" onSubmit={handleSubmit}>
//         <div className="flex flex-col w-full gap-y-5">
//           <Input
//             label="Email Address"
//             name="email"
//             type="email"
//             title="Enter a valid email address."
//             autoComplete="email"
//             required
//             className="rounded-none border-neutral-200 focus:border-[#3A1A2A] h-12 text-sm font-light tracking-wide transition-colors"
//             data-testid="email-input"
//           />
//           <Input
//             label="Password"
//             name="password"
//             type="password"
//             autoComplete="current-password"
//             required
//             className="rounded-none border-neutral-200 focus:border-[#3A1A2A] h-12 text-sm font-light tracking-widest transition-colors"
//             data-testid="password-input"
//           />
//         </div>

//         <ErrorMessage error={errorMessage} data-testid="login-error-message" />

//         {/* HaveHer Premium Action Button */}
//         <SubmitButton
//           data-testid="sign-in-button"
//           className="w-full mt-8 bg-[#3A1A2A] hover:bg-[#D45C88] text-white rounded-none py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer active:scale-[0.99]"
//         >
//           Continue
//         </SubmitButton>
//       </form>

//       {/* ACCENT CONVERSIONS */}
//       <div className="text-center mt-10 flex flex-col space-y-3 font-sans text-[11px] font-light tracking-wider text-neutral-400 uppercase">
//         <p>
//           Not a member?{" "}
//           <button
//             onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
//             className="underline font-bold text-[#D45C88] hover:text-[#3A1A2A] transition-colors bg-transparent border-none outline-none cursor-pointer uppercase"
//             data-testid="register-button"
//           >
//             Join us
//           </button>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Login
"use client"

import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { countryCode } = useParams()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    const result = await login(null, formData)

    if (typeof result === "string") {
      setErrorMessage(result)
    } else {
      const redirectTo = searchParams.get("redirect")

      if (redirectTo) {
        router.push(`/${countryCode}${redirectTo}`)
      } else {
        router.push(`/${countryCode}/account`)
      }
      router.refresh()
    }
  }

  return (
    // 👑 FIXED: Perfect Global Centering Matrix Wrapper with Haute Luxury Layout
    <div
      className="max-w-md mx-auto w-full flex flex-col items-center justify-center font-sans py-16 px-4 min-h-[60vh] bg-white text-neutral-950"
      data-testid="login-page"
    >
      {/* BRAND HEADLINE SEGMENT */}
      <div className="text-center mb-10">
        <h1 className="font-serif italic text-3xl md:text-4xl text-[#3A1A2A] font-light tracking-[0.2em] uppercase">
          Welcome back
        </h1>
        <p className="text-center text-xs text-neutral-400 mt-4 font-sans tracking-[0.12em] uppercase max-w-[290px] mx-auto leading-relaxed">
          Sign in to access an enhanced luxury shopping experience.
        </p>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-y-5">
          <Input
            label="Email Address"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            className="rounded-none border-neutral-200 focus:border-[#3A1A2A] h-12 text-sm font-light tracking-wide transition-colors w-full"
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="rounded-none border-neutral-200 focus:border-[#3A1A2A] h-12 text-sm font-light tracking-widest transition-colors w-full"
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={errorMessage} data-testid="login-error-message" />

        {/* HaveHer Premium Action Button */}
        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-8 bg-[#3A1A2A] hover:bg-[#D45C88] text-white rounded-none py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer active:scale-[0.99]"
        >
          Continue
        </SubmitButton>
      </form>

      {/* ACCENT CONVERSIONS */}
      <div className="text-center mt-10 flex flex-col space-y-3 font-sans text-[11px] font-light tracking-wider text-neutral-400 uppercase">
        <p>
          Not a member?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="underline font-bold text-[#D45C88] hover:text-[#3A1A2A] transition-colors bg-transparent border-none outline-none cursor-pointer uppercase"
            data-testid="register-button"
          >
            Join us
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
