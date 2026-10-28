import { promises as fs } from "fs";
import path from "path";
import { writeups } from "@/content/writeups";
import { bookshelf } from "@/content/bookshelf";
import { education, experience, site } from "@/content/site";
import { notes, projects } from "@/content/knowledge";
import type { Writeup } from "@/content/types";

// Single read path for all grimoire content. Pages and API routes both go
// through here, so the source (files today) can change without touching UI.

export type NumberedWriteup = Writeup & { number: number; numeral: string };

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

export function getWriteups(): NumberedWriteup[] {
  return writeups.map((c, i) => ({ ...c, number: i + 1, numeral: toRoman(i + 1) }));
}

export function getWriteup(slug: string): NumberedWriteup | undefined {
  return getWriteups().find((c) => c.slug === slug);
}

const WRITEUP_DIR = path.join(process.cwd(), "content", "writeups");

// Returns the markdown body for an inscribed writeup, or null if the writeup
// is unwritten or its file is missing.
export async function getWriteupBody(slug: string): Promise<string | null> {
  const writeup = getWriteup(slug);
  if (!writeup || writeup.status !== "inscribed") return null;
  try {
    return await fs.readFile(path.join(WRITEUP_DIR, `${slug}.md`), "utf8");
  } catch {
    return null;
  }
}

// Heading text -> anchor id, shared by the contents list and the rendered h2s.
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// The writeup's ## headings, skipping anything inside code fences.
export function writeupSections(body: string) {
  const sections: { id: string; title: string }[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    else if (!inFence && line.startsWith("## ")) {
      const title = line.slice(3).replace(/[`*_]/g, "").trim();
      sections.push({ id: slugify(title), title });
    }
  }
  return sections;
}

export function readingMinutes(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).length / 230));
}

export function getBookshelf() {
  return bookshelf;
}

export function getProfile() {
  return { site, education, experience };
}

// Background the Ask guide uses that the pages don't show.
export function getKnowledge() {
  return { projects, notes };
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
