"use client"

import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, X, Maximize2 } from "lucide-react"

const images = [
  { src: "/images/hero-bg.png", alt: "Aerial view of rolling green hills with scattered oak trees on the property" },
  { src: "/images/hero-bg.png", alt: "Panoramic sunset view showing vast pasture and mature hardwood trees" },
  { src: "/images/hero-bg.png", alt: "Drone view of the property showing wooded areas and open pasture" },
  { src: "/images/hero-bg.png", alt: "Wide aerial view of the Hill Country acreage with green rolling hills" },
  { src: "/images/hero-bg.png", alt: "Drone2 view of the property showing wooded areas and open pasture" },
  { src: "/images/hero-bg.png", alt: "Wide2 aerial view of the Hill Country acreage with green rolling hills" },
  { src: "/images/hero-bg.png", alt: "Drone3 view of the property showing wooded areas and open pasture" },
  { src: "/images/hero-bg.png", alt: "Wide3 aerial view of the Hill Country acreage with green rolling hills" },
]

const THUMBNAIL_COUNT = 6

export function PropertyImages() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  const goNext = useCallback(
    () => setActiveIndex((prev) => (prev + 1) % images.length),
    []
  )
  const goPrev = useCallback(
    () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length),
    []
  )

  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext()
      else if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightboxOpen, goNext, goPrev, closeLightbox])

  const thumbnails = images.slice(1, THUMBNAIL_COUNT + 1)
  const remainingCount = images.length - (THUMBNAIL_COUNT + 1)

  return (
    <>
      <section className="overflow-hidden rounded-2xl bg-foreground/90">
        <div className="flex flex-col gap-1.5 md:flex-row md:h-[480px] lg:h-[520px]">
          {/* Main large image - left side */}
          <div className="relative md:w-[60%] aspect-4/3 md:aspect-auto shrink-0">
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-cover cursor-pointer"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
              onClick={() => openLightbox(activeIndex)}
            />

            {/* Counter badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="flex items-center rounded-full bg-foreground/70 px-3 py-1.5 text-sm font-medium text-card backdrop-blur-sm">
                {activeIndex + 1} / {images.length}
              </span>
              <button
                onClick={() => openLightbox(activeIndex)}
                aria-label="View fullscreen"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/70 text-card backdrop-blur-sm transition-colors hover:bg-foreground/90"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              aria-label="Previous image"
              className="absolute bottom-6 left-4 flex h-10 w-10 items-center justify-center text-card transition-opacity hover:opacity-80"
            >
              <ChevronLeft className="h-8 w-8" strokeWidth={3} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              aria-label="Next image"
              className="absolute bottom-6 right-4 flex h-10 w-10 items-center justify-center text-card transition-opacity hover:opacity-80 md:right-auto md:left-[calc(100%-3.5rem)]"
            >
              <ChevronRight className="h-8 w-8" strokeWidth={3} />
            </button>
          </div>

          {/* Right side - 2x3 thumbnail grid */}
          <div className="hidden md:grid md:w-[40%] grid-cols-2 grid-rows-3 gap-1.5">
            {thumbnails.map((img, i) => {
              const isLast = i === thumbnails.length - 1 && remainingCount > 0
              return (
                <div
                  key={img.alt}
                  className="group relative cursor-pointer overflow-hidden"
                  onClick={() => isLast ? openLightbox(i + 1) : setActiveIndex(i + 1)}
                  role="button"
                  tabIndex={0}
                  aria-label={isLast ? `View all ${images.length} images` : `View image ${i + 2}`}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (isLast ? openLightbox(i + 1) : setActiveIndex(i + 1))
                  }
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />

                  {/* "Show more" overlay on the last thumbnail */}
                  {isLast && (
                    <div className="absolute inset-0 flex items-end justify-end p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/70 text-card backdrop-blur-sm">
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile thumbnail strip */}
          <div className="flex gap-1.5 overflow-x-auto px-1.5 pb-1.5 md:hidden">
            {images.slice(1).map((img, i) => (
              <div
                key={img.src}
                className={`relative h-16 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg ring-2 ${
                  activeIndex === i + 1 ? "ring-primary" : "ring-transparent"
                }`}
                onClick={() => setActiveIndex(i + 1)}
                role="button"
                tabIndex={0}
                aria-label={`View image ${i + 2}`}
                onKeyDown={(e) => e.key === "Enter" && setActiveIndex(i + 1)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
          aria-modal="true"
        >
          <button
            onClick={closeLightbox}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-card transition-colors hover:bg-card/40"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            aria-label="Previous image"
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-card/20 text-card transition-colors hover:bg-card/40"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            className="relative mx-16 h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Next image"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-card/20 text-card transition-colors hover:bg-card/40"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Counter + dots */}
          <div className="absolute bottom-6 flex flex-col items-center gap-3">
            <span className="text-sm font-medium text-card">
              {activeIndex + 1} / {images.length}
            </span>
            <div className="flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveIndex(i)
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === activeIndex
                      ? "bg-card scale-125"
                      : "bg-card/40 hover:bg-card/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
