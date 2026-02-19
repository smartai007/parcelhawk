import { MapPin, Heart, Share2, BadgeCheck } from "lucide-react"

export function PropertyAddress() {
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col gap-2">
        {/* Breadcrumb */}
        {/* <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Acreage</span>
          <span aria-hidden="true">{">"}</span>
          <span className="text-primary font-medium">Details</span>
        </nav> */}

        {/* Property Name */}
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
          Hill Country Sanctuary
        </h1>

        {/* Address + Verified */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-base text-muted-foreground">
            <MapPin className="h-4 w-4 text-[#009689]" />
            <span>1240 Oak Ridge Road, Dripping Springs, TX 78620</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[#009689] rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#F0FDFA]">
            <BadgeCheck className="h-3.5 w-3.5 border text-[#009689]" />
            Verified
          </span>
        </div>
      </div>

      {/* Price + Actions */}
      <div className="flex items-start gap-3">
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground md:text-3xl">$450,000</p>
          <p className="text-sm text-muted-foreground">$36,000/acre</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Save to favorites"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Heart className="h-5 w-5" />
          </button>
          <button
            aria-label="Share listing"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
