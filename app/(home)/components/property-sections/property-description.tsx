import { Layers, Home, Shield, Zap } from "lucide-react"

const quickFacts = [
  { icon: Layers, label: "12.5 Acres", sublabel: "Lot Size" },
  { icon: Home, label: "Vacant Land", sublabel: "Property Type" },
  { icon: Shield, label: "Residential", sublabel: "Zoning" },
  { icon: Zap, label: "Available", sublabel: "Utilities" },
]

export function PropertyDescription() {
  return (
    <section className="flex flex-col gap-8 ">
      {/* Quick Facts Bar */}
      <div className="flex flex-wrap items-center gap-6 rounded-xl border border-border bg-[#FAFAF9] p-5">
        {quickFacts.map((fact) => (
          <div key={fact.label} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFFFFF] border border-[#E7E5E4]">
              <fact.icon className="h-5 w-5 text-[#009689]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{fact.label}</p>
              <p className="text-xs text-muted-foreground">{fact.sublabel}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description Content */}
      <div>
        <h2 className="mb-4 text-xl font-semibold uppercase tracking-wide font-phudu text-foreground">
          About This Property
        </h2>
        <div className="flex flex-col gap-4 text-base leading-relaxed text-[#666666]">
          <p>
            A stunning 12.5-acre parcel located in the heart of the Texas Hill Country. This property features rolling terrain, mature oak trees, and a seasonal creek. Perfect for building your dream home or a weekend retreat. The land is ag-exempt, keeping taxes low. Located just 10 minutes from downtown Dripping Springs and 35 minutes from Austin.
          </p>
          <p>
            The terrain is gently rolling with a nice mix of open pasture and mature hardwoods, providing excellent building sites with privacy and views. Wildlife is abundant in the area, including whitetail deer and turkey.
          </p>
          <p>
            {"Located just minutes from local amenities yet feeling worlds away, this property represents the perfect balance of convenience and seclusion. Don't miss this opportunity to own a piece of the beautiful Texas landscape."}
          </p>
        </div>
      </div>
    </section>
  )
}
