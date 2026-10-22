"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Mark from "./Mark";

const links = [
  { name: "home", href: "/" },
  { name: "bookshelf", href: "/bookshelf" },
  { name: "writeups", href: "/writeups" },
];

const SiteHeader = () => {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="mx-auto flex w-full max-w-[60rem] items-center justify-between gap-4 px-6 sm:px-12 pt-8 pb-4">
      <Link href="/" className="flex items-center gap-2.5 text-ink hover:text-seal transition-colors">
        <Mark className="h-6 w-6 text-seal" />
        <span className="smallcaps hidden text-lg sm:inline">austin hinson</span>
      </Link>
      <nav aria-label="Main" className="flex items-center gap-4 sm:gap-6 font-sans text-sm">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "page" : undefined}
            className={`transition-colors hover:text-seal ${
              isActive(l.href) ? "text-ink underline underline-offset-[6px] decoration-seal" : "text-faded"
            }`}
          >
            {l.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default SiteHeader;
