import Anthropic from "@anthropic-ai/sdk";
import { getBookshelf, getWriteups, getProfile } from "@/lib/grimoire";

export const runtime = "nodejs";

// "Ask me about Austin": answers questions grounded in the grimoire itself
// (profile, writeups, bookshelf), so it stays current as content is added.
// Every response is a plain-text stream so the chat panel can show the
// answer as it's written. Without an API key it streams a short fallback.

const MODEL = process.env.ASK_AUSTIN_MODEL || "claude-haiku-5-5";

function buildSystemPrompt() {
  const { site, education, experience } = getProfile();
  const writeups = getWriteups();
  const shelf = getBookshelf();

  const lines = [
    `You are the guide to ${site.name}'s portfolio site, a notebook of project writeups and a bookshelf (what he's studying, with his notes).`,
    "Answer visitors' questions about Austin briefly (2-4 sentences), warmly, and only from the facts below. If something isn't covered, say you don't know and suggest emailing him. Never invent details, dates, metrics, or contact information. Refer to pages by name: home, writeups, bookshelf.",
    "Reply in plain text only: no Markdown, so no asterisks, headings, bullet lists, or [text](url) links. When you share a link, write the full URL.",
    "",
    "## Profile",
    `Double major in ${education.degree} at ${education.school}, graduating ${education.graduation}. Coursework: ${education.coursework.join(", ")}. Interested in ${site.interests}. Currently: ${site.currently} ${site.status}. Email: ${site.email}. GitHub: ${site.github}. LinkedIn: ${site.linkedin}.${site.resumeUrl ? ` Resume: ${site.url}${site.resumeUrl}.` : ""}`,
    "",
    "## Experience",
    ...experience.map((e) => `- ${e.org}, ${e.title}${e.period ? ` (${e.period})` : ""}: ${e.description} [${e.tags.join(", ")}]`),
    "",
    "## Writeups (one per project)",
    ...writeups.map(
      (c) =>
        `- "${c.title}" (${c.status === "inscribed" ? `published ${c.date}` : "still being written"}): ${c.summary}${c.links ? ` Links: ${c.links.map((l) => `${l.label} ${l.href}`).join(", ")}` : ""}`
    ),
    "",
    "## Bookshelf",
    ...shelf.flatMap((s) =>
      s.entries.length === 0
        ? [`- ${s.title}: nothing listed yet`]
        : s.entries.map(
            (e) =>
              `- ${s.title}: ${e.title}${e.author ? ` by ${e.author}` : ""}${e.comment ? `. ${e.comment}` : ""}`
          )
    ),
  ];
  return lines.join("\n");
}

const TEXT_HEADERS = {
  "content-type": "text/plain; charset=utf-8",
  "cache-control": "no-store",
};

const textResponse = (text: string) => new Response(text, { headers: TEXT_HEADERS });

const REFUSAL =
  "I can't help with that one. Try asking about Austin's projects or what he's studying.";

const FALLBACK =
  "The live guide isn't available right now. The short version: Austin is a Computer Science and Mathematics double major at Colby College and writes about the systems he builds. Browse the writeups and bookshelf, or email him directly.";

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
    return textResponse("Ask me anything about Austin's work.");
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return textResponse(FALLBACK);
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wrote = false;
      const write = (text: string) => {
        wrote = true;
        controller.enqueue(encoder.encode(text));
      };
      try {
        const stream = client.messages.stream({
          model: MODEL,
          max_tokens: 1000,
          system: buildSystemPrompt(),
          output_config: { effort: "low" },
          messages,
        });
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            write(event.delta.text);
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !wrote) write(REFUSAL);
        if (!wrote) write(FALLBACK);
      } catch (error) {
        if (error instanceof Anthropic.APIError) {
          console.error(`ask: API error ${error.status}: ${error.message}`);
        } else {
          console.error("ask: request failed", error);
        }
        if (!wrote) write(FALLBACK);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, { headers: TEXT_HEADERS });
}
