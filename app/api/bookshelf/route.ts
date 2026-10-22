import { NextResponse } from "next/server";
import { getBookshelf } from "@/lib/grimoire";

// GET /api/bookshelf: readings, tools, and concepts with links to notes.
export function GET() {
  return NextResponse.json({ sections: getBookshelf() });
}
