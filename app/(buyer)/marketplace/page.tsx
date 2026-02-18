"use client"

import { Search, SlidersHorizontal, ChevronDown, Heart } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import PriceRange from "@/components/price-range"
import SizeRange from "@/components/size-range"
import FilterOption from "@/components/filter-option"
import { useEffect, useState } from "react"

const CATEGORY_COLORS: Record<string, string> = {
  Recreational: "#3b8a6e",
  Acreage: "#5a7d5a",
  Investment: "#c77c32",
  Farm: "#6b7b6b",
}

// TODO: Remove this once the API is implemented
const properties = [
  {
    id: 1,
    image: "/images/property-1.png",
    name: "Whispering Pines",
    price: "$450,000",
    location: "Asheville, NC",
    acreage: "12.5 Acres",
    category: "Recreational",
    categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b",
  },
  {
    id: 2,
    image: "/images/property-2.png",
    name: "Whispering Pines",
    price: "$450,000",
    location: "Asheville, NC",
    acreage: "12.5 Acres",
    category: "Recreational",
    categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b",
  },
  {
    id: 3,
    image: "/images/property-3.png",
    name: "Whispering Pines",
    price: "$450,000",
    location: "Asheville, NC",
    acreage: "12.5 Acres",
    category: "Recreational",
    categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b",
  },
  {
    id: 4,
    image: "/images/property-4.png",
    name: "Whispering Pines",
    price: "$450,000",
    location: "Asheville, NC",
    acreage: "12.5 Acres",
    category: "Recreational",
    categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b",
  },
  {
    id: 5,
    image: "/images/property-1.png",
    name: "Whispering Pines",
    price: "$450,000",
    location: "Asheville, NC",
    acreage: "12.5 Acres",
    category: "Recreational",
    categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b",
  },
  {
    id: 6,
    image: "/images/property-2.png",
    name: "Whispering Pines",
    price: "$450,000",
    location: "Asheville, NC",
    acreage: "12.5 Acres",
    category: "Recreational",
    categoryColor: CATEGORY_COLORS["Recreational"] ?? "#6b7b6b",
  },
]

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export default function MarketplacePage() {
  const [listingsData, setListingsData] = useState<any[]>([])
  const [savedSearch, setSavedSearch] = useState(false)

  const fetchListings = async () => {
    const listing = await fetch(`${getBaseUrl()}/api/near-by`).then((res) =>
      res.json()
    );
    const listingsData = listing.map((listing: any) => ({
      id: listing.id,
      image: listing.photos[0],
      category: listing.propertyType[0],
      categoryColor: "#3b8a6e",
      name: listing.title,
      price: listing.price,
      location: listing.city,
      acreage: listing.acres,
    }));
    setListingsData(listingsData);
  };

  useEffect(() => {
    console.log("fetching listings");
    const listings = fetchListings();
    console.log("listings", listings);
    setListingsData(listingsData);
  }, []);

  return (
    <div className="flex h-full w-full flex-col font-ibm-plex-sans">
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

      {/* Map + List */}
      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1 bg-muted/30" aria-hidden />
        <div className="flex w-1/2 shrink-0 flex-col overflow-hidden border-l border-border bg-background">
      {/* Header */}
      <div className="shrink-0 border-b border-border px-5 pb-4 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-medium text-foreground">Acreage</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              6 results in current map area
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

      {/* Property Grid */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="grid grid-cols-2 gap-4">
          {listingsData.map((listing: any) => (
            <PropertyCard
              key={listing.id}
              image={listing.image}
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
        </div>
      </div>
    </div>
  )
}
