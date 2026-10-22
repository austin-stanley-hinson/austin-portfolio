import { NextResponse } from "next/server";
import { getChapters } from "@/lib/grimoire";

// GET /api/chapters: the table of contents, including unwritten pages.
export function GET() {
  return NextResponse.json({ chapters: getChapters() });
}
