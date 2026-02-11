"use client";

import { Moon, Plus, Sun } from "lucide-react";
import { useEffect, useState } from "react";

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
    <header className="w-full bg-linear-to-r from-neutral-700 via-neutral-600 to-neutral-700">
      <nav className="flex items-center justify-between px-6 py-2.5">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <span className="text-emerald-400 text-2xl font-bold tracking-tight">P</span>
            <span className="text-neutral-200 text-2xl font-bold tracking-tight">arcel</span>
          </div>
          <span className="text-neutral-400 text-[10px] uppercase tracking-wider self-end mb-0.5 ml-0.5">
            home
          </span>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Add Listing button */}
          <button
            className="flex items-center gap-1.5 rounded-full border border-neutral-400 px-4 py-1.5 text-sm text-neutral-200 transition-colors hover:border-neutral-300 hover:text-neutral-100"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Listing</span>
          </button>

          {/* Login button */}
          <button
            className="rounded-full border border-neutral-400 px-5 py-1.5 text-sm text-neutral-200 transition-colors hover:border-neutral-300 hover:text-neutral-100"
          >
            Login
          </button>

          {/* Theme toggle */}
          {mounted && (
            <div className="flex items-center rounded-full border border-neutral-500 p-0.5">
              <button
                onClick={toggleTheme}
                type="button"
                className={`rounded-full p-1.5 transition-colors ${
                  !isDark ? "bg-neutral-500 text-neutral-100" : "text-neutral-400 hover:text-neutral-200"
                }`}
                aria-label="Light mode"
              >
                <Sun className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={toggleTheme}
                type="button"
                className={`rounded-full p-1.5 transition-colors ${
                  isDark ? "bg-neutral-500 text-neutral-100" : "text-neutral-400 hover:text-neutral-200"
                }`}
                aria-label="Dark mode"
              >
                <Moon className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};