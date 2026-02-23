"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Heart, MapPin, Maximize2, ChevronLeft, ChevronRight } from "lucide-react"
import { useSignInModal } from "@/lib/sign-in-modal-context"

interface PropertyCardProps {
  id: number
  /** Single image (used by featured-list); ignored if images is provided */
  image?: string
  /** Multiple images for carousel (used by marketplace) */
  images?: string[]
  category: string
  categoryColor: string
  name: string
  price: string
  location: string
  acreage: string
  /** When true, heart shows as favorited (e.g. from API isFavorite) */
  initialIsFavorite?: boolean
}

function formatPrice(price: string): string {
  const num = Number(String(price).replace(/[^0-9.]/g, ""))
  if (Number.isNaN(num)) return price
  return `$${num.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
}

// land.com URLs like https://assets.land.com/resizedimages/0/1101/w/80/w/1-5533372506
// Use a larger width for card display (e.g. 600px)
function getImageSrc(url: string): string {
  if (!url) return "/placeholder.svg"
  if (url.startsWith("https://assets.land.com/") && url.includes("/w/80/")) {
    return url.replace("/w/80/", "/w/300/")
  }
  return url
}

export function PropertyCard({
  id,
  image,
  images,
  category,
  categoryColor,
  name,
  price,
  location,
  acreage,
  initialIsFavorite = false,
}: PropertyCardProps) {
  const { data: session } = useSession()
  const { openSignInModal } = useSignInModal()
  const [isFavorited, setIsFavorited] = useState(initialIsFavorite)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setIsFavorited(initialIsFavorite)
  }, [initialIsFavorite])

  const imageList =
    Array.isArray(images) && images.length > 0
      ? images
      : image
        ? [image]
        : [""]
  const hasMultiple = imageList.length > 1

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((i) => (i - 1 + imageList.length) % imageList.length)
  }
  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((i) => (i + 1) % imageList.length)
  }

  const saveFavorite = async (listingId: number) => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ landListingIds: [listingId] }),
    })
    if (res.ok) setIsFavorited((prev) => !prev)
  }

  return (
    <div className="group flex flex-col font-ibm-plex-sans p-4 rounded-xl bg-[#F3F3F5]">
      <div className="group/img relative aspect-4/3 overflow-hidden rounded-xl">
        <Image
          src={getImageSrc(imageList[currentIndex] ?? "")}
          alt={`${name} – image ${currentIndex + 1} of ${imageList.length}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <span
          className="absolute left-3 top-3 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm"
          // style={{ backgroundColor: categoryColor }}
        >
          {category}
        </span>
        <button
          type="button"
          onClick={() => {
            if (!session) {
              openSignInModal()
              return
            }
            saveFavorite(id)
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorited
                ? "fill-red-500 text-red-500"
                : "text-foreground/70"
            }`}
          />
        </button>

        {/* Previous / Next arrows - visible only on image hover */}
        {hasMultiple && (
          <>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-200 group-hover/img:opacity-100"
              aria-hidden
            />
            <button
              type="button"
              onClick={goPrev}
              className="absolute bottom-2 left-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-neutral-600 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100 hover:bg-white/80"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-neutral-600 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100 hover:bg-white/80"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="flex items-start justify-between pt-3">
        <h3 className="text-sm font-medium text-[#030303]">{name}</h3>
        <span className="text-sm font-semibold text-foreground">{formatPrice(price)}</span>
      </div>

      <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {location}
        </span>
        <span className="flex items-center gap-1">
          <Maximize2 className="h-3 w-3" />
          {acreage} Acres
        </span>
      </div>
    </div>
  )
}
