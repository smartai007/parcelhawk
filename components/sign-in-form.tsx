"use client"

import { useState } from "react"
import { Eye, EyeOff, X } from "lucide-react"
import BuyerIcon from "@/components/icons/buyer"
import InvestorIcon from "@/components/icons/investor"
type Role = "buyer" | "investor"

type SignInFormProps = {
  onClose?: () => void
}

export default function SignInForm({ onClose }: SignInFormProps) {
  const [selectedRole, setSelectedRole] = useState<Role>("buyer")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const card = (
    <div className="relative w-full max-w-2xl rounded-2xl bg-card p-10 shadow-lg font-ibm-plex-sans">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      )}
        {/* Header */}
        <h1 className="text-3xl font-phudu font-medium uppercase tracking-wide text-foreground">
          Sign In And Continue
        </h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Sign in to your account to continue.
        </p>

        {/* Role Selector */}
        <div className="mt-6">
          <p className="text-base font-phudu font-medium uppercase tracking-wide text-foreground">
            Select Your Role
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedRole("buyer")}
              className={`flex items-center justify-center gap-2 rounded-lg border px-16 py-3 text-base font-medium transition-colors ${
                selectedRole === "buyer"
                  ? "border-[#04C0AF]! bg-[#E4FFFD] text-[#096D64]"
                  : "border-neutral-50 bg-card text-muted-foreground hover:border-neutral-100"
              }`}
            >
              <BuyerIcon active={selectedRole === "buyer"} />
              Buyer
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("investor")}
              className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-base font-medium transition-colors ${
                selectedRole === "investor"
                  ? "border-[#04C0AF]! bg-[#E4FFFD] text-[#096D64]"
                  : "border-neutral bg-card text-muted-foreground hover:border-neutral-100"
              }`}
            >
              <InvestorIcon active={selectedRole === "investor"} />
              Investor
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="mt-6">
          <label
            htmlFor="email"
            className="block font-ibm-plex-sans text-base text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#4ECDC4] focus:outline-none focus:ring-1 focus:ring-[#4ECDC4]"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block font-ibm-plex-sans text-base text-foreground"
          >
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#4ECDC4] focus:outline-none focus:ring-1 focus:ring-[#4ECDC4]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="mt-2 text-right">
            <a
              href="#"
              className="text-base text-[#4ECDC4] hover:text-[#3dbdb5]"
            >
              Forgot Password?
            </a>
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-[#04C0AF] py-3.5 text-lg text-white shadow-md transition-colors hover:bg-[#3dbdb5] active:bg-[#35aba3]"
        >
          Continue
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-base text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="flex w-full items-center text-md justify-center gap-2 rounded-lg border border-border bg-card py-3 font-medium text-foreground transition-colors hover:bg-muted"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Sign Up Link */}
        <p className="mt-5 text-center text-base text-muted-foreground">
          {"Don't have an account? "}
          <a
            href="#"
            className="text-[#4ECDC4] hover:text-[#04C0AF]"
          >
            Join For Free
          </a>
        </p>
      </div>
  )

  if (onClose) {
    return card
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      {card}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  )
}
