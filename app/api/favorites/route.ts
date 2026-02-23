import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { db } from "@/db";
import { favorites, landListings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { authOptions } from "@/lib/auth";

function getUserId(session: Session | null): string | null {
  return (session?.user as { id?: string } | undefined)?.id ?? null;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = getUserId(session);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await db
      .select({
        id: landListings.id,
        title: landListings.title,
        price: landListings.price,
        acres: landListings.acres,
        city: landListings.city,
        latitude: landListings.latitude,
        longitude: landListings.longitude,
        photos: landListings.photos,
        propertyType: landListings.propertyType,
      })
      .from(favorites)
      .innerJoin(landListings, eq(favorites.landListingId, landListings.id))
      .where(eq(favorites.userId, userId))
      .orderBy(desc(landListings.id));

    const listings = rows.map((row) => ({
      id: row.id,
      images: row.photos ?? undefined,
      category: row.propertyType?.[0],
      categoryColor: "#3b8a6e",
      name: row.title ?? "",
      price: row.price != null ? String(row.price) : "",
      location: row.city ?? "",
      acreage: row.acres != null ? String(row.acres) : "",
      latitude: row.latitude != null ? Number(row.latitude) : null,
      longitude: row.longitude != null ? Number(row.longitude) : null,
      isFavorite: true,
    }));

    return NextResponse.json(listings);
  } catch (err) {
    console.error("Favorites GET error:", err);
    return NextResponse.json(
      { error: "Failed to load favorites" },
      { status: 500 }
    );
  }
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
