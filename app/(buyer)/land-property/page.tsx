"use client"

import { Search, Heart } from "lucide-react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import PriceRange from "@/components/price-range"
import SizeRange from "@/components/size-range"
import FilterOption from "@/components/filter-option"
import { PropertyMapList } from "@/components/property-map-list"
import { useSignInModal } from "@/lib/sign-in-modal-context"

const CATEGORY_COLORS: Record<string, string> = {
  Recreational: "#3b8a6e",
  Acreage: "#5a7d5a",
  Investment: "#c77c32",
  Farm: "#6b7b6b",
}

// Fallback when API fails; no lat/lng so map will show default view
const properties = [
  { id: 1, image: "/images/property-1.png", name: "Whispering Pines", price: "$450,000", location: "Asheville, NC", acreage: "12.5 Acres", category: "Recreational", categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b" },
  { id: 2, image: "/images/property-2.png", name: "Whispering Pines", price: "$450,000", location: "Asheville, NC", acreage: "12.5 Acres", category: "Recreational", categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b" },
  { id: 3, image: "/images/property-3.png", name: "Whispering Pines", price: "$450,000", location: "Asheville, NC", acreage: "12.5 Acres", category: "Recreational", categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b" },
  { id: 4, image: "/images/property-4.png", name: "Whispering Pines", price: "$450,000", location: "Asheville, NC", acreage: "12.5 Acres", category: "Recreational", categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b" },
  { id: 5, image: "/images/property-1.png", name: "Whispering Pines", price: "$450,000", location: "Asheville, NC", acreage: "12.5 Acres", category: "Recreational", categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b" },
  { id: 6, image: "/images/property-2.png", name: "Whispering Pines", price: "$450,000", location: "Asheville, NC", acreage: "12.5 Acres", category: "Recreational", categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b" },
]

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

function LandPropertyPageContent() {
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const { openSignInModal } = useSignInModal()
  const typeFromUrl = searchParams.get("type") ?? ""
  const [listingsData, setListingsData] = useState<any[]>([])
  const [savedSearch, setSavedSearch] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const url = typeFromUrl
          ? `${getBaseUrl()}/api/land-property?type=${encodeURIComponent(typeFromUrl)}`
          : `${getBaseUrl()}/api/land-property`
        const res = await fetch(url)
        if (!res.ok) return
        const contentType = res.headers.get("content-type") ?? ""
        if (!contentType.includes("application/json")) return
        const listing = await res.json()
        if (cancelled || !Array.isArray(listing)) return
        const mapped = listing.map((item: any) => ({
          id: item.id,
          images: item.photos,
          category: item.propertyType?.[0],
          categoryColor: "#3b8a6e",
          name: item.title,
          price: item.price,
          location: item.city,
          acreage: item.acres,
          latitude: item.latitude != null ? Number(item.latitude) : null,
          longitude: item.longitude != null ? Number(item.longitude) : null,
        }))
        setListingsData(mapped)
      } catch {
        setListingsData(properties)
      }
    }
    load()
    return () => { cancelled = true }
  }, [typeFromUrl])

  return (
    <div className="flex h-[calc(100vh-73px)] w-full flex-col overflow-hidden font-ibm-plex-sans">
      {/* Search & Filters - top bar */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-4 py-3">
        <div className="flex min-w-0 max-w-1/2 flex-1 items-center gap-3">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by location"
              className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <PriceRange />
          <SizeRange />
          <FilterOption />
        </div>
        <button
          type="button"
          disabled={saving || listingsData.length === 0}
          onClick={async () => {
            if (savedSearch) {
              setSavedSearch(false)
              return
            }
            if (!session) {
              openSignInModal()
              return
            }
            setSaving(true)
            try {
              const res = await fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  landListingIds: listingsData.map((l) => l.id),
                }),
              })
              if (res.ok) setSavedSearch(true)
            } finally {
              setSaving(false)
            }
          }}
          className={`shrink-0 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${
            savedSearch
              ? "border border-[#04C0AF] bg-[#04C0AF]/10 text-[#04C0AF] hover:bg-[#04C0AF]/20"
              : "bg-[#04C0AF] text-white hover:bg-[#3dbdb5]"
          }`}
        >
          <Heart
            className={`h-4 w-4 ${savedSearch ? "fill-[#04C0AF]" : "fill-white"}`}
          />
          {saving ? "Saving…" : savedSearch ? "Saved" : "Save Search"}
        </button>
      </div>

      <PropertyMapList listings={listingsData} title="Acreage" />
    </div>
  )
}

function LandPropertyPageFallback() {
  return (
    <div className="flex h-[calc(100vh-73px)] w-full items-center justify-center font-ibm-plex-sans">
      <p className="text-sm text-muted-foreground">Loading marketplace…</p>
    </div>
  )
}

export default function LandPropertyPage() {
  return (
    <Suspense fallback={<LandPropertyPageFallback />}>
      <LandPropertyPageContent />
    </Suspense>
  )
}
