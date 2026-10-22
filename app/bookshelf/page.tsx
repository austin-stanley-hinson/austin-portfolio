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
            <SectionTitle>{section.title.toLowerCase()}</SectionTitle>
            {section.entries.length === 0 ? (
              <p className="italic text-faded">Blank pages, for now.</p>
            ) : (
              <ul className="space-y-6">
                {section.entries.map((e) => (
                  <li key={e.title}>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h3 className="font-semibold text-ink">{e.title}</h3>
                      {e.status && (
                        <span className="smallcaps text-sm text-seal">{STATUS_LABEL[e.status]}</span>
                      )}
                      {e.current && <span className="smallcaps text-sm text-seal">· current</span>}
                    </div>
                    {e.author && <p className="text-base italic text-faded">{e.author}</p>}
                    <p className="mt-1 flex gap-3 font-sans text-xs">
                      {LINK_ORDER.filter((k) => e.links[k]).map((k) => (
                        <a
                          key={k}
                          href={e.links[k]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`ink-link ${k === "notes" ? "text-seal" : "text-faded"}`}
                        >
                          {k}
                        </a>
                      ))}
                    </p>
                    {e.comment && <p className="mt-2 text-base text-ink-soft">{e.comment}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
