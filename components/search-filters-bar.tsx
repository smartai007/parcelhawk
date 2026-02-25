"use client"

import { Search, Heart } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { LocationSearchInput } from "@/components/location-search-input"
import PriceRange from "@/components/price-range"
import type { PriceRangeOnApply } from "@/components/price-range"
import SizeRange from "@/components/size-range"
import type { SizeRangeOnApply } from "@/components/size-range"
import FilterOption from "@/components/filter-option"
import { SavePropertySearchModal } from "@/components/save-search-property-modal"
import { useSignInModal } from "@/lib/sign-in-modal-context"

interface SearchFiltersBarProps {
  /** Listing IDs for "Save Search" (saves these to favorites). Button disabled when empty. */
  listingIds?: number[]
  /** Called when user applies price range (min, max in dollars; null = no limit). */
  onPriceRangeApply?: PriceRangeOnApply
  /** Called when user applies size range (min, max in acres; null = no limit). */
  onSizeRangeApply?: SizeRangeOnApply
}

export function SearchFiltersBar({
  listingIds = [],
  onPriceRangeApply,
  onSizeRangeApply,
}: SearchFiltersBarProps) {
  const { data: session } = useSession()
  const { openSignInModal } = useSignInModal()
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const locationFromUrl = searchParams.get("location") ?? ""
  const [locationDraft, setLocationDraft] = useState(locationFromUrl)

  useEffect(() => {
    setLocationDraft(locationFromUrl)
  }, [locationFromUrl])

  const handleLocationSelect = (selected: string) => {
    const next = new URLSearchParams(searchParams.toString())
    if (selected.trim()) next.set("location", selected.trim())
    else next.delete("location")
    router.push(`${pathname}?${next.toString()}`)
  }

  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-4 py-3">
      <div className="flex min-w-0 max-w-1/2 flex-1 items-center gap-3">
        <div className="relative flex min-w-0 flex-1 items-center">
          <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <LocationSearchInput
            value={locationDraft}
            onChange={setLocationDraft}
            onSelect={handleLocationSelect}
            placeholder="Search by location"
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <PriceRange onApply={onPriceRangeApply} />
        <SizeRange onApply={onSizeRangeApply} />
        <FilterOption />
      </div>
      <button
        type="button"
        onClick={() => {
          if (!session) {
            openSignInModal()
            return
          }
          setSaveModalOpen(true)
        }}
        className="shrink-0 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors bg-[#04C0AF] text-white hover:bg-[#3dbdb5] disabled:opacity-50"
      >
        <Heart className="h-4 w-4 fill-white" />
        Save Search
      </button>
      <SavePropertySearchModal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        onSave={() => setSaveModalOpen(false)}
      />
    </div>
  )
}
