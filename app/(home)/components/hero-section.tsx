"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useJsApiLoader } from "@react-google-maps/api"
import { Search, ChevronDown, Check } from "lucide-react"
import HeroBg from "@/public/images/hero-bg.png"

const AUTOCOMPLETE_DEBOUNCE_MS = 200

type LocationSuggestion = { label: string }

function LocationSearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    preventGoogleFontsLoading: true,
    language: "en",
    libraries: ["maps", "places"],
  })

  const fetchSuggestions = useCallback(
    (query: string) => {
      if (query.length < 2 || !isLoaded || typeof window === "undefined" || !window.google?.maps?.places) {
        setSuggestions([])
        return
      }
      setLoading(true)
      const service = new window.google.maps.places.AutocompleteService()
      service.getPlacePredictions(
        {
          input: query,
          componentRestrictions: { country: "us" },
          types: ["(regions)"],
        },
        (predictions, status) => {
          setLoading(false)
          if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
            setSuggestions([])
            return
          }
          setSuggestions(
            predictions
              .map((p) => ({
                label: p.description?.replace(/, USA$/, "") ?? p.structured_formatting?.main_text ?? "",
              }))
              .filter((s) => s.label)
          )
          setOpen(true)
        }
      )
    },
    [isLoaded]
  )

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    onChange(v)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (v.trim().length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(v.trim())
      debounceRef.current = null
    }, AUTOCOMPLETE_DEBOUNCE_MS)
  }

  const handleFocus = () => {
    if (suggestions.length > 0) setOpen(true)
  }

  const handleSelect = (label: string) => {
    onChange(label)
    setSuggestions([])
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        className="w-full rounded-md border-0 border-b-2 border-transparent bg-white/10 px-5 py-3 text-sm text-neutral-200 placeholder-white/80 backdrop-blur-md outline-none transition-colors hover:bg-white/15  focus:bg-white/15 focus:ring-0"
      />
      {apiKey && open && (suggestions.length > 0 || loading) && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-0 max-h-56 overflow-y-auto rounded-b-md border border-t-0 border-neutral-200 bg-white py-1 shadow-lg">
          {loading ? (
            <li className="px-4 py-3 text-sm text-neutral-500">Loading...</li>
          ) : (
            suggestions.map((s) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => handleSelect(s.label)}
                  className="w-full px-4 py-2.5 text-left text-sm text-neutral-800 transition-colors hover:bg-neutral-50"
                >
                  {s.label}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

const MIN_ACRES_OPTIONS = ["Any Min Acres", "0.5+ acres", "1+ acres", "20+ acres", "40+ acres", "50+ acres", "80+ acres", "100+ acres"]
const MAX_PRICE_OPTIONS = ["No Max Price", "$5K", "$10K", "$20K", "$50K", "$100K", "$200K", "$500K", "$1M+"]

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
  const [minAcres, setMinAcres] = useState("Any size")
  const [maxPrice, setMaxPrice] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    console.log("searchQuery", searchQuery)
    console.log("minAcres", minAcres)
    console.log("maxPrice", maxPrice)
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
