"use client"

import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Min: 0–40K | Max: 45K–75K
const MIN_PRESETS = [
  { label: "No Min", value: 0 },
  { label: "$5K", value: 5000 },
  { label: "$10K", value: 10000 },
  { label: "$15K", value: 15000 },
  { label: "$20K", value: 20000 },
  { label: "$25K", value: 25000 },
  { label: "$30K", value: 30000 },
  { label: "$35K", value: 35000 },
  { label: "$40K", value: 40000 },
] as const

const MAX_PRESETS = [
  { label: "$45K", value: 45000 },
  { label: "$50K", value: 50000 },
  { label: "$55K", value: 55000 },
  { label: "$60K", value: 60000 },
  { label: "$65K", value: 65000 },
  { label: "$70K", value: 70000 },
  { label: "$75K", value: 75000 },
  { label: "No MAX", value: 1000000000 },
] as const

export default function PriceRange() {
  const [open, setOpen] = useState(false)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [activeInput, setActiveInput] = useState<"min" | "max" | null>(null)
  const [activeMinPreset, setActiveMinPreset] = useState<number | null>(null)
  const [activeMaxPreset, setActiveMaxPreset] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastActiveInputRef = useRef<"min" | "max">("min")

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  function handlePresetClick(value: number, index: number) {
    // Use last-focused input: clicking preset blurs the input so activeInput is already null
    const target = activeInput ?? lastActiveInputRef.current
    const formatted = value.toLocaleString()
    if (target === "min") {
      setMinPrice(formatted)
      setActiveMinPreset(index)
    } else {
      setMaxPrice(formatted)
      setActiveMaxPreset(index)
    }
  }

  function isPresetActive(target: "min" | "max", i: number) {
    return target === "min" ? activeMinPreset === i : activeMaxPreset === i
  }

  const priceLabel =
    minPrice || maxPrice
      ? `${minPrice ? `$${minPrice}` : ""}-${maxPrice ? `$${maxPrice}` : ""}`.replace(/^-|-$/g, "") || "Price"
      : "Price"

  return (
    <div className="relative inline-block font-ibm-plex-sans" ref={containerRef}>
      {/* Price dropdown trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full max-w-32 items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-[#4ECDC4]/50 hover:text-foreground focus:border-[#4ECDC4] focus:outline-none focus:ring-1 focus:ring-[#4ECDC4]"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>{priceLabel}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[500px] rounded-2xl bg-card p-6 shadow-lg">
          <h2 className="text-lg font-medium text-foreground">
            Price Range
          </h2>

          <div className="mt-4 flex items-center gap-3">
            <input
              type="text"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value)
                setActiveMinPreset(null)
              }}
              onFocus={() => {
                setActiveInput("min")
                lastActiveInputRef.current = "min"
              }}
              onBlur={() => setActiveInput(null)}
              className={`w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                activeInput === "min"
                  ? "border-[#4ECDC4] ring-2 ring-[#4ECDC4]/30"
                  : "border-border focus:border-[#4ECDC4] focus:ring-[#4ECDC4]"
              }`}
            />
            <span className="text-muted-foreground">&mdash;</span>
            <input
              type="text"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value)
                setActiveMaxPreset(null)
              }}
              onFocus={() => {
                setActiveInput("max")
                lastActiveInputRef.current = "max"
              }}
              onBlur={() => setActiveInput(null)}
              className={`w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                activeInput === "max"
                  ? "border-[#4ECDC4] ring-2 ring-[#4ECDC4]/30"
                  : "border-border focus:border-[#4ECDC4] focus:ring-[#4ECDC4]"
              }`}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {(activeInput ?? lastActiveInputRef.current) === "min"
              ? MIN_PRESETS.map((preset, i) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => handlePresetClick(preset.value, i)}
                    className={`rounded-lg border px-10 py-2.5 text-sm font-medium transition-colors ${
                      isPresetActive("min", i)
                        ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-[#4ECDC4]/50 hover:text-foreground"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))
              : MAX_PRESETS.map((preset, i) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => handlePresetClick(preset.value, i)}
                    className={`rounded-lg border px-10 py-2.5 text-sm font-medium transition-colors ${
                      isPresetActive("max", i)
                        ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-[#4ECDC4]/50 hover:text-foreground"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setMinPrice("")
                setMaxPrice("")
                setActiveMinPreset(null)
                setActiveMaxPreset(null)
              }}
              className="flex-1 rounded-xl border border-border bg-card py-3.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl bg-[#04C0AF] py-3.5 text-base font-medium text-white shadow-md transition-colors hover:bg-[#3dbdb5] active:bg-[#35aba3]"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
