import type { Project } from "./types";

// Extra material for the "Ask me about Austin" guide. None of this renders on
// the site; it's what the guide can draw on beyond the home page, writeups,
// and bookshelf. Keep every line something I'd say to a recruiter, since the
// guide repeats it as fact.

// Side projects, newest first. Summaries come from each repo's README.
export const projects: Project[] = [
  {
    name: "PulseGrid",
    summary:
      "Distributed infrastructure monitoring platform modeled on Datadog, Prometheus, and Grafana. Python host agents (psutil) send CPU, memory, disk, network, log, and heartbeat telemetry to a FastAPI ingestion API with Pydantic validation; events stream through Kafka to background workers that write history to PostgreSQL and latest state and heartbeats to Redis. A Next.js dashboard shows multi-agent health, trend charts, threshold alerts, and offline-agent detection. Runs locally with Docker Compose. Planned next: agent retries with backoff and local buffering, idempotency keys, agent auth, batched writes, and TimescaleDB-style retention.",
    stack: ["Python", "FastAPI", "Kafka", "PostgreSQL", "Redis", "Next.js", "Docker Compose"],
    links: [{ label: "source", href: "https://github.com/austin-stanley-hinson/PulseGrid" }],
  },
  {
    name: "Planty (Multi-Source Deep Search Agent)",
    summary:
      "Research assistant built during the Google G-SWEP fellowship. Runs parallel searches across Google, Bing, and Reddit (including Reddit comments), then has an LLM analyze and synthesize the results into one answer, in a Streamlit app.",
    stack: ["Python", "Streamlit", "LLM orchestration"],
    links: [
      {
        label: "source",
        href: "https://github.com/austin-stanley-hinson/Multi-Source-Deep-Search-Agent-",
      },
    ],
  },
  {
    name: "Crypto Pulse",
    summary:
      "Dashboard of the top 100 cryptocurrencies from the CoinGecko API, with summary stats, search, and filters for market-cap size and price range.",
    stack: ["JavaScript", "React"],
    links: [{ label: "source", href: "https://github.com/austin-stanley-hinson/Crypto-Pulse" }],
  },
  {
    name: "Veni Vici",
    summary:
      "React discovery app for random photos from 60+ years of NASA history via the NASA Image and Video Library API. Users can ban topics, centers, or years and review everything they've seen in a session.",
    stack: ["JavaScript", "React"],
    links: [{ label: "source", href: "https://github.com/austin-stanley-hinson/Veni-Vici" }],
  },
  {
    name: "Sign Language Detector & Translator",
    summary:
      "Real-time sign language recognition: hand tracking with OpenCV and cvzone/MediaPipe for data collection, and a Keras (TensorFlow) model for live classification, built to extend to new gestures.",
    stack: ["Python", "OpenCV", "MediaPipe", "TensorFlow"],
    links: [
      {
        label: "source",
        href: "https://github.com/austin-stanley-hinson/Sign-Language-Detector-Translator",
      },
    ],
  },
  {
    name: "AI Desktop Assistant",
    summary:
      "Voice-controlled desktop assistant that plays music, fetches live weather, opens websites, and answers questions, combining speech recognition, web requests, and media control.",
    stack: ["Python", "SpeechRecognition"],
    links: [
      { label: "source", href: "https://github.com/austin-stanley-hinson/AI-Desktop-Assistant" },
    ],
  },
  {
    name: "This site",
    summary:
      "The grimoire itself: Next.js App Router and TypeScript, content served through its own API routes, and this Ask guide streaming answers from the Claude API.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Claude API"],
    links: [
      { label: "source", href: "https://github.com/austin-stanley-hinson/austin-portfolio" },
    ],
  },
];

// Details on the experience entries and anything else worth knowing.
export const notes: string[] = [
  "CEAMLS is Morgan State University's Center for Equitable AI & Machine Learning Systems. Austin's internship was its SAIRI summer research program; the project was titled \"AI-Driven Discovery of Drug Candidate Compounds to Slow Cognitive Decline in Alzheimer's Disease\". The QSAR workflow covered molecular dataset curation, descriptor extraction, and comparing Decision Trees, Random Forests, Logistic Regression, and KNN on accuracy, precision, recall, F1, and confusion matrices. He kept a research journal site: https://austin-stanley-hinson.github.io/austin-stanley-hinsonceamls26.github.io/",
  "G-SWEP is a Google × BASTA software engineering fellowship; Planty is the project he built there.",
  "He practices data structures and algorithms problems regularly and keeps his solutions, organized by topic, at https://github.com/austin-stanley-hinson/neetcode-submissions",
  "All of his code is on GitHub: https://github.com/austin-stanley-hinson",
];
