import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Mark from "@/components/Grimoire/Mark";
import { formatDate, getChapter, getChapterBody, getChapters } from "@/lib/grimoire";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getChapters().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chapter = getChapter((await params).slug);
  if (!chapter) return {};
  return { title: chapter.title, description: chapter.summary };
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();
  const body = await getChapterBody(slug);

  return (
    <article className="pt-10 sm:pt-16 pb-8">
      <header className="text-center">
        <p className="smallcaps text-seal">chapter {chapter.numeral}</p>
        <h1 className="mt-2 font-display text-5xl font-medium leading-tight text-ink">
          {chapter.title}
        </h1>
        {chapter.date && chapter.status === "inscribed" && (
          <p className="mt-3 font-sans text-sm text-faded">{formatDate(chapter.date)}</p>
        )}
        <div className="flourish mt-8">
          <Mark className="h-4 w-4" />
        </div>
      </header>

      {body ? (
        <div className="chapter-body mt-10 text-ink-soft">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="italic text-faded">This page is still being written.</p>
          <p className="mt-2 text-base text-faded">{chapter.summary}</p>
        </div>
      )}

      <p className="mt-16 text-center font-sans text-sm">
        <Link href="/chapters" className="ink-link text-faded">
          ← all chapters
        </Link>
      </p>
    </article>
  );
}
