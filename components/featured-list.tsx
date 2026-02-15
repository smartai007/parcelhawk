import { ArrowUpRight } from "lucide-react"
import { PropertyCard } from "./property-card"

const listings = [
  {
    image: "/images/property-1.png",
    category: "Recreational",
    categoryColor: "#3b8a6e",
    name: "Whispering Pines Estate",
    price: "$450,000",
    location: "Asheville, NC",
    acreage: "12.5 Acres",
  },
  {
    image: "/images/property-2.png",
    category: "Acreage",
    categoryColor: "#5a7d5a",
    name: "Whispering Pines Estate",
    price: "$450,000",
    location: "Asheville, NC",
    acreage: "12.5 Acres",
  },
  {
    image: "/images/property-3.png",
    category: "Investment",
    categoryColor: "#c77c32",
    name: "Whispering Pines Estate",
    price: "$450,000",
    location: "Asheville, NC",
    acreage: "12.5 Acres",
  },
  {
    image: "/images/property-4.png",
    category: "Farm",
    categoryColor: "#6b7b6b",
    name: "Whispering Pines Estate",
    price: "$450,000",
    location: "Asheville, NC",
    acreage: "12.5 Acres",
  },
]

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function FeaturedListings() {
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

  // console.log("listingsData", listingsData);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center font-ibm-plex-sans">
        <h2 className="text-3xl font-medium font-phudu uppercase tracking-wide text-foreground sm:text-4xl lg:text-5xl text-balance">
          Featured Listings
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Hand-Picked Properties That Offer Exceptional Value And Natural
          Beauty.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 font-ibm-plex-sans gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {listingsData.map((listing: any, index: number) => (
          <PropertyCard key={index} {...listing} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="#"
          className="inline-flex items-center font-ibm-plex-sans gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          View all listings
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
