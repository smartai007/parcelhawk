"use client"

import { useState, useRef, useEffect } from "react"
import { Search, ChevronDown } from "lucide-react"
import HeroBg from "@/public/images/hero-bg.png"

const MIN_ACRES_OPTIONS = ["No Min", "1", "5", "10", "20", "50", "100", "200", "500"]
const MAX_ACRES_OPTIONS = ["No Max", "5", "10", "20", "50", "100", "200", "500", "1000+"]

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
    "absolute left-0 top-full z-50 mt-1 min-w-28 max-h-48 w-full overflow-y-auto rounded-md border border-white/10 bg-white/10 py-1 shadow-lg backdrop-blur-md"
  const itemClass = "w-full px-4 py-2 text-left text-sm text-neutral-200 transition-colors hover:bg-white/15"

  return (
    <div ref={ref} className={`relative w-32 shrink-0 ${className ?? ""}`.trim()}>
      <button type="button" onClick={() => setOpen((o) => !o)} className={triggerClass}>
        <span className="min-w-0 truncate">{value || label}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-[#FFFFFF]" />
      </button>
      {open && (
        <ul className={listClass}>
          {options.map((opt) => (
            <li key={opt}>
              <button type="button" onClick={() => { onChange(opt); setOpen(false) }} className={itemClass}>
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
            label="Max Acres"
            options={MAX_ACRES_OPTIONS}
            value={maxAcres}
            onChange={setMaxAcres}
          />
          <input
            type="text"
            placeholder="Search by Location or keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 rounded-md bg-white/10 px-5 py-3 text-sm text-neutral-200 placeholder-white backdrop-blur-md outline-none transition-colors focus:bg-white/15"
          />
          <button
            type="button"
            className="flex justify-between gap-2 items-center rounded-md bg-[#04C0AF] px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-[#3dba8f] cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
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
