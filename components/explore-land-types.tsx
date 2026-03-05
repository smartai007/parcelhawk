"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const landTypes = [
  {
    name: "Beachfront Property",
    listings: "1,240+",
    image: "/images/Land-Type-Images/Beachfront-Property.png",
  },
  {
    name: "Commercial Property",
    listings: "890+",
    image: "/images/Land-Type-Images/Commercial-Property.png",
  },
  {
    name: "Farms",
    listings: "2,150+",
    image: "/images/Land-Type-Images/Farms.png",
  },
  {
    name: "Horse Property",
    listings: "670+",
    image: "/images/Land-Type-Images/Horse-Property.png",
  },
  {
    name: "Hunting Land",
    listings: "1,820+",
    image: "/images/Land-Type-Images/Hunting-Land.png",
  },
  {
    name: "Lakefront Property",
    listings: "1,430+",
    image: "/images/Land-Type-Images/Lakefront-Property.png",
  },
  {
    name: "Ranches",
    listings: "1,560+",
    image: "/images/Land-Type-Images/Ranches.png",
  },
  {
    name: "Recreational Property",
    listings: "2,340+",
    image: "/images/Land-Type-Images/Recreational-Property.png",
  },
  {
    name: "Residential Property",
    listings: "720+",
    image: "/images/Land-Type-Images/Residential-Property.png",
  },
  {
    name: "Riverfront Property",
    listings: "980+",
    image: "/images/Land-Type-Images/Riverfront-Property.png",
  },
  {
    name: "Timberland",
    listings: "1,090+",
    image: "/images/Land-Type-Images/Timberland.png",
  },
  {
    name: "Undeveloped Land",
    listings: "2,400+",
    image: "/images/Land-Type-Images/Undeveloped-Land.png",
  },
]

const CARD_WIDTH = 280
const CARD_GAP = 16
const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP

export default function ExploreLandTypes() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const delta = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" })
  }

  return (
    <section className="bg-background py-8 px-6 md:py-12">
      <div className="mx-auto max-w-6xl font-ibm-plex-sans">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-medium font-phudu uppercase tracking-wider text-foreground md:text-4xl lg:text-5xl text-balance">
            Explore By Land Type
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            From Sprawling Ranches To Secluded Off-Grid Parcels, Find The
            Perfect Property For Your Vision.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div
            ref={scrollRef}
            className="flex w-full gap-4 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {landTypes.map((type) => (
              <Link
                key={type.name}
                href={`/land-property?type=${encodeURIComponent(type.name)}`}
                className="group relative flex shrink-0 overflow-hidden rounded-2xl"
                style={{ width: CARD_WIDTH }}
              >
                <div className="relative h-[250px] w-full">
                  <Image
                    src={type.image || "/placeholder.svg"}
                    alt={`${type.name} land listings`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="280px"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {type.name}
                  </h3>
                  <p className="text-sm text-neutral-300">
                    {type.listings} Listings
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-[#04C0AF] hover:text-white"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-[#04C0AF] hover:text-white"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
