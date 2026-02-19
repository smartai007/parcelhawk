import { PropertyAddress } from "@/app/(home)/components/property-sections/property-address"
import { PropertyImages } from "@/app/(home)/components/property-sections/property-images"
import { PropertyDescription } from "@/app/(home)/components/property-sections/property-description"
import { OwnerBroker } from "@/app/(home)/components/property-sections/owner-broker"
import { PropertyLocation } from "@/app/(home)/components/property-sections/property-location"

export default function PropertyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 font-ibm-plex-sans">
      {/* 1. Full Address Header */}
      <PropertyAddress />

      {/* 2. Property Images Gallery */}
      <div className="mt-8">
        <PropertyImages />
      </div>

      {/* Content Grid: Description (left) + Owner Broker (right) */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 3. Property Description (takes 2/3 width on desktop) */}
        <div className="lg:col-span-2">
          <PropertyDescription />
        </div>

        {/* 4. Owner/Broker Card (takes 1/3 width on desktop) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <OwnerBroker />
          </div>
        </div>
      </div>

      {/* 5. Location Section */}
      <div className="mt-12 mb-8">
        <PropertyLocation />
      </div>
    </main>
  )
}
