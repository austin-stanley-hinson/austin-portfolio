import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Minimal "Ask Austin" endpoint.
// - If ANTHROPIC_API_KEY is set, it answers via the Claude Messages API.
// - If not (or on any error), it returns a friendly fallback so the UI
//   degrades gracefully and the page never breaks.

const FALLBACK =
  "Hi! I'm the Ask Austin guide. The live AI isn't connected in this environment yet, " +
  "but here's the short version: Austin Hinson is a Computer Science & Applied Mathematics " +
  "student at Colby College with roots in Ghana, focused on scalable systems, AI, and " +
  "software engineering — and he's open to 2027 roles. Explore the Projects, Skills, and " +
  "Experience sections above, or reach him through the Contact section.";

const SYSTEM_PROMPT =
  "You are 'Ask Austin', a concise, friendly guide to Austin Hinson's developer portfolio. " +
  "Austin is a Computer Science & Applied Mathematics student at Colby College (Waterville, ME) " +
  "with Ghanaian roots, focused on scalable systems, applied math, AI, and software engineering. " +
  "He is open to 2027 roles. Answer questions about his background, skills, and projects helpfully " +
  "and briefly (2-4 sentences). If you don't know something specific, point the visitor to the " +
  "relevant section (About, Skills, Projects, Experience, Contact). Never invent contact details.";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    if (Array.isArray(body?.messages)) {
      messages = body.messages
        .filter(
          (m: unknown): m is ChatMessage =>
            !!m &&
            typeof (m as ChatMessage).content === "string" &&
            ((m as ChatMessage).role === "user" ||
              (m as ChatMessage).role === "assistant")
        )
        .slice(-10);
    }
  } catch {
    // ignore malformed body — handled below
  }

  if (messages.length === 0) {
    return NextResponse.json(
      { reply: "Ask me anything about Austin's background, skills, or projects!" },
      { status: 200 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured — graceful fallback, not an error.
    return NextResponse.json({ reply: FALLBACK, fallback: true }, { status: 200 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ASK_AUSTIN_MODEL || "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ reply: FALLBACK, fallback: true }, { status: 200 });
    }

    const data = await res.json();
    const reply =
      Array.isArray(data?.content) &&
      data.content.find((c: { type?: string }) => c?.type === "text")?.text;

    return NextResponse.json(
      { reply: reply || FALLBACK, fallback: !reply },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ reply: FALLBACK, fallback: true }, { status: 200 });
  }
}
