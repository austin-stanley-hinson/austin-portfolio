// Shapes for everything the grimoire renders. The API routes under
// app/api return these same shapes, so swapping the content files for a
// CMS or database later only means changing lib/grimoire.ts.

export type Chapter = {
  slug: string;
  title: string;
  // One line shown in the table of contents.
  summary: string;
  // "inscribed" chapters are published and need content/chapters/<slug>.md.
  // "being-written" chapters show as blank pages and are not linked.
  status: "inscribed" | "being-written";
  // ISO date (YYYY-MM-DD). Required once inscribed.
  date?: string;
  tags?: string[];
  // Shown beside the chapter even before it's written (live site, repo).
  links?: { label: string; href: string }[];
};

export type ShelfLinkKind = "source" | "notes" | "paper" | "wiki";

export type ShelfEntry = {
  title: string;
  author?: string;
  links: Partial<Record<ShelfLinkKind, string>>;
  // "reading" = in progress, "read" = finished, "notes-wip" = finished but
  // notes still being written.
  status?: "reading" | "read" | "notes-wip";
  // Marks the entry shown as "currently studying" on the cover.
  current?: boolean;
  comment?: string;
};

export type ShelfSection = {
  title: "Textbooks & Readings" | "Tools" | "Concepts";
  entries: ShelfEntry[];
};

export type ExperienceEntry = {
  period: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
  // Evidence shown next to the entry (live site, repo, paper).
  links?: { label: string; href: string }[];
};

export type Education = {
  school: string;
  degree: string;
  graduation: string;
  coursework: string[];
};
