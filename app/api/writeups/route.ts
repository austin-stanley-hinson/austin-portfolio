import { NextResponse } from "next/server";
import { getWriteups } from "@/lib/grimoire";

// GET /api/writeups: the table of contents, including unwritten pages.
export function GET() {
  return NextResponse.json({ writeups: getWriteups() });
}
