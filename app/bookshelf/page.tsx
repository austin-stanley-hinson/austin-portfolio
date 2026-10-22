import type { Metadata } from "next";
import React from "react";
import { ShelfPull } from "@/components/Grimoire/HeadingMotion";
import SectionTitle from "@/components/Grimoire/SectionTitle";
import { getBookshelf } from "@/lib/grimoire";
import type { ShelfEntry, ShelfLinkKind } from "@/content/types";

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "The readings, systems, tools, and concepts I'm learning from, with my notes.",
};

const LINK_ORDER: ShelfLinkKind[] = ["source", "paper", "wiki", "notes"];

const STATUS_LABEL: Record<NonNullable<ShelfEntry["status"]>, string> = {
  reading: "reading",
  read: "read",
  "notes-wip": "notes in progress",
};

export default function BookshelfPage() {
  const sections = getBookshelf();

  return (
    <div className="pt-10 sm:pt-16 pb-8">
      <h1 className="font-display text-5xl font-medium text-ink">
        Bookshelf
        <ShelfPull />
      </h1>
      <p className="mt-3 mb-14 text-ink-soft">
        Every grimoire is built from other books. These are the readings,
        systems, tools, and concepts I&apos;m learning from. I understand
        something best once I can explain it to someone else, so wherever
        I&apos;ve written notes along the way, they&apos;re linked.
      </p>

      <div className="space-y-16">
        {sections.map((section) => (
          <section key={section.title}>
            <SectionTitle size="lg">{section.title}</SectionTitle>
            {section.entries.length === 0 ? (
              <p className="italic text-faded">Blank pages, for now.</p>
            ) : (
              <ul className="space-y-6">
                {section.entries.map((e) => {
                  const links = LINK_ORDER.filter((k) => e.links[k]);
                  return (
                    <li key={e.title}>
                      <div className="flex items-baseline justify-between gap-4 sm:gap-6">
                        <h3 className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 font-semibold text-ink">
                          {e.title}
                          {e.current && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-seal/10 px-2 py-0.5 font-sans text-[11px] font-medium uppercase tracking-wider text-seal">
                              <span className="status-blink h-1.5 w-1.5 rounded-full bg-seal" aria-hidden="true" />
                              current
                            </span>
                          )}
                          {e.status && (
                            <span className="smallcaps text-sm font-normal text-faded">{STATUS_LABEL[e.status]}</span>
                          )}
                        </h3>
                        {links.length > 0 && (
                          <p className="flex shrink-0 items-baseline gap-2 font-sans text-sm">
                            {links.map((k, i) => (
                              <React.Fragment key={k}>
                                {i > 0 && <span className="text-faded/60" aria-hidden="true">·</span>}
                                <a
                                  href={e.links[k]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`ink-link ${k === "notes" ? "text-seal" : "text-faded"}`}
                                >
                                  {k}
                                </a>
                              </React.Fragment>
                            ))}
                          </p>
                        )}
                      </div>
                      {e.author && <p className="text-base italic text-faded">{e.author}</p>}
                      {e.comment && <p className="mt-1 text-base text-ink-soft">{e.comment}</p>}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
