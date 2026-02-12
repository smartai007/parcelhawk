"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MapPin, Maximize2 } from "lucide-react"

interface PropertyCardProps {
  image: string
  category: string
  categoryColor: string
  name: string
  price: string
  location: string
  acreage: string
}

export function PropertyCard({
  image,
  category,
  categoryColor,
  name,
  price,
  location,
  acreage,
}: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <div className="group flex flex-col font-ibm-plex-sans p-4 rounded-xl bg-[#F3F3F5]">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium text-primary-foreground"
          // style={{ backgroundColor: categoryColor }}
        >
          {category}
        </span>
        <button
          type="button"
          onClick={() => setIsFavorited(!isFavorited)}
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
      </div>

      <div className="flex items-start justify-between pt-3">
        <h3 className="text-sm font-medium text-foreground">{name}</h3>
        <span className="text-sm font-semibold text-foreground">{price}</span>
      </div>

      <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {location}
        </span>
        <span className="flex items-center gap-1">
          <Maximize2 className="h-3 w-3" />
          {acreage}
        </span>
      </div>
    </div>
  )
}
