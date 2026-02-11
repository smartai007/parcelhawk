"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"

const MIN_ACRES_OPTIONS = ["No Min", "1", "5", "10", "20", "50", "100", "200", "500"]
const MAX_ACRES_OPTIONS = ["No Max", "5", "10", "20", "50", "100", "200", "500", "1000+"]

function AcresDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-4 bg-neutral-800/80 px-4 py-3 text-sm text-neutral-300 transition-colors hover:bg-neutral-700/80 focus:outline-none"
      >
        <span>{value || label}</span>
        <ChevronDown className="h-4 w-4 text-neutral-400" />
      </button>
      {open && (
        <ul className="absolute left-0 top-full z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-neutral-700 bg-neutral-800 py-1 shadow-lg">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-300 transition-colors hover:bg-neutral-700"
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function HeroSection() {
  const [minAcres, setMinAcres] = useState("")
  const [maxAcres, setMaxAcres] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative flex min-h-[calc(100vh-52px)] flex-col items-center justify-center bg-neutral-900 px-4">
      {/* Subtle radial overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* Heading */}
        <h1 className="text-balance text-4xl font-bold uppercase tracking-wider text-white md:text-5xl lg:text-6xl">
          Find Your Perfect Land
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-balance text-sm leading-relaxed text-neutral-300 md:text-base">
          Discover Acreage, Farms, Ranches, And Recreational Land Across The Country. The Simplest Way To Buy And Sell Rural Real Estate.
        </p>

        {/* Search Bar */}
        <div className="mt-2 flex flex-col items-stretch overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800/60 sm:flex-row sm:items-center">
          <AcresDropdown
            label="Min Acres"
            options={MIN_ACRES_OPTIONS}
            value={minAcres}
            onChange={setMinAcres}
          />
          <div className="hidden h-8 w-px bg-neutral-700 sm:block" />
          <AcresDropdown
            label="Max Acres"
            options={MAX_ACRES_OPTIONS}
            value={maxAcres}
            onChange={setMaxAcres}
          />
          <div className="hidden h-8 w-px bg-neutral-700 sm:block" />
          <input
            type="text"
            placeholder="Search by Location or keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-neutral-800/80 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 outline-none transition-colors focus:bg-neutral-700/80 sm:min-w-[240px]"
          />
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>

        {/* Trust badge */}
        <p className="mt-2 text-xs uppercase tracking-widest text-neutral-400">
          Trusted by over 10,000 landowners
        </p>
      </div>
    </section>
  )
}
