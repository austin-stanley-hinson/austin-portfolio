"use client";
import React, { useEffect, useRef, useState } from "react";
import { Send, X, Sparkles, MessageCircle } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export const ASK_AUSTIN_EVENT = "open-ask-austin";

const AskAustin = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm the Ask Austin guide 🌱 — ask me about Austin's background, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Open when the hero "Ask Austin" node dispatches the event.
  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener(ASK_AUSTIN_EVENT, openHandler);
    return () => window.removeEventListener(ASK_AUSTIN_EVENT, openHandler);
  }, []);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
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
        body: JSON.stringify({
          messages: next.filter((m) => m.role === "user" || m.role === "assistant"),
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data?.reply || "Something went wrong — try again." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I couldn't reach the server just now. Please explore the sections above or use the Contact section to reach Austin directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Floating launcher button (always available, like most sites).
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        data-cursor="node"
        aria-label="Ask me anything about Austin"
        className="group fixed bottom-6 right-6 z-[1100] inline-flex h-14 items-center gap-2 rounded-full bg-amber px-5 text-sm font-medium text-[#161513] shadow-[0_0_24px_4px_rgba(232,165,90,0.35)] transition-transform duration-200 hover:scale-105"
      >
        <MessageCircle className="h-5 w-5 shrink-0" />
        <span>Ask me anything</span>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-6"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Ask Austin"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-[80vh] sm:h-[560px] w-full sm:max-w-md flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-amber/20 bg-[#1b1a17] text-on-dark shadow-2xl"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber" />
            <span className="font-medium">Ask Austin</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            data-cursor="node"
            className="rounded-md p-1 text-on-dark-soft transition-colors hover:text-amber"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-amber text-[#161513]"
                    : "bg-white/5 text-on-dark border border-white/10"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-on-dark-soft">
                <span className="branch-node-dot inline-block h-2 w-2 rounded-full bg-amber" />
                <span className="ml-2">thinking…</span>
              </div>
            </div>
          )}
        </div>

        {/* input */}
        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-amber/40">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about Austin's work…"
              className="flex-1 bg-transparent text-sm text-on-dark placeholder:text-on-dark-soft/60 outline-none"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send"
              data-cursor="node"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber text-[#161513] transition-opacity disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAustin;
