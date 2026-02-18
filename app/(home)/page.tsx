import { MainHeader } from "@/components/main-header";
import HeroSection from "./components/hero-section";
import ExploreLandTypes from "@/components/explore-land-types";
import WhyParcel from "./components/why-parcel";
import { FeaturedListings } from "@/components/featured-list";
import { FindYourLandCta } from "./components/find-your-land";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExploreLandTypes />
      <FeaturedListings />
      <WhyParcel />
      <FindYourLandCta />
    </>
  )
}
