"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const activityTypes = [
  { name: "Aquatic Sporting", listings: "1,120+", image: "/images/Browse-By-Activity/Aquatic-Sporting.png" },
  { name: "Aviation", listings: "340+", image: "/images/Browse-By-Activity/Aviation.png" },
  { name: "Beach", listings: "980+", image: "/images/Browse-By-Activity/Beach.png" },
  { name: "Boating", listings: "1,450+", image: "/images/Browse-By-Activity/Boating.png" },
  { name: "Camping", listings: "2,100+", image: "/images/Browse-By-Activity/Camping.png" },
  { name: "Canoeing/Kayaking", listings: "760+", image: "/images/Browse-By-Activity/Canoeing-Kayaking.png" },
  { name: "Conservation", listings: "890+", image: "/images/Browse-By-Activity/Conservation.png" },
  { name: "Fishing", listings: "1,820+", image: "/images/Browse-By-Activity/Fishing.png" },
  { name: "Golfing", listings: "520+", image: "/images/Browse-By-Activity/Golfing.png" },
  { name: "Horseback Riding", listings: "670+", image: "/images/Browse-By-Activity/Horseback-Riding.png" },
  { name: "Hunting", listings: "1,940+", image: "/images/Browse-By-Activity/Hunting.png" },
  { name: "Off-roading", listings: "1,130+", image: "/images/Browse-By-Activity/Off-roading.png" },
  { name: "RVing", listings: "1,280+", image: "/images/Browse-By-Activity/RVing.png" },
  { name: "Skiing", listings: "410+", image: "/images/Browse-By-Activity/Skiing.png" },
]

const CARD_WIDTH = 280
const SCROLL_AMOUNT = 300

export default function ExploreActivityTypes() {
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
            BROWSE BY ACTIVITY
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            Find Land Perfectly Suited For Your Lifestyle And Goals.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div
            ref={scrollRef}
            className="flex w-full gap-4 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {activityTypes.map((type) => (
              <Link
                key={type.name}
                href={`/land-property?activity=${encodeURIComponent(type.name)}`}
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
