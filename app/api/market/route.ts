import { NextResponse } from "next/server";
import { fetchAllIndices } from "@/lib/market";

export const revalidate = 3600;

export async function GET() {
  const indices = await fetchAllIndices();
  return NextResponse.json({ indices });
}
