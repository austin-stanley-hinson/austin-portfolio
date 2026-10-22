import React from "react";
import Mark from "./Mark";

// Section heading with a hairline. "sm" is the small-caps label used for
// subsections (bookshelf); "lg" introduces a main section with the seal.
const SectionTitle = ({
  children,
  id,
  size = "sm",
}: {
  children: React.ReactNode;
  id?: string;
  size?: "sm" | "lg";
}) => {
  if (size === "lg") {
    return (
      <h2 id={id} className="mb-8 flex items-center gap-4 scroll-mt-8">
        <Mark className="h-6 w-6 shrink-0 text-seal" />
        <span className="font-display text-4xl font-medium text-ink">{children}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-rule" />
      </h2>
    );
  }
  return (
    <h2 id={id} className="smallcaps mb-6 flex items-center gap-4 text-lg text-faded scroll-mt-8">
      <span>{children}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-rule" />
    </h2>
  );
};

export default SectionTitle;
