import Anthropic from "@anthropic-ai/sdk";
import {
  getBookshelf,
  getKnowledge,
  getProfile,
  getWriteupBody,
  getWriteups,
} from "@/lib/grimoire";

export const runtime = "nodejs";

// "Ask me about Austin": answers questions grounded in the grimoire itself
// (profile, writeups, bookshelf) plus the background in content/knowledge.ts,
// so it stays current as content is added. Every response is a plain-text
// stream so the chat panel can show the answer as it's written. Without an
// API key it streams a short fallback.

const MODEL = process.env.ASK_AUSTIN_MODEL || "claude-haiku-5-5";

type Link = { label: string; href: string };
const formatLinks = (links?: Link[]) =>
  links?.length ? ` Links: ${links.map((l) => `${l.label} ${l.href}`).join(", ")}.` : "";

const SHELF_STATUS = {
  reading: "reading now",
  read: "finished",
  "notes-wip": "finished, notes in progress",
} as const;

const GUIDELINES = [
  "Answer visitors' questions about Austin warmly and briefly: usually 2-4 sentences, longer only when someone asks for detail (how a project works, what he did in a role). Most visitors are recruiters, engineers, or classmates, so lead with the concrete: what he built, with what, and the result, and point to the link that proves it.",
  "Use only the facts below. If the answer isn't there, say you don't know and suggest emailing him; never invent details, dates, metrics, employers, grades, or contact information. When two facts seem to conflict, prefer the Experience section.",
  "Don't discuss or guess at personal background that isn't listed, such as where he's from, nationality, visa or work authorization, age, or family. Say that's best asked directly and give his email.",
  "On the bookshelf, a comment is a line or two Austin wrote about the book; study notes are separate, longer Google Docs, and only exist where a link is listed.",
  "Writeups marked \"still being written\" have no content yet: describe them from their summary and say the full writeup is coming.",
  "Refer to pages by name (home, writeups, bookshelf) and give full URLs from the list below.",
  "Reply in plain text only: no Markdown, so no asterisks, headings, bullet lists, or [text](url) links. When you share a link, write the full URL.",
];

async function buildSystemPrompt() {
  const { site, education, experience } = getProfile();
  const { projects, notes } = getKnowledge();
  const writeups = getWriteups();
  const shelf = getBookshelf();
  const bodies = await Promise.all(writeups.map((w) => getWriteupBody(w.slug)));

  const lines = [
    `You are the guide to ${site.name}'s portfolio site (${site.url}), a notebook of project writeups and a bookshelf of what he's studying, with his notes.`,
    "",
    ...GUIDELINES,
    "",
    "## Pages",
    `- home: ${site.url} (intro, what he's learning now, experience)`,
    `- writeups: ${site.url}/writeups (one per project he's built)`,
    `- bookshelf: ${site.url}/bookshelf (textbooks, math, tools, and concepts, with his notes)`,
    "",
    "## Profile",
    `${site.name} studies ${education.degree} at ${education.school}, graduating ${education.graduation}.`,
    `Coursework: ${education.coursework.join(", ")}.`,
    `Interested in ${site.interests}.`,
    `Currently learning ${site.currentlyLearning}: ${site.currently}`,
    `Status: ${site.status}.`,
    `Contact: email ${site.email}, LinkedIn ${site.linkedin}, GitHub ${site.github}.${site.resumeUrl ? ` Resume: ${site.url}${site.resumeUrl}.` : " His resume isn't posted; ask by email."}`,
    "",
    "## Experience",
    ...experience.map(
      (e) =>
        `- ${e.org}, ${e.title}${e.period ? ` (${e.period})` : ""}: ${e.description} Skills: ${e.tags.join(", ")}.${formatLinks(e.links)}`
    ),
    "",
    "## Projects",
    ...projects.map(
      (p) => `- ${p.name}: ${p.summary} Stack: ${p.stack.join(", ")}.${formatLinks(p.links)}`
    ),
    "",
    "## More about Austin",
    ...notes.map((n) => `- ${n}`),
    "",
    "## Writeups",
    ...writeups.map((w, i) => {
      const published = w.status === "inscribed";
      const head = `- "${w.title}" (${published ? `published ${w.date}, ${site.url}/writeups/${w.slug}` : "still being written"}): ${w.summary}${w.tags ? ` Tags: ${w.tags.join(", ")}.` : ""}${formatLinks(w.links)}`;
      return bodies[i] ? `${head}\n<writeup slug="${w.slug}">\n${bodies[i]}\n</writeup>` : head;
    }),
    "",
    "## Bookshelf",
    ...shelf.flatMap((s) =>
      s.entries.length === 0
        ? [`- ${s.title}: nothing listed yet`]
        : s.entries.map((e) => {
            const status = e.current ? "studying now" : e.status ? SHELF_STATUS[e.status] : null;
            const notesLink = e.links.notes
              ? ` Study notes: ${e.links.notes}`
              : " No study notes posted yet.";
            return `- ${s.title}: ${e.title}${e.author ? ` by ${e.author}` : ""}${status ? ` (${status})` : ""}.${e.comment ? ` His comment on the shelf: "${e.comment}"` : ""}${notesLink}`;
          })
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
  "The live guide isn't available right now. The short version: Austin studies Computer Science and Mathematics at Colby College and writes about the systems he builds. Browse the writeups and bookshelf, or email him directly.";

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
          // The content prompt only changes on deploy, so cache it; today's
          // date sits after the breakpoint so "currently" questions resolve.
          system: [
            { type: "text", text: await buildSystemPrompt(), cache_control: { type: "ephemeral" } },
            { type: "text", text: `Today is ${new Date().toISOString().slice(0, 10)}.` },
          ],
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
