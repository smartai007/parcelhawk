"use client"

import { useState } from "react"
import { X } from "lucide-react"

type Frequency = "instant" | "daily" | "none"

interface SavePropertySearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (data: { searchName: string; frequency: Frequency }) => void
  defaultSearchName?: string
}

export function SavePropertySearchModal({
  isOpen,
  onClose,
  onSave,
  defaultSearchName = "",
}: SavePropertySearchModalProps) {
  const [searchName, setSearchName] = useState(defaultSearchName)
  const [frequency, setFrequency] = useState<Frequency>("instant")

  if (!isOpen) return null

  const handleSave = () => {
    onSave?.({ searchName, frequency })
    onClose()
  }

  const frequencyOptions: { value: Frequency; label: string }[] = [
    { value: "instant", label: "Instant Updated" },
    { value: "daily", label: "Daily Updates" },
    { value: "none", label: "No Updates" },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-sm rounded-xl bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 id="modal-title" className="text-lg font-semibold text-foreground">
          Save Property Search
        </h2>

        {/* Search name input */}
        <div className="mt-5">
          <label
            htmlFor="search-name"
            className="block text-sm text-muted-foreground"
          >
            Search name
          </label>
          <input
            id="search-name"
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter search name"
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-teal focus:ring-1 focus:ring-teal"
          />
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-border" />

        {/* Frequency */}
        <fieldset>
          <legend className="text-sm font-medium text-foreground">
            Frequency
          </legend>
          <div className="mt-3 flex flex-col gap-3">
            {frequencyOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3"
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <input
                    type="radio"
                    name="frequency"
                    value={option.value}
                    checked={frequency === option.value}
                    onChange={() => setFrequency(option.value)}
                    className="peer sr-only"
                  />
                  <span className="h-5 w-5 rounded-full border-2 border-muted-foreground transition-colors peer-checked:border-teal" />
                  <span className="absolute h-2.5 w-2.5 scale-0 rounded-full bg-teal transition-transform peer-checked:scale-100" />
                </span>
                <span className="text-sm text-foreground">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Divider */}
        <div className="my-5 h-px bg-border" />

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border bg-card py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-teal py-2.5 text-sm font-medium text-teal-foreground transition-colors hover:opacity-90"
          >
            Save Search
          </button>
        </div>
      </div>
    </div>
  )
}
