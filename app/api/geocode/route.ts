import { NextResponse } from "next/server";
import { geocode } from "@/app/lib/geocoding";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");

  if (!location) {
    return NextResponse.json(
      { error: "Location is required" },
      { status: 400 }
    );
  }

  const result = await geocode(location);

  if (result) {
    return NextResponse.json(result);
  } else {
    return NextResponse.json({ error: "Geocoding failed" }, { status: 500 });
  }
}
