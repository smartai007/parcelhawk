import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { db } from "@/db";
import { favorites } from "@/db/schema";
import { authOptions } from "@/lib/auth";

function getUserId(session: Session | null): string | null {
  return (session?.user as { id?: string } | undefined)?.id ?? null;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = getUserId(session);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { landListingIds?: number[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const landListingIds = Array.isArray(body.landListingIds)
    ? body.landListingIds.filter((id): id is number => Number.isInteger(id) && id > 0)
    : [];
  if (landListingIds.length === 0) {
    return NextResponse.json(
      { error: "landListingIds array required" },
      { status: 400 }
    );
  }

  try {
    await db
      .insert(favorites)
      .values(
        landListingIds.map((landListingId) => ({
          userId,
          landListingId,
        }))
      )
      .onConflictDoNothing({
        target: [favorites.userId, favorites.landListingId],
      });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Favorites insert error:", err);
    return NextResponse.json(
      { error: "Failed to save favorites" },
      { status: 500 }
    );
  }
}
