import type { Metadata } from "next";
import React from "react";
import { QuillWriting } from "@/components/Grimoire/HeadingMotion";
import WriteupList from "@/components/Grimoire/WriteupList";
import { getWriteups } from "@/lib/grimoire";

export const metadata: Metadata = {
  title: "Writeups",
  description: "Notes on things I've built and what I learned building them.",
};

export default function WriteupsPage() {
  return (
    <div className="pt-10 sm:pt-16 pb-8">
      <h1 className="font-display text-5xl font-medium text-ink">
        Writeups
        <QuillWriting />
      </h1>
      <p className="mt-3 mb-12 text-ink-soft">
        Things I&apos;ve built and what I learned building them.
      </p>
      <WriteupList writeups={getWriteups()} />
    </div>
  );
}
