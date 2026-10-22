import React from "react";

// Small looping animations that sit beside each page's heading, one per
// page: a dancing grimoire by the home greeting, a quill writing in a book on Writeups,
// and a book being pulled from the shelf on Bookshelf. Keyframes live in
// globals.css and stop under prefers-reduced-motion.

export const DancingGrimoire = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 56 48"
    className="ml-2 inline-block h-[1.15em] w-auto align-[-0.18em] text-seal"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* sparkles */}
    <path className="sparkle sparkle-1" d="M7 9 L8 12 L11 13 L8 14 L7 17 L6 14 L3 13 L6 12 Z" fill="currentColor" stroke="none" />
    <path className="sparkle sparkle-2" d="M48 5 L49 7.5 L51.5 8.5 L49 9.5 L48 12 L47 9.5 L44.5 8.5 L47 7.5 Z" fill="currentColor" stroke="none" />
    <path className="sparkle sparkle-3" d="M50 26 L50.8 28 L52.8 28.8 L50.8 29.6 L50 31.6 L49.2 29.6 L47.2 28.8 L49.2 28 Z" fill="currentColor" stroke="none" />
    <g className="grimoire-dance">
      {/* covers flapping like wings, hinged at the spine */}
      <path className="cover-left" d="M28 16 C21 12 14 12 9 14 L9 34 C14 32 21 32 28 36 Z" fill="currentColor" fillOpacity="0.2" />
      <path className="cover-right" d="M28 16 C35 12 42 12 47 14 L47 34 C42 32 35 32 28 36 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M28 16 V36" />
      {/* happy face */}
      <path d="M21.5 23 q1.5 -2 3 0 M31.5 23 q1.5 -2 3 0" strokeWidth="1.6" />
      <path d="M24 27.5 q4 3.5 8 0" strokeWidth="1.6" />
      {/* little feet */}
      <path className="foot-left" d="M24 37 v4 h-3" strokeWidth="1.6" />
      <path className="foot-right" d="M32 37 v4 h3" strokeWidth="1.6" />
    </g>
  </svg>
);

export const QuillWriting = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 64 48"
    className="ml-3 inline-block h-[1.05em] w-auto align-[-0.12em] text-seal"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* open book */}
    <path d="M32 12 C24 8 12 8 6 10 L6 40 C12 38 24 38 32 42 Z" />
    <path d="M32 12 C40 8 52 8 58 10 L58 40 C52 38 40 38 32 42 Z" />
    {/* written lines on the left page */}
    <path d="M11 19 H26 M11 25 H26 M11 31 H21" strokeWidth="1.1" opacity="0.5" />
    {/* lines being written on the right page */}
    <path className="quill-ink-1" pathLength="1" d="M37 21 q2 -2 4 0 t4 0 t4 0 t4 0" strokeWidth="1.2" />
    <path className="quill-ink-2" pathLength="1" d="M37 28 q2 -2 4 0 t4 0 t4 0" strokeWidth="1.2" />
    {/* quill, nib at its local origin */}
    <g transform="translate(37 21)">
      <g className="quill-move">
        <path d="M0 0 L20 -22" strokeWidth="1.1" />
        <path
          d="M2 -2 C6 -10 13 -18 22 -25 C19 -16 12 -8 4 -1 Z"
          fill="currentColor"
          fillOpacity="0.18"
          strokeWidth="1.1"
        />
      </g>
    </g>
  </svg>
);

export const ShelfPull = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 64 48"
    className="ml-3 inline-block h-[1.05em] w-auto align-[-0.12em] text-seal"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinejoin="round"
    strokeLinecap="round"
  >
    {/* shelf */}
    <path d="M2 44 H62" />
    {/* books */}
    <rect x="6" y="14" width="8" height="30" rx="1" />
    <path d="M6 20 H14 M6 38 H14" strokeWidth="1" opacity="0.6" />
    <rect x="15" y="10" width="10" height="34" rx="1" fill="currentColor" fillOpacity="0.15" />
    <rect x="26" y="18" width="7" height="26" rx="1" />
    {/* the one being pulled out */}
    <g className="shelf-book">
      <rect x="34" y="12" width="9" height="32" rx="1" fill="currentColor" fillOpacity="0.3" />
      <path d="M34 18 H43 M34 37 H43" strokeWidth="1" />
    </g>
    {/* leaning book */}
    <rect x="46" y="16" width="8" height="28" rx="1" transform="rotate(14 54 44)" />
  </svg>
);
