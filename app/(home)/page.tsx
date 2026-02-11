import { MainHeader } from "@/components/main-header";
import HeroSection from "./components/hero-section";
import ExploreLandTypes from "@/components/explore-land-types";
import WhyParcel from "./components/why-parcel";

export default function HomePage() {
  return (
    <>
      <MainHeader />
      <HeroSection />
      <ExploreLandTypes />
      <WhyParcel />
    </>
  )
}
