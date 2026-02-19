"use client"

import { MapPin, Navigation, ExternalLink } from "lucide-react"

const proximityItems = [
  { label: "12 min to Highway 290", color: "bg-primary" },
  { label: "18 min to Dripping Springs", color: "bg-primary" },
  { label: "Near Pedernales Falls", color: "bg-primary" },
]

export function PropertyLocation() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-lg font-bold uppercase tracking-wide text-foreground">
        Location
      </h2>

      {/* Map Container */}
      <div className="relative overflow-hidden rounded-xl border border-border">
        <div className="relative h-72 w-full bg-muted sm:h-80 md:h-96">
          <iframe
            title="Property location on map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-98.15%2C30.15%2C-97.95%2C30.3&layer=mapnik&marker=30.225%2C-98.05"
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>

        {/* Map Actions */}
        <div className="flex items-center justify-center gap-3 border-t border-border bg-card px-4 py-3">
          <a
            href="https://www.openstreetmap.org/?mlat=30.225&mlon=-98.05#map=13/30.225/-98.05"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Navigation className="h-4 w-4" />
            View on Map
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=30.225,-98.05"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <ExternalLink className="h-4 w-4" />
            Get Directions
          </a>
        </div>
      </div>

      {/* Proximity Tags */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        {proximityItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
