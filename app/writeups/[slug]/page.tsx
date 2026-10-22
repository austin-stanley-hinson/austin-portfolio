import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Mark from "@/components/Grimoire/Mark";
import { formatDate, getWriteup, getWriteupBody, getWriteups } from "@/lib/grimoire";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getWriteups().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const writeup = getWriteup((await params).slug);
  if (!writeup) return {};
  return { title: writeup.title, description: writeup.summary };
}

export default async function WriteupPage({ params }: Props) {
  const { slug } = await params;
  const writeup = getWriteup(slug);
  if (!writeup) notFound();
  const body = await getWriteupBody(slug);

  return (
    <article className="pt-10 sm:pt-16 pb-8">
      <header className="text-center">
        <p className="smallcaps text-seal">writeup</p>
        <h1 className="mt-2 font-display text-5xl font-medium leading-tight text-ink">
          {writeup.title}
        </h1>
        {writeup.date && writeup.status === "inscribed" && (
          <p className="mt-3 font-sans text-sm text-faded">{formatDate(writeup.date)}</p>
        )}
        <div className="flourish mt-8">
          <Mark className="h-4 w-4" />
        </div>
      </header>

      {body ? (
        <div className="writeup-body mt-10 text-ink-soft">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="italic text-faded">This page is still being written.</p>
          <p className="mt-2 text-base text-faded">{writeup.summary}</p>
        </div>
      )}

      <p className="mt-16 text-center font-sans text-sm">
        <Link href="/writeups" className="ink-link text-faded">
          ← all writeups
        </Link>
      </p>
    </article>
  );
}
