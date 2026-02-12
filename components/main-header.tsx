"use client";

import { Moon, Plus, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import ParcelLogo from "@/public/images/parcel.png";
import Image from "next/image";

const THEME_KEY = "theme";

export const MainHeader = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white/20 px-6 py-4 backdrop-blur-md md:px-20">
      <nav className="flex items-center justify-between">
        {/* Logo: Parcel + HAWK */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <Image src={ParcelLogo} alt="Parcel" width={100} height={36} className="h-8 w-auto" />
          </div>
        </div>

        {/* Right side actions */}
        <div className="font-ibm-plex-sans flex items-center gap-3">
          {/* Add Listing button */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-white px-4 py-2 text-md font-medium text-white transition-colors hover:bg-white/70 hover:border-neutral-400"
          >
            <Plus className="h-4 w-4" />
            <span>Add Listing</span>
          </button>

          {/* Login button */}
          <button
            type="button"
            className="rounded-lg border border-white px-5 py-2 text-md font-medium text-white transition-colors hover:bg-white/70 hover:border-neutral-400"
          >
            Login
          </button>

          {/* Theme toggle */}
          {mounted && (
            <div className="flex items-center rounded-full border border-white p-0.5 shadow-sm">
              <button
                onClick={toggleTheme}
                type="button"
                className={`rounded-full p-2 transition-colors ${
                  !isDark
                    ? "bg-neutral-200 text-black"
                    : "text-neutral-600 hover:text-neutral-800"
                }`}
                aria-label="Light mode"
              >
                <Sun className="h-4 w-4 text-white" />
              </button>
              <button
                onClick={toggleTheme}
                type="button"
                className={`rounded-full p-2 transition-colors ${
                  isDark
                    ? "bg-neutral-200/80 text-neutral-800"
                    : "text-neutral-600 hover:text-neutral-800"
                }`}
                aria-label="Dark mode"
              >
                <Moon className="h-4 w-4 text-white" />
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};