import { NextResponse } from "next/server";
import { getWriteup, getWriteupBody } from "@/lib/grimoire";

// GET /api/writeups/:slug: one writeup's metadata plus its markdown body
// (body is null until the writeup is inscribed).
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const writeup = getWriteup(slug);
  if (!writeup) {
    return NextResponse.json({ error: "writeup not found" }, { status: 404 });
  }
  return NextResponse.json({ writeup, body: await getWriteupBody(slug) });
}
