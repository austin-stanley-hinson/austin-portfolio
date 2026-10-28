import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import Mark from "@/components/Grimoire/Mark";
import {
  formatDate,
  getWriteup,
  getWriteupBody,
  getWriteups,
  readingMinutes,
  slugify,
  writeupSections,
} from "@/lib/grimoire";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getWriteups().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const writeup = getWriteup((await params).slug);
  if (!writeup) return {};
  return { title: writeup.title, description: writeup.summary };
}

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

// h2s get ids so the contents list can link to them. An image on its own
// line becomes a figure, with its markdown title as the caption.
const components: Components = {
  h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  p: ({ node, children }) => {
    const only = node?.children.length === 1 ? node.children[0] : undefined;
    if (only?.type === "element" && only.tagName === "img") return <>{children}</>;
    return <p>{children}</p>;
  },
  img: ({ src, alt, title }) => (
    <figure>
      <a href={typeof src === "string" ? src : undefined} target="_blank" rel="noopener noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" />
      </a>
      {title && <figcaption>{title}</figcaption>}
    </figure>
  ),
};

export default async function WriteupPage({ params }: Props) {
  const { slug } = await params;
  const writeup = getWriteup(slug);
  if (!writeup) notFound();
  const body = await getWriteupBody(slug);
  const sections = body ? writeupSections(body) : [];

  return (
    <article className="pt-10 sm:pt-16 pb-8">
      <header className="text-center">
        <p className="smallcaps text-seal">writeup</p>
        <h1 className="mt-2 font-display text-5xl font-medium leading-tight text-ink">
          {writeup.title}
        </h1>
        {writeup.date && writeup.status === "inscribed" && (
          <p className="mt-3 font-sans text-sm text-faded">
            {formatDate(writeup.date)}
            {body && <> · {readingMinutes(body)} min read</>}
          </p>
        )}
        {body && writeup.links && (
          <p className="mt-2 flex justify-center gap-3 font-sans text-xs">
            {writeup.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="ink-link text-seal">
                {l.label} ↗
              </a>
            ))}
          </p>
        )}
        <div className="flourish mt-8">
          <Mark className="h-4 w-4" />
        </div>
      </header>

      {body ? (
        <div className="mx-auto max-w-[46rem]">
          {sections.length > 2 && (
            <nav aria-label="Contents" className="writeup-contents mt-10">
              <p className="smallcaps text-faded">contents</p>
              <ol>
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="ink-link">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="writeup-body mt-10 text-ink-soft">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
              {body}
            </ReactMarkdown>
          </div>
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
