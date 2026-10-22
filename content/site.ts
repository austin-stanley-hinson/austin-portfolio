import type { Education, ExperienceEntry } from "./types";

export const site = {
  name: "Austin Hinson",
  url: "https://www.austinhinson.tech",
  school: "Computer Science & Mathematics at Colby College",
  interests:
    "distributed systems, system design, performance, and the mathematical thinking behind fast, reliable software",
  status: "Open to summer 2027 internships",
  // The home page's "Currently, ..." line (and what Ask says I'm learning).
  currentlyLearning: "Computer Networking",
  currently:
    "I'm learning computer networking from the application layer down to the wire with 'Computer Networking: A Top-Down Approach', the old-fashioned way, no AI :)",
  email: "ashins29@colby.edu",
  github: "https://github.com/austin-stanley-hinson",
  linkedin: "https://linkedin.com/in/hinson-austin",
  // Opens a new LinkedIn message to me.
  linkedinMessage: "https://www.linkedin.com/messaging/compose/?recipient=hinson-austin",
  // Put the PDF in public/ and set this (e.g. "/austin-hinson-resume.pdf")
  // to show a resume link in the footer. Hidden while null.
  resumeUrl: null as string | null,
  // Update whenever you add a writeup or shelf entry.
  lastInscribed: "2026-10-22",
};

export const education: Education = {
  school: "Colby College",
  degree: "Computer Science and Mathematics",
  graduation: "May 2029",
  coursework: [
    "Data Structures & Algorithms",
    "Database Systems",
    "Distributed Systems",
    "Software Engineering",
    "Computer Networks",
    "Operating Systems",
    "Machine Learning",
    "AI Engineering",
  ],
};

export const experience: ExperienceEntry[] = [
  {
    period: "Jan 2026 – Present",
    title: "Co-Founder & Tech Lead",
    org: "Lokala LLC",
    description:
      "Led the design and development of mylokala.com, a coupon platform connecting Waterville-area shoppers with nearby businesses. Built the merchant dashboard and Stripe Connect payouts with idempotent webhook workflows. Grew to 200+ users and 30+ businesses, partnered with the Mid-Maine Chamber of Commerce, and raised $5,000 in seed funding.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe Connect"],
    links: [{ label: "mylokala.com", href: "https://www.mylokala.com" }],
  },
  {
    title: "Software Engineer",
    org: "MuleMart",
    description:
      "Built mulemart.com, a campus marketplace where 400+ Colby students buy, sell, and donate items. Designed a Flask and PostgreSQL REST API with S3 presigned URLs for media and SQLAlchemy queries tuned to remove N+1 bottlenecks, added semantic search with SentenceTransformers embeddings, and reached 95% test coverage across 8 suites in GitHub Actions CI.",
    tags: ["Flask", "PostgreSQL", "AWS S3", "PyTorch", "GitHub Actions"],
    links: [{ label: "mulemart.com", href: "https://www.mulemart.com" }],
  },
  {
    period: "Summer 2026",
    title: "Machine Learning Research Intern",
    org: "CEAMLS",
    description:
      "Built an ML pipeline to identify Alzheimer's drug candidates across 5 therapeutic targets. Curated 25,000+ molecular compounds and trained classical models reaching a 0.904 F1 score on blood-brain barrier permeability, then extended the work with graph neural networks and molecular docking. Selected to present at NSEA 2026.",
    tags: ["Machine Learning", "Graph Neural Networks", "Molecular Docking"],
  },
  {
    period: "Feb – Apr 2026",
    title: "Software Engineering Fellow",
    org: "Google",
    description:
      "Selected for G-SWEP, a 10-week Google × BASTA fellowship with 1:1 mentorship from a Google software engineer. Built Planty, a research assistant that orchestrates 3+ live data sources into source-grounded answers, with retries, rate-limit handling, and defensive parsing for partial failures.",
    tags: ["Python", "LLM Orchestration", "APIs"],
    links: [
      {
        label: "Planty",
        href: "https://github.com/austin-stanley-hinson/Multi-Source-Deep-Search-Agent-",
      },
    ],
  },
  {
    period: "Sept 2025 – Present",
    title: "Teaching Assistant",
    org: "Colby College",
    description:
      "TA for Computational Science (Python) and Data Structures & Algorithms (Java). Assisted 50+ Computational Science students in learning Python, resolving coding issues, and completing their projects.",
    tags: ["Python", "Java", "Data Structures & Algorithms", "Teaching"],
  },
  {
    period: "Sept 2025 – Aug 2026",
    title: "Lead Mentor & Co-Founder",
    org: "Tech Innovation Hub",
    description:
      "Designed hands-on programming challenges for 45+ students with student developers and mentors. Led fundraising that raised $10,000 for 10 laptops for underrepresented students.",
    tags: ["Mentorship", "Curriculum", "Fundraising"],
  },
];
