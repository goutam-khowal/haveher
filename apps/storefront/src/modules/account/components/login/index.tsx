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
  
  // Track error messages manually since we're handling the submission programmatically
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    
    // Execute the server action directly
    const result = await login(null, formData)

    // Medusa's login action returns a string (error message) if it fails.
    // If it returns nothing (undefined), it means authentication was successful!
    if (typeof result === "string") {
      setErrorMessage(result)
    } else {
      // Check if a redirect parameter exists in the URL string
      const redirectTo = searchParams.get("redirect")
      
      if (redirectTo) {
        // Force the router straight to /in/checkout
        router.push(`/${countryCode}${redirectTo}`)
      } else {
        router.push(`/${countryCode}/account`)
      }
      router.refresh()
    }
  }

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-xl font-bold uppercase tracking-wide text-gray-950 mb-4">Welcome back</h1>
      <p className="text-center text-sm text-gray-500 mb-8">
        Sign in to access an enhanced shopping experience.
      </p>
      
      {/* Handled via onSubmit instead of standard action to intercept the redirect route */}
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-y-3">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        
        <ErrorMessage error={errorMessage} data-testid="login-error-message" />
        
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6 bg-berry-primary hover:bg-berry-dark text-white rounded-full py-3 font-semibold transition-all shadow-md shadow-berry-primary/20">
          Sign in
        </SubmitButton>
      </form>
      
      <span className="text-center text-gray-500 text-xs mt-6">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline font-medium text-berry-primary hover:text-berry-dark transition-colors"
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
