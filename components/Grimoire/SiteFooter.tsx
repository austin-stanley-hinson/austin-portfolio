import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FileText, Mail } from "lucide-react";
import { site } from "@/content/site";
import Mark from "./Mark";

const formatInscribed = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
};

const SiteFooter = () => {
  const socials = [
    { label: "GitHub", href: site.github, icon: FaGithub },
    { label: "LinkedIn", href: site.linkedin, icon: FaLinkedin },
    { label: "Email", href: `mailto:${site.email}`, icon: Mail },
  ];

  return (
    <footer className="mx-auto w-full max-w-[60rem] px-6 sm:px-12 pb-12 pt-16">
      <div className="flourish mb-8">
        <Mark className="h-4 w-4" />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-sans text-sm text-faded">
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="transition-colors hover:text-seal"
            >
              <s.icon className="h-[18px] w-[18px]" />
            </a>
          ))}
          {site.resumeUrl && (
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-seal"
            >
              <FileText className="h-[18px] w-[18px]" />
              resume
            </a>
          )}
        </div>
        <p>last inscribed {formatInscribed(site.lastInscribed)}</p>
      </div>
      <p className="mt-6 font-sans text-[11px] text-faded/80">
        Seal: <em className="font-serif">Nea Onnim No Sua A, Ohu</em>, after{" "}
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
  );
};

export default SiteFooter;
