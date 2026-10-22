import type { Chapter } from "./types";

// The table of contents, in reading order. Numbering is derived from the
// position here, so add new chapters to the end.
//
// To publish a chapter:
//   1. write content/chapters/<slug>.md
//   2. set status to "inscribed" and fill in date
export const chapters: Chapter[] = [
  {
    slug: "building-pulsegrid",
    title: "Building PulseGrid",
    summary:
      "A distributed observability platform that detects node failures across 10 hosts in under 30 seconds: Python telemetry agents, a FastAPI backend, and Kafka, PostgreSQL, and Redis behind it.",
    status: "being-written",
    tags: ["FastAPI", "Kafka", "PostgreSQL", "Redis", "Docker"],
    links: [{ label: "source", href: "https://github.com/austin-stanley-hinson/PulseGrid" }],
  },
  {
    slug: "building-mulemart",
    title: "Building MuleMart",
    summary:
      "A campus marketplace for 400+ Colby students: a Flask and PostgreSQL API with S3 presigned uploads, removing N+1 queries, semantic search with SentenceTransformers, and 95% test coverage in CI.",
    status: "being-written",
    tags: ["Flask", "PostgreSQL", "AWS S3", "PyTorch", "GitHub Actions"],
    links: [{ label: "live", href: "https://www.mulemart.com" }],
  },
];
