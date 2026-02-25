"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useJsApiLoader } from "@react-google-maps/api"

const AUTOCOMPLETE_DEBOUNCE_MS = 200

type LocationSuggestion = { label: string }

export type LocationSearchInputProps = {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  /** Optional. Applied to the input element. */
  className?: string
  /** Called when user selects a suggestion (e.g. to update URL). */
  onSelect?: (label: string) => void
}

export function LocationSearchInput({
  value,
  onChange,
  placeholder = "Search by location",
  className,
  onSelect,
}: LocationSearchInputProps) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    preventGoogleFontsLoading: true,
    language: "en",
    libraries: ["maps", "places"],
  })

  const fetchSuggestions = useCallback(
    (query: string) => {
      if (query.length < 2 || !isLoaded || typeof window === "undefined" || !window.google?.maps?.places) {
        setSuggestions([])
        return
      }
      setLoading(true)
      const service = new window.google.maps.places.AutocompleteService()
      service.getPlacePredictions(
        {
          input: query,
          componentRestrictions: { country: "us" },
          types: ["(regions)"],
        },
        (predictions, status) => {
          setLoading(false)
          if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
            setSuggestions([])
            return
          }
          setSuggestions(
            predictions
              .map((p) => ({
                label: p.description?.replace(/, USA$/, "") ?? p.structured_formatting?.main_text ?? "",
              }))
              .filter((s) => s.label)
          )
          setOpen(true)
        }
      )
    },
    [isLoaded]
  )

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    onChange(v)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (v.trim().length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(v.trim())
      debounceRef.current = null
    }, AUTOCOMPLETE_DEBOUNCE_MS)
  }

  const handleFocus = () => {
    if (suggestions.length > 0) setOpen(true)
  }

  const handleSelect = (label: string) => {
    onChange(label)
    onSelect?.(label)
    setSuggestions([])
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative min-w-0 flex-1">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        className={className ?? "h-10 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"}
      />
      {apiKey && open && (suggestions.length > 0 || loading) && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-0 max-h-56 overflow-y-auto rounded-b-md border border-t-0 border-input bg-background py-1 shadow-lg">
          {loading ? (
            <li className="px-4 py-3 text-sm text-muted-foreground">Loading...</li>
          ) : (
            suggestions.map((s) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => handleSelect(s.label)}
                  className="w-full px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                >
                  {s.label}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
