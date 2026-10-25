import Image from "next/image";
import React from "react";
import type { ExperienceEntry } from "@/content/types";

// Org logo, org · role, period, a one-paragraph blurb, tags, and any evidence links.
const EntryList = ({ entries }: { entries: ExperienceEntry[] }) => {
  return (
    <ul className="space-y-8">
      {entries.map((e) => (
        <li key={`${e.org}-${e.title}`} className="flex gap-4">
          {e.logo ? (
            <Image
              src={e.logo}
              alt={`${e.org} logo`}
              width={40}
              height={40}
              // The optimizer rejects SVGs; they're already tiny.
              unoptimized={e.logo.endsWith(".svg")}
              className="mt-1 h-10 w-10 shrink-0 rounded-md object-contain"
            />
          ) : (
            <span className="mt-1 h-10 w-10 shrink-0" aria-hidden="true" />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-ink">
                <span className="font-semibold">{e.org}</span>
                <span className="text-faded"> · </span>
                <span>{e.title}</span>
              </h3>
              {e.period && <span className="font-sans text-xs text-faded">{e.period}</span>}
            </div>
            <p className="mt-1 text-base text-ink-soft">{e.description}</p>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-sans text-xs">
              <span className="text-faded">{e.tags.join(" · ")}</span>
              {e.links && (
                <span className="flex gap-3">
                  {e.links.map((l) => (
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
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
