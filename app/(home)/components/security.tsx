"use client"

import { useState } from "react"
import { toast } from "sonner"

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch("/api/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok) {
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        toast.success("Password updated successfully")
      } else {
        toast.error(data.error ?? "Failed to update password")
      }
    } catch {
      toast.error("Connection failed. Please try again.")
    }
  }
  return (
    <>
      {/* Security Section */}
      <section id="security" className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-card-foreground">Security</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Update password and secure your account.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Current Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="currentPassword" className="text-sm text-muted-foreground">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              placeholder="Enter your current password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground outline-none transition-colors focus:border-[#5cbcb6] focus:ring-1 focus:ring-[#5cbcb6]"
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="newPassword" className="text-sm text-muted-foreground">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              placeholder="Enter your new password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground outline-none transition-colors focus:border-[#5cbcb6] focus:ring-1 focus:ring-[#5cbcb6]"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-sm text-muted-foreground">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="Confirm your new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground outline-none transition-colors focus:border-[#5cbcb6] focus:ring-1 focus:ring-[#5cbcb6]"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleUpdatePassword}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-accent"
          >
            Update Password
          </button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-card-foreground">Danger Zone</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Irreversible account actions.
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-card-foreground">Delete Account</p>
            <p className="text-sm text-muted-foreground">
              Permanently remove your account and all data.
            </p>
          </div>
          <button
            type="button"
            className="rounded-md border border-destructive px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            Delete Account
          </button>
        </div>
      </section>
    </>
  )
}
