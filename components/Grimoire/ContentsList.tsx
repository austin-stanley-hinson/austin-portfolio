import Link from "next/link";
import React from "react";
import { formatDate, type NumberedChapter } from "@/lib/grimoire";

// The table of contents: numbered chapters with dotted leaders. Unwritten
// chapters aren't linked yet, but still show their summary and any
// live/source links so the project behind them is reachable.
const ContentsList = ({ chapters }: { chapters: NumberedChapter[] }) => {
  return (
    <ol className="space-y-8">
      {chapters.map((c) => {
        const inscribed = c.status === "inscribed";
        return (
          <li key={c.slug} className="grid grid-cols-[2.75rem_1fr] gap-x-2">
            <span className="smallcaps pt-0.5 text-seal">{c.numeral}.</span>
            <div>
              <div className="flex items-baseline gap-2">
                {inscribed ? (
                  <Link href={`/chapters/${c.slug}`} className="ink-link font-semibold">
                    {c.title}
                  </Link>
                ) : (
                  <span className="font-semibold text-ink">{c.title}</span>
                )}
                <span className="leader" aria-hidden="true" />
                <span className="shrink-0 font-sans text-xs text-faded">
                  {inscribed && c.date ? formatDate(c.date) : <em className="font-serif text-sm">being written</em>}
                </span>
              </div>
              <p className="mt-1 text-base leading-snug text-ink-soft">{c.summary}</p>
              {(c.tags || c.links) && (
                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-sans text-xs">
                  <span className="text-faded">{c.tags?.join(" · ")}</span>
                  {c.links && (
                    <span className="flex gap-3">
                      {c.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ink-link text-seal"
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </span>
                  )}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default ContentsList;
