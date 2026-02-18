import { NextResponse } from "next/server";
import { db } from "@/db";
import { landListings } from "@/db/schema";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(landListings)
      .limit(4);
    
      // console.log(rows);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Near-by API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
