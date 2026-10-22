import { promises as fs } from "fs";
import path from "path";
import { chapters } from "@/content/chapters";
import { bookshelf } from "@/content/bookshelf";
import { education, experience, site } from "@/content/site";
import type { Chapter, ShelfEntry } from "@/content/types";

// Single read path for all grimoire content. Pages and API routes both go
// through here, so the source (files today) can change without touching UI.

export type NumberedChapter = Chapter & { number: number; numeral: string };

export function toRoman(n: number): string {
  const table: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  for (const [value, numeral] of table) {
    while (n >= value) {
      out += numeral;
      n -= value;
    }
  }
  return out;
}

export function getChapters(): NumberedChapter[] {
  return chapters.map((c, i) => ({ ...c, number: i + 1, numeral: toRoman(i + 1) }));
}

export function getChapter(slug: string): NumberedChapter | undefined {
  return getChapters().find((c) => c.slug === slug);
}

const CHAPTER_DIR = path.join(process.cwd(), "content", "chapters");

// Returns the markdown body for an inscribed chapter, or null if the chapter
// is unwritten or its file is missing.
export async function getChapterBody(slug: string): Promise<string | null> {
  const chapter = getChapter(slug);
  if (!chapter || chapter.status !== "inscribed") return null;
  try {
    return await fs.readFile(path.join(CHAPTER_DIR, `${slug}.md`), "utf8");
  } catch {
    return null;
  }
}

export function getBookshelf() {
  return bookshelf;
}

export function getCurrentReading(): ShelfEntry | undefined {
  return bookshelf.flatMap((s) => s.entries).find((e) => e.current);
}

export function getProfile() {
  return { site, education, experience };
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
