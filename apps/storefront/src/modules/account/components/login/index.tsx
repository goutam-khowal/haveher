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
    // 👑 FIXED: Perfect Global Centering Matrix Wrapper
    <div
      className="max-w-md mx-auto w-full flex flex-col items-center justify-center font-sans py-16 px-4 min-h-[55vh]"
      data-testid="login-page"
    >
      {/* BRAND HEADLINE SEGMENT */}
      <div className="text-center mb-8">
        <h1 className="font-serif italic text-2xl md:text-3xl text-[#3A1A2A] font-medium tracking-wide uppercase">
          Welcome back
        </h1>
        <p className="text-center text-sm text-gray-400 mt-2 font-sans max-w-[290px] mx-auto">
          Sign in to access an enhanced luxury shopping experience.
        </p>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-y-4">
          {/* <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            className=" border-gray-200 focus:border-[#D45C88] transition-colors w-full "
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="rounded-xl border-gray-200 focus:border-[#D45C88] transition-colors w-full"
            data-testid="password-input"
          /> */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            className="rounded-none border-neutral-200 focus:border-[#3A1A2A] h-12 text-sm font-light tracking-wide transition-colors w-full bg-white px-3 py-2"
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="rounded-none border-neutral-200 focus:border-[#3A1A2A] h-12 text-sm font-light tracking-widest transition-colors w-full bg-white px-3 py-2"
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={errorMessage} data-testid="login-error-message" />

        {/* HaveHer Premium Pill Action Trigger */}
        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-6 bg-[#3A1A2A] hover:bg-[#D45C88] text-white rounded-full py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-3xs cursor-pointer active:scale-[0.99]"
        >
          Sign in
        </SubmitButton>
      </form>

      {/* ACCENT CONVERSIONS */}
      <span className="text-center text-gray-400 text-xs mt-6 font-medium">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline font-bold text-[#D45C88] hover:text-[#3A1A2A] transition-colors bg-transparent border-none outline-none cursor-pointer"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default Login
