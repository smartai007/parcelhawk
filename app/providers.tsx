"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { SignInModalProvider } from "@/lib/sign-in-modal-context";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <SignInModalProvider>
        {children}
        <Toaster richColors position="bottom-right" />
      </SignInModalProvider>
    </SessionProvider>
  );
}
