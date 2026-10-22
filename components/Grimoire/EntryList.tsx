import React from "react";
import type { ExperienceEntry } from "@/content/types";

// Org · role, period, a one-paragraph blurb, tags, and any evidence links.
const EntryList = ({ entries }: { entries: ExperienceEntry[] }) => {
  return (
    <ul className="space-y-8">
      {entries.map((e) => (
        <li key={`${e.org}-${e.title}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-ink">
              <span className="font-semibold">{e.org}</span>
              <span className="text-faded"> · </span>
              <span>{e.title}</span>
            </h3>
            <span className="font-sans text-xs text-faded">{e.period}</span>
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
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
