import Image from "next/image"
import Link from "next/link"

const activityTypes = [
  {
    name: "Hunting",
    listings: "2,400+",
    image: "/images/acreage.png",
  },
  {
    name: "Fishing",
    listings: "850+",
    image: "/images/farms.png",
  },
  {
    name: "Boating",
    listings: "1,200+",
    image: "/images/ranches.png",
  },
  {
    name: "Beach",
    listings: "600+",
    image: "/images/investment.png",
  },
  {
    name: "Horseback Riding",
    listings: "450+",
    image: "/images/off-grid.png",
  },
]

export default function ExploreActivityTypes() {
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

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {activityTypes.map((type) => (
            <Link
              key={type.name}
              href={`/land-activity?type=${encodeURIComponent(type.name)}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative h-[250px] w-full">
                <Image
                  src={type.image || "/placeholder.svg"}
                  alt={`${type.name} land listings`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 300px) 50vw, (max-width: 270px) 33vw, 20vw"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
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
      </div>
    </section>
  )
}
