import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { getBookshelf, getChapters, getProfile } from "@/lib/grimoire";

export const runtime = "nodejs";

// "Ask about Austin": answers questions grounded in the grimoire itself
// (profile, chapters, bookshelf), so it stays current as content is added.
// Without an API key it returns a short fallback instead of failing.

const MODEL = process.env.ASK_AUSTIN_MODEL || "claude-haiku-5-5";

function buildSystemPrompt() {
  const { site, education, experience } = getProfile();
  const chapters = getChapters();
  const shelf = getBookshelf();

  const lines = [
    `You are the guide to ${site.name}'s portfolio site, a notebook of chapters (writeups) and a bookshelf (what he's studying, with his notes).`,
    "Answer visitors' questions about Austin briefly (2-4 sentences), warmly, and only from the facts below. If something isn't covered, say you don't know and suggest emailing him. Never invent details, dates, metrics, or contact information. Refer to pages by name: home, chapters, bookshelf.",
    "",
    "## Profile",
    `Studies ${education.degree} at ${education.school}, graduating ${education.graduation}. Coursework: ${education.coursework.join(", ")}. Interested in ${site.interests}. Currently studying ${site.currentlyLearning}. ${site.status}. Email: ${site.email}. GitHub: ${site.github}. LinkedIn: ${site.linkedin}.${site.resumeUrl ? ` Resume: ${site.url}${site.resumeUrl}.` : ""}`,
    "",
    "## Experience",
    ...experience.map((e) => `- ${e.org}, ${e.title} (${e.period}): ${e.description} [${e.tags.join(", ")}]`),

    "",
    "## Chapters (each is a project and its writeup)",
    ...chapters.map(
      (c) =>
        `- Chapter ${c.numeral}, "${c.title}" (${c.status === "inscribed" ? `published ${c.date}` : "writeup still being written"}): ${c.summary}${c.links ? ` Links: ${c.links.map((l) => `${l.label} ${l.href}`).join(", ")}` : ""}`
    ),
    "",
    "## Bookshelf",
    ...shelf.flatMap((s) =>
      s.entries.length === 0
        ? [`- ${s.title}: nothing listed yet`]
        : s.entries.map(
            (e) =>
              `- ${s.title}: ${e.title}${e.author ? ` by ${e.author}` : ""}${e.current ? " (currently studying)" : ""}${e.comment ? `. ${e.comment}` : ""}`
          )
    ),
  ];
  return lines.join("\n");
}

const FALLBACK =
  "The live guide isn't connected right now. The short version: Austin studies Computer Science & Mathematics at Colby College and writes about the systems he builds. Browse the chapters and bookshelf, or email him directly.";

export async function POST(req: Request) {
  let messages: Anthropic.MessageParam[] = [];
  try {
    const body = await req.json();
    if (Array.isArray(body?.messages)) {
      messages = body.messages
        .filter(
          (m: unknown): m is { role: "user" | "assistant"; content: string } =>
            !!m &&
            typeof (m as { content?: unknown }).content === "string" &&
            ((m as { role?: unknown }).role === "user" ||
              (m as { role?: unknown }).role === "assistant")
        )
        .map((m: { role: "user" | "assistant"; content: string }) => ({
          role: m.role,
          content: m.content.slice(0, 2000),
        }))
        .slice(-10);
    }
  } catch {
    // malformed body, handled below
  }

  // The API requires the conversation to open with a user turn.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (messages.length === 0) {
    return NextResponse.json({ reply: "Ask me anything about Austin's work." });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ reply: FALLBACK, fallback: true });
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: buildSystemPrompt(),
      output_config: { effort: "low" },
      messages,
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json({
        reply: "I can't help with that one. Try asking about Austin's projects or what he's studying.",
      });
    }

    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    return NextResponse.json({ reply: reply || FALLBACK, fallback: !reply });
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error(`ask: API error ${error.status}: ${error.message}`);
    } else {
      console.error("ask: request failed", error);
    }
    return NextResponse.json({ reply: FALLBACK, fallback: true });
  }
}
