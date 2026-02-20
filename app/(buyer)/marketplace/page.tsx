"use client"

import { Search, ChevronDown, Heart } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { PropertyCard } from "@/components/property-card"
import PriceRange from "@/components/price-range"
import SizeRange from "@/components/size-range"
import FilterOption from "@/components/filter-option"
import { MarketplaceMap } from "@/components/marketplace-map"

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

const PAGE_SIZE = 50

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

function MarketplacePageContent() {
  const searchParams = useSearchParams()
  const typeFromUrl = searchParams.get("type") ?? ""
  const [listingsData, setListingsData] = useState<any[]>([])
  const [savedSearch, setSavedSearch] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(listingsData.length / PAGE_SIZE))
  const paginatedListings = listingsData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [listingsData.length])

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const url = typeFromUrl
          ? `${getBaseUrl()}/api/near-by?type=${encodeURIComponent(typeFromUrl)}`
          : `${getBaseUrl()}/api/near-by`
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
          onClick={() => setSavedSearch((prev) => !prev)}
          className={`shrink-0 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            savedSearch
              ? "border border-[#04C0AF] bg-[#04C0AF]/10 text-[#04C0AF] hover:bg-[#04C0AF]/20"
              : "bg-[#04C0AF] text-white hover:bg-[#3dbdb5]"
          }`}
        >
          <Heart
            className={`h-4 w-4 ${savedSearch ? "fill-[#04C0AF]" : "fill-white"}`}
          />
          {savedSearch ? "Saved" : "Save Search"}
        </button>
      </div>

      {/* Map + List: map fixed height, only right panel scrolls */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
          <MarketplaceMap
            listings={listingsData}
            className="h-full w-full rounded-r-lg"
          />
        </div>
        <div className="flex min-h-0 w-1/2 shrink-0 flex-col overflow-hidden border-l border-border bg-background">
          {/* Header */}
          <div className="shrink-0 border-b border-border px-5 pb-4 pt-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-lg font-medium text-foreground">Acreage</h1>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {listingsData.length} results in current map area
                </p>
              </div>
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <span>
                  {"Sort: "}
                  <span className="font-semibold text-foreground">Newest</span>
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Property Grid - only this area scrolls */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            <div className="grid grid-cols-2 gap-4">
              {paginatedListings.map((listing: any) => (
                <PropertyCard
                  key={listing.id}
                  images={listing.images}
                  category={listing.category}
                  categoryColor={listing.categoryColor}
                  name={listing.name}
                  price={listing.price}
                  location={listing.location}
                  acreage={listing.acreage}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="shrink-0 border-t border-border px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
              >
                Previous
              </button>
              <p className="text-sm text-muted-foreground">
                Page{" "}
                <span className="font-medium text-[#04C0AF]">{currentPage}</span>
                {" of "}
                {totalPages}
              </p>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarketplacePageFallback() {
  return (
    <div className="flex h-[calc(100vh-73px)] w-full items-center justify-center font-ibm-plex-sans">
      <p className="text-sm text-muted-foreground">Loading marketplace…</p>
    </div>
  )
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<MarketplacePageFallback />}>
      <MarketplacePageContent />
    </Suspense>
  )
}
