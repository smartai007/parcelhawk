"use client"

import { ShieldCheck, Globe, CircleCheck, Sparkles } from "lucide-react"
import whyParcel from "@/public/images/why-precel.png"

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "Every property is reviewed for accuracy and legitimacy before going live.",
  },
  {
    icon: Globe,
    title: "Nationwide Coverage",
    description:
      "Access thousands of rural properties across all 50 states, from coast to coast.",
  },
  {
    icon: CircleCheck,
    title: "Simple Buying Process",
    description:
      "We streamline the paperwork and connect you directly with sellers to close faster.",
  },
  {
    icon: Sparkles,
    title: "Premium Opportunities",
    description:
      "From discovery to closing, we streamline every step of your land purchase.",
  },
]

export default function WhyParcel() {
  return (
    <section className="bg-neutral-950 px-6 py-20 md:px-12 lg:px-20">
      <div
        className="mx-auto flex font-ibm-plex-sans max-w-7xl flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-20">
        {/* Left column */}
        <div className="flex-1">
          <div className="text-3xl font-medium font-phudu uppercase tracking-tight text-white md:text-4xl lg:text-5xl text-balance">
            The Modern Way To Discover And Match Land.
          </div>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#FFFFFF]">
            {"We've Reimagined The Land Buying Experience To Be Transparent, Efficient, And Inspiring. Whether You're Looking For A Weekend Getaway Or A Legacy Investment, We Help You Find Your Ground."}
          </p>
        </div>

        {/* Right column - 2x2 grid */}
        <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center rounded-2xl bg-[#101010] px-6 py-8 text-center"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-neutral-700 bg-[#0C0C0C]">
                <feature.icon className="h-5 w-5 text-[#FFFFFF]" />
              </div>
              <h3 className="text-[19px] font-medium text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-[#D9DADF]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
