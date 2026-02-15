"use client";

import { Moon, Plus, Sun } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";
import ParcelLogo from "@/public/images/parcel.png";
import ParcelLogoDark from "@/public/images/parcel-dark.png";
import Image from "next/image";

const THEME_KEY = "theme";

export const MainHeader = () => {
  const { data: session, status } = useSession();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const isSignedIn = status === "authenticated" && !!session;

  useEffect(() => {
    const onScroll = () => setScrolled(typeof window !== "undefined" && window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
    const prefersDark =
      typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored === "dark" || (!stored && prefersDark);
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(THEME_KEY, "light");
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full border-b px-6 py-4 transition-colors md:px-20 ${
        scrolled
          ? isDark
            ? "border-white/20 bg-neutral-900"
            : "border-neutral-200 bg-white"
          : "border-white/20 backdrop-blur-md"
      }`}
    >
      <nav className="flex items-center justify-between">
        {/* Logo: Parcel + HAWK */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <Image
              src={scrolled && !isDark ? ParcelLogoDark : ParcelLogo}
              alt="Parcel"
              width={100}
              height={36}
              className="h-8 w-auto"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="font-ibm-plex-sans flex items-center gap-3">
          {/* Add Listing button */}
          <button
            type="button"
            className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-md font-medium transition-colors ${
              scrolled
                ? isDark
                  ? "border-white/50 text-white hover:bg-white/20 hover:border-white"
                  : "border-neutral-300 text-neutral-800 hover:bg-neutral-100 hover:border-neutral-400"
                : "border-white text-white hover:bg-white/70 hover:border-neutral-400"
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Add Listing</span>
          </button>

          {/* Log in & Sign up, or Sign out when authenticated — hide until session is resolved to avoid flash */}
          {status === "loading" ? (
            <div
              className={`min-w-30 rounded-lg border px-4 py-2 ${
                scrolled
                  ? isDark
                    ? "border-white/50"
                    : "border-neutral-300"
                  : "border-white"
              }`}
              aria-hidden
            >
              <span className="invisible text-md">Log in</span>
            </div>
          ) : isSignedIn ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className={`rounded-lg border px-4 py-2 text-md font-medium transition-colors ${
                scrolled
                  ? isDark
                    ? "border-white/50 text-white hover:bg-white/20 hover:border-white"
                    : "border-neutral-300 text-neutral-800 hover:bg-neutral-100 hover:border-neutral-400"
                  : "border-white text-white hover:bg-white/70 hover:border-neutral-400"
              }`}
            >
              Sign out
            </button>
          ) : (
            <div
              className={`flex items-center rounded-lg border text-md font-medium ${
                scrolled
                  ? isDark
                    ? "border-white/50 text-white"
                    : "border-neutral-300 text-neutral-800"
                  : "border-white text-white"
              }`}
            >
              <button
                type="button"
                onClick={() => setShowSignInModal(true)}
                className={`rounded-l-md px-4 py-2 transition-colors ${
                  scrolled
                    ? isDark
                      ? "hover:bg-white/20 hover:border-white"
                      : "hover:bg-neutral-100 hover:border-neutral-400"
                    : "hover:bg-white/70 hover:border-neutral-400"
                }`}
              >
                Log in
              </button>
              <span
                className={`h-4 w-px ${
                  scrolled && !isDark ? "bg-neutral-300" : "bg-white/60"
                }`}
                aria-hidden
              />
              <button
                type="button"
                onClick={() => setShowSignUpModal(true)}
                className={`rounded-r-md px-4 py-2 transition-colors ${
                  scrolled
                    ? isDark
                      ? "hover:bg-white/20 hover:border-white"
                      : "hover:bg-neutral-100 hover:border-neutral-400"
                    : "hover:bg-white/70 hover:border-neutral-400"
                }`}
              >
                Sign up
              </button>
            </div>
          )}

          {/* Theme toggle */}
          {mounted && (
            <div
              className={`flex items-center rounded-full border p-0.5 shadow-sm ${
                scrolled ? (isDark ? "border-white/50" : "border-neutral-300") : "border-white"
              }`}
            >
              <button
                onClick={toggleTheme}
                type="button"
                className={`rounded-full p-2 transition-colors ${
                  !isDark
                    ? "bg-neutral-200 text-black"
                    : "text-white hover:text-white"
                }`}
                aria-label="Light mode"
              >
                <Sun className={scrolled && !isDark ? "h-4 w-4 text-amber-500" : "h-4 w-4 text-white"} />
              </button>
              <button
                onClick={toggleTheme}
                type="button"
                className={`rounded-full p-2 transition-colors ${
                  isDark
                    ? "bg-white/20 text-white"
                    : "text-neutral-600 hover:text-neutral-800"
                }`}
                aria-label="Dark mode"
              >
                <Moon className={scrolled && !isDark ? "h-4 w-4 text-neutral-600" : "h-4 w-4 text-white"} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Sign-in modal */}
      {mounted &&
        showSignInModal &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-100 flex h-full w-full items-center justify-center">
            <button
              type="button"
              className="absolute inset-0 bg-black/50 animate-in fade-in animation-duration-200"
              aria-label="Close modal"
              onClick={() => setShowSignInModal(false)}
            />
            <div
              className="relative z-10 px-4 animate-in fade-in zoom-in-95 animation-duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <SignInForm onClose={() => setShowSignInModal(false)} />
            </div>
          </div>,
          document.body
        )}

      {/* Sign-up modal */}
      {mounted &&
        showSignUpModal &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-100 flex h-full w-full items-center justify-center">
            <button
              type="button"
              className="absolute inset-0 bg-black/50 animate-in fade-in animation-duration-200"
              aria-label="Close modal"
              onClick={() => setShowSignUpModal(false)}
            />
            <div
              className="relative z-10 px-4 animate-in fade-in zoom-in-95 animation-duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <SignUpForm onClose={() => setShowSignUpModal(false)} />
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};