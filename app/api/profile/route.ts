import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import type { Session } from "next-auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { authOptions } from "@/lib/auth"

function getUserId(session: Session | null): string | null {
  return (session?.user as { id?: string } | undefined)?.id ?? null
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = String(fullName ?? "").trim()
  if (!trimmed) return { firstName: "", lastName: "" }
  const spaceIndex = trimmed.indexOf(" ")
  if (spaceIndex <= 0) return { firstName: trimmed, lastName: "" }
  return {
    firstName: trimmed.slice(0, spaceIndex),
    lastName: trimmed.slice(spaceIndex + 1).trim(),
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const userId = getUserId(session)
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { fullName?: string; email?: string; phone?: string; location?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const fullName = (body.fullName ?? "").trim()
  const { firstName, lastName } = splitFullName(body.fullName ?? "")

  const updates: {
    firstName?: string
    lastName?: string
    phone?: string | null
    location?: string | null
    updatedAt: Date
  } = { updatedAt: new Date() }
  if (fullName !== "") {
    updates.firstName = firstName || " "
    updates.lastName = lastName || " "
  }
  if (body.phone !== undefined) updates.phone = body.phone === "" ? null : body.phone
  if (body.location !== undefined) updates.location = body.location === "" ? null : body.location

  try {
    const result = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, userId))
      .returning({ id: users.id })

    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Profile update error:", err)
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    )
  }
}
