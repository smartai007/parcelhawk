import Link from "next/link"
import findLocationBg from "@/public/images/find-location-bg.png"

export function FindYourLandCta() {
  return (
    <section
      className="relative font-ibm-plex-sans overflow-hidden bg-muted py-16 md:py-24 dark:bg-[#101010]"
      style={{ backgroundImage: `url(${findLocationBg.src})` }}
    >
      {/* Dark mode overlay: dims background image for contrast */}
      <div
        className="absolute inset-0 z-0 bg-white/30 dark:bg-[#101010]"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <h2 className="text-3xl font-medium font-phudu uppercase tracking-wide text-foreground md:text-3xl lg:text-4xl text-balance">
          Ready To Find Your Land?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Join Thousands Of Others Discovering The Freedom Of Land Ownership.
          Start Your Search Today Or List Your Property With Us.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/explore"
            className="inline-flex items-center justify-center rounded-md bg-[#00C9A7] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3dba8f] dark:bg-[#04C0AF] dark:hover:bg-[#05d4c0]"
          >
            Start Exploring
          </Link>
          <Link
            href="/list"
            className="inline-flex items-center justify-center rounded-md bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90"
          >
            List Your Land
          </Link>
        </div>
      </div>
    </section>
  )
}
