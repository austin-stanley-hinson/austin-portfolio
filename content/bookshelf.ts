import type { ShelfSection } from "./types";

// Readings, tools, and concepts, each linking to where to get it and, once
// written, to my own notes (Google Docs) under `notes`.
//
// Entry shape:
//   {
//     title: "...",
//     author: "...",
//     links: { source: "...", notes: "https://docs.google.com/document/d/..." },
//     status: "reading" | "read" | "notes-wip",
//     current: true,   // marked "current" on the shelf
//     comment: "...",
//   },
export const bookshelf: ShelfSection[] = [
  {
    title: "Textbooks & Readings",
    entries: [
      {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        links: {
          source:
            "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
        },
      },
      {
        title: "Computer Networking: A Top-Down Approach",
        author: "James F. Kurose & Keith W. Ross",
        links: {
          source:
            "https://www.pearson.com/en-us/subject-catalog/p/computer-networking-a-top-down-approach/P200000013385/9780135429334",
        },
        current: true,
        comment:
          "Having so much fun learning how end hosts actually talk to each other today: encapsulation, protocols, interfaces, all of it. I plan to build a project that puts every layer to work.",
      },
      {
        title: "The System Design Interview",
        author: "Lewis C. Lin & Shivam P. Patel",
        links: { source: "https://www.amazon.com/System-Design-Interview-2nd/dp/B09559NJKL" },
        comment:
          "Loved seeing the infrastructure behind apps I use every day, like Instagram, and the engineering tradeoffs it takes to make them work.",
      },
      {
        title: "Operating Systems: Three Easy Pieces",
        author: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
        links: { source: "https://pages.cs.wisc.edu/~remzi/OSTEP/" },
      },
      {
        title: "Beginning C++ Game Programming",
        author: "John Horton",
        links: {
          source: "https://www.packtpub.com/en-us/product/beginning-c-game-programming-9781835081747",
        },
      },
    ],
  },
  {
    title: "Mathematics",
    entries: [
      {
        title: "Mathematical Proofs for Beginners",
        author: "The Math Sorcerer",
        links: {
          source:
            "https://www.amazon.com/Mathematical-Proofs-Beginners-Contrapositive-Contradiction/dp/B0F2N914H5",
        },
      },
      {
        title: "Calculus: An Intuitive and Physical Approach",
        author: "Morris Kline",
        links: { source: "https://store.doverpublications.com/products/9780486404530" },
      },
      {
        title: "Linear Algebra with Applications",
        author: "Otto Bretscher",
        links: {
          source:
            "https://www.pearson.com/en-us/subject-catalog/p/linear-algebra-with-applications-classic-version/P200000006131/9780135162972",
        },
        comment:
          "All things matrices!!! And all the places they quietly show up in computing.",
      },
      {
        title: "Introduction to the Probability Theory",
        author: "Taha Sochi",
        links: { source: "https://www.amazon.com/Introduction-Probability-Theory-Taha-Sochi/dp/B0BV1XJ7KC" },
      },
      {
        title: "My Search for Ramanujan: How I Learned to Count",
        author: "Ken Ono & Amir D. Aczel",
        links: { source: "https://link.springer.com/book/10.1007/978-3-319-25568-2" },
        comment:
          "Easily the best math book that isn't really a math book I've read. Ken is such a good writer, and following his journey made me want to never give up. I won't. Ken outdid every expectation he once had of himself, and I'm going to become someone I'm proud of too.",
      },
    ],
  },
  {
    title: "Tools",
    entries: [
      {
        title: "Kubernetes",
        links: {
          source: "https://kubernetes.io/",
          paper: "https://research.google/pubs/borg-omega-and-kubernetes/",
        },
      },
      {
        title: "Docker",
        links: { source: "https://docs.docker.com/" },
      },
      {
        title: "Apache Kafka",
        links: {
          source: "https://kafka.apache.org/",
          paper: "https://www.microsoft.com/en-us/research/wp-content/uploads/2017/09/Kafka.pdf",
        },
      },
    ],
  },
  {
    title: "Concepts",
    entries: [
      {
        title: "Mathematical Proofs",
        author: "The Math Sorcerer",
        links: {
          source: "https://www.youtube.com/playlist?list=PLO1y6V1SXjjNQg75KAdGNW9cD6zUul4Gs",
        },
        comment: "Direct proof, contrapositive, and contradiction, from the ground up.",
      },
    ],
  },
];
