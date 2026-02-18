"use client"

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  type GoogleMapProps,
} from "@react-google-maps/api"
import { useMemo } from "react"

const DEFAULT_CENTER = { lat: 39.8283, lng: -98.5795 } // US center
const DEFAULT_ZOOM = 4

export type ListingMapItem = {
  id: number | string
  latitude?: number | null
  longitude?: number | null
  name?: string
  price?: string | number
}

const containerStyle = {
  width: "100%",
  height: "100%",
}

type MarketplaceMapProps = {
  listings: ListingMapItem[]
  /** Optional: control selected listing to center or highlight */
  selectedId?: number | string | null
  className?: string
  mapOptions?: GoogleMapProps["options"]
}

export function MarketplaceMap({
  listings,
  selectedId,
  className = "",
  mapOptions,
}: MarketplaceMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-marketplace",
    googleMapsApiKey: apiKey ?? "",
  })

  const markersWithCoords = useMemo(
    () =>
      listings.filter(
        (l): l is ListingMapItem & { latitude: number; longitude: number } =>
          l.latitude != null &&
          l.longitude != null &&
          Number.isFinite(l.latitude) &&
          Number.isFinite(l.longitude)
      ),
    [listings]
  )

  const options = useMemo<GoogleMapProps["options"]>(
    () => ({
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      ...mapOptions,
    }),
    [mapOptions]
  )

  if (!apiKey) {
    return (
      <div
        className={`flex items-center justify-center bg-muted/30 text-muted-foreground ${className}`}
        style={containerStyle}
      >
        <p className="text-center text-sm">
          Add <code className="rounded bg-muted px-1">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to
          .env.local to show the map.
        </p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div
        className={`flex items-center justify-center bg-muted/30 text-destructive ${className}`}
        style={containerStyle}
      >
        <p className="text-center text-sm">Failed to load Google Maps.</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div
        className={`flex items-center justify-center bg-muted/30 text-muted-foreground ${className}`}
        style={containerStyle}
      >
        <p className="text-center text-sm">Loading map…</p>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`} style={containerStyle}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        options={options}
        onLoad={(map) => {
          if (markersWithCoords.length === 0) return
          const bounds = new google.maps.LatLngBounds()
          markersWithCoords.forEach((l) => {
            bounds.extend({ lat: l.latitude!, lng: l.longitude! })
          })
          map.fitBounds(bounds, { top: 24, right: 24, bottom: 24, left: 24 })
        }}
      >
        {markersWithCoords.map((listing) => (
          <Marker
            key={listing.id}
            position={{ lat: listing.latitude!, lng: listing.longitude! }}
            title={[listing.name, listing.price].filter(Boolean).join(" — ") || undefined}
          />
        ))}
      </GoogleMap>
    </div>
  )
}
