import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { site } from "@/content/site";
import Mark from "./Mark";

const formatUpdated = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
};

// Social links and the resume in full ink, the last-updated date beneath,
// and a thin seal-colored bar pinned to the bottom of the window.
const SiteFooter = () => {
  const socials = [
    { label: "GitHub", href: site.github, icon: FaGithub },
    { label: "LinkedIn", href: site.linkedin, icon: FaLinkedin },
    { label: "Email", href: `mailto:${site.email}`, icon: Mail },
  ];

  return (
    <>
      <footer className="mx-auto w-full max-w-[60rem] px-6 sm:px-12 pb-16 pt-20">
        <div className="flourish mb-10">
          <Mark className="h-5 w-5" />
        </div>
        <div className="flex flex-wrap items-center gap-6 text-ink">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="transition-colors hover:text-seal"
            >
              <s.icon className="h-[22px] w-[22px]" />
            </a>
          ))}
          {site.resumeUrl && (
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-base transition-colors hover:text-seal"
            >
              resume
            </a>
          )}
        </div>
        <p className="mt-4 font-sans text-base text-ink">
          last updated {formatUpdated(site.lastUpdated)}
        </p>
        <p className="mt-6 font-sans text-xs text-faded">
          Seal: <em className="font-serif text-sm">Nea Onnim No Sua A, Ohu</em>, after{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:Nea_onnim_no_sua_a_ohu.svg"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-link text-faded"
          >
            Pablo Busatto
          </a>{" "}
          (
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-link text-faded"
          >
            CC BY-SA 4.0
          </a>
          )
        </p>
      </footer>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[3px] bg-seal" />
    </>
  );
};

export default SiteFooter;
