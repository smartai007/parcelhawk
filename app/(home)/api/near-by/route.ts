import { type NextRequest, NextResponse } from "next/server";
import { arrayContains } from "drizzle-orm";
import { db } from "@/db";
import { landListings } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get("type")?.trim() ?? null;

    const rows = type
      ? await db
          .select()
          .from(landListings)
          .where(arrayContains(landListings.propertyType, [type]))
          .limit(100)
      : await db.select().from(landListings).limit(6);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Near-by API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
