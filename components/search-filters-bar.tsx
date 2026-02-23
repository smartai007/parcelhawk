"use client"

import { Search, Heart } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import PriceRange from "@/components/price-range"
import type { PriceRangeOnApply } from "@/components/price-range"
import SizeRange from "@/components/size-range"
import type { SizeRangeOnApply } from "@/components/size-range"
import FilterOption from "@/components/filter-option"
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
  const [savedSearch, setSavedSearch] = useState(false)
  const [saving, setSaving] = useState(false)

  return (
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
        <PriceRange onApply={onPriceRangeApply} />
        <SizeRange onApply={onSizeRangeApply} />
        <FilterOption />
      </div>
      <button
        type="button"
        disabled={saving || listingIds.length === 0}
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
              body: JSON.stringify({ landListingIds: listingIds }),
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
  )
}
