"use client"

import { MessageSquare, Phone } from "lucide-react"

export function OwnerBroker() {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      {/* Owner Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-bold text-foreground">
          JD
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-foreground">John Doe</p>
          <p className="text-xs text-muted-foreground">Property Owner</p>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          onClick={() => alert("Message dialog would open here")}
        >
          <MessageSquare className="h-4 w-4" />
          Send Message
        </button>
        <button
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          onClick={() => alert("Call request dialog would open here")}
        >
          <Phone className="h-4 w-4" />
          Request a Call
        </button>
      </div>
    </section>
  )
}
