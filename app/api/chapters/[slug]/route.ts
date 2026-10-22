import { NextResponse } from "next/server";
import { getChapter, getChapterBody } from "@/lib/grimoire";

// GET /api/chapters/:slug: one chapter's metadata plus its markdown body
// (body is null until the chapter is inscribed).
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) {
    return NextResponse.json({ error: "chapter not found" }, { status: 404 });
  }
  return NextResponse.json({ chapter, body: await getChapterBody(slug) });
}
