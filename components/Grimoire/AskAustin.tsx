"use client";
import React, { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import Mark from "./Mark";

type Msg = { role: "user" | "assistant"; content: string };

export const ASK_AUSTIN_EVENT = "open-ask-austin";

const GREETING: Msg = {
  role: "assistant",
  content:
    "Ask me about Austin's work: his projects, what he's studying, or what he's writing about.",
};

// A floating "Ask about Austin" launcher that opens a chat panel. Answers
// come from /api/ask, which grounds the model in the grimoire's contents.
// Other components can open it by dispatching ASK_AUSTIN_EVENT.
const AskAustin = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener(ASK_AUSTIN_EVENT, openHandler);
    return () => window.removeEventListener(ASK_AUSTIN_EVENT, openHandler);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // The greeting is UI only; the API expects the user to speak first.
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data?.reply || "Something went wrong. Try again." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I couldn't reach the server just now. Try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex h-11 items-center gap-2 rounded-full border border-seal-deep/30 bg-seal pl-3.5 pr-4 font-sans text-sm font-medium text-page shadow-[0_6px_20px_-6px_rgba(132,56,32,0.55)] transition-colors hover:bg-seal-deep sm:bottom-6 sm:right-6"
      >
        <Mark className="h-4 w-4" />
        Ask me about Austin
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/30 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Ask me about Austin"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-[80vh] w-full flex-col overflow-hidden rounded-t-lg border border-rule bg-page shadow-xl sm:h-[540px] sm:max-w-md sm:rounded-lg"
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-3">
          <div className="flex items-center gap-2 text-ink">
            <Mark className="h-4 w-4 text-seal" />
            <span className="smallcaps">ask me about austin</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="rounded p-1 text-faded transition-colors hover:text-seal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4 text-base">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <p key={i} className="ml-8 border-l-2 border-seal pl-3 text-ink">
                {m.content}
              </p>
            ) : (
              <p key={i} className="whitespace-pre-wrap text-ink-soft">
                {m.content}
              </p>
            )
          )}
          {loading && <p className="italic text-faded">writing…</p>}
        </div>

        <form
          className="border-t border-rule p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <div className="flex items-center gap-2 rounded border border-rule bg-page-deep/50 px-3 py-2 focus-within:border-seal">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What is PulseGrid?"
              aria-label="Your question"
              className="flex-1 bg-transparent font-sans text-sm text-ink outline-none placeholder:text-faded"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="inline-flex h-8 w-8 items-center justify-center rounded bg-seal text-page transition-opacity disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskAustin;
