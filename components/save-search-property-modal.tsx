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

  const teal = "#04C0AF"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 transition-colors hover:text-neutral-600"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 id="modal-title" className="pr-8 text-lg font-semibold text-neutral-900">
          Save Property Search
        </h2>

        {/* Search name input */}
        <div className="mt-5">
          <label
            htmlFor="search-name"
            className="block text-sm font-medium text-neutral-700"
          >
            Search name
          </label>
          <input
            id="search-name"
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter search name"
            className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#04C0AF] focus:ring-1 focus:ring-[#04C0AF]"
          />
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-neutral-200" />

        {/* Frequency */}
        <fieldset>
          <legend className="text-sm font-medium text-neutral-900">
            Frequency
          </legend>
          <div className="mt-3 flex flex-col gap-3">
            {frequencyOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3"
              >
                <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                  <input
                    type="radio"
                    name="frequency"
                    value={option.value}
                    checked={frequency === option.value}
                    onChange={() => setFrequency(option.value)}
                    className="peer sr-only"
                  />
                  <span className="h-5 w-5 rounded-full border-2 border-neutral-300 transition-colors peer-checked:border-[#04C0AF]" />
                  <span
                    className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-[#04C0AF] transition-transform peer-checked:scale-100"
                    aria-hidden
                  />
                </span>
                <span className="text-sm text-neutral-900">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Divider */}
        <div className="my-5 h-px bg-neutral-200" />

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-lg py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: teal }}
          >
            Save Search
          </button>
        </div>
      </div>
    </div>
  )
}
