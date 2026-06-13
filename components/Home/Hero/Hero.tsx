"use client"
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Download, FolderOpen } from "lucide-react";
import { branchNodes } from "@/Constant/Constant";
import { ASK_AUSTIN_EVENT } from "@/components/Home/AskAustin/AskAustin";

const tickerItems = [
  "TypeScript", "Python", "Systems Design", "Applied Math", "LLM Orchestration",
  "React", "Next.js", "Algorithms", "Data Structures", "Cloud", "Ghana → Maine",
];

const Hero = () => {
  return (
    <div
      id="home"
      className="hero-bark relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Growth-ring / trunk mark (decorative, behind content) */}
      <svg
        aria-hidden="true"
        className="growth-ring pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] max-w-[120vw] max-h-[120vw] text-amber/30"
        viewBox="0 0 680 680"
        fill="none"
        stroke="currentColor"
      >
        {[40, 90, 145, 205, 270, 330].map((r) => (
          <circle key={r} cx="340" cy="340" r={r} strokeWidth="1" />
        ))}
        {/* trunk line rising through the rings */}
        <line x1="340" y1="340" x2="340" y2="680" stroke="currentColor" strokeWidth="1.5" className="text-moss/30" />
      </svg>

      {/* content */}
      <div className="relative z-10 text-center px-6 max-w-4xl py-24">
        {/* status */}
        <div data-aos="fade-up" className="sm:mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber/30 bg-white/5 text-sm font-medium text-on-dark mb-8 backdrop-blur-sm">
            <span className="branch-node-dot w-2 h-2 rounded-full bg-moss"></span>
            <span>Open to 2027 roles</span>
          </span>
        </div>

        {/* title */}
        <h1 data-aos="fade-up" data-aos-delay="100" className="font-serif font-normal tracking-[-0.03em] leading-[1.05] text-5xl sm:text-6xl md:text-7xl text-on-dark mb-6">
          Hi, I&apos;m Austin Hinson
        </h1>

        {/* Typewriter effect */}
        <div data-aos="fade-up" data-aos-delay="200" className="font-mono text-lg sm:text-xl md:text-2xl text-amber mb-4 sm:mb-6 h-12">
          <TypeAnimation
            sequence={[
              "Tech Instructor and Mentor",
              2000,
              "Full-Stack Developer",
              2000,
              "Systems Builder",
              2000,
              "Problem Solver in Code",
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        {/* description */}
        <p data-aos="fade-up" data-aos-delay="300" className="text-lg leading-relaxed text-on-dark-soft max-w-2xl mx-auto">
          Currently obsessed with systems, AI, and building things that
          shouldn&apos;t work until they do.
        </p>

        {/* Branch-node navigation */}
        <nav
          aria-label="Section navigation"
          data-aos="fade-up"
          data-aos-delay="350"
          className="relative mt-12 flex flex-wrap items-start justify-center gap-x-6 gap-y-7 max-w-2xl mx-auto"
        >
          {/* faint branch line behind the nodes */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[7px] h-px bg-linear-to-r from-transparent via-amber/30 to-transparent"
          />
          {branchNodes.map((node) => {
            const isAsk = node.action === "ask";
            const Tag: React.ElementType = node.href ? "a" : isAsk ? "button" : "div";
            return (
              <Tag
                key={node.name}
                {...(node.href ? { href: node.href } : {})}
                {...(isAsk
                  ? {
                      type: "button" as const,
                      onClick: () =>
                        window.dispatchEvent(new CustomEvent(ASK_AUSTIN_EVENT)),
                    }
                  : {})}
                data-cursor="node"
                className={`group relative z-10 flex flex-col items-center gap-2 ${
                  node.soon ? "cursor-default opacity-55" : "cursor-pointer"
                }`}
                aria-disabled={node.soon ? true : undefined}
              >
                {/* node dot */}
                <span
                  className={`branch-node-dot w-3.5 h-3.5 rounded-full border transition-transform duration-200 group-hover:scale-125 ${
                    node.soon
                      ? "bg-on-dark-soft/30 border-on-dark-soft/40"
                      : "bg-amber border-amber/60"
                  }`}
                />
                {/* label */}
                <span className="text-xs font-medium tracking-wide text-on-dark-soft transition-colors duration-200 group-hover:text-amber">
                  {node.name}
                </span>
                {/* tooltip / preview */}
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -bottom-2 translate-y-full whitespace-nowrap rounded-md border border-amber/20 bg-[#1f1e1b] px-3 py-1.5 text-[11px] text-on-dark-soft opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 z-20"
                >
                  {node.blurb}
                  {node.soon && (
                    <span className="ml-1 text-amber">• soon</span>
                  )}
                </span>
              </Tag>
            );
          })}
        </nav>

        {/* buttons */}
        <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-amber text-[#161513] text-sm font-semibold transition-colors hover:bg-[#d8923f] w-fit mx-auto sm:mx-0"
          >
            <FolderOpen className="w-5 h-5" />
            View Projects
          </a>
          <a
            href="#_"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md border border-white/15 bg-white/5 text-on-dark text-sm font-medium transition-colors hover:bg-white/10 w-fit mx-auto sm:mx-0"
          >
            <Download className="w-5 h-5" />
            Download CV
          </a>
        </div>
      </div>

      {/* subtle technical ticker */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/5 py-2">
        <div className="ticker-track flex w-max gap-8 font-mono text-[11px] uppercase tracking-widest text-on-dark-soft/40">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              {item}
              <span className="text-amber/40">/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
