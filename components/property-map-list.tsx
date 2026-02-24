"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { MarketplaceMap } from "@/components/marketplace-map"

const PAGE_SIZE = 50

export interface ListingItem {
  id: number
  images?: string[]
  category?: string
  categoryColor?: string
  name: string
  price: string
  location: string
  acreage: string
  latitude?: number | null
  longitude?: number | null
  /** When true, card heart shows as favorited (from API when user is signed in) */
  isFavorite?: boolean
  /** Listing URL from landListings.url; used for "view listing" link (opens in new tab) */
  url?: string | null
}

interface PropertyMapListProps {
  listings: ListingItem[]
  title?: string
}

export function PropertyMapList({ listings, title = "Acreage" }: PropertyMapListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE))
  const paginatedListings = listings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [listings.length])

  return (
    <div className="flex w-full">
      <div className="sticky top-[73px] h-[calc(100vh-73px)] min-w-0 w-1/2 shrink-0">
        <div className="relative h-full w-full">
          <MarketplaceMap
            listings={listings}
            className="h-full w-full rounded-r-lg"
          />
        </div>
      </div>
      <div className="flex w-1/2 shrink-0 flex-col border-l border-border bg-background">
        <div className="shrink-0 border-b border-border px-5 pb-4 pt-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-lg font-medium text-foreground">{title}</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {listings.length} results in current map area
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

        <div className="px-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            {paginatedListings.map((listing) => (
              <PropertyCard
                id={listing.id}
                key={listing.id}
                images={listing.images}
                category={listing.category ?? ""}
                categoryColor={listing.categoryColor ?? "#6b7b6b"}
                name={listing.name}
                price={listing.price}
                location={listing.location}
                acreage={listing.acreage}
                initialIsFavorite={listing.isFavorite}
                detailUrl={listing.url ?? undefined}
              />
            ))}
          </div>
        </div>

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
  )
}
