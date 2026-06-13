export const Navlinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

// Branch nodes for the hero "growth map".
// `href` -> existing section anchor (smooth-scrolls). `soon: true` -> not yet
// a section, rendered as a dimmed "coming soon" node that does not navigate.
// To activate a "soon" node later, give it an `href` pointing at the new
// section's id (and drop `soon`).
export type BranchNode = {
  name: string;
  href?: string;
  blurb: string;
  soon?: boolean;
  action?: "ask"; // opens the Ask Austin chat panel instead of navigating
};

export const branchNodes: BranchNode[] = [
  { name: "Home", href: "#home", blurb: "Back to the trunk" },
  { name: "About", href: "#about", blurb: "Roots in Ghana, grounded in curiosity" },
  { name: "Skills", href: "#skills", blurb: "Branches — languages, tools & systems" },
  { name: "Projects", href: "#projects", blurb: "The fruit of the work" },
  { name: "Experience", href: "#experience", blurb: "Rings of growth over time" },
  { name: "Research", blurb: "Applied math & systems — growing soon", soon: true },
  { name: "Contact", href: "#contact", blurb: "Reach out along a branch" },
  { name: "Ask Austin", blurb: "An AI guide to my work — ask me anything", action: "ask" },
];