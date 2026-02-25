import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { and, arrayContains, desc, eq, gte, ilike, lte, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { favorites, landListings } from "@/db/schema";
import { authOptions } from "@/lib/auth";

function parseNumParam(value: string | null): number | null {
  if (value == null || value.trim() === "") return null;
  const num = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) && num >= 0 ? num : null;
}

export async function GET(request: NextRequest) {
  try {
    const location = request.nextUrl.searchParams.get("location")?.trim() ?? null;
    const type = request.nextUrl.searchParams.get("type")?.trim() ?? null;
    const minPrice = parseNumParam(request.nextUrl.searchParams.get("minPrice"));
    const maxPrice = parseNumParam(request.nextUrl.searchParams.get("maxPrice"));
    const minAcres = parseNumParam(request.nextUrl.searchParams.get("minAcres"));
    const maxAcres = parseNumParam(request.nextUrl.searchParams.get("maxAcres"));

    const conditions = [];

    if (type) {
      conditions.push(arrayContains(landListings.propertyType, [type]));
    }
    if (minPrice != null) {
      conditions.push(gte(landListings.price, String(minPrice)));
    }
    if (maxPrice != null) {
      conditions.push(lte(landListings.price, String(maxPrice)));
    }
    if (minAcres != null) {
      conditions.push(gte(landListings.acres, String(minAcres)));
    }
    if (maxAcres != null) {
      conditions.push(lte(landListings.acres, String(maxAcres)));
    }

    // Location search: match "Dallas, TX" style (autocomplete) and single-field matches.
    // % in ILIKE = "any characters"; e.g. %Dallas% matches "Dallas", "Dallas City".
    // We match: (1) combined "City, ST" / "County, ST", (2) city, state, county, stateName.
    if (location && location.length > 0) {
      const pattern = `%${location}%`;
      conditions.push(
        or(
          sql`(${landListings.city} || ', ' || ${landListings.stateAbbreviation}) ILIKE ${pattern}`,
          sql`(${landListings.county} || ', ' || ${landListings.stateAbbreviation}) ILIKE ${pattern}`,
          ilike(landListings.city, pattern),
          ilike(landListings.stateAbbreviation, pattern),
          ilike(landListings.stateName, pattern),
          ilike(landListings.county, pattern),
        )!
      );
    }

    const rows =
      conditions.length > 0
        ? await db
            .select()
            .from(landListings)
            .where(and(...conditions))
            .orderBy(desc(landListings.id))
            .limit(100)
        : await db.select().from(landListings).orderBy(desc(landListings.id)).limit(100);

    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id ?? null;
    let favoriteIds = new Set<number>();
    if (userId) {
      const favRows = await db
        .select({ landListingId: favorites.landListingId })
        .from(favorites)
        .where(eq(favorites.userId, userId));
      favoriteIds = new Set(favRows.map((r) => r.landListingId));
    }

    const list = rows.map((row) => ({
      ...row,
      isFavorite: favoriteIds.has(row.id),
    }));

    return NextResponse.json(list);
  } catch (error) {
    console.error("Land location search API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
