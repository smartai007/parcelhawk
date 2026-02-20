"use client"

import { createContext, useCallback, useRef, useContext } from "react"

type SignInModalContextValue = {
  openSignInModal: () => void
  registerOpenSignInModal: (open: () => void) => void
}

const SignInModalContext = createContext<SignInModalContextValue | null>(null)

export function SignInModalProvider({ children }: { children: React.ReactNode }) {
  const openRef = useRef<(() => void) | null>(null)

  const openSignInModal = useCallback(() => {
    openRef.current?.()
  }, [])

  const registerOpenSignInModal = useCallback((open: () => void) => {
    openRef.current = open
  }, [])

  return (
    <SignInModalContext.Provider
      value={{ openSignInModal, registerOpenSignInModal }}
    >
      {children}
    </SignInModalContext.Provider>
  )
}

export function useSignInModal(): SignInModalContextValue {
  const ctx = useContext(SignInModalContext)
  if (!ctx) {
    return {
      openSignInModal: () => {},
      registerOpenSignInModal: () => {},
    }
  }
  return ctx
}
