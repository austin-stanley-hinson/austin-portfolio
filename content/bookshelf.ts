import type { ShelfSection } from "./types";

// Readings, tools, and concepts, each linking to the source and to my own
// notes (Google Docs). Empty sections render as blank pages.
//
// Example entry:
//   {
//     title: "Designing Data-Intensive Applications",
//     author: "Martin Kleppmann",
//     links: {
//       source: "https://dataintensive.net",
//       notes: "https://docs.google.com/document/d/...",
//     },
//     status: "reading",
//     current: true,
//     comment: "On chapter 5, replication.",
//   },
export const bookshelf: ShelfSection[] = [
  { title: "Textbooks & Readings", entries: [] },
  { title: "Tools", entries: [] },
  { title: "Concepts", entries: [] },
];
