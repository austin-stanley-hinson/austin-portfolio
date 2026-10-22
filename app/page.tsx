import Image from "next/image";
import Link from "next/link";
import React from "react";
import Mark from "@/components/Grimoire/Mark";
import SectionTitle from "@/components/Grimoire/SectionTitle";
import EntryList from "@/components/Grimoire/EntryList";
import { DancingGrimoire } from "@/components/Grimoire/HeadingMotion";
import { getProfile } from "@/lib/grimoire";

export default function Home() {
  const { site, education, experience } = getProfile();

  return (
    <div className="space-y-16 pb-8">
      {/* Cover */}
      <section className="flex flex-col items-center pt-10 text-center sm:pt-14">
        <Mark className="h-12 w-12 text-seal" />
        <p className="smallcaps mt-5 text-faded">welcome to the grimoire of</p>
        <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-[-0.01em] text-ink sm:text-6xl">
          {site.name}
        </h1>
        <p className="mt-3 italic text-faded">one who does not know can know through learning</p>
      </section>

      {/* Intro + headshot */}
      <section>
        <h2 className="font-display text-4xl font-medium text-ink">
          Hi, I&apos;m Austin!
          <DancingGrimoire />
        </h2>
        <div className="mt-5 flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:gap-12">
          <div className="flex-1 space-y-4 text-ink-soft">
            <p>
              <span className="smallcaps text-seal">currently,</span> {site.currently}
            </p>
            <p>
              Overall, I&apos;m drawn to {site.interests}.{" "}
              <a href={site.linkedinMessage} target="_blank" rel="noopener noreferrer" className="ink-link">
                Let&apos;s talk!
              </a>
            </p>
            <p>
              This is my notebook: the{" "}
              <Link href="/writeups" className="ink-link">writeups</Link> are things
              I&apos;ve built and what they taught me, and the{" "}
              <Link href="/bookshelf" className="ink-link">bookshelf</Link> holds
              what I&apos;m studying, with my notes.
            </p>
            <p className="text-ink">
              I&apos;m a {education.degree} double major at {education.school},
              graduating {education.graduation}.
            </p>
            <p className="flex items-center gap-2 font-sans text-sm text-ink">
              <span className="h-2 w-2 rounded-full bg-[#5f8a4e]" aria-hidden="true" />
              {site.status}
            </p>
          </div>
          <Image
            src="/images/headshot.jpg"
            alt={`${site.name} headshot`}
            width={192}
            height={192}
            priority
            className="h-44 w-44 shrink-0 self-center rounded-full border border-rule object-cover sm:mt-1 sm:h-48 sm:w-48 sm:self-start"
          />
        </div>
      </section>

      {/* Experience */}
      <section>
        <SectionTitle id="experience" size="lg">Experience</SectionTitle>
        <EntryList entries={experience} />
      </section>
    </div>
  );
}
