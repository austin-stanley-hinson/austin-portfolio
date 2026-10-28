import type { Writeup } from "./types";

// Writeups, in reading order. Numbering is derived from the position here,
// so add new writeups to the end.
//
// To publish a writeup:
//   1. write content/writeups/<slug>.md
//   2. set status to "inscribed" and fill in date
export const writeups: Writeup[] = [
  {
    slug: "building-pulsegrid",
    title: "Building PulseGrid",
    summary:
      "An infrastructure monitor I'm building: a Python agent, a FastAPI backend, PostgreSQL and Redis, heartbeats and alerts, and the bugs that showed up where those pieces meet.",
    status: "inscribed",
    date: "2026-10-28",
    tags: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    links: [{ label: "source", href: "https://github.com/austin-stanley-hinson/PulseGrid" }],
  },
  {
    slug: "building-lokala",
    title: "Building Lokala",
    summary:
      "A coupon platform connecting Waterville-area shoppers with nearby businesses: a merchant dashboard, Stripe Connect payouts on idempotent webhooks, and growing to 200+ users and 30+ businesses.",
    status: "being-written",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe Connect"],
    links: [{ label: "live", href: "https://www.mylokala.com" }],
  },
];
