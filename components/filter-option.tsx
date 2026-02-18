"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Sparkles } from "lucide-react"

const PROPERTY_TYPES = [
  "Acreage",
  "Farm",
  "Ranch",
  "Recreational",
  "Hunting",
  "Waterfront",
]

const FEATURES = [
  "Water",
  "Power",
  "Road Access",
  "Fenced",
  "House",
  "Barn",
]

const PRICE_MIN_OPTIONS = ["0", "10K", "25K", "50K", "75K", "100K"]
const PRICE_MAX_OPTIONS = ["50K", "100K", "200K", "500K", "1M", "5M"]

const ACREAGE_MIN_OPTIONS = ["No Min", "5", "10", "20", "50", "100"]
const ACREAGE_MAX_OPTIONS = ["10", "20", "50", "100", "200", "500", "No Max"]

export default function FilterOption({
  onApply,
  onReset,
}: {
  onClose?: () => void
  onApply?: () => void
  onReset?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [priceMin, setPriceMin] = useState("0")
  const [priceMax, setPriceMax] = useState("100K")
  const [acreageMin, setAcreageMin] = useState("No Min")
  const [acreageMax, setAcreageMax] = useState("No Max")
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(
    []
  )
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

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

  function togglePropertyType(type: string) {
    setSelectedPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  function toggleFeature(feature: string) {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    )
  }

  function handleReset() {
    setAiPrompt("")
    setPriceMin("0")
    setPriceMax("100K")
    setAcreageMin("No Min")
    setAcreageMax("No Max")
    setSelectedPropertyTypes([])
    setSelectedFeatures([])
    onReset?.()
  }

  function handleApply() {
    setOpen(false)
    onApply?.()
  }

  return (
    <div className="relative inline-block font-ibm-plex-sans" ref={containerRef}>
      {/* Trigger - same style as size-range */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full min-w-28 items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-[#4ECDC4]/50 hover:text-foreground focus:border-[#4ECDC4] focus:outline-none focus:ring-1 focus:ring-[#4ECDC4]"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>More Filters</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 flex w-full min-w-[500px] max-h-[85vh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-lg font-medium text-foreground">More Filters</h2>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {/* AI Prompt Search */}
        <div className="mt-1 rounded-xl border-2 border-[#F3F3F5] p-4 bg-[#F3F3F5]/50">
          <p className="mb-3 text-sm font-medium text-[#4ECDC4]">
            AI Prompt Search
          </p>
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g, 10 acres near a lake in Texas under $200k"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/30"
          />
          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#04C0AF] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3dbdb5]">
            <Sparkles className="h-4 w-4" />
            Generate Filters
          </button>
        </div>

        {/* Price Range */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Price Range
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs text-muted-foreground">
                Minimum
              </label>
              <div className="relative">
                <select
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 pr-8 text-sm text-foreground focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/30"
                >
                  {PRICE_MIN_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <span className="mt-5 text-muted-foreground">-</span>
            <div className="flex-1">
              <label className="mb-1 block text-xs text-muted-foreground">
                Maximum
              </label>
              <div className="relative">
                <select
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 pr-8 text-sm text-foreground focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/30"
                >
                  {PRICE_MAX_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acreage */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Acreage
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs text-muted-foreground">
                Minimum (acres)
              </label>
              <div className="relative">
                <select
                  value={acreageMin}
                  onChange={(e) => setAcreageMin(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 pr-8 text-sm text-foreground focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/30"
                >
                  {ACREAGE_MIN_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <span className="mt-5 text-muted-foreground">-</span>
            <div className="flex-1">
              <label className="mb-1 block text-xs text-muted-foreground">
                Maximum (acres)
              </label>
              <div className="relative">
                <select
                  value={acreageMax}
                  onChange={(e) => setAcreageMax(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 pr-8 text-sm text-foreground focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/30"
                >
                  {ACREAGE_MAX_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Property Type
          </h3>
          <div className="flex flex-col gap-2.5">
            {PROPERTY_TYPES.map((type) => (
              <label
                key={type}
                className="group flex cursor-pointer items-center gap-3"
              >
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                    selectedPropertyTypes.includes(type)
                      ? "border-[#4ECDC4] bg-[#4ECDC4]"
                      : "border-border bg-background"
                  }`}
                >
                  {selectedPropertyTypes.includes(type) && (
                    <svg
                      className="h-3 w-3 text-background"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={selectedPropertyTypes.includes(type)}
                  onChange={() => togglePropertyType(type)}
                  className="sr-only"
                />
                <span className="text-sm text-foreground transition-colors group-hover:text-foreground/80">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 pb-2">
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Features
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {FEATURES.map((feature) => (
              <button
                key={feature}
                onClick={() => toggleFeature(feature)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  selectedFeatures.includes(feature)
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:border-foreground/40"
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-border px-5 py-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-xl border border-border bg-card py-3.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleApply}
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
