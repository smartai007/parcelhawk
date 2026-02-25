"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronDown, Check } from "lucide-react"
import { LocationSearchInput } from "@/components/location-search-input"
import HeroBg from "@/public/images/hero-bg.png"

const MIN_ACRES_OPTIONS = ["Any Min Acres", "0.5+ acres", "1+ acres", "20+ acres", "40+ acres", "50+ acres", "80+ acres", "100+ acres"]
const MAX_PRICE_OPTIONS = ["No Max Price", "$5K", "$10K", "$20K", "$50K", "$100K", "$200K", "$500K", "$1M+"]

function parseMinAcresFromLabel(label: string): number | null {
  if (!label || label === "Any Min Acres" || label === "Any size") return null
  const match = label.match(/^([\d.]+)\+\s*acres?$/i)
  return match ? Number(match[1]) : null
}

function parseMaxPriceFromLabel(label: string): number | null {
  if (!label || label === "No Max Price") return null
  const match = label.match(/\$(\d+(?:\.\d+)?)(K|M)?\+?$/i)
  if (!match) return null
  let n = Number(match[1])
  if (match[2] === "K") n *= 1000
  else if (match[2] === "M") n *= 1_000_000
  return Number.isFinite(n) ? n : null
}

type AcresDropdownProps = {
  label: string
  options: string[]
  value: string
  onChange: (val: string) => void
  className?: string
}

function AcresDropdown({ label, options, value, onChange, className }: AcresDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [open])

  const triggerClass =
    "flex w-full min-w-0 items-center justify-between gap-2 rounded-md bg-white/10 px-4 py-3 text-sm text-neutral-200 backdrop-blur-md transition-colors hover:bg-white/15 focus:outline-none"
  const listClass =
    "absolute left-0 top-full z-50 mt-1 min-w-[140px] max-h-56 w-full overflow-y-auto rounded-b-md bg-white py-1 shadow-lg"
  const isSelected = (opt: string) => (value || label) === opt || (!value && opt === options[0])

  return (
    <div ref={ref} className={`relative w-36 shrink-0 ${className ?? ""}`.trim()}>
      <button type="button" onClick={() => setOpen((o) => !o)} className={triggerClass}>
        <span className="min-w-0 truncate">{value || label}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-[#FFFFFF]" />
      </button>
      {open && (
        <ul className={listClass}>
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => { onChange(opt); setOpen(false) }}
                className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50 ${
                  isSelected(opt)
                    ? "text-[#04C0AF] font-medium"
                    : "text-neutral-800"
                }`}
              >
                <span>{opt}</span>
                {isSelected(opt) && <Check className="h-4 w-4 shrink-0 text-[#04C0AF]" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function HeroSection() {
  const router = useRouter()
  const [minAcres, setMinAcres] = useState("Any Min Acres")
  const [maxPrice, setMaxPrice] = useState("No Max Price")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    const location = searchQuery.trim()
    const minAcresNum = parseMinAcresFromLabel(minAcres)
    const maxPriceNum = parseMaxPriceFromLabel(maxPrice)
    if (location) params.set("location", location)
    if (minAcresNum != null) params.set("minAcres", String(minAcresNum))
    if (maxPriceNum != null) params.set("maxPrice", String(maxPriceNum))
    const qs = params.toString()
    router.push(`/land-property${qs ? `?${qs}` : ""}`)
  }

  return (
    <section className="relative flex min-h-[calc(500px)] -mt-[80px] flex-col items-center justify-center bg-neutral-900 px-4 bg-cover bg-center" style={{ backgroundImage: `url(${HeroBg.src})` }}>
      {/* Subtle radial overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center gap-6 mt-20 text-center">
        {/* Heading */}
        <h1 className="font-phudu text-balance text-3xl font-medium uppercase tracking-wider text-white md:text-4xl lg:text-5xl">
          Find Your Perfect Land
        </h1>

        {/* Subtitle */}
        <p className="font-ibm-plex-sans max-w-2xl text-balance text-sm leading-relaxed text-[#FFFFFF] md:text-lg">
          Discover Acreage, Farms, Ranches, And Recreational Land Across The<br /> Country. The Simplest Way To Buy And Sell Rural Real Estate.
        </p>

        {/* Search Bar */}
        <div className="font-ibm-plex-sans mt-2 flex w-[700px] flex-col items-stretch gap-1.5 rounded-md border border-white/10 bg-white/10 px-1.5 py-1.5 backdrop-blur-md sm:flex-row sm:items-center">
          <AcresDropdown
            label="Min Acres"
            options={MIN_ACRES_OPTIONS}
            value={minAcres}
            onChange={setMinAcres}
          />
          <AcresDropdown
            label="Max Price"
            options={MAX_PRICE_OPTIONS}
            value={maxPrice}
            onChange={setMaxPrice}
          />
          <LocationSearchInput
            placeholder="Search by Location or keyword"
            value={searchQuery}
            onChange={setSearchQuery}
            className="w-full rounded-md border-0 border-b-2 border-transparent bg-white/10 px-5 py-3 text-sm text-neutral-200 placeholder-white/80 backdrop-blur-md outline-none transition-colors hover:bg-white/15 focus:bg-white/15 focus:ring-0"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#04C0AF] text-white transition-colors hover:bg-[#059a8f] cursor-pointer"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Trust badge */}
        <p className="mt-2 font-ibm-plex-sans text-sm uppercase tracking-widest text-neutral-100">
          Trusted by over 10,000 landowners
        </p>
      </div>
    </section>
  )
}
